
import { useEffect } from "react";
import { useCarousel } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

export function useAutoplayCarousel(apiRef: ReturnType<typeof useCarousel>, intervalMs = 2000) {
  const isMobile = useIsMobile();
  
  // Use a faster interval for desktop (half the time)
  const desktopInterval = intervalMs / 2;
  
  useEffect(() => {
    const api = apiRef.current;
    if (!api || api.count <= 1) {
      return;
    }

    // Set the autoplay interval
    const interval = setInterval(() => {
      api.scrollNext();
    }, isMobile ? intervalMs : desktopInterval);

    // Clear the interval when component unmounts
    return () => clearInterval(interval);
  }, [apiRef, intervalMs, isMobile, desktopInterval]);
}
