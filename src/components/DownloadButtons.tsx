
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Apple, BadgeAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGooglePlayModal } from '@/hooks/use-modal';

export const DownloadButtons = () => {
  const { t } = useLanguage();
  const { openModal } = useGooglePlayModal();
  
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
    openModal();
    
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
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* App Store Button */}
          <Button 
            onClick={handleAppStoreClick}
            variant="default" 
            size="lg"
            className="bg-black hover:bg-gray-800 text-white w-full md:w-auto"
          >
            <div className="flex items-center">
              <Apple className="mr-2 h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="text-xs">Download on the</span>
                <span className="text-base font-bold">App Store</span>
              </div>
            </div>
          </Button>
          
          {/* Google Play Button (Waitlist) */}
          <Button 
            onClick={handlePlayStoreClick}
            variant="outline" 
            size="lg"
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100 w-full md:w-auto"
          >
            <div className="flex items-center">
              <BadgeAlert className="mr-2 h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="text-xs">Coming soon to</span>
                <span className="text-base font-bold">Google Play</span>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
};
