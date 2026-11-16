import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Sparkles,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import BrandCharacterMenu from '../components/BrandCharacterMenu';
import OptimizedMenuImage from '../components/OptimizedMenuImage';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../LanguageContext';
import {
  appendUtmParams,
  trackTalabatClick,
  trackWhatsAppClick,
  trackCallClick,
} from '../analytics';
import { useSmashShapes } from '../utils/smashShapes';
import { MENU_DATA, MENU_LANGUAGES, MENU_CATEGORY_ANCHORS } from '../data/menuData';
import { BUSINESS_INFO, getPairedPath } from '../data/siteConfig';

const Menu: React.FC = () => {
  const { language, dir, saveLanguagePreference } = useLanguage();
  const location = useLocation();
  const isAr = language === 'ar';

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

  const homePath = isAr ? '/ar' : '/';
  const menuPath = isAr ? '/ar/menu' : '/menu';
  const storyPath = isAr ? '/ar/our-story' : '/our-story';
  const locationPath = isAr ? '/ar/location' : '/location';
  const switchPath = getPairedPath(location.pathname, isAr ? 'en' : 'ar');

  return (
    <div
      className="min-h-screen bg-[#EBE5D0] text-[#432724] font-body selection:bg-[#FF1C00] selection:text-[#EBE5D0]"
      dir={dir}
    >
      <SeoHead pathname={location.pathname} />

      {/* TOP NOTIFICATION RIBBON */}
      <div className="w-full bg-[#FF1C00] text-[#EBE5D0] py-2 px-4 text-center font-bold text-xs md:text-sm tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 shrink-0 text-[#A5C7A5]" />
        <span>
          {isAr
            ? 'برجر سماش طازج من 12 درهم • حلال 100% • مفتوح يومياً من 1 ظهراً حتى منتصف الليل'
            : 'Fresh smash burgers from AED 12 • 100% Halal • Open daily 1 PM – 12 AM'}
        </span>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#EBE5D0]/95 backdrop-blur-sm border-b border-[#432724]/20 px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <Link to={homePath} className="flex items-center gap-2 group shrink-0">
            <img
              src="/logos/smashb-logo-4.svg"
              alt="Smash B Logo"
              width={48}
              height={48}
              className="h-11 md:h-12 w-auto object-contain drop-shadow-[0_1.5px_0_rgba(67,39,36,0.24)] transition-transform group-hover:scale-105"
            />
          </Link>

          <nav aria-label="Primary Navigation" className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
            <Link
              to={homePath}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide sm:tracking-wider px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] transition-colors whitespace-nowrap tap-target"
            >
              {MENU_LANGUAGES[language].ui.backHome}
            </Link>

            <Link
              to={storyPath}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide sm:tracking-wider px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] transition-colors whitespace-nowrap tap-target"
            >
              {MENU_LANGUAGES[language].ui.ourStory}
            </Link>

            <Link
              to={locationPath}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="hidden sm:inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide sm:tracking-wider px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] transition-colors whitespace-nowrap tap-target"
            >
              {MENU_LANGUAGES[language].ui.location}
            </Link>

            <Link
              to={switchPath}
              onClick={() => saveLanguagePreference(isAr ? 'en' : 'ar')}
              aria-label="Switch Language"
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="text-[11px] sm:text-xs md:text-sm font-bold uppercase px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] transition-all whitespace-nowrap tap-target flex items-center justify-center gap-1"
            >
              <span>{isAr ? 'English' : 'العربية'}</span>
            </Link>

            <a
              href={appendUtmParams(BUSINESS_INFO.talabatUrl)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTalabatClick('menu_header')}
              data-smash-shape="btn"
              data-smash-stroke="none"
              className="hidden md:inline-flex items-center gap-2 bg-[#FF1C00] text-[#EBE5D0] font-bold text-xs uppercase px-6 py-2.5 smash-btn tap-target"
            >
              <span>{isAr ? 'اطلب عبر طلبات' : 'Order on Talabat'}</span>
            </a>
          </nav>
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
                  className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-black uppercase tracking-wider bg-[#FF1C00] text-[#EBE5D0] smash-btn"
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
                  href={appendUtmParams(BUSINESS_INFO.talabatUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTalabatClick('menu_hero')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#FF1C00] text-[#EBE5D0] font-bold text-sm md:text-base uppercase px-7 py-3.5 flex items-center justify-center gap-2 tap-target"
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
                  href={appendUtmParams(BUSINESS_INFO.whatsappUrl)}
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

            {/* Right Column: Official Menu Character */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <BrandCharacterMenu className="w-72 sm:w-88 lg:w-full max-w-[390px] h-auto select-none drop-shadow-[0_8px_0_rgba(67,39,36,0.18)]" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER & MENU ITEMS */}
      <section className="py-10 md:py-14 px-4 md:px-8 bg-[#EBE5D0] border-b border-[#432724]/15">
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
                      ? 'bg-[#FF1C00] text-[#EBE5D0]'
                      : 'bg-[#EBE5D0] text-[#432724]'
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
                  className="w-10 h-10 smash-box bg-[#FF1C00] text-[#EBE5D0] flex items-center justify-center font-primary text-sm shrink-0"
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
                className="bg-[#FF1C00] text-[#EBE5D0] smash-btn px-4 py-1.5 font-primary text-sm uppercase shrink-0"
              >
                + {isAr ? '6 درهم' : 'AED 6'}
              </span>
            </div>
          )}

          {/* Category Sections with Anchors (#burgers, #loaded-fries, etc.) */}
          <div className="space-y-14">
            {Object.entries(MENU_DATA)
              .filter(([category]) => activeCategory === 'ALL' || activeCategory === category)
              .map(([category, items]) => {
                const sectionId = MENU_CATEGORY_ANCHORS[category] || category.toLowerCase().replace(/\s+/g, '-');
                return (
                  <div key={category} id={sectionId} className="space-y-6 scroll-mt-24">
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
                            key={item.id}
                            id={item.id}
                            data-smash-shape="card"
                            data-smash-stroke="card"
                            className="smash-box bg-[#EBE5D0] p-6 sm:p-7 flex flex-col justify-between transition-transform hover:-translate-y-1 scroll-mt-24"
                          >
                            <div>
                              <div
                                data-smash-shape="photo"
                                data-smash-stroke="none"
                                className="relative w-full aspect-4/3 smash-box bg-[#A5C7A5]/25 flex items-center justify-center p-4 mb-4"
                              >
                                <OptimizedMenuImage
                                  src={item.image}
                                  alt={`${displayName} - Smash B Ras Al Khaimah`}
                                  width={item.width}
                                  height={item.height}
                                  className={`object-contain transform transition-transform hover:scale-105 relative z-10 ${
                                    item.name === 'Havana' ? 'w-[82%] h-[82%]' : 'w-full h-full'
                                  }`}
                                />
                                {badgeText && (
                                  <span
                                    data-smash-shape="badge"
                                    data-smash-stroke="none"
                                    className="absolute top-4 left-4 sm:top-5 sm:left-5 z-30 bg-[#FF1C00] text-[#EBE5D0] font-bold text-[10px] uppercase px-3.5 py-1 smash-btn"
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
                              href={appendUtmParams(BUSINESS_INFO.talabatUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackTalabatClick(`menu_${slug}`)}
                              data-smash-shape="btn"
                              data-smash-stroke="none"
                              className={`smash-btn w-full bg-[#FF1C00] text-[#EBE5D0] text-xs font-bold uppercase py-3 px-5 flex items-center justify-center gap-2 tap-target ${
                                !displayDescription ? 'mt-3' : ''
                              }`}
                            >
                              <img
                                src="/icons8-talabat.svg"
                                alt="Talabat"
                                width={16}
                                height={16}
                                loading="lazy"
                                decoding="async"
                                className="w-4 h-4 object-contain rounded"
                              />
                              <span>{isAr ? 'اطلب الآن عبر طلبات' : 'Order on Talabat'}</span>
                            </a>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#EBE5D0] text-[#432724] pt-12 pb-24 md:pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b-2 border-[#432724] pb-8">
            <div className="md:col-span-5 space-y-3">
              <img
                src="/logos/smashb-logo-1.svg"
                alt="Smash B - Ras Al Khaimah"
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
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
                <strong className="block text-[#432724]">
                  {isAr ? 'سماش بي (Smash B)' : 'Smash B'}
                </strong>
                {isAr
                  ? 'بالقرب من الجامعة الأمريكية في رأس الخيمة (AURAK)، رأس الخيمة، الإمارات العربية المتحدة'
                  : 'Near American University of Ras Al Khaimah (AURAK), Ras Al Khaimah, United Arab Emirates'}
              </p>
              <p className="text-xs text-[#432724]/85 font-mono pt-1">
                {isAr ? 'الهاتف / واتساب:' : 'Phone / WhatsApp:'}{' '}
                <a
                  href={BUSINESS_INFO.telephoneHref}
                  onClick={() => trackCallClick('menu_footer')}
                  dir="ltr"
                  className="inline-block underline font-bold text-[#FF1C00]"
                >
                  {BUSINESS_INFO.telephoneDisplay}
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
                  href={BUSINESS_INFO.profiles.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase hover:text-[#FF1C00] transition-colors inline-flex items-center gap-1.5 leading-relaxed"
                >
                  <span>Instagram @smashb.uae</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={BUSINESS_INFO.profiles.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase hover:text-[#FF1C00] transition-colors inline-flex items-center gap-1.5 leading-relaxed"
                >
                  <span>TikTok @smashbuae</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={BUSINESS_INFO.profiles.snapchat}
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
                ? '© 2026 سماش بي. جميع الحقوق محفوظة.'
                : '© 2026 Smash B. All rights reserved.'}
            </p>
            <div className="flex items-center gap-4">
              <Link to={homePath} className="hover:underline">
                {isAr ? 'الرئيسية' : 'Home'}
              </Link>
              <Link to={menuPath} className="hover:underline">
                {isAr ? 'القائمة' : 'Menu'}
              </Link>
              <Link to={storyPath} className="hover:underline">
                {isAr ? 'قصتنا' : 'Our Story'}
              </Link>
              <Link to={locationPath} className="hover:underline">
                {isAr ? 'الموقع' : 'Location'}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY ORDER BAR ON MOBILE */}
      <aside
        aria-label="Quick Order Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#EBE5D0]/98 backdrop-blur border-t border-[#432724]/25 px-3 py-2.5 shadow-[0_-4px_12px_rgba(67,39,36,0.12)] flex items-center gap-2"
      >
        <a
          href={appendUtmParams(BUSINESS_INFO.talabatUrl)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTalabatClick('menu_sticky_mobile')}
          data-smash-shape="btn"
          data-smash-stroke="none"
          className="flex-[1.35] smash-btn bg-[#FF1C00] text-[#EBE5D0] font-bold text-[11px] sm:text-xs uppercase py-3 px-4 flex items-center justify-center gap-1.5 whitespace-nowrap tap-target"
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
          href={appendUtmParams(BUSINESS_INFO.whatsappUrl)}
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
          href={BUSINESS_INFO.telephoneHref}
          onClick={() => trackCallClick('menu_sticky_mobile')}
          data-smash-shape="square"
          data-smash-stroke="thin"
          className="w-11 h-11 smash-box bg-[#EBE5D0] text-[#FF1C00] flex items-center justify-center shrink-0 tap-target"
          aria-label="Call Smash B"
        >
          <Phone className="w-4 h-4 text-[#FF1C00]" />
        </a>
      </aside>
    </div>
  );
};

export default Menu;
