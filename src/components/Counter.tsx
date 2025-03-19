
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const Counter = () => {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Start date: March 1st, 2025
    const startDate = new Date('2025-03-01T00:00:00Z');
    const startCount = 10000000; // 10 million messages on start date
    
    // Calculate initial count based on time elapsed since start date
    const calculateCount = () => {
      const now = new Date();
      const currentHour = now.getHours();
      
      // Dynamic rate: 25,000 messages per day (updated from 20,000)
      const messagesPerDay = 25000;
      
      // Calculate messages per millisecond
      const messagesPerMs = messagesPerDay / (24 * 60 * 60 * 1000);
      
      const elapsedMs = now.getTime() - startDate.getTime();
      return startCount + (elapsedMs > 0 ? elapsedMs * messagesPerMs : 0);
    };
    
    // Set initial count
    setCount(calculateCount());
    
    // Update counter every 50ms for more visible counting
    const interval = setInterval(() => {
      setCount(calculateCount());
    }, 50);
    
    // Log event to Clarity if available
    if (window.clarity) {
      window.clarity("event", "counter_section_viewed");
    }
    
    return () => clearInterval(interval);
  }, []);
  
  // Determine counter font size based on count length and mobile status
  const getCounterFontSize = () => {
    const countLength = Math.floor(count).toString().length;
    
    if (isMobile) {
      if (countLength > 10) return "text-2xl";
      if (countLength > 8) return "text-3xl";
      return "text-4xl";
    }
    
    // For desktop
    if (countLength > 10) return "text-4xl";
    if (countLength > 8) return "text-5xl";
    return "text-6xl";
  };
  
  return (
    <section className="py-16 bg-fisherman-blue">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex items-center justify-center mb-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            <img 
              src="/lovable-uploads/cd6dbc8b-e617-4255-9828-6242b468cee5.png" 
              alt="Fisherman Logo" 
              className="w-12 h-12 md:w-16 md:h-16 mr-2 rounded-md"
            />
            {t('counter.title')}
          </h2>
        </div>
        
        <div className="counter-display bg-white rounded-lg p-6 border border-gray-100 shadow-sm max-w-lg mx-auto flex justify-center items-center">
          <span className={`${getCounterFontSize()} font-mono font-bold text-fisherman-blue flex items-center overflow-x-auto overflow-y-hidden no-scrollbar`}>
            {Math.floor(count).toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
};
