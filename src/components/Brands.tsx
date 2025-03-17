
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

  return (
    <section className="py-10 bg-fisherman-gray">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-lg text-center text-gray-500 mb-6">{t('brands.asSeenIn')}</h3>
        
        <div ref={containerRef} className="flex justify-center">
          <a 
            href="https://www.n12.co.il/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => {
              if (window.clarity) {
                window.clarity("event", "brand_logo_click", {
                  brand: "N12"
                });
              }
            }}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/he/5/56/N12_website_logo.svg" 
              alt="N12" 
              className="h-10 md:h-12 w-auto" 
            />
          </a>
        </div>
      </div>
    </section>
  );
};
