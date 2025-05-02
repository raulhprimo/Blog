export function PostLoadingEffect() {
  return (
    <div 
      className={`
        absolute inset-0 z-40 
        bg-[var(--background)] 
        transition-all duration-700 ease-in-out
      `}
    >
      {/* Navbar */}
      <nav className="bg-[var(--card-bg)] border-b border-[var(--card-border)]">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="h-6 w-12 bg-[var(--primary)] rounded animate-pulse"></div>
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="hidden md:block h-4 w-24 bg-[var(--card-bg)] rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-[var(--card-bg)] rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-[var(--card-bg)] rounded animate-pulse"></div>
              <div className="h-5 w-5 rounded-full bg-[var(--card-bg)] animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-5xl mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Coluna Principal */}
          <div className="flex-1">
            <div className="bg-[var(--card-bg)] rounded-lg p-4 md:p-8 border border-[var(--card-border)]">
              {/* Cabeçalho do Post */}
              <header className="mb-6 md:mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-4 w-20 bg-[var(--card-border)] rounded animate-pulse"></div>
                  <div className="h-4 w-4 bg-[var(--card-border)] rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-[var(--card-border)] rounded animate-pulse"></div>
                </div>
                <div className="h-8 md:h-10 w-full md:w-3/4 bg-[var(--card-border)] rounded mb-4 animate-pulse"></div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--primary)] animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 md:w-32 bg-[var(--card-border)] rounded animate-pulse"></div>
                      <div className="h-3 w-20 md:w-24 bg-[var(--card-border)] rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </header>

              {/* Conteúdo */}
              <div className="space-y-3 md:space-y-4">
                <div className="h-3 md:h-4 w-full bg-[var(--card-border)] rounded animate-pulse"></div>
                <div className="h-3 md:h-4 w-11/12 bg-[var(--card-border)] rounded animate-pulse"></div>
                <div className="h-3 md:h-4 w-full bg-[var(--card-border)] rounded animate-pulse"></div>
                <div className="h-3 md:h-4 w-10/12 bg-[var(--card-border)] rounded animate-pulse"></div>
                <div className="h-3 md:h-4 w-full bg-[var(--card-border)] rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-4 md:space-y-6">
            {/* Card de Categorias */}
            <div className="bg-[var(--card-bg)] rounded-lg p-4 md:p-6 border border-[var(--card-border)]">
              <div className="h-5 md:h-6 w-32 bg-[var(--card-border)] rounded mb-4 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-20 bg-[var(--card-border)] rounded-full animate-pulse"></div>
                <div className="h-6 w-24 bg-[var(--card-border)] rounded-full animate-pulse"></div>
                <div className="h-6 w-16 bg-[var(--card-border)] rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Card de Posts Relacionados */}
            <div className="bg-[var(--card-bg)] rounded-lg p-4 md:p-6 border border-[var(--card-border)]">
              <div className="h-5 md:h-6 w-32 bg-[var(--card-border)] rounded mb-4 animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 md:h-4 w-full bg-[var(--card-border)] rounded animate-pulse"></div>
                    <div className="h-2 md:h-3 w-20 bg-[var(--card-border)] rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 