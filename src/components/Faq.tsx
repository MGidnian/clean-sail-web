
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Define FAQ data structure
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const Faq = () => {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  
  // Updated FAQ data with direct questions/answers
  const faqItems: FaqItem[] = [
    { 
      id: 1, 
      question: 'איזה סוגי הודעות SMS פישרמן מסנן?',
      answer: '1. פישינג - הודעות זדוניות המתחזות לתקשורת לגיטימית מעסקים (למשל דואר ישראל, ביט, DHL, UPS)\n2. ספאם - הודעות שנשלחות ללא תוכן ובעלי ערך נמוך (למשל ספאם בחירות, תזכורות לשבת, הצעות לסמים)\n3. פרסומות - הודעות קידום מכירות'
    },
    { 
      id: 2, 
      question: 'מה קורה כאשר הודעה מסוננת?',
      answer: 'ברגע שאתה מפעיל את פישרמן, תיקיית ספאם חדשה מתווספת לאפליקציית ההודעות שלך. כל ההודעות המסוננות יהיו זמינות שם. הסינונים מתעדכנים אוטומטית.'
    },
    { 
      id: 3, 
      question: 'איך פישרמן חוסם הודעות פישינג?',
      answer: 'כל הודעה שמתקבלת נסרקת ומאותתים רבים מופקים, כולל מילות מפתח וקישורים מההודעה. קישורים לא ידועים נשלחים למנוע זיהוי לסיווג האם הם הונאה (מעמידים פנים כעסק אחר לגניבת המידע שלך).\nבנוסף, טקסט ההודעה נסרק לחיפוש מילות מפתח של ספאם ופרסומות.'
    },
    { 
      id: 4, 
      question: 'האם פישרמן בחינם לשימוש?',
      answer: 'כן, פישרמן זמין בחינם לכל המשתמשים.'
    },
    { 
      id: 5, 
      question: 'מה קורה אם פישרמן חוסם הודעה לגיטימית?',
      answer: 'פישרמן משתמש במסננים מתקדמים עם אחוז נמוך מאוד של תוצאות שגויות. עם זאת, תמיד תוכל לראות הודעות חסומות בתיקיית דואר הזבל.'
    },
    { 
      id: 7, 
      question: 'האם האפליקציה זמינה ב-Android?',
      answer: 'האפליקציה זמינה כרגע ל-iOS בלבד, גרסת Android בפיתוח.'
    },
    { 
      id: 8, 
      question: 'מי עומד מאחורי פישרמן?',
      answer: 'היי, קוראים לי מתן גידניאן ואני המפתח של פישרמן. פישרמן התחיל כפרויקט קטן כדי להגן על משפחה וחברים מהודעות פישינג וכדי לקחת את השליטה חזרה על נויפיקציות מעצבנות מסמסים של ספאם. זה התחיל בקטנה ב2023 ומאז צמח לאלפי משתמשים. אהבתם? דרגו אותנו 5 כוכבים בחנות!'
    }
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
                  {item.question}
                </h3>
                
                <button className="text-fisherman-blue p-2">
                  {activeItem === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  activeItem === item.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="py-4 text-gray-600 whitespace-pre-line">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
