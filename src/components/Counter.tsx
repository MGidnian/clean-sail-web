
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const Counter = () => {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Start date: March 1st, 2025
    const startDate = new Date('2025-03-01T00:00:00Z');
    const startCount = 10000000; // 10 million messages on start date
    const messagesPerDay = 20000; // 20,000 messages per day
    
    // Calculate messages per millisecond
    const messagesPerMs = messagesPerDay / (24 * 60 * 60 * 1000);
    
    // Calculate initial count based on time elapsed since start date
    const calculateCount = () => {
      const now = new Date();
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
  
  // Determine shield size based on count length and mobile status
  const getShieldSize = () => {
    const countLength = Math.floor(count).toString().length;
    
    if (isMobile) {
      return "w-16 h-16"; // 4rem for mobile
    }
    
    // For desktop, adjust based on count length
    if (countLength > 10) {
      return "w-14 h-14";
    } else if (countLength > 8) {
      return "w-16 h-16";
    } else {
      return "w-20 h-20";
    }
  };
  
  return (
    <section className="py-16 bg-fisherman-blue">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex items-center justify-center mb-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t('counter.title')}
          </h2>
        </div>
        
        <div className="counter-display bg-white rounded-lg p-6 border border-gray-100 shadow-sm max-w-lg mx-auto flex justify-center items-center">
          <div className="flex justify-center">
            <ShieldCheck className={`${getShieldSize()} text-fisherman-blue flex-shrink-0`} />
          </div>
          <span className="text-4xl md:text-6xl font-mono font-bold text-fisherman-blue flex items-center whitespace-nowrap overflow-x-auto overflow-y-hidden no-scrollbar">
            <span className="mr-1">+</span>
            <span>{Math.floor(count).toLocaleString()}</span>
          </span>
        </div>
      </div>
    </section>
  );
};
