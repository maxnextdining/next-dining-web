/**
 * i18n 딕셔너리 — UI 레이블 전용
 *
 * 사용법: t(lang, 'nav.brands')
 * ja 값은 현재 ko와 동일. 실제 일본어는 /tmp/ndi18n/ui_ja.json으로 별도 투입 예정.
 */

export type Lang = 'ko' | 'ja';

const dict = {
  ko: {
    // Navigation
    'nav.brands': '브랜드',
    'nav.about': '회사 소개',
    'nav.happenings': '새소식',
    'nav.careers': '채용',
    'nav.contact': '문의',

    // Header CTA
    'header.cta_partnership': '제휴·입점',
    'header.cta_reservation': '예약하기',
    'header.aria_open': '메뉴 열기',
    'header.aria_close': '메뉴 닫기',

    // Language switcher
    'lang.ko': 'KO',
    'lang.ja': 'JA',

    // Home page
    'home.portfolio_label': 'Our Portfolio',
    'home.portfolio_heading': '장인 정신이 깃든\n독창적인 브랜드 라인업',
    'home.stores_count': '개 매장',
    'home.coming_soon': '오픈 예정',
    'home.faq_label': 'FAQ',
    'home.faq_heading': '자주 묻는 질문',
    'home.join_label': 'Join Us',
    'home.stat_brands': '브랜드',
    'home.stat_stores': '직영 매장',
    'home.stat_cities': '도시',
    'home.stat_revenue': '연 매출 (2025년 기준)',

    // Brands page
    'brands.header_label': 'OUR BRANDS',
    'brands.partnership_label': 'PARTNERSHIP',
    'brands.contact_cta': '문의하기',
    'brands.stores_count': '개 매장',
    'brands.coming_soon': '오픈 예정',
    'brands.category.korean': '한식',
    'brands.category.japanese': '일식',
    'brands.category.american': '양식',
    'brands.category.cafe': '카페',

    // Brand detail page
    'brand.back': '← 모든 브랜드',
    'brand.stores_active': '개 매장 운영 중',
    'brand.signature_menu': '시그니처 메뉴',
    'brand.price_note': '* 가격은 매장 및 시기에 따라 변동될 수 있습니다.',
    'brand.gallery': '공간과 메뉴',
    'brand.locations': '매장 안내',
    'brand.no_location': '지점 오픈 준비 중입니다.',
    'brand.reserve': '예약하기',
    'brand.cta_contact': '예약·문의하기',
    'brand.official_site': '공식 사이트 →',
    'brand.experience': '직접 경험해 보세요',
    'brand.experience_sub': '의 특별한 식경험이 기다립니다.',
    'brand.more_brands': '다른 브랜드 둘러보기',
    'brand.more_label': 'More Brands',
    'brand.view_all': '전체 보기 →',
    'brand.keywords_label': '이런 분께 추천합니다',
    'brand.artisan_label': 'Artisan',
    'brand.official_website': '공식 웹사이트 방문 →',
    'brand.photo_preparing': '사진 준비 중',
    'brand.status.active': '운영 중',
    'brand.status.coming-soon': '오픈 예정',
    'brand.status.closed': '폐점',
    'brand.format.dining': 'Fine Dining',
    'brand.format.casual': 'Casual',
    'brand.format.foodcourt': 'Food Court',
    'brand.format.lounge': 'Lounge',
    'brand.format.cafe': 'Café',
    'brand.format.pub': 'Pub',
    'brand.category.japanese': '일식',
    'brand.category.korean': '한식',
    'brand.category.american': '양식',
    'brand.category.cafe': '카페',
    'brand.story.origin': '탄생 이야기',
    'brand.story.origin_en': 'THE ORIGIN',
    'brand.story.craft': '장인의 길',
    'brand.story.craft_en': 'CRAFTSMANSHIP',
    'brand.story.ingredient': '식재료 철학',
    'brand.story.ingredient_en': 'INGREDIENTS',
    'brand.story.signature': '시그니처',
    'brand.story.signature_en': 'SIGNATURE',
    'brand.story.space': '공간 경험',
    'brand.story.space_en': 'ATMOSPHERE',

    // About page
    'about.label': 'ABOUT US',
    'about.what_we_do_label': 'What We Do',
    'about.portfolio_label': 'Brand Portfolio',
    'about.portfolio_heading': '10개 브랜드, 4개 업태',
    'about.view_all': '전체 보기 →',
    'about.view_all_mobile': '전체 브랜드 보기 →',
    'about.brands_count': '개 브랜드',
    'about.partners_label': 'For Partners',
    'about.vision_label': 'Vision & Philosophy',
    'about.vision_heading': '4대 핵심 가치',
    'about.careers_question': '넥스트다이닝과 함께하고 싶으신가요?',
    'about.careers_heading': '팀 이야기가 궁금하다면 채용 페이지를 확인하세요',
    'about.careers_cta': '채용 안내 보기',
    'about.partnership_cta': '입점·제휴 문의하기',
    'about.brands_cta': '브랜드 포트폴리오 보기',
    'about.category.korean': '한식',
    'about.category.japanese': '일식',
    'about.category.cafe': '카페·라운지',
    'about.category.american': '양식·글로벌',
    'about.format.dining': '다이닝',
    'about.format.casual': '캐주얼',
    'about.format.foodcourt': '푸드코트',
    'about.format.lounge': '카페라운지',
    'about.format.lounge club': '라운지 클럽',
    'about.format.cafe': '카페',
    'about.format.pub': '펍·라운지',
    'about.stores_count': '개 매장',

    // Footer
    'footer.tagline': '다음 세대를 여는\n글로벌 외식 문화기업',
    'footer.tagline_sub': '음식, 공간, 사람을 연결해\n새로운 외식의 기준을 만듭니다.',
    'footer.address': '서울시 용산구 대사관로 35\n사운즈 한남 B1',
    'footer.company_info': '(주)넥스트다이닝 | 대표이사 장경훈, 정호상',
    'footer.biz_number': '사업자등록번호: 220-88-64891',
    'footer.copyright': '© {year} Next Dining Corp. All rights reserved.',
    'footer.crafted': 'Crafted for Excellence',
    'footer.brands_col': 'BRANDS',
    'footer.company_col': 'COMPANY',
    'footer.contact_col': 'CONTACT',
    'footer.about': '회사 소개',
    'footer.happenings': '새소식',
    'footer.careers': '채용 안내',
    'footer.contact': '문의하기',

    // Brand names in footer (KO = default label)
    'footer.brand.bongwoori': '봉우리 한정식',
    'footer.brand.bongwoori-soban': '봉우리소반',
    'footer.brand.jinkawa': '진가와',
    'footer.brand.bunjiro': '분지로',
    'footer.brand.takumi-nagasaki': '타쿠미나가사키',
    'footer.brand.daisen': '다이센스시',
    'footer.brand.cafe-le-sens': '카페 르상스',
    'footer.brand.jinjin-mandu': '진진만두',
    'footer.brand.menya-always': '멘야올웨이즈',
    'footer.brand.noflex-nyc': 'NOFLEX NYC',
  },
  ja: {
    // Navigation
    'nav.brands': 'ブランド',
    'nav.about': '会社概要',
    'nav.happenings': 'ニュース',
    'nav.careers': '採用',
    'nav.contact': 'お問い合わせ',

    // Header CTA
    'header.cta_partnership': '提携・出店',
    'header.cta_reservation': '予約する',
    'header.aria_open': 'メニューを開く',
    'header.aria_close': 'メニューを閉じる',

    // Language switcher
    'lang.ko': 'KO',
    'lang.ja': 'JA',

    // Home page
    'home.portfolio_label': 'Our Portfolio',
    'home.portfolio_heading': '職人の魂が宿る\n独創的なブランドラインナップ',
    'home.stores_count': '店舗',
    'home.coming_soon': 'オープン予定',
    'home.faq_label': 'FAQ',
    'home.faq_heading': 'よくある質問',
    'home.join_label': 'Join Us',
    'home.stat_brands': 'ブランド',
    'home.stat_stores': '直営店舗',
    'home.stat_cities': '都市',
    'home.stat_revenue': '年間売上 (2025年基準)',

    // Brands page
    'brands.header_label': 'OUR BRANDS',
    'brands.partnership_label': 'PARTNERSHIP',
    'brands.contact_cta': 'お問い合わせ',
    'brands.stores_count': '店舗',
    'brands.coming_soon': 'オープン予定',
    'brands.category.korean': '韓食',
    'brands.category.japanese': '和食',
    'brands.category.american': '洋食',
    'brands.category.cafe': 'カフェ',

    // Brand detail page
    'brand.back': '← すべてのブランド',
    'brand.stores_active': '店舗展開中',
    'brand.signature_menu': 'シグネチャーメニュー',
    'brand.price_note': '* 価格は店舗・時期により変動することがあります。',
    'brand.gallery': '空間とメニュー',
    'brand.locations': '店舗案内',
    'brand.no_location': '店舗オープン準備中です。',
    'brand.reserve': '予約する',
    'brand.cta_contact': '予約・お問い合わせ',
    'brand.official_site': '公式サイト →',
    'brand.experience': '実際に体験してください',
    'brand.experience_sub': 'の特別な食体験がお待ちしています。',
    'brand.more_brands': '他のブランドを見る',
    'brand.more_label': 'More Brands',
    'brand.view_all': 'すべて見る →',
    'brand.keywords_label': 'おすすめの方',
    'brand.artisan_label': 'Artisan',
    'brand.official_website': '公式ウェブサイトを訪問 →',
    'brand.photo_preparing': '写真準備中',
    'brand.status.active': '営業中',
    'brand.status.coming-soon': 'オープン予定',
    'brand.status.closed': '閉店',
    'brand.format.dining': 'Fine Dining',
    'brand.format.casual': 'Casual',
    'brand.format.foodcourt': 'Food Court',
    'brand.format.lounge': 'Lounge',
    'brand.format.cafe': 'Café',
    'brand.format.pub': 'Pub',
    'brand.category.japanese': '和食',
    'brand.category.korean': '韓食',
    'brand.category.american': '洋食',
    'brand.category.cafe': 'カフェ',
    'brand.story.origin': '誕生の物語',
    'brand.story.origin_en': 'THE ORIGIN',
    'brand.story.craft': '職人の道',
    'brand.story.craft_en': 'CRAFTSMANSHIP',
    'brand.story.ingredient': '食材へのこだわり',
    'brand.story.ingredient_en': 'INGREDIENTS',
    'brand.story.signature': 'シグネチャー',
    'brand.story.signature_en': 'SIGNATURE',
    'brand.story.space': '空間体験',
    'brand.story.space_en': 'ATMOSPHERE',

    // About page
    'about.label': 'ABOUT US',
    'about.what_we_do_label': 'What We Do',
    'about.portfolio_label': 'Brand Portfolio',
    'about.portfolio_heading': '10ブランド、4業態',
    'about.view_all': 'すべて見る →',
    'about.view_all_mobile': 'すべてのブランドを見る →',
    'about.brands_count': 'ブランド',
    'about.partners_label': 'For Partners',
    'about.vision_label': 'Vision & Philosophy',
    'about.vision_heading': '4つのコアバリュー',
    'about.careers_question': 'ネクストダイニングと共に働きませんか？',
    'about.careers_heading': 'チームについて詳しくは採用ページをご覧ください',
    'about.careers_cta': '採用情報を見る',
    'about.partnership_cta': '出店・提携のお問い合わせ',
    'about.brands_cta': 'ブランドポートフォリオを見る',
    'about.category.korean': '韓食',
    'about.category.japanese': '和食',
    'about.category.cafe': 'カフェ・ラウンジ',
    'about.category.american': '洋食・グローバル',
    'about.format.dining': 'ダイニング',
    'about.format.casual': 'カジュアル',
    'about.format.foodcourt': 'フードコート',
    'about.format.lounge': 'カフェラウンジ',
    'about.format.lounge club': 'ラウンジクラブ',
    'about.format.cafe': 'カフェ',
    'about.format.pub': 'パブ・ラウンジ',
    'about.stores_count': '店舗',

    // Footer
    'footer.tagline': '次の世代を切り開く\nグローバル外食文化企業',
    'footer.tagline_sub': '食・空間・人をつなぎ\n新たな外食の基準を作ります。',
    'footer.address': 'ソウル市龍山区大使館路35\nサウンズ漢南 B1',
    'footer.company_info': '(株)ネクストダイニング | 代表取締役 チャン・ギョンフン、チョン・ホサン',
    'footer.biz_number': '事業者登録番号: 220-88-64891',
    'footer.copyright': '© {year} Next Dining Corp. All rights reserved.',
    'footer.crafted': 'Crafted for Excellence',
    'footer.brands_col': 'BRANDS',
    'footer.company_col': 'COMPANY',
    'footer.contact_col': 'CONTACT',
    'footer.about': '会社概要',
    'footer.happenings': 'ニュース',
    'footer.careers': '採用情報',
    'footer.contact': 'お問い合わせ',

    // Brand names in footer (ja = English nameEn)
    'footer.brand.bongwoori': 'BONGWOORI',
    'footer.brand.bongwoori-soban': 'BONGWOORI SOBAN',
    'footer.brand.jinkawa': 'JINKAWA',
    'footer.brand.bunjiro': 'BUNJIRO',
    'footer.brand.takumi-nagasaki': 'TAKUMI NAGASAKI',
    'footer.brand.daisen': 'DAISEN SUSHI',
    'footer.brand.cafe-le-sens': 'CAFÉ LE SENS',
    'footer.brand.jinjin-mandu': 'JINJIN MANDU',
    'footer.brand.menya-always': 'MENYA ALWAYS',
    'footer.brand.noflex-nyc': 'NOFLEX NYC',
  },
} as const;

type DictKo = typeof dict.ko;
type DictKey = keyof DictKo;

export function t(lang: Lang, key: DictKey): string {
  const val = (dict[lang] as Record<string, string>)[key];
  if (val !== undefined) return val;
  // Fallback to ko
  return dict.ko[key] ?? key;
}

/** URL prefix for a given lang (/ja or '') */
export function langPrefix(lang: Lang): string {
  return lang === 'ja' ? '/ja' : '';
}

/** Given a path (e.g. /brands/foo), produce the equivalent path for the other lang */
export function switchLangPath(currentPath: string, targetLang: Lang): string {
  // Strip existing /ja prefix
  const stripped = currentPath.startsWith('/ja')
    ? currentPath.slice(3) || '/'
    : currentPath;
  if (targetLang === 'ja') {
    return '/ja' + (stripped === '/' ? '' : stripped);
  }
  return stripped || '/';
}
