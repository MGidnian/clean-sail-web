
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Brands = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="py-10 bg-fisherman-gray">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-lg text-center text-gray-500 mb-6">{t('brands.asSeenIn')}</h3>
        
        <div ref={containerRef} className="flex justify-center items-center gap-8 flex-wrap">
          <a 
            href="https://www.youtube.com/watch?v=pCDNa1wSYP8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => handleBrandClick("N12")}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/he/5/56/N12_website_logo.svg" 
              alt="N12" 
              className="h-10 md:h-12 w-auto" 
            />
          </a>

          <a 
            href="https://www.youtube.com/watch?v=LhNpZPTeaBI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => handleBrandClick("i24 News")}
          >
            <img 
              src="/lovable-uploads/5f67f671-53ea-492d-ab79-f50be0fbc3f3.png" 
              alt="i24 News" 
              className="h-10 md:h-12 w-auto" 
            />
          </a>

          <a 
            href="https://www.mako.co.il/nexter-news/Article-6ff45062252d691026.htm?utm_source=fisherman.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => handleBrandClick("Mako")}
          >
            <img 
              src="/lovable-uploads/b714d240-9ac8-4894-8aa6-7dea4f7bfc81.png" 
              alt="Mako" 
              className="h-10 md:h-12 w-auto" 
            />
          </a>
        </div>
      </div>
    </section>
  );
};
