import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaChevronLeft, FaTimes, FaCamera, FaChevronRight } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PageHero from '../components/PageHero/PageHero';
import { useTranslation } from 'react-i18next';

// --- Custom Zoom Controls for Map ---
const CustomZoomControls = () => {
  const map = useMap();
  return (
    <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 shadow-lg" dir="ltr">
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); map.setZoom(map.getZoom() + 1); }}
        className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-navy font-bold hover:bg-slate-100 transition-all text-xl cursor-pointer shadow-md"
      >
        +
      </button>
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); map.setZoom(map.getZoom() - 1); }}
        className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-navy font-bold hover:bg-slate-100 transition-all text-xl cursor-pointer shadow-md"
      >
        -
      </button>
    </div>
  );
};

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

// --- Map Icons ---
const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// --- Data ---
const tourismSpots = [
  // Page 1
  { id: 1, title: 'منطقة تل الفراعين الأثرى بدسوق', lat: 31.1963, lng: 30.7431, image: '/images/tourism/منطقة تل الفراعين الأثرى بدسوق.jpg', desc: 'مدينة بوتو القديمة، عاصمة الوجه البحري في عصر ما قبل الأسرات.' },
  { id: 2, title: 'محطة الملك فؤاد الأثرية بمدينة كفرالشيخ', lat: 31.1127, lng: 30.9400, image: '/images/tourism/محطة الملك فؤاد الأثرية بمدينة كفرالشيخ.jpg', desc: 'محطة قطارات تاريخية تم بناؤها في العهد الملكي.' },
  { id: 3, title: 'فنار بلطيم', lat: 31.5800, lng: 31.0900, image: '/images/tourism/فناره بلطيم.png', desc: 'من أقدم الفنارات في مصر، رمز تاريخي لمدينة بلطيم.' },
  { id: 4, title: 'وفد أمريكي يزور كنيسة العذراء مريم بسخا', lat: 31.0927, lng: 30.9415, image: '/images/tourism/وفد أمريكي يزور كنيسة العذراء مريم بسخا.jpg', desc: 'السياحة الدينية في كفر الشيخ.' },
  { id: 5, title: 'زيارة وفد من الكنيسة الأرثوذكسية الروسيه لكنيسه سخا', lat: 31.0927, lng: 30.9415, image: '/images/tourism/زيارة وفد من الكنيسة الأرثوذكسية الروسيه لكنيسه سخا.jpg', desc: 'وفود دولية تزور كنيسة سخا.' },
  { id: 6, title: 'مسار العائلة المقدسة بسخا', lat: 31.0930, lng: 30.9420, image: '/images/tourism/مسار العائلة المقدسه بسخا.jpg', desc: 'منطقة سخا والتي تشرفت بمرور العائلة المقدسة.' },
  { id: 7, title: 'متحف كفرالشيخ', lat: 31.1107, lng: 30.9388, image: '/images/tourism/متحف كفرالشيخ.jpg', desc: 'يضم قطعاً أثرية نادرة تعكس تاريخ المحافظة عبر العصور المختلفة.' },
  { id: 8, title: 'مصيف بلطيم', lat: 31.5700, lng: 31.0800, image: '/images/tourism/مصيف بلطيم.jpg', desc: 'مصيف العائلات الأول، يتميز بهدوئه وشواطئه الرملية الجميلة الممتدة.' },
  { id: 9, title: 'مسجد سيدي إبراهيم الدسوقي', lat: 31.1308, lng: 30.6414, image: '/images/tourism/مسجد سيدي إبراهيم الدسوقي.jpg', desc: 'من أهم المزارات الدينية الإسلامية، يتميز بعمارته الفريدة ومكانته الروحية العالية.' },
  
  // Page 2
  { id: 10, title: 'طابيه عرابي', lat: 31.5750, lng: 31.0850, image: '/images/tourism/طابيه عرابي.jpg', desc: 'طابية أثرية هامة.' },
  { id: 11, title: 'منزل الزعيم سعد باشا زغلول بمطوبس', lat: 31.3050, lng: 30.5250, image: '/images/tourism/منزل الزعيم سعد باشا زغلول بمطوبس.jpg', desc: 'معلم تاريخي بمطوبس.' },
  { id: 12, title: 'منطقة النخيل بمدينة مطوبس', lat: 31.2950, lng: 30.5150, image: '/images/tourism/منطقة النخيل بمدينة مطوبس.jpg', desc: 'طبيعة ساحرة ومزارع النخيل.' },
  { id: 13, title: 'تمثال للاله "حورس الصقر"', lat: 31.1110, lng: 30.9390, image: '/images/tourism/تمثال للاله حورس الصقر.jpg', desc: 'أحد أهم القطع الأثرية في متحف كفر الشيخ.' },
  { id: 14, title: 'مسجد أبو المكارم بمدينة فوه', lat: 31.2000, lng: 30.5500, image: '/images/tourism/مسجد أبو المكارم بمدينة فوه.jpg', desc: 'من المساجد الأثرية الهامة بمدينة فوه.' },
  { id: 15, title: 'متحف الأحياء المائية بمدينة بلطيم', lat: 31.5700, lng: 31.0800, image: '/images/tourism/متحف الأحياء المائية بمدينة بلطيم.jpg', desc: 'يضم أنواعاً مختلفة من الأحياء المائية.' },
  { id: 16, title: 'مأذنته الخشوعى الأثرية بمدينة البرلس', lat: 31.5550, lng: 31.0050, image: '/images/tourism/مأذنته الخشوعى الأثرية بمدينة البرلس.jpg', desc: 'منارة إسلامية أثرية.' },
  { id: 17, title: 'التكية الخلوتية بمدينة فوه', lat: 31.2050, lng: 30.5550, image: '/images/tourism/التكية الخلوتية بمدينة فوه.jpg', desc: 'من المعالم الإسلامية بمدينة فوه.' },
  { id: 18, title: 'الأكوابارك بمصيف بلطيم', lat: 31.5720, lng: 31.0820, image: '/images/tourism/الأكوابارك بمصيف بلطيم.jpg', desc: 'منطقة ترفيهية مميزة.' },
  
  // Page 3
  { id: 19, title: 'ربع الخطابية أو فندق التجار عمره 1200 عام بمدينة فوه', lat: 31.1950, lng: 30.5450, image: '/images/tourism/ربع الخطابية أو فندق التجار عمره 1200 عام بمدينة فوه.jpg', desc: 'أثر تاريخي فريد بمدينة فوه.' },
  { id: 20, title: 'مسجد سيدي طلحة ابى سعيد التلمساني بكفرالشيخ', lat: 31.1115, lng: 30.9415, image: '/images/tourism/مسجد سيدي طلحة ابى سعيد التلمساني بكفرالشيخ.jpg', desc: 'مسجد تاريخي بمدينة كفر الشيخ.' },
  { id: 21, title: 'قصر الملك فؤاد بكفرالشيخ', lat: 31.1125, lng: 30.9425, image: '/images/tourism/قصر الملك فؤاد بكفرالشيخ.jpg', desc: 'تحفة معمارية ملكية.' },
  { id: 22, title: 'رحلات نيليه بمدينة مطوبس', lat: 31.3020, lng: 30.5220, image: '/images/tourism/رحلات نيليه بمدينة مطوبس.jpg', desc: 'متعة التنزه في نهر النيل.' },
  { id: 23, title: 'رحلات نيليه في دسوق', lat: 31.1310, lng: 30.6410, image: '/images/tourism/رحلات نيليه في دسوق.jpg', desc: 'رحلات نهرية ممتعة.' },
  { id: 24, title: 'بوابة مصنع الطرابيش بفوه الأثرية ( 1240 هـ )', lat: 31.2010, lng: 30.5510, image: '/images/tourism/بوابة مصنع الطرابيش بفوه الأثرية.jpg', desc: 'أثر صناعي تاريخي.' },
  { id: 25, title: 'حديقة الحيوان بكفرالشيخ', lat: 31.1160, lng: 30.9460, image: '/images/tourism/حديقة الحيوان بكفرالشيخ.jpg', desc: 'متنزه عائلي جميل.' },
  { id: 26, title: 'فوه .. مدينة تميزت بصناعة الكليم والسجاد', lat: 31.2020, lng: 30.5520, image: '/images/tourism/فوه .. مدينة تميزت بصناعة الكليم والسجاد.jpg', desc: 'تراث الصناعات اليدوية.' },
  { id: 27, title: 'بحيرة البرلس', lat: 31.4550, lng: 30.9050, image: '/images/tourism/بحيرة البرلس.jpg', desc: 'ثاني أكبر البحيرات الطبيعية في مصر.' },
  
  // Page 4
  { id: 28, title: 'قناطر إدفينا بمدينة مطوبس', lat: 31.3030, lng: 30.5230, image: '/images/tourism/قناطر إدفينا بمدينة مطوبس.jpg', desc: 'تُعد من أهم المعالم الهندسية على نهر النيل فرع رشيد، وتتميز بمناظر طبيعية خلابة.' },
  { id: 29, title: 'رحلة ترفيهية لموظفي الديوان العام واسرهم إلى مصيف بلطيم', lat: 31.5730, lng: 31.0830, image: '/images/tourism/رحلة ترفيهية لموظفي الديوان العام.jpg', desc: 'رحلات ترفيهية عائلية.' },
  { id: 30, title: 'حديقة صنعاء بكفرالشيخ', lat: 31.1140, lng: 30.9380, image: '/images/tourism/حديقة صنعاء بكفرالشيخ.jpg', desc: 'أكبر حدائق المحافظة وأجملها.' },
  { id: 31, title: 'جزيرة الشخلوبة', lat: 31.4520, lng: 30.9020, image: '/images/tourism/جزيرة الشخلوبة.jpg', desc: 'تقع في بحيرة البرلس وتعتبر من أجمل الجزر.' },
  { id: 32, title: 'كنيسة العذراء مريم بسخا', lat: 31.0932, lng: 30.9425, image: '/images/tourism/كنيسة العذراء مريم بسخا 2.jpg', desc: 'من الداخل.' },
].map(spot => ({
  ...spot,
  // Add a fallback image handling just in case the specific image doesn't exist yet
  image: spot.image || 'https://images.unsplash.com/photo-1539667468225-eebb663053e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}));

// Filter spots specifically for the interactive map (Top 6 attractions)
const mapSpots = tourismSpots.filter(spot => [1, 2, 3, 28, 31, 32].includes(spot.id));

const Tourism = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // --- Pagination Logic ---
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(tourismSpots.length / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);

  const handlePageChange = (newPage) => {
    if (newPage === currentPage) return;
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  const currentSpots = tourismSpots.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // --- Map State ---
  const [activeLocation, setActiveLocation] = useState(null);
  const handleSelectLocation = (spot) => {
    setActiveLocation(spot);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-cairo overflow-x-hidden flex flex-col" dir="rtl">
      
      {/* 1. Hero Banner */}
      <PageHero
        title="السياحة والآثار"
        subtitle="اكتشف التراث العريق والطبيعة الساحرة في محافظة كفر الشيخ، لؤلؤة الدلتا."
      />

      {/* 2. Tourism Grid Carousel */}
      <section className="py-20 bg-white relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-black text-navy relative inline-block">
              ألبوم الذكريات السياحية
            </h2>
          </div>

          {/* Grid Carousel */}
          <div className="relative max-w-6xl mx-auto px-4 lg:px-12 min-h-[800px]">
            <AnimatePresence mode='wait' custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {currentSpots.map((spot) => (
                  <div
                    key={spot.id}
                    className="group rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(22,39,74,0.08)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white flex flex-col h-[320px] relative cursor-pointer"
                    onClick={() => navigate(`/tourism/${spot.id}`, { state: { item: spot } })}
                  >
                    <div className="w-full h-full relative overflow-hidden">
                      {/* Using an error handler for images that might not exist yet */}
                      <img 
                        src={spot.image} 
                        alt={spot.title} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1539667468225-eebb663053e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-6 text-center transform transition-transform duration-500">
                         <h3 className="text-white font-black text-lg mb-2 leading-tight drop-shadow-md">
                           {spot.title}
                         </h3>
                         <div className="inline-flex items-center gap-2 text-gold text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                           التفاصيل الكاملة <FaChevronLeft size={10} />
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="flex justify-center items-center gap-4 mt-12 pb-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-full bg-white text-navy shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-navy disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </button>

              <div className="flex items-center gap-2 mx-4" dir="ltr">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentPage === page ? 'w-10 bg-gold' : 'w-2.5 bg-slate-300 hover:bg-gold/50'
                      }`}
                      aria-label={`Go to slide ${page}`}
                    />
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-full bg-white text-navy shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-navy disabled:cursor-not-allowed"
              >
                <FaChevronLeft />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className="w-full relative bg-white pt-10 pb-0">
        
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-10 flex flex-col items-center justify-center text-center relative z-10" dir="rtl">
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
            الخريطة السياحية التفاعلية
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            دليلك لاستكشاف المعالم التاريخية والطبيعية في قلب الدلتا
          </p>
        </div>

        {/* Map Container */}
        <div className="flex flex-col lg:flex-row h-[650px] relative w-full bg-white border-t border-slate-200 z-10 shadow-xl" dir="ltr">
          
          {/* Map Area */}
          <div className="flex-1 h-full relative z-0 bg-slate-100">
            <MapContainer 
              key="map-tourism-v1"
              center={[31.1107, 30.9388]} 
              zoom={10} 
              className="w-full h-full"
              zoomControl={false}
            >
              <CustomZoomControls />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {mapSpots.map((spot) => (
                <Marker 
                  key={spot.id} 
                  position={[spot.lat, spot.lng]}
                  icon={activeLocation?.id === spot.id ? selectedIcon : defaultIcon}
                  eventHandlers={{
                    click: () => handleSelectLocation(spot),
                  }}
                >
                  <Popup className="font-cairo">
                    <div className="text-right" dir="rtl">
                      <strong className="block text-navy mb-1">معلم سياحي</strong>
                      <p className="text-sm text-gray-600 m-0 leading-relaxed font-bold">{spot.title}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {activeLocation && (
                <RecenterAutomatically lat={activeLocation.lat} lng={activeLocation.lng} />
              )}
            </MapContainer>
          </div>
          
          <div className="w-full lg:w-[460px] bg-white border-l border-slate-200 h-[400px] lg:h-full flex flex-col z-20">
            <div className="bg-navy text-white p-5 flex items-center justify-between shrink-0 shadow-md relative z-10" dir="rtl">
              <span className="font-bold text-white text-lg flex items-center gap-2">
                 <FaMapMarkerAlt className="text-gold" />
                 أهم المعالم
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-md text-sm font-bold border border-white/10">
                {mapSpots.length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50/50 custom-scrollbar" dir="rtl">
              {mapSpots.map((spot) => (
                <div 
                  key={spot.id}
                  onClick={() => handleSelectLocation(spot)}
                  className={`bg-white border rounded-2xl p-4 cursor-pointer transition-all duration-300 flex items-center gap-4 group
                    ${activeLocation?.id === spot.id ? 'border-gold shadow-md ring-1 ring-gold/50 bg-gold/5' : 'border-slate-100 hover:border-slate-200 hover:shadow-sm'}`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm relative">
                    <img src={spot.image} alt={spot.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {activeLocation?.id === spot.id && (
                       <div className="absolute inset-0 bg-gold/20 backdrop-blur-[1px] border border-gold/50 rounded-xl flex items-center justify-center">
                          <div className="w-2 h-2 bg-gold rounded-full animate-pulse shadow-[0_0_8px_#d4a32b]"></div>
                       </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-black mb-1 transition-colors text-sm ${activeLocation?.id === spot.id ? 'text-gold' : 'text-navy group-hover:text-gold'}`}>
                      {spot.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      <FaMapMarkerAlt className="inline mr-0.5 text-slate-300" /> اضغط للمعاينة
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Drawer */}
          <AnimatePresence>
            {activeLocation && (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 lg:right-[460px] w-full lg:w-[380px] h-full bg-white border-r border-slate-200 z-30 shadow-2xl flex flex-col"
                dir="rtl"
              >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <span className="text-xs font-black text-navy bg-gold/20 border border-gold/30 px-3 py-1 rounded-full flex items-center gap-1">
                    <FaCamera /> معلم سياحي
                  </span>
                  <button 
                    onClick={() => setActiveLocation(null)}
                    className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="w-full h-48 bg-slate-100 relative group">
                    <img 
                      src={activeLocation.image} 
                      alt={activeLocation.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-100"></div>
                    <div className="absolute bottom-4 right-4 text-white">
                       <h3 className="font-black text-xl drop-shadow-md">{activeLocation.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <h4 className="text-xs font-black text-gold mb-3 uppercase tracking-wide">
                        نبذة عن المعلم
                      </h4>
                      <p className="text-[15px] text-slate-700 leading-relaxed font-medium">
                        {activeLocation.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

    </div>
  );
};

export default Tourism;
