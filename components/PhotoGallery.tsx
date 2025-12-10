
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SphereItem {
  id: number;
  image: string;
  title: string;
  description: string;
  settings: string;
}

const ITEMS: SphereItem[] = [
  {
    id: 0,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493877707f642afe2037e80a5a0ee3dd21f7dfb68a5b412d307352d49774d01081b0e07acb2fbdc3e2de32689cff6ca228329849b9d368db3c2af4396b05df177b6",
    title: "Golden Hour Silhouette",
    description: "The sun dipped low, painting the world in warm hues. For a fleeting moment, everything felt suspended in time, bathed in liquid gold.",
    settings: "ISO 100 • f/1.8 • 1/500s"
  },
  {
    id: 1,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493903f85fa81066ead06a29c3a5f88c9265e96afb59563e6ad0109071ea9ef1083309383005549e328ad99a859c69b1c2d983569f7b752eb792a6ffd3eb0b78477",
    title: "Urban Echoes",
    description: "The city breathes in patterns of concrete and light. Every corner holds a secret, every shadow tells the story of a million passersby.",
    settings: "ISO 200 • f/2.2 • 1/120s"
  },
  {
    id: 2,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af1949353248c0a75a1f0061f441f183375497d4ddaeee46cbb402613c36d77659e1f3e6023483859483b3a7f250ea9e76a17b39913cbb7e7b26b6e294eb18885141828",
    title: "Evening Calm",
    description: "That fleeing moment of blue hour, where the day's noise settles into a whisper, and the world feels perfectly still.",
    settings: "ISO 400 • f/1.7 • 1/60s"
  },
  {
    id: 3,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493e3880e07e6ca1af4590a4c5e3300d8941be52e21455a4b3f52d905198a8c7900432cc1b91784e6fa531b4f729289ae60efa9ca88f4c80c28a8dfd710163dd264",
    title: "Infinite Horizons",
    description: "Standing at the edge where the sky meets the earth. A reminder of how small we are and how vast the possibilities can be.",
    settings: "ISO 50 • f/2.2 • 1/1000s"
  },
  {
    id: 4,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af194937c852ba78df0c802a3d4ea5d9a6ba0964b0a69ae7590028afb23190b5c403b242696855f4b5b555ae845776defe2973a2676c88aac91069788e5f1c5364adb13",
    title: "Dusk Reflections",
    description: "Water mirroring the sky's mood. A dual reality where the ripples distort the truth into something dreamlike and surreal.",
    settings: "ISO 150 • f/1.8 • 1/200s"
  },
  {
    id: 5,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493c9e84c9e1e70857ce124f461ea7cff110f6805bfc69ab7eda268ad1cb8ca0b8f6b4b2ebc6efb92dfaf863973ba82e10326702ef3328dc0d17a2e03b4563ddca5",
    title: "Nature's Palette",
    description: "Green isn't just a color; it's a feeling of life. The forest floor hums with the silent, vibrant energy of growth.",
    settings: "ISO 100 • f/1.9 • 1/400s"
  },
  {
    id: 6,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493dbd2a2a858959c4359c6aea9ae343a58829cee46203bd4896a230062b7b6d5d0f29d553c4457dece5de78dae2fd129a05bb0da4c3e00db4a35bc5a961bc3f482",
    title: "Afternoon Light",
    description: "The sun at its peak, unapologetic and bright. It carves shapes out of the mundane, turning the ordinary into art.",
    settings: "ISO 50 • f/2.4 • 1/1200s"
  },
  {
    id: 7,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493996c4f56797370c9e8853d1557e4599b1506b71c433c15ddc5cf53a030f0ebe46404a09c68466ba524a3a39ea98abedb42c8f65ab7bdba368fa2592f122b7cb6",
    title: "Night Mode",
    description: "When the lights go out, the real city wakes up. Neon pulses like a heartbeat in the dark, guiding the wanderers home.",
    settings: "ISO 1200 • f/1.6 • 1/15s"
  },
  {
    id: 8,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af1949395c4b4c6a5eae38449ef6cd3d8df02d86f0a61c296424eb53b791825178c97257fc5e189aca78fc46aa072e8aafda96fd5e7c632f74e8c5bcebe0610328d46b1",
    title: "Steel Giants",
    description: "Reaching for the clouds, a testament to human ambition. Standing tall against the passage of time and the shifting elements.",
    settings: "ISO 100 • f/2.0 • 1/320s"
  },
  {
    id: 9,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493bb385c636c58c1e3b7b79eb1cb01b13be1e7e002fb2fe174ee4abdd75156ecea9af6a0fff296a12888a1457f140c9ce63a2878dc5b47200c8cf959f854eb6832",
    title: "Drifting Thoughts",
    description: "Soft cotton castles building and dissolving in the blue. A gentle reminder that nothing stays the same, and that is beautiful.",
    settings: "ISO 50 • f/2.2 • 1/800s"
  },
  {
    id: 10,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493493ac320ff064faee32040a1f1e684376ca5ad2fd8af378d2829af39e12e3c573a2f91417633eac5484408a56e24992e2a94e4a06af10de59a4ec58416dcd291",
    title: "Street Candid",
    description: "A split second frozen forever. The laughter, the rush, the fleeting glance—life happening in the blink of an eye.",
    settings: "ISO 200 • f/1.8 • 1/250s"
  },
  {
    id: 11,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493416a0456074bb278309dd6227466dd1d9c22206671e6ddf111090f7072ebf1e65e202d411ee4e084e492cc26868946d7a467748c5f2e34e53e838c08b7ca5d61",
    title: "Foliage Detail",
    description: "The veins of a leaf, a map of life itself. Nature's intricate design, perfect in its imperfection, revealing a hidden world.",
    settings: "ISO 100 • f/2.0 • 1/160s"
  },
  {
    id: 12,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493470f5acb92fe5cd5f077ebb2d0fee487b10c0698b508c4f65cad8761e073873b3e79eb09462e2a3b9e326b916b77c14acc402a74ea42e20a40c1bf766cfa92df",
    title: "Shadow Play",
    description: "Light cannot exist without darkness. The dance between the two creates the drama of existence, shaping the world we see.",
    settings: "ISO 125 • f/2.4 • 1/500s"
  },
  {
    id: 13,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af1949343e782ef10a3aef5139a2e7c59b41d578ef4ca2b9813d71d09f9d5bb2b180d45b55c306952ded425bb421ae658eac9ac388fe451de9347c3404a75c57b58cc14",
    title: "Quiet Corner",
    description: "The warmth of a lamp, the texture of a chair. Spaces that hold our quietest thoughts and offer a sanctuary from the noise.",
    settings: "ISO 800 • f/1.7 • 1/40s"
  },
  {
    id: 14,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493fceefcef4be5e7981a8861578046bacfaceb1c6a46c100827b7e17fb3c573acb9f80740b0f9c94cbab18a537797a0a76223500f68dfc04df98327fc03b34c880",
    title: "Neon Nights",
    description: "Electric dreams buzzing in the rain. The colors bleed into the pavement, painting the night in vivid shades of cyberpunk.",
    settings: "ISO 640 • f/1.8 • 1/30s"
  },
  {
    id: 15,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493550149c45ee3d9bce1260f63b85c0148228b69e7079dedca93cc02ed295f3621c1bdc667c8a3099edfc65a8122ee0d7b18715397b13090a8b3823040451ac9a8",
    title: "Glass & Water",
    description: "Looking through the glass, seeing a world reversed. Is the reflection more real than the object standing before it?",
    settings: "ISO 160 • f/2.0 • 1/120s"
  },
  {
    id: 16,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af1949322745225e342e9d044e1e28fc6627b2e16e16515a0ca58c5cf0307ac2b23a435cb966d9a43bcaa6296e4fcffad58c57988323139f0f253fb1c2fb10ab798c49d",
    title: "Macro World",
    description: "The universe in a grain of sand. Zooming in reveals landscapes invisible to the naked eye, a hidden world waiting to be found.",
    settings: "ISO 200 • f/2.4 • 1/100s"
  },
  {
    id: 17,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af1949343e782ef10a3aef5139a2e7c59b41d57d7f828f08d23249646e5e10d21da0fb1237494ed809800ecc8bcf19a121982caa5d53d4ba11ad5d5f3dd60a3be0cd2c0",
    title: "Leading Lines",
    description: "Follow the path. It draws you in, guiding your gaze toward a destination unknown, promising an adventure just around the bend.",
    settings: "ISO 100 • f/2.2 • 1/300s"
  },
  {
    id: 18,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af1949375e9e631ec52c34e81486ef69b2c8e5ebf1ac84a8926717fd09eb6253974f6e584c48c8c30fef5502f660cd198ef2b1ccbfdecf8990f159a0e59f9ff6bef83f1",
    title: "Minimalist Sky",
    description: "Less is more. A single bird, a lone cloud. The beauty of emptiness allowing the mind to breathe and the soul to rest.",
    settings: "ISO 50 • f/1.8 • 1/2000s"
  },
  {
    id: 19,
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493437d4ef3cef5530bd9e38cb8b8a5f87a7b41a595a29fafc8a36d81fd096a1f0b17c17ad2f9ddd28df576de11e6ed6f01cf646bb15471b5562ba14b7210a88a44",
    title: "Perfect Symmetry",
    description: "Balance in chaos. Finding the perfect mirror image in a messy world, satisfying the deep human craving for order and harmony.",
    settings: "ISO 100 • f/2.0 • 1/500s"
  }
];

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
  const autoRotateSpeed = useRef({ x: 0.2, y: 0.25 }); // Slightly increased auto-rotation

  // Geometry configuration
  const [config, setConfig] = useState({ radius: 260, itemSize: 35, perspective: 320 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const minDimension = Math.min(width, height);
      const isMobile = width < 768;

      // REDUCED RADIUS: Sphere takes up ~25% (was 35%) of smallest dimension for a tighter cluster
      let targetRadius = minDimension * 0.25;

      if (isMobile) {
        // Mobile Clamps
        targetRadius = Math.max(targetRadius, 100);
        targetRadius = Math.min(targetRadius, 150);
      } else {
        // Desktop Clamps: 
        targetRadius = Math.max(targetRadius, 180); 
        targetRadius = Math.min(targetRadius, 300); 
      }

      // Fisheye Effect: Keep perspective close to radius
      // 1.2 is tight enough to magnify front items significantly
      const perspective = targetRadius * 1.2;

      // Item Size: INCREASED base ratio (0.22 vs 0.14) 
      // This compensates for the smaller radius, keeping images large enough to see
      let itemSize = targetRadius * 0.22;
      // Clamp item size for usability
      itemSize = Math.max(30, Math.min(itemSize, 70));

      setConfig({
        radius: targetRadius,
        itemSize: itemSize,
        perspective: perspective
      });
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
      <div className="relative w-full h-full flex items-center justify-center perspective-container overflow-hidden">
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
                referrerPolicy="no-referrer"
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
                
                <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center h-[40vh] md:h-auto">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain md:object-cover"
                  />
                </div>
                
                <div className="p-8 md:w-80 bg-[#1a1512] text-white flex flex-col justify-center">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Portfolio</div>
                  <h3 className="text-3xl font-bold mb-4">{selectedItem.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    {selectedItem.description}
                  </p>
                  <div className="mt-auto">
                      <div className="h-px w-full bg-white/10 mb-4"></div>
                      <span className="text-xs text-white/30 font-mono">{selectedItem.settings}</span>
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
