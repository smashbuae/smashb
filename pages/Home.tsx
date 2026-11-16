import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ChevronDown,
  ExternalLink,
  Flame,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Navigation,
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import {
  appendUtmParams,
  trackTalabatClick,
  trackWhatsAppClick,
  trackCallClick,
  trackDirectionsClick,
  trackReviewClick,
} from '../analytics';
import { useSmashShapes } from '../utils/smashShapes';
import { BEST_SELLERS } from '../data/menuData';
import { BUSINESS_INFO, FAQS, getPairedPath } from '../data/siteConfig';
import OptimizedMenuImage from '../components/OptimizedMenuImage';
import SeoHead from '../components/SeoHead';

export const Home: React.FC = () => {
  const { language, dir, saveLanguagePreference } = useLanguage();
  const location = useLocation();
  const isAr = language === 'ar';

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useSmashShapes([language, openFaqIndex]);

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

      {/* TOP NOTIFICATION / BRAND RIBBON */}
      <div className="w-full bg-[#FF1C00] text-[#EBE5D0] py-2 px-4 text-center font-bold text-xs md:text-sm tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 shrink-0 text-[#A5C7A5]" />
        <span>
          {isAr
            ? 'برجر سماش طازج من 12 درهم • بالقرب من AURAK رأس الخيمة • مفتوح يومياً من 1 ظهراً حتى منتصف الليل'
            : 'Fresh smash burgers from AED 12 • Near AURAK, Ras Al Khaimah • Open daily 1 PM – 12 AM'}
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
              to={menuPath}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide sm:tracking-wider px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] transition-colors whitespace-nowrap tap-target"
            >
              {isAr ? 'قائمة الطعام' : 'View Menu'}
            </Link>

            <Link
              to={storyPath}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide sm:tracking-wider px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] transition-colors whitespace-nowrap tap-target"
            >
              {isAr ? 'قصتنا' : 'Our Story'}
            </Link>

            <Link
              to={locationPath}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="hidden sm:inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide sm:tracking-wider px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] transition-colors whitespace-nowrap tap-target"
            >
              {isAr ? 'الموقع' : 'Location'}
            </Link>

            {/* Language Switcher */}
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
              onClick={() => trackTalabatClick('header')}
              data-smash-shape="btn"
              data-smash-stroke="none"
              className="hidden md:inline-flex items-center gap-2 bg-[#FF1C00] text-[#EBE5D0] font-bold text-xs uppercase px-6 py-2.5 smash-btn tap-target"
            >
              <span>{isAr ? 'اطلب عبر طلبات' : 'Order on Talabat'}</span>
            </a>
          </nav>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-16 px-4 md:px-8 border-b border-[#432724]/15">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-start">
              {/* Badges line: Price Tag & Location */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
                <span
                  data-smash-shape="badge"
                  data-smash-stroke="none"
                  className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-black uppercase tracking-wider bg-[#FF1C00] text-[#EBE5D0] smash-btn"
                >
                  {isAr ? 'من 12 درهم فقط' : 'From AED 12'}
                </span>

                <Link
                  to={locationPath}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-[#432724] hover:text-[#FF1C00] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FF1C00]" />
                  <span>{isAr ? 'قرب AURAK، رأس الخيمة' : 'Near AURAK, Ras Al Khaimah'}</span>
                </Link>
              </div>

              {/* Exact H1 containing 'smash burgers' + 'Ras Al Khaimah' */}
              <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight uppercase text-[#432724]">
                {isAr ? (
                  <>
                    أشهى <span className="text-[#FF1C00]">برجر سماش</span> في رأس الخيمة
                  </>
                ) : (
                  <>
                    <span className="text-[#FF1C00]">Smash Burgers</span> in Ras Al Khaimah
                  </>
                )}
              </h1>

              {/* Slogan as clean brand line */}
              <p className="font-bold text-sm md:text-base tracking-wide uppercase text-[#FF1C00]">
                {isAr ? 'ابقَ في جو السماش.' : '"Stay smashin\'."'}
              </p>

              {/* Concise AI & search quotation sentence */}
              <p className="text-sm md:text-base leading-relaxed text-[#432724]/90 max-w-xl mx-auto lg:mx-0">
                {isAr
                  ? 'سماش بي هو مطعم برجر سماش بجوار الجامعة الأمريكية في رأس الخيمة (AURAK)، يقدم لحم بقري طازج مضغوط على الصاج الساخن مع حواف مقرمشة وخبز البطاطس الطري، يومياً من 1 ظهراً حتى منتصف الليل.'
                  : 'Smash B is a smash burger shop near AURAK in Ras Al Khaimah, open daily from 1 PM to midnight serving razor-crisp seared beef patties, toasted potato buns, loaded fries, and refreshing drinks.'}
              </p>

              {/* ACTION BUTTONS (All visible without scrolling on mobile) */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
                {/* 1. Order on Talabat */}
                <a
                  href={appendUtmParams(BUSINESS_INFO.talabatUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTalabatClick('hero_primary')}
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

                {/* 2. WhatsApp Order */}
                <a
                  href={appendUtmParams(BUSINESS_INFO.whatsappUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('hero_whatsapp')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-sm md:text-base uppercase px-7 py-3.5 flex items-center justify-center gap-2 tap-target"
                >
                  <MessageCircle className="w-5 h-5 text-[#432724]" />
                  <span>{isAr ? 'طلب عبر واتساب' : 'WhatsApp Order'}</span>
                </a>
              </div>

              {/* Service tags */}
              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-bold uppercase text-[#432724]/75 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1C00]" />{' '}
                  {isAr ? 'تناول بالمطعم' : 'Dine-in'}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1C00]" />{' '}
                  {isAr ? 'استلام تيك أواي' : 'Takeaway'}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1C00]" />{' '}
                  {isAr ? 'توصيل طلبات' : 'Talabat Delivery'}
                </span>
              </div>
            </div>

            {/* Right Column: Official SB Character Illustration (Open Background, Scaled Up) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <img
                src="/brandcharacter/smashing.svg"
                alt="Smash B Character - Smashed Burger Specialist"
                width={380}
                height={395}
                className="w-72 sm:w-88 lg:w-full max-w-[380px] h-auto object-contain drop-shadow-[0_8px_0_rgba(67,39,36,0.18)]"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. BEST SELLERS SECTION */}
      <section
        id="best-sellers"
        className="py-12 md:py-16 px-4 md:px-8 bg-[#EBE5D0] border-b border-[#432724]/15"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#432724]/20 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#FF1C00] text-xs font-bold uppercase tracking-wider mb-1.5">
                <Flame className="w-3.5 h-3.5 text-[#FF1C00]" />
                {isAr ? 'الأكثر طلباً يومياً' : 'Customer Favorites'}
              </div>
              <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#432724]">
                {isAr ? 'أشهر وجبات سماش بي' : 'Smash B Best Sellers'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={menuPath}
                data-smash-shape="btn"
                data-smash-stroke="none"
                className="smash-btn text-xs md:text-sm font-bold uppercase px-6 py-2.5 bg-[#A5C7A5] text-[#432724] transition-all tap-target flex items-center gap-1.5"
              >
                <span>{isAr ? 'تصفح القائمة الكاملة' : 'Explore Full Menu'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BEST_SELLERS.map((item) => (
              <article
                key={item.id}
                data-smash-shape="card"
                data-smash-stroke="card"
                className="smash-box bg-[#EBE5D0] p-6 sm:p-7 flex flex-col justify-between transition-transform hover:-translate-y-1"
              >
                <div>
                  {/* Clean borderless Sage-tinted squircle backdrop */}
                  <div
                    data-smash-shape="photo"
                    data-smash-stroke="none"
                    className="relative w-full aspect-4/3 smash-box bg-[#A5C7A5]/25 flex items-center justify-center p-4 mb-4"
                  >
                    <OptimizedMenuImage
                      src={item.image}
                      alt={`${isAr ? item.nameAr : item.nameEn} - Smash B Ras Al Khaimah`}
                      width={item.width}
                      height={item.height}
                      className="w-full h-full object-contain transform transition-transform hover:scale-105 relative z-10"
                    />
                    <span
                      data-smash-shape="badge"
                      data-smash-stroke="none"
                      className="absolute top-4 left-4 sm:top-5 sm:left-5 z-30 bg-[#FF1C00] text-[#EBE5D0] font-bold text-[10px] uppercase px-3.5 py-1 smash-btn"
                    >
                      {isAr ? item.badgeAr : item.badgeEn}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-primary text-xl md:text-2xl uppercase tracking-tight text-[#432724]">
                      {isAr ? item.nameAr : item.nameEn}
                    </h3>
                    <div className="font-primary text-lg md:text-xl font-black text-[#FF1C00] shrink-0">
                      {isAr ? `${item.price} درهم` : `AED ${item.price}`}
                    </div>
                  </div>

                  {/* One-line ingredients text */}
                  <p className="text-xs md:text-sm text-[#432724]/80 leading-relaxed mb-5">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </div>

                {/* Solid borderless squircle Order Button */}
                <a
                  href={appendUtmParams(BUSINESS_INFO.talabatUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTalabatClick(`bestseller_${item.id}`)}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn w-full bg-[#FF1C00] text-[#EBE5D0] text-xs font-bold uppercase py-3 px-5 flex items-center justify-center gap-2 tap-target"
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
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY SMASH B SECTION */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-[#A5C7A5]/25 border-b border-[#432724]/15">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#FF1C00]">
              {isAr ? 'سر النكهة' : 'The Science of Smashed'}
            </span>
            <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#432724]">
              {isAr ? 'لماذا سماش بي؟' : 'Why Smash B'}
            </h2>
            <p className="text-xs md:text-sm text-[#432724]/85">
              {isAr
                ? 'ثلاثة أسرار تميز برجر سماش بي في رأس الخيمة: الصاج، الخبز، والصوص.'
                : 'Three first-hand craftsmanship points that make every bite hit different.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Point 1: The Patty Smash */}
            <div
              data-smash-shape="card"
              data-smash-stroke="card"
              className="smash-box p-6 sm:p-7 bg-[#EBE5D0] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div
                  data-smash-shape="square"
                  data-smash-stroke="none"
                  className="w-12 h-12 smash-box bg-[#FF1C00] text-[#EBE5D0] flex items-center justify-center font-primary text-xl"
                >
                  01
                </div>
                <h3 className="font-primary text-2xl uppercase tracking-tight text-[#432724]">
                  {isAr ? 'الضغط على الصاج الساخن' : 'The Patty Smash'}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-[#432724]/85">
                  {isAr
                    ? 'نضغط اللحم برقة فائقة على صاج حديدي ساخن جداً لخلق حواف مكرملة مقرمشة فائقة اللذة، مع حبس العصارة الساخنة داخل الشريحة بالكامل.'
                    : 'Smashed razor-thin onto a blistering steel flat-top grill. This creates crispy, lacy caramelized edges while locking in all the savory natural beef juices.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#432724]/15 flex items-center gap-2 text-xs font-bold text-[#FF1C00] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'كراميل مقرمش' : 'Crispy Lace Edges'}</span>
              </div>
            </div>

            {/* Point 2: The Potato Bun */}
            <div
              data-smash-shape="card"
              data-smash-stroke="card"
              className="smash-box p-6 sm:p-7 bg-[#EBE5D0] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div
                  data-smash-shape="square"
                  data-smash-stroke="none"
                  className="w-12 h-12 smash-box bg-[#A5C7A5] text-[#432724] flex items-center justify-center font-primary text-xl"
                >
                  02
                </div>
                <h3 className="font-primary text-2xl uppercase tracking-tight text-[#432724]">
                  {isAr ? 'خبز البطاطس الطري' : 'The Potato Bun'}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-[#432724]/85">
                  {isAr
                    ? 'خبز بطاطس ذهبي فائق الطراوة محمص خفيفاً على الصاج، صُمم خصيصاً ليتحمل ذوبان الجبن والعصارة دون أن يتفكك حتى آخر لقمة.'
                    : 'Pillowy, golden potato buns toasted fresh with butter. Light and soft, engineered to hold every ounce of melted cheese and sauce without collapsing.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#432724]/15 flex items-center gap-2 text-xs font-bold text-[#432724] uppercase">
                <Sparkles className="w-4 h-4 text-[#FF1C00]" />
                <span>{isAr ? 'طراوة فائقة' : 'Pillowy & Toasted'}</span>
              </div>
            </div>

            {/* Point 3: SB Sauce */}
            <div
              data-smash-shape="card"
              data-smash-stroke="card"
              className="smash-box p-6 sm:p-7 bg-[#EBE5D0] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div
                  data-smash-shape="square"
                  data-smash-stroke="none"
                  className="w-12 h-12 smash-box bg-[#FF1C00] text-[#EBE5D0] flex items-center justify-center font-primary text-xl"
                >
                  03
                </div>
                <h3 className="font-primary text-2xl uppercase tracking-tight text-[#432724]">
                  {isAr ? 'خلطة صوص إس بي' : 'Signature SB Sauce'}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-[#432724]/85">
                  {isAr
                    ? 'خلطتنا السرية المبتكرة التي تجمع بين القوام الكريمي الغني، ولمسة الحموضة المنعشة، والنكهة الغنية التي تبرز طعم اللحم والجبن.'
                    : 'Our signature in-house recipe combining savory umami richness, tangy pickle brine crunch, and a subtle warm spice that ties the burger together.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#432724]/15 flex items-center gap-2 text-xs font-bold text-[#FF1C00] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'خلطة سرية' : 'Secret In-House Blend'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FIND US & KEY FACTS SECTION */}
      <section
        id="find-us"
        className="py-12 md:py-16 px-4 md:px-8 bg-[#EBE5D0] border-b border-[#432724]/15"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block text-[#FF1C00] text-xs font-black uppercase tracking-widest">
                {isAr ? 'زورونا في رأس الخيمة' : 'Visit Our Shop'}
              </div>

              <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#432724]">
                {isAr ? 'موقعنا ومعلومات الاتصال' : 'Find Us near AURAK'}
              </h2>

              <p className="text-xs md:text-sm text-[#432724]/85 leading-relaxed">
                {isAr
                  ? 'يقع فرعنا الحالي في رأس الخيمة بالقرب من الجامعة الأمريكية في رأس الخيمة (AURAK)، ونستعد لافتتاح فرعنا الثاني في الظيت قريباً.'
                  : 'Our active outlet is conveniently located near the American University of Ras Al Khaimah (AURAK) in Ras Al Khaimah, UAE, with our Al Dhait branch opening soon.'}
              </p>

              <div className="space-y-4">
                {/* Location */}
                <div
                  data-smash-shape="wide"
                  data-smash-stroke="thin"
                  className="flex items-start gap-3 p-4 sm:p-5 smash-wide-box bg-[#EBE5D0]"
                >
                  <MapPin className="w-5 h-5 text-[#FF1C00] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm uppercase text-[#432724]">
                      {isAr ? 'العنوان' : 'Address'}
                    </h4>
                    <p className="text-xs text-[#432724]/85">
                      {isAr
                        ? 'بالقرب من الجامعة الأمريكية في رأس الخيمة (AURAK)، رأس الخيمة، الإمارات العربية المتحدة'
                        : 'Near American University of Ras Al Khaimah (AURAK), Ras Al Khaimah, United Arab Emirates'}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div
                  data-smash-shape="wide"
                  data-smash-stroke="thin"
                  className="flex items-start gap-3 p-4 sm:p-5 smash-wide-box bg-[#EBE5D0]"
                >
                  <Clock className="w-5 h-5 text-[#FF1C00] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm uppercase text-[#432724]">
                      {isAr ? 'أوقات العمل' : 'Operating Hours'}
                    </h4>
                    <p className="text-xs text-[#432724]/85">
                      {isAr
                        ? 'يومياً: 1:00 ظهراً – 12:00 منتصف الليل'
                        : 'Daily: 1:00 PM – 12:00 AM (Midnight)'}
                    </p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div
                  data-smash-shape="wide"
                  data-smash-stroke="thin"
                  className="flex items-start gap-3 p-4 sm:p-5 smash-wide-box bg-[#EBE5D0]"
                >
                  <Phone className="w-5 h-5 text-[#FF1C00] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm uppercase text-[#432724]">
                      {isAr ? 'الهاتف وواتساب' : 'Phone & WhatsApp'}
                    </h4>
                    <p className="text-xs text-[#432724]/85 font-mono">
                      <span dir="ltr" className="inline-block">
                        {BUSINESS_INFO.telephoneDisplay}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={appendUtmParams(BUSINESS_INFO.mapsShortUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDirectionsClick('find_us_section')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#FF1C00] text-[#EBE5D0] font-bold text-xs md:text-sm uppercase px-6 py-3.5 flex items-center gap-2 tap-target"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{isAr ? 'افتح في خرائط Google' : 'Open in Google Maps'}</span>
                </a>

                <a
                  href={BUSINESS_INFO.telephoneHref}
                  onClick={() => trackCallClick('find_us_section')}
                  data-smash-shape="btn"
                  data-smash-stroke="thin"
                  className="smash-btn bg-[#EBE5D0] text-[#432724] font-bold text-xs md:text-sm uppercase px-6 py-3.5 flex items-center gap-2 tap-target"
                >
                  <Phone className="w-4 h-4 text-[#FF1C00]" />
                  <span>
                    {isAr ? 'اتصل بنا الآن' : `Call ${BUSINESS_INFO.telephoneDisplay}`}
                  </span>
                </a>

                <Link
                  to={locationPath}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-xs md:text-sm uppercase px-6 py-3.5 flex items-center gap-2 tap-target"
                >
                  <MapPin className="w-4 h-4 text-[#432724]" />
                  <span>{isAr ? 'صفحة الموقع والخريطة' : 'Location & Map'}</span>
                </Link>
              </div>
            </div>

            {/* Visual Location Card + Concise Plain-Text Key Facts Block (GEO) */}
            <div className="lg:col-span-6 flex flex-col items-center gap-6">
              <div
                data-smash-shape="card"
                data-smash-stroke="card"
                className="relative w-full max-w-md smash-box p-7 smash-pattern-red-cream flex flex-col items-center text-center"
              >
                <div
                  data-smash-shape="photo"
                  data-smash-stroke="thin"
                  className="w-full bg-[#EBE5D0] smash-box p-6 flex flex-col items-center"
                >
                  <img
                    src="/brandcharacter/SMASH_B Social-24.svg"
                    alt="Smash B Location Character"
                    width={180}
                    height={180}
                    className="w-40 h-auto object-contain my-2"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="font-primary text-xl uppercase tracking-tight text-[#432724] mt-2">
                    {isAr ? 'بالقرب من جامعة AURAK' : 'Near AURAK Campus'}
                  </span>
                  <span className="text-xs text-[#432724]/75 mt-1">
                    Ras Al Khaimah • United Arab Emirates
                  </span>
                </div>
              </div>

              {/* Plain-Text Key Facts Box for GEO / AI Answer Engines */}
              <div
                data-smash-shape="card"
                data-smash-stroke="card"
                className="w-full max-w-md smash-box bg-[#A5C7A5]/25 p-6 space-y-3"
              >
                <h3 className="font-primary text-lg uppercase tracking-tight text-[#432724]">
                  {isAr ? 'حقائق سريعة عن سماش بي' : 'Smash B Key Facts'}
                </h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#432724]">
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">
                      {isAr ? 'الاسم' : 'Name'}
                    </dt>
                    <dd className="font-semibold">
                      {isAr ? 'سماش بي (Smash B)' : 'Smash B'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">
                      {isAr ? 'المطبخ' : 'Cuisine'}
                    </dt>
                    <dd className="font-semibold">
                      {isAr ? 'برجر سماش، لودد فرايز' : 'Smash Burgers & Fries'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">
                      {isAr ? 'المعلم القريب' : 'Landmark'}
                    </dt>
                    <dd className="font-semibold">
                      {isAr ? 'قرب AURAK، رأس الخيمة' : 'Near AURAK, RAK'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">
                      {isAr ? 'ساعات العمل' : 'Hours'}
                    </dt>
                    <dd className="font-semibold">
                      {isAr ? 'يومياً 1 ظهراً – 12 ليلاً' : 'Daily 1 PM – 12 AM'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">
                      {isAr ? 'الأسعار' : 'Pricing'}
                    </dt>
                    <dd className="font-semibold">
                      {isAr ? 'البرجر من 12 درهم' : 'Burgers from AED 12'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">
                      {isAr ? 'الحلال والخدمة' : 'Halal & Service'}
                    </dt>
                    <dd className="font-semibold">
                      {isAr
                        ? 'حلال 100% • صالة، استلام، توصيل'
                        : '100% Halal • Dine-in, Takeaway, Delivery'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REVIEWS SECTION (Real Google Reviews only; No invented quotes) */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-[#EBE5D0] border-b border-[#432724]/15">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 text-[#FF1C00] text-xs font-black uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-[#FF1C00] text-[#FF1C00]" />
            {isAr ? 'تقييمات Google الرسمية' : 'Verified Google Reviews'}
          </div>

          <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#432724]">
            {isAr ? 'آراء زبائننا في رأس الخيمة' : 'Google Reviews'}
          </h2>

          <div className="flex justify-center items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#FF1C00] text-[#FF1C00]" />
            ))}
          </div>

          <p className="text-xs md:text-sm text-[#432724]/85 max-w-xl mx-auto leading-relaxed">
            {isAr
              ? 'نعتمد على التقييمات الحقيقية الموثقة لزبائننا على خرائط Google. شاركنا تجربتك وساعد عشاق البرجر في رأس الخيمة على معرفة النكهة الحقيقية!'
              : 'We only showcase verified feedback directly on Google Maps. Taste the smash and share your genuine review to help fellow burger lovers in Ras Al Khaimah!'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={appendUtmParams(BUSINESS_INFO.writeReviewUrl)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackReviewClick('reviews_leave_review')}
              data-smash-shape="btn"
              data-smash-stroke="none"
              className="smash-btn bg-[#FF1C00] text-[#EBE5D0] font-bold text-xs md:text-sm uppercase px-7 py-3.5 flex items-center justify-center gap-2 tap-target"
            >
              <Star className="w-4 h-4 fill-[#EBE5D0]" />
              <span>{isAr ? 'أضف تقييمك على Google' : 'Leave a Google Review'}</span>
            </a>

            <a
              href={appendUtmParams(BUSINESS_INFO.reviewsShareUrl)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackReviewClick('reviews_read_reviews')}
              data-smash-shape="btn"
              data-smash-stroke="thin"
              className="smash-btn bg-[#EBE5D0] text-[#432724] font-bold text-xs md:text-sm uppercase px-7 py-3.5 flex items-center justify-center gap-2 tap-target"
            >
              <ExternalLink className="w-4 h-4 text-[#FF1C00]" />
              <span>{isAr ? 'اقرأ التقييمات على Google' : 'Read Reviews on Google'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="py-12 md:py-16 px-4 md:px-8 bg-[#EBE5D0] border-b border-[#432724]/15">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-block text-[#FF1C00] text-xs font-black uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#432724]">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-xs md:text-sm text-[#432724]/80">
              {isAr
                ? 'إجابات واضحة وسريعة عن موقعنا، أسعارنا، ساعات العمل، والتوصيل.'
                : 'Clear answers to essential questions about Smash B in Ras Al Khaimah.'}
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  data-smash-shape="wide"
                  data-smash-stroke="thin"
                  className="smash-wide-box bg-[#EBE5D0] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-start p-5 sm:px-6 flex items-center justify-between gap-4 font-bold text-sm md:text-base text-[#432724] tap-target"
                    aria-expanded={isOpen}
                  >
                    <span>{isAr ? faq.qAr : faq.qEn}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FF1C00] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-2 text-xs md:text-sm text-[#432724]/85 leading-relaxed border-t border-[#432724]/15">
                      <p>{isAr ? faq.aAr : faq.aEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#EBE5D0] text-[#432724] pt-12 pb-24 md:pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b-2 border-[#432724] pb-8">
            {/* Identity & Slogan */}
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

            {/* Contact Details */}
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
                  onClick={() => trackCallClick('footer')}
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

            {/* Socials */}
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
          onClick={() => trackTalabatClick('sticky_mobile')}
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
          onClick={() => trackWhatsAppClick('sticky_mobile')}
          data-smash-shape="btn"
          data-smash-stroke="none"
          className="flex-1 smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-[11px] sm:text-xs uppercase py-3 px-4 flex items-center justify-center gap-1.5 whitespace-nowrap tap-target"
        >
          <MessageCircle className="w-4 h-4 text-[#432724] shrink-0" />
          <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
        </a>

        <a
          href={BUSINESS_INFO.telephoneHref}
          onClick={() => trackCallClick('sticky_mobile')}
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

export default Home;
