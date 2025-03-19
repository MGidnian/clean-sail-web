
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GooglePlayModal } from './GooglePlayModal';

export const DownloadButtons: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAppStoreClick = () => {
    // Open App Store link with UTM parameters
    window.open('https://apps.apple.com/app/fisherman/id123456789?utm_source=website&utm_medium=download_section&utm_campaign=download_button', '_blank');
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "download_section_app_store_click");
    }
  };

  const handleGooglePlayClick = () => {
    // Open modal instead of Play Store
    setIsModalOpen(true);
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "download_section_google_play_click");
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
          הורידו עכשיו ותוך פחות מ-30 שניות תשכחו מהספאם
        </h2>
        
        <div className="flex justify-center gap-4">
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
