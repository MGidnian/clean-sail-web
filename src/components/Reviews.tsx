
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
}

export const Reviews = () => {
  const { t, isRtl } = useLanguage();
  
  // Review data
  const reviews: Review[] = [
    {
      id: 1,
      rating: 5,
      date: '26.12.2024',
      author: 'shavitcba',
      text: 'Great app\nLove this app! It\'s super easy to use, has great onboarding, and I really appreciate that it filters messages without needing access to my contacts. I even installed it on my parents\' phones.'
    },
    {
      id: 2,
      rating: 5,
      date: '05.09.2023',
      author: 'JayCee.10',
      text: 'Easy installation and very helpful!!\nInstalled in a minute without any issues. This app is very helpful to filter unwanted/unsolicited messages and saves a lot of time and attention! Especially for non-hebrew speakers living in Israel, it is a MUST!!'
    },
    {
      id: 3,
      rating: 5,
      date: '25.12.2024',
      author: 'Locutus44002.3',
      text: 'Locutus\nThis is the best SMS filtering app I\'ve used! It\'s incredibly easy to set up and use that makes managing messages even more intuitive. Highly recommended for anyone looking for efficient and user-friendly SMS filtering!"'
    },
    {
      id: 4,
      rating: 5,
      date: '10.11.2023',
      author: 'TechUser123',
      text: 'Perfect solution for spam\nI was getting bombarded with spam messages daily until I found this app. Now my message inbox is clean and organized. The app is lightweight and doesn\'t drain my battery.'
    },
    {
      id: 5,
      rating: 5,
      date: '03.01.2024',
      author: 'MobileExpert',
      text: 'Works exactly as advertised\nThis app delivers on its promise. It catches all the spam and phishing attempts while ensuring I never miss important messages. The interface is clean and modern too.'
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

  // Render partially filled star
  const renderRatingStars = () => {
    const fullStars = Math.floor(4.9);
    const partialStar = 4.9 - fullStars;
    
    return (
      <div className="flex">
        {/* Render full stars */}
        {Array(fullStars).fill(0).map((_, i) => (
          <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
        ))}
        
        {/* Render partial star */}
        <div className="relative w-6 h-6">
          <Star className="w-6 h-6 fill-gray-200 text-gray-200 absolute" />
          <div className="overflow-hidden absolute" style={{ width: `${partialStar * 100}%` }}>
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </div>
    );
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
            
            {renderRatingStars()}
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
