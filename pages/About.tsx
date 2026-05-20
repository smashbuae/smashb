import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ABOUT_LANGUAGES = {
  en: {
    backHome: "Back Home",
    ourStory: "Our Smash Story",
    p1: "Smash B wasn't born in a kitchen—it was born on the streets. We saw a gap in the burger scene: plenty of 'craft' but not enough 'soul.'",
    p2: "We're not just flipping patties; we're redefining the smash burger experience for the UAE. High-grade beef, urban energy, and a commitment to flavor that hits hard.",
    slogan: "BOLD. UNFILTERED. SMASHED.",
  },
  ar: {
    backHome: "الرئيسية",
    ourStory: "قصة سماش بي",
    p1: "لم يولد سماش بي في مطبخ عادي، بل وُلد من رحم الشارع. لقد لاحظنا فجوة واضحة في عالم البرجر: الكثير من 'التفاصيل التجارية' والقليل من 'الروح والتميز الحقيقي'.",
    p2: "نحن لا نقوم فقط بقلب قطع اللحم؛ بل نحن نعيد كتابة تجربة برجر السماش في بلدنا الإمارات. لحم بقري فاخر بامتياز، طاقة شارع جريئة، والتزام بنكهة خيالية تصدم رأسك وقوة لا تقاوم.",
    slogan: "جريء. مميز. سماشد على الأصول.",
  }
};

const About: React.FC = () => {
  const language = 'en' as any;
  const dir = 'ltr' as any;

  return (
    <div className="min-h-screen bg-smash-brown text-smash-cream flex flex-col" dir={dir}>
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center z-10">
        <Link to="/" className="group">
          <img 
            src="/SMASHBlogo-19.svg" 
            alt="Smash B Logo" 
            className="h-12 md:h-16 group-hover:scale-110 transition-transform" 
          />
        </Link>
        <Link to="/" className={`${language === 'ar' ? 'font-arabic-heading text-base' : 'font-primary text-sm'} uppercase tracking-widest border-2 border-smash-red px-6 py-2 rounded-full hover:bg-smash-red transition-all`}>
          {ABOUT_LANGUAGES[language].backHome}
        </Link>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`${language === 'ar' ? 'font-arabic-heading text-6xl md:text-8xl' : 'font-primary text-5xl md:text-7xl'} text-smash-red uppercase italic tracking-tighter`}>
            {ABOUT_LANGUAGES[language].ourStory}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className={`${language === 'ar' ? 'font-arabic-desc text-xl md:text-2xl' : 'font-description text-lg md:text-xl'} leading-relaxed text-smash-cream/80 space-y-6`}
        >
          <p>
            {ABOUT_LANGUAGES[language].p1}
          </p>
          <p>
            {ABOUT_LANGUAGES[language].p2}
          </p>
          <p className={`text-smash-red ${language === 'ar' ? 'font-arabic-heading text-3xl md:text-4xl' : 'font-primary text-2xl md:text-3xl'} italic`}>
             {ABOUT_LANGUAGES[language].slogan}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative w-full aspect-video rounded-[35px] overflow-hidden border-4 border-smash-red/20"
        >
          <img 
            src="/brandcharacter/smashing.svg" 
            alt="Smash B Mascot" 
            className="w-full h-full object-contain p-12 bg-white/5"
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
