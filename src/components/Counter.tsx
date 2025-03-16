
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck } from 'lucide-react';

export const Counter = () => {
  const { t, isRtl } = useLanguage();
  const [count, setCount] = useState(0);
  
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
  
  return (
    <section className="py-16 bg-fisherman-blue">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex items-center justify-center mb-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t('counter.title')}
          </h2>
        </div>
        
        <div className="counter-display bg-white rounded-lg p-6 border border-gray-100 shadow-sm max-w-lg mx-auto flex justify-center items-center">
          <ShieldCheck className="w-16 h-16 text-fisherman-blue mr-4" />
          <span className="text-4xl md:text-6xl font-mono font-bold text-fisherman-blue flex items-center">
            {isRtl ? (
              <>
                {Math.floor(count).toLocaleString()}
                <span className="ml-1">+</span>
              </>
            ) : (
              <>
                <span className="mr-1">+</span>
                {Math.floor(count).toLocaleString()}
              </>
            )}
          </span>
        </div>
      </div>
    </section>
  );
};
