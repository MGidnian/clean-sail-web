
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  
  // Log social media or link click to Clarity
  const handleLinkClick = (linkType: string, linkName: string) => {
    if (window.clarity) {
      window.clarity("event", "footer_link_click", {
        type: linkType,
        name: linkName
      });
    }
  };
  
  return (
    <footer className="py-12 bg-fisherman-darkGray text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img 
                src="/public/lovable-uploads/cd6dbc8b-e617-4255-9828-6242b468cee5.png" 
                alt="Fisherman Logo" 
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold">Fisherman</span>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
            <a 
              href="#" 
              className="hover:text-blue-300 transition-colors"
              onClick={() => handleLinkClick('page', 'privacy')}
            >
              {t('footer.privacy')}
            </a>
            <a 
              href="#" 
              className="hover:text-blue-300 transition-colors"
              onClick={() => handleLinkClick('page', 'terms')}
            >
              {t('footer.terms')}
            </a>
            <a 
              href="#" 
              className="hover:text-blue-300 transition-colors"
              onClick={() => handleLinkClick('page', 'contact')}
            >
              {t('footer.contact')}
            </a>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="hover:text-blue-300 transition-colors p-2"
              onClick={() => handleLinkClick('social', 'instagram')}
            >
              <Instagram size={20} />
            </a>
            <a 
              href="#" 
              className="hover:text-blue-300 transition-colors p-2"
              onClick={() => handleLinkClick('social', 'twitter')}
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className="hover:text-blue-300 transition-colors p-2"
              onClick={() => handleLinkClick('social', 'facebook')}
            >
              <Facebook size={20} />
            </a>
            <a 
              href="mailto:info@fisherman.app" 
              className="hover:text-blue-300 transition-colors p-2"
              onClick={() => handleLinkClick('email', 'info')}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};
