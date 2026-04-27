import React from 'react';
import { motion } from 'framer-motion';

const VibeSection: React.FC = () => {
  return (
    <section className="bg-smash-cream py-24 px-6 md:px-12 relative overflow-hidden bg-retro-grid">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="space-y-8"
        >
          <div className="inline-block px-4 py-1 bg-smash-red text-white font-secondary text-xl tracking-widest -skew-x-12 mb-4">
            The Vision
          </div>
          <h2 className="text-5xl md:text-7xl font-primary text-smash-brown leading-tight uppercase">
            Bold Flavors Meet <span className="text-smash-red">Urban Energy.</span>
          </h2>
          
          <div className="space-y-6 text-smash-brown text-lg md:text-xl font-description leading-relaxed max-w-xl">
            <p className="font-bold border-l-4 border-smash-red pl-6">
              We are redefining the burger experience right here in the UAE. 
              At Smash B, we don’t just cook burgers; we craft them.
            </p>
            <p>
              Using only premium, fresh ingredients, our patties are smashed to absolute perfection. 
              The result? A dangerously juicy center with those crispy, caramelized edges, 
              striking the ideal balance of texture and taste.
            </p>
            <p className="font-extrabold text-2xl md:text-3xl text-smash-red uppercase tracking-tight">
               Expect unbeatable flavor in every single bite.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, x: 10 }}
            className="group flex items-center space-x-4 border-4 border-smash-brown px-8 py-4 text-smash-brown font-primary hover:bg-smash-brown hover:text-white transition-all transform -skew-x-12"
          >
            <span>See the Menu</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </motion.button>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative aspect-square lg:aspect-[4/5]"
        >
          {/* Decorative Grid and Boxes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-smash-red/10 animate-pulse border border-smash-red/20" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-smash-brown/5 border-2 border-smash-brown/10" />
          
          <div className="relative w-full h-full overflow-hidden border-8 border-smash-brown shadow-[20px_20px_0px_#ea3b24]">
             <img 
               src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop" 
               alt="Burger Energy" 
               className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-smash-brown/40 to-transparent" />
             <div className="absolute bottom-6 left-6 font-primary text-white text-3xl">
                EST. 2024
             </div>
          </div>
        </motion.div>
      </div>

      {/* Repeating Marquee text at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap bg-smash-brown py-2 select-none">
        <div className="flex animate-[marquee_20s_linear_infinite] space-x-8">
           {[...Array(6)].map((_, i) => (
             <span key={i} className="text-smash-cream font-primary text-sm uppercase">
               Redefining the burger experience • Bold Flavors • Urban Energy • Smash B • 
             </span>
           ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default VibeSection;
