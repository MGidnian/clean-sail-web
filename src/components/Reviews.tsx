
import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { useAutoplayCarousel } from '@/lib/use-autoplay-carousel';

// Define review data structure
interface Review {
  id: number;
  rating: number;
  date: string;
  author: string;
  text: string;
  title?: string;
}

export const Reviews = () => {
  const { t, isRtl } = useLanguage();
  
  // Updated review data
  const reviews: Review[] = [
    {
      id: 1,
      rating: 5,
      date: '12.03.2025',
      author: 'מר אייל',
      title: 'מומלץ',
      text: 'אפליקציה מעולה שעושה בדיוק את מה שהיא מיועדת לעשות. עוצרת הודעות sms מיותרות, יודעת להפריד בין הודעה לגיטימית לפרסומת למשל פנגו. אם פרסומת ההודעה תעבור לזבל אם הודעה לגיטימית מפנגו עבור תשלום תכנס ליעד. בקיצור נח ומומלץ וכמובן כחול לבן'
    },
    {
      id: 2,
      rating: 5,
      date: '26.01.2025',
      author: 'Coruja213',
      title: 'כלי מדהים שמסנן המון רעש',
      text: 'אפליקציה ממש נוחה ופשוטה שפשוט מקלה על החיים. במקום לקבל את כל ה״זבל״ זה פשוט מנקה את זה עבורך לתיקיה יעודית. לי אישית זה שומר על השפיות. המון תודה!'
    },
    {
      id: 3,
      rating: 5,
      date: '07.01.2025',
      author: 'Gutia111',
      title: 'סינון מעולה',
      text: 'שאפו לחבר׳ה שהחליטו לשים סוף להודעות הספאם הבלתי פוסקות! שיניתם לי את החיים וכל ההתראות מהפוליטיקה ירדו ⭐️⭐️⭐️⭐️⭐️'
    },
    {
      id: 4,
      rating: 5,
      date: '02.01.2025',
      author: 'נתן בר',
      title: 'עובד פצצה',
      text: 'לקח לי חצי דקה בהתחלה להבין איך מפעילים את החסימה האוטומטית. מהרגע הזה השתנו לי החיים, הפסקתי לקבל ספאם וזבל לחלוטין. ממליץ'
    },
    {
      id: 5,
      rating: 5,
      date: '05.08.2024',
      author: 'Roy_gold-nyc',
      title: 'בדיוק מה שהייתי צריך!!',
      text: 'פשוט נמאס לי לקבל הודעות לטלפון משירותים שבחיים לא נרשמתי אליהם. מסיבות, הלוואות וכל מיני דברים בעייתיים - פשוט חלאס. זה עצר את כל ההודעות האלה 👍🏻'
    },
    {
      id: 6,
      rating: 5,
      date: '2 years ago',
      author: 'Tommy_Zr',
      title: 'Works like MAGIC 🪄',
      text: 'From the moment I installed it - NO MORE JUNK SMS!! one of the most useful app I have. A must have for anyone 👌'
    },
    {
      id: 7,
      rating: 5,
      date: '2 years ago',
      author: 'ZoungiCo',
      title: 'סוף סוף הודעות סמס בלי ספאם',
      text: 'בזכות האפליקציה הזאת חזרתי להשתמש בהודעות סמס לטובת דברים חשובים כמו קביעת תורים, משלוחים וכו׳. כל הודעות הספאם שהיו נכנסים היום באופן אוטומטי לתיקיית ׳זבל׳, ולא צריך לסנן כלום ידנית. ממליץ בחום!'
    }
  ];

  // Use autoplay carousel hook
  const { setApi, handleMouseEnter, handleMouseLeave } = useAutoplayCarousel(3000);

  // Log event to Clarity when carousel interacted with
  const handleCarouselInteraction = () => {
    if (window.clarity) {
      window.clarity("event", "review_carousel_interaction");
    }
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
      />
    ));
  };

  return (
    <section id="reviews" className="py-16 bg-fisherman-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            {t('reviews.title')}
          </h2>
          
          <div className="flex items-center">
            <div className="flex flex-col items-end mr-4">
              <div className="flex items-center">
                <span className="text-4xl font-bold">{t('reviews.rating')}</span>
              </div>
            </div>
            
            <Star className="w-10 h-10 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
        
        <div 
          dir="ltr"
          className="testimonial-carousel"
          onClick={handleCarouselInteraction}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Carousel 
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              containScroll: "trimSnaps"
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {reviews.map(review => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                  <div 
                    className="testimonial-item bg-white rounded-xl p-5 shadow-sm h-full"
                    dir={isRtl ? "rtl" : "ltr"}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    {review.title && <div className="mb-2 font-bold">{review.title}</div>}
                    <div className="mb-2 font-semibold">{review.author}</div>
                    <p className="text-gray-700 text-sm whitespace-pre-line">{review.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
