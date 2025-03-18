
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/translations';

// Define language options
export type Language = 'he' | 'en';

// Define context type
type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRtl: boolean;
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('he');

  const toggleLanguage = () => {
    const newLanguage = language === 'he' ? 'en' : 'he';
    setLanguage(newLanguage);
    
    // Update HTML dir and lang attributes
    document.documentElement.dir = newLanguage === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
    
    // Log event to Clarity
    if (window.clarity) {
      window.clarity("event", "language_toggle", {
        language: newLanguage
      });
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRtl = language === 'he';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
