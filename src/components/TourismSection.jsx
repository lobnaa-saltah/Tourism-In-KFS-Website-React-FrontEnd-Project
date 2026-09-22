import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaCamera, FaStar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { tourismSpots } from '../data/tourismSpots';

const TourismSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef(null);



  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % tourismSpots.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + tourismSpots.length) % tourismSpots.length);
  };

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const timer = setInterval(() => autoPlayRef.current(), 6000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((currentIndex + i) % tourismSpots.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section id="tourism" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold font-bold tracking-wide text-sm lg:text-base mb-3 block">
            {t('tourism.label', 'اكتشف كفر الشيخ')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-navy font-cairo leading-tight mb-4">
            {t('tourism.title', 'لؤلؤة الدلتا الساحرة')}
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            {t('tourism.subtitle', 'استكشف جمال الطبيعة الخلابة والمعالم التاريخية العريقة التي تجعل من كفر الشيخ وجهة فريدة.')}
          </p>
        </div>

        {/* Slider Layout */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <AnimatePresence mode='popLayout' initial={false} custom={direction}>
              {visibleIndices.map((idx, i) => {
                const isCenter = i === 1;
                return (
                  <motion.div
                    key={`${tourismSpots[idx].id}-${currentIndex}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.9 }}
                    animate={{ 
                      opacity: isCenter ? 1 : 0.7, 
                      x: 0, 
                      scale: isCenter ? 1.05 : 0.95,
                      zIndex: isCenter ? 10 : 1
                    }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    onClick={() => navigate(`/tourism/${tourismSpots[idx].id}`, { state: { item: tourismSpots[idx] } })}
                    className={`relative group rounded-[2rem] overflow-hidden cursor-pointer h-[310px] shadow-2xl transition-all duration-500 ${
                      isCenter ? 'border-2 border-gold/20' : 'grayscale-[0.3]'
                    }`}
                  >
                    <img 
                      src={tourismSpots[idx].image} 
                      alt={tourismSpots[idx].name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent"></div>
                    
                    {/* Rating */}
                    <div className="absolute top-6 right-6">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2 text-white text-xs font-bold">
                        <FaStar className="text-gold" />
                        <span>{tourismSpots[idx].rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 text-gold text-xs font-black uppercase tracking-wider mb-2">
                        <FaMapMarkerAlt size={12} />
                        {tourismSpots[idx].location}
                      </div>
                      <h3 className="text-xl font-bold text-white leading-tight group-hover:text-gold transition-colors">
                        {tourismSpots[idx].name}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Story Image - Small and directly below cards */}
          <div className="mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-sm mx-auto flex justify-center"
            >
              <img 
                src="/images/tourism/كل مكان ليه حكايه مختلفه.png" 
                alt="كفر الشيخ.. كل مكان ليه حكاية" 
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>

          {/* Navigation - At the bottom */}
          <div className="flex items-center justify-center gap-8 mt-10">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-gold hover:border-gold hover:text-white transition-all shadow-sm">
              <FaChevronRight className={i18n.dir() === 'rtl' ? '' : 'rotate-180'} />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-gold hover:border-gold hover:text-white transition-all shadow-sm">
              <FaChevronLeft className={i18n.dir() === 'rtl' ? '' : 'rotate-180'} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TourismSection;
