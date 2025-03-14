
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define language options
export type Language = 'he' | 'en';

// Define context type
type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRtl: boolean;
};

// Define translations
const translations: Record<Language, Record<string, string>> = {
  he: {
    // Navigation
    'nav.features': 'תכונות',
    'nav.reviews': 'ביקורות',
    'nav.contact': 'צור קשר',
    'nav.download': 'הורד עכשיו',
    
    // Hero Section
    'hero.title': 'חסימת ספאם והודעות פישינג',
    'hero.subtitle': 'האפליקציה מספר 1 בישראל לחסימת ספאם והודעות פישינג',
    'hero.download': 'הורד עכשיו',
    
    // Values
    'values.title': 'למה פישרמן?',
    'values.protection': 'הגנה מפני ספאם',
    'values.protection.desc': 'חסימה אוטומטית של הודעות ספאם ופרסומות',
    'values.phishing': 'הגנה מפני פישינג',
    'values.phishing.desc': 'זיהוי וחסימה של הודעות פישינג מתחזות',
    'values.easy': 'קל לשימוש',
    'values.easy.desc': 'התקנה פשוטה ועבודה ברקע ללא צורך בתחזוקה',
    
    // Reviews
    'reviews.title': 'דירוגים וביקורות',
    'reviews.count': '28 דירוגים',
    'reviews.rating': '4.9',
    'reviews.outOf': 'מתוך 5',
    
    // Features
    'features.title': 'תכונות',
    'feature1.title': 'תיקיית זבל',
    'feature1.desc': 'תיקיית זבל בה יופיעו כל ההודעות שייחסמו.',
    'feature2.title': 'חסימת ספאם ופרסומות',
    'feature2.desc': 'לא עוד הודעות על נרות שבת, בחירות, טלגרס או הלוואות. הכל לתיקיית זבל.',
    'feature3.title': 'חסימת פישינג',
    'feature3.desc': 'חסימה אוטומטית של הודעות מתחזות לדואר ישראל, כרטיסי אשראי, פנגו וכו\'.',
    'feature4.title': 'עדכונים אוטומטיים',
    'feature4.desc': 'אחרי הפעלה, פישרמן עובד בשקט ברקע ללא תחזוקה.',
    
    // CTA
    'cta.title': 'מוכנים להיפטר מהספאם?',
    'cta.subtitle': 'הורידו את פישרמן עכשיו והתחילו ליהנות מהודעות נקיות מספאם.',
    'cta.button': 'הורד עכשיו',
    
    // FAQ
    'faq.title': 'שאלות נפוצות',
    'faq1.question': 'האם האפליקציה פתוחה בחינם?',
    'faq1.answer': 'כן, האפליקציה חינמית לחלוטין.',
    'faq2.question': 'האם האפליקציה צופה בהודעות שלי?',
    'faq2.answer': 'לא, האפליקציה אינה צופה בתוכן ההודעות ואינה שולחת מידע לשרתים חיצוניים.',
    'faq3.question': 'האם האפליקציה זמינה ב-Android?',
    'faq3.answer': 'האפליקציה זמינה כרגע ל-iOS בלבד, גרסת Android בפיתוח.',
    'faq4.question': 'כיצד האפליקציה מזהה הודעות ספאם ופישינג?',
    'faq4.answer': 'האפליקציה משתמשת באלגוריתם מתקדם שמזהה מאפיינים של הודעות ספאם ופישינג.',
    
    // Footer
    'footer.privacy': 'מדיניות פרטיות',
    'footer.terms': 'תנאי שימוש',
    'footer.contact': 'צור קשר',
    'footer.copyright': '© 2024 פישרמן. כל הזכויות שמורות.',
    
    // Modal
    'modal.title': 'הירשמו לעדכון כשהאפליקציה תהיה זמינה ב-Android',
    'modal.subtitle': 'נעדכן אותך ברגע שהאפליקציה תהיה זמינה להורדה.',
    'modal.email': 'אימייל',
    'modal.phone': 'מספר טלפון',
    'modal.prefix': 'קידומת',
    'modal.submit': 'שלח',
    'modal.success': 'תודה! נעדכן אותך כשהאפליקציה תהיה זמינה.',
    'modal.close': 'סגור',
  },
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'nav.download': 'Download Now',
    
    // Hero Section
    'hero.title': 'Block Spam & Phishing Messages',
    'hero.subtitle': 'Israel\'s #1 App for Blocking Spam & Phishing Messages',
    'hero.download': 'Download Now',
    
    // Values
    'values.title': 'Why Fisherman?',
    'values.protection': 'Spam Protection',
    'values.protection.desc': 'Automatic blocking of spam and advertisement messages',
    'values.phishing': 'Phishing Protection',
    'values.phishing.desc': 'Identify and block fraudulent phishing messages',
    'values.easy': 'Easy to Use',
    'values.easy.desc': 'Simple setup and background operation without maintenance',
    
    // Reviews
    'reviews.title': 'Ratings & Reviews',
    'reviews.count': '28 Ratings',
    'reviews.rating': '4.9',
    'reviews.outOf': 'out of 5',
    
    // Features
    'features.title': 'Features',
    'feature1.title': 'Spam Folder',
    'feature1.desc': 'A spam folder where all blocked messages will appear.',
    'feature2.title': 'Spam & Ad Blocking',
    'feature2.desc': 'No more messages about Shabbat candles, elections, Telegram groups, or loans. All to the spam folder.',
    'feature3.title': 'Phishing Protection',
    'feature3.desc': 'Automatic blocking of messages impersonating Israel Post, credit cards, Pango, and more.',
    'feature4.title': 'Automatic Updates',
    'feature4.desc': 'After activation, Fisherman works quietly in the background with no maintenance required.',
    
    // CTA
    'cta.title': 'Ready to get rid of spam?',
    'cta.subtitle': 'Download Fisherman now and start enjoying messages free of spam.',
    'cta.button': 'Download Now',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq1.question': 'Is the app free to use?',
    'faq1.answer': 'Yes, the app is completely free.',
    'faq2.question': 'Does the app read my messages?',
    'faq2.answer': 'No, the app does not read the content of your messages and does not send information to external servers.',
    'faq3.question': 'Is the app available on Android?',
    'faq3.answer': 'The app is currently available for iOS only, Android version is in development.',
    'faq4.question': 'How does the app identify spam and phishing messages?',
    'faq4.answer': 'The app uses an advanced algorithm that identifies characteristics of spam and phishing messages.',
    
    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2024 Fisherman. All rights reserved.',
    
    // Modal
    'modal.title': 'Sign up for Android availability',
    'modal.subtitle': 'We\'ll notify you when the app is available for download.',
    'modal.email': 'Email',
    'modal.phone': 'Phone Number',
    'modal.prefix': 'Prefix',
    'modal.submit': 'Submit',
    'modal.success': 'Thank you! We\'ll update you when the app is available.',
    'modal.close': 'Close',
  },
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
