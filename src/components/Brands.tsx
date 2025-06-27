
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

  // Create duplicated brands array for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-10 bg-fisherman-gray overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-lg text-center text-gray-500 mb-6">{t('brands.asSeenIn')}</h3>
        
        <div ref={containerRef} className="max-w-full">
          <div className="flex animate-infinite-carousel lg:animate-none lg:justify-center">
            {duplicatedBrands.map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 w-64 flex justify-center items-center p-4">
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
                    className="h-28 md:h-32 w-auto" 
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
