import React from 'react';
import { motion } from 'framer-motion';

const AnatomySection: React.FC = () => {
  const features = [
    {
      title: "The Smash",
      description: "Smashed thin, seared hard, completely irresistible.",
      position: "top-1/4 left-[10%]"
    },
    {
      title: "The Ingredients",
      description: "100% premium and fresh, always.",
      position: "top-1/2 right-[10%]"
    },
    {
      title: "The Sauce",
      description: "Our signature blends, designed to drip.",
      position: "bottom-[15%] left-1/2 -translate-x-1/2 text-center"
    }
  ];

  return (
    <section className="bg-smash-brown py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-primary text-smash-cream uppercase mb-4 leading-tight">
            Quality is at the Heart <br className="hidden md:block" /> 
            of Everything We Do.
          </h2>
          <p className="font-secondary text-2xl md:text-3xl text-smash-red tracking-widest">
            We don't cut corners.
          </p>
        </motion.div>

        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* Main Burger Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1.5 }}
            className="z-10 w-full max-w-4xl px-4"
          >
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop" 
                alt="Smash B Burger Detail" 
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(234,59,36,0.3)] filter contrast-125"
              />
              {/* Overlay for annotations */}
              <div className="absolute inset-0 z-20">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className={`absolute ${f.position} bg-white/10 backdrop-blur-md p-6 border-2 border-smash-red/50 max-w-xs group-hover:bg-white group-hover:text-smash-brown transition-colors duration-500`}
                  >
                    <h3 className="font-primary text-sm md:text-lg mb-2 text-smash-red uppercase">{f.title}</h3>
                    <p className="font-description text-sm md:text-base text-smash-cream group-hover:text-smash-brown leading-tight">
                        {f.description}
                    </p>
                    {/* Connecting Line (CSS only) */}
                    <div className="hidden lg:block absolute w-12 h-0.5 bg-smash-red -left-12 top-1/2 origin-right" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center pointer-events-none">
             <div className="w-[120%] h-1 bg-smash-red rotate-12" />
             <div className="w-[120%] h-1 bg-smash-red -rotate-12" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-center">
            {features.map((f, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="p-8 border-2 border-smash-cream/10 hover:border-smash-red transition-all"
                >
                     <div className="w-12 h-12 bg-smash-red text-white flex items-center justify-center font-primary mx-auto mb-6">
                        {i + 1}
                     </div>
                     <h4 className="font-primary text-smash-red text-sm mb-4 uppercase">{f.title}</h4>
                     <p className="font-description text-smash-cream/70 text-sm leading-relaxed">{f.description}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AnatomySection;
