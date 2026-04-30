export type BrandCategory = 'japanese' | 'korean' | 'cafe' | 'american';
export type BrandFormat = 'dining' | 'casual' | 'foodcourt' | 'lounge' | 'lounge club' | 'cafe' | 'pub';
export type LocationStatus = 'active' | 'coming-soon' | 'closed';

export interface BrandLocation {
  name: string;
  address: string;
  status: LocationStatus;
  phone?: string;
  hours?: string;
}

/** 브랜드 페이지 스토리텔링 요소 (벤치마킹 도출) */
export interface BrandStoryElements {
  originStory?: string;       // 탄생 배경·역사
  chefOrArtisan?: string;     // 셰프·장인 이야기
  ingredientPhilosophy?: string; // 식재료 철학
  signatureMenu?: string;     // 시그니처 메뉴 소개
  spaceExperience?: string;   // 공간·경험 설계
  masterArtisan?: string;     // Master Artisan 소개
}

export interface MenuItem {
  name: string;
  price: string;
  photo?: string;
}

export interface ReservationLink {
  location?: string;
  url?: string;
  note?: string; // '전화예약', '현장 대기' 등 온라인 예약 불가 시
}

export interface Brand {
  id: string;
  name: string;
  nameEn: string;
  category: BrandCategory;
  format: BrandFormat;
  tagline: string;
  description: string;
  story: string;
  storyElements?: BrandStoryElements;
  locations: BrandLocation[];
  image: string;
  logo: string;
  keywords: string[]; // GEO 최적화용 키워드
  priceRange?: string;
  cuisine?: string;
  website?: string;
  menuHighlights?: MenuItem[];
  reservationLinks?: ReservationLink[];
  categoryLabel?: string; // 히어로 영문 카테고리 라벨 (커스텀 시)
  accentColor?: string; // hex color for visual theming
  gallery?: string[]; // 갤러리 이미지 경로
  heroImage?: string;  // 히어로 풀스크린용 고해상도 이미지
  storyTitleOverrides?: Partial<Record<keyof BrandStoryElements, { title: string; titleEn: string }>>;
  chefPhoto?: string;  // 장인/셰프 인물 사진
  chefName?: string;   // 장인/셰프 이름
  chefTitle?: string;  // 장인/셰프 직함/소개
  menuPhotos?: { name: string; photo: string; price: string }[]; // 메뉴 사진 포함
}

export const brands: Brand[] = [
  {
    id: 'bongwoori',
    name: '봉우리 한정식',
    nameEn: 'BONGWOORI',
    category: 'korean',
    format: 'dining',
    tagline: "허영만 화백의 '식객'에 소개된\n이하연 김치 명인의 한정식",
    description:
      '봉우리 한정식은 대한민국 국가 공인 김치 명인 이하연 명인이 창립한 프리미엄 한정식 브랜드입니다. 수십 년 발효 연구의 결정체인 김치와 장류, 제철 식재료로 구성한 코스 한정식은 한국 전통 식문화의 깊이를 현대적 감성으로 재해석합니다. 비즈니스 미팅부터 특별한 기념일까지 품격 있는 자리를 완성합니다.',
    story:
      '대한민국 국가 공인 김치 명인 이하연 명인이 평생 연구한 발효의 미학. 김치 하나에도 철학이 있고 계절이 있습니다. 봉우리 한정식은 그 철학을 한 상에 담아냅니다.',
    storyElements: {
      originStory: '대한민국 국가 공인 김치 명인 이하연 명인이 수십 년간 연구한 발효의 결정체. 봉우리 한정식은 그 명인의 철학을 한 상 가득 담아 2018년 역삼동에서 처음 문을 열었습니다.',
      chefOrArtisan: '이하연 명인 — 대한민국 식품명인 제58호. 40년 이상 김치와 발효 식품을 연구해온 한식 장인',
      ingredientPhilosophy: '제철 재료만을 고집합니다. 김치와 장류는 명인이 직접 담그고, 계절마다 코스 구성이 바뀝니다. 자연이 주는 리듬 그대로를 상에 올립니다.',
      signatureMenu: '명인 김치 한정식 코스 — 계절 전채부터 명인의 숙성 김치, 정성 가득한 찬, 솥밥까지 한국 전통 식문화의 정수를 경험하는 풀코스.',
      spaceExperience: '비즈니스 미팅과 접대에 최적화된 격조 있는 공간. 프라이빗 룸에서 조용하게 식사를 즐기며 중요한 대화를 나눌 수 있습니다.',
    },
    locations: [
      { name: '역삼 본점', address: '서울 강남구 논현로94길 25-3, 2층', status: 'active', phone: '0507-1402-8551', hours: '매일 11:30~21:20 (BT 15:00~17:30)' },
      { name: '을지로점', address: '서울 중구 을지로5길 26, 미래에셋 센터원 B1', status: 'active', phone: '02-6030-8960', hours: '매일 11:30~21:20 (BT 15:00~17:30)' },
    ],
    chefPhoto: '/images/brands/story/bongwoori/artisan.jpg',
    chefName: '이하연 명인',
    image: '/images/brands/bongwoori.jpg',
    logo: '/images/brands/logos/bongwoori.png',
    keywords: ['한정식', '프리미엄 한식', '역삼 비즈니스 런치', '을지로 한정식', '서울 한정식 추천', '기업 접대 식당'],
    priceRange: '₩₩₩₩',
    accentColor: '#8B6914',
    gallery: ['/images/brands/gallery/bongwoori/store-1.jpg', '/images/brands/gallery/bongwoori/store-2.jpg', '/images/brands/gallery/bongwoori/store-3.jpg', '/images/brands/gallery/bongwoori/store-4.jpg', '/images/brands/gallery/bongwoori/store-5.jpg', '/images/brands/gallery/bongwoori/menu-1.jpg', '/images/brands/gallery/bongwoori/menu-2.jpg', '/images/brands/gallery/bongwoori/menu-3.jpg', '/images/brands/gallery/bongwoori/menu-4.jpg', '/images/brands/gallery/bongwoori/menu-5.jpg'],
    cuisine: '한정식',
    menuHighlights: [
      { name: '봉우리 정식', price: '65,000원', photo: '/images/brands/story/bongwoori/menu1.jpg' },
      { name: '식객 정식', price: '78,000원', photo: '/images/brands/story/bongwoori/menu2.jpg' },
      { name: '명인 정식', price: '150,000원', photo: '/images/brands/story/bongwoori/menu3.jpg' },
    ],
    reservationLinks: [
      { location: '역삼 본점', url: 'https://app.catchtable.co.kr/ct/shop/bongwooriyeoksam' },
      { location: '을지로점', url: 'https://app.catchtable.co.kr/ct/shop/bonguri_euljiro' },
    ],
  },
  {
    id: 'bongwoori-soban',
    name: '봉우리 소반',
    nameEn: 'BONGWOORI SOBAN',
    category: 'korean',
    format: 'casual',
    tagline: '명인의 맛을 일상으로, 정갈한 한 그릇의 미학',
    description:
      '봉우리 소반은 봉우리 한정식의 정신을 이어받아 보다 가볍고 편안한 형태로 즐길 수 있는 한식 다이닝입니다.',
    story: '건강한 식재료가 주는 에너지와 품격 있는 다이닝의 가치를 고객의 일상에 전달하고자 합니다.',
    storyElements: {
      originStory: '명인의 손맛을 더 많은 사람이 더 자주 경험할 수 있도록 \'소반 문화\'의 현대적 계승을 목표로 시작되었습니다. 복잡한 코스 요리 대신 음식 본연의 깊은 맛과 정갈한 담음새에 집중하여, 바쁜 현대인의 일상 속에 한식의 새로운 표준을 제시합니다.',
      ingredientPhilosophy: '나물, 김치, 만두 등 한식의 핵심 요소를 각 분야 명장들의 엄선된 레시피로 완성하여 맛의 깊이와 안정성을 동시에 확보했습니다. 신선한 제철 식자재를 기반으로 표준화된 조리 시스템을 구축하여, 언제 어디서나 명인의 손맛을 동일한 퀄리티로 경험할 수 있도록 운영합니다.',
      signatureMenu: '나물 명인의 정성이 깃든 산나물, 정성스럽게 빚어낸 만두와 진한 육수가 어우러진 메뉴들은 한 그릇만으로도 명인의 인심과 정성을 온전히 느낄 수 있는 시그니처 소반입니다.',
      spaceExperience: '주요 프리미엄 아울렛과 복합 문화 공간 등 접근성이 좋은 위치에서 전 세대가 편안하게 즐길 수 있는 세련된 분위기를 선사합니다. 정갈하게 차려진 소반은 시각적인 즐거움과 미식의 감동을 동시에 충족시키며, 방문객들에게 신뢰받는 한식 공간으로서의 특별한 기억을 남깁니다.',
    },
    locations: [
      { name: '신세계아울렛 여주점', address: '경기 여주시 명품로 360, 여주 신세계 프리미엄아울렛', status: 'active', phone: '031-880-1376', hours: '매일 10:00~20:00' },
    ],
    image: '/images/brands/bongwoori-soban.jpg',
    logo: '/images/brands/logos/bongwoori-soban.png',
    keywords: ['여주 맛집', '여주신세계 식당', '아울렛 한식', '경기도 한정식'],
    priceRange: '₩₩₩',
    accentColor: '#8B6914',
    gallery: ['/images/brands/gallery/bongwoori-soban/store-1.jpg', '/images/brands/gallery/bongwoori-soban/store-2.jpg', '/images/brands/gallery/bongwoori-soban/store-3.jpg', '/images/brands/gallery/bongwoori-soban/store-4.jpg', '/images/brands/gallery/bongwoori-soban/menu-1.jpg', '/images/brands/gallery/bongwoori-soban/menu-2.jpg', '/images/brands/gallery/bongwoori-soban/menu-3.jpg', '/images/brands/gallery/bongwoori-soban/menu-4.jpg'],
    cuisine: '한식',
    menuHighlights: [
      { name: '산나물 비빔밥', price: '16,000원', photo: '/images/brands/story/bongwoori-soban/menu1.jpg' },
    ],
  },
  {
    id: 'jinjin-mandu',
    name: '진진만두',
    nameEn: 'JINJIN MANDU',
    category: 'korean',
    format: 'casual',
    tagline: '30년 전통, 손맛으로 완성한 만두와 어복쟁반',
    description:
      '진진만두는 \'맛있고 풍성한 음식, 인심 좋은 대접\'을 의미하는 이름처럼 단순한 한 끼를 넘어 정성이 깃든 미식 경험을 제공합니다.',
    story:
      '여의도에서 30년. 한결같이 사랑받아 온 최고의 손만두',
    storyElements: {
      originStory: '30년이라는 긴 시간 동안 한 자리를 지켜오며 지역을 대표하는 맛집으로 성장했습니다. 오랜 세월 축적된 노하우와 변하지 않는 조리 원칙은 진진만두를 단순한 식당이 아닌 하나의 미식 유산으로 만들었습니다.',
      chefOrArtisan: '매일 아침 최상급의 재료를 선별하고 만두 하나하나를 정성을 다해 손으로 직접 빚어내는 장인 정신을 고수합니다. 30년 내공이 담긴 일정한 손맛은 기계로는 결코 흉내 낼 수 없는 진진만두만의 독보적인 가치입니다.',
      ingredientPhilosophy: '진진만두는 국내산 육우와 직접 담근 김치 등 검증된 고품질 식재료만을 사용하여 매일 정직하게 만두를 빚어냅니다. \'진진(津津)\'이라는 이름에 걸맞게 풍성한 인심을 담아내는 운영 철학은 모든 고객이 대접받는다는 느낌을 받도록 설계되었습니다.',
      signatureMenu: '매일 직접 빚어 속이 꽉 찬 \'프리미엄 손만두\'는 한우의 담백함과 김치의 개운함이 어우러진 브랜드의 정체성 그 자체입니다. 또한, 귀한 대접의 상징인 \'어복쟁반\'은 풍성한 고기와 채소가 어우러진 깊은 국물 맛으로 소중한 분과의 모임이나 비즈니스 미팅에서 가장 사랑받는 대표 시그니처 메뉴입니다.',
      spaceExperience: '활기찬 도심 속에서도 잠시 멈춰 정성 가득한 한 끼를 즐기며 몸과 마음을 채울 수 있는 정갈한 서비스와 품격 있는 분위기를 통해 방문객들에게 잊지 못할 미식의 감동을 전합니다.',
    },
    locations: [
      { name: '여의도점', address: '서울 영등포구 국제금융로8길 34 오륜빌딩 3층', status: 'active', phone: '0507-1480-8052', hours: '월~금 11:00~21:00 (BT 15:00~17:00) / 토,일 휴무' },
      { name: '국회점', address: '서울 영등포구 국회대로72길 11 프린스텔', status: 'active', phone: '0507-1318-5454', hours: '매일 11:00~21:00 (BT 15:00~17:00)' },
      { name: '시청점', address: '서울 중구 을지로 6, JEI재능교육빌딩 1층', status: 'active', phone: '0507-1387-8573', hours: '매일 11:00~21:00 (BT 15:00~17:00)' },
    ],
    chefPhoto: '/images/brands/story/jinjin-mandu/artisan.jpg',
    image: '/images/brands/jinjin-mandu.jpg',
    logo: '/images/brands/logos/jinjin-mandu.png',
    keywords: ['시청 만두', '시청 점심 맛집', '수제만두 서울', '시청역 맛집', '만두 전문점', '황해도식 만두'],
    priceRange: '₩₩',
    accentColor: '#B91C1C',
    gallery: ['/images/brands/gallery/jinjin-mandu/store-1.jpg', '/images/brands/gallery/jinjin-mandu/store-2.jpg', '/images/brands/gallery/jinjin-mandu/store-3.jpg', '/images/brands/gallery/jinjin-mandu/store-4.jpg', '/images/brands/gallery/jinjin-mandu/store-5.jpg', '/images/brands/gallery/jinjin-mandu/store-6.jpg', '/images/brands/gallery/jinjin-mandu/menu-1.jpg', '/images/brands/gallery/jinjin-mandu/menu-2.jpg', '/images/brands/gallery/jinjin-mandu/menu-3.jpg', '/images/brands/gallery/jinjin-mandu/menu-4.jpg', '/images/brands/gallery/jinjin-mandu/menu-5.jpg', '/images/brands/gallery/jinjin-mandu/menu-6.jpg'],
    cuisine: '한식',
    menuHighlights: [
      { name: '손만두떡국', price: '18,000원', photo: '/images/brands/story/jinjin-mandu/menu1.jpg' },
      { name: '손만두술국', price: '19,000원', photo: '/images/brands/story/jinjin-mandu/menu2.jpg' },
      { name: '어복쟁반 (대)', price: '103,000원', photo: '/images/brands/story/jinjin-mandu/menu3.jpg' },
    ],
    reservationLinks: [
      { location: '시청점', url: 'https://app.catchtable.co.kr/ct/shop/jinjinmanducityhall' },
    ],
  },
  {
    id: 'jinkawa',
    name: '진가와',
    nameEn: 'JINKAWA',
    category: 'japanese',
    format: 'dining',
    tagline: '360년 12대를 이어온 일본 장인의 전통면 다이닝',
    description:
      '진가와는 일본 나가사키현 미나미 시마바라시에서 시작된 전통 제면 기술을 바탕으로 만들어진 테노베면(수연면)을 활용한 면 요리와 프리미엄 일식을 함께 즐길 수 있는 다이닝 브랜드입니다.',
    story:
      '기계는 흉내낼 수 없는 맛, 손으로 한올한올 늘려 만드는 면의 정수',
    storyElements: {
      originStory: '진가와 가문은 지난 360년 동안 나가사키현 시나미 시마바라시에서 12대를 이어 일본 전통 테노베면(수연면)을 생산하고 있습니다. 3일간 18단계를 거쳐 반죽을 꼬고 늘리는 숙성 과정을 수차례 반복해 만드는 전통 방식으로 촉감이 부드럽고 목넘김이 부드러운 특유의 식감을 가진 면이 탄생됩니다.',
      chefOrArtisan: '**일본 국가공인 제면 장인, 진가와 토시오(JINKAWA TOSHIO)**\n나가사키현 유일 국가 공인 식품 명장 / 일본 총리 훈장 / 세계 최고 권위 국제 식음료 품평회 3스타 수상 (iTQi)',
      masterArtisan: '진가와 토시오(JINKAWA TOSHIO) 장인 일본 테노베면(수연면) 제조 기술을 발전시키고 많은 수제자를 양성한 공로를 인정받아 일본 국가 공인 명장 및 총리 훈장을 수상하였습니다. 특히 나가사키현의 전통적인 면 제조 방식을 현대적으로 가장 잘 보존하고 있다는 평가를 받고 있습니다.',
      ingredientPhilosophy: '끝없이 펼쳐진 홋카이도의 대지에서 자란 단단하고 풍미 깊은 밀, 나가사키 운젠산의 미네랄이 풍부한 온천수, 면의 탄력과 깊은 맛을 완성하는 전통 천일염이 더해져 진가와만의 면이 완성됩니다.',
      signatureMenu: '360년 제면 기술로 완성한 전통면 요리와 신선한 사시미, 정갈한 정식 구성으로 일본 정통 미식을 한 자리에서 경험할 수 있습니다.',
      spaceExperience: '정갈한 일식과 프라이빗한 공간이 만나 귀한 손님을 모시기에 더없이 완벽한 자리를 선사합니다.',
    },
    chefPhoto: '/images/brands/story/jinkawa/artisan.jpg',
    locations: [
      { name: '역삼점 (한국본점)', address: '서울 강남구 논현로94길 25-3, B1', status: 'active', phone: '0507-1421-8853', hours: '평일 11:30~22:30 (BT 14:30~17:30) / 주말 12:00~21:30' },
      { name: '여의도점', address: '서울 영등포구 국제금융로2길 17 씨티플라자 3층', status: 'active' },
      { name: '을지로점', address: '서울 중구 을지로5길 19 페럼타워 지하1층', status: 'active' },
      { name: '광화문점', address: '서울 종로구 종로1길 50 더케이트윈타워 지하1층', status: 'active' },
      { name: '잠실롯데월드몰점', address: '서울 송파구 올림픽로 300, 롯데월드몰 6층', status: 'active', phone: '0507-1349-4625', hours: '매일 10:30~22:00 (BT 15:00~17:00)' },
      { name: '부산 롯데백화점점', address: '부산 부산진구 가야대로 772, 롯데백화점 부산본점 9층', status: 'active', phone: '051-810-3997', hours: '매일 10:30~20:30' },

    ],
    image: '/images/brands/jinkawa.jpg',
    logo: '/images/brands/logos/jinkawa.png',
    keywords: ['진가와', '역삼 소바', '여의도 일식', '을지로 소바', '광화문 맛집', '잠실 일식', '정통 소바', '롯데월드몰 맛집', '강남 일식당', '부산 소바'],
    priceRange: '₩₩₩',
    accentColor: '#1E3A5F',
    gallery: [
      '/images/brands/gallery/jinkawa/store-1.jpg', '/images/brands/gallery/jinkawa/store-2.jpg', '/images/brands/gallery/jinkawa/store-3.jpg',
      '/images/brands/gallery/jinkawa/store-4.jpg', '/images/brands/gallery/jinkawa/store-5.jpg', '/images/brands/gallery/jinkawa/store-6.jpg',
      '/images/brands/gallery/jinkawa/store-7.jpg', '/images/brands/gallery/jinkawa/store-8.jpg', '/images/brands/gallery/jinkawa/store-9.jpg',
      '/images/brands/gallery/jinkawa/store-10.jpg', '/images/brands/gallery/jinkawa/store-12.jpg',
      '/images/brands/gallery/jinkawa/store-13.jpg',
      '/images/brands/gallery/jinkawa/menu-1.jpg', '/images/brands/gallery/jinkawa/menu-2.jpg', '/images/brands/gallery/jinkawa/menu-3.jpg',
      '/images/brands/gallery/jinkawa/menu-4.jpg', '/images/brands/gallery/jinkawa/menu-5.jpg', '/images/brands/gallery/jinkawa/menu-6.jpg',
      '/images/brands/gallery/jinkawa/menu-7.jpg', '/images/brands/gallery/jinkawa/menu-8.jpg', '/images/brands/gallery/jinkawa/menu-9.jpg',
      '/images/brands/gallery/jinkawa/menu-10.jpg', '/images/brands/gallery/jinkawa/menu-11.jpg', '/images/brands/gallery/jinkawa/menu-12.jpg',
    ],
    cuisine: '소바',
    menuHighlights: [
      { name: '자루 메밀면', price: '14,000원', photo: '/images/brands/story/jinkawa/menu1.jpg' },
      { name: '우나기동', price: '35,000원', photo: '/images/brands/story/jinkawa/menu2.jpg' },
      { name: '사시미 & 스시 정식', price: '37,000원~49,000원', photo: '/images/brands/story/jinkawa/menu3.jpg' },
      { name: '스키야키 우동나베 코스', price: '49,000원', photo: '/images/brands/story/jinkawa/menu4.jpg' },
      { name: '가이세키 코스', price: '59,000원', photo: '/images/brands/story/jinkawa/menu5.jpg' },
      { name: '셰프 스페셜 코스', price: '79,000원', photo: '/images/brands/story/jinkawa/menu6.jpg' },
    ],
    reservationLinks: [
      { location: '역삼점 (한국본점)', url: 'https://app.catchtable.co.kr/ct/shop/jinkawa_yeoksam' },
      { location: '여의도점', url: 'https://map.naver.com/p/entry/place/1974070800?placePath=/booking' },
      { location: '을지로점', url: 'https://pcmap.place.naver.com/restaurant/1266313632/booking' },
      { location: '광화문점', url: 'https://pcmap.place.naver.com/restaurant/1951174994/booking' },
      { location: '잠실롯데월드몰점', note: '전화예약' },
      { location: '부산 롯데백화점점', note: '전화예약' },
    ],
  },
  {
    id: 'bunjiro',
    name: '분지로',
    nameEn: 'BUNJIRO',
    category: 'japanese',
    format: 'dining',
    categoryLabel: 'JAPANESE PREMIUM TONKATSU',
    storyTitleOverrides: {
      spaceExperience: { title: '카메야마 도자기', titleEn: 'KAMEYAMA POTTERY' },
    },
    tagline: '타카다 유지 장인의 돈카츠 철학',
    description:
      '분지로는 일본 나가사키 장인의 기술과 국내산 최상급 원육으로 완성한 프리미엄 돈카츠 브랜드입니다.',
    story:
      '타카다 유지 장인이 나가사키에서 평생을 바쳐 만들어온 돈카츠. 두껍게 썰어 촘촘하게 튀긴 한 조각에 장인의 시간이 담깁니다. 분지로는 그 철학 자체를 한국에 가져왔습니다.',
    storyElements: {
      originStory: '일본 나가사키에서 시작된 20년 전통 카츠 브랜드의 기술을 바탕으로,\n한국 고객의 취향에 맞춰 새롭게 완성한 프리미엄 돈카츠 브랜드입니다.',
      chefOrArtisan: '나가사키 카츠 장인 타카다 유지의 기술과 철학을 바탕으로 완성했습니다.\n재료 선정부터 손질, 튀김의 타이밍까지 정교한 기준으로 완성한 프리미엄 돈카츠를 선보입니다.',
      ingredientPhilosophy: '좋은 고기에서 시작되는 맛\n숙성 과정을 거친 국내산 돼지고기로 깊은 풍미와 부드러운 식감을 완성합니다.\n\n장인의 튀김 기술\n특제 빵가루와 정교한 공정으로 바삭하면서도 가벼운 식감을 구현합니다.',
      signatureMenu: '두툼한 원육의 풍미와 바삭한 튀김옷이 조화를 이루는 돈카츠,\n깊은 감칠맛의 특제 카레까지\n익숙한 메뉴를 프리미엄으로 재해석했습니다.',
      spaceExperience: '데이트, 가족 외식, 쇼핑 중 식사까지\n편안하면서도 완성도 높은 식사를 즐길 수 있는 공간입니다.',
    },
    chefPhoto: '/images/brands/story/bunjiro/artisan.jpg',
    locations: [
      { name: '한국본점 (명동)', address: '서울 중구 남대문로 81, 롯데백화점 본점 13층', status: 'active', phone: '02-726-4337', hours: '매일 10:30~21:00 (LO 20:00)' },
      { name: '사운즈한남점', address: '서울 용산구 대사관로 35, 사운즈한남 1층', status: 'active', phone: '02-794-2648', hours: '매일 11:00~22:00 (BT 15:00~17:00)' },
      { name: '타임빌라스 수원점', address: '경기 수원시 권선구 세화로 134, 타임빌라스 수원 3층', status: 'active', phone: '0507-1361-8572', hours: '매일 10:30~22:00 (LO 21:00)' },
      { name: '롯데월드몰점', address: '서울 송파구 올림픽로 300, 롯데월드몰 5층', status: 'active', phone: '02-3213-4581', hours: '매일 10:30~22:00' },
      { name: '롯데백화점 잠실점', address: '서울 송파구 잠실 롯데백화점', status: 'coming-soon' },
    ],
    image: '/images/brands/bunjiro.jpg',
    logo: '/images/brands/logos/bunjiro.png',
    keywords: [
      '분지로', '나가사키 돈카츠', '명동 돈카츠', '한남 맛집', '사운즈한남 식당',
      '롯데월드몰 돈카츠', '데이트 코스 한남', '서울 돈카츠 맛집', '일본 장인 돈카츠',
    ],
    priceRange: '₩₩₩',
    accentColor: '#5C4033',
    gallery: ['/images/brands/gallery/bunjiro/hero-1.jpg', '/images/brands/gallery/bunjiro/hero-2.jpg', '/images/brands/gallery/bunjiro/hero-3.jpg', '/images/brands/gallery/bunjiro/store-1.jpg', '/images/brands/gallery/bunjiro/store-2.jpg', '/images/brands/gallery/bunjiro/store-3.jpg', '/images/brands/gallery/bunjiro/store-4.jpg', '/images/brands/gallery/bunjiro/store-5.jpg', '/images/brands/gallery/bunjiro/store-6.jpg', '/images/brands/gallery/bunjiro/menu-1.jpg', '/images/brands/gallery/bunjiro/menu-2.jpg', '/images/brands/gallery/bunjiro/menu-3.jpg', '/images/brands/gallery/bunjiro/menu-4.jpg', '/images/brands/gallery/bunjiro/menu-5.jpg', '/images/brands/gallery/bunjiro/menu-6.jpg'],
    cuisine: '돈카츠',
    menuHighlights: [
      { name: '장인 로스카츠', price: '16,000원~29,000원', photo: '/images/brands/story/bunjiro/menu1.jpg' },
    ],
    reservationLinks: [
      { location: '한국본점 (명동)', note: '전화예약' },
      { location: '사운즈한남점', url: 'https://app.catchtable.co.kr/ct/shop/bunjiro_soundshannam' },
      { location: '타임빌라스 수원점', note: '전화예약' },
      { location: '롯데월드몰점', note: '현장 대기' },
    ],
  },
  {
    id: 'daisen',
    name: '다이센스시',
    nameEn: 'DAISEN SUSHI',
    category: 'japanese',
    format: 'dining',
    tagline: '최상의 식재료와 장인의 손길로 완성한 정통 스시 다이닝',
    description:
      '다이센 스시는 일본 나가사키에서 시작된 정통 스시 브랜드로, 1997년부터 이어온 장인의 철학과 특제 샤리초·전용 간장의 비법으로 압도적인 품질의 스시를 합리적인 가격에 제공합니다.',
    story:
      '다이센 스시는 규슈 지역을 대표하는 스시 전문 브랜드로, 신선한 회와 특제 샤리초, 간장이 어우러진 정통 장인의 초밥을 제공합니다.',
    storyElements: {
      originStory: '1997년 일본 나가사키에서 시작되어 오랜 시간 지역민들에게 사랑받아온 정통성을 가지고 있습니다. 규슈의 미식 철학을 계승하여 한국 본토에 성공적으로 안착하며, 원조 스시 장인의 가치를 이어가고 있습니다.',
      chefOrArtisan: '1997년부터 이어져 온 스시 장인 \'야마구치\'의 철학과 손맛이 고스란히 담겨 있습니다. 스시의 본질을 꿰뚫는 장인의 기술력을 바탕으로, 한 점 한 점 정성을 다해 빚어내는 정통 스시의 진수를 보여줍니다.',
      ingredientPhilosophy: '다이센 스시는 원재료가 가진 본연의 풍미를 극대화하기 위해 다이센만의 비법이 담긴 특제 샤리초와 전용 간장을 고집하며 맛의 깊이를 완성합니다. 제철 해산물을 다루는 섬세하고 전문적인 기술력을 통해 대중적이면서도 격조 있는 고품격 메뉴 구성을 선보입니다.',
      signatureMenu: '스시 다이닝의 정수를 한 번에 만끽할 수 있는 코스는 장인의 엄격한 안목으로 선별된 최상의 네타가 조화를 이루는 브랜드의 대표 메뉴입니다. 또한 정갈한 상차림과 깊은 맛을 동시에 갖추어 비즈니스 런치나 일상의 특별한 한 끼를 찾는 분들에게 꾸준한 사랑을 받고 있습니다.',
      spaceExperience: '스시 카운터와 프라이빗 룸 등 다양한 공간 구성을 통해 방문 그 자체로 특별한 가치를 느낄 수 있는 미식의 장을 마련했습니다. 정갈하고 세련된 분위기는 소중한 분과의 데이트는 물론, 신뢰가 중요한 비즈니스 미팅과 가족 모임의 품격을 한층 높여주는 완벽한 경험을 완성합니다.',
    },
    locations: [
      { name: '한국본점 (사운즈한남)', address: '서울 용산구 대사관로 35, 사운즈한남 야외 2층', status: 'active', phone: '070-7723-0072', hours: '매일 11:30~22:30 (BT 15:00~17:30)' },
    ],
    image: '/images/brands/daisen.jpg',
    logo: '/images/brands/logos/daisen.png',
    keywords: [
      '다이센스시', '한남 프라이빗 스시', '한남동 스시', '서울 프리미엄 스시',
      '프리미엄 스시 서울', '한남 데이트 코스', '특별한 날 식당 서울', '사운즈한남 스시',
    ],
    priceRange: '₩₩₩₩',
    accentColor: '#1a1a2e',
    gallery: ['/images/brands/gallery/daisen/hero-1.jpg', '/images/brands/gallery/daisen/hero-2.jpg', '/images/brands/gallery/daisen/hero-3.jpg', '/images/brands/gallery/daisen/store-1.jpg', '/images/brands/gallery/daisen/store-2.jpg', '/images/brands/gallery/daisen/store-3.jpg', '/images/brands/gallery/daisen/store-4.jpg', '/images/brands/gallery/daisen/store-5.jpg', '/images/brands/gallery/daisen/store-6.jpg', '/images/brands/gallery/daisen/menu-1.jpg', '/images/brands/gallery/daisen/menu-2.jpg', '/images/brands/gallery/daisen/menu-3.jpg', '/images/brands/gallery/daisen/menu-4.jpg', '/images/brands/gallery/daisen/menu-5.jpg', '/images/brands/gallery/daisen/menu-6.jpg'],
    cuisine: '프리미엄 스시',
    chefPhoto: '/images/brands/story/daisen/artisan.jpg',
    menuHighlights: [
      { name: '런치 코스', price: '50,000원~', photo: '/images/brands/story/daisen/menu1.jpg' },
      { name: '디너 코스', price: '77,000원~150,000원', photo: '/images/brands/story/daisen/menu2.jpg' },
    ],
    reservationLinks: [
      { location: '한국본점 (사운즈한남)', url: 'https://app.catchtable.co.kr/ct/shop/daisensushi' },
    ],
  },
  {
    id: 'takumi-nagasaki',
    name: '타쿠미나가사키',
    nameEn: 'TAKUMI NAGASAKI',
    category: 'japanese',
    format: 'casual',
    tagline: '나가사키 장인의 정교한 기술로 완성한 캐주얼 일식의 기준',
    description:
      '타쿠미 나가사키는 미식의 고장 나가사키 장인들이 지켜온 깊은 손맛을 합리적인 가치로 전하며, 일상의 식사 시간을 격조 높은 경험으로 치환하는 프리미엄 면·카츠 전문 브랜드입니다.',
    story:
      '나가사키 미식의 정수를 담은 파인 캐주얼 다이닝',
    storyElements: {
      originStory: '오랜 시간 축적된 나가사키의 풍부한 미식 헤리티지를 계승하며, 장인 정신이 깃든 음식을 더 많은 사람이 향유할 수 있도록 그 정통성을 대중화하는 데 브랜드의 뿌리를 두고 있습니다.',
      ingredientPhilosophy: '오랜 숙성을 통해 빚어낸 쫄깃한 면발과 본토의 기술로 튀겨낸 돈카츠는 타쿠미 나가사키가 추구하는 독보적인 기술력을 상징합니다.',
      signatureMenu: '최상급 돼지고기를 사용하여 바삭한 식감이 일품인 \'등심 돈카츠\'는 브랜드의 기술력을 고스란히 담아낸 대표 메뉴입니다. 또한, 일본 3대 우동으로 손꼽히는 \'카케 우동(고토 우동)\'은 오랜 숙성 과정을 통해 완성된 특유의 쫄깃한 면발과 깊은 육수 맛으로 정통 일식의 진수를 보여주는 시그니처 메뉴입니다.',
      spaceExperience: '핵심 쇼핑 권역에 입점하여 바쁜 일상 속에서도 수준 높은 식사를 원하는 고객들에게 최적의 장소를 선사합니다.',
    },
    locations: [
      { name: '고속터미널점', address: '서울 서초구 신반포로 194, 서울고속버스터미널 경부선 1층', status: 'active', phone: '0507-1350-8553', hours: '매일 10:00~21:00 (LO 20:30)' },
      { name: '용산 아이파크몰점', address: '서울 용산구 한강대로23길 55, 아이파크몰 리빙관 7층', status: 'active', phone: '0507-1465-1666', hours: '매일 11:00~22:00 (LO 21:00)' },
      { name: '롯데백화점 광복점', address: '부산 중구 중앙대로 2, 롯데백화점 광복점', status: 'active', phone: '051-678-4248', hours: '매일 10:30~21:00 (LO 20:00)' },
    ],
    image: '/images/brands/takumi-nagasaki.jpg',
    logo: '/images/brands/logos/takumi-nagasaki.png',
    keywords: ['타쿠미나가사키', '고속터미널 일식', '용산 일식당', '아이파크몰 맛집', '파인캐주얼 일식', '나가사키 요리'],
    priceRange: '₩₩₩',
    accentColor: '#2C3E50',
    gallery: ['/images/brands/gallery/takumi-nagasaki/store-1.jpg', '/images/brands/gallery/takumi-nagasaki/store-2.jpg', '/images/brands/gallery/takumi-nagasaki/store-3.jpg', '/images/brands/gallery/takumi-nagasaki/menu-1.jpg', '/images/brands/gallery/takumi-nagasaki/menu-2.jpg', '/images/brands/gallery/takumi-nagasaki/menu-3.jpg'],
    cuisine: '일식',
    menuHighlights: [
      { name: '등심돈카츠', price: '14,000원~19,000원', photo: '/images/brands/story/takumi-nagasaki/menu1.jpg' },
      { name: '카게우동', price: '14,000원', photo: '/images/brands/story/takumi-nagasaki/menu2.jpg' },
    ],
  },
  {
    id: 'menya-always',
    name: '멘야올웨이즈',
    nameEn: 'MENYA ALWAYS',
    category: 'japanese',
    format: 'casual',
    tagline: '언제 방문해도 변함없는 최고의 한 그릇',
    description:
      '멘야올웨이즈는 육수와 면을 직접 제조하는 장인형 라멘 브랜드입니다. 전통과 현대적 해석을 결합해 맛의 \'재현성\'과 \'중독성\'을 강화한 것이 특징입니다. 2026년 말 성수에 1호점 론칭을 앞두고 있으며, 높은 재방문율 기반의 충성도 구조로 확장을 준비하고 있습니다.',
    story: '시간이 흘러도 변치 않는 단 한 그릇, 장인의 고집이 빚어낸 라멘의 정점',
    storyElements: {
      originStory: '수많은 라멘 전문점 사이에서도 독보적인 존재감을 드러낼 수 있었던 비결은 정통 조리법에 대한 깊은 존중과 현대적인 감각의 조화에 있습니다. 우리는 한 그릇의 라멘이 단순한 식사를 넘어 브랜드와 고객 사이의 단단한 신뢰가 되는 과정을 브랜드의 역사로 삼고 있습니다.',
      chefOrArtisan: '우리는 매일 새벽, 그날의 기온과 습도에 맞춰 밀가루를 배합하고 면을 뽑아내는 자가제면의 원칙을 고수합니다. 스프의 성격에 따라 면의 굵기와 식감을 세 가지로 세밀하게 분류하여 최적의 조화를 찾아내는 집요함은 멘야 올웨이즈가 정의하는 장인 정신의 실체입니다.',
      ingredientPhilosophy: '전통 소바 가에시 기법을 근간으로 조개와 액젓 등을 독창적으로 배합한 특제 다래 소스는 멘야 올웨이즈만의 깊은 감칠맛을 완성하는 핵심 동력입니다. 최상급 프리미엄 밀가루만을 사용하여 빚어낸 면발은 스프의 간을 섬세하게 머금으며 마지막 한 점까지 일관된 만족감을 선사합니다.',
      signatureMenu: '돈코츠 특유의 묵직하고 진한 육수에 레몬의 산뜻한 산미를 더한 \'레몬 돈코츠 라멘\'은 멘야 올웨이즈의 독창적인 기술력을 상징하는 대표 메뉴입니다. 자칫 무거울 수 있는 육수의 끝맛을 레몬의 향긋함이 섬세하게 잡아주며, 자가제면한 면발과의 완벽한 밸런스를 통해 이전에 경험해보지 못한 새로운 차원의 풍미를 선사합니다.',
      spaceExperience: '전통적인 라멘 가옥의 정취와 현대적인 간결함이 공존하는 공간은 오직 맛에만 집중할 수 있는 최적의 환경을 제공합니다. 2030 라멘 마니아부터 트렌드에 민감한 방문객까지, 모든 이가 정갈하게 차려진 한 그릇을 마주하며 일상의 번잡함을 잊고 미식의 본질에 몰입하는 순간을 제공하고자 합니다.',
    },
    locations: [
      { name: '성수점 (1호점)', address: '서울 성동구 (2026년 말 오픈 예정)', status: 'coming-soon' },
    ],
    chefPhoto: '/images/brands/story/menya-always/artisan.jpg',
    image: '/images/brands/menya-always.jpg',
    logo: '/images/brands/logos/menya-always.png',
    keywords: ['멘야올웨이즈', '서울 라멘', '정통 일본 라멘', '라멘 맛집 서울', '성수 라멘', '돈코츠 라멘'],
    priceRange: '₩₩',
    accentColor: '#C2410C',
    cuisine: '라멘',
    menuHighlights: [
      { name: '레몬 돈코츠 라멘', price: '가격 미정', photo: '/images/brands/story/menya-always/menu1.jpg' },
      { name: '특제 츠케멘', price: '가격 미정', photo: '/images/brands/story/menya-always/menu2.jpg' },
    ],
  },
  {
    id: 'cafe-le-sens',
    name: '카페 르상스',
    nameEn: 'CAFÉ LE SENS',
    category: 'cafe',
    format: 'cafe',
    categoryLabel: 'CAFE. BAKERY. WINE.',
    tagline: '머무는 모든 순간이 휴식이 되는 감각적인 베이커리 카페',
    description:
      '카페 르상스는 바쁜 일상에서 잠시 벗어나고자 하는 이들에게 따뜻한 위로와 세련된 미식의 경험을 동시에 제공하는 프리미엄 베이커리 카페입니다.',
    story:
      '감각을 깨우고 잠시 숨을 고르는 체류형 공간.',
    storyElements: {
      originStory: '프랑스 정통 베이커리가 지닌 본질적인 가치 위에 동시대적인 감각을 유연하게 더하며 브랜드의 여정을 시작하였습니다. 단순한 카페의 역할을 넘어, 유럽 특유의 낭만과 여유로운 삶의 방식을 한국의 도심 속에서도 온전히 향유할 수 있는 미식과 문화의 접점을 만들어가고 있습니다.',
      ingredientPhilosophy: '현지의 오리지널리티를 재현하기 위해 최고급 원재료만을 고집하며 재료가 가진 본연의 풍미를 극대화하는 조리법을 엄격히 준수합니다. 갓 구운 빵의 향기와 엄선된 주류, 그리고 공간을 채우는 음악이 어우러지는 순간을 만나보세요.',
      signatureMenu: '프랑스 정통 레시피로 구워내어 바삭한 식감과 진한 버터의 풍미가 입안 가득 퍼지는 프렌치 베이커리는 브랜드의 자부심을 상징하는 대표적인 메뉴입니다. 이와 함께 맑고 깊은 향으로 마음의 평온을 돕는 \'오가와 티(Ogawa Tea)\'는 베이커리의 풍미를 차분하게 감싸 안으며 진정한 휴식의 시간을 완성합니다.',
      spaceExperience: '유럽의 노천 카페를 떠올리게 하는 야외 테라스와 감각적인 인테리어는 방문객에게 시각적인 편안함과 정서적인 휴식을 동시에 제공합니다. 재즈 음악이 흐르는 이 공간에서 즐기는 커피와 티, 와인은 단순한 취식을 넘어선 예술적 영감을 얻는 특별한 경험이 되어, 일상의 작은 순간을 더욱 풍요롭게 채워줍니다.',
    },
    locations: [
      { name: '사운즈한남점', address: '서울 용산구 대사관로 35, 사운즈한남 1층', status: 'active', phone: '02-794-9009', hours: '매일 10:00~22:00 (LO 21:30)' },
    ],
    image: '/images/brands/cafe-le-sens.jpg',
    logo: '/images/brands/logos/cafe-le-sens.png',
    keywords: ['카페르상스', '한남동 카페', '사운즈한남 카페', '한남 브런치', '한남 데이트 카페', '용산 카페 추천'],
    priceRange: '₩₩',
    accentColor: '#6B4C3B',
    gallery: ['/images/brands/gallery/cafe-le-sens/gallery-01.jpg', '/images/brands/gallery/cafe-le-sens/gallery-02.jpg', '/images/brands/gallery/cafe-le-sens/gallery-03.jpg', '/images/brands/gallery/cafe-le-sens/gallery-04.jpg', '/images/brands/gallery/cafe-le-sens/gallery-05.jpg', '/images/brands/gallery/cafe-le-sens/gallery-06.jpg', '/images/brands/gallery/cafe-le-sens/gallery-07.jpg', '/images/brands/gallery/cafe-le-sens/gallery-08.jpg', '/images/brands/gallery/cafe-le-sens/gallery-09.jpg', '/images/brands/gallery/cafe-le-sens/gallery-10.jpg', '/images/brands/gallery/cafe-le-sens/gallery-11.jpg', '/images/brands/gallery/cafe-le-sens/gallery-12.jpg', '/images/brands/gallery/cafe-le-sens/gallery-13.jpg', '/images/brands/gallery/cafe-le-sens/gallery-14.jpg', '/images/brands/gallery/cafe-le-sens/gallery-15.jpg', '/images/brands/gallery/cafe-le-sens/gallery-16.jpg', '/images/brands/gallery/cafe-le-sens/gallery-17.jpg'],
    cuisine: '카페',
    menuHighlights: [
      { name: '스페셜티 커피 & 티', price: '6,000원~', photo: '/images/brands/story/cafe-le-sens/menu1.jpg' },
      { name: '아티장 브레드 & 디저트', price: '5,000원~', photo: '/images/brands/story/cafe-le-sens/menu2.jpg' },
      { name: '주류', price: '9,000원~', photo: '/images/brands/story/cafe-le-sens/menu3.jpg' },
    ],
    reservationLinks: [
      { location: '사운즈한남점', url: 'https://app.catchtable.co.kr/ct/shop/cafelesens' },
    ],
  },
  {
    id: 'noflex-nyc',
    name: '노플렉스 뉴욕',
    nameEn: 'NOFLEX NYC',
    category: 'american',
    format: 'lounge club',
    tagline: '미디어와 음악, 다이닝이 결합된 글로벌 라운지',
    description:
      'NOFLEX NYC는 뉴욕 맨해튼 5번가에 위치한 미디어 아트 레스토랑 & 칵테일 바로, 20m LED 미디어월 기반 몰입형 공간에서 K-FOOD, MUSIC, ART가 결합된 경험 소비형 다이닝의 극대화를 추구합니다.',
    story:
      '다이닝과 예술의 경계를 허무는 새로운 시도.',
    storyElements: {
      originStory: '넥스트다이닝의 글로벌 진출 선언과 함께 탄생한 노플렉스는 뉴욕 현지 미디어와 인플루언서들 사이에서 반드시 방문해야 할 핫플레이스로 등극하며 K-컬처의 위상을 알렸습니다. 한국과 일본, 미국을 잇는 콘텐츠 프로바이더로서의 역량을 바탕으로, 뉴욕의 역동적인 에너지 속에 한국적인 감각을 세련되게 녹여내며 전 세계인이 향유하는 글로벌 외식 문화의 기준을 세워가고 있습니다.',
      ingredientPhilosophy: '캐주얼 다이닝급의 고품격 퓨전 한식을 기반으로, 글로벌 MZ세대의 입맛을 사로잡는 혁신적인 메뉴를 제안합니다. 특히 뉴욕 현지에서도 경험하기 힘든 독창적인 한국식 칵테일과 엄선된 주류 리스트는 한식이 가진 가능성을 미학적으로 확장합니다.',
      signatureMenu: '뉴욕 스타일로 재해석한 플래터는 한식의 본질적인 풍미를 현대적인 감각으로 풀어낸 결정체입니다. 여기에 노플렉스만의 독자적인 레시피로 제조된 시그니처 한국식 칵테일은 미디어 아트의 화려한 영상미와 어우러져 단순한 음용을 넘어선 예술적 경험을 완성합니다.',
      spaceExperience: '맨해튼의 세련된 감성과 한국의 현대적 미학이 공존하는 공간은 그 자체로 거대한 미디어 캔버스가 됩니다. 20m 스크린에서 펼쳐지는 경이로운 영상미와 심장을 울리는 사운드 층위는 일상의 소음을 지우고 오직 현재의 즐거움에만 몰입하게 합니다.',
    },
    locations: [
      { name: '뉴욕 맨해튼', address: '286 5th Avenue, 1st Floor, New York, NY 10001', status: 'active', phone: '(347) 572-1027', hours: '화~일 17:00~02:00 (금·토 ~04:00) / 월 휴무' },
    ],
    image: '/images/brands/noflex-nyc.jpg',
    logo: '/images/brands/logos/noflex-nyc.png',
    keywords: ['NOFLEX NYC', '노플렉스뉴욕', '뉴욕 한국 레스토랑', 'media art restaurant NYC', 'immersive dining NYC', '맨해튼 칵테일바', '넥스트다이닝 미국'],
    priceRange: '$$$',
    accentColor: '#5B21B6',
    gallery: ['/images/brands/gallery/noflex-nyc/store-1.jpg', '/images/brands/gallery/noflex-nyc/store-2.jpg', '/images/brands/gallery/noflex-nyc/menu-1.jpg', '/images/brands/gallery/noflex-nyc/menu-2.jpg', '/images/brands/gallery/noflex-nyc/menu-3.jpg', '/images/brands/gallery/noflex-nyc/menu-4.jpg'],
    cuisine: '모던 다이닝 & 칵테일 바',
    menuHighlights: [
      { name: 'K-모던 한식 플레이트', price: '$25~', photo: '/images/brands/story/noflex-nyc/menu1.jpg' },
      { name: '시그니처 칵테일', price: '$18~', photo: '/images/brands/story/noflex-nyc/menu2.jpg' },
    ],
    website: 'https://noflex.nyc',
    reservationLinks: [
      { location: '뉴욕 맨해튼', url: 'https://resy.com/cities/new-york-ny/venues/noflex-nyc' },
    ],
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
