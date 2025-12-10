
import React, { useState, useEffect } from 'react';
import { FileText, Linkedin, Instagram, Menu, X, ChevronRight } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants';

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    if (label === 'Home') onNavigate('home');
    else if (label === 'Work') onNavigate('work');
    else if (label === 'About') onNavigate('about');
    
    setIsMenuOpen(false); // Close menu on navigation
  };

  // Helper to find link by label
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
        <div className="flex items-center justify-between py-6 md:py-8 px-6 md:px-12 w-full max-w-screen-2xl 2xl:max-w-[1800px] mx-auto">
          {/* Name / Logo */}
          <div 
            className="text-white font-medium text-lg 2xl:text-2xl tracking-wide cursor-pointer hover:opacity-80 transition-opacity z-50 relative"
            onClick={() => {
              onNavigate('home');
              setIsMenuOpen(false);
            }}
          >
            Yuvraj Gupta
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center space-x-8 2xl:space-x-12">
            {NAV_LINKS.map((link) => {
              const isActive = 
                (link.label === 'Home' && currentPage === 'home') ||
                (link.label === 'Work' && currentPage === 'work') || 
                (link.label === 'About' && currentPage === 'about');

              return (
                <a 
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.label)}
                  className={`text-sm 2xl:text-lg font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* DESKTOP SOCIAL ICONS */}
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

          {/* MOBILE MENU BUTTON (Trigger) */}
          <button 
            className="md:hidden text-white p-1 z-50 relative focus:outline-none"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
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
             onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
             }}
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

        {/* Navigation Links */}
        <div className="flex flex-col space-y-6 px-2">
          {NAV_LINKS.map((link, index) => {
            const isActive = 
              (link.label === 'Home' && currentPage === 'home') ||
              (link.label === 'Work' && currentPage === 'work') || 
              (link.label === 'About' && currentPage === 'about');

            return (
              <a 
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.label)}
                className={`text-4xl font-light tracking-tight flex items-center justify-between group ${
                  isActive ? 'text-white' : 'text-white/50'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span>{link.label}</span>
                <ChevronRight 
                  size={24} 
                  className={`opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : ''}`} 
                />
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-10"></div>

        {/* Social Links */}
        <div className="mt-auto mb-10 space-y-4 px-2">
           <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Connect</h3>
           {SOCIAL_LINKS.map((link) => (
             <a 
               key={link.label}
               href={link.href}
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center space-x-4 text-white/70 hover:text-white transition-colors p-2 -mx-2 hover:bg-white/5 rounded-lg"
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
