
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { t, toggleLanguage, language, isRtl } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "menu_toggle", {
        state: !isMenuOpen ? "open" : "closed"
      });
    }
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  const handleMenuItemClick = (item: string) => {
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "menu_item_click", {
        item
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 py-4 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img 
              src="/public/lovable-uploads/cd6dbc8b-e617-4255-9828-6242b468cee5.png" 
              alt="Fisherman Logo" 
              className="h-10 w-auto"
            />
            <span className="ml-2 text-xl font-bold">Fisherman</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-sm font-medium hover:text-fisherman-blue transition-colors"
              onClick={() => handleMenuItemClick('features')}
            >
              {t('nav.features')}
            </a>
            <a 
              href="#reviews" 
              className="text-sm font-medium hover:text-fisherman-blue transition-colors"
              onClick={() => handleMenuItemClick('reviews')}
            >
              {t('nav.reviews')}
            </a>
            <a 
              href="#faq" 
              className="text-sm font-medium hover:text-fisherman-blue transition-colors"
              onClick={() => handleMenuItemClick('faq')}
            >
              {t('nav.contact')}
            </a>
            
            {/* Language Toggle */}
            <button 
              onClick={handleLanguageToggle} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg">
                {language === 'he' ? "🇮🇱" : "🇺🇸"}
              </span>
            </button>
            
            {/* Download Button */}
            <Button 
              className="bg-fisherman-blue hover:bg-fisherman-darkBlue text-white rounded-full px-6"
              onClick={() => handleMenuItemClick('download')}
            >
              {t('nav.download')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Language Toggle Mobile */}
            <button 
              onClick={handleLanguageToggle} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg">
                {language === 'he' ? "🇮🇱" : "🇺🇸"}
              </span>
            </button>
            
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 py-4 px-4 absolute w-full">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-sm font-medium hover:text-fisherman-blue transition-colors"
              onClick={() => {
                handleMenuItemClick('features');
                toggleMenu();
              }}
            >
              {t('nav.features')}
            </a>
            <a 
              href="#reviews" 
              className="text-sm font-medium hover:text-fisherman-blue transition-colors"
              onClick={() => {
                handleMenuItemClick('reviews');
                toggleMenu();
              }}
            >
              {t('nav.reviews')}
            </a>
            <a 
              href="#faq" 
              className="text-sm font-medium hover:text-fisherman-blue transition-colors"
              onClick={() => {
                handleMenuItemClick('faq');
                toggleMenu();
              }}
            >
              {t('nav.contact')}
            </a>
            <Button 
              className="bg-fisherman-blue hover:bg-fisherman-darkBlue text-white rounded-full"
              onClick={() => {
                handleMenuItemClick('download');
                toggleMenu();
              }}
            >
              {t('nav.download')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
