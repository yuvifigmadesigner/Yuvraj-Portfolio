
import React, { useState } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import MainContent from './components/MainContent';
import About from './components/About';
import Work from './components/Work';

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'work' | 'about'>('home');

  return (
    <div className="min-h-screen w-full flex flex-col font-sans relative bg-gray-900 text-white selection:bg-white/20">
      {/* Background Layer */}
      <Background />

      {/* Foreground Content */}
      <Header onNavigate={setPage} currentPage={page} />
      
      {page === 'home' && <MainContent />}
      {page === 'work' && <Work />}
      {page === 'about' && <About />}
    </div>
  );
};

export default App;
