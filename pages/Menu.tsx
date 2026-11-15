import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  ExternalLink,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import BrandCharacterMenu from '../components/BrandCharacterMenu';
import { useLanguage } from '../LanguageContext';
import {
  appendUtmParams,
  trackTalabatClick,
  trackWhatsAppClick,
  trackCallClick
} from '../analytics';
import { useSmashShapes } from '../utils/smashShapes';

const TALABAT_URL = 'https://www.talabat.com/uae/smash-b';
const WHATSAPP_URL = 'https://wa.me/971563535819?text=Hi%20Smash%20B%2C%20I%20would%20like%20to%20order';
const PHONE_NUMBER = '+971 56 353 5819';
const PHONE_HREF = 'tel:+971563535819';

interface MenuItem {
  name: string;
  description?: string;
  price: number;
  image: string;
  badgeEn?: string;
  badgeAr?: string;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  BURGERS: [
    {
      name: 'Solo Smash',
      description: 'Potato bun, single beef patty, cheese, pickle, caramelized onion, sb sauce.',
      price: 12,
      image: '/solo-smash.png',
      badgeEn: 'Starter Icon',
      badgeAr: 'الأكثر توفيراً',
    },
    {
      name: 'Duo Smash',
      description: 'Double beef patty, cheese, pickle, caramelized onion, sb sauce.',
      price: 17,
      image: '/duo-smash.png',
      badgeEn: '#1 Best Seller',
      badgeAr: 'الأكثر طلباً',
    },
    {
      name: 'Trio Smash',
      description: 'Triple beef patty, cheese, pickle, caramelized onion, sb sauce.',
      price: 23,
      image: '/trio-smash.png',
      badgeEn: 'Max Smashed',
      badgeAr: 'الحجم الأقصى',
    },
    {
      name: 'Classic Crunch',
      description: 'Fried crispy chicken, jalapeno, iceberg lettuce, sb sauce.',
      price: 12,
      image: '/classic-crunch.png',
      badgeEn: 'Crispy Gold',
      badgeAr: 'كرسبي ذهبي',
    },
    {
      name: 'Classic Spice',
      description: 'Fried crispy chicken, nashville sauce, jalapeno, iceberg lettuce, sb sauce.',
      price: 17,
      image: '/classic-spice.png',
      badgeEn: 'Nashville Heat',
      badgeAr: 'حار مميز',
    },
  ],
  'LOADED FRIES': [
    {
      name: 'Crunch Bomb',
      description: 'Fried chicken, french fries, jalapeno, sb sauce.',
      price: 10,
      image: '/crunch-bomb.png',
      badgeEn: 'Quick Crave',
      badgeAr: 'قرمشة سريعة',
    },
    {
      name: 'Beefy Bomb',
      description: 'Smashed beef, french fries, pickle, sb sauce.',
      price: 12,
      image: '/beefy-bomb.png',
      badgeEn: 'Loaded Favorite',
      badgeAr: 'لودد مميز',
    },
    {
      name: 'Fire Bomb',
      description: 'Nashville chicken, french fries, jalapeño, sb sauce.',
      price: 15,
      image: '/fire-bomb.png',
      badgeEn: 'Spicy Hit',
      badgeAr: 'نكهة حارة',
    },
  ],
  SANDWICHES: [
    {
      name: 'Havana',
      description: 'French baguette, beef patty, roasted beef, mustard sauce, pickle, sb sauce.',
      price: 13,
      image: '/Havana.png',
    },
    {
      name: 'Twisted Chick',
      description: 'Tortilla wrap, fried chicken, lettuce, jalapeno, cheese, sb sauce.',
      price: 12,
      image: '/Twisted-Chick.png',
    },
  ],
  MILKSHAKES: [
    { name: 'Mango Madness', price: 12, image: '/Mango-madness.png' },
    { name: 'Coco Crush', price: 12, image: '/Coco-crush.png' },
    { name: 'Lotus Loaded', price: 12, image: '/Lotus-loaded.png' },
    { name: 'Oreo Overload', price: 12, image: '/Oreo-overload.png' },
    { name: 'Choco Melt', price: 12, image: '/Choco-melt.png' },
    { name: 'Smash Berry', price: 13, image: '/Smash-Berry.png' },
  ],
  MOJITOS: [
    { name: 'Blue Wave', price: 10, image: '/Blue-wave.png' },
    { name: 'Pink Rush', price: 10, image: '/Pink-rush.png' },
    { name: 'Violet Vibe', price: 10, image: '/Violet-Vibe.png' },
    { name: 'Mint Rush', price: 10, image: '/Mint-Rush.png' },
    { name: 'Passion Storm', price: 10, image: '/Passion-storm.png' },
    { name: 'Midnight Berry', price: 12, image: '/Midnight-Berry.png' },
  ],
  'FRESH JUICE': [
    { name: 'Lemon Mint', price: 10, image: '/lemon-mint.png' },
  ],
};

const MENU_LANGUAGES: Record<'en' | 'ar', {
  categories: Record<string, string>;
  items: Record<string, { name: string; description?: string }>;
  ui: {
    addOnTitle: string;
    addOnDesc: string;
    aed: string;
    backHome: string;
    ourStory: string;
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
    },
  },
};

const Menu: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const isAr = language === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);

  useSmashShapes([language, activeCategory, isOpenNow]);

  // Dynamic Open-Now status based on UAE Gulf Standard Time (UTC+4)
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const uaeDate = new Date(utc + 3600000 * 4);
      const hours = uaeDate.getHours();
      setIsOpenNow(hours >= 13 && hours < 24);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = isAr
      ? 'قائمة الطعام | سماش بي'
      : 'Smash B Full Menu | Burgers, Loaded Fries & Shakes';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      isAr
        ? 'استعرض قائمة طعام سماش بي الكاملة: برجر سماش من 12 درهم، بطاطا لودد، ساندويتشات، ميلك شيك، وموهيتو محضر طازجاً على الطلب.'
        : 'Explore the full Smash B menu: smash burgers from AED 12, loaded fries, toasted sandwiches, milkshakes, mojitos & fresh lemon mint juice made hot to order.'
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.smashb.ae/menu');

    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', dir);
  }, [isAr, language, dir]);

  const toggleLanguage = () => {
    setLanguage(isAr ? 'en' : 'ar');
  };

  return (
    <div
      className="min-h-screen bg-[#F5F1E8] text-[#432724] font-body selection:bg-[#FF1C00] selection:text-[#F5F1E8]"
      dir={dir}
    >
      {/* TOP NOTIFICATION RIBBON */}
      <div className="w-full bg-[#FF1C00] text-[#F5F1E8] py-2 px-4 text-center font-bold text-xs md:text-sm tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 shrink-0 text-[#A5C7A5]" />
        <span>
          {isAr
            ? 'برجر سماش طازج من 12 درهم • حلال 100% • مفتوح يومياً من 1 ظهراً حتى منتصف الليل'
            : 'Fresh smash burgers from AED 12 • 100% Halal • Open daily 1 PM – 12 AM'}
        </span>
      </div>

      {/* HEADER / NAVIGATION (Matches Home) */}
      <header className="sticky top-0 z-40 bg-[#F5F1E8]/95 backdrop-blur-sm border-b border-[#432724]/20 px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to={isAr ? '/ar' : '/'} className="flex items-center gap-2 group">
            <img
              src="/logos/smashb-logo-4.svg"
              alt="Smash B Logo"
              width={48}
              height={48}
              className="h-11 md:h-12 w-auto object-contain drop-shadow-[0_1.5px_0_rgba(67,39,36,0.24)] transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5">
            <Link
              to={isAr ? '/ar' : '/'}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide sm:tracking-wider px-2.5 sm:px-5 py-2 sm:py-2.5 smash-btn bg-[#F5F1E8] text-[#432724] transition-colors whitespace-nowrap tap-target"
            >
              {MENU_LANGUAGES[language].ui.backHome}
            </Link>

            <Link
              to="/our-story"
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide sm:tracking-wider px-2.5 sm:px-5 py-2 sm:py-2.5 smash-btn bg-[#F5F1E8] text-[#432724] transition-colors whitespace-nowrap tap-target"
            >
              {MENU_LANGUAGES[language].ui.ourStory}
            </Link>

            <button
              onClick={toggleLanguage}
              aria-label="Switch Language"
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="text-[11px] sm:text-xs md:text-sm font-bold uppercase px-2.5 sm:px-5 py-2 sm:py-2.5 smash-btn bg-[#F5F1E8] text-[#432724] transition-all whitespace-nowrap tap-target flex items-center justify-center gap-1"
            >
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            <a
              href={appendUtmParams(TALABAT_URL)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTalabatClick('menu_header')}
              data-smash-shape="btn"
              data-smash-stroke="none"
              className="hidden md:inline-flex items-center gap-2 bg-[#FF1C00] text-[#F5F1E8] font-bold text-xs uppercase px-6 py-2.5 smash-btn tap-target"
            >
              <span>{isAr ? 'اطلب عبر طلبات' : 'Order on Talabat'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* MENU HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-10 md:py-14 px-4 md:px-8 border-b border-[#432724]/15">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-start">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                <span
                  data-smash-shape="badge"
                  data-smash-stroke="none"
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold smash-btn ${
                    isOpenNow
                      ? 'bg-[#A5C7A5] text-[#432724]'
                      : 'bg-[#432724]/10 text-[#432724]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOpenNow ? 'bg-[#FF1C00] animate-pulse' : 'bg-[#432724]/50'
                    }`}
                  />
                  {isOpenNow
                    ? isAr
                      ? 'مفتوح الآن • حتى 12:00 ليلاً'
                      : 'Open Now • Closes 12:00 AM'
                    : isAr
                      ? 'مغلق الآن • يفتح 1:00 ظهراً'
                      : 'Closed Now • Opens 1:00 PM'}
                </span>

                <span
                  data-smash-shape="badge"
                  data-smash-stroke="none"
                  className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-black uppercase tracking-wider bg-[#FF1C00] text-[#F5F1E8] smash-btn"
                >
                  {isAr ? 'حلال 100%' : '100% Halal'}
                </span>
              </div>

              <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight uppercase text-[#432724]">
                {isAr ? (
                  <>
                    قائمة طعام <span className="text-[#FF1C00]">سماش بي</span> الكاملة
                  </>
                ) : (
                  <>
                    Smash B <span className="text-[#FF1C00]">Full Menu</span>
                  </>
                )}
              </h1>

              <p className="font-bold text-sm md:text-base tracking-wide text-[#FF1C00]">
                {isAr
                  ? 'سماش طازج على الطلب. نكهة قوية وأسعار على قد اليد.'
                  : 'Smashed hot to order. Big flavor, honest prices.'}
              </p>

              <p className="text-sm md:text-base leading-relaxed text-[#432724]/90 max-w-xl mx-auto lg:mx-0">
                {isAr
                  ? 'اختر اللي في خاطرك—من برجر اللحم المقرمش من الأطراف والدجاج الكرسبي، إلى اللودد فرايز، الساندويتشات، الميلك شيك الغني، والموهيتو البارد المحضّر لحظة الطلب.'
                  : 'Pick whatever you’re craving—crispy-edged beef burgers, crunchy chicken, loaded fries, toasted wraps, thick milkshakes, and ice-cold mojitos made fresh the moment you order.'}
              </p>

              <div className="pt-1 flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href={appendUtmParams(TALABAT_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTalabatClick('menu_hero')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#FF1C00] text-[#F5F1E8] font-bold text-sm md:text-base uppercase px-7 py-3.5 flex items-center justify-center gap-2 tap-target"
                >
                  <img
                    src="/icons8-talabat.svg"
                    alt="Talabat"
                    width={22}
                    height={22}
                    className="w-5 h-5 object-contain rounded"
                  />
                  <span>{isAr ? 'اطلب عبر طلبات' : 'Order on Talabat'}</span>
                </a>

                <a
                  href={appendUtmParams(WHATSAPP_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('menu_hero')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-sm md:text-base uppercase px-7 py-3.5 flex items-center justify-center gap-2 tap-target"
                >
                  <MessageCircle className="w-5 h-5 text-[#432724]" />
                  <span>{isAr ? 'طلب عبر واتساب' : 'WhatsApp Order'}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Official Menu Character (Open Background, Scaled Up) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <BrandCharacterMenu className="w-72 sm:w-88 lg:w-full max-w-[390px] h-auto select-none drop-shadow-[0_8px_0_rgba(67,39,36,0.18)]" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER & MENU ITEMS */}
      <section className="py-10 md:py-14 px-4 md:px-8 bg-[#F5F1E8] border-b border-[#432724]/15">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 pb-6 border-b border-[#432724]/15">
            {['ALL', ...Object.keys(MENU_DATA)].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  data-smash-shape="compact"
                  data-smash-stroke={isActive ? 'none' : 'thin'}
                  className={`smash-btn px-5 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider transition-all tap-target cursor-pointer ${
                    isActive
                      ? 'bg-[#FF1C00] text-[#F5F1E8]'
                      : 'bg-[#F5F1E8] text-[#432724]'
                  }`}
                >
                  {MENU_LANGUAGES[language].categories[cat]}
                </button>
              );
            })}
          </div>

          {/* Combo Add-On Banner */}
          {(activeCategory === 'ALL' ||
            activeCategory === 'BURGERS' ||
            activeCategory === 'SANDWICHES') && (
            <div
              data-smash-shape="wide"
              data-smash-stroke="none"
              className="smash-wide-box bg-[#A5C7A5]/35 p-5 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start"
            >
              <div className="flex items-center gap-3">
                <div
                  data-smash-shape="square"
                  data-smash-stroke="none"
                  className="w-10 h-10 smash-box bg-[#FF1C00] text-[#F5F1E8] flex items-center justify-center font-primary text-sm shrink-0"
                >
                  +6
                </div>
                <div>
                  <h2 className="font-primary text-lg md:text-xl uppercase tracking-tight text-[#432724]">
                    {MENU_LANGUAGES[language].ui.addOnTitle}
                  </h2>
                  <p className="text-xs md:text-sm text-[#432724]/85">
                    {MENU_LANGUAGES[language].ui.addOnDesc}
                  </p>
                </div>
              </div>
              <span
                data-smash-shape="badge"
                data-smash-stroke="none"
                className="bg-[#FF1C00] text-[#F5F1E8] smash-btn px-4 py-1.5 font-primary text-sm uppercase shrink-0"
              >
                + {isAr ? '6 درهم' : 'AED 6'}
              </span>
            </div>
          )}

          {/* Category Sections */}
          <div className="space-y-14">
            {Object.entries(MENU_DATA)
              .filter(([category]) => activeCategory === 'ALL' || activeCategory === category)
              .map(([category, items]) => (
                <div key={category} className="space-y-6">
                  <div className="flex items-baseline justify-between gap-4 border-b border-[#432724]/20 pb-3">
                    <h2 className="font-primary text-3xl sm:text-4xl uppercase tracking-tight text-[#432724]">
                      {MENU_LANGUAGES[language].categories[category]}
                    </h2>

                    <span className="text-xs font-bold uppercase tracking-wider text-[#432724]/65 shrink-0">
                      {items.length} {isAr ? 'أصناف' : items.length === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => {
                      const itemTranslation = MENU_LANGUAGES[language].items[item.name] || {
                        name: item.name,
                        description: item.description,
                      };
                      const displayName = itemTranslation.name || item.name;
                      const displayDescription =
                        itemTranslation.description || item.description;
                      const badgeText = isAr ? item.badgeAr : item.badgeEn;
                      const slug = item.name.toLowerCase().replace(/\s+/g, '_');

                      return (
                        <article
                          key={item.name}
                          data-smash-shape="card"
                          data-smash-stroke="card"
                          className="smash-box bg-[#F5F1E8] p-6 sm:p-7 flex flex-col justify-between transition-transform hover:-translate-y-1"
                        >
                          <div>
                            <div
                              data-smash-shape="photo"
                              data-smash-stroke="none"
                              className="relative w-full aspect-4/3 smash-box bg-[#A5C7A5]/25 flex items-center justify-center p-4 mb-4"
                            >
                              <img
                                src={item.image}
                                alt={`${displayName} - Smash B Ras Al Khaimah`}
                                width={220}
                                height={165}
                                className={`object-contain transform transition-transform hover:scale-105 relative z-10 ${
                                  item.name === 'Havana' ? 'w-[82%] h-[82%]' : 'w-full h-full'
                                }`}
                                loading="lazy"
                              />
                              {badgeText && (
                                <span
                                  data-smash-shape="badge"
                                  data-smash-stroke="none"
                                  className="absolute top-4 left-4 sm:top-5 sm:left-5 z-30 bg-[#FF1C00] text-[#F5F1E8] font-bold text-[10px] uppercase px-3.5 py-1 smash-btn"
                                >
                                  {badgeText}
                                </span>
                              )}
                            </div>

                            <div className="flex items-baseline justify-between gap-2 mb-2">
                              <h3 className="font-primary text-xl md:text-2xl uppercase tracking-tight text-[#432724]">
                                {displayName}
                              </h3>
                              <div className="font-primary text-lg md:text-xl font-black text-[#FF1C00] shrink-0">
                                {isAr
                                  ? `${item.price} ${MENU_LANGUAGES[language].ui.aed}`
                                  : `AED ${item.price}`}
                              </div>
                            </div>

                            {displayDescription && (
                              <p className="text-xs md:text-sm text-[#432724]/80 leading-relaxed mb-5">
                                {displayDescription}
                              </p>
                            )}
                          </div>

                          <a
                            href={appendUtmParams(TALABAT_URL)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackTalabatClick(`menu_${slug}`)}
                            data-smash-shape="btn"
                            data-smash-stroke="none"
                            className={`smash-btn w-full bg-[#FF1C00] text-[#F5F1E8] text-xs font-bold uppercase py-3 px-5 flex items-center justify-center gap-2 tap-target ${
                              !displayDescription ? 'mt-3' : ''
                            }`}
                          >
                            <img
                              src="/icons8-talabat.svg"
                              alt="Talabat"
                              width={16}
                              height={16}
                              className="w-4 h-4 object-contain rounded"
                            />
                            <span>{isAr ? 'اطلب الآن عبر طلبات' : 'Order on Talabat'}</span>
                          </a>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* FOOTER (Matches Home) */}
      <footer className="bg-[#F5F1E8] text-[#432724] pt-12 pb-24 md:pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b-2 border-[#432724] pb-8">
            <div className="md:col-span-5 space-y-3">
              <img
                src="/logos/smashb-logo-1.svg"
                alt="Smash B - Ras Al Khaimah"
                width={56}
                height={56}
                className="h-14 w-auto object-contain"
              />
              <p className="font-bold text-sm text-[#FF1C00] uppercase tracking-wide">
                "Stay smashin'."
              </p>
              <p className="text-xs text-[#432724]/80 leading-relaxed max-w-sm">
                {isAr
                  ? 'سماش بي هو متجر برجر سماش في رأس الخيمة يقدم برجر اللحم والدجاج الطازج، بطاطا لودد، ومشروبات منعشة بالقرب من جامعة AURAK.'
                  : 'Smash B is a local smash burger shop in Ras Al Khaimah, serving fresh seared burgers, loaded fries, and refreshing drinks near AURAK.'}
              </p>
            </div>

            <div className="md:col-span-4 space-y-2">
              <h4 className="font-primary text-lg uppercase tracking-tight text-[#432724]">
                {isAr ? 'معلومات التواصل' : 'Contact & Location'}
              </h4>
              <p className="text-xs text-[#432724]/85">
                <strong className="block text-[#432724]">{isAr ? 'سماش بي (Smash B)' : 'Smash B'}</strong>
                {isAr
                  ? 'بالقرب من الجامعة الأمريكية في رأس الخيمة (AURAK)، رأس الخيمة، الإمارات العربية المتحدة'
                  : 'Near American University of Ras Al Khaimah (AURAK), Ras Al Khaimah, United Arab Emirates'}
              </p>
              <p className="text-xs text-[#432724]/85 font-mono pt-1">
                {isAr ? 'الهاتف / واتساب:' : 'Phone / WhatsApp:'}{' '}
                <a
                  href={PHONE_HREF}
                  onClick={() => trackCallClick('menu_footer')}
                  dir="ltr"
                  className="inline-block underline font-bold text-[#FF1C00]"
                >
                  {PHONE_NUMBER}
                </a>
              </p>
              <p className="text-xs text-[#432724]/85">
                {isAr
                  ? 'ساعات العمل: يومياً 1:00 ظهراً – 12:00 منتصف الليل'
                  : 'Hours: Daily 1:00 PM – 12:00 AM (Midnight)'}
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="font-primary text-lg uppercase tracking-tight text-[#432724]">
                {isAr ? 'تابعنا' : 'Social Links'}
              </h4>
              <div className="flex flex-col">
                <a
                  href="https://www.instagram.com/smashb.uae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase hover:text-[#FF1C00] transition-colors inline-flex items-center gap-1.5 leading-relaxed"
                >
                  <span>Instagram @smashb.uae</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.tiktok.com/@smashbuae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase hover:text-[#FF1C00] transition-colors inline-flex items-center gap-1.5 leading-relaxed"
                >
                  <span>TikTok @smashbuae</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://snapchat.com/t/cbTUmbL0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase hover:text-[#FF1C00] transition-colors inline-flex items-center gap-1.5 leading-relaxed"
                >
                  <span>Snapchat @smashb.uae</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#432724]/70">
            <p>
              {isAr
                ? `© ${new Date().getFullYear()} سماش بي. جميع الحقوق محفوظة.`
                : `© ${new Date().getFullYear()} Smash B. All rights reserved.`}
            </p>
            <div className="flex items-center gap-4">
              <Link to={isAr ? '/ar' : '/'} className="hover:underline">
                {isAr ? 'الرئيسية' : 'Home'}
              </Link>
              <Link to="/menu" className="hover:underline">
                {isAr ? 'القائمة' : 'Menu'}
              </Link>
              <Link to="/our-story" className="hover:underline">
                {isAr ? 'قصتنا' : 'Our Story'}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY ORDER BAR ON MOBILE */}
      <aside
        aria-label="Quick Order Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F5F1E8]/98 backdrop-blur border-t border-[#432724]/25 px-3 py-2.5 shadow-[0_-4px_12px_rgba(67,39,36,0.12)] flex items-center gap-2"
      >
        <a
          href={appendUtmParams(TALABAT_URL)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTalabatClick('menu_sticky_mobile')}
          data-smash-shape="btn"
          data-smash-stroke="none"
          className="flex-[1.35] smash-btn bg-[#FF1C00] text-[#F5F1E8] font-bold text-[11px] sm:text-xs uppercase py-3 px-4 flex items-center justify-center gap-1.5 whitespace-nowrap tap-target"
        >
          <img
            src="/icons8-talabat.svg"
            alt="Talabat"
            width={18}
            height={18}
            className="w-4 h-4 object-contain rounded shrink-0"
          />
          <span>{isAr ? 'اطلب عبر طلبات' : 'Order on Talabat'}</span>
        </a>

        <a
          href={appendUtmParams(WHATSAPP_URL)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('menu_sticky_mobile')}
          data-smash-shape="btn"
          data-smash-stroke="none"
          className="flex-1 smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-[11px] sm:text-xs uppercase py-3 px-4 flex items-center justify-center gap-1.5 whitespace-nowrap tap-target"
        >
          <MessageCircle className="w-4 h-4 text-[#432724] shrink-0" />
          <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
        </a>

        <a
          href={PHONE_HREF}
          onClick={() => trackCallClick('menu_sticky_mobile')}
          data-smash-shape="square"
          data-smash-stroke="thin"
          className="w-11 h-11 smash-box bg-[#F5F1E8] text-[#FF1C00] flex items-center justify-center shrink-0 tap-target"
          aria-label="Call Smash B"
        >
          <Phone className="w-4 h-4 text-[#FF1C00]" />
        </a>
      </aside>
    </div>
  );
};

export default Menu;
