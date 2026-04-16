export type BrandCategory = 'japanese' | 'korean' | 'cafe' | 'american';
export type BrandFormat = 'dining' | 'casual' | 'foodcourt' | 'lounge' | 'pub';
export type LocationStatus = 'active' | 'coming-soon' | 'closed';

export interface BrandLocation {
  name: string;
  address: string;
  status: LocationStatus;
  phone?: string;
  hours?: string;
}

/** 브랜드 페이지 5대 스토리텔링 요소 (벤치마킹 도출) */
export interface BrandStoryElements {
  originStory?: string;       // 탄생 배경·역사
  chefOrArtisan?: string;     // 셰프·장인 이야기
  ingredientPhilosophy?: string; // 식재료 철학
  signatureMenu?: string;     // 시그니처 메뉴 소개
  spaceExperience?: string;   // 공간·경험 설계
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
  accentColor?: string; // hex color for visual theming
  gallery?: string[]; // 갤러리 이미지 경로
  heroImage?: string;  // 히어로 풀스크린용 고해상도 이미지
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
    tagline: '김치 명인이 빚어낸 한국 전통의 정수',
    description:
      '봉우리 한정식은 대한민국 국가 공인 김치 명인 이하연 명인이 창립한 프리미엄 한정식 브랜드입니다. 수십 년 발효 연구의 결정체인 김치와 장류, 제철 식재료로 구성한 코스 한정식은 한국 전통 식문화의 깊이를 현대적 감성으로 재해석합니다. 비즈니스 미팅부터 특별한 기념일까지 품격 있는 자리를 완성합니다.',
    story:
      '대한민국 국가 공인 김치 명인 이하연 명인이 평생 연구한 발효의 미학. 김치 하나에도 철학이 있고 계절이 있습니다. 봉우리 한정식은 그 철학을 한 상에 담아냅니다.',
    storyElements: {
      originStory: '대한민국 국가 공인 김치 명인 이하연 명인이 수십 년간 연구한 발효의 결정체. 봉우리 한정식은 그 명인의 철학을 한 상 가득 담아 2018년 역삼동에서 처음 문을 열었습니다.',
      chefOrArtisan: '이하연 명인 — 대한민국 식품명인 제58호. 40년 넘게 김치와 장류 연구에 매진하며 한국 발효 식문화의 깊이를 세계에 알리고 있습니다.',
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
    gallery: ['/images/brands/gallery/bongwoori/store-1.jpg', '/images/brands/gallery/bongwoori/store-2.jpg', '/images/brands/gallery/bongwoori/menu-1.jpg', '/images/brands/gallery/bongwoori/menu-2.jpg'],
    cuisine: '한정식',
    menuHighlights: [
      { name: '봉우리 정식', price: '65,000원' },
      { name: '식객 정식', price: '78,000원' },
      { name: '명인 정식', price: '150,000원' },
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
    format: 'foodcourt',
    tagline: '소박하지만 진정성 있는 한 상',
    description:
      '봉우리 소반은 봉우리 한정식의 정신을 이어받아 보다 가볍고 편안한 형태로 즐길 수 있는 한식 다이닝입니다. 여주신세계아울렛에서 쇼핑 후 들를 수 있는 고품격 한식을 선보입니다.',
    story: '소반(小盤)처럼 소박하지만 정성으로 가득한 한 끼. 진정한 맛의 가치를 전합니다.',
    storyElements: {
      originStory: '봉우리 한정식의 정신을 보다 편안한 형태로 전하고자 탄생한 캐주얼 한식 다이닝. 아울렛 쇼핑의 피로를 달래줄 정갈한 한 상을 목표로 합니다.',
      ingredientPhilosophy: '봉우리 한정식에서 이어받은 명인의 김치와 장류를 기본에 두되, 부담 없는 가격에 정성스러운 한 끼를 완성합니다.',
      signatureMenu: '소반 정식 — 제철 나물, 명인 김치, 정갈한 반찬과 솥밥으로 구성된 한 상 차림.',
      spaceExperience: '여주 신세계프리미엄아울렛 내 위치. 가족 단위 쇼핑객, 3040 여성·커플, 국내외 관광객까지 폭넓은 고객층이 쇼핑 후 편안하게 즐기는 고품격 한식 공간.',
    },
    locations: [
      { name: '여주신세계아울렛점', address: '경기 여주시 명품로 360, 여주 신세계 프리미엄아울렛', status: 'active' },
    ],
    image: '/images/brands/bongwoori-soban.jpg',
    logo: '/images/brands/logos/bongwoori-soban.png',
    keywords: ['여주 맛집', '여주신세계 식당', '아울렛 한식', '경기도 한정식'],
    priceRange: '₩₩₩',
    accentColor: '#A0522D',
    gallery: ['/images/brands/gallery/bongwoori-soban/store-1.jpg', '/images/brands/gallery/bongwoori-soban/store-2.jpg', '/images/brands/gallery/bongwoori-soban/menu-1.jpg', '/images/brands/gallery/bongwoori-soban/menu-2.jpg'],
    cuisine: '한식',
  },
  {
    id: 'jinjin-mandu',
    name: '진진만두',
    nameEn: 'JINJIN MANDU',
    category: 'korean',
    format: 'casual',
    tagline: '30년 전통, 손맛으로 완성한 만두와 어복쟁반',
    description:
      '진진만두는 여의도에서 30년간 한자리를 지켜온 남승욱 대표가 창립한 만두 전문 브랜드입니다. 직접 빚는 수제 만두와 전통 한식을 중심으로 \'건강하고 믿을 수 있는 맛\'을 추구하며, 13년 연속 블루리본에 선정된 검증된 브랜드 파워를 갖추고 있습니다. 현재 시청점에서 운영 중이며 전국 확장 가능한 안정적 모델로 평가받고 있습니다.',
    story:
      '여의도에서 30년. 남승욱 대표가 변하지 않은 레시피와 정직한 재료로 지켜온 맛. 진진만두의 한 입은 그 세월이 담긴 한 입입니다.',
    storyElements: {
      originStory: '1990년대 여의도에서 시작해 30년간 한자리를 지킨 만두 전문점. 남승욱 대표가 매일 새벽부터 직접 빚어온 만두로 여의도 직장인들의 든든한 한 끼가 되어왔습니다.',
      chefOrArtisan: '남승욱 대표 — 30년간 만두 하나에 집중해온 장인. 변하지 않는 레시피와 정직한 재료 철학으로 세대를 넘어 사랑받는 맛을 이어갑니다.',
      ingredientPhilosophy: '매일 아침 직접 다지는 신선한 채소와 고기. 기계가 아닌 손으로, 냉동이 아닌 그날 빚은 만두만을 고집합니다.',
      signatureMenu: '수제 왕만두, 물만두, 군만두 — 30년 내공이 담긴 속 꽉 찬 만두. 직접 우린 맑은 육수와 함께.',
      spaceExperience: '시청 인근 소박하지만 정겨운 공간. 바쁜 도심 속 따뜻한 한 끼를 나누는 동네 만두집의 정서를 간직하고 있습니다.',
    },
    locations: [
      { name: '시청점', address: '서울 중구 을지로 6, JEI재능교육빌딩 1층', status: 'active', phone: '0507-1387-8573' },
    ],
    image: '/images/brands/jinjin-mandu.jpg',
    logo: '/images/brands/logos/jinjin-mandu.png',
    keywords: ['시청 만두', '시청 점심 맛집', '수제만두 서울', '시청역 맛집', '만두 전문점', '황해도식 만두'],
    priceRange: '₩₩',
    accentColor: '#B91C1C',
    gallery: ['/images/brands/gallery/jinjin-mandu/store-1.jpg', '/images/brands/gallery/jinjin-mandu/store-2.jpg', '/images/brands/gallery/jinjin-mandu/menu-1.jpg', '/images/brands/gallery/jinjin-mandu/menu-2.jpg'],
    cuisine: '한식',
    menuHighlights: [
      { name: '손만두떡국', price: '18,000원' },
      { name: '손만두술국', price: '19,000원' },
      { name: '어복쟁반 (대)', price: '103,000원' },
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
    tagline: '370년 전통, 나가사키 수연면의 계보',
    description:
      '진가와(陣川)는 일본 나가사키 현 미나미 시마바라에서 약 360~370년의 역사를 이어온 전통 수연면(手延麺) 브랜드의 한국 상륙입니다. 장인이 손으로 늘여 만드는 수연면 특유의 쫄깃한 식감과 깊은 육수는 수백 년의 역사가 한 그릇에 담긴 경험을 선사합니다. 역삼, 잠실, 부산에서 만날 수 있습니다.',
    story:
      '미나미 시마바라(南島原)에서 약 370년. 전쟁도, 재해도, 시대의 변화도 이 면 한 가닥을 끊지 못했습니다. 진가와는 그 긴 시간이 만든 맛을 서울로 가져왔습니다.',
    storyElements: {
      originStory: '나가사키 현 미나미 시마바라에서 약 370년간 이어져 온 수연면(手延麺)의 계보. 에도시대부터 대를 이어 면을 늘여온 장인 가문의 기술이 서울에 상륙했습니다.',
      chefOrArtisan: '미나미 시마바라 수연면 장인들 — 370년간 전쟁과 재해 속에서도 끊이지 않은 면 뽑기의 기술. 손으로 늘이고 바람에 말린 면 한 가닥에 세대의 집념이 담깁니다.',
      ingredientPhilosophy: '100% 메밀과 전통 제법. 면은 현지 장인이 손으로 직접 늘이고, 육수는 매일 새벽부터 정성껏 우려냅니다. 간결한 재료, 깊은 맛.',
      signatureMenu: '수연소바 — 370년 전통 수연면으로 만든 정통 소바. 쫄깃한 식감과 깊은 쯔유의 조화가 일본 현지를 방불케 합니다.',
      spaceExperience: '일본 전통 소바야의 단정함을 재현한 공간. 나무와 돌의 자연 소재가 조화를 이루며, 면을 늘이는 장인의 모습을 가까이에서 감상할 수 있습니다.',
    },
    locations: [
      { name: '역삼점 (한국본점)', address: '서울 강남구 논현로94길 25-3, B1', status: 'active', phone: '0507-1421-8853', hours: '평일 11:30~22:30 (BT 14:30~17:30) / 주말 12:00~21:30' },
      { name: '여의도점', address: '서울 영등포구 국제금융로2길 17 씨티플라자 3층', status: 'active' },
      { name: '을지로점', address: '서울 중구 을지로5길 19 페럼타워 지하1층', status: 'active' },
      { name: '광화문점', address: '서울 종로구 종로1길 50 더케이트윈타워 지하1층', status: 'active' },
      { name: '잠실롯데월드몰점', address: '서울 송파구 올림픽로 300, 롯데월드몰 6층', status: 'active', phone: '0507-1349-4625', hours: '매일 10:30~22:00 (BT 15:00~17:00)' },
      { name: '부산 롯데백화점점', address: '부산 부산진구 가야대로 772, 롯데백화점 부산본점 9층', status: 'active', phone: '051-810-3997', hours: '매일 10:30~20:30' },
      { name: '용산아이파크몰점', address: '서울 용산구 한강대로23길 55, 아이파크몰 리빙관 7층', status: 'closed' },
    ],
    image: '/images/brands/jinkawa.jpg',
    logo: '/images/brands/logos/jinkawa.png',
    keywords: ['진가와', '역삼 소바', '여의도 일식', '을지로 소바', '광화문 맛집', '잠실 일식', '정통 소바', '롯데월드몰 맛집', '강남 일식당', '부산 소바'],
    priceRange: '₩₩₩',
    accentColor: '#1B2A4A',
    gallery: ['/images/brands/gallery/jinkawa/store-1.jpg', '/images/brands/gallery/jinkawa/store-2.jpg', '/images/brands/gallery/jinkawa/menu-1.jpg', '/images/brands/gallery/jinkawa/menu-2.jpg'],
    cuisine: '소바',
    menuHighlights: [
      { name: '스키야키 나베 코스', price: '49,000원' },
      { name: '가이세키 코스', price: '59,000원' },
      { name: '셰프 스페셜 코스', price: '79,000원' },
      { name: '사시미 & 스시 정식', price: '37,000원~49,000원' },
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
    tagline: '타카다 유지 장인의 돈카츠 철학',
    description:
      '분지로는 일본 나가사키의 돈카츠 장인 타카다 유지(高田祐治)가 직접 만든 브랜드입니다. 장인이 직접 개발한 특수 빵가루, 저온 숙성 돼지고기, 수십 년에 걸쳐 완성한 소스 레시피가 한국에 그대로 이식되었습니다. 명동(한국본점), 사운즈한남, 수원, 롯데월드몰에서 만날 수 있으며 잠실롯데백화점 신규 오픈을 앞두고 있습니다.',
    story:
      '타카다 유지 장인이 나가사키에서 평생을 바쳐 만들어온 돈카츠. 두껍게 썰어 촘촘하게 튀긴 한 조각에 장인의 시간이 담깁니다. 분지로는 그 철학 자체를 한국에 가져왔습니다.',
    storyElements: {
      originStory: '나가사키의 돈카츠 장인 타카다 유지가 50년에 걸쳐 완성한 레시피. 2019년 명동에 한국 본점을 열며, 장인의 맛 그대로를 서울에 이식했습니다.',
      chefOrArtisan: '타카다 유지(高田祐治) 장인 — 나가사키에서 50년간 돈카츠만을 연구해온 장인. 직접 개발한 특수 빵가루와 저온 숙성법, 수십 년에 걸쳐 완성한 소스 레시피의 소유자.',
      ingredientPhilosophy: '저온 숙성 돼지고기, 장인이 직접 개발한 특수 빵가루, 수십 년 비법의 소스. 모든 재료에 타카다 유지 장인의 기준이 적용됩니다.',
      signatureMenu: '장인 로스카츠 — 두꺼운 등심을 저온 숙성 후 특수 빵가루로 촘촘하게 입혀 바삭하게 튀긴 분지로의 시그니처. 장인의 소스와 함께.',
      spaceExperience: '사운즈한남의 세련된 외관과 명동 본점의 정통 일본 돈카츠야 분위기. 오픈 키친에서 장인의 기술을 직접 보며 즐기는 라이브 다이닝 경험.',
    },
    locations: [
      { name: '명동점 (한국본점)', address: '서울 중구 남대문로 81, 롯데백화점 본점 13층', status: 'active', phone: '02-726-4337', hours: '매일 10:30~21:00 (LO 20:00)' },
      { name: '사운즈한남점', address: '서울 용산구 대사관로 35, 사운즈한남 1층', status: 'active', phone: '02-794-2648', hours: '매일 11:00~22:00 (BT 15:00~17:00)' },
      { name: '타임빌라스 수원점', address: '경기 수원시 권선구 세화로 134, 타임빌라스 수원 3층', status: 'active', phone: '0507-1361-8572', hours: '매일 10:30~22:00 (LO 21:00)' },
      { name: '롯데월드몰점', address: '서울 송파구 올림픽로 300, 롯데월드몰 5층', status: 'active', phone: '02-3213-4581', hours: '매일 10:30~22:00' },
      { name: '잠실롯백점', address: '서울 송파구 잠실 롯데백화점', status: 'coming-soon' },
    ],
    image: '/images/brands/bunjiro.jpg',
    logo: '/images/brands/logos/bunjiro.png',
    keywords: [
      '분지로', '나가사키 돈카츠', '명동 돈카츠', '한남 맛집', '사운즈한남 식당',
      '롯데월드몰 돈카츠', '데이트 코스 한남', '서울 돈카츠 맛집', '일본 장인 돈카츠',
    ],
    priceRange: '₩₩₩',
    accentColor: '#5C4033',
    gallery: ['/images/brands/gallery/bunjiro/store-1.jpg', '/images/brands/gallery/bunjiro/store-2.jpg', '/images/brands/gallery/bunjiro/menu-1.jpg', '/images/brands/gallery/bunjiro/menu-2.jpg'],
    cuisine: '돈카츠',
    menuHighlights: [
      { name: '장인 로스카츠', price: '16,000원~29,000원' },
    ],
    reservationLinks: [
      { location: '명동점 (한국본점)', note: '전화예약' },
      { location: '사운즈한남점', url: 'https://app.catchtable.co.kr/ct/shop/bunjiro_soundshannam' },
      { location: '타임빌라스 수원점', note: '전화예약' },
      { location: '롯데월드몰점', note: '현장 대기' },
    ],
  },
  {
    id: 'takumi-nagasaki',
    name: '타쿠미나가사키',
    nameEn: 'TAKUMI NAGASAKI',
    category: 'japanese',
    format: 'foodcourt',
    tagline: '나가사키 전통 일식의 세련된 재현',
    description:
      '타쿠미나가사키는 나가사키 지역의 독특한 일식 문화를 현대적 감성으로 담아낸 Fine Casual 다이닝입니다. 일본과 서양이 교차한 나가사키의 역사적 식문화를 모티브로, 섬세하게 설계된 메뉴와 공간이 특별한 식사 경험을 완성합니다.',
    story:
      '무역항 나가사키에서 탄생한 독자적인 식문화 — 일식과 서양식이 조화를 이루는 그 특별한 맛을 서울에서 재현합니다.',
    storyElements: {
      originStory: '16세기 무역항 나가사키 — 일본과 서양이 만나 독자적인 식문화가 탄생한 곳. 타쿠미나가사키는 그 역사적 교차점의 맛을 현대적으로 재해석합니다.',
      ingredientPhilosophy: '나가사키 지역의 신선한 해산물과 서양 조리법의 융합. 짬뽕, 카스테라 등 나가사키 특유의 크로스오버 요리를 정통 레시피로 재현합니다.',
      signatureMenu: '나가사키 짬뽕, 사라우동, 카스테라 — 일본과 서양의 교차점에서 탄생한 나가사키 대표 요리를 파인 캐주얼로 즐길 수 있습니다.',
      spaceExperience: '나가사키 항구도시의 이국적 분위기를 현대적으로 재해석한 인테리어. 고속터미널과 용산아이파크몰에서 일상 속 작은 여행을 선사합니다.',
    },
    locations: [
      { name: '고속터미널점', address: '서울 서초구 신반포로 194, 서울고속버스터미널 경부선 1층', status: 'active', phone: '0507-1350-8553', hours: '매일 10:00~21:00 (LO 20:30)' },
      { name: '용산아이파크몰점', address: '서울 용산구 한강대로23길 55, 아이파크몰 리빙관 7층', status: 'active', phone: '0507-1465-1666', hours: '매일 11:00~22:00 (LO 21:00)' },
    ],
    image: '/images/brands/takumi-nagasaki.jpg',
    logo: '/images/brands/logos/takumi-nagasaki.png',
    keywords: ['타쿠미나가사키', '고속터미널 일식', '용산 일식당', '아이파크몰 맛집', '파인캐주얼 일식', '나가사키 요리'],
    priceRange: '₩₩₩',
    accentColor: '#2A6B6B',
    gallery: ['/images/brands/gallery/takumi-nagasaki/store-1.jpg', '/images/brands/gallery/takumi-nagasaki/store-2.jpg', '/images/brands/gallery/takumi-nagasaki/menu-1.jpg', '/images/brands/gallery/takumi-nagasaki/menu-2.jpg'],
    cuisine: '일식',
    menuHighlights: [
      { name: '등심돈카츠', price: '14,000원~19,000원' },
      { name: '카게우동', price: '14,000원' },
    ],
  },
  {
    id: 'daisen',
    name: '다이센스시',
    nameEn: 'DAISEN SUSHI',
    category: 'japanese',
    format: 'dining',
    tagline: '큐슈 1위 와카타케마루, 서울에서',
    description:
      '다이센스시는 큐슈 지방에서 압도적 1위를 달리는 정통 스시 브랜드 와카타케마루(若竹丸)를 한국에 들여온 프리미엄 스시 레스토랑입니다. 한남동 사운즈한남의 프라이빗 룸에서 셰프가 직접 내어주는 큐슈산 제철 생선과 숙성 기술이 집약된 스시는 일본 현지를 방불케 하는 경험을 선사합니다.',
    story:
      '큐슈에서 가장 사랑받는 스시야, 와카타케마루. 그 브랜드의 철학과 기술이 한남동 사운즈한남 프라이빗 룸에 고스란히 옮겨왔습니다.',
    storyElements: {
      originStory: '큐슈 지방 압도적 1위 스시 브랜드 와카타케마루(若竹丸)의 한국 상륙. 일본 현지에서 검증된 스시 기술과 철학을 한남동 프라이빗 룸에 그대로 이식했습니다.',
      chefOrArtisan: '와카타케마루 출신 스시 장인 — 큐슈산 제철 생선의 특성을 꿰뚫고, 숙성·온도·손놀림까지 와카타케마루의 정통 기술을 계승한 셰프가 주방을 책임집니다.',
      ingredientPhilosophy: '큐슈산 제철 생선을 직접 공수. 숙성 기술로 감칠맛을 극대화하며, 샤리(초밥밥)의 온도와 식초 배합까지 세밀하게 관리합니다.',
      signatureMenu: '프리미엄 스시 코스 — 셰프가 그날의 최고 식재료로 구성하는 큐슈 정통 스시 코스. 프라이빗 룸에서 소중한 분과 함께 특별한 식사를 즐깁니다.',
      spaceExperience: '한남동 사운즈한남의 프라이빗 룸. 접대, 기념일, 소규모 모임에 최적화된 독립 공간에서 셰프의 정성이 담긴 스시를 즐기는 격조 있는 다이닝 경험.',
    },
    locations: [
      { name: '사운즈한남점 (한국본점)', address: '서울 용산구 대사관로 35, 사운즈한남 야외 2층', status: 'active', hours: '매일 11:30~22:30 (BT 15:00~17:30)' },
    ],
    image: '/images/brands/daisen.jpg',
    logo: '/images/brands/logos/daisen.png',
    keywords: [
      '다이센스시', '한남 프라이빗 스시', '한남동 스시', '서울 프리미엄 스시',
      '프리미엄 스시 서울', '한남 데이트 코스', '특별한 날 식당 서울', '사운즈한남 스시',
    ],
    priceRange: '₩₩₩₩',
    accentColor: '#2D3436',
    gallery: ['/images/brands/gallery/daisen/store-1.jpg', '/images/brands/gallery/daisen/store-2.jpg', '/images/brands/gallery/daisen/menu-1.jpg', '/images/brands/gallery/daisen/menu-2.jpg'],
    cuisine: '프리미엄 스시',
    menuHighlights: [
      { name: '런치 코스', price: '50,000원~' },
      { name: '디너 코스', price: '77,000원~150,000원' },
    ],
    reservationLinks: [
      { location: '사운즈한남점 (한국본점)', url: 'https://app.catchtable.co.kr/ct/shop/daisensushi' },
    ],
  },
  {
    id: 'cafe-le-sens',
    name: '카페 르상스',
    nameEn: 'CAFÉ LE SENS',
    category: 'cafe',
    format: 'lounge',
    tagline: '감각을 깨우는 유럽형 라이프스타일 베이커리 카페',
    description:
      '카페 르상스(Le Sens — 감각)는 미식과 공간 경험을 결합한 감각 중심 카페입니다. 베이커리, 차, 공간 디자인까지 통합된 라이프스타일을 제안하며, SNS 자발적 바이럴 중심으로 빠른 인지도를 확보했습니다. 전시·브랜드 협업을 통해 카페 이상의 목적 방문형 공간으로 자리잡았습니다.',
    story: '카페는 단순히 커피를 마시는 곳이 아닙니다. 감각을 깨우고 잠시 숨을 고르는, 머무르는 소비를 만드는 체류형 공간.',
    storyElements: {
      originStory: 'Le Sens — 프랑스어로 \'감각\'. 사운즈한남의 문화적 에너지와 한남동의 세련된 감성이 만나 탄생한 스페셜티 카페.',
      ingredientPhilosophy: '엄선된 싱글 오리진 원두와 시즌 디저트. 커피 한 잔에도 산지와 로스팅 프로파일을 고려한 정성이 담깁니다.',
      signatureMenu: '시그니처 브런치 세트와 시즌 디저트 — 커피와 음식이 조화를 이루는 르상스만의 페어링 경험.',
      spaceExperience: '사운즈한남 복합문화공간 내 위치. 높은 천장과 자연광이 만드는 개방감, 갤러리처럼 큐레이팅된 공간에서 일상의 작은 사치를 즐깁니다.',
    },
    locations: [
      { name: '사운즈한남점', address: '서울 용산구 대사관로 35, 사운즈한남 1층', status: 'active', hours: '매일 10:00~22:00 (LO 21:30)' },
    ],
    image: '/images/brands/cafe-le-sens.jpg',
    logo: '/images/brands/logos/cafe-le-sens.png',
    keywords: ['카페르상스', '한남동 카페', '사운즈한남 카페', '한남 브런치', '한남 데이트 카페', '용산 카페 추천'],
    priceRange: '₩₩',
    accentColor: '#6B705C',
    gallery: ['/images/brands/gallery/cafe-le-sens/store-1.jpg', '/images/brands/gallery/cafe-le-sens/store-2.jpg', '/images/brands/gallery/cafe-le-sens/menu-1.jpg', '/images/brands/gallery/cafe-le-sens/menu-2.jpg'],
    cuisine: '카페',
    menuHighlights: [
      { name: '시즌 케이크', price: '8,000원~' },
      { name: '구움과자', price: '4,500원~' },
      { name: '커피', price: '5,500원~8,000원' },
      { name: '시그니처 브런치 세트', price: '15,000원~' },
    ],
    reservationLinks: [
      { location: '사운즈한남점', url: 'https://app.catchtable.co.kr/ct/shop/cafelesens' },
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
    story: '언제나(Always) 한결같은 맛. 매일 우려낸 진국 육수 한 그릇이 주는 위안.',
    storyElements: {
      originStory: '육수·면 직접 제조하는 장인형 라멘 브랜드. 전통과 현대적 해석을 결합해 일본 라멘의 정통성을 지키면서도 한국인의 입맛에 맞는 깊은 맛을 연구해 탄생했습니다.',
      ingredientPhilosophy: '매일 12시간 이상 우려낸 진국 육수. 면은 라멘 전용 제면기로 매일 뽑아 최적의 식감을 유지합니다. 맛의 재현성과 중독성을 핵심 가치로 둡니다.',
      signatureMenu: '레몬 돈코츠 라멘 — 진한 돈코츠 육수에 상큼한 레몬이 더해진 시그니처. 특제 츠케멘과 함께 멘야올웨이즈만의 정통 라멘을 경험할 수 있습니다.',
    },
    locations: [
      { name: '성수점 (1호점)', address: '서울 성동구 (2026년 말 오픈 예정)', status: 'coming-soon' },
    ],
    image: '/images/brands/menya-always.jpg',
    logo: '/images/brands/logos/menya-always.png',
    keywords: ['멘야올웨이즈', '서울 라멘', '정통 일본 라멘', '라멘 맛집 서울', '성수 라멘', '돈코츠 라멘'],
    priceRange: '₩₩',
    accentColor: '#C2410C',
    cuisine: '라멘',
    menuHighlights: [
      { name: '레몬 돈코츠 라멘', price: '가격 미정' },
      { name: '특제 츠케멘', price: '가격 미정' },
    ],
  },
  {
    id: 'noflex-nyc',
    name: '노플렉스 뉴욕',
    nameEn: 'NOFLEX NYC',
    category: 'american',
    format: 'pub',
    tagline: '미디어와 음악, 다이닝이 결합된 글로벌 라운지',
    description:
      'NOFLEX NYC는 뉴욕 맨해튼 5번가에 위치한 미디어 아트 레스토랑 & 칵테일 바입니다. 20m LED 미디어월 기반 몰입형 공간에서 K-FOOD, MUSIC, ART가 결합된 "경험 소비형 다이닝"의 극대화를 추구합니다. 뉴욕 맨해튼에 성공적으로 안착하며 글로벌 콘텐츠 기반 확장 가능성을 입증한 해외 타겟 유입형 브랜드입니다.',
    story:
      '다이닝과 예술의 경계를 허무는 새로운 시도. 72피트 LED 벽이 만들어내는 몰입형 공간에서 음식, 음악, 빛이 하나로 어우러집니다.',
    storyElements: {
      originStory: '넥스트다이닝의 첫 해외 직영 브랜드. 뉴욕 맨해튼 5번가에 "미디어 아트 레스토랑"이라는 새로운 카테고리를 열며, K-다이닝의 글로벌 확장을 시작했습니다.',
      ingredientPhilosophy: '신선하고 건강한 재료를 심플하면서도 세련되게 조리합니다. 예상 밖의 재료와 대담한 풍미 조합으로 만든 시그니처 칵테일이 다이닝 경험을 완성합니다.',
      signatureMenu: 'K-모던 한식 플레이트와 시그니처 칵테일 — 한식을 현대적으로 해석한 플레이트와 대담한 풍미 조합의 칵테일이 다이닝 경험을 완성합니다.',
      spaceExperience: '20m LED 미디어월이 만드는 몰입형 공간. K-FOOD + MUSIC + ART가 결합된 경험 소비형 다이닝의 극대화. 뉴욕에서 유일무이한 경험.',
    },
    locations: [
      { name: '뉴욕 맨해튼', address: '286 5th Avenue, 1st Floor, New York, NY 10001', status: 'active', phone: '(347) 572-1027', hours: '화~일 17:00~02:00 (금·토 ~04:00) / 월 휴무' },
    ],
    image: '/images/brands/noflex-nyc.jpg',
    logo: '/images/brands/logos/noflex-nyc.png',
    keywords: ['NOFLEX NYC', '노플렉스뉴욕', '뉴욕 한국 레스토랑', 'media art restaurant NYC', 'immersive dining NYC', '맨해튼 칵테일바', '넥스트다이닝 미국'],
    priceRange: '$$$',
    accentColor: '#5B21B6',
    gallery: ['/images/brands/gallery/noflex-nyc/store-1.jpg', '/images/brands/gallery/noflex-nyc/menu-1.jpg', '/images/brands/gallery/noflex-nyc/menu-2.jpg', '/images/brands/gallery/noflex-nyc/menu-3.jpg'],
    cuisine: '모던 다이닝 & 칵테일 바',
    menuHighlights: [
      { name: 'K-모던 한식 플레이트', price: '$25~' },
      { name: '시그니처 칵테일', price: '$18~' },
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
