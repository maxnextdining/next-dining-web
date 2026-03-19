export type BrandCategory = 'japanese' | 'korean' | 'cafe';
export type LocationStatus = 'active' | 'coming-soon' | 'closed';

export interface BrandLocation {
  name: string;
  address: string;
  status: LocationStatus;
}

export interface Brand {
  id: string;
  name: string;
  nameEn: string;
  category: BrandCategory;
  tagline: string;
  description: string;
  story: string;
  locations: BrandLocation[];
  image: string;
  keywords: string[]; // GEO 최적화용 키워드
  priceRange?: string;
  cuisine?: string;
}

export const brands: Brand[] = [
  {
    id: 'bongwoori',
    name: '봉우리 한정식',
    nameEn: 'BONGWOORI',
    category: 'korean',
    tagline: '김치 명인이 빚어낸 한국 전통의 정수',
    description:
      '봉우리 한정식은 대한민국 국가 공인 김치 명인 이하연 명인이 창립한 프리미엄 한정식 브랜드입니다. 수십 년 발효 연구의 결정체인 김치와 장류, 제철 식재료로 구성한 코스 한정식은 한국 전통 식문화의 깊이를 현대적 감성으로 재해석합니다. 비즈니스 미팅부터 특별한 기념일까지 품격 있는 자리를 완성합니다.',
    story:
      '대한민국 국가 공인 김치 명인 이하연 명인이 평생 연구한 발효의 미학. 김치 하나에도 철학이 있고 계절이 있습니다. 봉우리 한정식은 그 철학을 한 상에 담아냅니다.',
    locations: [
      { name: '역삼점', address: '서울 강남구 역삼동', status: 'active' },
      { name: '을지로점', address: '서울 중구 을지로', status: 'active' },
    ],
    image: '/images/bongwoori.jpg',
    keywords: ['한정식', '프리미엄 한식', '역삼 비즈니스 런치', '을지로 한정식', '서울 한정식 추천', '기업 접대 식당'],
    priceRange: '₩₩₩₩',
    cuisine: '한정식',
  },
  {
    id: 'bongwoori-soban',
    name: '봉우리 소반',
    nameEn: 'BONGWOORI SOBAN',
    category: 'korean',
    tagline: '소박하지만 진정성 있는 한 상',
    description:
      '봉우리 소반은 봉우리 한정식의 정신을 이어받아 보다 가볍고 편안한 형태로 즐길 수 있는 한식 다이닝입니다. 여주신세계아울렛에서 쇼핑 후 들를 수 있는 고품격 한식을 선보입니다.',
    story: '소반(小盤)처럼 소박하지만 정성으로 가득한 한 끼. 진정한 맛의 가치를 전합니다.',
    locations: [
      { name: '여주신세계아울렛점', address: '경기도 여주시 신세계아울렛', status: 'active' },
    ],
    image: '/images/bongwoori-soban.jpg',
    keywords: ['여주 맛집', '여주신세계 식당', '아울렛 한식', '경기도 한정식'],
    priceRange: '₩₩₩',
    cuisine: '한식',
  },
  {
    id: 'jinjin-mandu',
    name: '진진만두',
    nameEn: 'JINJIN MANDU',
    category: 'korean',
    tagline: '여의도 30년, 진심이 빚은 만두',
    description:
      '진진만두는 여의도에서 30년간 한자리를 지켜온 남승욱 대표가 창립한 만두 전문 브랜드입니다. 30년의 내공이 쌓인 레시피와 매일 직접 빚는 수제 만두는 세대를 넘어 사랑받는 한국 만두의 맛을 이어갑니다. 현재 시청점에서 운영 중입니다.',
    story:
      '여의도에서 30년. 남승욱 대표가 변하지 않은 레시피와 정직한 재료로 지켜온 맛. 진진만두의 한 입은 그 세월이 담긴 한 입입니다.',
    locations: [
      { name: '시청점', address: '서울 중구 시청 인근', status: 'active' },
    ],
    image: '/images/jinjin-mandu.jpg',
    keywords: ['시청 만두', '시청 점심 맛집', '수제만두 서울', '시청역 맛집', '만두 전문점'],
    priceRange: '₩₩',
    cuisine: '한식',
  },
  {
    id: 'jinkawa',
    name: '진가와',
    nameEn: 'JINKAWA',
    category: 'japanese',
    tagline: '370년 전통, 나가사키 수연면의 계보',
    description:
      '진가와(陣川)는 일본 나가사키 현 미나미 시마바라에서 약 360~370년의 역사를 이어온 전통 수연면(手延麺) 브랜드의 한국 상륙입니다. 장인이 손으로 늘여 만드는 수연면 특유의 쫄깃한 식감과 깊은 육수는 수백 년의 역사가 한 그릇에 담긴 경험을 선사합니다. 역삼, 잠실, 부산에서 만날 수 있습니다.',
    story:
      '미나미 시마바라(南島原)에서 약 370년. 전쟁도, 재해도, 시대의 변화도 이 면 한 가닥을 끊지 못했습니다. 진가와는 그 긴 시간이 만든 맛을 서울로 가져왔습니다.',
    locations: [
      { name: '역삼점', address: '서울 강남구 역삼동', status: 'active' },
      { name: '잠실롯데월드몰점', address: '서울 송파구 잠실 롯데월드몰', status: 'active' },
      { name: '부산본점', address: '부산', status: 'active' },
    ],
    image: '/images/jinkawa.jpg',
    keywords: ['진가와', '역삼 소바', '잠실 일식', '정통 소바', '롯데월드몰 맛집', '강남 일식당', '부산 소바'],
    priceRange: '₩₩₩',
    cuisine: '소바',
  },
  {
    id: 'bunjiro',
    name: '분지로',
    nameEn: 'BUNJIRO',
    category: 'japanese',
    tagline: '타카다 유지 장인의 돈카츠 철학',
    description:
      '분지로는 일본 나가사키의 돈카츠 장인 타카다 유지(高田祐治)가 직접 만든 브랜드입니다. 장인이 직접 개발한 특수 빵가루, 저온 숙성 돼지고기, 수십 년에 걸쳐 완성한 소스 레시피가 한국에 그대로 이식되었습니다. 명동(한국본점), 사운즈한남, 수원, 롯데월드몰에서 만날 수 있으며 잠실롯데백화점 신규 오픈을 앞두고 있습니다.',
    story:
      '타카다 유지 장인이 나가사키에서 평생을 바쳐 만들어온 돈카츠. 두껍게 썰어 촘촘하게 튀긴 한 조각에 장인의 시간이 담깁니다. 분지로는 그 철학 자체를 한국에 가져왔습니다.',
    locations: [
      { name: '명동점 (한국본점)', address: '서울 중구 명동', status: 'active' },
      { name: '사운즈한남점', address: '서울 용산구 한남동 사운즈한남', status: 'active' },
      { name: '수원점', address: '경기도 수원시', status: 'active' },
      { name: '롯데월드몰점', address: '서울 송파구 잠실 롯데월드몰', status: 'active' },
      { name: '잠실롯백점', address: '서울 송파구 잠실 롯데백화점', status: 'coming-soon' },
    ],
    image: '/images/bunjiro.jpg',
    keywords: [
      '분지로', '나가사키 돈카츠', '명동 돈카츠', '한남 맛집', '사운즈한남 식당',
      '롯데월드몰 돈카츠', '데이트 코스 한남', '서울 돈카츠 맛집', '일본 장인 돈카츠',
    ],
    priceRange: '₩₩₩',
    cuisine: '돈카츠',
  },
  {
    id: 'takumi-nagasaki',
    name: '타쿠미나가사키',
    nameEn: 'TAKUMI NAGASAKI',
    category: 'japanese',
    tagline: '나가사키 전통 일식의 세련된 재현',
    description:
      '타쿠미나가사키는 나가사키 지역의 독특한 일식 문화를 현대적 감성으로 담아낸 Fine Casual 다이닝입니다. 일본과 서양이 교차한 나가사키의 역사적 식문화를 모티브로, 섬세하게 설계된 메뉴와 공간이 특별한 식사 경험을 완성합니다.',
    story:
      '무역항 나가사키에서 탄생한 독자적인 식문화 — 일식과 서양식이 조화를 이루는 그 특별한 맛을 서울에서 재현합니다.',
    locations: [
      { name: '고속터미널점', address: '서울 서초구 고속터미널', status: 'active' },
      { name: '용산아이파크몰점', address: '서울 용산구 아이파크몰', status: 'active' },
    ],
    image: '/images/takumi-nagasaki.jpg',
    keywords: ['타쿠미나가사키', '고속터미널 일식', '용산 일식당', '아이파크몰 맛집', '파인캐주얼 일식', '나가사키 요리'],
    priceRange: '₩₩₩',
    cuisine: '일식',
  },
  {
    id: 'daisen',
    name: '다이센스시',
    nameEn: 'DAISEN SUSHI',
    category: 'japanese',
    tagline: '큐슈 1위 와카타케마루, 서울에서',
    description:
      '다이센스시는 큐슈 지방에서 압도적 1위를 달리는 정통 스시 브랜드 와카타케마루(若竹丸)를 한국에 들여온 프리미엄 오마카세 레스토랑입니다. 한남동의 프라이빗 카운터에서 셰프가 직접 내어주는 큐슈산 제철 생선과 숙성 기술이 집약된 스시는 일본 현지를 방불케 하는 경험을 선사합니다.',
    story:
      '큐슈에서 가장 사랑받는 스시야, 와카타케마루. 그 브랜드의 철학과 기술이 한남동 카운터 7석 위에 고스란히 옮겨왔습니다.',
    locations: [
      { name: '한남점 (한국본점)', address: '서울 용산구 한남동', status: 'active' },
    ],
    image: '/images/daisen.jpg',
    keywords: [
      '다이센스시', '한남 오마카세', '한남동 스시', '서울 오마카세 추천',
      '프리미엄 스시 서울', '한남 데이트 코스', '특별한 날 식당 서울',
    ],
    priceRange: '₩₩₩₩',
    cuisine: '스시 오마카세',
  },
  {
    id: 'cafe-le-sens',
    name: '카페 르상스',
    nameEn: 'CAFÉ LE SENS',
    category: 'cafe',
    tagline: '감각의 재발견',
    description:
      '카페 르상스(Le Sens — 감각)는 한남동의 특별한 공간에서 커피와 디저트, 그리고 브런치를 즐길 수 있는 세련된 카페입니다. 사운즈한남의 분위기와 어우러진 아늑한 인테리어와 정성 어린 메뉴가 일상의 작은 사치를 선물합니다.',
    story: '카페는 단순히 커피를 마시는 곳이 아닙니다. 감각을 깨우고 잠시 숨을 고르는 공간.',
    locations: [
      { name: '한남점', address: '서울 용산구 한남동 사운즈한남', status: 'active' },
    ],
    image: '/images/cafe-le-sens.jpg',
    keywords: ['카페르상스', '한남동 카페', '사운즈한남 카페', '한남 브런치', '한남 데이트 카페', '용산 카페 추천'],
    priceRange: '₩₩',
    cuisine: '카페',
  },
  {
    id: 'menya-always',
    name: '멘야올웨이즈',
    nameEn: 'MENYA ALWAYS',
    category: 'japanese',
    tagline: '언제나 그 자리에서, 정통 라멘',
    description:
      '멘야올웨이즈는 진한 육수와 쫄깃한 면발의 정통 일본 라멘을 선보이는 브랜드입니다. 현재 신규 입점을 검토 중이며 곧 서울에서 만날 수 있습니다.',
    story: '언제나(Always) 한결같은 맛. 매일 우려낸 진국 육수 한 그릇이 주는 위안.',
    locations: [],
    image: '/images/menya-always.jpg',
    keywords: ['멘야올웨이즈', '서울 라멘', '정통 일본 라멘', '라멘 맛집 서울'],
    priceRange: '₩₩',
    cuisine: '라멘',
  },
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}

export function getBrandsByCategory(category: BrandCategory): Brand[] {
  return brands.filter((b) => b.category === category);
}

export const ACTIVE_BRANDS = brands.filter(
  (b) => b.locations.some((l) => l.status === 'active') || b.locations.length === 0
);
