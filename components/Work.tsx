import React from 'react';
import { SIDE_PROJECTS } from '../constants';
import { ArrowRight } from 'lucide-react';
import LightRays from './LightRays';

const ProjectCard: React.FC<{ project: typeof SIDE_PROJECTS[0], index: number }> = ({ project, index }) => {
  // Acrylic Glass Effect with Warm Tint
  // Enhanced hover states:
  // - bg becomes more opaque/warmer
  // - backdrop blur increases
  // - border becomes more visible
  const glassClasses = 'bg-[#1a1512]/60 backdrop-blur-xl border border-white/10 text-white shadow-2xl hover:bg-[#2a2420]/80 hover:backdrop-blur-2xl hover:border-white/30';

  return (
    <a 
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col rounded-[2.5rem] p-6 md:p-8 h-[580px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${glassClasses}`}
      style={{
        opacity: 0,
        animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.15 + 0.1}s`
      }}
    >
      {/* Header Tags */}
      <div className="flex flex-wrap items-center gap-3 mb-8 relative z-10">
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-white/5 text-white/90">
          {project.date}
        </span>
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-white/5 text-white/90">
          {project.role}
        </span>
        {/* Glowing Warm Dot */}
        <div className="ml-auto w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <div className="w-2 h-2 bg-orange-300 rounded-full shadow-[0_0_10px_rgba(253,186,116,0.6)]"></div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 mb-8">
        <h3 className="text-4xl md:text-5xl font-bold leading-[1.05] mb-4 tracking-tight drop-shadow-md">
          {project.title}
        </h3>
        <p className="text-lg font-medium opacity-70 leading-relaxed max-w-sm text-white/80">
          {project.description}
        </p>
      </div>

      {/* Image Section */}
      <div className="mt-auto relative w-full flex-1 min-h-[240px] rounded-[1.5rem] overflow-hidden group/image shadow-inner bg-black/30 border border-white/5">
         <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
         />
         
         {/* Overlay Gradient */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

         {/* Floating Action Button */}
         <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white pl-5 pr-2 py-2 rounded-full text-sm font-bold flex items-center justify-between gap-3 shadow-lg transition-all duration-300 group-hover/btn hover:pl-6 hover:bg-white hover:text-black hover:border-white w-full max-w-[160px] group-hover-pulse">
              <span>Read More</span>
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </button>
         </div>
      </div>
    </a>
  );
};

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

      <main className="flex-1 flex flex-col justify-start px-6 md:px-12 relative z-10 text-white w-full max-w-7xl mx-auto pt-12 md:pt-24 pb-20">
          {/* Header Section */}
          <div className="mb-12 md:mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">Work.</h1>
              <div className="w-16 h-1 bg-white/20"></div>
          </div>

          {/* Cards Container - Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
              {SIDE_PROJECTS.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
              ))}
          </div>
      </main>
    </>
  );
};

export default Work;