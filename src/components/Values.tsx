
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, MessageSquare, Zap } from 'lucide-react';

export const Values = () => {
  const { t } = useLanguage();
  
  // Log event to Clarity when section is visible
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && window.clarity) {
            window.clarity("event", "values_section_viewed");
          }
        });
      },
      { threshold: 0.5 }
    );
    
    const section = document.getElementById('values-section');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="values-section" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          {t('values.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1: Spam Protection */}
          <div className="bg-fisherman-gray rounded-xl p-6 transition-all duration-300 hover:shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-fisherman-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('values.protection')}</h3>
            <p className="text-gray-600">{t('values.protection.desc')}</p>
          </div>
          
          {/* Value 2: Phishing Protection */}
          <div className="bg-fisherman-gray rounded-xl p-6 transition-all duration-300 hover:shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <MessageSquare className="h-12 w-12 text-fisherman-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('values.phishing')}</h3>
            <p className="text-gray-600">{t('values.phishing.desc')}</p>
          </div>
          
          {/* Value 3: Easy to Use */}
          <div className="bg-fisherman-gray rounded-xl p-6 transition-all duration-300 hover:shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <Zap className="h-12 w-12 text-fisherman-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('values.easy')}</h3>
            <p className="text-gray-600">{t('values.easy.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
