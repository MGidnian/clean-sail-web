
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAutoplayCarousel } from '@/lib/use-autoplay-carousel';

// Define message data structure
interface Message {
  id: number;
  text: string;
  hasLink?: boolean;
}

export const MessageCarousel = () => {
  const { t, isRtl } = useLanguage();
  
  // Combined spam and phishing messages
  const messages: Message[] = [
    // Spam messages
    {
      id: 1,
      text: "שחקן פוקר! 15% בונוס היום! בוא לשחק איתנו אומהה והולדם בקלאב הכי פעיל בישראל https://did.li/pokerKatz",
      hasLink: true
    },
    {
      id: 2,
      text: "מה המצווה שלך?💖 1 נר שבת 2 תפילין 3 שמע ישראל 4 שבת",
    },
    {
      id: 3,
      text: "סמים שקיות רפואי🍀 מתנות למצטרפים לערוץ החדש🎁😍 https://bif.ly/zUfiSxU",
      hasLink: true
    },
    {
      id: 4,
      text: "במידה ויש לך החזר מס לשנת 2018 הוא עלול להימחק. אל תפספסו את הכספים שלכם. לבדיקה הירשמו https://taxstealingz.com/",
      hasLink: true
    },
    {
      id: 5,
      text: "לקראת הבחירות, במי תבחרו? 1 ליכוד 2 העבודה 3 גנץ",
    },
    // Phishing messages
    {
      id: 6,
      text: "חשבון Bit שלך ננעל עבור סיבות אבטחה. אנו מזהים את כניסה ממכשיר לא ידוע, אנא אמת זהותך, אחרת החשבון שלך יושבת https://ln.run/fmxJ7",
      hasLink: true
    },
    {
      id: 7,
      text: "היי, מחברת Cal, זיהינו פעילות חשודה בכרטיס שלך. אם לא תאמת את עצמך בקרוב, הכרטיס שלך יופסק. ln.run/POX8",
      hasLink: true
    },
    {
      id: 8,
      text: "החבילה שלך ממתינה למשלוח יש דמי מכס/מסים שעליך לשלם על המשלוח. הסכום הוא 21.19₪ https://did.li/rgKz",
      hasLink: true
    },
    {
      id: 9,
      text: "חשבון אפליקציית Yellow שלך ננעל זמנית לצורכי אבטחה. נא לאמת את זהותך בהקדם כדי למנוע השבתת החשבון: go-yellow.br/Security",
      hasLink: true
    },
    {
      id: 10,
      text: "שלום, הבחנו בכניסה חשודה לחשבון MAX שלך. נא לאמת את פרטיך, אחרת הכרטיס שלך ייחסם: max-finance.ly/login",
      hasLink: true
    },
  ];

  // Use autoplay carousel hook with longer interval for messages (2 seconds)
  const { setApi, handleMouseEnter, handleMouseLeave } = useAutoplayCarousel(2000);

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
          className="message-carousel-container max-w-4xl mx-auto overflow-hidden"
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
          >
            <CarouselContent className="gap-4">
              {messages.map(message => (
                <CarouselItem key={message.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div 
                    className="message-wrapper h-full"
                    dir={isRtl ? "rtl" : "ltr"}
                  >
                    {/* iOS Message Bubble */}
                    <div className="message-bubble bg-gray-200 rounded-2xl p-4 h-full">
                      <p className="text-black text-right">
                        {message.hasLink ? (
                          <>
                            {message.text.split(/https?:\/\/\S+/).map((part, i, arr) => {
                              if (i === 0 && arr.length === 1) return part;
                              
                              if (i === arr.length - 1) return part;
                              
                              const nextLink = message.text.substring(
                                message.text.indexOf(part) + part.length, 
                                message.text.indexOf(arr[i+1])
                              ).trim();
                              
                              return (
                                <React.Fragment key={i}>
                                  {part}
                                  {nextLink && (
                                    <span className="text-blue-500 underline"> {nextLink} </span>
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
