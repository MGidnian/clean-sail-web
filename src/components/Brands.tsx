
import React, { useEffect, useRef } from 'react';

const brandLogos = [
  { name: 'Forbes', src: '/public/brands/forbes.png' },
  { name: 'New York Times', src: '/public/brands/nyt.png' },
  { name: 'TechCrunch', src: '/public/brands/techcrunch.png' },
  { name: 'Wired', src: '/public/brands/wired.png' },
  { name: 'The Verge', src: '/public/brands/theverge.png' },
];

export const Brands = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Log brand carousel view to Clarity
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

  // Log brand logo click to Clarity
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
        <h3 className="text-lg text-center text-gray-500 mb-6">As Seen In</h3>
        
        <div ref={containerRef} className="brands-carousel">
          <div className="brands-track inline-flex space-x-12 items-center">
            {[...brandLogos, ...brandLogos].map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`}
                className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => handleBrandClick(brand.name)}
              >
                <img 
                  src={brand.src} 
                  alt={brand.name} 
                  className="h-8 md:h-10 w-auto grayscale hover:grayscale-0 transition-all" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
