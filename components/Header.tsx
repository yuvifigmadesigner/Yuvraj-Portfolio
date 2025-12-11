
import React, { useState, useEffect } from 'react';
import { FileText, Linkedin, Instagram, Menu, X } from 'lucide-react';
import { SOCIAL_LINKS, NAV_LINKS } from '../constants';

interface HeaderProps {
  onNavigate: (page: 'home' | 'work' | 'about') => void;
  currentPage: 'home' | 'work' | 'about';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (label: string) => {
    onNavigate(label.toLowerCase() as 'home' | 'work' | 'about');
    setIsMenuOpen(false);
  };

  const getLink = (label: string) => SOCIAL_LINKS.find(l => l.label === label)?.href || '#';

  const getIcon = (label: string) => {
    switch (label) {
      case 'CV': return <FileText size={20} />;
      case 'LinkedIn': return <Linkedin size={20} />;
      case 'Instagram': return <Instagram size={20} />;
      default: return null;
    }
  };

  return (
    <>
      <header className="border-b border-white/10 relative z-20 bg-[#111827]/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none w-full">
        <div className="relative flex items-center justify-between py-6 md:py-8 px-6 md:px-12 w-full max-w-screen-2xl 2xl:max-w-[1800px] mx-auto">
          {/* LEFT: Name / Logo */}
          <div 
            className="text-white font-medium text-lg 2xl:text-2xl tracking-wide cursor-pointer hover:opacity-80 transition-opacity z-30"
            onClick={() => handleNavClick('home')}
          >
            Yuvraj Gupta
          </div>

          {/* CENTER: Desktop Nav (Absolutely Positioned) */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8 2xl:space-x-12 z-20">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.label)}
                className={`text-sm 2xl:text-base tracking-wide transition-colors duration-300 hover:text-white ${
                  currentPage === link.label.toLowerCase() ? 'text-white font-medium' : 'text-white/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* RIGHT: Social Icons (Desktop) & Mobile Toggle */}
          <div className="flex items-center gap-6 z-30">
            {/* Desktop Social Icons */}
            <div className="hidden md:flex items-center space-x-5 2xl:space-x-8 text-white">
              <div className="relative group">
                <a href={getLink('CV')} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity block" aria-label="Resume">
                  <FileText size={20} strokeWidth={1.5} className="2xl:w-6 2xl:h-6" />
                </a>
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/5 text-white text-[10px] uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">Resume</span>
              </div>
              <div className="relative group">
                <a href={getLink('LinkedIn')} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity block" aria-label="LinkedIn">
                  <Linkedin size={20} strokeWidth={1.5} className="2xl:w-6 2xl:h-6" />
                </a>
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/5 text-white text-[10px] uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">LinkedIn</span>
              </div>
              <div className="relative group">
                <a href={getLink('Instagram')} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity block" aria-label="Instagram">
                  <Instagram size={20} strokeWidth={1.5} className="2xl:w-6 2xl:h-6" />
                </a>
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-sm border border-white/5 text-white text-[10px] uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">Instagram</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-1 focus:outline-none"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-[#0d1117]/95 backdrop-blur-2xl z-50 transition-all duration-500 ease-in-out md:hidden flex flex-col px-6 md:px-12 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        {/* Mobile Header Inside Overlay */}
        <div className="flex items-center justify-between py-6 md:py-8 border-b border-white/10 mb-8">
           <div 
             className="text-white font-medium text-lg tracking-wide cursor-pointer"
             onClick={() => handleNavClick('home')}
           >
             Yuvraj Gupta
           </div>
           
           <button 
             className="text-white p-1 focus:outline-none"
             onClick={() => setIsMenuOpen(false)}
             aria-label="Close menu"
           >
             <X size={28} />
           </button>
        </div>

        {/* Mobile Nav Links */}
        <div className="flex flex-col items-center justify-center space-y-8 flex-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.label)}
              className={`text-3xl font-light tracking-tight transition-colors duration-300 ${
                currentPage === link.label.toLowerCase() ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="w-12 h-px bg-white/10 my-8"></div>
        </div>

        {/* Mobile Social Links */}
        <div className="mb-10 space-y-4 px-2">
           <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4 text-center">Connect</h3>
           {SOCIAL_LINKS.map((link) => (
             <a 
               key={link.label}
               href={link.href}
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center space-x-4 text-white/70 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/5"
             >
               {getIcon(link.label)}
               <span className="text-lg font-light">{link.label === 'CV' ? 'Resume' : link.label}</span>
             </a>
           ))}
        </div>
      </div>
    </>
  );
};

export default Header;
