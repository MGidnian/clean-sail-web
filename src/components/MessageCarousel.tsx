
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
      text: "שחקן פוקר! 15% בונוס היום!\nבוא לשחק איתנו אומהה והולדם\nבקלאב הכי פעיל בישראל\nhttps://did.li/pokerKatz",
      hasLink: true
    },
    {
      id: 2,
      text: "מה המצווה שלך?💖\n1 נר שבת\n2 תפילין\n3 שמע ישראל\n4 שבת",
    },
    {
      id: 3,
      text: "סמים שקיות רפואי🍀\nמתנות למצטרפים לערוץ החדש🎁😍\nhttps://bif.ly/zUfiSxU",
      hasLink: true
    },
    {
      id: 4,
      text: "במידה ויש לך החזר מס לשנת 2018 הוא עלול להימחק.\nאל תפספסו את הכספים שלכם.\nלבדיקה הירשמו\nhttps://taxstealingz.com/",
      hasLink: true
    },
    {
      id: 5,
      text: "לקראת הבחירות, במי תבחרו?\n1 ליכוד\n2 העבודה\n3 גנץ",
    },
    // Phishing messages
    {
      id: 6,
      text: "חשבון Bit שלך ננעל עבור סיבות אבטחה.\nאנו מזהים את כניסה ממכשיר לא ידוע,\nאנא אמת זהותך, אחרת החשבון שלך יושבת\nhttps://ln.run/fmxJ7",
      hasLink: true
    },
    {
      id: 7,
      text: "היי, מחברת Cal, זיהינו פעילות חשודה בכרטיס שלך.\nאם לא תאמת את עצמך בקרוב, הכרטיס שלך יופסק.\nln.run/POX8",
      hasLink: true
    },
    {
      id: 8,
      text: "החבילה שלך ממתינה למשלוח\nיש דמי מכס/מסים שעליך לשלם על המשלוח.\nהסכום הוא 21.19₪\nhttps://did.li/rgKz",
      hasLink: true
    },
    {
      id: 9,
      text: "חשבון אפליקציית Yellow שלך ננעל זמנית לצורכי אבטחה.\nנא לאמת את זהותך בהקדם כדי למנוע השבתת החשבון:\ngo-yellow.br/Security",
      hasLink: true
    },
    {
      id: 10,
      text: "שלום, הבחנו בכניסה חשודה לחשבון MAX שלך.\nנא לאמת את פרטיך, אחרת הכרטיס שלך ייחסם:\nmax-finance.ly/login",
      hasLink: true
    },
  ];

  // Use autoplay carousel hook with slower interval (5 seconds) for a steadier movement
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
          className="message-carousel-container max-w-5xl mx-auto overflow-hidden"
          onClick={handleCarouselInteraction}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Carousel 
            opts={{
              align: "start",
              loop: true,
              dragFree: false,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="gap-4">
              {messages.map(message => (
                <CarouselItem key={message.id} className="md:basis-1/3 lg:basis-1/4">
                  <div 
                    className="message-wrapper h-full"
                    dir={isRtl ? "rtl" : "ltr"}
                  >
                    {/* iOS Message Bubble */}
                    <div className="message-bubble bg-gray-200 rounded-2xl p-3 h-full w-[240px] min-h-[120px]">
                      <p className="text-black text-right text-sm whitespace-pre-line">
                        {message.hasLink ? (
                          <>
                            {message.text.split(/https?:\/\/\S+|[a-z0-9-]+\.[a-z]{2,}\/[a-zA-Z0-9-]+/).map((part, i, arr) => {
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
