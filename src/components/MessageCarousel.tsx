
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAutoplayCarousel } from '@/lib/use-autoplay-carousel';
import { useIsMobile } from '@/hooks/use-mobile';

// Define message data structure
interface Message {
  id: number;
  text: string;
  hasLink?: boolean;
}

export const MessageCarousel = () => {
  const { t, isRtl } = useLanguage();
  const isMobile = useIsMobile();
  
  // Create a better selection of 8 messages for the carousel
  const messages: Message[] = [
    // Spam/phishing messages with clear examples
    {
      id: 1,
      text: "שחקן פוקר! 15% בונוס היום!\nבוא לשחק איתנו אומהה והולדם\nבקלאב הכי פעיל בישראל\nhttps://did.li/pokerKatz",
      hasLink: true
    },
    {
      id: 2,
      text: "חשבון Bit שלך ננעל עבור סיבות אבטחה.\nאנו מזהים את כניסה ממכשיר לא ידוע,\nאנא אמת זהותך, אחרת החשבון שלך יושבת\nhttps://ln.run/fmxJ7",
      hasLink: true
    },
    {
      id: 3,
      text: "היי, מחברת Cal, זיהינו פעילות חשודה בכרטיס שלך.\nאם לא תאמת את עצמך בקרוב, הכרטיס שלך יופסק.\nln.run/POX8",
      hasLink: true
    },
    {
      id: 4,
      text: "החבילה שלך ממתינה למשלוח\nיש דמי מכס/מסים שעליך לשלם על המשלוח.\nהסכום הוא 21.19₪\nhttps://did.li/rgKz",
      hasLink: true
    },
    {
      id: 5,
      text: "סמים שקיות רפואי🍀\nמתנות למצטרפים לערוץ החדש🎁😍\nhttps://bif.ly/zUfiSxU",
      hasLink: true
    },
    {
      id: 6,
      text: "Amazon: משלוח #IL5729 ממתין בהתראת מכס. לשחרור חבילה שלם 13₪:\namazon-ship.co/customs",
      hasLink: true
    },
    {
      id: 7,
      text: "התראה מבנק לאומי: זיהינו ניסיון גישה חריג לחשבון שלך. נא לאמת את זהותך:\nleumi-verify.co/auth",
      hasLink: true
    },
    {
      id: 8,
      text: "במידה ויש לך החזר מס לשנת 2018 הוא עלול להימחק.\nאל תפספסו את הכספים שלכם.\nלבדיקה הירשמו\nhttps://taxstealingz.com/",
      hasLink: true
    },
  ];

  // Make carousel 3x faster on mobile and 2x faster on desktop
  const autoplaySpeed = isMobile ? 2667 : 4000; // 2667ms for mobile, 4000ms for desktop
  const { setApi, handleMouseEnter, handleMouseLeave } = useAutoplayCarousel(autoplaySpeed);

  // Log event to Clarity when carousel interacted with
  const handleCarouselInteraction = () => {
    if (window.clarity) {
      window.clarity("event", "message_carousel_interaction");
    }
  };

  // Add tracking for specific messages viewed
  useEffect(() => {
    if (window.clarity) {
      window.clarity("event", "message_carousel_viewed", {
        language: isRtl ? "he" : "en"
      });
    }
  }, [isRtl]);

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
          className="max-w-5xl mx-auto overflow-hidden px-4"
          onClick={handleCarouselInteraction}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Carousel 
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
            setApi={setApi}
            dir="ltr" // Always use LTR for carousel itself
          >
            <CarouselContent className="-ml-6">
              {messages.map(message => (
                <CarouselItem key={message.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-6 pr-6">
                  <div className="message-wrapper h-full px-4" dir="rtl">
                    {/* iOS Message Bubble with proper styling */}
                    <div className="ios-message-bubble bg-gray-200 rounded-2xl p-4 max-w-[280px] mx-auto">
                      <p className="text-black text-sm whitespace-pre-line break-words">
                        {message.hasLink ? (
                          <>
                            {message.text.split(/https?:\/\/\S+|[a-z0-9-]+\.[a-z]{2,}\/[a-zA-Z0-9-]+/).map((part, i, arr) => {
                              // Only add the part if it's not empty
                              if (!part) return null;
                              
                              if (i === arr.length - 1) return part;
                              
                              const match = message.text.substring(
                                message.text.indexOf(part) + part.length
                              ).match(/https?:\/\/\S+|[a-z0-9-]+\.[a-z]{2,}\/[a-zA-Z0-9-]+/);
                              
                              const link = match ? match[0] : '';
                              
                              return (
                                <React.Fragment key={i}>
                                  {part}
                                  {link && (
                                    <span className="text-blue-500 underline">{link}</span>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </>
                        ) : (
                          message.text
                        )}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
