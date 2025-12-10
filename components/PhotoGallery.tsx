
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SphereItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

// Unsplash photography collection - Expanded for better sphere density
const IMAGES = [
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80", // Nature/Landscape
  "https://images.unsplash.com/photo-1518173946687-a4c88928d9fd?w=800&q=80", // Minimalist
  "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=800&q=80", // Architecture
  "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=800&q=80", // Texture
  "https://images.unsplash.com/photo-1542202229-7d9322d5b13d?w=800&q=80", // Urban
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80", // Nature
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80", // Dark
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", // Fog
  "https://images.unsplash.com/photo-1501854140884-074cf27f70c0?w=800&q=80", // Colors
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80", // Forest
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80", // Abstract
  "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80", // Modern
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", // Portrait
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", // Portrait
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", // Portrait
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", // Portrait
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80", // People
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80", // People
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", // Fashion
  "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=800&q=80", // Art
];

const ITEMS: SphereItem[] = IMAGES.map((img, i) => ({
  id: i,
  image: img,
  title: `Capture 0${i + 1}`,
  description: "Shot on 35mm film."
}));

interface PhotoGalleryProps {
  onClose: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const autoRotateSpeed = useRef({ x: 0.08, y: 0.12 });

  // Geometry configuration
  // High Scale Ratio: Perspective (P) is close to Radius (R).
  // Formula: Scale = P / (P + z). 
  // At z = -R (Front), Scale = P / (P - R).
  // By keeping P close to R, we get huge magnification at the front, and normal size at sides.
  const [config, setConfig] = useState({ radius: 260, itemSize: 35, perspective: 320 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: High magnification, very small base size
        setConfig({ radius: 120, itemSize: 20, perspective: 145 }); 
      } else if (width < 1024) {
        // Tablet
        setConfig({ radius: 180, itemSize: 28, perspective: 220 });
      } else {
        // Desktop: Front scale ~5.3x (186px), Side scale ~1x (35px)
        setConfig({ radius: 260, itemSize: 35, perspective: 320 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sphere configuration
  const count = ITEMS.length;

  // Generate initial Fibonacci sphere points
  const initialPoints = useMemo(() => {
    const points: { x: number; y: number; z: number; id: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // Radius at y
      const theta = phi * i; // Golden angle increment

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      points.push({
        x: x * config.radius,
        y: y * config.radius,
        z: z * config.radius,
        id: ITEMS[i].id
      });
    }
    return points;
  }, [count, config.radius]);

  // Handle animation loop
  const animate = () => {
    if (!isDragging && selectedId === null) {
      setRotation(prev => ({
        x: prev.x + autoRotateSpeed.current.x,
        y: prev.y + autoRotateSpeed.current.y
      }));
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isDragging, selectedId]);

  // Project 3D points to 2D screen
  const projectedPoints = useMemo(() => {
    const cosX = Math.cos(rotation.x * 0.01);
    const sinX = Math.sin(rotation.x * 0.01);
    const cosY = Math.cos(rotation.y * 0.01);
    const sinY = Math.sin(rotation.y * 0.01);

    return initialPoints.map(point => {
      // Rotate around Y axis
      let x = point.x * cosY - point.z * sinY;
      let z = point.z * cosY + point.x * sinY;
      
      // Rotate around X axis
      let y = point.y * cosX - z * sinX;
      z = z * cosX + point.y * sinX;

      // Perspective projection
      const scale = config.perspective / (config.perspective + z); 
      
      // Opacity: sharper drop-off to emphasize front
      const distRatio = (z + config.radius) / (2 * config.radius); // 0 at front, 1 at back
      const opacity = Math.max(0.15, 1 - Math.pow(distRatio, 0.8)); // Non-linear fade

      return {
        ...point,
        x, // 3d x
        y, // 3d y
        z, // 3d z
        scale,
        opacity,
        px: x * scale, 
        py: y * scale  
      };
    }).sort((a, b) => b.z - a.z); 
  }, [rotation, initialPoints, config.radius, config.perspective]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (selectedId !== null) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleItemClick = (id: number) => {
    if (isDragging) return;
    setSelectedId(id);
  };

  const selectedItem = ITEMS.find(item => item.id === selectedId);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl touch-none cursor-move animate-fade-in"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      ref={containerRef}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[70] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
      >
        <X size={24} />
      </button>

      {/* 3D Sphere Container */}
      <div className="relative w-full h-full flex items-center justify-center perspective-container">
        {projectedPoints.map((point) => {
          const item = ITEMS.find(i => i.id === point.id)!;
          
          return (
            <motion.div
              key={point.id}
              layoutId={`item-${point.id}`}
              className="absolute rounded-full shadow-2xl bg-black border border-white/10 p-0.5 cursor-pointer hover:border-white/40 transition-colors"
              style={{
                x: point.px,
                y: point.py,
                // High Z-index for front items
                zIndex: Math.floor(config.radius * 2 - point.z),
                scale: point.scale,
                opacity: point.opacity,
                width: `${config.itemSize}px`,
                height: `${config.itemSize}px`,
              }}
              onClick={(e) => {
                 e.stopPropagation();
                 handleItemClick(point.id);
              }}
              whileHover={{ scale: point.scale * 1.25, zIndex: 5000 }}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Selected Item Modal */}
      <AnimatePresence>
        {selectedId !== null && selectedItem && (
          <div className="absolute inset-0 z-[2000] flex items-center justify-center p-4 cursor-default">
             <motion.div 
               className="absolute inset-0 bg-black/90"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedId(null)}
             />
             
             <motion.div
               layoutId={`item-${selectedId}`}
               className="relative bg-[#1a1512] border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               onClick={(e) => e.stopPropagation()}
             >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors border border-white/10"
                >
                  <X size={20} />
                </button>
                
                <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center h-[50vh] md:h-auto">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="w-full h-full object-contain md:object-cover"
                  />
                </div>
                
                <div className="p-8 md:w-80 bg-[#1a1512] text-white flex flex-col justify-center">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Portfolio</div>
                  <h3 className="text-3xl font-bold mb-4">{selectedItem.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    {selectedItem.description} Captured during my travels. I look for natural lighting and interesting textures that tell a story without words.
                  </p>
                  <div className="mt-auto">
                      <div className="h-px w-full bg-white/10 mb-4"></div>
                      <span className="text-xs text-white/30 font-mono">ISO 400 • f/2.8 • 1/125s</span>
                  </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Instructions */}
      {selectedId === null && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.2em] font-mono pointer-events-none select-none text-center uppercase animate-pulse">
          Drag to Rotate &bull; Click to Expand
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
