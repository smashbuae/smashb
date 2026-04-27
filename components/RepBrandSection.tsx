import React from 'react';
import { motion } from 'framer-motion';

const RepBrandSection: React.FC = () => {
  const images = [
      { url: "https://images.unsplash.com/photo-1579306194872-64663ef0c179?q=80&w=2070&auto=format&fit=crop", label: "Packaging" },
      { url: "https://images.unsplash.com/photo-1594266357095-01997c234a2e?q=80&w=2070&auto=format&fit=crop", label: "Custom Bags" },
      { url: "https://images.unsplash.com/photo-1576243355643-9b24d79b25c1?q=80&w=2070&auto=format&fit=crop", label: "Crew Uniform" },
      { url: "https://images.unsplash.com/photo-1588667616235-9f6be2b59620?q=80&w=2070&auto=format&fit=crop", label: "Fries Box" }
  ];

  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-primary text-smash-brown uppercase leading-none mb-6">
                More Than <br /> a Burger.
            </h2>
            <p className="text-xl md:text-2xl text-smash-brown/70 font-secondary tracking-widest">
                Step into the Smash B lifestyle. Grab your gear, collect the stickers, and join the crew.
            </p>
          </div>
          <div className="flex space-x-2">
             <div className="w-12 h-12 bg-smash-red flex items-center justify-center text-white cursor-pointer select-none">←</div>
             <div className="w-12 h-12 bg-smash-brown flex items-center justify-center text-white cursor-pointer select-none">→</div>
          </div>
        </motion.div>

        {/* Custom Carousel simulation */}
        <div className="flex space-x-8 overflow-x-auto pb-12 no-scrollbar scroll-smooth">
           {images.map((img, i) => (
             <motion.div
                key={i}
                whileHover={{ y: -20 }}
                className="flex-none w-[300px] md:w-[450px] group cursor-pointer"
             >
                <div className="relative aspect-[4/5] overflow-hidden bg-smash-cream border-2 border-smash-brown">
                   <img 
                     src={img.url} 
                     alt={img.label} 
                     className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-smash-red mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity" />
                   
                   <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-smash-brown to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                       <p className="font-primary text-white text-xs uppercase tracking-widest">{img.label}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Sticker Wall Pattern */}
        <div className="mt-20 flex flex-wrap justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
             {[...Array(8)].map((_, i) => (
               <div key={i} className={`px-6 py-2 border-2 border-smash-brown font-primary text-xs uppercase rotate-${(i % 3) * 5 - 5}`}>
                 SMASH B • UAE
               </div>
             ))}
             {[...Array(4)].map((_, i) => (
               <div key={i} className="w-12 h-12 bg-smash-red rounded-full flex items-center justify-center font-primary text-[8px] text-white rotate-12">
                 SB
               </div>
             ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default RepBrandSection;
