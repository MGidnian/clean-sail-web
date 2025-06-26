
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Facebook, Mail, MessageSquare, Linkedin } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Log social media or link click to Clarity
  const handleLinkClick = (linkType: string, linkName: string) => {
    if (window.clarity) {
      window.clarity("event", "footer_link_click", {
        type: linkType,
        name: linkName
      });
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/972523632387?text=היי פישרמן, מה שלומך?', '_blank');
    handleLinkClick('social', 'whatsapp');
  };

  return (
    <footer className="py-12 bg-fisherman-darkGray text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img src="/lovable-uploads/cd6dbc8b-e617-4255-9828-6242b468cee5.png" alt="Fisherman Logo" className="h-10 w-auto rounded-md" />
              <span className="ml-2 text-xl font-bold mx-[4px]">פישרמן</span>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
            <a href="/docs/privacy.html" onClick={() => handleLinkClick('page', 'privacy')} className="hover:text-blue-300 transition-colors mx-0 px-[8px]">
              {t('footer.privacy')}
            </a>
            <a href="/docs/terms.html" className="hover:text-blue-300 transition-colors" onClick={() => handleLinkClick('page', 'terms')}>
              {t('footer.terms')}
            </a>
            <a href="#" className="hover:text-blue-300 transition-colors" onClick={() => handleLinkClick('page', 'contact')}>
              {t('footer.contact')}
            </a>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-300 transition-colors p-2" onClick={() => handleLinkClick('social', 'instagram')}>
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-300 transition-colors p-2" onClick={() => handleLinkClick('social', 'x')}>
              {/* X.com (formerly Twitter) icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-300 transition-colors p-2" onClick={() => handleLinkClick('social', 'facebook')}>
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-300 transition-colors p-2" onClick={() => handleLinkClick('social', 'linkedin')}>
              <Linkedin size={20} />
            </a>
            <button onClick={handleWhatsAppClick} className="hover:text-blue-300 transition-colors p-2">
              <MessageSquare size={20} />
            </button>
            <a href="mailto:support@fisherman.app" className="hover:text-blue-300 transition-colors p-2" onClick={() => handleLinkClick('email', 'support')}>
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {currentYear} {t('footer.copyright').replace('2024', currentYear.toString())}
        </div>
      </div>
    </footer>
  );
};
