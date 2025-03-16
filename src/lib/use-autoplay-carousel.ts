
import { useCallback, useEffect, useState } from "react";
import { useAutoplay } from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";

export function useAutoplayCarousel(interval = 2000) {
  const [api, setApi] = useState<CarouselApi>();
  const [plugin, setPlugin] = useState<ReturnType<typeof useAutoplay>>();
  const [isPaused, setIsPaused] = useState(false);

  const autoplayPlugin = useAutoplay({
    delay: interval,
    stopOnMouseEnter: false,
    stopOnInteraction: false,
    playOnInit: true,
  });

  useEffect(() => {
    if (!api) return;
    setPlugin(autoplayPlugin);
  }, [api, autoplayPlugin]);

  const handleMouseEnter = useCallback(() => {
    if (!plugin) return;
    plugin.stop();
    setIsPaused(true);
  }, [plugin]);

  const handleMouseLeave = useCallback(() => {
    if (!plugin) return;
    plugin.play();
    setIsPaused(false);
  }, [plugin]);

  return {
    setApi,
    handleMouseEnter,
    handleMouseLeave,
    isPaused,
  };
}
