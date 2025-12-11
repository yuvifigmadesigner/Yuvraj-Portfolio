
import React, { useRef } from 'react';
import { SIDE_PROJECTS } from '../constants';
import { ArrowRight, Quote, Hammer, Sparkles, Clock } from 'lucide-react';
import LightRays from './LightRays';
import StarBorder from './StarBorder';

const ProjectCard: React.FC<{ project: typeof SIDE_PROJECTS[0], index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Acrylic Glass Effect with Warm Tint
  const glassClasses = 'bg-[#1a1512]/60 backdrop-blur-xl border border-white/10 text-white shadow-2xl hover:bg-[#2a2420]/80 hover:backdrop-blur-2xl hover:border-white/30';

  return (
    <a 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col rounded-[2.5rem] p-6 md:p-8 2xl:p-12 h-[500px] 2xl:h-[600px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${glassClasses}`}
      style={{
        opacity: 0,
        animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.15 + 0.1}s`
      }}
    >
      {/* Glare Effect Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-50 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.15), transparent 40%)`
        }}
      />

      {/* Header Tags */}
      <div className="flex flex-wrap items-center gap-3 mb-8 relative z-10 2xl:mb-12">
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 2xl:px-6 2xl:py-2.5 rounded-full text-xs 2xl:text-sm font-bold uppercase tracking-wider shadow-sm border border-white/5 text-white/90">
          {project.date}
        </span>
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 2xl:px-6 2xl:py-2.5 rounded-full text-xs 2xl:text-sm font-bold uppercase tracking-wider shadow-sm border border-white/5 text-white/90">
          {project.role}
        </span>
        {/* Glowing Warm Dot */}
        <div className="ml-auto w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <div className="w-2 h-2 2xl:w-3 2xl:h-3 bg-orange-300 rounded-full shadow-[0_0_10px_rgba(253,186,116,0.6)]"></div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 mb-8 2xl:mb-12">
        <h3 className="text-4xl md:text-5xl 2xl:text-6xl font-bold leading-[1.05] mb-4 tracking-tight drop-shadow-md">
          {project.title}
        </h3>
        <p className="text-lg 2xl:text-2xl font-medium opacity-70 leading-relaxed max-w-md 2xl:max-w-xl text-white/80">
          {project.description}
        </p>
      </div>

      {/* Image Preview Section */}
      <div className="mt-auto relative w-[calc(100%+3rem)] md:w-[calc(100%+4rem)] 2xl:w-[calc(100%+6rem)] -mx-6 md:-mx-8 2xl:-mx-12 -mb-6 md:-mb-8 2xl:-mb-12 h-[220px] md:h-[260px] 2xl:h-[320px] overflow-hidden group/image shadow-inner bg-black/30 border-t border-white/5">
         {/* Static Image with Eager Loading and High Priority */}
         <img 
            src={project.image} 
            alt={project.title}
            referrerPolicy="no-referrer"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
         />
         
         {/* Overlay Gradient */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

         {/* Floating Action Button */}
         <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 2xl:bottom-12 2xl:left-12 2xl:right-12 flex justify-between items-end">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white pl-5 pr-2 py-2 2xl:pl-8 2xl:pr-3 2xl:py-3 rounded-full text-sm 2xl:text-lg font-bold flex items-center justify-between gap-3 shadow-lg transition-all duration-300 group-hover/btn hover:pl-6 hover:bg-white hover:text-black hover:border-white w-full max-w-[160px] 2xl:max-w-[200px] group-hover-pulse">
              <span>Read More</span>
              <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                <ArrowRight size={14} strokeWidth={2.5} className="2xl:w-5 2xl:h-5" />
              </div>
            </button>
         </div>
      </div>
    </a>
  );
};

const ComingSoonCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group lg:col-span-2 relative flex flex-row items-center justify-between rounded-[2.5rem] p-6 md:p-10 2xl:p-16 h-[250px] 2xl:h-[320px] bg-white/5 border-2 border-dashed border-white/10 text-white/40 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden"
      style={{
          opacity: 0,
          animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${(SIDE_PROJECTS.length) * 0.15 + 0.1}s`
      }}
    >
        {/* Glare Effect Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 z-50 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 40%)`
          }}
        />

        <div className="flex items-center gap-6 md:gap-10 relative z-10">
            <div className="w-20 h-20 md:w-24 md:h-24 2xl:w-32 2xl:h-32 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shrink-0">
              <Clock size={40} className="text-white/30 animate-pulse 2xl:w-16 2xl:h-16" />
            </div>
            <div className="text-left">
              <h3 className="text-3xl md:text-4xl 2xl:text-6xl font-bold mb-2 tracking-tight text-white/50 group-hover:text-white/70 transition-colors">Coming Soon</h3>
              <div className="flex items-center gap-2 text-white/30 text-sm md:text-base 2xl:text-xl">
                  <Sparkles size={16} className="2xl:w-6 2xl:h-6" />
                  <span className="font-mono uppercase tracking-widest">Cooking something special</span>
              </div>
            </div>
        </div>
        
        {/* Decorative element for wide card */}
        <div className="hidden md:block opacity-10 group-hover:opacity-20 transition-opacity relative z-10">
          <Hammer size={120} strokeWidth={1} />
        </div>
    </div>
  );
};

// Testimonials Data
const TESTIMONIALS = [
  {
    name: "Siddharth Manjrekar",
    role: "Startup Founder of Frover",
    text: "Yuvi transformed our clumsy MVP into a sleek, user-friendly product. His 'vibe coding' isn't just a buzzword; he actually understands the soul of the product and delivered beyond expectations.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Priya Sharma",
    role: "Product Manager, InnovateX",
    text: "Rarely do you find a designer who understands code this well. Handing off designs was a breeze, and the final output was pixel-perfect. Highly recommended for complex SaaS projects.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Vikram Malhotra",
    role: "Co-founder, GreenLeaf",
    text: "Fast, responsive, and incredibly creative. He took our vague ideas and turned them into a stunning reality. The animations he added gave our app a premium feel.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80"
  }
];

const Work: React.FC = () => {
  return (
    <>
      {/* LightRays Background for Work Page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/60"></div>
        <LightRays
          raysOrigin="top-center"
          raysColor="#D69452"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.3}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <main className="flex-1 flex flex-col justify-start px-6 md:px-12 relative z-10 text-white w-full max-w-screen-2xl 2xl:max-w-[1800px] mx-auto pt-12 md:pt-24 pb-20 2xl:pt-32">
          {/* Header Section */}
          <div className="mb-12 md:mb-16 2xl:mb-24 animate-fade-in">
              <h1 className="text-5xl md:text-7xl 2xl:text-9xl font-medium tracking-tight mb-6">Work.</h1>
              <div className="w-16 h-1 2xl:w-24 2xl:h-1.5 bg-white/20"></div>
          </div>

          {/* Cards Container - Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:gap-16 w-full mb-32">
              {SIDE_PROJECTS.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
              ))}
              
              <ComingSoonCard />
          </div>

          {/* Testimonials Section */}
          <div className="animate-fade-in pb-12">
            <h2 className="text-xs 2xl:text-sm font-mono uppercase tracking-widest text-white/50 mb-8 2xl:mb-12">/ Kind Words</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-10">
              {TESTIMONIALS.map((t, i) => (
                <StarBorder key={i} as="div" className="h-full" color="#D69452" speed="8s">
                  <div 
                    className="p-8 2xl:p-10 flex flex-col h-full"
                  >
                    {/* Quote Icon */}
                    <div className="mb-6 opacity-30 text-white group-hover:opacity-60 transition-opacity">
                      <Quote size={32} className="2xl:w-10 2xl:h-10" />
                    </div>

                    {/* Text */}
                    <p className="text-white/70 text-lg 2xl:text-2xl leading-relaxed font-light mb-8 flex-1 italic">
                      "{t.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <img 
                          src={t.image} 
                          alt={t.name}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium 2xl:text-xl">{t.name}</div>
                        <div className="text-white/40 text-sm 2xl:text-base">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </StarBorder>
              ))}
            </div>
          </div>
      </main>
    </>
  );
};

export default Work;
