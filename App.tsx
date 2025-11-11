import React from 'react';

// A simple, stylized burger icon component, defined outside the main App component to prevent re-rendering issues.
const BurgerIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 80"
    className="w-32 h-32 md:w-40 md:h-40 drop-shadow-lg transition-transform duration-300 hover:scale-110 animate-float"
    style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 0.7))' }}
  >
    {/* Bottom Bun */}
    <path d="M10 70 Q 50 90 90 70 L 90 80 L 10 80 Z" fill="#D97706" />
    {/* Patty */}
    <rect x="8" y="60" width="84" height="12" rx="6" fill="#5D4037" />
    {/* Cheese */}
    <path d="M8 60 L 92 60 L 85 50 L 15 50 Z" fill="#FBBF24" />
    {/* Top Bun */}
    <path d="M10 50 Q 50 10 90 50 Z" fill="#F59E0B" />
    {/* Sesame Seeds */}
    <circle cx="30" cy="35" r="2" fill="#F7FAFC" />
    <circle cx="45" cy="25" r="2" fill="#F7FAFC" />
    <circle cx="60" cy="38" r="2" fill="#F7FAFC" />
    <circle cx="75" cy="30" r="2" fill="#F7FAFC" />
    <circle cx="55" cy="45" r="2" fill="#F7FAFC" />
  </svg>
);

const App: React.FC = () => {
  return (
    <main className="bg-[#12002b] min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden relative font-sans">
      {/* Background grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#12002b] via-transparent to-[#12002b]"></div>
      
      <div className="z-10 flex flex-col items-center justify-center space-y-8">
        <BurgerIcon />
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-press-start text-amber-300 animate-flicker"
            style={{ textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #f59e0b, 0 0 30px #f59e0b, 0 0 40px #f59e0b' }}>
          Smash B
        </h1>

        <h2 className="text-4xl md:text-5xl text-cyan-300 tracking-widest animate-flicker-slow"
             style={{ fontFamily: "'VT323', monospace", textShadow: '0 0 5px #fff, 0 0 10px #22d3ee, 0 0 20px #22d3ee' }}>
          COMING SOON
        </h2>
      </div>

      <footer className="absolute bottom-5 z-10 text-pink-400 text-xl md:text-2xl animate-pulse" style={{ fontFamily: "'VT323', monospace" }}>
        GET READY TO SMASH
      </footer>

      {/* Embedded styles for animations to keep component self-contained */}
      <style>{`
        @keyframes flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #f59e0b, 0 0 30px #f59e0b, 0 0 40px #f59e0b;
            opacity: 1;
          }
          20%, 24%, 55% {
            text-shadow: none;
            opacity: 0.8;
          }
        }
        .animate-flicker {
          animation: flicker 2.5s infinite alternate;
        }

        @keyframes flicker-slow {
          0%, 100% {
            text-shadow: 0 0 5px #fff, 0 0 10px #22d3ee, 0 0 20px #22d3ee;
            opacity: 1;
          }
          50% {
            text-shadow: 0 0 5px #fff, 0 0 8px #22d3ee;
            opacity: 0.9;
          }
        }
        .animate-flicker-slow {
          animation: flicker-slow 4s infinite linear;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

    </main>
  );
};

export default App;
