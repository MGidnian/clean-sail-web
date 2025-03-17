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
    
    // Counter Section
    'counter.title': 'כמות ההודעות שפישרמן סינן עד כה',
    'counter.subtitle': 'מספר ההודעות שסוננו עד כה',
    'counter.since': 'מאז 1 במרץ 2025',
    'counter.messages': 'הודעות',
    'counter.rate': '20,000 הודעות מסוננות כל יום',
    
    // Message Control Section
    'messageControl.title': 'מחזירים את השליטה',
    'messageControl.subtitle': 'מפסיקים לקבל הודעות זבל, פרסומות ופישינג לדוגמא',
    
    // Values
    'values.title': 'למה פישרמן?',
    'values.privacy': 'שמירה על הפרטיות',
    'values.privacy.desc': 'לאפליקציה אין גישה לאנשי הקשר או למספר שלכם.',
    'values.together': 'ביחד ננצח!',
    'values.together.desc': 'אפשר לדווח על הודעות כדי לדייק את הסינון',
    'values.easy': 'קל לשימוש',
    'values.easy.desc': 'פועל אוטונטמי לחלוטין, מתקינים למשפחה ומגינים עליהם ללא מאמץ',
    
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
    'cta.subtitle': 'הורדו את פישרמן עכשיו והתחילו ליהנות מהודעות נקיות מספאם.',
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
    'faq5.question': 'האם האפליקציה פועלת גם ללא חיבור לאינטרנט?',
    'faq5.answer': 'כן, הסינון מתבצע על המכשיר עצמו ואינו דורש חיבור לאינטרנט.',
    'faq6.question': 'האם אני יכול לשחזר הודעות שנחסמו בטעות?',
    'faq6.answer': 'כן, כל ההודעות שנחסמות נשמרות בתיקיית הזבל ואפשר לשחזר אותן בקלות.',
    'faq7.question': 'האם האפליקציה צורכת הרבה סוללה?',
    'faq7.answer': 'לא, האפליקציה תוכננה לצרוך מעט מאוד משאבים ולא תשפיע על ביצועי המכשיר או על חיי הסוללה.',
    'faq8.question': 'האם האפליקציה משתדרגת באופן אוטומטי?',
    'faq8.answer': 'כן, האפליקציה מתעדכנת באופן אוטומטי עם דפוסי זיהוי חדשים כדי להתמודד עם איומים חדשים.',
    
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
    
    // Brands
    'brands.asSeenIn': 'כפי שנראה ב',
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
    
    // Counter Section
    'counter.title': 'Messages Filtered by Fisherman So Far',
    'counter.subtitle': 'Messages filtered so far',
    'counter.since': 'Since March 1, 2025',
    'counter.messages': 'messages',
    'counter.rate': '20,000 messages filtered every day',
    
    // Message Control Section
    'messageControl.title': 'Take Back Control',
    'messageControl.subtitle': 'Stop receiving spam, ads and phishing messages like these',
    
    // Values
    'values.title': 'Why Fisherman?',
    'values.privacy': 'Privacy Protection',
    'values.privacy.desc': 'The app has no access to your contacts or phone number.',
    'values.together': 'Together We Win!',
    'values.together.desc': 'You can report messages to improve filtering accuracy',
    'values.easy': 'Easy to Use',
    'values.easy.desc': 'Fully automatic operation, install for family and protect them effortlessly',
    
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
    'faq5.question': 'Does the app work without an internet connection?',
    'faq5.answer': 'Yes, filtering is done on the device itself and does not require an internet connection.',
    'faq6.question': 'Can I recover messages that were blocked by mistake?',
    'faq6.answer': 'Yes, all blocked messages are stored in the spam folder and can be easily recovered.',
    'faq7.question': 'Does the app consume a lot of battery?',
    'faq7.answer': 'No, the app is designed to consume very few resources and will not affect device performance or battery life.',
    'faq8.question': 'Does the app upgrade automatically?',
    'faq8.answer': 'Yes, the app automatically updates with new detection patterns to deal with new threats.',
    
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
    
    // Brands
    'brands.asSeenIn': 'As Seen In',
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
