
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Define FAQ data structure
interface FaqItem {
  id: number;
  key: string;
}

export const Faq = () => {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  
  // FAQ data with corresponding translation keys
  const faqItems: FaqItem[] = [
    { id: 1, key: 'faq1' },
    { id: 2, key: 'faq2' },
    { id: 3, key: 'faq3' },
    { id: 4, key: 'faq4' }
  ];
  
  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "faq_toggle", {
        faqId: id,
        action: activeItem === id ? "collapse" : "expand"
      });
    }
  };
  
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          {t('faq.title')}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map(item => (
            <div 
              key={item.id} 
              className={`faq-item ${activeItem === item.id ? 'active' : ''} border-b border-gray-200 py-4`}
            >
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleItem(item.id)}
              >
                <h3 className="text-xl font-medium">
                  {t(`${item.key}.question`)}
                </h3>
                
                <button className="text-fisherman-blue p-2">
                  {activeItem === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  activeItem === item.id ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="py-4 text-gray-600">
                  {t(`${item.key}.answer`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
