import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeadset, FaMapMarkerAlt, FaMapMarkedAlt, FaChevronLeft, FaTimes, FaMapSigns } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PageHero from '../components/PageHero/PageHero';

// Custom icon for unselected markers
const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for selected marker
const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map re-centering
const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

// Custom Zoom Controls
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

const opportunitiesList = [
  {
    id: 1,
    title: 'مول تجاري بمساحة 0.78 فدان (3299 م2)، يقع أمام نادي الشرطة',
    lat: 31.1127,
    lng: 30.9408,
  },
  {
    id: 2,
    title: 'مول تجاري وسكني بمساحة 6.3 قيراط (1,102.90 م2)، يقع أمام مدرسة جمال عبدالناصر',
    lat: 31.1157,
    lng: 30.9358,
  },
  {
    id: 3,
    title: 'فندق بمساحة 2,886.85 م2، بجوار مسار العائلة المقدسة وجوار الجامعة',
    lat: 31.1087,
    lng: 30.9458,
  },
  {
    id: 4,
    title: 'منطقة لوجستية وسكنية (مطور عقاري) بمساحة 7.72 فدان (32,444.49 م2)، بجوار أبراج المحافظة بشارع المصنع',
    lat: 31.1057,
    lng: 30.9328,
  },
  {
    id: 5,
    title: 'برج استثماري وسكني (سكني - إداري) بمساحة 4 قيراط (704.41 م2)، يقع في سخا، الخضار القديم',
    lat: 31.0927,
    lng: 30.9388,
  },
  {
    id: 6,
    title: 'فرصة استثمارية بمدينة سيدي سالم',
    lat: 31.2857,
    lng: 30.7958,
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const DiverseOpportunities = () => {
  const navigate = useNavigate();
  const [activeLocation, setActiveLocation] = useState(null);

  const handleSelectLocation = (opp) => {
    setActiveLocation(opp);
  };

  return (
    <div className="bg-slate-50 flex flex-col font-cairo overflow-x-hidden min-h-screen">
      
      {/* 1. Hero Banner */}
      <PageHero
        title="فرص متنوعة"
        subtitle="فرص استثمارية"
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-16 relative z-20" dir="rtl">
        
        {/* 2. Info Section (Redesigned - Transparent Text + Floating Card) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 mt-8">
          
          {/* Right Side: Features (Text only, no background) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full lg:w-7/12 flex flex-col justify-center order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-bold mb-6 w-max shadow-sm">
              <span className="w-2 h-2 bg-gold rounded-full"></span>
              رؤية استثمارية
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-navy mb-6 leading-tight drop-shadow-sm">
              لماذا الاستثمار في <span className="text-[#c29526]">الفرص المتنوعة؟</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              تفتح محافظة كفر الشيخ أبوابها للمستثمرين ورجال الأعمال من خلال مجموعة حصرية ومتنوعة من الفرص الاستثمارية التي تم اختيار مواقعها بعناية لضمان أعلى عوائد ربحية، مما يجعلها بيئة مثالية للنمو الاقتصادي المستدام.
            </p>
          </motion.div>

          {/* Left Side: Contact (Sleek Floating Card) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="w-full lg:w-5/12 order-1 lg:order-2"
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(22,39,74,0.08)] border border-slate-100 relative overflow-hidden flex flex-col items-center text-center">

              <div className="bg-gradient-to-br from-navy to-[#1a2d54] p-4 rounded-2xl mb-6 shadow-lg shadow-navy/20 relative z-10">
                <FaHeadset size={36} className="text-white" />
              </div>
              
              <h3 className="text-navy text-2xl font-black mb-4 leading-snug relative z-10">
                هل ترغب في التقدم لأي فرصة أو لديك استفسار؟
              </h3>
              
              <p className="text-slate-500 mb-8 font-medium text-sm relative z-10">
                فريقنا متاح دائماً للرد على استفساراتك وتسهيل كافة الإجراءات الاستثمارية.
              </p>
              
              <button 
                onClick={() => navigate('/investments/contact')}
                className="group relative overflow-hidden bg-navy text-white font-black px-8 py-3.5 rounded-xl shadow-lg shadow-navy/30 hover:shadow-[#c29526]/40 hover:bg-[#c29526] w-full text-lg transition-all duration-300 z-10 flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  تواصل معنا الآن 
                  <FaChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                </span>
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Map Section */}
      <div className="w-full bg-white border-t border-slate-200 pt-20">
        
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-12 flex flex-col items-center justify-center text-center relative z-10" dir="rtl">
          <h2 className="text-3xl md:text-4xl font-black text-navy relative inline-block">
            فرص متنوعة وتوزيعها الجغرافي
          </h2>
        </div>

        {/* Full-width Map Workspace Container - LTR for Leaflet layout */}
        <div className="flex flex-col lg:flex-row h-[650px] overflow-hidden relative border-t border-slate-200" dir="ltr">
          
          {/* Left Side: Leaflet Map Container */}
          <div className="flex-1 h-full relative z-0 bg-slate-100">
            <MapContainer 
              key="map-diverse-v2"
              center={[31.1107, 30.9388]} 
              zoom={12} 
              className="w-full h-full"
              zoomControl={false}
            >
              <CustomZoomControls />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {opportunitiesList.map((opp) => (
                <Marker 
                  key={opp.id} 
                  position={[opp.lat, opp.lng]}
                  icon={activeLocation?.id === opp.id ? selectedIcon : defaultIcon}
                  eventHandlers={{
                    click: () => handleSelectLocation(opp),
                  }}
                >
                  <Popup className="font-cairo">
                    <div className="text-right" dir="rtl">
                      <strong className="block text-navy mb-1">فرصة استثمارية</strong>
                      <p className="text-sm text-gray-600 m-0 leading-relaxed">{opp.title}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {activeLocation && (
                <RecenterAutomatically lat={activeLocation.lat} lng={activeLocation.lng} />
              )}
            </MapContainer>
          </div>
          
          {/* Right Side: Scrollable Sidebar Directory (RTL logic inside) */}
          <div className="w-full lg:w-[460px] bg-white border-l border-slate-200 h-[400px] lg:h-full flex flex-col z-20">
            {/* Header */}
            <div className="bg-navy text-white p-5 flex items-center justify-between shrink-0" dir="rtl">
              <span className="font-bold text-white text-lg">قائمة فرص متنوعة</span>
              <span className="bg-white/10 px-3 py-1 rounded-md text-sm font-bold">
                {opportunitiesList.length}
              </span>
            </div>
            
            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50/50 p-4 space-y-4 custom-scrollbar" dir="rtl">
              {opportunitiesList.map((opp) => (
                <div 
                  key={opp.id}
                  onClick={() => handleSelectLocation(opp)}
                  className={`premium-card cursor-pointer p-4 bg-white border rounded-2xl transition-all flex gap-3 relative group ${
                    activeLocation?.id === opp.id 
                      ? 'border-gold shadow-md bg-gold/5 scale-[1.01]' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3 w-full">
                    <FaMapMarkerAlt className={`mt-1 shrink-0 transition-colors ${activeLocation?.id === opp.id ? 'text-gold' : 'text-gray-400'}`} size={16} />
                    <div className="w-full">
                      <h4 className="text-navy font-bold leading-relaxed mb-3 text-[15px]">
                        {opp.title}
                      </h4>
                      <span className={`text-sm font-bold flex items-center gap-1 transition-colors ${
                        activeLocation?.id === opp.id ? 'text-gold' : 'text-gray-400 group-hover:text-gold'
                      }`}>
                        <FaChevronLeft size={10} className="mt-0.5 shrink-0 rtl:-rotate-180" />
                        اضغط للتحديد على الخريطة
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 3. Detail Drawer (Pops up when selectedItem is active) */}
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
                {/* Header inside drawer */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <span className="text-xs font-black text-navy bg-gold/20 border border-gold/30 px-3 py-1 rounded-full">
                    فرصة استثمارية
                  </span>
                  <button 
                    onClick={() => setActiveLocation(null)}
                    className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>

                {/* Scrollable details */}
                <div className="flex-1 overflow-y-auto">
                  <div className="w-full h-40 bg-slate-100 relative">
                    <img 
                      src="/images/tourism/فرص استثماريه متنوعه.jpg" 
                      alt={activeLocation.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  <div className="p-5 flex flex-col gap-6">
                    {/* Detailed Description */}
                    <div>
                      <h4 className="text-xs font-black text-slate-400 mb-2 uppercase tracking-wide">
                        التفاصيل
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {activeLocation.title}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 mt-2">
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.lat},${activeLocation.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                      >
                        <FaMapSigns size={16} />
                        احصل على الاتجاهات (Google Maps)
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
      
      
      {/* CSS for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default DiverseOpportunities;
