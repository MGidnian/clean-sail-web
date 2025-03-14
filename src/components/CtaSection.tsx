
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { GooglePlayModal } from './GooglePlayModal';

export const CtaSection = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAppStoreClick = () => {
    // Open App Store link
    window.open('https://apps.apple.com/app/fisherman/id123456789', '_blank');
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "cta_app_store_click");
    }
  };

  const handleGooglePlayClick = () => {
    // Open modal instead of Play Store
    setIsModalOpen(true);
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "cta_google_play_click");
    }
  };

  return (
    <section className="py-16 bg-fisherman-blue text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {t('cta.title')}
        </h2>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-blue-100">
          {t('cta.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* App Store Button */}
          <button 
            onClick={handleAppStoreClick}
            className="transition-transform hover:scale-105 focus:outline-none"
          >
            <img 
              src="/public/lovable-uploads/8a714a89-15bd-41d0-a803-d8146614d336.png" 
              alt="Download on the App Store" 
              className="h-14 w-auto"
            />
          </button>
          
          {/* Google Play Button */}
          <button 
            onClick={handleGooglePlayClick}
            className="transition-transform hover:scale-105 focus:outline-none"
          >
            <img 
              src="/public/lovable-uploads/b5740ab3-4fdc-4b42-8513-67264cf236c6.png" 
              alt="Get it on Google Play" 
              className="h-14 w-auto"
            />
          </button>
        </div>
      </div>
      
      {/* Google Play Modal */}
      <GooglePlayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
