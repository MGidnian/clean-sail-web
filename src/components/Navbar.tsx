
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

export const Navbar = () => {
  const { t, language, toggleLanguage, isRtl } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  const handleAppStoreClick = () => {
    // Open App Store link
    window.open('https://apps.apple.com/app/fisherman/id123456789?utm_source=website&utm_medium=navbar&utm_campaign=download_button', '_blank');
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "navbar_app_store_click");
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-fisherman-blue">
              Fisherman
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-fisherman-blue transition-colors">
              {t('nav.features')}
            </a>
            <a href="#reviews" className="text-gray-600 hover:text-fisherman-blue transition-colors">
              {t('nav.reviews')}
            </a>
            <a href="#contact" className="text-gray-600 hover:text-fisherman-blue transition-colors">
              {t('nav.contact')}
            </a>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center"
              aria-label="Toggle language"
            >
              <img 
                src={`/public/flags/${language === 'he' ? 'il' : 'us'}.svg`} 
                alt={language === 'he' ? 'Hebrew' : 'English'} 
                className="w-6 h-6"
              />
            </button>
            
            {/* Download Button */}
            <button
              onClick={handleAppStoreClick}
              className="bg-fisherman-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t('nav.download')}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center"
              aria-label="Toggle language"
            >
              <img 
                src={`/public/flags/${language === 'he' ? 'il' : 'us'}.svg`} 
                alt={language === 'he' ? 'Hebrew' : 'English'} 
                className="w-6 h-6"
              />
            </button>
            
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-gray-600">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side={isRtl ? "right" : "left"}>
                <div className="flex flex-col space-y-4 mt-8" dir={isRtl ? 'rtl' : 'ltr'}>
                  <a href="#features" className="text-gray-600 hover:text-fisherman-blue transition-colors">
                    {t('nav.features')}
                  </a>
                  <a href="#reviews" className="text-gray-600 hover:text-fisherman-blue transition-colors">
                    {t('nav.reviews')}
                  </a>
                  <a href="#contact" className="text-gray-600 hover:text-fisherman-blue transition-colors">
                    {t('nav.contact')}
                  </a>
                  
                  {/* Download Button */}
                  <button
                    onClick={handleAppStoreClick}
                    className="bg-fisherman-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
                  >
                    {t('nav.download')}
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
