import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { GooglePlayModal } from './GooglePlayModal';
export const Hero = () => {
  const {
    t,
    language
  } = useLanguage();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleAppStoreClick = () => {
    // Open App Store link
    window.open('https://apps.apple.com/app/fisherman/id123456789?utm_source=website&utm_medium=hero_section&utm_campaign=top_button', '_blank');

    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "app_store_click");
    }
  };
  const handleGooglePlayClick = () => {
    // Open modal instead of Play Store
    setIsModalOpen(true);

    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "google_play_click");
    }
  };
  return <section className="pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-fisherman-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-start">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-fisherman-blue">
              {language === 'he' ? 'פישרמן' : 'Fisherman'}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {t('hero.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 px-[77px]">
              {/* App Store Button */}
              <button onClick={handleAppStoreClick} className="transition-transform hover:scale-105 focus:outline-none">
                <img src="/lovable-uploads/8a714a89-15bd-41d0-a803-d8146614d336.png" alt="Download on the App Store" className="h-14 w-auto" />
              </button>
              
              {/* Google Play Button */}
              <button onClick={handleGooglePlayClick} className="transition-transform hover:scale-105 focus:outline-none">
                <img src="/lovable-uploads/b5740ab3-4fdc-4b42-8513-67264cf236c6.png" alt="Get it on Google Play" className="h-14 w-auto" />
              </button>
            </div>
          </div>
          
          {/* App Screenshot */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <img src="/lovable-uploads/556d17c9-2794-4145-bbc1-3c9e92b190e4.png" alt="iPhone with Fisherman App" className="w-auto h-[500px] object-contain animate-fade-in" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Google Play Modal */}
      <GooglePlayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>;
};
