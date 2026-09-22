import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import { 
  Search, MapPin, Phone, Building, Globe, Compass, Eye, X, 
  Map as MapIcon, Grid, List, Layers, Info, Navigation, Check 
} from 'lucide-react';
import { 
  FaIndustry, FaBuilding, FaHotel, FaTree, FaBus, 
  FaHospital, FaStethoscope, FaMapMarkerAlt, FaGlobe, FaChevronLeft, FaArrowRight 
} from 'react-icons/fa';
import PageHero from '../components/PageHero/PageHero';

// Component to dynamically pan and zoom the Leaflet map
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true, duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
};

// Generates custom HTML markers using Leaflet's divIcon
const getMarkerIcon = (category, subCategory, isActive) => {
  let color = 'bg-gold shadow-gold/50';
  let iconHtml = '';

  if (isActive) {
    color = 'bg-royal border-2 border-white scale-125 z-[1000] animate-pulse shadow-royal/60';
  }

  // Choose icon based on category/sub-category
  if (category === 'national') {
    iconHtml = `<svg viewBox="0 0 512 512" class="w-5 h-5 text-white" fill="currentColor"><path d="M496 128H288V32c0-17.7-14.3-32-32-32H32C14.3 0 0 14.3 0 32v448c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32zm-96 128H288v-64h112v64z"/></svg>`;
    if (!isActive) color = 'bg-navy border-2 border-white text-white shadow-navy/40';
  } else if (category === 'industrial') {
    iconHtml = `<svg viewBox="0 0 512 512" class="w-5 h-5 text-white" fill="currentColor"><path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L320 115.3l-73.4-73.4c-9.2-9.2-24.1-9.2-33.3 0L121.3 134c-6.2 6.2-9.4 14.4-8.9 22.7c.4 8.3 4.3 16 10.7 21.4l112 96c4.6 3.9 10.3 5.9 16 5.9s11.4-2 16-5.9l112-96c6.4-5.5 10.3-13.1 10.7-21.4c.4-8.3-2.7-16.5-8.9-22.7L320 84.7l80-80c10.6-10.6 27-12.2 39.4-4C463.3 17 480 36.1 480 57v263c0 10.2 4.9 19.8 13.1 25.8l9.1 6.7c7.1 5.3 11.2 13.7 11.2 22.6c0 15.9-12.9 28.9-28.8 28.9H26.8C12 404 0 416 0 430.8V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V32z"/></svg>`;
    if (!isActive) color = 'bg-orange-500 border-2 border-white text-white shadow-orange-500/40';
  } else if (category === 'investment') {
    iconHtml = `<svg viewBox="0 0 576 512" class="w-5 h-5 text-white" fill="currentColor"><path d="M112 112c0-26.5 21.5-48 48-48h256c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48H160c-26.5 0-48-21.5-48-48V112zm400 64h16c17.7 0 32 14.3 32 32v240c0 17.7-14.3 32-32 32h-16v-48h16V224h-16v-48z"/></svg>`;
    if (!isActive) color = 'bg-emerald-600 border-2 border-white text-white shadow-emerald-500/40';
  } else if (category === 'tourism') {
    iconHtml = `<svg viewBox="0 0 448 512" class="w-5 h-5 text-white" fill="currentColor"><path d="M224 0c-11.4 0-21.4 7.8-24.2 18.9L161.4 176H112c-17.7 0-32 14.3-32 32 0 8.5 3.4 16.6 9.4 22.6l64 64c6 6 14.1 9.4 22.6 9.4h48v64h-80c-17.7 0-32 14.3-32 32 0 8.5 3.4 16.6 9.4 22.6l64 64c6 6 14.1 9.4 22.6 9.4h48v48c0 17.7 14.3 32 32 32s32-14.3 32-32v-48h48c8.5 0 16.6-3.4 22.6-9.4l64-64c6-6 9.4-14.1 9.4-22.6 0-17.7-14.3-32-32-32h-80v-64h48c8.5 0 16.6-3.4 22.6-9.4l64-64c6-6 9.4-14.1 9.4-22.6 0-17.7-14.3-32-32-32h-49.4l-38.4-157.1C245.4 7.8 235.4 0 224 0z"/></svg>`;
    if (!isActive) color = 'bg-teal-500 border-2 border-white text-white shadow-teal-500/40';
  } else if (category === 'services') {
    if (subCategory === 'hotels') {
      iconHtml = `<svg viewBox="0 0 640 512" class="w-5 h-5 text-white" fill="currentColor"><path d="M176 256c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zM576 224H368v-48c0-26.5-21.5-48-48-48L80 128c-26.5 0-48 21.5-48 48v288c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48h512v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V304c0-44.2-35.8-80-80-80z"/></svg>`;
      if (!isActive) color = 'bg-purple-600 border-2 border-white text-white shadow-purple-500/40';
    } else if (subCategory === 'parks') {
      iconHtml = `<svg viewBox="0 0 512 512" class="w-5 h-5 text-white" fill="currentColor"><path d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h112c40.2 0 78.1 9.5 111.7 26.5C417.1 147.5 350.6 96 272 96zM80 328c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32v-80c0-17.7-14.3-32-32-32H112c-17.7 0-32 14.3-32 32v80z"/></svg>`;
      if (!isActive) color = 'bg-green-600 border-2 border-white text-white shadow-green-500/40';
    } else if (subCategory === 'transport') {
      iconHtml = `<svg viewBox="0 0 448 512" class="w-5 h-5 text-white" fill="currentColor"><path d="M224 0c-106 0-192 86-192 192v256c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32v-32h192v32c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V192C416 86 330 0 224 0z"/></svg>`;
      if (!isActive) color = 'bg-cyan-600 border-2 border-white text-white shadow-cyan-500/40';
    } else if (subCategory.startsWith('hospitals')) {
      iconHtml = `<svg viewBox="0 0 512 512" class="w-5 h-5 text-white" fill="currentColor"><path d="M384 128H288V32c0-17.7-14.3-32-32-32h-32c-17.7 0-32 14.3-32 32v96H96c-17.7 0-32 14.3-32 32v320c0 17.7 14.3 32 32 32h288c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32z"/></svg>`;
      if (!isActive) color = 'bg-red-500 border-2 border-white text-white shadow-red-500/40';
    }
  }

  return L.divIcon({
    html: `
      <div class="w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${color}">
        ${iconHtml || `<div class="w-2.5 h-2.5 bg-white rounded-full"></div>`}
      </div>
    `,
    className: 'custom-leaflet-marker-wrapper',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
};

const mapLayers = [
  {
    id: 'street',
    name: 'خريطة الشارع',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  {
    id: 'satellite',
    name: 'قمر صناعي',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  },
  {
    id: 'dark',
    name: 'الخريطة المظلمة',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }
];

const GovernorateMap = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [mapLayer, setMapLayer] = useState(mapLayers[0]);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'map', 'list' (on mobile)

  // Map reference & default coordinates centered on Kafr El-Sheikh
  const mapCenter = [31.25, 30.85];
  const [activeMapCenter, setActiveMapCenter] = useState(mapCenter);
  const [activeMapZoom, setActiveMapZoom] = useState(10);
  const layerMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (layerMenuRef.current && !layerMenuRef.current.contains(event.target)) {
        setShowLayerMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 1. All Items Dataset
  const mapItems = [
    // === 1. NATIONAL PROJECTS ===
    {
      id: 'n-ghalyon',
      name: 'مشروع غليون للاستزراع السمكي',
      nameEn: 'Ghalyon Fish Farm Project',
      category: 'national',
      subCategory: 'national',
      coords: [31.4552, 30.3705],
      area: '20,000 فدان',
      address: 'مطوبس - ساحل البحر الأبيض المتوسط',
      desc: 'أكبر مدينة استزراع سمكي في الشرق الأوسط، تضم مصانع أعلاف وتعبئة وتغليف ومراكز أبحاث متطورة لدعم الأمن الغذائي.',
      image: '/images/tourism/glyoon.jpg',
      label: 'قومي'
    },
    {
      id: 'n-blacksand',
      name: 'مصنع الرمال السوداء بالبرلس',
      nameEn: 'Black Sand Factory in Burullus',
      category: 'national',
      subCategory: 'national',
      coords: [31.5161, 31.0253],
      area: '80 فدان',
      address: 'بلطيم - الطريق الدولي الساحلي',
      desc: 'مشروع قومي عملاق لفصل المعادن الاقتصادية الهامة من الرمال السوداء مثل الإلمنيت والزيركون والروتيل لدعم الصناعات الثقيلة والتصدير.',
      image: '/images/tourism/blacksand.jpg',
      label: 'قومي'
    },
    {
      id: 'n-power',
      name: 'محطة كهرباء برج البرلس العملاقة',
      nameEn: 'Burullus Power Plant',
      category: 'national',
      subCategory: 'national',
      coords: [31.5031, 30.9856],
      area: '250 فدان',
      address: 'البرلس - بجوار الطريق الدولي الساحلي',
      desc: 'إحدى أكبر محطات توليد الطاقة الكهربائية في العالم بنظام الدورة المركبة بقدرة 4800 ميجاوات بالتعاون مع شركة سيمنز.',
      image: '/images/projects/news3.jpg',
      label: 'قومي'
    },
    {
      id: 'n-sakan',
      name: 'مشروع سكن كل المصريين',
      nameEn: 'Housing For All Egyptians',
      category: 'national',
      subCategory: 'national',
      coords: [31.1189, 30.9421],
      area: 'مناطق متعددة بالمحافظة',
      address: 'كفر الشيخ - غرب وشرق المدينة',
      desc: 'مبادرة رئاسية لتوفير وحدات سكنية كاملة الخدمات والتشطيب للشباب ومحدودي الدخل بمجتمعات حضارية متكاملة المرافق.',
      image: '/images/projects/hayahkarima.jpg',
      label: 'قومي'
    },

    // === 2. INDUSTRIAL ZONES ===
    {
      id: 'i-baltim',
      name: 'المنطقة الصناعية ببلطيم',
      nameEn: 'Baltim Industrial Zone',
      category: 'industrial',
      subCategory: 'industrial',
      coords: [31.5367, 31.0894],
      area: '114 فدان',
      address: 'بلطيم - الطريق الدولي الساحلي مباشرة',
      desc: 'تضم عشرات المصانع والورش والمنشآت الإنتاجية المتخصصة في الصناعات البلاستيكية والغذائية ومواد البناء والكرتون.',
      image: '/images/tourism/المناطق الصناعيه.jpg',
      label: 'صناعي'
    },
    {
      id: 'i-motobas',
      name: 'المنطقة الصناعية بمطوبس',
      nameEn: 'Metoubes Industrial Zone',
      category: 'industrial',
      subCategory: 'industrial',
      coords: [31.4285, 30.4632],
      area: '1660 فدان',
      address: 'مطوبس - بجوار الطريق الدولي والشرق النيلي',
      desc: 'أكبر منطقة صناعية واعدة بالدلتا مخصصة للصناعات الغذائية الكبرى والمشروعات الخدمية والكيماوية وصناعات التعبئة المتقدمة.',
      image: '/images/tourism/المناطق الصناعيه.jpg',
      label: 'صناعي'
    },

    // === 3. INVESTMENT OPPORTUNITIES ===
    {
      id: 'inv-mall1',
      name: 'مول تجاري بمساحة 0.78 فدان، أمام نادي الشرطة',
      nameEn: 'Commercial Mall (0.78 Acres) in front of Police Club',
      category: 'investment',
      subCategory: 'investment',
      coords: [31.1145, 30.9438],
      area: '0.78 فدان (3299 م²)',
      address: 'كفر الشيخ - شارع ديوان عام المحافظة الرئيسي',
      desc: 'فرصة استثمارية واعدة لتطوير وتشغيل مول تجاري ترفيهي متكامل الخدمات بموقع حيوي مأهول أمام نادي الشرطة مباشرة.',
      image: '/images/tourism/فرص استثماريه متنوعه.jpg',
      label: 'استثماري'
    },
    {
      id: 'inv-mall2',
      name: 'مول تجاري وسكني بمساحة 6.3 قيراط، أمام مدرسة جمال عبد الناصر',
      nameEn: 'Commercial & Residential Complex (6.3 Carats)',
      category: 'investment',
      subCategory: 'investment',
      coords: [31.1121, 30.9389],
      area: '6.3 قيراط (1102.90 م²)',
      address: 'كفر الشيخ - تقاطع الطرق الحيوية بالوسط الخدمي',
      desc: 'موقع مميز للاستثمار العقاري والتجاري متعدد الطوابق لإنشاء مجمع تجاري وسكني راقٍ بقلب المدينة الإدارية والتعليمية.',
      image: '/images/tourism/فرص استثماريه متنوعه.jpg',
      label: 'استثماري'
    },
    {
      id: 'inv-hotel',
      name: 'فندق بمساحة 2886.85 م²، بجوار مسار العائلة المقدسة وجوار الجامعة',
      nameEn: 'Hotel Project (2886 sqm) near University & Holy Family Trail',
      category: 'investment',
      subCategory: 'investment',
      coords: [31.0987, 30.9443],
      area: '2886.85 م²',
      address: 'كفر الشيخ - حي الجامعة الخدمي الجديد',
      desc: 'أرض مخصصة لإنشاء فندق سياحي/خدمي فئة 4 نجوم لتوفير غرف إقامة فاخرة وقاعات مؤتمرات لزوار الجامعة ومسار العائلة المقدسة.',
      image: '/images/tourism/فرص استثماريه متنوعه.jpg',
      label: 'استثماري'
    },
    {
      id: 'inv-logistics',
      name: 'منطقة لوجستية وسكنية بمساحة 7.72 فدان، بجوار أبراج المحافظة',
      nameEn: 'Logistics & Residential Zone (7.72 Acres) near Gov Towers',
      category: 'investment',
      subCategory: 'investment',
      coords: [31.1076, 30.9381],
      area: '7.72 فدان (32,444.49 م²)',
      address: 'كفر الشيخ - شارع المصنع الخدمي السريع',
      desc: 'مخصصة للتطوير العقاري والمراكز اللوجستية وتوزيع البضائع ومخازن التبريد الكبرى لخدمة محافظات الدلتا.',
      image: '/images/projects/investment-plan.jpg',
      label: 'استثماري'
    },
    {
      id: 't-station',
      name: 'محطة الملك فؤاد الأثرية بمدينة كفرالشيخ',
      nameEn: 'King Fouad Royal Railway Station',
      category: 'tourism',
      subCategory: 'tourism',
      coords: [31.1165, 30.9423],
      area: 'مبنى أثري ملكي',
      address: 'كفر الشيخ - بجوار ديوان عام المحافظة',
      desc: 'تحفة معمارية على الطراز الأوروبي بناها الملك فؤاد الأول كمحطة قطار ملكية لاستقبال العائلة الحاكمة ومواكب ضيوف القصر الملكي.',
      image: '/images/tourism/محطة الملك فؤاد الأثرية بمدينة كفرالشيخ.jpg',
      label: 'سياحي'
    },
    {
      id: 't-pharaohs',
      name: 'منطقة تل الفراعين الأثرى (بوتو) بدسوق',
      nameEn: 'Tell El-Fara\'een Archaeological Site (Buto)',
      category: 'tourism',
      subCategory: 'tourism',
      coords: [31.2655, 30.7865],
      area: '175 فدان',
      address: 'دسوق - قرية إبطو التابعة لمركز دسوق',
      desc: 'العاصمة السياسية والدينية القديمة لمملكة الشمال في مصر الفرعونية، تضم معابد وتماثيل ولوحات حجرية هامة تعود لعصور ما قبل الأسرات.',
      image: '/images/tourism/منطقة تل الفراعين الأثرى بدسوق.jpg',
      label: 'سياحي'
    },
    {
      id: 't-edfina',
      name: 'قناطر إدفينا بمدينة مطوبس',
      nameEn: 'Edfina Barrages in Metoubes',
      category: 'tourism',
      subCategory: 'tourism',
      coords: [31.2986, 30.4851],
      area: 'ممر مائي وسياحي',
      address: 'مطوبس - المصب الفرعي لنهر النيل (فرع رشيد)',
      desc: 'حدائق خلابة وقناطر أثرية رائعة تتحكم في تدفق مياه النيل لفرع رشيد وتعتبر مقصداً ترفيهياً كبيراً للرحلات النيلية والتنزه العائلي.',
      image: '/images/tourism/قناطر إدفينا بمدينة مطوبس.jpg',
      label: 'سياحي'
    },
    {
      id: 't-sakha',
      name: 'كنيسة العذراء مريم بسخا (مسار العائلة المقدسة)',
      nameEn: 'St. Mary Church in Sakha (Holy Family Path)',
      category: 'tourism',
      subCategory: 'tourism',
      coords: [31.0964, 30.9482],
      area: 'موقع ديني وأثري عالمي',
      address: 'كفر الشيخ - حي سخا التاريخي',
      desc: 'تضم الكنيسة حجر "بيد خريستوس" الذي طبعت عليه قدم السيد المسيح أثناء رحلة العائلة المقدسة، وتعتبر من أهم المزارات السياحية الدينية بمصر.',
      image: '/images/tourism/كنيسة العذراء مريم بسخا.jpg',
      label: 'سياحي'
    },
    {
      id: 't-shakhlouba',
      name: 'جزيرة الشخلوبة ببحيرة البرلس',
      nameEn: 'El-Shakhlouba Island - Burullus Lake',
      category: 'tourism',
      subCategory: 'tourism',
      coords: [31.3323, 30.8845],
      area: 'محمية سياحية وتراثية',
      address: 'سيدي سالم - وسط بحيرة البرلس الهادئة',
      desc: 'جزيرة سياحية ساحرة وسط بحيرة البرلس تشتهر بحرفة الصيد ومطاعم الأسماك الطازجة ومناظر غروب الشمس المذهلة وقوارب التجديف الملونة.',
      image: '/images/tourism/جزيرة الشخلوبة.jpg',
      label: 'سياحي'
    },

    // === 5. SERVICES GUIDE -> HOTELS ===
    {
      id: 's-h-palm',
      name: 'فندق بيوت باي (byoot-bay)',
      nameEn: 'Byoot Bay Hotel',
      category: 'services',
      subCategory: 'hotels',
      coords: [31.5423, 31.0921],
      address: 'بلطيم - شاطئ النرجس الهادئ',
      desc: 'فندق عصري راقن̣ يقدم غرف إقامة فاخرة مطلة على شواطئ البحر الأبيض المتوسط مباشرة مع حمامات سباحة وقاعات ترفيهية.',
      image: '/images/places/فندق بيوت باي (byoot-bay).jpg',
      label: 'فنادق'
    },
    {
      id: 's-h-school',
      name: 'فندق سيدي طلحة الإقليمي',
      nameEn: 'Sidi Talha Regional Hotel',
      category: 'services',
      subCategory: 'hotels',
      coords: [31.1102, 30.9345],
      address: 'كفر الشيخ - بجوار مديرية التربية والتعليم',
      desc: 'يقدم خدمات فندقية متكاملة بإشراف تعليمي وتطبيقي عالي الجودة ويضم غرفاً مجهزة وقاعات حفلات واجتماعات واسعة.',
      image: '/images/places/فندق سيدي طلحة الإقليمي.jpg',
      label: 'فنادق'
    },
    {
      id: 's-h-athletes',
      name: 'فندق القوات المسلحة السياحي',
      nameEn: 'Armed Forces Tourist Hotel',
      category: 'services',
      subCategory: 'hotels',
      coords: [31.1165, 30.9423],
      address: 'كفر الشيخ - بجوار الاستاد الرياضي الدولي',
      desc: 'مخصص لاستقبال الفرق الرياضية والوفود الرسمية ومجهّز بالكامل بكافة الخدمات الرياضية والغذائية والترفيهية المطلوبة.',
      image: '/images/places/فندق القوات المسلحة السياحي.jpg',
      label: 'فنادق'
    },
    {
      id: 's-h-marina',
      name: 'فندق دهب السياحي ببلطيم',
      nameEn: 'Dahab Tourist Hotel in Baltim',
      category: 'services',
      subCategory: 'hotels',
      coords: [31.5398, 31.0765],
      address: 'شاطئ بلطيم السياحي - وسط منطقة الفنادق المميزة',
      desc: 'فندق سياحي متكامل الخدمات يقدم إطلالات فريدة على بحيرة البرلس والبحر وشاطئ رملي آمن وأنشطة مائية متنوعة للصغار والكبار.',
      image: '/images/places/فندق دهب السياحي ببلطيم.jpg',
      label: 'فنادق'
    },
    {
      id: 't-sakha',
      name: 'كنيسة العذراء مريم بسخا',
      nameEn: 'Virgin Mary Church in Sakha (Holy Family Path)',
      category: 'tourism',
      subCategory: 'tourism',
      coords: [31.0964, 30.9482],
      area: 'موقع ديني وأثري عالمي',
      address: 'كفر الشيخ - حي سخا التاريخي',
      desc: 'تضم الكنيسة حجر "بيد خريستوس" الذي طبعت عليه قدم السيد المسيح أثناء رحلة العائلة المقدسة، وتعتبر من أهم المزارات السياحية الدينية بمصر.',
      image: '/images/tourism/كنيسة العذراء مريم بسخا.jpg',
      label: 'سياحي'
    },
    {
      id: 't-shakhlouba',
      name: 'جزيرة الشخلوبة ببحيرة البرلس',
      nameEn: 'El-Shakhlouba Island - Burullus Lake',
      category: 'tourism',
      subCategory: 'tourism',
      coords: [31.3323, 30.8845],
      area: 'محمية سياحية وتراثية',
      address: 'سيدي سالم - وسط بحيرة البرلس الهادئة',
      desc: 'جزيرة سياحية ساحرة وسط بحيرة البرلس تشتهر بحرفة الصيد ومطاعم الأسماك الطازجة ومناظر غروب الشمس المذهلة وقوارب التجديف الملونة.',
      image: '/images/tourism/جزيرة الشخلوبة.jpg',
      label: 'سياحي'
    },

    // === 5. SERVICES GUIDE -> HOTELS ===
    {
      id: 's-h-palm',
      name: 'فندق The Palm',
      nameEn: 'The Palm Hotel',
      category: 'services',
      subCategory: 'hotels',
      coords: [31.5423, 31.0921],
      address: 'بلطيم - شاطئ النرجس الهادئ',
      desc: 'فندق عصري راقٍ يقدم غرف إقامة فاخرة مطلة على شواطئ البحر الأبيض المتوسط مباشرة مع حمامات سباحة وقاعات ترفيهية.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      label: 'فنادق'
    },
    {
      id: 's-h-school',
      name: 'فندق المدرسة الفندقية',
      nameEn: 'Hotel School Kafr El-Sheikh',
      category: 'services',
      subCategory: 'hotels',
      coords: [31.1102, 30.9345],
      address: 'كفر الشيخ - بجوار مديرية التربية والتعليم',
      desc: 'يقدم خدمات فندقية متكاملة بإشراف تعليمي وتطبيقي عالي الجودة ويضم غرفاً مجهزة وقاعات حفلات واجتماعات واسعة.',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80',
      label: 'فنادق'
    },
    {
      id: 's-h-athletes',
      name: 'فندق الرياضيين',
      nameEn: 'Athletes Hotel',
      category: 'services',
      subCategory: 'hotels',
      coords: [31.1165, 30.9423],
      address: 'كفر الشيخ - بجوار الاستاد الرياضي الدولي',
      desc: 'مخصص لاستقبال الفرق الرياضية والوفود الرسمية ومجهّز بالكامل بكافة الخدمات الرياضية والغذائية والترفيهية المطلوبة.',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
      label: 'فنادق'
    },
    {
      id: 's-h-marina',
      name: 'فندق مارينا بلطيم',
      nameEn: 'Marina Baltim Hotel',
      category: 'services',
      subCategory: 'hotels',
      coords: [31.5398, 31.0765],
      address: 'شاطئ بلطيم السياحي - وسط منطقة الفنادق المميزة',
      desc: 'فندق سياحي متكامل الخدمات يقدم إطلالات فريدة على بحيرة البرلس والبحر وشاطئ رملي آمن وأنشطة مائية متنوعة للصغار والكبار.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      label: 'فنادق'
    },

    // === 5. SERVICES GUIDE -> PARKS & CLUBS ===
    {
      id: 's-p-matrix',
      name: 'Matrix Club Kafr El-Sheikh',
      nameEn: 'Matrix Club Kafr El-Sheikh',
      category: 'services',
      subCategory: 'parks',
      coords: [31.1198, 30.9456],
      address: 'كفر الشيخ - حي القنطرة المميز وبجوار الأبراج الجديدة',
      desc: 'نادٍ رياضي واجتماعي وترفيهي فاخر يضم صالات جيم حديثة، ملاعب تنس وقدم، كافيهات، مناطق لعب أطفال وحمامات سباحة أولمبية.',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80',
      label: 'نوادي ومتنزهات'
    },
    {
      id: 's-p-central',
      name: 'الحديقة المركزية بكفر الشيخ',
      nameEn: 'Central Park',
      category: 'services',
      subCategory: 'parks',
      coords: [31.1134, 30.9405],
      address: 'كفر الشيخ - شارع الجيش بجوار مبنى ديوان عام المحافظة',
      desc: 'أكبر متنزه ترفيهي عام بالمدينة يضم مساحات خضراء شاسعة، ممشى رياضي، نافورة راقصة، مناطق مخصصة للألعاب والمطاعم الكبرى.',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=600&q=80',
      label: 'نوادي ومتنزهات'
    },
    {
      id: 's-p-police',
      name: 'نادي الشرطة بكفر الشيخ',
      nameEn: 'Police Club',
      category: 'services',
      subCategory: 'parks',
      coords: [31.1145, 30.9438],
      address: 'كفر الشيخ - كورنيش المدينة الخدمي المميز',
      desc: 'نادٍ ترفيهي اجتماعي متكامل للأعضاء والزوار يضم قاعات مناسبات، مطاعم مكشوفة على حدائق واسعة، وملاعب أطفال مغلقة.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80',
      label: 'نوادي ومتنزهات'
    },
    {
      id: 's-p-khaledeen',
      name: 'حديقة الخالدين بكفر الشيخ',
      nameEn: 'Al-Khaledeen Garden',
      category: 'services',
      subCategory: 'parks',
      coords: [31.1123, 30.9345],
      address: 'كفر الشيخ - بجوار الميدان العام بوسط المدينة',
      desc: 'حديقة تاريخية هادئة تضم تماثيل ونصب تذكارية لأعلام المحافظة والشهداء وتوفر مساحات خضراء مميزة لعشاق الهدوء والقراءة.',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      label: 'نوادي ومتنزهات'
    },
    {
      id: 's-p-social',
      name: 'النادي الاجتماعي بكفر الشيخ',
      nameEn: 'Social Club',
      category: 'services',
      subCategory: 'parks',
      coords: [31.1135, 30.9421],
      address: 'كفر الشيخ - حي القنطرة السكني الراقي',
      desc: 'ملتقى ترفيهي واجتماعي عريق يوفر بيئة آمنة وجميلة للعائلات ومكتبة عامة ومسارح لإقامة الفعاليات الثقافية والاجتماعية.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
      label: 'نوادي ومتنزهات'
    },
    {
      id: 's-p-cityclub',
      name: 'نادي سيتي كلوب بكفر الشيخ',
      nameEn: 'City Club Kafr El-Sheikh',
      category: 'services',
      subCategory: 'parks',
      coords: [31.1098, 30.9389],
      address: 'كفر الشيخ - طريق طنطا السريع الخدمي الجديد',
      desc: 'فرع لأكبر سلسلة نوادٍ رياضية واجتماعية ذكية بمصر لتدريب الناشئين وتنمية المهارات الرياضية في كافة الألعاب.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
      label: 'نوادي ومتنزهات'
    },
    {
      id: 's-p-zewail',
      name: 'حديقة أحمد زويل',
      nameEn: 'Ahmed Zewail Park',
      category: 'services',
      subCategory: 'parks',
      coords: [31.1142, 30.9392],
      address: 'كفر الشيخ - تقاطع شارع الجامعة وشارع الجيش',
      desc: 'حديقة خضراء متطورة مخصصة للاستجمام والعائلات والطلاب، سميت تيمناً بالعالم المصري الكبير الدكتور أحمد زويل ابن المحافظة.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      label: 'نوادي ومتنزهات'
    },
    {
      id: 's-p-army',
      name: 'نادي القوات المسلحة بكفر الشيخ',
      nameEn: 'Armed Forces Club',
      category: 'services',
      subCategory: 'parks',
      coords: [31.1165, 30.9423],
      address: 'كفر الشيخ - حي الاستاد والمنطقة العسكرية الخدمية',
      desc: 'يوفر نادٍ ترفيهي متكامل وقاعات أفراح، حدائق مفتوحة ومطاعم مميزة تقدم خدمات فاخرة لأسر العسكريين والمدنيين.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      label: 'نوادي ومتنزهات'
    },
    {
      id: 's-p-sanaa',
      name: 'حديقة صنعاء بكفر الشيخ',
      nameEn: 'Sana\'a Park & Hotel',
      category: 'services',
      subCategory: 'parks',
      coords: [31.1134, 30.9405],
      address: 'كفر الشيخ - شارع ديوان عام المحافظة',
      desc: 'أقدم وأشهر حديقة عامة بالمحافظة، ملحق بها فندق سياحي مميز ومسارح عائلية مفتوحة وسينما صيفية وملاهي حديثة للأطفال.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      label: 'نوادي ومتنزهات'
    },

    // === 5. SERVICES GUIDE -> PUBLIC TRANSPORT ===
    {
      id: 's-t-main',
      name: 'موقف كفر الشيخ الرئيسي',
      nameEn: 'KFS Main Bus Station',
      category: 'services',
      subCategory: 'transport',
      coords: [31.1098, 30.9334],
      address: 'كفر الشيخ - الطريق الدائري الغربي للمدينة',
      desc: 'الموقف الإقليمي الموحد الجديد لنقل الركاب لجميع مراكز المحافظة والمحافظات المجاورة عبر أسطول سيارات سرفيس حديث.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      label: 'مواقف مواصلات'
    },
    {
      id: 's-t-moussa',
      name: 'موقف محلة موسى وميت الديبة وتوابعهم',
      nameEn: 'Mahalet Moussa & Meet El-Deeba Bus Station',
      category: 'services',
      subCategory: 'transport',
      coords: [31.0723, 30.9123],
      address: 'كفر الشيخ - طريق محلة موسى السريع',
      desc: 'موقف خدمي لنقل الركاب وتسهيل حركة الانتقال بين مدينة كفر الشيخ والقرى المجاورة التابعة لمركزي كفر الشيخ وقلين.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      label: 'مواقف مواصلات'
    },
    {
      id: 's-t-superjet',
      name: 'موقف السوبر جيت',
      nameEn: 'SuperJet Bus Station',
      category: 'services',
      subCategory: 'transport',
      coords: [31.1112, 30.9356],
      address: 'كفر الشيخ - وسط المدينة بجوار مزلقان الانشاء والتعمير',
      desc: 'محطة حجز وانطلاق حافلات النقل البري التابعة لشركة الاتحاد العربي للنقل البري (سوبر جيت) لخطوط القاهرة والإسكندرية.',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80',
      label: 'مواقف مواصلات'
    },
    {
      id: 's-t-cairotanta',
      name: 'موقف القاهرة وطنطا',
      nameEn: 'Cairo & Tanta Bus Station',
      category: 'services',
      subCategory: 'transport',
      coords: [31.1105, 30.9341],
      address: 'كفر الشيخ - الطريق الدائري ومحيط الموقف العام',
      desc: 'موقف مخصص لحافلات النقل الجماعي وسيارات الأجرة السريعة المتجهة مباشرة لمحور طنطا والقاهرة والوجه القبلي.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      label: 'مواقف مواصلات'
    },
    {
      id: 's-t-hamra',
      name: 'موقف الحمراء وأريمون ومحلة القصب وتوابعهم',
      nameEn: 'Al-Hamra, Ariemon & Mahalet Al-Qasab Bus Station',
      category: 'services',
      subCategory: 'transport',
      coords: [31.1085, 30.9312],
      address: 'كفر الشيخ - طريق الموقف الجديد الفرعي',
      desc: 'يخدم قرى وبلدات القطاع الشرقي والجنوبي لمركز كفر الشيخ ويوفر مواصلات يومية منتظمة لموظفي ديوان المحافظة والطلاب.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      label: 'مواقف مواصلات'
    },
    {
      id: 's-t-shano',
      name: 'موقف شنو والمنشية وتوابعهم',
      nameEn: 'Shano & Al-Mansheya Bus Station',
      category: 'services',
      subCategory: 'transport',
      coords: [31.1056, 30.9298],
      address: 'كفر الشيخ - طريق شنو بمدخل المدينة الجنوبي',
      desc: 'مخصص لسيارات الأجرة وحافلات النقل الصغير لتسيير حركة الانتقال لقرية شنو والمنشية والمناطق الملاصقة بحدود المحافظة.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      label: 'مواقف مواصلات'
    },

    // === 5. SERVICES GUIDE -> GOVERNMENT HOSPITALS ===
    {
      id: 's-h-general',
      name: 'مستشفى كفر الشيخ العام',
      nameEn: 'KFS General Hospital',
      category: 'services',
      subCategory: 'hospitals_gov',
      coords: [31.1189, 30.9521],
      phone: '047-3231012',
      address: 'كفر الشيخ - طريق الرياض الخدمي الفرعي',
      desc: 'أقدم مستشفى حكومي مركزي بالمحافظة يضم كافة العيادات الخارجية وغرف العمليات الكبرى وقسماً مجهزاً للطوارئ على مدار 24 ساعة.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات حكومية'
    },
    {
      id: 's-h-chest',
      name: 'مستشفى الصدر بكفر الشيخ',
      nameEn: 'Chest Hospital',
      category: 'services',
      subCategory: 'hospitals_gov',
      coords: [31.1212, 30.9545],
      phone: '047-3231200',
      address: 'كفر الشيخ - بجوار مستشفى كفر الشيخ العام',
      desc: 'مستشفى متخصص في علاج الأمراض الصدرية والجهاز التنفسي ويضم غرف رعاية مركزة وأقسام أشعة تشخيصية متطورة.',
      image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات حكومية'
    },
    {
      id: 's-h-ramad',
      name: 'مستشفى الرمد القديمة',
      nameEn: 'Old Ophthalmology (Ramad) Hospital',
      category: 'services',
      subCategory: 'hospitals_gov',
      coords: [31.1112, 30.9498],
      phone: '047-3222564',
      address: 'كفر الشيخ - شارع الجيش بوسط المدينة القديم',
      desc: 'مستشفى عريق متخصص في جراحات العيون ومكافحة العمى والرمد ويقدم خدمات متميزة لمواطني كفر الشيخ منذ عقود.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات حكومية'
    },
    {
      id: 's-h-fevers',
      name: 'مستشفى الحميات بكفرالشيخ',
      nameEn: 'Fevers Hospital',
      category: 'services',
      subCategory: 'hospitals_gov',
      coords: [31.1235, 30.9578],
      phone: '047-3231015',
      address: 'كفر الشيخ - طريق الرياض ومحيط مستشفى كفر الشيخ العام',
      desc: 'صرح حكومي مجهز لعزل وعلاج حالات الحمى والأمراض المعدية والأوبئة ويضم أقساماً متكاملة للتحاليل الكيميائية والميكروبيولوجية.',
      image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات حكومية'
    },
    {
      id: 's-h-derm',
      name: 'مستشفى الجلدية بكفرالشيخ',
      nameEn: 'Dermatology Hospital',
      category: 'services',
      subCategory: 'hospitals_gov',
      coords: [31.1142, 30.9462],
      phone: '047-3234902',
      address: 'كفر الشيخ - شارع المصنع ومحيط ديوان المحافظة',
      desc: 'مستشفى متخصص في الأمراض الجلدية والتناسلية والجراحات التجميلية والعلاج الضوئي بأحدث الأجهزة الطبية الحديثة.',
      image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات حكومية'
    },
    {
      id: 's-h-obour',
      name: 'مستشفى العبور للتأمين الصحي',
      nameEn: 'Al-Obour Health Insurance Hospital',
      category: 'services',
      subCategory: 'hospitals_gov',
      coords: [31.1076, 30.9381],
      phone: '047-3224902',
      address: 'كفر الشيخ - شارع المصنع ومجمع الخدمات الطبية',
      desc: 'مستشفى خدمي شامل يقدم الرعاية الطبية لموظفي الحكومة والقطاع العام والتأمين الصحي، ومجهز بغرف عمليات كبرى.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات حكومية'
    },
    {
      id: 's-h-university',
      name: 'مستشفى كفر الشيخ الجامعي',
      nameEn: 'Kafr El-Sheikh University Hospital',
      category: 'services',
      subCategory: 'hospitals_gov',
      coords: [31.0987, 30.9443],
      phone: '047-3215560',
      address: 'كفر الشيخ - حرم جامعة كفر الشيخ الرئيسي',
      desc: 'أحدث وأكبر مستشفى تعليمي وعلاجي متكامل بالدلتا، يضم أحدث أجهزة الرنين المغناطيسي والقسطرة التداخلية وعلاج الأورام.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات حكومية'
    },
    {
      id: 's-h-military',
      name: 'مستشفى القوات المسلحة بكفر الشيخ',
      nameEn: 'Armed Forces Hospital KFS',
      category: 'services',
      subCategory: 'hospitals_gov',
      coords: [31.1165, 30.9423],
      phone: '047-3211105',
      address: 'كفر الشيخ - حي الاستاد والمنطقة الخدمية العسكرية',
      desc: 'صرح طبي عسكري يقدم الرعاية العلاجية والطبية المتكاملة للعسكريين وعائلاتهم والمدنيين بأعلى المواصفات والجودة القياسية.',
      image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات حكومية'
    },

    // === 5. SERVICES GUIDE -> PRIVATE HOSPITALS ===
    {
      id: 's-hp-elite',
      name: 'مستشفى النخبة الطبي الحديث',
      nameEn: 'Elite Modern Hospital',
      category: 'services',
      subCategory: 'hospitals_pvt',
      coords: [31.1198, 30.9456],
      phone: '047-3254100',
      address: 'كفر الشيخ - حي القنطرة وطريق المحاربة الدائري',
      desc: 'مستشفى استثماري خاص مجهز بغرف رعاية مركزة للأطفال وحديثي الولادة وحضانات متطورة وأقسام جراحة المناظير والتوليد.',
      image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات خاصة'
    },
    {
      id: 's-hp-tadawi',
      name: 'مستشفى تداوي التخصصي',
      nameEn: 'Tadawi Specialty Hospital',
      category: 'services',
      subCategory: 'hospitals_pvt',
      coords: [31.1121, 30.9389],
      phone: '047-3211500',
      address: 'كفر الشيخ - شارع الخليفة المأمون السكني الرئيسي',
      desc: 'يقدم خدمات العيادات التخصصية الشاملة على مدار اليوم بإشراف نخبة من أساتذة الكليات الطبية والجراحين الاستشاريين.',
      image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات خاصة'
    },
    {
      id: 's-hp-rahma',
      name: 'مستشفى الرحمة الطبي بدسوق',
      nameEn: 'Al-Rahma Hospital in Disuq',
      category: 'services',
      subCategory: 'hospitals_pvt',
      coords: [31.1298, 30.6456],
      phone: '047-2569000',
      address: 'دسوق - شارع الشركات الإداري الرئيسي بوسط المدينة',
      desc: 'مستشفى خاص يخدم قطاع غرب الدلتا ومدينة دسوق بتقديم خدمات الرعاية الحرجة وقسم غسيل كلوي وجراحات العظام والمفاصل.',
      image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات خاصة'
    },
    {
      id: 's-hp-fath',
      name: 'مستشفى الفتح التخصصي',
      nameEn: 'Al-Fath Specialty Hospital',
      category: 'services',
      subCategory: 'hospitals_pvt',
      coords: [31.1132, 30.9472],
      phone: '047-3221990',
      address: 'كفر الشيخ - شارع الجيش ومحيط المجمع التعليمي',
      desc: 'أقدم المستشفيات الخاصة بالمدينة، ويتميز بأقسام رعاية الحالات الحرجة وقسم متكامل للفحوصات الطبية والموجات الصوتية.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات خاصة'
    },
    {
      id: 's-hp-jameya',
      name: 'مستشفى الجمعية الشرعية التخصصي',
      nameEn: 'Al-Jameya Al-Shareya Hospital',
      category: 'services',
      subCategory: 'hospitals_pvt',
      coords: [31.1123, 30.9345],
      phone: '047-3240500',
      address: 'كفر الشيخ - تقسيم المعلمين السكني الهادئ',
      desc: 'صرح طبي خيري يقدم خدمات الرعاية الصحية التخصصية بأسعار رمزية ومناسبة لمختلف شرائح المواطنين وبمستوى جودة متميز.',
      image: 'https://images.unsplash.com/photo-1517120026326-d87759a7b63b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات خاصة'
    },
    {
      id: 's-hp-ishraq',
      name: 'مركز إشراق لجراحات العيون والليزر',
      nameEn: 'Ishraq Center for Eye and Laser Surgeries',
      category: 'services',
      subCategory: 'hospitals_pvt',
      coords: [31.1105, 30.9341],
      phone: '047-3210100',
      address: 'كفر الشيخ - تقسيم المعلمين وبجوار طريق الاستاد الرياضي',
      desc: 'مركز طبي متكامل بأحدث تقنيات الليزك وتصحيح الإبصار وزراعة القرنية والمياه البيضاء بإشراف أطباء استشاريين.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات خاصة'
    },
    {
      id: 's-hp-sharabi',
      name: 'مركز شرابي للعيون والجراحات الدقيقة',
      nameEn: 'Sharabi Eye Center',
      category: 'services',
      subCategory: 'hospitals_pvt',
      coords: [31.1085, 30.9312],
      phone: '047-3221440',
      address: 'كفر الشيخ - شارع المصنع الرئيسي وجوار مجمع البنوك',
      desc: 'يقدم أعلى مستويات العناية الجراحية والتصحيحية للقرنية ومشاكل النظر بأجهزة أمريكية وألمانية متطورة.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات خاصة'
    },
    {
      id: 's-hp-assema',
      name: 'مستشفى العاصمة الطبي التخصصي',
      nameEn: 'Al-Assema Specialty Hospital',
      category: 'services',
      subCategory: 'hospitals_pvt',
      coords: [31.1056, 30.9298],
      phone: '047-3232000',
      address: 'كفر الشيخ - مدخل المحافظة السريع بجوار المعرض الدولي',
      desc: 'أحدث مستشفى استثماري تخصصي بالمدينة، يضم قسماً متكاملاً لأمراض القلب، الرعاية المركزة، الجراحة العامة والطوارئ.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce2?auto=format&fit=crop&w=600&q=80',
      label: 'مستشفيات خاصة'
    }
  ];

  // 2. Tab filtering logic
  const categories = [
    { id: 'all', label: 'عرض الكل', labelEn: 'Show All' },
    { id: 'national', label: 'مشاريع قومية', labelEn: 'National Projects' },
    { id: 'industrial', label: 'مناطق صناعية', labelEn: 'Industrial Zones' },
    { id: 'investment', label: 'فرص استثمارية', labelEn: 'Investment Opportunities' },
    { id: 'tourism', label: 'معالم سياحية', labelEn: 'Tourist Landmarks' },
    { id: 'services', label: 'دليل الخدمات', labelEn: 'Services Guide' }
  ];

  const subCategories = [
    { id: 'all', label: 'كل الخدمات', labelEn: 'All Services' },
    { id: 'hotels', label: 'فنادق وإقامة', labelEn: 'Hotels & Accommodations' },
    { id: 'parks', label: 'نوادي ومتنزهات', labelEn: 'Clubs & Parks' },
    { id: 'transport', label: 'مواقف مواصلات', labelEn: 'Bus Stations' },
    { id: 'hospitals_gov', label: 'مستشفيات حكومية', labelEn: 'Gov Hospitals' },
    { id: 'hospitals_pvt', label: 'مستشفيات خاصة', labelEn: 'Private Hospitals' }
  ];

  // Filtering filter algorithm
  const filteredItems = mapItems.filter(item => {
    // 1. Text Search Filter
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));

    // 2. Category Filter
    let matchesCategory = true;
    if (activeCategory !== 'all') {
      matchesCategory = item.category === activeCategory;
    }

    // 3. Sub-Category Filter (Only active if main category is 'services')
    let matchesSubCategory = true;
    if (activeCategory === 'services' && activeSubCategory !== 'all') {
      matchesSubCategory = item.subCategory === activeSubCategory;
    }

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setActiveMapCenter(item.coords);
    setActiveMapZoom(13); // Zoom closer
    if (window.innerWidth < 1024) {
      setViewMode('map'); // Switch layout on mobile to let them see the map pin
    }
  };

  const handleResetMap = () => {
    setActiveMapCenter(mapCenter);
    setActiveMapZoom(10);
    setSelectedItem(null);
  };

  return (
    <div className="bg-slate-50 flex flex-col font-cairo overflow-hidden">

      {/* 1. PageHero Header — matching About page design */}
      <PageHero
        title={isRtl ? 'دليل كفر الشيخ الذكي' : 'KFS Smart Map & Directory'}
        subtitle={isRtl ? 'خريطة تفاعلية شاملة للمشروعات القومية والمعالم السياحية والخدمات' : 'Interactive portal for national projects, landmarks, and essential services'}
      >
        {/* Search + Count inside hero */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6" dir="rtl">
          {/* Search Bar */}
          <div className="relative w-64 md:w-80">
            <input
              type="text"
              placeholder={isRtl ? 'ابحث باسم المشروع أو الكلمة الدلالية...' : 'Search by name or keyword...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white/10 border border-white/25 rounded-xl text-sm font-semibold text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/50 transition-all text-right"
              dir="rtl"
            />
            <Search className="absolute top-3 right-3.5 text-white/60" size={15} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-3 left-3 text-white/60 hover:text-white transition-all"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Count Badge */}
          <div className="bg-white/10 border border-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-sm">
            {isRtl ? 'إجمالي المواقع: ' : 'Total Sites: '}
            <span className="font-black">{filteredItems.length}</span>
          </div>

          {/* Mobile View Switcher */}
          <div className="lg:hidden flex bg-white/10 rounded-xl p-1 border border-white/20">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all ${
                viewMode === 'list' ? 'bg-white text-navy shadow-sm' : 'text-white/70'
              }`}
            >
              <List size={14} />
              {isRtl ? 'القائمة' : 'List'}
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all ${
                viewMode === 'map' ? 'bg-white text-navy shadow-sm' : 'text-white/70'
              }`}
            >
              <MapPin size={14} />
              {isRtl ? 'الخريطة' : 'Map'}
            </button>
          </div>
        </div>
      </PageHero>

      {/* 2. Main Visual Workspace Container */}
      <div className="flex flex-col lg:flex-row h-[650px] overflow-hidden relative" dir="ltr">
        
        {/* Left Side: Leaflet Map Container */}
        <div className={`flex-1 h-full relative transition-all duration-300 ${
          viewMode === 'list' && 'hidden lg:block'
        }`}>
          <MapContainer 
            center={activeMapCenter} 
            zoom={activeMapZoom} 
            zoomControl={false}
            className="w-full h-full z-10"
          >
            <ChangeMapView center={activeMapCenter} zoom={activeMapZoom} />
            <TileLayer
              attribution={mapLayer.attribution}
              url={mapLayer.url}
            />
            
            {/* Custom Zoom Controls at Top Right */}
            <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 shadow-lg">
              <button 
                onClick={() => {
                  setActiveMapZoom(prev => Math.min(prev + 1, 18));
                }}
                onMouseDown={(e) => e.preventDefault()}
                className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-navy font-bold hover:bg-slate-100 transition-all text-xl cursor-pointer shadow-md"
              >
                +
              </button>
              <button 
                onClick={() => {
                  setActiveMapZoom(prev => Math.max(prev - 1, 8));
                }}
                onMouseDown={(e) => e.preventDefault()}
                className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-navy font-bold hover:bg-slate-100 transition-all text-xl cursor-pointer shadow-md"
              >
                -
              </button>
              <button 
                onClick={handleResetMap}
                onMouseDown={(e) => e.preventDefault()}
                className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-navy hover:bg-slate-100 transition-all cursor-pointer shadow-md"
                title="إعادة تعيين الاتجاه"
              >
                <Compass size={18} />
              </button>
            </div>

            {/* Map Layer Switcher at Bottom Left */}
            <div className="absolute bottom-4 left-4 z-[1000]" ref={layerMenuRef}>
              <button 
                onClick={() => setShowLayerMenu(!showLayerMenu)}
                onMouseDown={(e) => e.preventDefault()}
                className="bg-navy text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-navy-light transition-all shadow-xl font-bold text-sm cursor-pointer border border-white/20"
              >
                <Layers size={16} />
                {isRtl ? 'نمط الخريطة' : 'Map Theme'}
              </button>
              
              <AnimatePresence>
                {showLayerMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-12 left-0 bg-white border border-slate-200 p-2 rounded-2xl shadow-2xl flex flex-col gap-1 w-44"
                  >
                    {mapLayers.map((layer) => (
                      <button
                        key={layer.id}
                        onClick={() => {
                          setMapLayer(layer);
                          setShowLayerMenu(false);
                        }}
                        className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                          mapLayer.id === layer.id 
                            ? 'bg-navy/10 text-navy' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {layer.name}
                        {mapLayer.id === layer.id && <Check size={12} className="text-navy" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Render Markers dynamically */}
            {filteredItems.map((item) => (
              <Marker 
                key={item.id}
                position={item.coords}
                icon={getMarkerIcon(item.category, item.subCategory, selectedItem?.id === item.id)}
                eventHandlers={{
                  click: () => {
                    setSelectedItem(item);
                    setActiveMapCenter(item.coords);
                    setActiveMapZoom(13);
                  }
                }}
              >
                <Popup className="premium-leaflet-popup">
                  <div className="p-2 font-cairo text-right" dir="rtl">
                    <span className="text-[10px] uppercase font-extrabold text-gold-dark bg-gold/10 px-2 py-0.5 rounded-full mb-1 inline-block">
                      {item.label}
                    </span>
                    <h3 className="font-bold text-sm text-navy mb-1">{item.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                      <MapPin size={12} className="text-royal shrink-0" />
                      {item.address}
                    </p>
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="w-full bg-navy text-white text-[11px] font-bold py-1 px-3 rounded-lg hover:bg-navy-light transition-all flex items-center justify-center gap-1"
                    >
                      <Info size={12} />
                      التفاصيل والخيارات
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Right Side: Scrollable Sidebar Directory */}
        <div className={`w-full lg:w-[460px] bg-white border-l border-slate-200 h-full flex flex-col z-20 transition-all duration-300 ${
          viewMode === 'map' && 'hidden lg:flex'
        }`}>
          
          {/* A. Horizontal Categories badging filter */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth" dir="rtl">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveSubCategory('all'); // Reset subcategory when switching main category
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    activeCategory === cat.id
                      ? 'bg-gold border-gold text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-navy'
                  }`}
                >
                  {isRtl ? cat.label : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* D. Card List (Scrollable) */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50/50" style={{direction: 'rtl'}}>
          <div className="p-4 flex flex-col gap-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  className={`premium-card cursor-pointer p-3 bg-white border rounded-2xl transition-all flex gap-3 relative group ${
                    selectedItem?.id === item.id 
                      ? 'border-gold shadow-md bg-gold/5 scale-[1.01]' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {/* Item Image or Category Default Icon */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative flex items-center justify-center border border-slate-100">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <Building size={24} className="text-slate-400" />
                    )}
                    
                    {/* Tiny Type Icon badge inside image */}
                    <span className="absolute bottom-1 right-1 text-[9px] font-black text-white bg-navy/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                      {item.label}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className="font-extrabold text-xs text-navy group-hover:text-gold-dark transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                      {item.area && (
                        <p className="text-[10px] text-slate-500 font-bold mt-1 bg-slate-100 px-2 py-0.5 rounded-md w-max">
                          {isRtl ? `المساحة: ${item.area}` : `Area: ${item.area}`}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[10px] text-slate-400 font-medium truncate flex items-center gap-0.5 max-w-[170px]">
                        <MapPin size={10} className="text-royal shrink-0" />
                        {item.address}
                      </p>
                      
                      {/* Active indicator */}
                      <span className="text-[10px] text-navy font-bold flex items-center gap-0.5 group-hover:translate-x-[-4px] transition-transform">
                        {isRtl ? 'عرض على الخريطة' : 'Show on Map'}
                        <FaChevronLeft className="text-[8px] text-navy mt-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <Info size={36} className="text-slate-300 mb-3" />
                <p className="text-sm font-bold text-slate-500">{isRtl ? 'لم نعثر على أي مواقع مطابقة' : 'No locations found'}</p>
                <p className="text-xs text-slate-400 mt-1">{isRtl ? 'حاول تغيير معايير البحث أو اختيار تصنيف آخر' : 'Try refining your search or changing the filter'}</p>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* 3. Detail Drawer (Pops up when selectedItem is active) */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ x: isRtl ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isRtl ? '100%' : '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 lg:right-[460px] w-full lg:w-[420px] h-full bg-white border-r border-slate-200 z-30 shadow-2xl flex flex-col"
              dir="rtl"
            >
              {/* Header inside drawer */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-black text-navy bg-gold/20 border border-gold/30 px-3 py-1 rounded-full">
                  {selectedItem.label}
                </span>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="flex-1 overflow-y-auto">
                {/* Photo Header */}
                {selectedItem.image && (
                  <div className="w-full h-48 bg-slate-100 relative">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 text-white">
                      <h2 className="text-lg font-black leading-tight text-white shadow-sm drop-shadow">
                        {selectedItem.name}
                      </h2>
                    </div>
                  </div>
                )}

                <div className="p-5 flex flex-col gap-6">
                  {/* Detailed Description */}
                  <div>
                    <h4 className="text-xs font-black text-slate-400 mb-2 uppercase tracking-wide">
                      {isRtl ? 'عن الموقع / تفاصيل' : 'About / Description'}
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {selectedItem.desc || 'لا يتوفر وصف مفصل حالياً لهذا الموقع. يمكنك الاطلاع على الموقع الجغرافي واتجاهات السفر أدناه.'}
                    </p>
                  </div>

                  {/* Specs & Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 block mb-1">{isRtl ? 'المساحة' : 'Area'}</span>
                      <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                        <Building size={14} className="text-gold-dark" />
                        {selectedItem.area || 'غير محدد'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 block mb-1">{isRtl ? 'إحداثيات' : 'Coordinates'}</span>
                      <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                        <Globe size={14} className="text-teal-500" />
                        {selectedItem.coords.map(c => c.toFixed(4)).join(', ')}
                      </span>
                    </div>

                    {selectedItem.phone && (
                      <div className="col-span-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-400 block mb-1">{isRtl ? 'رقم الاتصال / الهاتف' : 'Contact Phone'}</span>
                        <span className="text-xs font-bold text-navy flex items-center gap-1.5">
                          <Phone size={14} className="text-emerald-500" />
                          <a href={`tel:${selectedItem.phone}`} className="hover:underline">{selectedItem.phone}</a>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Location Address */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-royal/10 flex items-center justify-center text-royal shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 block mb-1">{isRtl ? 'الموقع والعنوان' : 'Address'}</span>
                      <span className="text-xs font-bold text-navy leading-normal">{selectedItem.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Directions / Action Button at Bottom */}
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedItem.coords[0]},${selectedItem.coords[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gold hover:bg-gold-dark text-white font-black py-3 rounded-2xl text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-gold/20"
                >
                  <Navigation size={18} />
                  {isRtl ? 'الحصول على اتجاهات السفر (خرائط Google)' : 'Get Directions (Google Maps)'}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GovernorateMap;
