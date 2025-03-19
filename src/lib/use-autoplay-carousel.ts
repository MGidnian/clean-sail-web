
import { useEffect, useState, useCallback } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

export function useAutoplayCarousel(intervalMs = 2000) {
  const isMobile = useIsMobile();
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);
  
  // Use a faster interval for desktop (2x faster)
  const desktopInterval = intervalMs / 2;
  
  useEffect(() => {
    if (!api || isPaused) {
      return;
    }

    // Set the autoplay interval
    const interval = setInterval(() => {
      api.scrollNext();
    }, isMobile ? intervalMs : desktopInterval);

    // Clear the interval when component unmounts
    return () => clearInterval(interval);
  }, [api, intervalMs, isMobile, desktopInterval, isPaused]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  return {
    setApi,
    handleMouseEnter,
    handleMouseLeave
  };
}
