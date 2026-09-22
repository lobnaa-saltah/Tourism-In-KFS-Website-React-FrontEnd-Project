import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaChevronRight, FaChevronLeft, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import PageHero from '../components/PageHero/PageHero';
import { tourismSpots } from '../data/tourismSpots';
import { highlightText } from '../utils/textUtils';
import { useImageGallery } from '../hooks/useImageGallery';

const TourismDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const stateItem = location.state?.item;
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (stateItem) {
      setSpot(stateItem);
    } else {
      const found = tourismSpots.find(s => s.id === parseInt(id)) || tourismSpots[0];
      setSpot(found);
    }
  }, [id, stateItem]);

  if (!spot) return null;

  // Generate some dummy gallery images based on the current spot and others
  const galleryImages = [
    spot.image,
    ...tourismSpots.filter(s => s.id !== spot.id).map(s => s.image).slice(0, 4)
  ];
  
  const { currentGalleryIndex, nextImage, prevImage } = useImageGallery(galleryImages);

  return (
    <div className="bg-slate-50 min-h-screen font-cairo overflow-x-hidden pb-20" dir="rtl">
      
      {/* Standard Page Hero */}
      <PageHero 
        title="تفاصيل المعلم السياحي" 
        subtitle="اكتشف سحر وجمال المعالم السياحية في محافظة كفر الشيخ"
      />

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-8 py-16 -mt-12 relative z-20 max-w-6xl">
        
        {/* Unified Content & Gallery Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[1.5rem] p-6 md:p-10 shadow-lg border border-slate-100 mb-12"
        >
          {/* Event Meta Data */}
          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm font-bold mb-6">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
              <FaMapMarkerAlt className="text-gold" size={16} />
              <span>{spot.location || 'كفر الشيخ'}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
              <FaStar className="text-gold" size={16} />
              <span>{spot.rating || '4.8'} / 5.0</span>
            </div>
            <div className="flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-xl">
              <span>معلم سياحي</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-black text-navy mb-8 leading-[1.5]">
            {highlightText(spot.name || spot.title)}
          </h1>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-slate-600 leading-[2] text-lg md:text-xl font-medium">
              {spot.description || spot.desc}
            </p>
          </div>

          {/* Gallery Section */}
          <div className="mb-8 border-b-2 border-slate-100 pb-4 inline-block w-full">
            <h3 className="text-3xl font-black text-gold inline-block border-b-4 border-gold pb-4 -mb-[20px]">
              معرض الصور
            </h3>
          </div>

          <div className="relative aspect-video rounded-[1.5rem] overflow-hidden group shadow-md border border-slate-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentGalleryIndex}
                src={galleryImages[currentGalleryIndex]}
                alt="Gallery image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Overlay for Navigation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Controls inside image */}
            <button 
              onClick={prevImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-gold hover:bg-gold hover:text-navy flex items-center justify-center transition-all z-10 opacity-0 group-hover:opacity-100"
            >
              <FaChevronRight size={20} className={i18n.dir() === 'rtl' ? '' : 'rotate-180'} />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-gold hover:bg-gold hover:text-navy flex items-center justify-center transition-all z-10 opacity-0 group-hover:opacity-100"
            >
              <FaChevronLeft size={20} className={i18n.dir() === 'rtl' ? '' : 'rotate-180'} />
            </button>
          </div>



        </motion.div>
      </section>
    </div>
  );
};

export default TourismDetails;
