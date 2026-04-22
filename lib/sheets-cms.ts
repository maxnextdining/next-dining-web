/**
 * Google Sheets 범용 CMS 연동
 *
 * 시트 URL: https://docs.google.com/spreadsheets/d/1d_c97pg1fn5MWJV0d460BW-NYwV1hXK5XlMdABBpcQM
 * 탭: 페이지_콘텐츠 | 브랜드_기본정보 | 브랜드_스토리 | 채용공고 | 새소식
 *
 * - 공개 읽기 설정 → CSV export URL로 fetch (API 키 불필요)
 * - ISR revalidate로 주기적 자동 반영
 */

const SHEET_ID = '1d_c97pg1fn5MWJV0d460BW-NYwV1hXK5XlMdABBpcQM';

/** CSV 텍스트를 줄 단위로 분리 — 쌍따옴표 안의 줄바꿈은 무시 */
export function splitCSVRows(text: string): string[] {
  const rows: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '""';
        i++;
      } else {
        inQuotes = !inQuotes;
        current += ch;
      }
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i++; // CRLF
      if (current.trim()) rows.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) rows.push(current);
  return rows;
}

/** CSV 한 줄 파싱 — 쌍따옴표 내 쉼표 처리 */
export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

/** 범용 시트 fetcher — 헤더 skip, mapRow로 각 행 매핑, 에러 시 빈 배열 반환 */
export async function fetchSheetTab<T>(
  tabName: string,
  mapRow: (cols: string[]) => T | null
): Promise<T[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`[sheets-cms] fetch failed (${tabName}): ${res.status}`);
      return [];
    }

    const text = await res.text();
    const lines = splitCSVRows(text);

    // 첫 줄은 헤더 — skip
    const rows = lines.slice(1);

    return rows
      .map((line) => mapRow(parseCSVLine(line)))
      .filter((item): item is T => item !== null);
  } catch (err) {
    console.error(`[sheets-cms] error (${tabName}):`, err);
    return [];
  }
}

// ─────────────────────────────────────────────
// 페이지_콘텐츠 탭
// columns: page, section, key, value, note
// ─────────────────────────────────────────────

export interface SheetPageContent {
  page: string;
  section: string;
  key: string;
  value: string;
  note: string;
}

/** 페이지_콘텐츠 탭 전체 rows fetch */
export async function fetchPageContentRows(): Promise<SheetPageContent[]> {
  return fetchSheetTab<SheetPageContent>('페이지_콘텐츠', (cols) => {
    if (!cols[0]) return null;
    return {
      page: cols[0] || '',
      section: cols[1] || '',
      key: cols[2] || '',
      value: cols[3] || '',
      note: cols[4] || '',
    };
  });
}

/**
 * 페이지_콘텐츠 탭을 중첩 객체로 변환
 * content.home.hero.heading_1 식으로 접근 가능
 */
export async function fetchPageContent(): Promise<
  Record<string, Record<string, Record<string, string>>>
> {
  const rows = await fetchPageContentRows();
  const result: Record<string, Record<string, Record<string, string>>> = {};

  for (const row of rows) {
    if (!row.page || !row.section || !row.key) continue;
    if (!result[row.page]) result[row.page] = {};
    if (!result[row.page][row.section]) result[row.page][row.section] = {};
    result[row.page][row.section][row.key] = row.value;
  }

  return result;
}

// ─────────────────────────────────────────────
// 브랜드_기본정보 탭
// columns: brand_id, name, name_en, category, format, tagline, description,
//          price_range, cuisine, origin_line
// ─────────────────────────────────────────────

export interface SheetBrandInfo {
  brandId: string;
  name: string;
  nameEn: string;
  category: string;
  format: string;
  tagline: string;
  description: string;
  priceRange: string;
  cuisine: string;
  originLine: string;
}

/** 브랜드_기본정보 탭 전체 fetch */
export async function fetchBrandInfo(): Promise<SheetBrandInfo[]> {
  return fetchSheetTab<SheetBrandInfo>('브랜드_기본정보', (cols) => {
    if (!cols[0]) return null;
    return {
      brandId: cols[0] || '',
      name: cols[1] || '',
      nameEn: cols[2] || '',
      category: cols[3] || '',
      format: cols[4] || '',
      tagline: cols[5] || '',
      description: cols[6] || '',
      priceRange: cols[7] || '',
      cuisine: cols[8] || '',
      originLine: cols[9] || '',
    };
  });
}

/** 특정 brandId의 기본정보 반환 */
export async function fetchBrandInfoById(
  brandId: string
): Promise<SheetBrandInfo | undefined> {
  const all = await fetchBrandInfo();
  return all.find((b) => b.brandId === brandId);
}

// ─────────────────────────────────────────────
// 브랜드_스토리 탭
// columns: brand_id, story_short, origin_story, chef_artisan,
//          ingredient_philosophy, signature_menu, space_experience
// ─────────────────────────────────────────────

export interface SheetBrandStory {
  brandId: string;
  storyShort: string;
  originStory: string;
  chefOrArtisan: string;
  ingredientPhilosophy: string;
  signatureMenu: string;
  spaceExperience: string;
}

/**
 * 브랜드_스토리 탭 fetch
 * Record<brandId, SheetBrandStory> 형태로 반환
 */
export async function fetchBrandStories(): Promise<
  Record<string, SheetBrandStory>
> {
  const rows = await fetchSheetTab<SheetBrandStory>('브랜드_스토리', (cols) => {
    if (!cols[0]) return null;
    return {
      brandId: cols[0] || '',
      storyShort: cols[1] || '',
      originStory: cols[2] || '',
      chefOrArtisan: cols[3] || '',
      ingredientPhilosophy: cols[4] || '',
      signatureMenu: cols[5] || '',
      spaceExperience: cols[6] || '',
    };
  });

  const map: Record<string, SheetBrandStory> = {};
  for (const row of rows) {
    map[row.brandId] = row;
  }
  return map;
}

// ─────────────────────────────────────────────
// 채용공고 탭
// columns: category, position, brand, location, type, description
// ─────────────────────────────────────────────

export interface SheetCareerPosting {
  category: string;
  position: string;
  brand: string;
  location: string;
  type: string;
  description: string;
}

/**
 * 채용공고 탭 fetch
 * category로 그룹핑하여 반환
 */
export async function fetchCareers(): Promise<
  { category: string; positions: SheetCareerPosting[] }[]
> {
  const rows = await fetchSheetTab<SheetCareerPosting>('채용공고', (cols) => {
    if (!cols[0] && !cols[1]) return null;
    return {
      category: cols[0] || '',
      position: cols[1] || '',
      brand: cols[2] || '',
      location: cols[3] || '',
      type: cols[4] || '',
      description: cols[5] || '',
    };
  });

  const groupMap: Record<string, SheetCareerPosting[]> = {};
  const categoryOrder: string[] = [];

  for (const row of rows) {
    if (!groupMap[row.category]) {
      groupMap[row.category] = [];
      categoryOrder.push(row.category);
    }
    groupMap[row.category].push(row);
  }

  return categoryOrder.map((category) => ({
    category,
    positions: groupMap[category],
  }));
}

// ─────────────────────────────────────────────
// 새소식 탭
// columns: date, category, brand, title, excerpt, sort_order
// ─────────────────────────────────────────────

export interface SheetNewsItem {
  date: string;
  category: string;
  brand: string;
  title: string;
  excerpt: string;
  sortOrder: number;
}

/** 새소식 탭 fetch — sortOrder 오름차순 정렬 */
export async function fetchNews(): Promise<SheetNewsItem[]> {
  const rows = await fetchSheetTab<SheetNewsItem>('새소식', (cols) => {
    if (!cols[3]) return null;
    return {
      date: cols[0] || '',
      category: cols[1] || '',
      brand: cols[2] || '',
      title: cols[3] || '',
      excerpt: cols[4] || '',
      sortOrder: parseInt(cols[5], 10) || 99,
    };
  });

  return rows.sort((a, b) => a.sortOrder - b.sortOrder);
}

// ─────────────────────────────────────────────
// 사용안내 탭 — 페이지 노출 설정
// columns: page_id, visible(Y/N), 설명
// ─────────────────────────────────────────────

/** 숨겨진 페이지 목록 반환 (visible !== 'Y'인 page_id 배열) */
export async function fetchHiddenPages(): Promise<string[]> {
  const rows = await fetchSheetTab<{ pageId: string; visible: boolean }>('사용안내', (cols) => {
    // page_id 컬럼이 있고 visible 컬럼이 Y/N인 행만 파싱
    const pageId = cols[0]?.trim();
    const vis = cols[1]?.trim().toUpperCase();
    if (!pageId || (vis !== 'Y' && vis !== 'N')) return null;
    return { pageId, visible: vis === 'Y' };
  });

  return rows.filter((r) => !r.visible).map((r) => r.pageId);
}
