import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useSmashShapes } from '../utils/smashShapes';
import SeoHead from '../components/SeoHead';

const NotFound: React.FC = () => {
  const { language, dir } = useLanguage();
  const location = useLocation();
  const isAr = language === 'ar';

  useSmashShapes([language]);

  return (
    <div
      className="min-h-screen bg-[#EBE5D0] text-[#432724] font-body selection:bg-[#FF1C00] selection:text-[#EBE5D0] flex flex-col"
      dir={dir}
    >
      <SeoHead pathname={location.pathname} />

      <div className="w-full bg-[#FF1C00] text-[#EBE5D0] py-2 px-4 text-center font-bold text-xs md:text-sm tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 shrink-0 text-[#A5C7A5]" />
        <span>
          {isAr
            ? 'برجر سماش طازج من 12 درهم • بالقرب من AURAK رأس الخيمة • يومياً 1 ظهراً – 12 ليلاً'
            : 'Fresh smash burgers from AED 12 • Near AURAK, Ras Al Khaimah • Open daily 1 PM – 12 AM'}
        </span>
      </div>

      <header className="sticky top-0 z-40 bg-[#EBE5D0]/95 backdrop-blur-sm border-b border-[#432724]/20 px-4 md:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to={isAr ? '/ar' : '/'} className="flex items-center gap-2">
            <img
              src="/logos/smashb-logo-4.svg"
              alt="Smash B Logo"
              width={48}
              height={48}
              className="h-11 md:h-12 w-auto object-contain drop-shadow-[0_1.5px_0_rgba(67,39,36,0.24)]"
            />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to={isAr ? '/ar' : '/'}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-xs md:text-sm font-bold uppercase px-4 py-2 smash-btn bg-[#EBE5D0] text-[#432724] tap-target"
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <Link
              to={isAr ? '/ar/menu' : '/menu'}
              data-smash-shape="compact"
              data-smash-stroke="thin"
              className="inline-flex items-center justify-center text-xs md:text-sm font-bold uppercase px-4 py-2 smash-btn bg-[#EBE5D0] text-[#432724] tap-target"
            >
              {isAr ? 'قائمة الطعام' : 'View Menu'}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          data-smash-shape="card"
          data-smash-stroke="card"
          className="smash-box bg-[#EBE5D0] max-w-xl w-full p-8 sm:p-10 text-center space-y-5"
        >
          <span
            data-smash-shape="badge"
            data-smash-stroke="none"
            className="inline-flex items-center px-4 py-1.5 text-xs font-black uppercase tracking-wider bg-[#FF1C00] text-[#EBE5D0] smash-btn"
          >
            404
          </span>

          <h1 className="font-primary text-4xl sm:text-5xl uppercase tracking-tight text-[#432724]">
            {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h1>

          <p className="text-sm md:text-base text-[#432724]/85 leading-relaxed">
            {isAr
              ? 'الصفحة التي تبحث عنها غير متوفرة. يمكنك العودة إلى الرئيسية أو تصفح قائمة الطعام الكاملة.'
              : "The page you requested doesn't exist. Head back home, browse the full menu, or find our shop near AURAK."}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <Link
              to={isAr ? '/ar' : '/'}
              data-smash-shape="btn"
              data-smash-stroke="none"
              className="smash-btn bg-[#FF1C00] text-[#EBE5D0] font-bold text-xs md:text-sm uppercase px-6 py-3 flex items-center justify-center gap-2 tap-target"
            >
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </Link>

            <Link
              to={isAr ? '/ar/menu' : '/menu'}
              data-smash-shape="btn"
              data-smash-stroke="none"
              className="smash-btn bg-[#A5C7A5] text-[#432724] font-bold text-xs md:text-sm uppercase px-6 py-3 flex items-center justify-center gap-2 tap-target"
            >
              <span>{isAr ? 'قائمة الطعام' : 'Explore Menu'}</span>
              <ExternalLink className="w-4 h-4" />
            </Link>

            <Link
              to={isAr ? '/ar/location' : '/location'}
              data-smash-shape="btn"
              data-smash-stroke="thin"
              className="smash-btn bg-[#EBE5D0] text-[#432724] font-bold text-xs md:text-sm uppercase px-6 py-3 flex items-center justify-center gap-2 tap-target"
            >
              <MapPin className="w-4 h-4 text-[#FF1C00]" />
              <span>{isAr ? 'موقعنا' : 'Location'}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
