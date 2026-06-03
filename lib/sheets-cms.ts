/**
 * Google Sheets 범용 CMS 연동
 *
 * 시트 URL: https://docs.google.com/spreadsheets/d/1d_c97pg1fn5MWJV0d460BW-NYwV1hXK5XlMdABBpcQM
 * 탭: 페이지_콘텐츠 | 브랜드_기본정보 | 브랜드_스토리 | 채용공고 | 새소식
 *
 * - 공개 읽기 설정 → CSV export URL로 fetch (API 키 불필요)
 * - ISR revalidate로 주기적 자동 반영
 * - 헤더명 기반 컬럼 매핑: _ja 컬럼 추가 시 기존 동작 보존
 */

import type { Lang } from './i18n';

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

/**
 * 헤더명 기반 컬럼 인덱스 맵 생성
 * 헤더 행을 읽어 { 컬럼명: 인덱스 } 맵을 반환
 */
function buildHeaderMap(headerLine: string): Record<string, number> {
  const headers = parseCSVLine(headerLine);
  const map: Record<string, number> = {};
  for (let i = 0; i < headers.length; i++) {
    const name = headers[i].trim();
    if (name) map[name] = i;
  }
  return map;
}

/**
 * 헤더 맵에서 값 추출 — _ja 컬럼 우선, 없으면 기본 컬럼 fallback
 * lang='ja'이고 `${key}_ja` 컬럼이 있으면 그 값 우선 사용
 */
function getColValue(
  cols: string[],
  headerMap: Record<string, number>,
  key: string,
  lang: Lang
): string {
  if (lang === 'ja') {
    const jaIdx = headerMap[`${key}_ja`];
    if (jaIdx !== undefined) {
      const jaVal = cols[jaIdx]?.trim() ?? '';
      if (jaVal) return jaVal;
    }
  }
  const idx = headerMap[key];
  if (idx === undefined) return '';
  return cols[idx]?.trim() ?? '';
}

/**
 * 범용 시트 fetcher — 헤더명 기반 매핑
 * mapRow: (cols, headerMap, lang) => T | null
 */
export async function fetchSheetTab<T>(
  tabName: string,
  mapRow: (cols: string[], headerMap: Record<string, number>, lang: Lang) => T | null,
  lang: Lang = 'ko'
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
    if (lines.length === 0) return [];

    // 첫 줄이 헤더 — 헤더맵 빌드
    const headerMap = buildHeaderMap(lines[0]);
    const rows = lines.slice(1);

    return rows
      .map((line) => mapRow(parseCSVLine(line), headerMap, lang))
      .filter((item): item is T => item !== null);
  } catch (err) {
    console.error(`[sheets-cms] error (${tabName}):`, err);
    return [];
  }
}

// ─────────────────────────────────────────────
// 페이지_콘텐츠 탭
// columns: page, section, key, value, [value_ja], note
// ─────────────────────────────────────────────

export interface SheetPageContent {
  page: string;
  section: string;
  key: string;
  value: string;
  note: string;
}

/** 페이지_콘텐츠 탭 전체 rows fetch */
export async function fetchPageContentRows(lang: Lang = 'ko'): Promise<SheetPageContent[]> {
  return fetchSheetTab<SheetPageContent>(
    '페이지_콘텐츠',
    (cols, headerMap, l) => {
      const page = getColValue(cols, headerMap, 'page', 'ko'); // page 키는 항상 ko
      if (!page) return null;
      return {
        page,
        section: getColValue(cols, headerMap, 'section', 'ko'),
        key: getColValue(cols, headerMap, 'key', 'ko'),
        // value: _ja 컬럼 우선(lang=ja일 때), 없으면 value fallback
        value: getColValue(cols, headerMap, 'value', l),
        note: getColValue(cols, headerMap, 'note', 'ko'),
      };
    },
    lang
  );
}

/**
 * 페이지_콘텐츠 탭을 중첩 객체로 변환
 * content.home.hero.heading_1 식으로 접근 가능
 */
export async function fetchPageContent(
  lang: Lang = 'ko'
): Promise<Record<string, Record<string, Record<string, string>>>> {
  const rows = await fetchPageContentRows(lang);
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
// columns: brand_id, name, name_en, category, format,
//          tagline, [tagline_ja], description, [description_ja],
//          price_range, cuisine, origin_line, [origin_line_ja]
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
export async function fetchBrandInfo(lang: Lang = 'ko'): Promise<SheetBrandInfo[]> {
  return fetchSheetTab<SheetBrandInfo>(
    '브랜드_기본정보',
    (cols, headerMap, l) => {
      const brandId = getColValue(cols, headerMap, 'brand_id', 'ko');
      if (!brandId) return null;
      return {
        brandId,
        name: getColValue(cols, headerMap, 'name', 'ko'),
        nameEn: getColValue(cols, headerMap, 'name_en', 'ko'),
        category: getColValue(cols, headerMap, 'category', 'ko'),
        format: getColValue(cols, headerMap, 'format', 'ko'),
        tagline: getColValue(cols, headerMap, 'tagline', l),
        description: getColValue(cols, headerMap, 'description', l),
        priceRange: getColValue(cols, headerMap, 'price_range', 'ko'),
        cuisine: getColValue(cols, headerMap, 'cuisine', 'ko'),
        originLine: getColValue(cols, headerMap, 'origin_line', l),
      };
    },
    lang
  );
}

/** 특정 brandId의 기본정보 반환 */
export async function fetchBrandInfoById(
  brandId: string,
  lang: Lang = 'ko'
): Promise<SheetBrandInfo | undefined> {
  const all = await fetchBrandInfo(lang);
  return all.find((b) => b.brandId === brandId);
}

// ─────────────────────────────────────────────
// 브랜드_스토리 탭
// columns: brand_id, story_short, [story_short_ja], origin_story, [origin_story_ja],
//          chef_artisan, [chef_artisan_ja], ingredient_philosophy, [ingredient_philosophy_ja],
//          signature_menu, [signature_menu_ja], space_experience, [space_experience_ja],
//          master_artisan
// ─────────────────────────────────────────────

export interface SheetBrandStory {
  brandId: string;
  storyShort: string;
  originStory: string;
  chefOrArtisan: string;
  ingredientPhilosophy: string;
  signatureMenu: string;
  spaceExperience: string;
  masterArtisan: string;
}

/**
 * 브랜드_스토리 탭 fetch
 * Record<brandId, SheetBrandStory> 형태로 반환
 */
export async function fetchBrandStories(
  lang: Lang = 'ko'
): Promise<Record<string, SheetBrandStory>> {
  const rows = await fetchSheetTab<SheetBrandStory>(
    '브랜드_스토리',
    (cols, headerMap, l) => {
      const brandId = getColValue(cols, headerMap, 'brand_id', 'ko');
      if (!brandId) return null;
      return {
        brandId,
        storyShort: getColValue(cols, headerMap, 'story_short', l),
        originStory: getColValue(cols, headerMap, 'origin_story', l),
        chefOrArtisan: getColValue(cols, headerMap, 'chef_artisan', l),
        ingredientPhilosophy: getColValue(cols, headerMap, 'ingredient_philosophy', l),
        signatureMenu: getColValue(cols, headerMap, 'signature_menu', l),
        spaceExperience: getColValue(cols, headerMap, 'space_experience', l),
        masterArtisan: getColValue(cols, headerMap, 'master_artisan', 'ko'),
      };
    },
    lang
  );

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
  const rows = await fetchSheetTab<SheetCareerPosting>(
    '채용공고',
    (cols, headerMap) => {
      const category = getColValue(cols, headerMap, 'category', 'ko');
      const position = getColValue(cols, headerMap, 'position', 'ko');
      if (!category && !position) return null;
      return {
        category,
        position,
        brand: getColValue(cols, headerMap, 'brand', 'ko'),
        location: getColValue(cols, headerMap, 'location', 'ko'),
        type: getColValue(cols, headerMap, 'type', 'ko'),
        description: getColValue(cols, headerMap, 'description', 'ko'),
      };
    },
    'ko'
  );

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
  const rows = await fetchSheetTab<SheetNewsItem>(
    '새소식',
    (cols, headerMap) => {
      const title = getColValue(cols, headerMap, 'title', 'ko');
      if (!title) return null;
      const sortRaw = getColValue(cols, headerMap, 'sort_order', 'ko');
      return {
        date: getColValue(cols, headerMap, 'date', 'ko'),
        category: getColValue(cols, headerMap, 'category', 'ko'),
        brand: getColValue(cols, headerMap, 'brand', 'ko'),
        title,
        excerpt: getColValue(cols, headerMap, 'excerpt', 'ko'),
        sortOrder: parseInt(sortRaw, 10) || 99,
      };
    },
    'ko'
  );

  return rows.sort((a, b) => a.sortOrder - b.sortOrder);
}

// ─────────────────────────────────────────────
// 매장정보 탭
// columns: brand_id, store_name, [store_name_ja], hours, [hours_ja], ...
// ─────────────────────────────────────────────

export interface SheetStoreInfo {
  brandId: string;
  storeName: string;
  hours: string;
}

/** 매장정보 탭 fetch */
export async function fetchStoreInfo(lang: Lang = 'ko'): Promise<SheetStoreInfo[]> {
  return fetchSheetTab<SheetStoreInfo>(
    '매장정보',
    (cols, headerMap, l) => {
      const brandId = getColValue(cols, headerMap, 'brand_id', 'ko');
      if (!brandId) return null;
      return {
        brandId,
        storeName: getColValue(cols, headerMap, 'store_name', l),
        hours: getColValue(cols, headerMap, 'hours', l),
      };
    },
    lang
  );
}

// ─────────────────────────────────────────────
// 사용안내 탭 — 페이지 노출 설정
// columns: page_id, visible(Y/N), 설명
// ─────────────────────────────────────────────

/** 숨겨진 페이지 목록 반환 (visible !== 'Y'인 page_id 배열) */
export async function fetchHiddenPages(): Promise<string[]> {
  const rows = await fetchSheetTab<{ pageId: string; visible: boolean }>(
    '사용안내',
    (cols, headerMap) => {
      const pageId = getColValue(cols, headerMap, 'page_id', 'ko').trim()
        || cols[0]?.trim() || '';
      // visible 컬럼 헤더가 없는 경우 위치 기반 fallback
      let vis = getColValue(cols, headerMap, 'visible', 'ko').trim().toUpperCase();
      if (!vis) vis = cols[1]?.trim().toUpperCase() ?? '';
      if (!pageId || (vis !== 'Y' && vis !== 'N')) return null;
      return { pageId, visible: vis === 'Y' };
    },
    'ko'
  );

  return rows.filter((r) => !r.visible).map((r) => r.pageId);
}
