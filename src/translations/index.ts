
import { Language } from '@/contexts/LanguageContext';

// Define translations
export const translations: Record<Language, Record<string, string>> = {
  he: {
    // Navigation
    'nav.features': 'איך זה עובד?',
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
    'features.title': 'איך זה עובד?',
    'feature1.title': 'תיקיית זבל',
    'feature1.desc': 'תיקיית זבל בה יופיעו כל ההודעות שייחסמו.',
    'feature2.title': 'חסימת ספאם ופרסומות',
    'feature2.desc': 'לא עוד הודעות על נרות שבת, בחירות, טלגרס או הלוואות. הכל לתיקיית זבל.',
    'feature3.title': 'חסימת פישינג',
    'feature3.desc': 'חסימה אוטומטית של הודעות מתחזות לדואר ישראל, כרטיסי אשראי, פנגו וכו\'.',
    'feature4.title': 'עדכונים אוטומטיים',
    'feature4.desc': 'אחרי הפעלה, פישרמן עובד בשקט ברקע ללא תחזוקה.',
    
    // Download Section
    'download.title': 'הורידו עכשיו ותוך פחות מ-30 שניות תשכחו מהספאם',
    
    // CTA
    'cta.title': 'מוכנים להיפטר מהספאם?',
    'cta.subtitle': 'הורדו את פישרמן עכשיו והתחילו ליהנות מהודעות נקיות מספאם.',
    'cta.button': 'הורד עכשיו',
    
    // FAQ
    'faq.title': 'שאלות נפוצות',
    
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
    'nav.features': 'How it Works',
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
    'features.title': 'How it Works',
    'feature1.title': 'Spam Folder',
    'feature1.desc': 'A spam folder where all blocked messages will appear.',
    'feature2.title': 'Spam & Ad Blocking',
    'feature2.desc': 'No more messages about Shabbat candles, elections, Telegram groups, or loans. All to the spam folder.',
    'feature3.title': 'Phishing Protection',
    'feature3.desc': 'Automatic blocking of messages impersonating Israel Post, credit cards, Pango, and more.',
    'feature4.title': 'Automatic Updates',
    'feature4.desc': 'After activation, Fisherman works quietly in the background with no maintenance required.',
    
    // Download Section
    'download.title': 'Download now and forget about spam in less than 30 seconds',
    
    // CTA
    'cta.title': 'Ready to get rid of spam?',
    'cta.subtitle': 'Download Fisherman now and start enjoying messages free of spam.',
    'cta.button': 'Download Now',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    
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
