
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  SpringOptions
} from 'framer-motion';
import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';

export type DockItemData = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
  activeLabel?: string;
  panelHeight?: number;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  isActive: boolean;
};

const DockItem: React.FC<DockItemProps> = ({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  isActive
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);
  
  // Icon lift effect - moves up by 6px as requested
  const iconY = useTransform(mouseDistance, [-distance, 0, distance], [0, -6, 0]);
  const lift = useSpring(iconY, spring);

  // Icon scale effect - scales to 1.2x
  const iconScaleTarget = useTransform(mouseDistance, [-distance, 0, distance], [1, 1.2, 1]);
  const scale = useSpring(iconScaleTarget, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg ${
        isActive 
          ? 'border-[#D69452]/40 bg-[#D69452]/10 shadow-[0_0_20px_-5px_rgba(214,148,82,0.3)]' 
          : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/10'
      } ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {/* Subtle Inner Glow/Texture for that "Magnificent" look */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<any>, { isHovered, lift, scale, isActive })
          : child
      )}
    </motion.div>
  );
};

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

const DockLabel: React.FC<DockLabelProps> = ({ children, className = '', isHovered }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, x: '-50%' }}
          animate={{ opacity: 1, y: -12, x: '-50%' }}
          exit={{ opacity: 0, y: 5, x: '-50%' }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`${className} absolute -top-10 left-1/2 w-fit whitespace-nowrap rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-1.5 text-xs font-medium text-white/90 shadow-xl pointer-events-none z-50`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  lift?: MotionValue<number>;
  scale?: MotionValue<number>;
  isActive?: boolean;
};

const DockIcon: React.FC<DockIconProps> = ({ children, className = '', lift, scale, isActive }) => {
  return (
    <motion.div 
      style={{ y: lift, scale: scale }}
      className={`flex items-center justify-center transition-colors duration-300 ${isActive ? 'text-[#D69452]' : 'text-white/70'} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function Dock({
  items,
  className = '',
  // Tuned spring for a smooth, premium feel
  spring = { mass: 0.1, stiffness: 400, damping: 20 },
  magnification = 60,
  distance = 140,
  baseItemSize = 50,
  activeLabel
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-3xl border border-white/[0.08] bg-[#050505]/80 backdrop-blur-[20px] px-3 py-3 shadow-2xl shadow-black/50 ${className}`}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item, index) => (
        <DockItem
          key={index}
          onClick={item.onClick}
          className={item.className}
          mouseX={mouseX}
          spring={spring}
          distance={distance}
          magnification={magnification}
          baseItemSize={baseItemSize}
          isActive={activeLabel === item.label}
        >
          <DockIcon>{item.icon}</DockIcon>
          <DockLabel>{item.label}</DockLabel>
        </DockItem>
      ))}
    </motion.div>
  );
}
