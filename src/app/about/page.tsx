"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GithubLogo, LinkedinLogo, InstagramLogo, TwitterLogo, Moon, Sun, Globe } from "phosphor-react";
import { FaReact, FaPython, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript, SiScikitlearn, SiMongodb, SiPostgresql, SiMysql, SiPandas, SiNumpy, SiDocker, SiTailwindcss } from "react-icons/si";
import { Avatar } from "@/components/Avatar";

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<"PT-BR" | "EN-US">("PT-BR");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const techStack = [
    { name: "Python", Icon: FaPython },
    { name: "Scikit-learn", Icon: SiScikitlearn },
    { name: "Pandas", Icon: SiPandas },
    { name: "NumPy", Icon: SiNumpy },
    { name: "PostgreSQL", Icon: SiPostgresql },
    { name: "MongoDB", Icon: SiMongodb },
    { name: "MySQL", Icon: SiMysql },
    { name: "Docker", Icon: SiDocker },
    { name: "React", Icon: FaReact },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Node.js", Icon: FaNodeJs },
    { name: "JavaScript", Icon: SiJavascript },
    { name: "TailwindCSS", Icon: SiTailwindcss },

  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Navbar - Visível apenas em Desktop */}
      <nav className="bg-[var(--card-bg)] border-b border-[var(--card-border)] hidden md:block">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-base font-bold text-[var(--foreground)]">
              <span>MBH</span>
            </Link>
            <div className="flex items-center space-x-6">
              {/* Botão de idioma */}
              <div className="relative">
                <button 
                  className="language-button flex items-center gap-1 text-[var(--foreground)] hover:text-[var(--primary)] text-sm"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  <Globe size={16} weight="fill" className="mr-1" />
                  {language}
                </button>
                
                {showLanguageMenu && (
                  <div className="language-menu absolute top-full right-0 mt-1 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md shadow-lg z-50">
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${language === "PT-BR" ? "bg-[var(--primary)] text-white" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
                      onClick={() => {
                        setLanguage("PT-BR");
                        setShowLanguageMenu(false);
                      }}
                    >
                      PT-BR
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${language === "EN-US" ? "bg-[var(--primary)] text-white" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
                      onClick={() => {
                        setLanguage("EN-US");
                        setShowLanguageMenu(false);
                      }}
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
                className="text-[var(--foreground)] hover:text-[var(--primary)]"
                onClick={() => setIsDarkMode(!isDarkMode)}
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
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow py-6 md:py-12 pb-24 md:pb-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Hero Section */}
          <div className="bg-[var(--card-bg)] rounded-lg p-6 md:p-8 border border-[var(--card-border)] mb-8 md:mb-12">
            <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
              {/* Texto de Introdução */}
              <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold text-[var(--foreground)]">
                  Olá, eu sou <span className="text-[var(--primary)]">Raul Primo!</span>
                </h1>
                <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
                  Engenheiro de IA e SaaS developer focado em construir soluções práticas e escaláveis.
                  Trabalho com desenvolvimento de aplicações inteligentes e sistemas em nuvem, buscando
                  sempre equilibrar inovação com resultados tangíveis.
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  <Link 
                    href="https://www.linkedin.com/in/raul-primo-5468a6234/" 
                    target="_blank"
                    className="inline-flex items-center px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                  >
                    Vamos Conversar
                  </Link>
                </div>
              </div>

              {/* Foto de Perfil */}
              <div className="relative w-40 h-40 md:w-80 md:h-80 mb-4 md:mb-0">
                <div className="relative w-full h-full rounded-full md:rounded-2xl overflow-hidden border-4 border-[var(--card-bg)] shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full md:rounded-2xl opacity-80" />
                  <Image
                    src="/images/profile1.jpg"
                    alt="Foto de Perfil"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="bg-[var(--card-bg)] rounded-lg p-6 md:p-8 border border-[var(--card-border)] mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-6 md:mb-8 text-center md:text-left">
              Minha Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {techStack.map(({ name, Icon }) => (
                <div 
                  key={name}
                  className="flex items-center gap-2 p-3 rounded-lg border border-[var(--card-border)] bg-[var(--background)] hover:border-[var(--primary)] transition-colors group"
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-[var(--foreground)] group-hover:text-[var(--primary)]" />
                  <span className="text-xs md:text-sm text-[var(--foreground)]">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-[var(--card-bg)] rounded-lg p-6 md:p-8 border border-[var(--card-border)]">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-4 md:mb-6 text-center md:text-left">
              Conecte-se Comigo
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
              <Link 
                href="https://github.com/raulhprimo" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg hover:text-[var(--primary)] transition-colors"
              >
                <GithubLogo size={20} weight="fill" />
                <span className="text-sm">GitHub</span>
              </Link>
              <Link 
                href="https://www.linkedin.com/in/raul-primo-5468a6234/" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg hover:text-[var(--primary)] transition-colors"
              >
                <LinkedinLogo size={20} weight="fill" />
                <span className="text-sm">LinkedIn</span>
              </Link>
              <Link 
                href="https://www.instagram.com/raulhprimo/" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg hover:text-[var(--primary)] transition-colors"
              >
                <InstagramLogo size={20} weight="fill" />
                <span className="text-sm">Instagram</span>
              </Link>
              <Link 
                href="https://x.com/_primotech" 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--background)] text-[var(--foreground)] rounded-lg hover:text-[var(--primary)] transition-colors"
              >
                <TwitterLogo size={20} weight="fill" />
                <span className="text-sm">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Visível apenas em Desktop */}
      <footer className="bg-[var(--card-bg)] border-t border-[var(--card-border)] py-8 hidden md:block">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-[var(--muted)] text-sm text-center">
              © {new Date().getFullYear()} Made By Humans. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation Bar - Visível apenas em Mobile */}
      <div className="md:hidden bg-[var(--card-bg)] py-3 px-2 flex justify-center items-center space-x-8 border border-[var(--card-border)] fixed bottom-0 left-0 right-0">
        <Link href="/" className="flex flex-col items-center">
          <Avatar size={24} borderWidth={1.5} />
          <span className="text-xs text-[var(--muted)] mt-1">Home</span>
        </Link>
        <button 
          className="flex flex-col items-center relative"
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
        >
          <Globe size={20} weight="fill" />
          <span className="text-xs text-[var(--muted)] mt-1">{language}</span>
          
          {showLanguageMenu && (
            <div className="language-menu absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md shadow-lg z-50 overflow-hidden">
              <button 
                className={`w-full text-left px-4 py-2 text-sm ${language === "PT-BR" ? "bg-[var(--primary)] text-white" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
                onClick={() => {
                  setLanguage("PT-BR");
                  setShowLanguageMenu(false);
                }}
              >
                PT-BR
              </button>
              <button 
                className={`w-full text-left px-4 py-2 text-sm ${language === "EN-US" ? "bg-[var(--primary)] text-white" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
                onClick={() => {
                  setLanguage("EN-US");
                  setShowLanguageMenu(false);
                }}
              >
                EN-US
              </button>
            </div>
          )}
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
}
