
import { useState, useEffect, useRef } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';

export function useAutoplayCarousel(interval = 3000, shouldAutoPlay = true) {
  const [api, setApi] = useState<CarouselApi>();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
