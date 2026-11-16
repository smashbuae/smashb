import { MENU_DATA, MENU_LANGUAGES } from './menuData';

export const SITE_URL = 'https://www.smashb.ae';

export const BUSINESS_INFO = {
  name: 'Smash B',
  nameAr: 'سماش بي',
  alternateNames: ['SmashB', 'Smash B UAE', 'سماش بي'],
  taglineEn: '"Stay smashin\'."',
  taglineAr: 'ابقَ في جو السماش.',
  telephone: '+971563535819',
  telephoneDisplay: '+971 56 353 5819',
  telephoneHref: 'tel:+971563535819',
  whatsappUrl: 'https://wa.me/971563535819?text=Hi%20Smash%20B%2C%20I%20would%20like%20to%20order',
  talabatUrl: 'https://www.talabat.com/uae/smash-b',
  // Short Google Maps/Review links used for UI outbound buttons only (NOT included in JSON-LD sameAs)
  mapsShortUrl: 'https://share.google/B4R9Oj37gfchmf9mD',
  reviewsShareUrl: 'https://share.google/4MKL9GgbykM3jWOqs',
  writeReviewUrl: 'https://g.page/r/CaIBEx4A1OeZEBM/review',
  // Google Maps embed query (TODO: replace with exact verified Place ID or lat/long embed URL)
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Near%20American%20University%20of%20Ras%20Al%20Khaimah%20AURAK%20Ras%20Al%20Khaimah&t=&z=15&ie=UTF8&iwloc=&output=embed',
  // TODO: Owner to supply exact Google Maps full listing URL, Facebook URL, Threads URL, and exact lat/long coordinates
  mapsListingUrl: null as string | null, // TODO: Full https://www.google.com/maps/place/... URL
  geo: {
    latitude: null as number | null, // TODO: Owner supplies verified latitude near AURAK
    longitude: null as number | null, // TODO: Owner supplies verified longitude near AURAK
  },
  address: {
    streetAddress: 'Near American University of Ras Al Khaimah (AURAK)', // TODO: Owner supplies exact shop/building number & street
    addressLocality: 'Ras Al Khaimah',
    addressRegion: 'Ras Al Khaimah',
    postalCode: null as string | null, // TODO: Optional if applicable
    addressCountry: 'AE',
  },
  hours: {
    displayEn: 'Daily: 1:00 PM – 12:00 AM',
    displayAr: 'يومياً: 1:00 ظهراً – 12:00 منتصف الليل',
    opens: '13:00',
    closes: '00:00',
  },
  priceRange: 'AED 10 - AED 25',
  servesCuisine: ['Burgers', 'American', 'Fast Food'],
  areaServed: ['Ras Al Khaimah', 'AURAK', 'Al Dhait'],
  halalStatusEn: '100% Halal',
  halalStatusAr: 'حلال 100%',
  // Verified real profile URLs only (no share.google short links or g.page review links; Facebook & Threads pending owner input)
  profiles: {
    instagram: 'https://www.instagram.com/smashb.uae/',
    tiktok: 'https://www.tiktok.com/@smashbuae',
    snapchat: 'https://snapchat.com/t/cbTUmbL0',
    talabat: 'https://www.talabat.com/uae/smash-b',
    facebook: null as string | null, // TODO: Owner supplies official Facebook page URL
    threads: null as string | null, // TODO: Owner supplies official Threads profile URL
  },
};

export interface FaqEntry {
  id: string;
  qEn: string;
  aEn: string;
  qAr: string;
  aAr: string;
  needsOwnerConfirmation?: boolean;
}

export const FAQS: FaqEntry[] = [
  {
    id: 'location',
    qEn: 'Where is Smash B located?',
    aEn: 'Smash B has one active outlet near American University of Ras Al Khaimah (AURAK) in Ras Al Khaimah, UAE, with a second branch in Al Dhait opening soon.',
    qAr: 'أين يقع مطعم سماش بي؟',
    aAr: 'يتوفر سماش بي حالياً في فرع واحد بالقرب من الجامعة الأمريكية في رأس الخيمة (AURAK)، مع افتتاح فرعنا الثاني في الظيت قريباً.',
  },
  {
    id: 'hours',
    qEn: 'What are your opening hours?',
    aEn: 'Smash B is open daily from 1:00 PM to 12:00 AM midnight for dine-in, takeaway, and delivery.',
    qAr: 'ما هي ساعات العمل في سماش بي؟',
    aAr: 'يفتح سماش بي يومياً من الساعة 1:00 ظهراً وحتى 12:00 منتصف الليل لتناول الطعام بالمطعم، الاستلام، والتوصيل.',
  },
  {
    id: 'ordering',
    qEn: 'How can I order delivery or takeaway from Smash B?',
    aEn: 'You can order delivery directly on Talabat across Ras Al Khaimah, or message us on WhatsApp at +971 56 353 5819 for takeaway orders.',
    qAr: 'كيف يمكنني طلب التوصيل أو الاستلام من سماش بي؟',
    aAr: 'يمكنك طلب التوصيل مباشرة عبر تطبيق طلبات في رأس الخيمة، أو مراسلتنا عبر الواتساب على الرقم 5819 353 56 971+ لاستلام الطلبات.',
  },
  {
    id: 'delivery-areas',
    qEn: 'Which areas in Ras Al Khaimah do you deliver to?',
    aEn: 'Delivery is available across Ras Al Khaimah through Talabat, covering neighbourhoods around AURAK and surrounding areas.',
    qAr: 'ما هي المناطق التي تغطونها بالتوصيل في رأس الخيمة؟',
    aAr: 'نوفر خدمة التوصيل في أنحاء رأس الخيمة عبر تطبيق طلبات، بما في ذلك المنطقة المحيطة بجامعة AURAK والمناطق المجاورة.',
  },
  {
    id: 'prices',
    qEn: 'What are the burger prices at Smash B?',
    aEn: 'Smash B burgers start from AED 12 for the Solo Smash, AED 17 for the Duo Smash, and AED 23 for the Trio Smash. Loaded fries start from AED 10.',
    qAr: 'كم تبلغ أسعار البرجر في سماش بي؟',
    aAr: 'تبدأ أسعار البرجر في سماش بي من 12 درهم لسولو سماش، و17 درهم لدو سماش، و23 درهم لتريو سماش. وتبدأ البطاطا لودد من 10 دراهم.',
  },
  {
    id: 'best-sellers',
    qEn: 'What is the best seller at Smash B?',
    aEn: 'The Duo Smash (double beef patty, cheese, pickles, caramelized onions, and SB sauce) and Beefy Bomb loaded fries are our top customer favorites.',
    qAr: 'ما هو الطبق الأكثر مبيعاً في سماش بي؟',
    aAr: 'يعتبر برجر دو سماش (شريحتا لحم بقري، جبن، مخلل، بصل مكرمل وصوص إس بي) وبطاطا بيفي بومب لودد فرايز هما الأكثر طلباً وشهرة.',
  },
  {
    id: 'halal',
    qEn: 'Is Smash B halal?',
    aEn: 'Yes, 100% halal. Every beef and chicken item served at our AURAK outlet—and at our upcoming Al Dhait branch—is halal.',
    qAr: 'هل اللحوم في سماش بي حلال؟',
    aAr: 'نعم، حلال 100%. جميع أصناف اللحم والدجاج في فرعنا قرب AURAK وفي فرع الظيت القادم حلال بالكامل.',
  },
  {
    id: 'chicken-veg',
    qEn: 'Do you serve chicken or vegetarian options?',
    aEn: 'Yes, we serve crispy chicken items including Classic Crunch (AED 12), Classic Spice (AED 17), Twisted Chick wrap (AED 12), Crunch Bomb (AED 10), and Fire Bomb (AED 15), plus milkshakes, mojitos, and Lemon Mint juice. Dedicated vegetarian patties are not currently listed on the menu (TODO: confirm if plain fries/veg sides are available).',
    qAr: 'هل تتوفر خيارات الدجاج أو الخيارات النباتية؟',
    aAr: 'نعم، نوفر خيارات الدجاج المقرمش مثل كلاسيك كرنش (12 درهم)، كلاسيك سبايس (17 درهم)، تويستد تشيك (12 درهم)، كرانش بومب (10 دراهم) وفاير بومب (15 درهم) مع الميلك شيك والموهيتو. لا يتوفر حالياً برجر نباتي مخصص في القائمة (TODO: تأكيد توفر البطاطس السادة أو الأطباق النباتية).',
    needsOwnerConfirmation: true,
  },
  {
    id: 'parking',
    qEn: 'Is parking available near Smash B?',
    aEn: 'TODO: Owner to confirm exact customer parking and pickup bay details near the AURAK outlet. You can call or WhatsApp +971 56 353 5819 for quick curbside directions.',
    qAr: 'هل تتوفر مواقف سيارات بالقرب من سماش بي؟',
    aAr: 'TODO: يرجى تأكيد تفاصيل مواقف السيارات المتاحة قرب فرع AURAK. يمكنك التواصل معنا على +971 56 353 5819 للاستفسار قبل الوصول.',
    needsOwnerConfirmation: true,
  },
  {
    id: 'payment-methods',
    qEn: 'What payment methods do you accept?',
    aEn: 'TODO: Owner to confirm accepted in-store payment methods (cash, card, Apple Pay) and WhatsApp takeaway payment options. Online Talabat orders support in-app payment methods.',
    qAr: 'ما هي طرق الدفع المتاحة لديكم؟',
    aAr: 'TODO: يرجى تأكيد طرق الدفع المعتمدة داخل الفرع (نقداً، بطاقة، Apple Pay). الطلبات عبر تطبيق طلبات تدعم الدفع الإلكتروني وكاش عند الاستلام.',
    needsOwnerConfirmation: true,
  },
  {
    id: 'student-offers',
    qEn: 'Do you offer AURAK student deals or discounts?',
    aEn: 'Every burger or sandwich can be upgraded to a combo (drink + fries) for AED 6, with burgers starting at AED 12. TODO: Owner to confirm if a dedicated AURAK student ID discount is active.',
    qAr: 'هل توجد عروض خاصة لطلاب الجامعة الأمريكية في رأس الخيمة (AURAK)؟',
    aAr: 'تبدأ أسعار البرجر من 12 درهم ويمكن إضافة مشروب وبطاطس لأي وجبة مقابل 6 درهم. TODO: يرجى تأكيد ما إذا كان هناك خصم مخصص ببطاقة الطالب.',
    needsOwnerConfirmation: true,
  },
];

export type RouteId =
  | 'home-en'
  | 'home-ar'
  | 'menu-en'
  | 'menu-ar'
  | 'story-en'
  | 'story-ar'
  | 'location-en'
  | 'location-ar'
  | 'not-found-en'
  | 'not-found-ar';

export interface RouteSeoConfig {
  id: RouteId;
  path: string;
  lang: 'en' | 'ar';
  dir: 'ltr' | 'rtl';
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogLocale: string;
  ogLocaleAlternate: string;
  ogImage: string;
  ogImageAlt: string;
  alternates?: {
    en: string;
    ar: string;
    xDefault: string;
  };
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const PRERENDER_ROUTES: RouteSeoConfig[] = [
  {
    id: 'home-en',
    path: '/',
    lang: 'en',
    dir: 'ltr',
    title: 'Smash Burgers Ras Al Khaimah | Smash B near AURAK',
    description:
      'Fresh smash burgers from AED 12 near AURAK in Ras Al Khaimah. Seared beef patties, loaded fries & Talabat delivery. Open daily 1 PM–12 AM.',
    canonical: `${SITE_URL}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogLocale: 'en_AE',
    ogLocaleAlternate: 'ar_AE',
    // TODO: Owner supplies custom 1200x630 OG artwork
    ogImage: `${SITE_URL}/og/og-home.png`,
    ogImageAlt: 'Smash B smash burgers near AURAK in Ras Al Khaimah',
    alternates: {
      en: `${SITE_URL}/`,
      ar: `${SITE_URL}/ar`,
      xDefault: `${SITE_URL}/`,
    },
  },
  {
    id: 'home-ar',
    path: '/ar',
    lang: 'ar',
    dir: 'rtl',
    title: 'برجر سماش في رأس الخيمة قرب AURAK | سماش بي',
    description:
      'برجر سماش طازج من 12 درهم بالقرب من جامعة AURAK في رأس الخيمة. لحم بقري طازج، بطاطا لودد وتوصيل عبر طلبات. يومياً 1 ظهراً – 12 ليلاً.',
    canonical: `${SITE_URL}/ar`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogLocale: 'ar_AE',
    ogLocaleAlternate: 'en_AE',
    // TODO: Owner supplies custom 1200x630 Arabic OG artwork
    ogImage: `${SITE_URL}/og/og-home.png`,
    ogImageAlt: 'سماش بي برجر سماش في رأس الخيمة قرب AURAK',
    alternates: {
      en: `${SITE_URL}/`,
      ar: `${SITE_URL}/ar`,
      xDefault: `${SITE_URL}/`,
    },
  },
  {
    id: 'menu-en',
    path: '/menu',
    lang: 'en',
    dir: 'ltr',
    title: 'Smash B Full Menu | Smash Burgers, Loaded Fries & Shakes',
    description:
      'Explore the full Smash B menu in Ras Al Khaimah: smash burgers from AED 12, loaded fries from AED 10, sandwiches, milkshakes, mojitos & lemon mint juice.',
    canonical: `${SITE_URL}/menu`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogLocale: 'en_AE',
    ogLocaleAlternate: 'ar_AE',
    // TODO: Owner supplies custom 1200x630 Menu OG artwork
    ogImage: `${SITE_URL}/og/og-menu.png`,
    ogImageAlt: 'Smash B Full Menu — Burgers, Loaded Fries, Milkshakes & Mojitos',
    alternates: {
      en: `${SITE_URL}/menu`,
      ar: `${SITE_URL}/ar/menu`,
      xDefault: `${SITE_URL}/menu`,
    },
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Menu', url: `${SITE_URL}/menu` },
    ],
  },
  {
    id: 'menu-ar',
    path: '/ar/menu',
    lang: 'ar',
    dir: 'rtl',
    title: 'قائمة طعام سماش بي الكاملة | برجر، لودد فرايز وميلك شيك',
    description:
      'تصفح قائمة طعام سماش بي في رأس الخيمة: برجر سماش من 12 درهم، بطاطا لودد من 10 دراهم، ساندويتشات، ميلك شيك، موهيتو وعصير ليمون ونعناع طازج.',
    canonical: `${SITE_URL}/ar/menu`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogLocale: 'ar_AE',
    ogLocaleAlternate: 'en_AE',
    // TODO: Owner supplies custom 1200x630 Arabic Menu OG artwork
    ogImage: `${SITE_URL}/og/og-menu.png`,
    ogImageAlt: 'قائمة طعام سماش بي الكاملة في رأس الخيمة',
    alternates: {
      en: `${SITE_URL}/menu`,
      ar: `${SITE_URL}/ar/menu`,
      xDefault: `${SITE_URL}/menu`,
    },
    breadcrumbs: [
      { name: 'الرئيسية', url: `${SITE_URL}/ar` },
      { name: 'قائمة الطعام', url: `${SITE_URL}/ar/menu` },
    ],
  },
  {
    id: 'story-en',
    path: '/our-story',
    lang: 'en',
    dir: 'ltr',
    title: 'Our Story & Branches in Ras Al Khaimah | Smash B',
    description:
      'Discover Smash B’s story in Ras Al Khaimah, our outlet near AURAK, and our upcoming Al Dhait branch opening soon.',
    canonical: `${SITE_URL}/our-story`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogLocale: 'en_AE',
    ogLocaleAlternate: 'ar_AE',
    // TODO: Owner supplies custom 1200x630 Our Story OG artwork
    ogImage: `${SITE_URL}/og/og-our-story.png`,
    ogImageAlt: 'Smash B Story — Ras Al Khaimah Smash Burger Shop',
    alternates: {
      en: `${SITE_URL}/our-story`,
      ar: `${SITE_URL}/ar/our-story`,
      xDefault: `${SITE_URL}/our-story`,
    },
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Our Story', url: `${SITE_URL}/our-story` },
    ],
  },
  {
    id: 'story-ar',
    path: '/ar/our-story',
    lang: 'ar',
    dir: 'rtl',
    title: 'قصتنا وفروعنا في رأس الخيمة | سماش بي',
    description:
      'تعرّف على قصة سماش بي في رأس الخيمة، فرعنا الحالي بالقرب من AURAK، وفرع الظيت القادم قريباً.',
    canonical: `${SITE_URL}/ar/our-story`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogLocale: 'ar_AE',
    ogLocaleAlternate: 'en_AE',
    // TODO: Owner supplies custom 1200x630 Arabic Our Story OG artwork
    ogImage: `${SITE_URL}/og/og-our-story.png`,
    ogImageAlt: 'قصة سماش بي وفروعنا في رأس الخيمة',
    alternates: {
      en: `${SITE_URL}/our-story`,
      ar: `${SITE_URL}/ar/our-story`,
      xDefault: `${SITE_URL}/our-story`,
    },
    breadcrumbs: [
      { name: 'الرئيسية', url: `${SITE_URL}/ar` },
      { name: 'قصتنا', url: `${SITE_URL}/ar/our-story` },
    ],
  },
  {
    id: 'location-en',
    path: '/location',
    lang: 'en',
    dir: 'ltr',
    title: 'Smash B Location Near AURAK, Ras Al Khaimah | Directions & Hours',
    description:
      'Visit Smash B near AURAK in Ras Al Khaimah. Open daily 1:00 PM – 12:00 AM for dine-in, takeaway, WhatsApp orders (+971 56 353 5819) & Talabat delivery.',
    canonical: `${SITE_URL}/location`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogLocale: 'en_AE',
    ogLocaleAlternate: 'ar_AE',
    // TODO: Owner supplies custom 1200x630 Location OG artwork
    ogImage: `${SITE_URL}/og/og-location.png`,
    ogImageAlt: 'Find Smash B near AURAK in Ras Al Khaimah',
    alternates: {
      en: `${SITE_URL}/location`,
      ar: `${SITE_URL}/ar/location`,
      xDefault: `${SITE_URL}/location`,
    },
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Location', url: `${SITE_URL}/location` },
    ],
  },
  {
    id: 'location-ar',
    path: '/ar/location',
    lang: 'ar',
    dir: 'rtl',
    title: 'موقع سماش بي قرب AURAK رأس الخيمة | الاتجاهات وساعات العمل',
    description:
      'زُر سماش بي بالقرب من الجامعة الأمريكية في رأس الخيمة (AURAK). مفتوح يومياً من 1 ظهراً حتى 12 ليلاً مع توصيل طلبات وطلبات واتساب (+971 56 353 5819).',
    canonical: `${SITE_URL}/ar/location`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogLocale: 'ar_AE',
    ogLocaleAlternate: 'en_AE',
    // TODO: Owner supplies custom 1200x630 Arabic Location OG artwork
    ogImage: `${SITE_URL}/og/og-location.png`,
    ogImageAlt: 'موقع سماش بي بالقرب من AURAK رأس الخيمة',
    alternates: {
      en: `${SITE_URL}/location`,
      ar: `${SITE_URL}/ar/location`,
      xDefault: `${SITE_URL}/location`,
    },
    breadcrumbs: [
      { name: 'الرئيسية', url: `${SITE_URL}/ar` },
      { name: 'الموقع', url: `${SITE_URL}/ar/location` },
    ],
  },
];

export const NOT_FOUND_CONFIG: Record<'en' | 'ar', RouteSeoConfig> = {
  en: {
    id: 'not-found-en',
    path: '/404',
    lang: 'en',
    dir: 'ltr',
    title: 'Page Not Found (404) | Smash B Ras Al Khaimah',
    description:
      'The page you requested could not be found. Browse the Smash B menu, location near AURAK, or return home.',
    canonical: `${SITE_URL}/404`,
    robots: 'noindex, follow',
    ogLocale: 'en_AE',
    ogLocaleAlternate: 'ar_AE',
    ogImage: `${SITE_URL}/og/og-home.png`,
    ogImageAlt: 'Smash B — Ras Al Khaimah',
  },
  ar: {
    id: 'not-found-ar',
    path: '/ar/404',
    lang: 'ar',
    dir: 'rtl',
    title: 'الصفحة غير موجودة (404) | سماش بي رأس الخيمة',
    description:
      'تعذر العثور على الصفحة المطلوبة. تصفح قائمة طعام سماش بي أو موقعنا قرب AURAK أو ارجع إلى الصفحة الرئيسية.',
    canonical: `${SITE_URL}/ar/404`,
    robots: 'noindex, follow',
    ogLocale: 'ar_AE',
    ogLocaleAlternate: 'en_AE',
    ogImage: `${SITE_URL}/og/og-home.png`,
    ogImageAlt: 'سماش بي — رأس الخيمة',
  },
};

export function normalizePathname(pathname: string): string {
  if (!pathname) return '/';
  const cleaned = pathname.split('?')[0].split('#')[0];
  if (cleaned === '/') return '/';
  return cleaned.replace(/\/+$/, '') || '/';
}

export function isArabicPath(pathname: string): boolean {
  const norm = normalizePathname(pathname);
  return norm === '/ar' || norm.startsWith('/ar/');
}

export function getPairedPath(pathname: string, targetLang: 'en' | 'ar'): string {
  const norm = normalizePathname(pathname);
  const stripAr = norm === '/ar' ? '/' : norm.replace(/^\/ar(?=\/|$)/, '') || '/';
  if (targetLang === 'en') {
    return stripAr;
  }
  return stripAr === '/' ? '/ar' : `/ar${stripAr}`;
}

export function getRouteSeoByPath(pathname: string): RouteSeoConfig {
  const norm = normalizePathname(pathname);
  const matched = PRERENDER_ROUTES.find((r) => r.path === norm);
  if (matched) return matched;
  return isArabicPath(norm) ? NOT_FOUND_CONFIG.ar : NOT_FOUND_CONFIG.en;
}

function buildRestaurantNode() {
  const sameAs = [
    BUSINESS_INFO.profiles.instagram,
    BUSINESS_INFO.profiles.tiktok,
    BUSINESS_INFO.profiles.snapchat,
    BUSINESS_INFO.profiles.talabat,
    BUSINESS_INFO.profiles.facebook,
    BUSINESS_INFO.profiles.threads,
    BUSINESS_INFO.mapsListingUrl,
  ].filter((url): url is string => Boolean(url));

  const node: Record<string, unknown> = {
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: BUSINESS_INFO.name,
    alternateName: BUSINESS_INFO.alternateNames,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logos/smashb-logo-1.svg`,
    image: `${SITE_URL}/og/og-home.png`,
    description:
      'Smash B is a 100% halal smash burger shop with one outlet near American University of Ras Al Khaimah (AURAK) in Ras Al Khaimah, UAE, and a second branch in Al Dhait opening soon.',
    telephone: BUSINESS_INFO.telephone,
    priceRange: BUSINESS_INFO.priceRange,
    servesCuisine: BUSINESS_INFO.servesCuisine,
    acceptsReservations: false,
    hasMenu: `${SITE_URL}/menu`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      ...(BUSINESS_INFO.address.postalCode
        ? { postalCode: BUSINESS_INFO.address.postalCode }
        : {}),
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    areaServed: BUSINESS_INFO.areaServed.map((name) => ({
      '@type': 'Place',
      name,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: BUSINESS_INFO.hours.opens,
        closes: BUSINESS_INFO.hours.closes,
      },
    ],
    sameAs,
  };

  if (BUSINESS_INFO.mapsListingUrl) {
    node.hasMap = BUSINESS_INFO.mapsListingUrl;
  }

  if (BUSINESS_INFO.geo.latitude !== null && BUSINESS_INFO.geo.longitude !== null) {
    node.geo = {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    };
  }

  return node;
}

function buildBreadcrumbNode(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function buildMenuSchemaNode(lang: 'en' | 'ar') {
  const isAr = lang === 'ar';
  return {
    '@type': 'Menu',
    '@id': `${SITE_URL}${isAr ? '/ar/menu' : '/menu'}#menu`,
    name: isAr ? 'قائمة طعام سماش بي الكاملة' : 'Smash B Full Menu',
    inLanguage: lang,
    mainEntityOfPage: `${SITE_URL}${isAr ? '/ar/menu' : '/menu'}`,
    hasMenuSection: Object.entries(MENU_DATA).map(([categoryKey, items]) => {
      const catLabel = MENU_LANGUAGES[lang].categories[categoryKey] || categoryKey;
      return {
        '@type': 'MenuSection',
        name: catLabel,
        hasMenuItem: items.map((item) => {
          const translated = MENU_LANGUAGES[lang].items[item.name];
          const itemName = translated?.name || item.name;
          const itemDesc = translated?.description || item.description;
          return {
            '@type': 'MenuItem',
            name: itemName,
            ...(itemDesc ? { description: itemDesc } : {}),
            image: `${SITE_URL}${item.image}`,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'AED',
              availability: 'https://schema.org/InStock',
            },
          };
        }),
      };
    }),
  };
}

export function buildJsonLdGraph(route: RouteSeoConfig): Record<string, unknown> | null {
  if (route.id === 'not-found-en' || route.id === 'not-found-ar') {
    return null;
  }

  const graph: Record<string, unknown>[] = [];
  const isAr = route.lang === 'ar';

  if (route.id === 'home-en' || route.id === 'home-ar') {
    const sameAs = [
      BUSINESS_INFO.profiles.instagram,
      BUSINESS_INFO.profiles.tiktok,
      BUSINESS_INFO.profiles.snapchat,
      BUSINESS_INFO.profiles.talabat,
      BUSINESS_INFO.profiles.facebook,
      BUSINESS_INFO.profiles.threads,
      BUSINESS_INFO.mapsListingUrl,
    ].filter((url): url is string => Boolean(url));

    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: BUSINESS_INFO.name,
      alternateName: BUSINESS_INFO.alternateNames,
      inLanguage: ['en', 'ar'],
    });

    graph.push({
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BUSINESS_INFO.name,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logos/smashb-logo-1.svg`,
      sameAs,
    });

    graph.push(buildRestaurantNode());

    graph.push({
      '@type': 'FAQPage',
      '@id': `${route.canonical}#faq`,
      mainEntity: FAQS.filter((faq) => !faq.needsOwnerConfirmation).map((faq) => ({
        '@type': 'Question',
        name: isAr ? faq.qAr : faq.qEn,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isAr ? faq.aAr : faq.aEn,
        },
      })),
    });
  } else if (route.id === 'location-en' || route.id === 'location-ar') {
    graph.push(buildRestaurantNode());
  } else if (route.id === 'menu-en' || route.id === 'menu-ar') {
    graph.push(buildMenuSchemaNode(route.lang));
  } else if (route.id === 'story-en' || route.id === 'story-ar') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${route.canonical}#about`,
      url: route.canonical,
      name: route.title,
      description: route.description,
      inLanguage: route.lang,
      mainEntity: { '@id': `${SITE_URL}/#restaurant` },
    });
  }

  if (route.breadcrumbs && route.breadcrumbs.length > 0) {
    graph.push(buildBreadcrumbNode(route.breadcrumbs));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
