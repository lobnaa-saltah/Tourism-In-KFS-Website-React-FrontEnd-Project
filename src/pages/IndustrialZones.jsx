import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaIndustry, FaMapMarkerAlt, FaMapMarkedAlt, FaChevronLeft, FaTimes, FaMapSigns, FaRoad, FaGlobe, FaMoneyCheckAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PageHero from '../components/PageHero/PageHero';

// Custom icons for map markers
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

const industrialZonesList = [
  {
    id: 'i-baltim',
    title: 'المنطقة الصناعية ببلطيم',
    desc: 'تضم عشرات المصانع والورش والمنشآت الإنتاجية المتخصصة في الصناعات البلاستيكية والغذائية ومواد البناء والكرتون.',
    lat: 31.5367,
    lng: 31.0894,
    area: '114 فدان'
  },
  {
    id: 'i-motobas',
    title: 'المنطقة الصناعية بمطوبس',
    desc: 'أكبر منطقة صناعية واعدة بالدلتا مخصصة للصناعات الغذائية الكبرى والمشروعات الخدمية والكيماوية وصناعات التعبئة المتقدمة.',
    lat: 31.4285,
    lng: 30.4632,
    area: '1660 فدان'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const IndustrialZones = () => {
  const [activeLocation, setActiveLocation] = useState(null);

  const handleSelectLocation = (zone) => {
    setActiveLocation(zone);
  };

  return (
    <div className="bg-slate-50 flex flex-col font-cairo overflow-x-hidden min-h-screen">
      
      {/* 1. Hero Banner */}
      <PageHero
        title="المناطق الصناعية"
        subtitle="اكتشف بيئة صناعية متكاملة ومحفزة للاستثمار في محافظة كفر الشيخ."
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
              المناطق الصناعية في <span className="text-[#c29526]">كفر الشيخ</span>
            </h2>
            <div className="text-slate-600 text-[15px] lg:text-base leading-relaxed font-medium space-y-4">
              <p>
                محافظة كفر الشيخ، الواقعة في شمال دلتا النيل بمصر، تتميز بتواجد عدة مناطق صناعية حيوية تساهم بشكل كبير في دفع عجلة التنمية الاقتصادية وتوفير فرص عمل متنوعة. تلعب هذه المناطق الصناعية دورا محوريا في استغلال الموارد الطبيعية الغنية التي تتمتع بها المحافظة، مثل الأراضي الزراعية الخصبة والمسطحات المائية الواسعة.
              </p>
              <p>
                بفضل الموقع الاستراتيجي الذي يتيح قربها من الموانئ البحرية والطرق الرئيسية، أصبحت مناطق كفر الشيخ الصناعية مركزا لجذب الاستثمارات المحلية والأجنبية. وتتنوع الصناعات في هذه المناطق بين الغذائية، النسيجية، الكيماوية، والهندسية، مما يعزز من تنوع الاقتصاد المحلي ويسهم في تحقيق الاكتفاء الذاتي.
              </p>
            </div>
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
                <FaIndustry size={36} className="text-white" />
              </div>
              
              <h3 className="text-navy text-xl font-black mb-6 leading-snug relative z-10">
                مميزات المناطق الصناعية بالمحافظة:
              </h3>
              
              <div className="flex flex-col gap-4 w-full relative z-10 text-right">
                
                <div className="group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gold shrink-0 group-hover:scale-110 transition-transform">
                    <FaRoad size={16} />
                  </div>
                  <div>
                    <h4 className="text-navy font-black text-sm mb-1">البنية التحتية الجيدة</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">تشمل شبكات الطرق والكهرباء والمياه، مما يسهل عمليات الإنتاج والتوزيع للمستثمرين.</p>
                  </div>
                </div>

                <div className="group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gold shrink-0 group-hover:scale-110 transition-transform">
                    <FaGlobe size={16} />
                  </div>
                  <div>
                    <h4 className="text-navy font-black text-sm mb-1">الموقع الجغرافي</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">قربها من الموانئ البحرية والطرق الرئيسية يسهل عمليات التصدير والاستيراد بشكل كبير.</p>
                  </div>
                </div>

                <div className="group bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gold shrink-0 group-hover:scale-110 transition-transform">
                    <FaMoneyCheckAlt size={16} />
                  </div>
                  <div>
                    <h4 className="text-navy font-black text-sm mb-1">الدعم الحكومي</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">تتلقى المناطق الصناعية دعماً حكومياً في شكل حوافز وتسهيلات ضريبية وإجرائية.</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Map Section */}
      <div className="w-full bg-white border-t border-slate-200 pt-20">
        
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-12 flex flex-col items-center justify-center text-center relative z-10" dir="rtl">
          <h2 className="text-3xl md:text-4xl font-black text-navy relative inline-block">
            المناطق الصناعية المتاحة وتوزيعها الجغرافي
          </h2>
        </div>

        {/* Full-width Map Workspace Container - LTR for Leaflet layout */}
        <div className="flex flex-col lg:flex-row h-[650px] overflow-hidden relative border-t border-slate-200" dir="ltr">
          
          {/* Left Side: Leaflet Map Container */}
          <div className="flex-1 h-full relative z-0 bg-slate-100">
            <MapContainer 
              key="map-industrial-v1"
              center={[31.3320, 30.8290]} 
              zoom={9} 
              className="w-full h-full"
              zoomControl={false}
            >
              <CustomZoomControls />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {industrialZonesList.map((zone) => (
                <Marker 
                  key={zone.id} 
                  position={[zone.lat, zone.lng]}
                  icon={activeLocation?.id === zone.id ? selectedIcon : defaultIcon}
                  eventHandlers={{
                    click: () => handleSelectLocation(zone),
                  }}
                >
                  <Popup className="font-cairo">
                    <div className="text-center font-cairo py-1 px-2">
                      <h3 className="font-bold text-navy mb-2 border-b pb-2">{zone.title}</h3>
                      <button 
                        onClick={() => handleSelectLocation(zone)}
                        className="text-xs bg-gold text-white px-4 py-1.5 rounded-full hover:bg-navy transition-colors font-bold"
                      >
                        عرض التفاصيل
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {activeLocation && <RecenterAutomatically lat={activeLocation.lat} lng={activeLocation.lng} />}
            </MapContainer>
          </div>

          {/* Right Side: Scrollable Sidebar Directory (RTL logic inside) */}
          <div className="w-full lg:w-[460px] bg-white border-l border-slate-200 h-[400px] lg:h-full flex flex-col z-20">
            {/* Header */}
            <div className="bg-navy text-white p-5 flex items-center justify-between shrink-0" dir="rtl">
              <span className="font-bold text-white text-lg">قائمة المناطق الصناعية</span>
              <span className="bg-white/10 px-3 py-1 rounded-md text-sm font-bold">
                {industrialZonesList.length}
              </span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50" dir="rtl">
              {industrialZonesList.map((zone) => (
                <div 
                  key={zone.id}
                  onClick={() => handleSelectLocation(zone)}
                  className={`bg-white border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md flex flex-col items-center justify-center text-center group
                    ${activeLocation?.id === zone.id ? 'border-gold shadow-md ring-1 ring-gold ring-opacity-50' : 'border-slate-100 hover:border-gold/30'}`}
                >
                  <h3 className={`font-black mb-1 transition-colors ${activeLocation?.id === zone.id ? 'text-gold' : 'text-navy group-hover:text-gold'}`}>
                    {zone.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    اضغط للتحديد على الخريطة <FaChevronLeft className="inline text-[10px] mr-0.5" />
                  </p>
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
                    منطقة صناعية
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
                      src="/images/tourism/المناطق الصناعيه.jpg" 
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
                        {activeLocation.desc}
                      </p>
                      
                      {activeLocation.area && (
                        <div className="mt-4 bg-navy/5 p-3 rounded-xl flex items-center gap-2">
                           <span className="text-navy font-bold text-sm">المساحة:</span>
                           <span className="text-slate-600 text-sm font-medium">{activeLocation.area}</span>
                        </div>
                      )}
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
      
    </div>
  );
};

export default IndustrialZones;
