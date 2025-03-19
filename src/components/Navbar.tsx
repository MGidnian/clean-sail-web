
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
            <img 
              src="/lovable-uploads/cd6dbc8b-e617-4255-9828-6242b468cee5.png" 
              alt="Fisherman Logo" 
              className="w-6 h-6 md:w-8 md:h-8 mr-2 rounded-md"
            />
            <span className="text-xl font-bold text-fisherman-blue">
              {language === 'he' ? 'פישרמן' : 'Fisherman'}
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
            
            {/* Language Toggle with Emoji Flags */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={language === 'en' ? undefined : toggleLanguage}
                className={`flex items-center justify-center p-1 rounded-full w-8 h-8 text-lg ${language === 'en' ? 'bg-white shadow-sm' : ''}`}
                aria-label="Switch to English"
              >
                🇺🇸
              </button>
              <button
                onClick={language === 'he' ? undefined : toggleLanguage}
                className={`flex items-center justify-center p-1 rounded-full w-8 h-8 text-lg ${language === 'he' ? 'bg-white shadow-sm' : ''}`}
                aria-label="Switch to Hebrew"
              >
                🇮🇱
              </button>
            </div>
            
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
            {/* Language Toggle with Emoji Flags for Mobile */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={language === 'en' ? undefined : toggleLanguage}
                className={`flex items-center justify-center p-1 rounded-full w-7 h-7 text-base ${language === 'en' ? 'bg-white shadow-sm' : ''}`}
                aria-label="Switch to English"
              >
                🇺🇸
              </button>
              <button
                onClick={language === 'he' ? undefined : toggleLanguage}
                className={`flex items-center justify-center p-1 rounded-full w-7 h-7 text-base ${language === 'he' ? 'bg-white shadow-sm' : ''}`}
                aria-label="Switch to Hebrew"
              >
                🇮🇱
              </button>
            </div>
            
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
