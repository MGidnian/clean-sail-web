
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';

export const Navbar = () => {
  const { t, toggleLanguage, language, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();
  
  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);
  
  // Handle language toggle and log to Clarity
  const handleLanguageToggle = () => {
    toggleLanguage();
  };
  
  // Handle download button click - direct to App Store
  const handleDownloadClick = () => {
    window.open('https://apps.apple.com/app/fisherman/id123456789?utm_source=website&utm_medium=navbar&utm_campaign=download_button', '_blank');
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "navbar_download_click");
    }
    
    // Close mobile menu if open
    if (isOpen) {
      setIsOpen(false);
    }
  };
  
  // Get language emoji
  const getLanguageEmoji = () => {
    return language === 'he' ? '🇮🇱' : '🇺🇸';
  };
  
  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Log event to Clarity
      if (window.clarity) {
        window.clarity("event", "navbar_section_click", {
          section: sectionId
        });
      }
      
      // Close mobile menu if open
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img 
              src="/public/lovable-uploads/cd6dbc8b-e617-4255-9828-6242b468cee5.png" 
              alt="Fisherman Logo" 
              className="h-8 w-auto" 
            />
            <span className="text-lg font-bold ml-2">Fisherman</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-fisherman-blue"
            >
              {t('nav.features')}
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="text-gray-700 hover:text-fisherman-blue"
            >
              {t('nav.reviews')}
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-fisherman-blue"
            >
              {t('nav.contact')}
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center">
            {/* Language Toggle */}
            <button 
              className="mr-4 text-lg"
              onClick={handleLanguageToggle}
              aria-label="Toggle language"
            >
              {getLanguageEmoji()}
            </button>
            
            {/* Download Button */}
            <Button 
              onClick={handleDownloadClick}
              className="hidden md:block bg-fisherman-blue hover:bg-fisherman-darkBlue"
            >
              {t('nav.download')}
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden ml-4 p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 border-t border-gray-100">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-fisherman-blue py-2"
            >
              {t('nav.features')}
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="text-gray-700 hover:text-fisherman-blue py-2"
            >
              {t('nav.reviews')}
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-fisherman-blue py-2"
            >
              {t('nav.contact')}
            </button>
            <Button 
              onClick={handleDownloadClick}
              className="w-full bg-fisherman-blue hover:bg-fisherman-darkBlue mt-2"
            >
              {t('nav.download')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
