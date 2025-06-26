
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useAutoplayCarousel } from '@/lib/use-autoplay-carousel';

export const Brands = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { setApi, handleMouseEnter, handleMouseLeave } = useAutoplayCarousel(3000);

  // Log brand section view to Clarity
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && window.clarity) {
            window.clarity("event", "brands_section_viewed");
          }
        });
      },
      { threshold: 0.5 }
    );
    
    const section = containerRef.current;
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleBrandClick = (brandName: string) => {
    if (window.clarity) {
      window.clarity("event", "brand_logo_click", {
        brand: brandName
      });
    }
  };

  const brands = [
    {
      name: "N12",
      url: "https://www.youtube.com/watch?v=pCDNa1wSYP8",
      logo: "https://upload.wikimedia.org/wikipedia/he/5/56/N12_website_logo.svg"
    },
    {
      name: "i24 News",
      url: "https://www.youtube.com/watch?v=LhNpZPTeaBI",
      logo: "/lovable-uploads/5f67f671-53ea-492d-ab79-f50be0fbc3f3.png"
    },
    {
      name: "Mako",
      url: "https://www.mako.co.il/nexter-news/Article-6ff45062252d691026.htm?utm_source=fisherman.app",
      logo: "/lovable-uploads/b714d240-9ac8-4894-8aa6-7dea4f7bfc81.png"
    }
  ];

  return (
    <section className="py-10 bg-fisherman-gray">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-lg text-center text-gray-500 mb-6">{t('brands.asSeenIn')}</h3>
        
        <div ref={containerRef} className="max-w-4xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {brands.map((brand, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3">
                  <div className="flex justify-center items-center p-4">
                    <a 
                      href={brand.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => handleBrandClick(brand.name)}
                    >
                      <img 
                        src={brand.logo}
                        alt={brand.name}
                        className="h-14 md:h-16 w-auto" 
                      />
                    </a>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
