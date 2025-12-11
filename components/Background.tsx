import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for performance to sync with screen refresh
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          const x = e.clientX;
          const y = e.clientY;
          // Create a soft warm spotlight gradient centered on the cursor
          spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 200, 120, 0.1), transparent 80%)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#0f0a06]">
      {/* 1. Warm Ambient Base - Dark Honey/Amber gradients */}
      
      {/* Deep Brown/Amber Base Layer */}
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,_#3d2412_0%,_transparent_70%)] blur-[100px] opacity-100"></div>
      
      {/* Rich Honey Accent (Bottom Right) */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,_#593410_0%,_transparent_70%)] blur-[100px] opacity-80"></div>
      
      {/* Subtle Golden Glow (Center/Floating) */}
      <div className="absolute top-[30%] left-[20%] w-[60%] h-[60%] rounded-full bg-[#784818] blur-[160px] opacity-20 animate-pulse"></div>

      {/* 2. Interactive Spotlight */}
      <div 
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(600px circle at 50% 50%, rgba(255, 200, 120, 0.08), transparent 80%)'
        }}
      ></div>

      {/* 3. Noise Overlay - Increased Opacity for texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.45] mix-blend-overlay"></div>
      
      {/* 4. Vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60"></div>
    </div>
  );
};

export default Background;