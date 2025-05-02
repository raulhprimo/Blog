import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(50);
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setShowContent(false);
          }, 500);
        }, 500);
      }, 800);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!showContent) return null;

  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col transition-all duration-500 ${isExiting ? 'opacity-0 backdrop-blur-none' : 'opacity-100 backdrop-blur-sm'}`}>
      {/* Barra de Progresso */}
      <div className="w-full h-[2px] sm:h-1 bg-neutral-800">
        <div 
          className="h-full bg-[var(--primary)] transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Conteúdo Central */}
      <div className="flex-1 flex items-center justify-center px-4">
        <h1 className="text-[4rem] sm:text-[8rem] md:text-[12rem] lg:text-[15rem] font-bold text-white tracking-tighter">
          <span className="text-[var(--primary)] inline-block transform hover:scale-105 transition-transform duration-300">M</span>
          <span className="inline-block transform hover:scale-105 transition-transform duration-300">B</span>
          <span className="text-[var(--primary)] inline-block transform hover:scale-105 transition-transform duration-300">H</span>
        </h1>
      </div>

      {/* Texto de Progresso */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8">
        <span className="text-neutral-600 text-xs sm:text-sm font-medium">
          ({progress}%)
        </span>
      </div>
    </div>
  );
} 