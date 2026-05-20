import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ExternalLink, X, Globe } from 'lucide-react';
import BrandCharacterMenu from '../components/BrandCharacterMenu';
import { useLanguage } from '../LanguageContext';

const MENU_DATA = {
  BURGERS: [
    { name: 'Solo Smash', description: 'Potato bun, single beef patty, cheese, pickle, caramelized onion, sb sauce.', price: 12, image: '/solo-smash.png' },
    { name: 'Duo Smash', description: 'Double beef patty, cheese, pickle, caramelized onion, sb sauce.', price: 17, image: '/duo-smash.png' },
    { name: 'Trio Smash', description: 'Triple beef patty, cheese, pickle, caramelized onion, sb sauce.', price: 23, image: '/trio-smash.png' },
    { name: 'Classic Crunch', description: 'Fried crispy chicken, jalapeno, iceberg lettuce, sb sauce.', price: 12, image: '/classic-crunch.png' },
    { name: 'Classic Spice', description: 'Fried crispy chicken, nashville sauce, jalapeno, iceberg lettuce, sb sauce', price: 17, image: '/classic-spice.png' },
  ],
  'LOADED FRIES': [
    { name: 'Crunch Bomb', description: 'Fried chicken, french fries, jalapeno, sb sauce.', price: 10, image: '/crunch-bomb.png' },
    { name: 'Beefy Bomb', description: 'Smashed beef, french fries, pickle, sb sauce.', price: 12, image: '/beefy-bomb.png' },
    { name: 'Fire Bomb', description: 'Nashville chicken, french fries, jalapeño, sb sauce.', price: 15, image: '/fire-bomb.png' },
  ],
  SANDWICHES: [
    { name: 'Havana', description: 'French baguette, beef patty, roasted beef , mustard sauce, pickle, sb sauce.', price: 13, image: '/Havana.png' },
    { name: 'Twisted Chick', description: 'Tortilla wrap, fried chicken, lettuce, jalapeno, cheese, sbsauce.', price: 12, image: '/Twisted-Chick.png' },
  ],
  MILKSHAKES: [
    { name: 'Mango Madness', price: 12 },
    { name: 'Coco Crush', price: 12 },
    { name: 'Lotus Loaded', price: 12 },
    { name: 'Oreo Overload', price: 12 },
    { name: 'Choco Melt', price: 12 },
    { name: 'Smash Berry', price: 13 },
  ],
  MOJITOS: [
    { name: 'Blue Wave', price: 10 },
    { name: 'Pink Rush', price: 10 },
    { name: 'Violet Vibe', price: 10 },
    { name: 'Mint Rush', price: 10 },
    { name: 'Passion Storm', price: 10 },
    { name: 'Midnight Berry', price: 12 },
  ],
  'FRESH JUICE': [
    { name: 'Lemon Mint', price: 10 },
    { name: 'orange', price: 10 },
  ]
};

const MENU_LANGUAGES = {
  en: {
    categories: {
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
      'orange': { name: 'Orange' },
    },
    ui: {
      addOn: 'Add on',
      softDrinksFriesLine1: 'Soft drinks',
      softDrinksFriesLine2: '& fries',
      aed: 'AED',
      backHome: 'Back Home',
      getInTouch: 'Get In Touch',
      socialEnergy: 'Social Energy',
      location: 'Ras Al Khaimah',
      // Welcome popup
      heyWelcome: 'Hey! Welcome to Smash B 🍔✨',
      popupText1: 'We’re so glad you’re here! Whether you’re starving for a massive burger or just need a refreshing mojito to vibe with, we’ve got you.',
      popupText2: "Take a look at the menu—everything from our Trio Smash to those thick Lotus Loaded shakes is a total mood. If you can't decide, just hit us up!",
      letsSmash: "Let's Smash!",
    }
  },
  ar: {
    categories: {
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
        description: 'خبز باجيت فرنسي، شريحة لحم بقري، لحم بقري روست، صوص الخردل، مخلل، صوص إس بي',
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
      'orange': { name: 'برتقال' },
    },
    ui: {
      addOn: 'إضافة',
      softDrinksFriesLine1: 'مشروب غازي',
      softDrinksFriesLine2: 'وبطاطس',
      aed: 'درهم',
      backHome: 'الرئيسية',
      getInTouch: 'تواصل معنا',
      socialEnergy: 'حساباتنا',
      location: 'رأس الخيمة',
      // Welcome popup
      heyWelcome: 'أهلاً بك في سماش بي! 🍔✨',
      popupText1: 'سعداء بزيارتك! سواء كنت تتضور جوعاً للحصول على برجر ضخم ومميز أو تبحث عن موهيتو بارد ومنعش لتروق به، فخيارك عندنا.',
      popupText2: 'ألقِ نظرة على قائمتنا الرهيبة—كل شيء من التريو سماش المليء بالنكهة إلى اللوتس لودد شيك الغني هو مزاج بحد ذاته. إذا كنت محتاراً، كلمنا فوراً!',
      letsSmash: 'ابدأ الطلب!',
    }
  }
};

const Menu: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    document.title = language === 'ar' ? "قائمة الطعام | سماش بي" : "Menu | Smash B - Next Level Burgers";
    const hasSeenPopup = localStorage.getItem('smashb_welcome_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000); // Show after 1s
      return () => clearTimeout(timer);
    }
  }, [language]);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('smashb_welcome_popup_seen', 'true');
  };

  return (
    <div className="min-h-screen bg-smash-brown text-smash-cream flex flex-col font-description">
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-smash-brown/80 backdrop-blur-sm shadow-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              className="relative w-full max-w-lg bg-smash-cream text-smash-brown rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-smash-red overflow-hidden"
            >
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <img src="/SMASHBlogo-19.svg" alt="" className="w-32 h-32 rotate-12" />
              </div>

              <button 
                onClick={closePopup}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-smash-brown/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-smash-red" />
              </button>

              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className={`text-4xl md:text-5xl text-smash-red leading-none mb-2 ${
                    language === 'ar' ? 'font-arabic-heading' : 'font-primary uppercase italic tracking-tighter'
                  }`}>
                    {MENU_LANGUAGES[language].ui.heyWelcome}
                  </h3>
                </div>

                <div className={`space-y-4 text-lg md:text-xl leading-relaxed text-smash-brown/90 ${
                  language === 'ar' ? 'font-arabic-desc' : 'font-description'
                }`}>
                  <p>
                    {MENU_LANGUAGES[language].ui.popupText1}
                  </p>
                  <p>
                    {MENU_LANGUAGES[language].ui.popupText2}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closePopup}
                  className={`w-full py-4 bg-smash-red text-white text-xl rounded-full shadow-lg hover:shadow-smash-red/40 transition-all border-b-4 border-black/20 ${
                    language === 'ar' ? 'font-arabic-heading' : 'font-primary uppercase italic tracking-widest'
                  }`}
                >
                  {MENU_LANGUAGES[language].ui.letsSmash}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className="p-4 md:p-6 flex justify-between items-center z-50 sticky top-0 bg-smash-brown/90 backdrop-blur-md border-b border-smash-red/20" dir="ltr">
        <Link to="/" className="group">
          <img src="/SMASHBlogo-19.svg" alt="Smash B Logo" className="h-10 md:h-14 group-hover:scale-110 transition-transform" />
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Toggle Switch */}
          <div className="flex items-center bg-[#2d1a18] p-1 rounded-full border border-smash-red/25 shadow-lg select-none">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-full font-primary text-[10px] md:text-xs tracking-wider transition-all duration-300 ${
                language === 'en'
                  ? 'bg-smash-red text-white shadow-md font-bold'
                  : 'text-smash-cream/50 hover:text-smash-cream'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-3 py-1 md:px-3.5 md:py-1.5 rounded-full font-sans text-[10px] md:text-xs font-bold transition-all duration-300 ${
                language === 'ar'
                  ? 'bg-smash-red text-white shadow-md'
                  : 'text-smash-cream/50 hover:text-smash-cream'
              }`}
            >
              ع
            </button>
          </div>
          <Link to="/" className="font-primary text-[10px] md:text-xs uppercase tracking-widest border-2 border-smash-red px-4 md:px-6 py-2 rounded-full hover:bg-smash-red transition-all">
            {MENU_LANGUAGES[language].ui.backHome}
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-20 pb-0 flex flex-col items-center justify-center z-20" dir="ltr">
        <div className="absolute inset-0 opacity-20 bg-retro-grid pointer-events-none overflow-hidden"></div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center translate-y-12 md:translate-y-16"
        >
          <BrandCharacterMenu 
            className="w-72 md:w-[500px] select-none hover:scale-105 transition-transform duration-500 drop-shadow-2xl" 
          />
        </motion.div>
      </header>

      {/* Menu Categories - PDF Styled Card */}
      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-6 py-6 w-full relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          className="bg-smash-cream rounded-[40px] md:rounded-[80px] p-8 md:p-16 shadow-2xl border-2 border-smash-brown/10 relative"
        >
          {/* Subtle Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] rounded-[40px] md:rounded-[80px] overflow-hidden"></div>

          {/* Add-on Sticker */}
          <motion.div 
            initial={{ scale: 0, rotate: language === 'ar' ? 10 : -10 }}
            animate={{ scale: 1, rotate: language === 'ar' ? 10 : -10 }}
            transition={{ delay: 0.8, type: 'spring' }}
            dir="ltr"
            className={`absolute -top-8 ${language === 'ar' ? '-left-4 md:-left-8' : '-right-4 md:-right-8'} md:top-[-64px] z-20 pointer-events-none select-none`}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-[#96b8a8] drop-shadow-lg">
                <path d="M50 0 L60 10 L75 5 L80 20 L95 25 L90 40 L100 50 L90 60 L95 75 L80 80 L75 95 L60 90 L50 100 L40 90 L25 95 L20 80 L5 75 L10 60 L0 50 L10 40 L5 25 L20 20 L25 5 L40 10 Z" />
              </svg>
              <div className="relative font-primary leading-none text-white p-2">
                <div className="text-[10px] md:text-sm uppercase mb-0.5">
                  {MENU_LANGUAGES[language].ui.addOn}
                </div>
                <div className="text-[11px] md:text-base uppercase mb-0.5">
                  {MENU_LANGUAGES[language].ui.softDrinksFriesLine1}
                </div>
                <div className="text-[11px] md:text-base uppercase flex items-center justify-center gap-1">
                  <span>{MENU_LANGUAGES[language].ui.softDrinksFriesLine2}</span>
                </div>
                <div className="text-2xl md:text-4xl italic mt-1 drop-shadow-sm flex items-center justify-center gap-0.5">
                  6<span className="text-xs md:text-lg not-italic">{MENU_LANGUAGES[language].ui.aed}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {Object.entries(MENU_DATA).map(([category, items], catIndex) => (
            <section key={category} className="mb-16 last:mb-0">
              <div className="mb-8">
                <h2 className={`text-4xl md:text-6xl text-smash-brown ${
                  language === 'ar' ? 'font-arabic-heading' : 'font-primary uppercase tracking-tighter'
                }`}>
                  {MENU_LANGUAGES[language].categories[category]}
                </h2>
              </div>

              <div className="space-y-8">
                {items.map((item, index) => {
                  const itemTranslation = MENU_LANGUAGES[language].items[item.name] || {};
                  const displayName = itemTranslation.name || item.name;
                  const displayDescription = itemTranslation.description || item.description;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start py-6 border-b border-smash-brown/10 last:border-b-0"
                    >
                      {item.image && (
                        <div className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square overflow-hidden shrink-0 bg-transparent flex items-center justify-center relative">
                          <img 
                            src={item.image} 
                            alt={displayName} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col justify-center min-w-0 w-full">
                        <div className="flex justify-between items-baseline gap-2">
                          <h3 className={`text-2xl md:text-3xl text-smash-red truncate ${
                            language === 'ar' ? 'font-arabic-heading' : 'font-primary uppercase tracking-tight'
                          }`}>
                            {displayName}
                          </h3>
                          <div className="flex-1 border-b-2 border-dotted border-smash-brown/20 mx-2 hidden md:block"></div>
                          <span className="font-primary text-2xl md:text-3xl text-smash-brown shrink-0 font-bold whitespace-nowrap">
                            {item.price} <span className={`text-xs md:text-sm uppercase tracking-wider font-normal ${
                              language === 'ar' ? 'font-arabic-heading text-smash-brown/60' : 'font-description text-smash-brown/50'
                            }`}>{MENU_LANGUAGES[language].ui.aed}</span>
                          </span>
                        </div>
                        {displayDescription && (
                          <p className={`text-sm md:text-lg text-smash-brown/70 mt-2 leading-relaxed ${
                            language === 'ar' ? 'font-arabic-desc' : 'font-sans font-medium'
                          }`}>
                            {displayDescription}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          ))}
        </motion.div>
      </main>

      {/* Contact & Socials Footer Section */}
      <section className="bg-white/5 border-t-4 border-smash-red mt-20 pt-16 pb-20 px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className={`text-4xl md:text-5xl text-smash-cream ${
              language === 'ar' ? 'font-arabic-heading' : 'font-primary uppercase italic tracking-tighter'
            }`}>
              {MENU_LANGUAGES[language].ui.getInTouch}
            </h2>
            <div className="space-y-4">
              <a href="tel:+971563535819" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-smash-red flex items-center justify-center group-hover:bg-smash-red transition-all">
                  <Phone className="w-5 h-5 text-smash-red group-hover:text-white" />
                </div>
                <span className="font-primary text-lg md:text-xl tracking-wider select-all">+971 56 353 5819</span>
              </a>
              <Link to="/location" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-smash-red flex items-center justify-center group-hover:bg-smash-red transition-all">
                  <MapPin className="w-5 h-5 text-smash-red group-hover:text-white" />
                </div>
                <span className={`text-lg md:text-xl tracking-wider ${
                  language === 'ar' ? 'font-arabic-heading' : 'font-primary uppercase'
                }`}>{MENU_LANGUAGES[language].ui.location}</span>
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className={`text-4xl md:text-5xl text-smash-cream ${
              language === 'ar' ? 'font-arabic-heading' : 'font-primary uppercase italic tracking-tighter'
            } ${language === 'ar' ? 'lg:text-left' : 'lg:text-right'}`}>
              {MENU_LANGUAGES[language].ui.socialEnergy}
            </h2>
            <div className={`flex flex-wrap gap-4 ${language === 'ar' ? 'lg:justify-start' : 'lg:justify-end'}`}>
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/smashb.uae/' },
                { name: 'Facebook', url: 'https://www.facebook.com/smashb.uae/' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@smashbuae' },
                { name: 'Snapchat', url: 'https://snapchat.com/t/d5zYuanj' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-transparent border-2 border-white/20 rounded-full flex items-center gap-3 hover:border-smash-red hover:bg-smash-red transition-all uppercase font-primary text-xs tracking-widest"
                >
                  <ExternalLink className="w-4 h-4 opacity-50" />
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
