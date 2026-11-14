import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Sparkles,
  MessageCircle,
  Navigation,
  CheckCircle2,
  Flame
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import {
  appendUtmParams,
  trackTalabatClick,
  trackWhatsAppClick,
  trackCallClick,
  trackDirectionsClick
} from '../analytics';
import { useSmashShapes } from '../utils/smashShapes';

const TALABAT_URL = 'https://www.talabat.com/uae/smash-b';
const WHATSAPP_URL = 'https://wa.me/971563535819?text=Hi%20Smash%20B%2C%20I%20would%20like%20to%20order';
const MAPS_URL = 'https://share.google/B4R9Oj37gfchmf9mD';
const PHONE_NUMBER = '+971 56 353 5819';
const PHONE_HREF = 'tel:+971563535819';

const About: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const isAr = language === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);

  useSmashShapes([language, isOpenNow]);

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
      ? 'قصتنا وفروعنا في رأس الخيمة | سماش بي'
      : 'Our Story & Locations in Ras Al Khaimah | Smash B';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      isAr
        ? 'تعرّف على قصة سماش بي في رأس الخيمة، التزامنا باللحم الحلال 100% في كل الفروع، ومواقعنا قرب AURAK والظيت (قريباً).'
        : 'Discover Smash B’s story in Ras Al Khaimah, our 100% halal promise across all branches, and our locations near AURAK and Al Dhait (coming soon).'
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.smashb.ae/our-story');

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
            ? 'برجر سماش طازج من 12 درهم • بالقرب من AURAK رأس الخيمة • مفتوح يومياً من 1 ظهراً حتى منتصف الليل'
            : 'Fresh smash burgers from AED 12 • Near AURAK, Ras Al Khaimah • Open daily 1 PM – 12 AM'}
        </span>
      </div>

      {/* HEADER / NAVIGATION */}
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
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>

            <Link
              to="/menu"
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide sm:tracking-wider px-2.5 sm:px-5 py-2 sm:py-2.5 smash-btn bg-[#F5F1E8] text-[#432724] transition-colors whitespace-nowrap tap-target"
            >
              {isAr ? 'قائمة الطعام' : 'View Menu'}
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
              onClick={() => trackTalabatClick('story_header')}
              data-smash-shape="btn"
              data-smash-stroke="none"
              className="hidden md:inline-flex items-center gap-2 bg-[#FF1C00] text-[#F5F1E8] font-bold text-xs uppercase px-6 py-2.5 smash-btn tap-target"
            >
              <span>{isAr ? 'اطلب عبر طلبات' : 'Order on Talabat'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* 1. ABOUT US / OUR STORY HERO */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-16 px-4 md:px-8 border-b border-[#432724]/15">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-start">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                <span
                  data-smash-shape="badge"
                  data-smash-stroke="none"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase bg-[#A5C7A5] text-[#432724] smash-btn"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#432724]" />
                  <span>{isAr ? 'حلال 100% دائماً' : '100% Halal'}</span>
                </span>

                <span
                  data-smash-shape="badge"
                  data-smash-stroke="none"
                  className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-black uppercase tracking-wider bg-[#FF1C00] text-[#F5F1E8] smash-btn"
                >
                  {isAr ? 'رأس الخيمة، الإمارات' : 'Ras Al Khaimah, UAE'}
                </span>
              </div>

              <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight uppercase text-[#432724]">
                {isAr ? (
                  <>
                    قصتنا في <span className="text-[#FF1C00]">سماش بي</span>
                  </>
                ) : (
                  <>
                    Our <span className="text-[#FF1C00]">Story</span>
                  </>
                )}
              </h1>

              <p className="font-bold text-sm md:text-base tracking-wide uppercase text-[#FF1C00]">
                {isAr ? 'ابقَ في جو السماش.' : '"Stay smashin\'."'}
              </p>

              <div className="space-y-4 text-sm md:text-base leading-relaxed text-[#432724]/90 max-w-xl mx-auto lg:mx-0">
                <p>
                  {isAr
                    ? 'لم يبدأ سماش بي كمجرد مطعم عادي—بل وُلد من شغف الشارع الحقيقي بالبرجر في رأس الخيمة. رأينا فجوة بين المطاعم التجارية والطعم الأصيل، فقررنا تقديم تجربة برجر سماش بروح جريئة وجودة عالية.'
                    : "Smash B wasn't born in a typical kitchen—it was born for UAE street burger culture. We saw a gap in Ras Al Khaimah for a real, unapologetic smash burger joint with big flavor, fresh ingredients, and everyday prices starting from AED 12."}
                </p>
                <p>
                  {isAr
                    ? 'نضغط كل شريحة لحم طازجة على الصاج الساخن لتحصل على حواف مقرمشة وعصارة غنية داخل خبز البطاطس الطري مع صوص إس بي الخاص. والأهم: حلال 100%. كل شريحة، في كل مرة، وعبر جميع فروعنا.'
                    : 'Every patty is pressed razor-thin on blazing hot steel for crispy caramelized lace edges, tucked into toasted potato buns with our signature SB sauce. Most importantly: 100% halal. Every patty, every time, across all branches.'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  to="/menu"
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#FF1C00] text-[#F5F1E8] font-bold text-sm md:text-base uppercase px-7 py-3.5 flex items-center justify-center gap-2 tap-target"
                >
                  <span>{isAr ? 'تصفح القائمة الكاملة' : 'Explore Full Menu'}</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <a
                  href={appendUtmParams(WHATSAPP_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('story_whatsapp')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-sm md:text-base uppercase px-7 py-3.5 flex items-center justify-center gap-2 tap-target"
                >
                  <MessageCircle className="w-5 h-5 text-[#432724]" />
                  <span>{isAr ? 'طلب عبر واتساب' : 'WhatsApp Order'}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Official SB Flying Character Pose (Open Background, Scaled Up) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <img
                src="/brandcharacter/smashbflyingcharacter.svg"
                alt="Smash B Flying Mascot Character"
                width={400}
                height={302}
                className="w-72 sm:w-96 lg:w-full max-w-[400px] h-auto object-contain drop-shadow-[0_8px_0_rgba(67,39,36,0.18)]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR LOCATIONS SECTION (AURAK + Al Dhait Soon) */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-[#A5C7A5]/25 border-b border-[#432724]/15">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#FF1C00]">
              <Flame className="w-3.5 h-3.5" />
              {isAr ? 'فروعنا في رأس الخيمة' : 'Our Branches'}
            </span>
            <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#432724]">
              {isAr ? 'مواقع سماش بي' : 'Locations'}
            </h2>
            <p className="text-xs md:text-sm text-[#432724]/85">
              {isAr
                ? 'حلال 100%. كل شريحة، في كل مرة، وعبر جميع فروعنا.'
                : '100% halal. Every patty, every time, across all branches.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Branch 1: American University of Ras Al Khaimah (AURAK) */}
            <article
              data-smash-shape="card"
              data-smash-stroke="card"
              className="smash-box bg-[#F5F1E8] p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    data-smash-shape="badge"
                    data-smash-stroke="none"
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold smash-btn ${
                      isOpenNow ? 'bg-[#A5C7A5] text-[#432724]' : 'bg-[#432724]/10 text-[#432724]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isOpenNow ? 'bg-[#FF1C00] animate-pulse' : 'bg-[#432724]/50'
                      }`}
                    />
                    {isOpenNow
                      ? isAr
                        ? 'مفتوح الآن'
                        : 'Open Now'
                      : isAr
                        ? 'مغلق الآن'
                        : 'Closed Now'}
                  </span>

                  <span className="text-xs font-bold uppercase text-[#FF1C00]">
                    {isAr ? 'الفرع الرئيسي' : 'Flagship Outlet'}
                  </span>
                </div>

                <h3 className="font-primary text-2xl sm:text-3xl uppercase tracking-tight text-[#432724]">
                  {isAr
                    ? 'الجامعة الأمريكية في رأس الخيمة (AURAK)'
                    : 'American University of Ras Al Khaimah'}
                </h3>

                <div className="space-y-3 text-xs md:text-sm text-[#432724]/85">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#FF1C00] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'بالقرب من الجامعة الأمريكية في رأس الخيمة (AURAK)، رأس الخيمة، الإمارات العربية المتحدة'
                        : 'Near American University of Ras Al Khaimah (AURAK), Ras Al Khaimah, United Arab Emirates'}
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#FF1C00] shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? 'يومياً: 1:00 ظهراً – 12:00 منتصف الليل'
                        : 'Daily: 1:00 PM – 12:00 AM (Midnight)'}
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#FF1C00] shrink-0 mt-0.5" />
                    <span dir="ltr" className="font-mono inline-block">{PHONE_NUMBER}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-xs font-bold uppercase text-[#432724]/75 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1C00]" />
                    {isAr ? 'تناول بالمطعم' : 'Dine-in'}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1C00]" />
                    {isAr ? 'تيك أواي' : 'Takeaway'}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1C00]" />
                    {isAr ? 'توصيل طلبات' : 'Talabat Delivery'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={appendUtmParams(MAPS_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDirectionsClick('story_aurak_maps')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#FF1C00] text-[#F5F1E8] font-bold text-xs md:text-sm uppercase px-6 py-3 flex items-center gap-2 tap-target"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{isAr ? 'افتح في خرائط Google' : 'Open in Google Maps'}</span>
                </a>

                <a
                  href={PHONE_HREF}
                  onClick={() => trackCallClick('story_aurak_call')}
                  data-smash-shape="btn"
                  data-smash-stroke="thin"
                  className="smash-btn bg-[#F5F1E8] text-[#432724] font-bold text-xs md:text-sm uppercase px-6 py-3 flex items-center gap-2 tap-target"
                >
                  <Phone className="w-4 h-4 text-[#FF1C00]" />
                  <span>{isAr ? 'اتصل بنا' : 'Call'}</span>
                </a>
              </div>
            </article>

            {/* Branch 2: Al Dhait (Opening Soon) */}
            <article
              data-smash-shape="card"
              data-smash-stroke="card"
              className="smash-box bg-[#F5F1E8] p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    data-smash-shape="badge"
                    data-smash-stroke="none"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-black uppercase bg-[#FF1C00] text-[#F5F1E8] smash-btn"
                  >
                    {isAr ? 'قريباً' : 'Soon'}
                  </span>

                  <span className="text-xs font-bold uppercase text-[#432724]/70">
                    {isAr ? 'فرع جديد قيد التجهيز' : 'Upcoming Branch'}
                  </span>
                </div>

                <h3 className="font-primary text-2xl sm:text-3xl uppercase tracking-tight text-[#432724]">
                  {isAr ? 'الظيت، رأس الخيمة' : 'Al Dhait, Ras Al Khaimah'}
                </h3>

                <p className="text-xs md:text-sm leading-relaxed text-[#432724]/85">
                  {isAr
                    ? 'قريباً نصل إلى منطقة الظيت في رأس الخيمة بنفس الطعم الأصيل، الصاج الساخن، واللحم الحلال 100%.'
                    : 'Expanding soon to Al Dhait in Ras Al Khaimah with the exact same razor-crisp smash burgers, potato buns, SB sauce, and 100% halal promise.'}
                </p>

                <div
                  data-smash-shape="photo"
                  data-smash-stroke="none"
                  className="bg-[#A5C7A5]/25 p-5 flex items-center gap-4"
                >
                  <img
                    src="/brandcharacter/SMASH_B Social-24.svg"
                    alt="Smash B Al Dhait Coming Soon"
                    width={72}
                    height={72}
                    className="w-16 h-16 object-contain shrink-0"
                    loading="lazy"
                  />
                  <div className="space-y-1">
                    <div className="font-primary text-base uppercase text-[#432724]">
                      {isAr ? 'الظيت • قريباً' : 'Al Dhait • Opening Soon'}
                    </div>
                    <p className="text-xs text-[#432724]/80">
                      {isAr
                        ? 'تابعونا على إنستغرام وسناب شات لمعرفة موعد الافتتاح الرسمي.'
                        : 'Follow our socials for the official Al Dhait opening announcement.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.instagram.com/smashb.uae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn inline-flex items-center justify-center gap-2 bg-[#A5C7A5] text-[#432724] font-bold text-xs md:text-sm uppercase px-6 py-3 tap-target"
                >
                  <span>{isAr ? 'تابع التحديثات @smashb.uae' : 'Follow Updates @smashb.uae'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                  ? 'سماش بي هو متجر برجر سماش في رأس الخيمة يقدم برجر اللحم والدجاج الطازج حلال 100%، بطاطا لودد، ومشروبات منعشة بالقرب من جامعة AURAK.'
                  : 'Smash B is a 100% halal smash burger shop in Ras Al Khaimah, serving fresh seared burgers, loaded fries, and refreshing drinks near AURAK.'}
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
                  onClick={() => trackCallClick('story_footer')}
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
          onClick={() => trackTalabatClick('story_sticky_mobile')}
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
          onClick={() => trackWhatsAppClick('story_sticky_mobile')}
          data-smash-shape="btn"
          data-smash-stroke="none"
          className="flex-1 smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-[11px] sm:text-xs uppercase py-3 px-4 flex items-center justify-center gap-1.5 whitespace-nowrap tap-target"
        >
          <MessageCircle className="w-4 h-4 text-[#432724] shrink-0" />
          <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
        </a>

        <a
          href={PHONE_HREF}
          onClick={() => trackCallClick('story_sticky_mobile')}
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

export default About;
