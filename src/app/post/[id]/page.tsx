"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Moon, Sun, Globe } from "phosphor-react";
import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { PostLoadingEffect } from "@/components/PostLoadingEffect";

export default function PostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<"PT-BR" | "EN-US">("PT-BR");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchPost = async () => {
      try {
        // Inicia os dois fetches em paralelo
        const [postResponse, relatedResponse] = await Promise.all([
          fetch(`/api/posts/${params.id}`),
          fetch('/api/posts')
        ]);

        if (!mounted) return;

        const postData = await postResponse.json();
        const allPosts = await relatedResponse.json();

        if (!mounted) return;

        // Processa os dados
        const mdxSource = await serialize(postData.content);
        const related = allPosts
          .filter((p: Post) => p.id !== postData.id)
          .slice(0, 3);

        if (!mounted) return;

        setPost(postData);
        setMdxSource(mdxSource);
        setRelatedPosts(related);
        setIsLoading(false);

        // Pequeno delay antes de remover o loading completamente
        setTimeout(() => {
          if (mounted) {
            setLoadingComplete(true);
          }
        }, 300);
      } catch (error) {
        console.error('Error fetching post:', error);
        if (mounted) {
          setIsLoading(false);
          setLoadingComplete(true);
        }
      }
    };

    fetchPost();

    return () => {
      mounted = false;
    };
  }, [params.id]);

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

  if (!loadingComplete || isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] relative">
        <PostLoadingEffect />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors">
      {/* Navbar */}
      <nav className="bg-[var(--card-bg)] border-b border-[var(--card-border)] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-base font-bold text-[var(--foreground)]">
              <span>MBH</span>
            </Link>
            <div className="flex items-center space-x-4 md:space-x-6">
              <Link href="/suggest" className="hidden md:block text-[var(--foreground)] hover:text-[var(--primary)] text-sm">
                Sugerir um tema
              </Link>
              
              {/* Botão de idioma */}
              <div className="relative">
                <button 
                  className="language-button flex items-center gap-1 text-[var(--foreground)] hover:text-[var(--primary)] text-sm"
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  <Globe size={16} weight="fill" className="mr-1" />
                  <span className="hidden md:inline">{language}</span>
                </button>
                
                {showLanguageMenu && (
                  <div className="language-menu absolute top-full right-0 mt-1 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md shadow-lg z-50">
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${language === "PT-BR" ? "bg-[var(--primary)] text-white dark:text-gray-900" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
                      onClick={() => {
                        setLanguage("PT-BR");
                        setShowLanguageMenu(false);
                      }}
                    >
                      PT-BR
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${language === "EN-US" ? "bg-[var(--primary)] text-white dark:text-gray-900" : "text-[var(--foreground)] hover:bg-[var(--card-border)]"}`}
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
      <main className="max-w-5xl mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Coluna Principal */}
          <div className="flex-1">
            <article className="bg-[var(--card-bg)] rounded-lg p-4 md:p-8 border border-[var(--card-border)]">
              {/* Cabeçalho do Post */}
              <header className="mb-6 md:mb-8">
                <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
                  <span>{post?.category}</span>
                  <span>•</span>
                  <span>{post?.readTime}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
                  {post?.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--primary)]"></div>
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{post?.author}</p>
                      <p className="text-xs text-[var(--muted)]">{post?.date}</p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Conteúdo MDX */}
              <div className="prose prose-sm md:prose-lg dark:prose-invert max-w-none">
                {mdxSource && <MDXRemote {...mdxSource} />}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-4 md:space-y-6">
            {/* Card de Categorias */}
            <div className="bg-[var(--card-bg)] rounded-lg p-4 md:p-6 border border-[var(--card-border)]">
              <h3 className="text-base md:text-lg font-semibold mb-4 text-[var(--foreground)]">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {post?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs md:text-sm rounded-full bg-[var(--background)] text-[var(--foreground)] border border-[var(--card-border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card de Posts Relacionados */}
            <div className="bg-[var(--card-bg)] rounded-lg p-4 md:p-6 border border-[var(--card-border)]">
              <h3 className="text-base md:text-lg font-semibold mb-4 text-[var(--foreground)]">Popular Blog</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link href={`/post/${relatedPost.id}`} key={relatedPost.id}>
                    <article className="group cursor-pointer">
                      <h4 className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs text-[var(--muted)] mt-1">
                        {relatedPost.date}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar - Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--card-bg)] py-3 px-4 flex justify-between items-center border-t border-[var(--card-border)] backdrop-blur-md bg-opacity-90">
        <Link href="/" className="flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-xs font-bold text-white dark:text-gray-900">
            M
          </div>
          <span className="text-[10px] text-[var(--muted)] mt-1">Home</span>
        </Link>
        <Link href="/suggest" className="flex flex-col items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--foreground)]">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] text-[var(--muted)] mt-1">Sugerir</span>
        </Link>
        <button 
          className="flex flex-col items-center"
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
        >
          <Globe size={20} weight="fill" className="text-[var(--foreground)]" />
          <span className="text-[10px] text-[var(--muted)] mt-1">{language}</span>
        </button>
        <button 
          className="flex flex-col items-center"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <>
              <Sun size={20} weight="fill" className="text-[var(--foreground)]" />
              <span className="text-[10px] text-[var(--muted)] mt-1">Claro</span>
            </>
          ) : (
            <>
              <Moon size={20} weight="fill" className="text-[var(--foreground)]" />
              <span className="text-[10px] text-[var(--muted)] mt-1">Escuro</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
} 