import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaChevronRight, FaChevronLeft, FaHeadset } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { nationalProjectsData } from '../data/nationalProjects';
import PageHero from '../components/PageHero/PageHero';
import { useImageGallery } from '../hooks/useImageGallery';

// Custom icons
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

const NationalProjectDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const stateItem = location.state?.item;
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = nationalProjectsData.find(p => p.id === parseInt(id));
    setProject(found || stateItem || nationalProjectsData[0]);
  }, [id, stateItem]);

  if (!project) return null;

  const galleryImages = project.gallery || [project.image];
  const { currentGalleryIndex, nextImage, prevImage } = useImageGallery(galleryImages);

  return (
    <div className="bg-slate-50 min-h-screen font-cairo overflow-x-hidden flex flex-col" dir="rtl">
      
      {/* Standard Hero Section */}
      <PageHero 
        title={project.title}
        subtitle="مشروعات المحافظة"
      />

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-8 pt-16 pb-8 relative z-20 max-w-6xl -mt-12 flex-1">
        
        {/* About Project & Contact Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12 relative z-20">
          {/* About Project (Right Side) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-2/3 bg-white rounded-[1.5rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col justify-center"
          >
            <div className="mb-8 border-b border-slate-100 pb-4 inline-block w-full text-right">
              <h3 className="text-3xl font-black text-navy inline-block">
                عن المشروع
              </h3>
            </div>

            <div className="prose prose-lg max-w-none">
              <ul className="list-disc pr-6 space-y-4 text-navy font-bold leading-relaxed">
                {project.about?.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Card (Left Side) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-1/3"
          >
            <div className="bg-white rounded-[1.5rem] p-8 lg:p-10 shadow-lg border border-slate-100 relative overflow-hidden flex flex-col items-center text-center h-full justify-center">

              <div className="bg-navy p-4 rounded-2xl mb-6 shadow-md relative z-10">
                <FaHeadset size={36} className="text-white" />
              </div>
              
              <h3 className="text-navy text-2xl font-black mb-4 leading-snug relative z-10">
                هل ترغب في التقدم لأي فرصة أو لديك استفسار؟
              </h3>
              
              <p className="text-slate-500 mb-8 font-medium text-sm relative z-10 leading-relaxed">
                فريقنا متاح دائماً للرد على استفساراتك وتسهيل كافة الإجراءات الاستثمارية.
              </p>
              
              <button 
                onClick={() => navigate('/contact')}
                className="group relative overflow-hidden bg-navy text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:bg-[#c29526] w-full text-lg transition-all duration-300 z-10 flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  تواصل معنا الآن 
                  <FaChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-100 mb-16"
        >
          <div className="mb-6 border-b border-slate-100 pb-4 inline-block w-full text-right">
            <h3 className="text-2xl font-black text-navy inline-block">
              معرض الصور
            </h3>
          </div>

          <div className="relative aspect-video max-h-[500px] mx-auto rounded-xl overflow-hidden group">
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
            
            {/* Controls */}
            <button 
              onClick={prevImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full text-gold flex items-center justify-center transition-all z-10 opacity-70 hover:opacity-100 hover:scale-110"
            >
              <FaChevronRight size={30} className={i18n.dir() === 'rtl' ? '' : 'rotate-180'} />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full text-gold flex items-center justify-center transition-all z-10 opacity-70 hover:opacity-100 hover:scale-110"
            >
              <FaChevronLeft size={30} className={i18n.dir() === 'rtl' ? '' : 'rotate-180'} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Map Section - Full Width, Sticks to Footer */}
      {(project.lat && project.lng) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full bg-white pt-12 mt-auto"
        >
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl text-center mb-8">
            <h3 className="text-3xl font-black text-navy inline-block border-b border-slate-100 pb-4">
              موقع المشروع على الخريطة
            </h3>
          </div>
          
          <div className="w-full h-[400px] md:h-[500px] bg-slate-100 relative z-0" dir="ltr">
            <MapContainer 
              center={[project.lat, project.lng]} 
              zoom={13} 
              className="w-full h-full"
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; Google Maps'
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              />
              <Marker 
                position={[project.lat, project.lng]}
                icon={selectedIcon}
              >
                <Popup className="font-cairo text-right" dir="rtl">
                  <strong className="block text-navy mb-1 text-base">{project.title}</strong>
                  <p className="text-sm text-gray-600 m-0 leading-relaxed">{project.category}</p>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NationalProjectDetails;
