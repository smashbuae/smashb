import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ExternalLink,
  Sparkles,
  MessageCircle,
  Navigation,
  CheckCircle2,
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
import { BUSINESS_INFO, getPairedPath } from '../data/siteConfig';
import SeoHead from '../components/SeoHead';

const Location: React.FC = () => {
  const { language, dir, saveLanguagePreference } = useLanguage();
  const location = useLocation();
  const isAr = language === 'ar';
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
              to={homePath}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] whitespace-nowrap tap-target"
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>

            <Link
              to={menuPath}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] whitespace-nowrap tap-target"
            >
              {isAr ? 'القائمة' : 'Menu'}
            </Link>

            <Link
              to={storyPath}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="hidden sm:inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wide px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] whitespace-nowrap tap-target"
            >
              {isAr ? 'قصتنا' : 'Our Story'}
            </Link>

            <Link
              to={switchPath}
              onClick={() => saveLanguagePreference(isAr ? 'en' : 'ar')}
              aria-label="Switch Language"
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="text-[11px] sm:text-xs md:text-sm font-bold uppercase px-2.5 sm:px-4 py-2 sm:py-2.5 smash-btn bg-[#EBE5D0] text-[#432724] whitespace-nowrap tap-target flex items-center justify-center gap-1"
            >
              <span>{isAr ? 'English' : 'العربية'}</span>
            </Link>

            <a
              href={appendUtmParams(BUSINESS_INFO.talabatUrl)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTalabatClick('location_header')}
              data-smash-shape="btn"
              data-smash-stroke="none"
              className="hidden md:inline-flex items-center gap-2 bg-[#FF1C00] text-[#EBE5D0] font-bold text-xs uppercase px-5 py-2.5 smash-btn tap-target"
            >
              <span>{isAr ? 'اطلب عبر طلبات' : 'Order on Talabat'}</span>
            </a>
          </nav>
        </div>
      </header>

      {/* LOCATION HERO & DETAILS */}
      <section className="py-10 md:py-16 px-4 md:px-8 border-b border-[#432724]/15">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
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
                      isOpenNow ? 'bg-[#FF1C00]' : 'bg-[#432724]/50'
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
                  {isAr ? 'رأس الخيمة، الإمارات' : 'Ras Al Khaimah, UAE'}
                </span>
              </div>

              <h1 className="font-primary text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight uppercase text-[#432724]">
                {isAr ? (
                  <>
                    موقع <span className="text-[#FF1C00]">سماش بي</span> في رأس الخيمة
                  </>
                ) : (
                  <>
                    Find <span className="text-[#FF1C00]">Smash B</span> near AURAK
                  </>
                )}
              </h1>

              <p className="text-sm md:text-base text-[#432724]/90 leading-relaxed">
                {isAr
                  ? 'يقع فرعنا الحالي بالقرب من الجامعة الأمريكية في رأس الخيمة (AURAK). استمتع بتناول الطعام بالمطعم، الاستلام السريع، الطلب عبر واتساب أو التوصيل عبر طلبات يومياً من 1:00 ظهراً حتى 12:00 منتصف الليل.'
                  : 'Our active outlet is located near the American University of Ras Al Khaimah (AURAK). Visit us for dine-in or takeaway, message on WhatsApp, or order delivery via Talabat daily from 1:00 PM to 12:00 AM.'}
              </p>

              <div className="space-y-4">
                <div
                  data-smash-shape="wide"
                  data-smash-stroke="thin"
                  className="flex items-start gap-3 p-4 sm:p-5 smash-wide-box bg-[#EBE5D0]"
                >
                  <MapPin className="w-5 h-5 text-[#FF1C00] shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-bold text-sm uppercase text-[#432724]">
                      {isAr ? 'العنوان — رأس الخيمة' : 'Address — Ras Al Khaimah'}
                    </h2>
                    <p className="text-xs md:text-sm text-[#432724]/85">
                      {isAr
                        ? 'بالقرب من الجامعة الأمريكية في رأس الخيمة (AURAK)، رأس الخيمة، الإمارات العربية المتحدة'
                        : 'Near American University of Ras Al Khaimah (AURAK), Ras Al Khaimah, United Arab Emirates'}
                    </p>
                  </div>
                </div>

                <div
                  data-smash-shape="wide"
                  data-smash-stroke="thin"
                  className="flex items-start gap-3 p-4 sm:p-5 smash-wide-box bg-[#EBE5D0]"
                >
                  <Clock className="w-5 h-5 text-[#FF1C00] shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-bold text-sm uppercase text-[#432724]">
                      {isAr ? 'ساعات العمل' : 'Operating Hours'}
                    </h2>
                    <p className="text-xs md:text-sm text-[#432724]/85">
                      {isAr
                        ? 'يومياً: 1:00 ظهراً – 12:00 منتصف الليل (توقيت الإمارات)'
                        : 'Daily: 1:00 PM – 12:00 AM Midnight (Smashed daily for the late-night crave.)'}
                    </p>
                  </div>
                </div>

                <div
                  data-smash-shape="wide"
                  data-smash-stroke="thin"
                  className="flex items-start gap-3 p-4 sm:p-5 smash-wide-box bg-[#EBE5D0]"
                >
                  <Phone className="w-5 h-5 text-[#FF1C00] shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-bold text-sm uppercase text-[#432724]">
                      {isAr ? 'الهاتف والواتساب' : 'Phone & WhatsApp'}
                    </h2>
                    <p className="text-xs md:text-sm text-[#432724]/85 font-mono">
                      <a
                        href={BUSINESS_INFO.telephoneHref}
                        onClick={() => trackCallClick('location_info')}
                        dir="ltr"
                        className="inline-block underline font-bold text-[#FF1C00]"
                      >
                        {BUSINESS_INFO.telephoneDisplay}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={appendUtmParams(BUSINESS_INFO.mapsShortUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDirectionsClick('location_primary')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#FF1C00] text-[#EBE5D0] font-bold text-xs md:text-sm uppercase px-6 py-3.5 flex items-center justify-center gap-2 tap-target"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{isAr ? 'احصل على الاتجاهات' : 'Get Directions'}</span>
                </a>

                <a
                  href={appendUtmParams(BUSINESS_INFO.talabatUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTalabatClick('location_talabat')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#FF1C00] text-[#EBE5D0] font-bold text-xs md:text-sm uppercase px-6 py-3.5 flex items-center justify-center gap-2 tap-target"
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
                  onClick={() => trackWhatsAppClick('location_whatsapp')}
                  data-smash-shape="btn"
                  data-smash-stroke="none"
                  className="smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-xs md:text-sm uppercase px-6 py-3.5 flex items-center justify-center gap-2 tap-target"
                >
                  <MessageCircle className="w-4 h-4 text-[#432724]" />
                  <span>{isAr ? 'طلب عبر واتساب' : 'WhatsApp Order'}</span>
                </a>

                <a
                  href={appendUtmParams(BUSINESS_INFO.writeReviewUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackReviewClick('location_rate_us')}
                  data-smash-shape="btn"
                  data-smash-stroke="thin"
                  className="smash-btn bg-[#EBE5D0] text-[#432724] font-bold text-xs md:text-sm uppercase px-6 py-3.5 flex items-center justify-center gap-2 tap-target"
                >
                  <Star className="w-4 h-4 text-[#FF1C00]" />
                  <span>{isAr ? 'قيّمنا على Google' : 'Rate Us on Google'}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Google Maps Embed + Al Dhait Expansion Note */}
            <div className="lg:col-span-6 space-y-6">
              <div
                data-smash-shape="card"
                data-smash-stroke="card"
                className="smash-box bg-[#EBE5D0] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center justify-between gap-2 px-1">
                  <h2 className="font-primary text-lg uppercase text-[#432724]">
                    {isAr ? 'خريطة الموقع' : 'Map — Near AURAK'}
                  </h2>
                  <a
                    href={appendUtmParams(BUSINESS_INFO.mapsShortUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackDirectionsClick('location_map_header')}
                    className="text-xs font-bold uppercase text-[#FF1C00] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{isAr ? 'فتح الخريطة' : 'Open Map'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="w-full aspect-4/3 overflow-hidden border border-[#432724]/25 bg-[#A5C7A5]/20">
                  <iframe
                    title={
                      isAr
                        ? 'موقع سماش بي بالقرب من AURAK رأس الخيمة'
                        : 'Smash B location near AURAK in Ras Al Khaimah'
                    }
                    src={BUSINESS_INFO.mapsEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Quick Facts Block (GEO plain-text summary) */}
              <div
                data-smash-shape="card"
                data-smash-stroke="card"
                className="smash-box bg-[#A5C7A5]/25 p-6 space-y-3"
              >
                <h2 className="font-primary text-xl uppercase tracking-tight text-[#432724]">
                  {isAr ? 'معلومات سريعة عن سماش بي' : 'Smash B Key Facts'}
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs md:text-sm">
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">{isAr ? 'الاسم' : 'Name'}</dt>
                    <dd className="font-semibold text-[#432724]">{isAr ? 'سماش بي (Smash B)' : 'Smash B'}</dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">{isAr ? 'المطبخ' : 'Cuisine'}</dt>
                    <dd className="font-semibold text-[#432724]">
                      {isAr ? 'برجر سماش، دجاج مقرمش، لودد فرايز' : 'Smash Burgers, Crispy Chicken, Loaded Fries'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">{isAr ? 'المعلم القريب' : 'Landmark'}</dt>
                    <dd className="font-semibold text-[#432724]">
                      {isAr ? 'قرب AURAK، رأس الخيمة' : 'Near AURAK, Ras Al Khaimah'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">{isAr ? 'ساعات العمل' : 'Hours'}</dt>
                    <dd className="font-semibold text-[#432724]">{BUSINESS_INFO.hours[isAr ? 'displayAr' : 'displayEn']}</dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">{isAr ? 'الأسعار' : 'Prices'}</dt>
                    <dd className="font-semibold text-[#432724]">
                      {isAr ? 'البرجر من 12 درهم (10–25 درهم)' : 'Burgers from AED 12 (AED 10–25)'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase text-[#432724]/70">{isAr ? 'الحلال والخدمة' : 'Halal & Service'}</dt>
                    <dd className="font-semibold text-[#432724]">
                      {isAr ? 'حلال 100% • صالة، تيك أواي، توصيل' : '100% Halal • Dine-in, Takeaway, Delivery'}
                    </dd>
                  </div>
                </dl>
                <div className="pt-1 flex flex-wrap gap-3 text-xs font-bold text-[#432724]/85">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1C00]" />
                    {isAr ? 'الفرع الثاني: الظيت (قريباً)' : 'Second branch: Al Dhait (Opening Soon)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#EBE5D0] text-[#432724] pt-12 pb-24 md:pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#432724]/75">
          <p>
            {isAr
              ? '© 2026 سماش بي. جميع الحقوق محفوظة.'
              : '© 2026 Smash B. All rights reserved.'}
          </p>
          <div className="flex flex-wrap items-center gap-4">
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
          onClick={() => trackTalabatClick('location_sticky_mobile')}
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
          onClick={() => trackWhatsAppClick('location_sticky_mobile')}
          data-smash-shape="btn"
          data-smash-stroke="none"
          className="flex-1 smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-[11px] sm:text-xs uppercase py-3 px-4 flex items-center justify-center gap-1.5 whitespace-nowrap tap-target"
        >
          <MessageCircle className="w-4 h-4 text-[#432724] shrink-0" />
          <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
        </a>

        <a
          href={BUSINESS_INFO.telephoneHref}
          onClick={() => trackCallClick('location_sticky_mobile')}
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

export default Location;
