var defaultProducts = [
    {
        id: 'p1',
        name: '클로턴 다이어리 (Cloton Diary)',
        category: 'Diary Case',
        price: 15000,
        moq: 10,
        image: 'assets/images/product/product01_01.jpg',
        detailImage: 'assets/images/product/detail_01.jpg',
        description: '고급스러운 가죽 질감과 실용적인 카드 수납 기능을 갖춘 다이어리 케이스입니다. 스탠드 기능으로 영상 시청이 편리하며, TPU 내부 케이스로 기기를 안전하게 보호합니다.',
        specs: {
            material: 'PU Leather, TPU',
            colors: ['Black', 'Brown', 'Navy', 'Red'],
            features: ['Card Storage', 'Stand Function', 'Soft TPU'],
            compatible: ['iPhone 14', 'Galaxy S23']
        }
    },
    {
        id: 'p2',
        name: '듀넬 다이어리 (Dunel Diary)',
        category: 'Diary Case',
        price: 16000,
        moq: 10,
        image: 'assets/images/product/product01_02.jpg',
        detailImage: 'assets/images/product/detail_02.jpg',
        description: '세련된 디자인과 실용성을 겸비한 듀넬 다이어리입니다. 슬림한 핏감과 우수한 그립감을 제공합니다.',
        specs: {
            material: 'PU Leather',
            colors: ['Black', 'Wine', 'Navy'],
            compatible: ['All Models']
        }
    },
    {
        id: 'p3',
        name: '크록엣지 가죽 다이어리',
        category: 'Diary Case',
        price: 18000,
        moq: 10,
        image: 'assets/images/product/product01_03.jpg',
        description: '악어 가죽 패턴의 고급스러운 질감이 돋보이는 제품입니다. 프리미엄 라인업으로 선물용으로도 좋습니다.',
        specs: {
            material: 'PU Leather (Croc Pattern)',
            colors: ['Black', 'Red', 'Brown'],
            compatible: ['iPhone 13', 'Galaxy S22']
        }
    },
    {
        id: 'p4',
        name: '사피아노A 시크릿 카드포켓',
        category: 'Diary Case',
        price: 12000,
        moq: 20,
        image: 'assets/images/product/product01_04.jpg',
        description: '사피아노 재질로 스크래치에 강하며 카드 수납이 편리합니다. 심플하고 모던한 디자인이 특징입니다.',
        specs: {
            material: 'Saffiano PU',
            colors: ['Black', 'Navy', 'Pink'],
            compatible: ['All Models']
        }
    },
    {
        id: 'p5',
        name: '나비 베이직 다이어리',
        category: 'Diary Case',
        price: 14000,
        moq: 10,
        image: 'assets/images/product/product01_05.jpg',
        description: '심플한 디자인에 나비 문양이 포인트인 베이직 다이어리입니다. 여성 고객들에게 인기가 많습니다.',
        specs: {
            material: 'PU Leather',
            colors: ['Mint', 'Pink', 'Purple'],
            compatible: ['All Models']
        }
    },
    {
        id: 'p6',
        name: '다용도 펄 블라썸 지갑',
        category: 'Diary Case',
        price: 20000,
        moq: 5,
        image: 'assets/images/product/product01_06.jpg',
        description: '지갑 대용으로 사용 가능한 넉넉한 수납공간을 자랑합니다. 화려한 펄감이 돋보이는 제품입니다.',
        specs: {
            material: 'Pearl PU',
            colors: ['Gold', 'Silver'],
            compatible: ['Universal']
        }
    },
    {
        id: 'p7',
        name: '다용도 라인 나비 지갑',
        category: 'Diary Case',
        price: 19000,
        moq: 5,
        image: 'assets/images/product/product01_07.jpg',
        description: '우아한 나비 패턴과 라인 장식이 어우러진 지갑형 케이스입니다.',
        specs: {
            material: 'PU Leather',
            colors: ['Red', 'Blue'],
            compatible: ['Universal']
        }
    }
];

var defaultNotices = [
    { id: 1, title: '홈페이지가 리뉴얼 되었습니다.', date: '2023-10-01', content: '안녕하세요, 우리미라클입니다. 고객님들의 편의를 위해 홈페이지를 새롭게 단장하였습니다.' },
    { id: 2, title: '추석 연휴 배송 안내', date: '2023-09-20', content: '추석 연휴 기간 동안 배송이 지연될 수 있으니 양해 부탁드립니다.' },
    { id: 3, title: '신상품 입고 안내 (다이어리 케이스)', date: '2023-09-15', content: '2023년 F/W 시즌 신상품이 입고되었습니다. 많은 관심 부탁드립니다.' }
];

var categories = [
    { id: 'all', name: '전체보기' },
    { id: 'diary', name: '다이어리 케이스' },
    { id: 'bumper', name: '범퍼 케이스' },
    { id: 'jelly', name: '젤리 케이스' },
    { id: 'glass', name: '강화유리' },
    { id: 'acc', name: '악세사리' }
];

// Initialize Data from LocalStorage
// Version check - force reset if data structure changed
const DATA_VERSION = '1.1'; // Increment this to force reset
const currentVersion = localStorage.getItem('wm_data_version');
if (currentVersion !== DATA_VERSION) {
    localStorage.removeItem('wm_products');
    localStorage.setItem('wm_data_version', DATA_VERSION);
}

// Load products from localStorage or defaults
var products = JSON.parse(localStorage.getItem('wm_products')) || defaultProducts;

// Migrate old image paths to new folder (assets/images/product/)
const migratePaths = (list) => {
    return list.map(p => {
        // Handle old format: assets/images/product_*.jpg -> assets/images/product/product_*.jpg
        if (p.image && p.image.startsWith('assets/images/product_')) {
            p.image = p.image.replace('assets/images/', 'assets/images/product/');
        }
        if (p.image && p.image.startsWith('assets/images/detail_')) {
            p.image = p.image.replace('assets/images/', 'assets/images/product/');
        }
        // Handle old format: assets/images/product01_*.jpg -> assets/images/product/product01_*.jpg
        if (p.image && p.image.match(/^assets\/images\/product\d+_/)) {
            p.image = p.image.replace('assets/images/', 'assets/images/product/');
        }

        // Same for detailImage - handle all formats
        if (p.detailImage && p.detailImage.startsWith('assets/images/product_')) {
            p.detailImage = p.detailImage.replace('assets/images/', 'assets/images/product/');
        }
        if (p.detailImage && p.detailImage.startsWith('assets/images/detail_')) {
            p.detailImage = p.detailImage.replace('assets/images/', 'assets/images/product/');
        }
        if (p.detailImage && p.detailImage.match(/^assets\/images\/detail\d+_/)) {
            p.detailImage = p.detailImage.replace('assets/images/', 'assets/images/product/');
        }
        if (p.detailImage && p.detailImage.match(/^assets\/images\/product\d+_/)) {
            p.detailImage = p.detailImage.replace('assets/images/', 'assets/images/product/');
        }

        return p;
    });
};
products = migratePaths(products);
// Save migrated paths back to localStorage
localStorage.setItem('wm_products', JSON.stringify(products));

// Load notices from localStorage or defaults
var notices = JSON.parse(localStorage.getItem('wm_notices')) || defaultNotices;

// Save defaults if empty (first run)
if (!localStorage.getItem('wm_products')) {
    localStorage.setItem('wm_products', JSON.stringify(defaultProducts));
}
if (!localStorage.getItem('wm_notices')) {
    localStorage.setItem('wm_notices', JSON.stringify(defaultNotices));
}

// Export for global usage
if (typeof window !== 'undefined') {
    window.products = products;
    window.notices = notices;
    window.categories = categories;
}
console.log('Data loaded:', products.length, 'products,', notices.length, 'notices');
