import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import { useLanguage } from '../LanguageContext';

const Home: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === 'ar' 
      ? "أفضل برجر بأسعار معقولة في رأس الخيمة | سماش بي" 
      : "Best Affordable Burger in Ras Al Khaimah | Smash B";
      
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', language === 'ar' 
        ? "هل تبحث عن أفضل برجر بأسعار معقولة في رأس الخيمة؟ تفضل بزيارة سماش بي للاستمتاع ببرجر سماش غني بالعصارة، بطاطا لودد مقرمشة وتوصيل سريع. اطلب الآن!" 
        : "Looking for the best affordable burger in Ras Al Khaimah? Visit Smash B for juicy, next-level smashed burgers, crispy loaded fries & fast delivery. Order now!"
      );
    }
  }, [language]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Hero />
    </div>
  );
};

export default Home;
