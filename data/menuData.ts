export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  width: number;
  height: number;
  badgeEn?: string;
  badgeAr?: string;
}

export interface MenuCategoryMeta {
  key: string;
  anchor: string;
}

export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  { key: 'BURGERS', anchor: 'burgers' },
  { key: 'LOADED FRIES', anchor: 'loaded-fries' },
  { key: 'SANDWICHES', anchor: 'sandwiches' },
  { key: 'MILKSHAKES', anchor: 'milkshakes' },
  { key: 'MOJITOS', anchor: 'mojitos' },
  { key: 'FRESH JUICE', anchor: 'fresh-juice' },
];

export const MENU_CATEGORY_ANCHORS: Record<string, string> = Object.fromEntries(
  MENU_CATEGORIES.map((c) => [c.key, c.anchor])
);

export function getMenuImageSources(pngPath: string) {
  const baseSlug = pngPath.replace(/^\//, '').replace(/\.png$/i, '').toLowerCase();
  return {
    webp320: `/images/menu/${baseSlug}-320w.webp`,
    webpFull: `/images/menu/${baseSlug}-full.webp`,
    fallbackPng: pngPath,
  };
}

export const MENU_DATA: Record<string, MenuItem[]> = {
  BURGERS: [
    {
      id: 'solo-smash',
      name: 'Solo Smash',
      description: 'Potato bun, single beef patty, cheese, pickle, caramelized onion, sb sauce.',
      price: 12,
      image: '/solo-smash.png',
      width: 600,
      height: 600,
      badgeEn: 'Starter Icon',
      badgeAr: 'الأكثر توفيراً',
    },
    {
      id: 'duo-smash',
      name: 'Duo Smash',
      description: 'Double beef patty, cheese, pickle, caramelized onion, sb sauce.',
      price: 17,
      image: '/duo-smash.png',
      width: 600,
      height: 600,
      badgeEn: '#1 Best Seller',
      badgeAr: 'الأكثر طلباً',
    },
    {
      id: 'trio-smash',
      name: 'Trio Smash',
      description: 'Triple beef patty, cheese, pickle, caramelized onion, sb sauce.',
      price: 23,
      image: '/trio-smash.png',
      width: 600,
      height: 600,
      badgeEn: 'Max Smashed',
      badgeAr: 'الحجم الأقصى',
    },
    {
      id: 'classic-crunch',
      name: 'Classic Crunch',
      description: 'Fried crispy chicken, jalapeno, iceberg lettuce, sb sauce.',
      price: 12,
      image: '/classic-crunch.png',
      width: 600,
      height: 600,
      badgeEn: 'Crispy Gold',
      badgeAr: 'كرسبي ذهبي',
    },
    {
      id: 'classic-spice',
      name: 'Classic Spice',
      description: 'Fried crispy chicken, nashville sauce, jalapeno, iceberg lettuce, sb sauce.',
      price: 17,
      image: '/classic-spice.png',
      width: 600,
      height: 600,
      badgeEn: 'Nashville Heat',
      badgeAr: 'حار مميز',
    },
  ],
  'LOADED FRIES': [
    {
      id: 'crunch-bomb',
      name: 'Crunch Bomb',
      description: 'Fried chicken, french fries, jalapeno, sb sauce.',
      price: 10,
      image: '/crunch-bomb.png',
      width: 600,
      height: 600,
      badgeEn: 'Quick Crave',
      badgeAr: 'قرمشة سريعة',
    },
    {
      id: 'beefy-bomb',
      name: 'Beefy Bomb',
      description: 'Smashed beef, french fries, pickle, sb sauce.',
      price: 12,
      image: '/beefy-bomb.png',
      width: 600,
      height: 600,
      badgeEn: 'Loaded Favorite',
      badgeAr: 'لودد مميز',
    },
    {
      id: 'fire-bomb',
      name: 'Fire Bomb',
      description: 'Nashville chicken, french fries, jalapeño, sb sauce.',
      price: 15,
      image: '/fire-bomb.png',
      width: 600,
      height: 600,
      badgeEn: 'Spicy Hit',
      badgeAr: 'نكهة حارة',
    },
  ],
  SANDWICHES: [
    {
      id: 'havana',
      name: 'Havana',
      description: 'French baguette, beef patty, roasted beef, mustard sauce, pickle, sb sauce.',
      price: 13,
      image: '/Havana.png',
      width: 600,
      height: 600,
    },
    {
      id: 'twisted-chick',
      name: 'Twisted Chick',
      description: 'Tortilla wrap, fried chicken, lettuce, jalapeno, cheese, sb sauce.',
      price: 12,
      image: '/Twisted-Chick.png',
      width: 600,
      height: 600,
    },
  ],
  MILKSHAKES: [
    { id: 'mango-madness', name: 'Mango Madness', price: 12, image: '/Mango-madness.png', width: 400, height: 607 },
    { id: 'coco-crush', name: 'Coco Crush', price: 12, image: '/Coco-crush.png', width: 400, height: 607 },
    { id: 'lotus-loaded', name: 'Lotus Loaded', price: 12, image: '/Lotus-loaded.png', width: 400, height: 607 },
    { id: 'oreo-overload', name: 'Oreo Overload', price: 12, image: '/Oreo-overload.png', width: 400, height: 607 },
    { id: 'choco-melt', name: 'Choco Melt', price: 12, image: '/Choco-melt.png', width: 400, height: 607 },
    { id: 'smash-berry', name: 'Smash Berry', price: 13, image: '/Smash-Berry.png', width: 400, height: 607 },
  ],
  MOJITOS: [
    { id: 'blue-wave', name: 'Blue Wave', price: 10, image: '/Blue-wave.png', width: 400, height: 607 },
    { id: 'pink-rush', name: 'Pink Rush', price: 10, image: '/Pink-rush.png', width: 400, height: 606 },
    { id: 'violet-vibe', name: 'Violet Vibe', price: 10, image: '/Violet-Vibe.png', width: 400, height: 607 },
    { id: 'mint-rush', name: 'Mint Rush', price: 10, image: '/Mint-Rush.png', width: 400, height: 608 },
    { id: 'passion-storm', name: 'Passion Storm', price: 10, image: '/Passion-storm.png', width: 400, height: 607 },
    { id: 'midnight-berry', name: 'Midnight Berry', price: 12, image: '/Midnight-Berry.png', width: 400, height: 607 },
  ],
  'FRESH JUICE': [
    { id: 'lemon-mint', name: 'Lemon Mint', price: 10, image: '/lemon-mint.png', width: 400, height: 607 },
  ],
};

export const MENU_LANGUAGES: Record<'en' | 'ar', {
  categories: Record<string, string>;
  items: Record<string, { name: string; description?: string }>;
  ui: {
    addOnTitle: string;
    addOnDesc: string;
    aed: string;
    backHome: string;
    ourStory: string;
    location: string;
  };
}> = {
  en: {
    categories: {
      ALL: 'All',
      BURGERS: 'Burgers',
      'LOADED FRIES': 'Loaded Fries',
      SANDWICHES: 'Sandwiches',
      MILKSHAKES: 'Milkshakes',
      MOJITOS: 'Mojitos',
      'FRESH JUICE': 'Fresh Juice',
    },
    items: {
      'Solo Smash': {
        name: 'Solo Smash',
        description: 'Potato bun, single beef patty, cheese, pickle, caramelized onion, sb sauce.',
      },
      'Duo Smash': {
        name: 'Duo Smash',
        description: 'Double beef patty, cheese, pickle, caramelized onion, sb sauce.',
      },
      'Trio Smash': {
        name: 'Trio Smash',
        description: 'Triple beef patty, cheese, pickle, caramelized onion, sb sauce.',
      },
      'Classic Crunch': {
        name: 'Classic Crunch',
        description: 'Fried crispy chicken, jalapeno, iceberg lettuce, sb sauce.',
      },
      'Classic Spice': {
        name: 'Classic Spice',
        description: 'Fried crispy chicken, nashville sauce, jalapeno, iceberg lettuce, sb sauce.',
      },
      'Crunch Bomb': {
        name: 'Crunch Bomb',
        description: 'Fried chicken, french fries, jalapeno, sb sauce.',
      },
      'Beefy Bomb': {
        name: 'Beefy Bomb',
        description: 'Smashed beef, french fries, pickle, sb sauce.',
      },
      'Fire Bomb': {
        name: 'Fire Bomb',
        description: 'Nashville chicken, french fries, jalapeño, sb sauce.',
      },
      Havana: {
        name: 'Havana',
        description: 'French baguette, beef patty, roasted beef, mustard sauce, pickle, sb sauce.',
      },
      'Twisted Chick': {
        name: 'Twisted Chick',
        description: 'Tortilla wrap, fried chicken, lettuce, jalapeno, cheese, sb sauce.',
      },
      'Mango Madness': { name: 'Mango Madness' },
      'Coco Crush': { name: 'Coco Crush' },
      'Lotus Loaded': { name: 'Lotus Loaded' },
      'Oreo Overload': { name: 'Oreo Overload' },
      'Choco Melt': { name: 'Choco Melt' },
      'Smash Berry': { name: 'Smash Berry' },
      'Blue Wave': { name: 'Blue Wave' },
      'Pink Rush': { name: 'Pink Rush' },
      'Violet Vibe': { name: 'Violet Vibe' },
      'Mint Rush': { name: 'Mint Rush' },
      'Passion Storm': { name: 'Passion Storm' },
      'Midnight Berry': { name: 'Midnight Berry' },
      'Lemon Mint': { name: 'Lemon Mint' },
    },
    ui: {
      addOnTitle: 'Make It a Combo',
      addOnDesc: 'Add soft drinks & fries to any burger or sandwich for AED 6.',
      aed: 'AED',
      backHome: 'Home',
      ourStory: 'Our Story',
      location: 'Location',
    },
  },
  ar: {
    categories: {
      ALL: 'الكل',
      BURGERS: 'البرجر',
      'LOADED FRIES': 'لودد فرايز',
      SANDWICHES: 'ساندويتش',
      MILKSHAKES: 'ميلك شيك',
      MOJITOS: 'موهيتو',
      'FRESH JUICE': 'عصائر فريش',
    },
    items: {
      'Solo Smash': {
        name: 'سولو سماش',
        description: 'خبز البطاطس، شريحة لحم بقري، جبنة، مخلل، بصل مكرمل، صوص إس بي.',
      },
      'Duo Smash': {
        name: 'دو سماش',
        description: 'شريحتين لحم بقري، جبنة، مخلل، بصل مكرمل، صوص إس بي.',
      },
      'Trio Smash': {
        name: 'تريو سماش',
        description: 'ثلاث شرائح لحم بقري، جبنة، مخلل، بصل مكرمل، صوص إس بي.',
      },
      'Classic Crunch': {
        name: 'كلاسيك كرنش',
        description: 'دجاج مقلي مقرمش، هالبينو، خس آيسبرغ، صوص إس بي.',
      },
      'Classic Spice': {
        name: 'كلاسيك سبايس',
        description: 'دجاج مقلي مقرمش، صوص ناشفيل، هالبينو، خس آيسبرغ، صوص إس بي.',
      },
      'Crunch Bomb': {
        name: 'كرانش بومب',
        description: 'دجاج مقلي، بطاطس مقلية، هالبينو، صوص إس بي.',
      },
      'Beefy Bomb': {
        name: 'بيفي بومب',
        description: 'لحم بقري سماش، بطاطس مقلية، مخلل، صوص إس بي.',
      },
      'Fire Bomb': {
        name: 'فاير بومب',
        description: 'دجاج ناشفيل، بطاطس مقلية، هالبينو، صوص إس بي.',
      },
      Havana: {
        name: 'هافانا',
        description: 'خبز باجيت فرنسي، شريحة لحم بقري، لحم بقري روست، صوص الخردل، مخلل، صوص إس بي.',
      },
      'Twisted Chick': {
        name: 'تويستد تشيك',
        description: 'خبز تورتيلا، دجاج مقلي، خس، هالبينو، جبنة، صوص إس بي.',
      },
      'Mango Madness': { name: 'مانجو مادنس' },
      'Coco Crush': { name: 'كوكو كرش' },
      'Lotus Loaded': { name: 'لوتس لودد' },
      'Oreo Overload': { name: 'أوريو أوفرلود' },
      'Choco Melt': { name: 'شوكو ميلت' },
      'Smash Berry': { name: 'سماش بيري' },
      'Blue Wave': { name: 'بلو ويف' },
      'Pink Rush': { name: 'بينك راش' },
      'Violet Vibe': { name: 'فايولت فايب' },
      'Mint Rush': { name: 'مينت راش' },
      'Passion Storm': { name: 'باشن ستورم' },
      'Midnight Berry': { name: 'ميدنايت بيري' },
      'Lemon Mint': { name: 'ليمون ونعناع' },
    },
    ui: {
      addOnTitle: 'اجعلها وجبة كاملة',
      addOnDesc: 'أضف مشروب غازي وبطاطس إلى أي برجر أو ساندويتش مقابل 6 درهم فقط.',
      aed: 'درهم',
      backHome: 'الرئيسية',
      ourStory: 'قصتنا',
      location: 'الموقع',
    },
  },
};

export interface BestSellerSummary {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  price: number;
  image: string;
  width: number;
  height: number;
  badgeEn: string;
  badgeAr: string;
}

const BEST_SELLER_IDS = [
  'solo-smash',
  'duo-smash',
  'trio-smash',
  'classic-crunch',
  'beefy-bomb',
  'crunch-bomb',
];

const ALL_ITEMS = Object.values(MENU_DATA).flat();

export const BEST_SELLERS: BestSellerSummary[] = BEST_SELLER_IDS.map((id) => {
  const item = ALL_ITEMS.find((entry) => entry.id === id)!;
  const arItem = MENU_LANGUAGES.ar.items[item.name];
  return {
    id: item.id,
    nameEn: item.name,
    nameAr: arItem?.name || item.name,
    descEn: item.description || '',
    descAr: arItem?.description || item.description || '',
    price: item.price,
    image: item.image,
    width: item.width,
    height: item.height,
    badgeEn: item.badgeEn || '',
    badgeAr: item.badgeAr || '',
  };
});
