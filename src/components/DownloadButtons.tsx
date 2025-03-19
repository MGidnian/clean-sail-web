
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GooglePlayModal } from './GooglePlayModal';

export const DownloadButtons = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const handleAppStoreClick = () => {
    // Open App Store link
    window.open('https://apps.apple.com/app/fisherman/id123456789?utm_source=website&utm_medium=download_section&utm_campaign=download_button', '_blank');
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "app_store_click", {
        location: "download_section"
      });
    }
  };
  
  const handlePlayStoreClick = () => {
    // Open modal instead of Play Store
    setIsModalOpen(true);
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "play_store_waitlist_click", {
        location: "download_section"
      });
    }
  };
  
  return (
    <section className="py-16 bg-fisherman-gray">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          {t('download.title')}
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* App Store Button */}
          <button onClick={handleAppStoreClick} className="transition-transform hover:scale-105 focus:outline-none">
            <img src="/lovable-uploads/8a714a89-15bd-41d0-a803-d8146614d336.png" alt="Download on the App Store" className="h-14 w-auto" />
          </button>
          
          {/* Google Play Button */}
          <button onClick={handlePlayStoreClick} className="transition-transform hover:scale-105 focus:outline-none">
            <img src="/lovable-uploads/b5740ab3-4fdc-4b42-8513-67264cf236c6.png" alt="Get it on Google Play" className="h-14 w-auto" />
          </button>
        </div>
      </div>
      
      {/* Google Play Modal */}
      <GooglePlayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
