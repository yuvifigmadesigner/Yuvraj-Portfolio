
import React, { useState } from 'react';
import { Smile, Layers, Sparkles, Code, ChevronDown } from 'lucide-react';
import { useISTTime } from '../hooks/useSeattleTime';
import LightRays from './LightRays';
import ServiceModal from './ServiceModal';

const MainContent: React.FC = () => {
  const istTime = useISTTime();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  return (
    <>
      {/* LightRays Background for Home Page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Dark overlay to ensure text legibility and better ray contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
        <LightRays
          raysOrigin="top-center"
          raysColor="#D69452" // Honey brown
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.3} // Increased noise
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto z-10 relative">
        {/* HERO SECTION */}
        <main className="flex flex-col justify-center px-6 md:px-12 min-h-[85vh] text-white relative">
          
          {/* Location & Time */}
          <div className="flex items-center space-x-3 text-sm md:text-base font-mono opacity-80 mb-8 md:mb-12">
            <span>Based in D&NH</span>
            <span className="opacity-50">-</span>
            <span className="font-semibold tabular-nums">{istTime}</span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-white/40 to-transparent mb-16 md:mb-24"></div>

          {/* Hero Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter leading-none mb-24 md:mb-32 drop-shadow-lg">
            Hi, this is Yuvi.
          </h1>

          {/* Footer Info */}
          <div className="flex flex-col space-y-3 w-full text-lg md:text-xl tracking-wide">
            
            {/* Row 1 */}
            <div className="flex items-center">
                <span className="w-24 md:w-32 opacity-70 font-sans shrink-0">Currently</span>
                <span className="opacity-70 mr-3">→</span>
                <span className="font-bold">Open to Work / Seeking Opportunities</span>
            </div>

            {/* Row 2 */}
            <div className="flex items-center">
                <span className="w-24 md:w-32 opacity-70 font-sans shrink-0">Education</span>
                <span className="opacity-70 mr-3">→</span>
                <span className="font-bold">NITian 🎓</span>
            </div>

            {/* Row 3 */}
            <div className="flex items-center">
              <span className="w-24 md:w-32 opacity-70 font-sans shrink-0">Delivering</span>
              <span className="opacity-70 mr-3">→</span>
              <span className="font-bold flex items-center">
                Smiles <Smile size={20} strokeWidth={2.5} className="ml-2" />
              </span>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-8 left-6 md:left-12 flex flex-col gap-2 opacity-40 animate-pulse">
            <span className="text-xs font-mono uppercase tracking-widest">Scroll for Services</span>
            <ChevronDown size={20} />
          </div>
        </main>

        {/* SERVICES SECTION */}
        <section className="px-6 md:px-12 py-24 md:py-32 text-white">
          <div className="flex items-center mb-16 opacity-80">
             <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Services</h2>
             <span className="ml-4 text-2xl">↓</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div 
              onClick={() => handleServiceClick('UX/UI Design SaaS')}
              className="p-8 rounded-[2.5rem] bg-[#1a1512]/40 border border-white/10 backdrop-blur-md hover:bg-[#2a2420]/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <Layers size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">UX/UI Design Saas</h3>
                <p className="text-white/60 leading-relaxed text-lg font-light">
                    Designing seamless experiences to engage users and drive results.
                </p>
            </div>

            {/* Service 2 */}
            <div 
              onClick={() => handleServiceClick('Re-Design SaaS')}
              className="p-8 rounded-[2.5rem] bg-[#1a1512]/40 border border-white/10 backdrop-blur-md hover:bg-[#2a2420]/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            >
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <Sparkles size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Re-Design Saas</h3>
                <p className="text-white/60 leading-relaxed text-lg font-light">
                    Creating stunning, user-centric redesigning that represent your brand.
                </p>
            </div>

            {/* Service 3 - Vibe Coding */}
            <div 
              onClick={() => handleServiceClick('Vibe Coding')}
              className="p-8 rounded-[2.5rem] bg-[#1a1512]/40 border border-white/10 backdrop-blur-md hover:bg-[#2a2420]/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            >
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <Code size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Vibe Coding</h3>
                <p className="text-white/60 leading-relaxed text-lg font-light">
                    Translating creative vision into pixel-perfect reality with zero friction.
                </p>
            </div>
          </div>
        </section>
      </div>

      {/* Service Inquiry Modal */}
      <ServiceModal 
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        initialService={selectedService || ''}
      />
    </>
  );
};

export default MainContent;
