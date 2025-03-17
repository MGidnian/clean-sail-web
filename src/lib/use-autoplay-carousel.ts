
import { useState, useEffect, useRef } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';

export function useAutoplayCarousel(interval = 3000, shouldAutoPlay = true) {
  const [api, setApi] = useState<CarouselApi>();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRtlRef = useRef<boolean>(document.documentElement.dir === 'rtl');

  useEffect(() => {
    // Update RTL reference when DOM changes
    const observer = new MutationObserver(() => {
      isRtlRef.current = document.documentElement.dir === 'rtl';
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api || !shouldAutoPlay) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up autoplay with consistent timing
    const startAutoplay = () => {
      intervalRef.current = setInterval(() => {
        api.scrollNext();
      }, interval);
    };

    // Start autoplay
    startAutoplay();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, interval, shouldAutoPlay]);

  // Pause autoplay on hover/touch
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Resume autoplay when not hovering
  const handleMouseLeave = () => {
    if (!api || !shouldAutoPlay) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, interval);
  };

  return {
    setApi,
    handleMouseEnter,
    handleMouseLeave,
  };
}
