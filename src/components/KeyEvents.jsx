import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const highlightText = (text) => {
  if (!text) return text;
  const regex = /["«'](.*?)["»']/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <span key={index} className="text-gold">{part}</span>;
    }
    return part;
  });
};

const KeyEvents = () => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef(null);
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: t('events.ai.title', 'سلسلة احمي نفسك: استخدام الذكاء الاصطناعي بحذر'),
      image: '/images/projects/ai-safety.jpg',
      date: '13 ديسمبر، 2025'
    },
    {
      id: 2,
      title: t('events.rights.title', 'الاستراتيجية الوطنية لحقوق الإنسان 2021-2026'),
      image: '/images/projects/human-rights.jpg',
      date: '13 ديسمبر، 2025'
    },
    {
      id: 3,
      title: t('events.sdgs.title', 'توطين أهداف التنمية المستدامة في كفر الشيخ'),
      image: '/images/vision/sdgs.jpg',
      date: '13 ديسمبر، 2025'
    },
    {
      id: 4,
      title: t('events.fuwah.title', 'فوة حيث يلتقي التاريخ بالإبداع'),
      image: '/images/projects/fuwah.jpg',
      date: '13 ديسمبر، 2025'
    },
    {
      id: 5,
      title: t('events.tasaloh.title', 'قدم على تصالح في مخالفات البناء'),
      image: '/images/projects/tasaloh.jpg',
      date: '13 ديسمبر، 2025'
    },
    {
      id: 6,
      title: t('events.investment.title', 'خطة المواطن الاستثمارية لمحافظة كفر الشيخ 2024 / 2025'),
      image: '/images/projects/investment-plan.jpg',
      date: '13 ديسمبر، 2025'
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const timer = setInterval(() => autoPlayRef.current(), 7000);
    return () => clearInterval(timer);
  }, []);

  // Display 3 items at a time on desktop, 1 on mobile
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((currentIndex + i) % events.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="py-20 bg-gray-50 border-b border-gray-100/60 overflow-hidden relative">
      {/* Subtle background element to make it sing */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold tracking-wide text-sm lg:text-base mb-3 block">
            الفعاليات الجارية
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-navy font-cairo mb-4 leading-tight">
            {t('events.title', 'أهم الأحداث')}
          </h2>
          <p className="text-gray-500 text-base lg:text-lg font-medium">
            {t('events.subtitle', 'تابع آخر الفعاليات والقرارات الرسمية داخل محافظة كفر الشيخ')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout' initial={false} custom={direction}>
              {visibleIndices.map((idx, i) => {
                const isCenter = i === 1;
                return (
                  <motion.div
                    key={`${events[idx].id}-${currentIndex}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.9 }}
                    animate={{ 
                      opacity: isCenter ? 1 : 0.6, 
                      x: 0, 
                      scale: isCenter ? 1.05 : 0.95,
                      zIndex: isCenter ? 10 : 1
                    }}
                    exit={{ opacity: 0, x: direction > 0 ? -50 : 50, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    onClick={() => navigate(`/news/${events[idx].id}`, { state: { item: events[idx] } })}
                    className={`group cursor-pointer bg-white border rounded-[2.5rem] overflow-hidden transition-all duration-500 ${
                      isCenter 
                        ? 'shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-gold/30' 
                        : 'shadow-sm border-gray-100 grayscale-[0.2]'
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={events[idx].image} 
                        alt={events[idx].title} 
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      {/* Blue Fog Overlay - Normal State */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent transition-opacity duration-500 ${isCenter ? 'group-hover:opacity-0' : ''}`}></div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold mb-4 uppercase tracking-widest">
                        <Calendar size={12} className="text-gold" />
                        <span>{events[idx].date}</span>
                      </div>
                      
                      <h3 className={`text-base lg:text-lg font-bold leading-tight transition-colors duration-300 ${
                        isCenter ? 'text-gold group-hover:text-navy' : 'text-gray-400'
                      }`}>
                        {highlightText(events[idx].title)}
                      </h3>
                    </div>
                    {isCenter && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-16">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-gold hover:border-gold hover:text-white transition-all shadow-sm"
            >
              <ChevronRight size={24} className={i18n.dir() === 'rtl' ? '' : 'rotate-180'} />
            </button>
            
            <div className="flex gap-2">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    currentIndex === i ? 'w-8 bg-gold' : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-gold hover:border-gold hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft size={24} className={i18n.dir() === 'rtl' ? '' : 'rotate-180'} />
            </button>
          </div>
        </div>


      </div>
    </section>
  );
};

export default KeyEvents;
