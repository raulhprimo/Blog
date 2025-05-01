"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Moon, Sun, Globe } from "phosphor-react";
import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<"PT-BR" | "EN-US">("PT-BR");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postId = Number(params.id);
        
        // Carregar o post atual
        const response = await fetch(`/api/posts/${postId}`);
        const post = await response.json();
        
        if (post && post.content) {
          const mdxSource = await serialize(post.content);
          setMdxSource(mdxSource);
          setPost(post);
          
          // Carregar posts relacionados
          const relatedResponse = await fetch('/api/posts');
          const allPosts = await relatedResponse.json();
          const related = allPosts
            .filter((p: Post) => p.id !== postId)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error loading post:', error);
      }
    };

    loadPost();
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

  if (!post) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--background)]">
        <p className="text-[var(--foreground)]">Notícia não encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors">
      {/* Navbar */}
      <nav className="bg-[var(--card-bg)] border-b border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-base font-bold text-[var(--foreground)]">
              <span>MBH</span>
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
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Coluna Principal */}
          <div className="flex-1">
            <article className="bg-[var(--card-bg)] rounded-lg p-8 border border-[var(--card-border)]">
              {/* Cabeçalho do Post */}
              <header className="mb-8">
                <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]"></div>
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{post.author}</p>
                      <p className="text-xs text-[var(--muted)]">{post.date}</p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Conteúdo MDX */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {mdxSource && <MDXRemote {...mdxSource} />}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Card de Categorias */}
            <div className="bg-[var(--card-bg)] rounded-lg p-6 border border-[var(--card-border)]">
              <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-[var(--background)] text-[var(--foreground)] border border-[var(--card-border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card de Posts Relacionados */}
            <div className="bg-[var(--card-bg)] rounded-lg p-6 border border-[var(--card-border)]">
              <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Popular Blog</h3>
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
    </div>
  );
} 