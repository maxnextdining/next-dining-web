/**
 * Google Sheets 메뉴 CMS 연동
 *
 * 시트 URL: https://docs.google.com/spreadsheets/d/1d_c97pg1fn5MWJV0d460BW-NYwV1hXK5XlMdABBpcQM
 * 시트 구조: brand_id | location | menu_name | price | category | sort_order
 *
 * - 공개 읽기 설정 → CSV export URL로 fetch (API 키 불필요)
 * - ISR revalidate로 주기적 자동 반영
 */

import { splitCSVRows } from './sheets-cms';

const SHEET_ID = '1d_c97pg1fn5MWJV0d460BW-NYwV1hXK5XlMdABBpcQM';
const SHEET_NAME = '메뉴';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

export interface SheetMenuItem {
  brandId: string;
  location: string;      // 빈 문자열이면 전 지점 공통
  menuName: string;
  price: string;
  category: string;
  sortOrder: number;
}

/** CSV 한 줄 파싱 — 쌍따옴표 내 쉼표 처리 */
function parseCSVLine(line: string): string[] {
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

/** Google Sheets에서 메뉴 데이터 fetch */
export async function fetchMenuData(): Promise<SheetMenuItem[]> {
  try {
    const res = await fetch(CSV_URL, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`[menu-sheets] fetch failed: ${res.status}`);
      return [];
    }

    const text = await res.text();
    const lines = splitCSVRows(text);

    // 첫 줄은 헤더 — skip
    const rows = lines.slice(1);

    return rows
      .map((line) => {
        const cols = parseCSVLine(line);
        if (cols.length < 3 || !cols[0]) return null;
        return {
          brandId: cols[0],
          location: cols[1] || '',
          menuName: cols[2] || '',
          price: cols[3] || '',
          category: cols[4] || '',
          sortOrder: parseInt(cols[5], 10) || 99,
        };
      })
      .filter((item): item is SheetMenuItem => item !== null)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (err) {
    console.error('[menu-sheets] error:', err);
    return [];
  }
}

/** 특정 브랜드의 메뉴만 추출 */
export async function fetchBrandMenu(brandId: string): Promise<SheetMenuItem[]> {
  const all = await fetchMenuData();
  return all.filter((m) => m.brandId === brandId);
}

/** 브랜드별 메뉴 맵 (전체 fetch 1회로 모든 브랜드 분배) */
export async function fetchMenuByBrand(): Promise<Record<string, SheetMenuItem[]>> {
  const all = await fetchMenuData();
  const map: Record<string, SheetMenuItem[]> = {};
  for (const item of all) {
    if (!map[item.brandId]) map[item.brandId] = [];
    map[item.brandId].push(item);
  }
  return map;
}
