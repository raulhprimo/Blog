import { CaretUp, CaretDown } from "phosphor-react";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  color?: string;
}

export function ScrollIndicator({ containerRef, color = "var(--muted)" }: ScrollIndicatorProps) {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    
    // Mostrar seta para cima se não estiver no topo
    setShowScrollUp(scrollTop > 10);
    
    // Mostrar seta para baixo se não estiver no final
    setShowScrollDown(scrollTop + clientHeight < scrollHeight - 10);
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      handleScroll(); // Verificar inicialmente
      currentRef.addEventListener("scroll", handleScroll);
      
      // Verificar se há conteúdo suficiente para scroll
      const { scrollHeight, clientHeight } = currentRef;
      setShowScrollDown(scrollHeight > clientHeight);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef]);

  const scrollToPosition = (direction: "up" | "down") => {
    if (!containerRef.current) return;
    
    const { scrollTop } = containerRef.current;
    const newPosition = direction === "up" 
      ? Math.max(0, scrollTop - 300) 
      : scrollTop + 300;
    
    containerRef.current.scrollTo({
      top: newPosition,
      behavior: "smooth"
    });
  };

  return (
    <>
      {showScrollUp && (
        <button
          onClick={() => scrollToPosition("up")}
          className="absolute top-2 right-2 z-10 bg-[var(--card-bg)] p-1 rounded-full shadow-md hover:bg-[var(--card-border)] transition-colors"
          aria-label="Rolar para cima"
        >
          <CaretUp size={18} color={color} weight="bold" />
        </button>
      )}
      
      {showScrollDown && (
        <button
          onClick={() => scrollToPosition("down")}
          className="absolute bottom-2 right-2 z-10 bg-[var(--card-bg)] p-1 rounded-full shadow-md hover:bg-[var(--card-border)] transition-colors"
          aria-label="Rolar para baixo"
        >
          <CaretDown size={18} color={color} weight="bold" />
        </button>
      )}
    </>
  );
} 