"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun, Globe } from "phosphor-react";
import { Avatar } from "@/components/Avatar";
import { ScrollIndicator } from "@/components/ScrollIndicator";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<"PT-BR" | "EN-US">("PT-BR");
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  // Aplicar o tema ao elemento HTML quando o componente montar ou o tema mudar
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Verificar preferência do sistema ao carregar
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Fechar o menu de idiomas quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-menu') && !target.closest('.language-button')) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLanguage = (newLanguage: "PT-BR" | "EN-US") => {
    setLanguage(newLanguage);
    setShowLanguageMenu(false);
  };

  const posts = [
    {
      id: 1,
      title: "5 Innovative Gadgets You Need to Know About in 2025",
      excerpt: "Discover the most surprising devices of the year that promise to make your routine easier.",
      date: "5 de Março, 2025",
      author: "Username",
    },
    {
      id: 2,
      title: "Os 10 Melhores Aplicativos para Aumentar Sua Produtividade",
      date: "5 de Março, 2025",
      author: "Username",
    },
    {
      id: 3,
      title: "Como a Inteligência Artificial Está Revolucionando o Mercado de Trabalho",
      date: "17 de Março, 2025",
      author: "Username",
    },
    {
      id: 4,
      title: "Blockchain Além das Criptomoedas: Como Esta Tecnologia Está Mudando o Mundo",
      date: "19 de Março, 2025",
      author: "Username",
    },
    {
      id: 5,
      title: "Computação Quântica: O Próximo Salto na Tecnologia",
      date: "23 de Março, 2025",
      author: "Username",
    },
    {
      id: 6,
      title: "Realidade Aumentada vs. Realidade Virtual: Qual é o Futuro do Entretenimento?",
      date: "27 de Março, 2025",
      author: "Username",
    },
    {
      id: 7,
      title: "Carros Autônomos: Quando Não Precisaremos Mais Dirigir?",
      date: "2 de Fevereiro, 2025",
      author: "Username",
    },
    {
      id: 8,
      title: "A Ascensão do 6G: O que Esperar da Próxima Geração de Internet Móvel?",
      date: "7 de Fevereiro, 2025",
      author: "Username",
    }
  ];

  // Desktop layout
  const DesktopLayout = () => (
    <div className="flex h-full w-full">
      {/* Coluna Esquerda */}
      <div className="w-[45%] flex flex-col gap-4">
        {/* Post em Destaque */}
        <div className="bg-lime-300 dark:bg-[var(--primary)] flex flex-col relative rounded-md h-3/5 p-0">
          {/* Decorative dots */}
          <div className="absolute top-4 left-4 flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-gray-700/50 dark:bg-white/50"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700/50 dark:bg-white/50"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700/50 dark:bg-white/50"></div>
          </div>
          {/* Arrow icon */}
          <div className="absolute top-4 right-4">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="transform rotate-45"
            >
              <path 
                d="M5 19L19 5M19 5V19M19 5H5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          {/* Conteúdo do Post - Alinhado na parte inferior */}
          <div className="flex flex-col justify-end h-full p-8">
            <h1 className="text-[1.75rem] leading-tight font-bold text-[#333] dark:text-[#111] mb-2">
              {posts[0].title}
            </h1>
            <p className="text-[0.95rem] text-[#444] dark:text-[#222] leading-snug">
              {posts[0].excerpt}
            </p>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-[var(--card-bg)] p-6 rounded-md h-2/5 border border-[var(--card-border)]">
          <h3 className="text-lg font-semibold mb-3 text-[var(--foreground)]">
            Inscreva-se e receba notícias de tecnologia!
          </h3>
          <form className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">Nome</p>
                <input
                  type="text"
                  placeholder="Digite seu nome completo"
                  className="w-full px-3 py-2 rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] border border-[var(--card-border)] text-sm"
                />
              </div>
              <div>
                <p className="text-xs text-[var(--muted)] mb-1">E-mail</p>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="w-full px-3 py-2 rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] border border-[var(--card-border)] text-sm"
                />
              </div>
            </div>
            <div className="flex items-start">
              <input type="checkbox" id="privacy" className="mr-2 h-3 w-3 mt-1" />
              <label htmlFor="privacy" className="text-xs text-[var(--muted)] leading-tight">
                Autorizo o envio de emails com conteúdo exclusivo, atualizações,
                promoções e notícias do blog.
              </label>
            </div>
            <button
              type="submit"
              className="bg-[var(--primary)] text-white dark:text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-[var(--primary-dark)] transition-colors text-sm"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </div>

      {/* Coluna Direita */}
      <div className="w-[55%] flex flex-col gap-0 pl-4">
        {/* Navbar */}
        <div className="bg-[var(--secondary)] dark:bg-[var(--card-bg)] py-3 px-6 rounded-md mb-4 border border-[var(--card-border)]">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-base font-bold text-[var(--foreground)]">
              <Avatar size={38} borderWidth={2} />
              <span>Blog de Tecnologia</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/suggest" className="text-[var(--foreground)] hover:text-[var(--primary)] text-sm">
                Sugerir um tema
              </Link>
              
              {/* Botão de idioma */}
              <div className="relative">
                <button 
                  className="language-button flex items-center gap-1 text-[var(--foreground)] hover:text-[var(--primary)] text-sm"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  aria-label="Alterar idioma"
                >
                  <Globe size={16} weight="fill" className="mr-1" />
                  {language}
                </button>
                
                {showLanguageMenu && (
                  <div className="language-menu absolute top-full right-0 mt-1 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md shadow-lg z-50 overflow-hidden">
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${language === "PT-BR" ? "bg-[var(--primary)] text-white dark:text-gray-900" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
                      onClick={() => toggleLanguage("PT-BR")}
                    >
                      PT-BR
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${language === "EN-US" ? "bg-[var(--primary)] text-white dark:text-gray-900" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
                      onClick={() => toggleLanguage("EN-US")}
                    >
                      EN-US
                    </button>
                  </div>
                )}
              </div>
              
              <Link href="/about" className="text-[var(--foreground)] hover:text-[var(--primary)] text-sm">
                Sobre
              </Link>
              <button 
                className="text-[var(--foreground)] hover:text-[var(--primary)] p-1"
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              >
                {isDarkMode ? (
                  <Sun size={20} weight="fill" />
                ) : (
                  <Moon size={20} weight="fill" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Posts com scroll */}
        <div className="bg-[var(--card-bg)] rounded-md flex-1 overflow-hidden border border-[var(--card-border)] relative">
          <div 
            ref={desktopScrollRef}
            className="h-full overflow-y-auto scrollbar-hide"
          >
            <div className="space-y-6 p-4">
              {posts.slice(1).map((post) => (
                <article key={post.id} className="border-b border-[var(--card-border)] pb-5 last:border-0">
                  <h2 className="text-lg font-semibold text-[var(--foreground)] mb-1">
                    {post.title}
                  </h2>
                  <div className="text-xs text-[var(--muted)]">
                    Por {post.author} | {post.date}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <ScrollIndicator containerRef={desktopScrollRef} />
        </div>
      </div>
    </div>
  );

  // Mobile layout
  const MobileLayout = () => (
    <div className="flex flex-col h-full">
      {/* Post em Destaque */}
      <div className="bg-lime-300 dark:bg-[var(--primary)] relative rounded-t-md">
        {/* Decorative dots */}
        <div className="absolute top-3 left-3 flex space-x-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700/50 dark:bg-white/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700/50 dark:bg-white/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700/50 dark:bg-white/50"></div>
        </div>
        {/* Arrow icon */}
        <div className="absolute top-3 right-3">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="transform rotate-45"
          >
            <path 
              d="M5 19L19 5M19 5V19M19 5H5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Conteúdo do Post - Alinhado na parte inferior */}
        <div className="flex flex-col justify-end h-64 p-6">
          <h1 className="text-xl leading-tight font-bold text-[#333] dark:text-[#111] mb-1">
            {posts[0].title}
          </h1>
          <p className="text-sm text-[#444] dark:text-[#222] leading-snug">
            {posts[0].excerpt}
          </p>
        </div>
      </div>
      
      {/* Lista de Posts com scroll */}
      <div className="flex-1 overflow-hidden bg-[var(--card-bg)] border-x border-[var(--card-border)] relative">
        <div 
          ref={mobileScrollRef}
          className="h-full overflow-y-auto scrollbar-hide"
        >
          <div className="space-y-4 p-4">
            {posts.slice(1).map((post) => (
              <article key={post.id} className="border-b border-[var(--card-border)] pb-4 last:border-0">
                <h2 className="text-base font-semibold text-[var(--foreground)] mb-1">
                  {post.title}
                </h2>
                <div className="text-xs text-[var(--muted)]">
                  Por {post.author} | {post.date}
                </div>
              </article>
            ))}
          </div>
        </div>
        <ScrollIndicator containerRef={mobileScrollRef} />
      </div>
      
      {/* Bottom Navigation Bar */}
      <div className="bg-[var(--card-bg)] py-3 px-2 flex justify-center items-center space-x-8 border border-[var(--card-border)]">
        <button className="flex flex-col items-center">
          <Avatar size={24} borderWidth={1.5} />
          <span className="text-xs text-[var(--muted)] mt-1">Home</span>
        </button>
        <button 
          className="flex flex-col items-center relative"
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
        >
          <Globe size={20} weight="fill" />
          <span className="text-xs text-[var(--muted)] mt-1">{language}</span>
          
          {showLanguageMenu && (
            <div className="language-menu absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md shadow-lg z-50 overflow-hidden">
              <button 
                className={`w-full text-left px-4 py-2 text-sm ${language === "PT-BR" ? "bg-[var(--primary)] text-white dark:text-gray-900" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
                onClick={() => toggleLanguage("PT-BR")}
              >
                PT-BR
              </button>
              <button 
                className={`w-full text-left px-4 py-2 text-sm ${language === "EN-US" ? "bg-[var(--primary)] text-white dark:text-gray-900" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
                onClick={() => toggleLanguage("EN-US")}
              >
                EN-US
              </button>
            </div>
          )}
        </button>
        <button className="flex flex-col items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs text-[var(--muted)] mt-1">Editar</span>
        </button>
        <button 
          className="flex flex-col items-center"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <>
              <Sun size={20} weight="fill" />
              <span className="text-xs text-[var(--muted)] mt-1">Claro</span>
            </>
          ) : (
            <>
              <Moon size={20} weight="fill" />
              <span className="text-xs text-[var(--muted)] mt-1">Escuro</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[var(--background)] p-4 transition-colors">
      {/* Desktop layout for large screens, mobile layout for small screens */}
      <div className="hidden md:block h-full">
        <DesktopLayout />
      </div>
      <div className="block md:hidden h-full">
        <MobileLayout />
      </div>
    </div>
  );
}
