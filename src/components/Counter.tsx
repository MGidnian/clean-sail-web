
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Counter = () => {
  const { t } = useLanguage();
  const [count, setCount] = useState(10000000);
  
  // Calculate messages per millisecond based on 20,000 messages per day
  // 20,000 / (24 * 60 * 60 * 1000) = 0.0002314815 messages per millisecond
  const messagesPerMs = 20000 / (24 * 60 * 60 * 1000);
  
  useEffect(() => {
    // Update counter every 100ms
    const interval = setInterval(() => {
      setCount(prevCount => {
        // Increase by the number of messages in 100ms
        return prevCount + messagesPerMs * 100;
      });
    }, 100);
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "counter_section_viewed");
    }
    
    return () => clearInterval(interval);
  }, [messagesPerMs]);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          {t('counter.title')}
        </h2>
        
        <div className="bg-fisherman-gray rounded-xl p-8 shadow-sm max-w-2xl mx-auto">
          <div className="mb-4">
            <p className="text-lg mb-2">{t('counter.subtitle')}</p>
            <p className="text-sm text-gray-500">{t('counter.since')}</p>
          </div>
          
          <div className="counter-display bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <span className="text-3xl md:text-5xl font-mono font-bold text-fisherman-blue">
              {Math.floor(count).toLocaleString()}
            </span>
            <p className="text-sm text-gray-500 mt-2">{t('counter.messages')}</p>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">{t('counter.rate')}</p>
        </div>
      </div>
    </section>
  );
};
