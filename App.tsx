
import React, { useState } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import MainContent from './components/MainContent';
import About from './components/About';
import Work from './components/Work';
import ClickSpark from './components/ClickSpark';

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'work' | 'about'>('home');

  return (
    <ClickSpark
      sparkColor='rgba(255, 255, 255, 0.5)'
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen w-full flex flex-col font-sans relative bg-gray-900 text-white selection:bg-white/20">
        {/* Background Layer - Dark Noisy Texture */}
        <Background />

        {/* Foreground Content */}
        <Header onNavigate={setPage} currentPage={page} />
        
        {page === 'home' && <MainContent />}
        {page === 'work' && <Work />}
        {page === 'about' && <About />}
      </div>
    </ClickSpark>
  );
};

export default App;
