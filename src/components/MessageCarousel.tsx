
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { useAutoplayCarousel } from '@/lib/use-autoplay-carousel';

// Define message data structure
interface Message {
  id: number;
  text: string;
  time: string;
  hasLink?: boolean;
}

export const MessageCarousel = () => {
  const { t, isRtl } = useLanguage();
  
  // Sample messages
  const messages: Message[] = [
    {
      id: 1,
      text: "היי פרטנר, הגדרות הגלישה במכשירך לא מעודכנות. זה יכול לקרות אם החלפת מכשיר לאחרונה, ולהשפיע על הגלישה במכשירך. בדקות הקרובות תקבל הודעה שמכילה את כל ההגדרות המתאימות. תודה, הפרטנרים שלך.",
      time: "Tuesday 11:44"
    },
    {
      id: 2,
      text: "היי פרטנר, לצפייה בחשבוניות האחרונות שלך באיזור האישי באתר פרטנר יש להיכנס לקישור הבא: https://www.partner.co.il/n/mypartner/invoice תודה, הפרטנרים שלך",
      time: "Wednesday 09:18",
      hasLink: true
    },
    {
      id: 3,
      text: "שלום, יש לך חבילה בהמתנה. לפרטים ומעקב לחץ כאן: http://bit.ly/3pAckg",
      time: "Thursday 15:32",
      hasLink: true
    },
    {
      id: 4,
      text: "הודעה ממשרד הבריאות: במסגרת המאבק בנגיף הקורונה עליך להקפיד על הנחיות הריחוק החברתי ועטיית מסיכה. לפרטים נוספים: https://corona.health.gov.il",
      time: "Friday 12:05",
      hasLink: true
    },
    {
      id: 5,
      text: "חברת החשמל: קיימת הפסקת חשמל יזומה באזורך בין השעות 09:00-12:00. לבירורים: 103",
      time: "Monday 08:15"
    }
  ];

  // Use autoplay carousel hook with longer interval for messages
  const { setApi, handleMouseEnter, handleMouseLeave } = useAutoplayCarousel(5000);

  // Log event to Clarity when carousel interacted with
  const handleCarouselInteraction = () => {
    if (window.clarity) {
      window.clarity("event", "message_carousel_interaction");
    }
  };

  return (
    <section id="control" className="py-16 bg-fisherman-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('messageControl.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('messageControl.subtitle')}
          </p>
        </div>
        
        <div 
          dir="ltr"
          className="message-carousel max-w-2xl mx-auto"
          onClick={handleCarouselInteraction}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Carousel 
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {messages.map(message => (
                <CarouselItem key={message.id} className="md:basis-4/5">
                  <div 
                    className="message-wrapper"
                    dir={isRtl ? "rtl" : "ltr"}
                  >
                    {/* iOS Message Bubble */}
                    <div className="message-bubble bg-gray-200 rounded-2xl p-4 mb-2 max-w-full relative mr-4 ml-4">
                      <p className="text-black text-right">
                        {message.hasLink ? (
                          <>
                            {message.text.split('http').map((part, i, arr) => {
                              if (i === 0) return part;
                              const link = 'http' + part.split(' ')[0];
                              const restText = part.substring(link.length - 4);
                              return (
                                <React.Fragment key={i}>
                                  <span className="text-blue-500 underline">
                                    {link}
                                  </span>
                                  {restText}
                                </React.Fragment>
                              );
                            })}
                          </>
                        ) : (
                          message.text
                        )}
                      </p>
                    </div>
                    
                    {/* Message Time */}
                    <div className="message-time text-gray-500 text-xs text-center mb-4">
                      {message.time}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static transform-none" />
              <CarouselNext className="static transform-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
