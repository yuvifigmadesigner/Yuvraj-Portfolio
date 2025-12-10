import React, { useEffect, useRef } from 'react';
import { BACKGROUND_IMAGE_URL } from '../constants';

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
          // Create a soft spotlight gradient centered on the cursor
          spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.10), transparent 80%)`;
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
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Base Image */}
      <img 
        src={BACKGROUND_IMAGE_URL} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      
      {/* 2. Heavy Blur Layer */}
      <div className="absolute inset-0 backdrop-blur-[120px] bg-black/40"></div>

      {/* 3. Interactive Spotlight */}
      <div 
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(600px circle at 50% 50%, rgba(255, 255, 255, 0.10), transparent 80%)'
        }}
      ></div>

      {/* 4. Noise Overlay */}
      {/* We use mix-blend-overlay or soft-light to blend the grain with the blurred image */}
      <div className="absolute inset-0 bg-noise opacity-[0.22] mix-blend-overlay"></div>
      
      {/* 5. Gradient Vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
    </div>
  );
};

export default Background;