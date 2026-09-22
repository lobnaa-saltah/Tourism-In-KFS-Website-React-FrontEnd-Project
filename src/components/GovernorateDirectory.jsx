import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBed, FaHospital, FaUserMd, FaTree, FaBus, 
  FaMapMarkerAlt, FaPhoneAlt, FaChevronRight, FaChevronLeft 
} from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet map flyTo re-center component
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

// Function to generate premium custom markers matching the user's golden circle request
const getCustomIcon = (categoryId) => {
  let svgPath = '';
  if (categoryId === 'hotels') {
    svgPath = `<svg viewBox="0 0 640 512" class="w-5 h-5 text-navy" fill="currentColor"><path d="M176 256c44.18 0 80-35.82 80-80s-35.82-80-80-80-80 35.82-80 80 35.82 80 80 80zM576 224H368v-48c0-26.51-21.49-48-48-48L80 128c-26.51 0-48 21.49-48 48v288c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16v-48h512v48c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16V304c0-44.18-35.82-80-80-80zm24 112H80v-48c0-8.837 7.163-16 16-16h464c8.837 0 16 7.163 16 16v48z"/></svg>`;
  } else if (categoryId === 'gov-hospitals') {
    svgPath = `<svg viewBox="0 0 512 512" class="w-5 h-5 text-navy" fill="currentColor"><path d="M384 128H288V32c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v96H96c-17.67 0-32 14.33-32 32v320c0 17.67 14.33 32 32 32h288c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32zm-32 208H288v64c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-64h-64c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h64v-64c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v64h64c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16z"/></svg>`;
  } else if (categoryId === 'private-hospitals') {
    svgPath = `<svg viewBox="0 0 448 512" class="w-5 h-5 text-navy" fill="currentColor"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>`;
  } else if (categoryId === 'parks') {
    svgPath = `<svg viewBox="0 0 448 512" class="w-5 h-5 text-navy" fill="currentColor"><path d="M224 0c-11.4 0-21.4 7.8-24.2 18.9L161.4 176H112c-17.7 0-32 14.3-32 32 0 8.5 3.4 16.6 9.4 22.6l64 64c6 6 14.1 9.4 22.6 9.4h48v64h-80c-17.7 0-32 14.3-32 32 0 8.5 3.4 16.6 9.4 22.6l64 64c6 6 14.1 9.4 22.6 9.4h48v48c0 17.7 14.3 32 32 32s32-14.3 32-32v-48h48c8.5 0 16.6-3.4 22.6-9.4l64-64c6-6 9.4-14.1 9.4-22.6 0-17.7-14.3-32-32-32h-80v-64h48c8.5 0 16.6-3.4 22.6-9.4l64-64c6-6 9.4-14.1 9.4-22.6 0-17.7-14.3-32-32-32h-49.4l-38.4-157.1C245.4 7.8 235.4 0 224 0z"/></svg>`;
  } else {
    svgPath = `<svg viewBox="0 0 512 512" class="w-5 h-5 text-navy" fill="currentColor"><path d="M488 224h-16v-64c0-26.5-21.5-48-48-48H88c-26.5 0-48 21.5-48 48v64H24c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h16v128c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32v-16h256v16c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32V320h16c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zm-376-32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm288 192c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm0-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm-192 192c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/></svg>`;
  }

  return L.divIcon({
    html: `
      <div class="w-10 h-10 bg-gold border-2 border-white rounded-full flex items-center justify-center shadow-lg shadow-gold/45 hover:scale-115 transition-transform duration-300">
        ${svgPath}
      </div>
    `,
    className: 'custom-leaflet-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

const GovernorateDirectory = () => {
  const [activeCategory, setActiveCategory] = useState('hotels');
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
    setDirection(0);
  }, [activeCategory]);

  const categories = [
    {
      id: 'hotels',
      title: 'الفنادق والإقامة',
      count: 4,
      icon: FaBed,
      items: [
        { name: 'فندق بيوت باي (Byoot Bay)', address: 'فوه - كورنيش النيل المميز', phone: '047-2980112', image: '/images/places/فندق بيوت باي (byoot-bay).jpg', coords: [31.2052, 30.5543] },
        { name: 'فندق القوات المسلحة السياحي', address: 'كفر الشيخ - وسط المدينة بجوار الاستاد', phone: '047-3211105', image: '/images/places/فندق القوات المسلحة السياحي.jpg', coords: [31.1165, 30.9423] },
        { name: 'فندق سيدي طلحة الإقليمي', address: 'كفر الشيخ - حي القنطرة القديم', phone: '047-3232264', image: '/images/places/فندق سيدي طلحة الإقليمي.jpg', coords: [31.1123, 30.9345] },
        { name: 'فندق دهب السياحي ببلطيم', address: 'شاطئ بلطيم - منطقة النرجس الهادئة', phone: '047-2510340', image: '/images/places/فندق دهب السياحي ببلطيم.jpg', coords: [31.5423, 31.0921] },
      ]
    },
    {
      id: 'gov-hospitals',
      title: 'المستشفيات الحكومية',
      count: 8,
      icon: FaHospital,
      items: [
        { name: 'مستشفى كفر الشيخ العام', address: 'طريق الرياض - كفر الشيخ', phone: '047-3231012', image: '/images/places/مستشفى كفر الشيخ العام.jpg', coords: [31.1189, 30.9521] },
        { name: 'مستشفى كفر الشيخ الجامعي', address: 'حرم الجامعة - كفر الشيخ', phone: '047-3215560', image: '/images/places/مستشفى كفر الشيخ الجامعي.jpg', coords: [31.0987, 30.9443] },
        { name: 'مستشفى العبور للتأمين الصحي', address: 'شارع المصنع - كفر الشيخ', phone: '047-3224902', image: '/images/places/مستشفى العبور للتأمين الصحي.jpg', coords: [31.1076, 30.9381] },
        { name: 'مستشفى الرمد التخصصي', address: 'شارع الجيش - كفر الشيخ', phone: '047-3222564', image: '/images/places/مستشفى الرمد التخصصي.jpg', coords: [31.1112, 30.9498] },
        { name: 'مستشفى دسوق العام الجديد', address: 'دسوق - حي الزهور السكني', phone: '047-2563140', image: '/images/places/مستشفى دسوق العام الجديد.jpg', coords: [31.1323, 30.6512] },
        { name: 'مستشفى سيدي سالم المركزي', address: 'سيدي سالم - شارع مدارس', phone: '047-2400120', image: '/images/places/مستشفى سيدي سالم المركزي.jpg', coords: [31.2745, 30.8012] },
        { name: 'مستشفى قلين المركزي المطور', address: 'قلين - بجوار مركز الشرطة', phone: '047-3401500', image: '/images/places/مستشفى قلين المركزي المطور.jpg', coords: [31.0045, 30.8056] },
        { name: 'مستشفى بلطيم المركزي النموذجي', address: 'بلطيم - الطريق الدولي الساحلي', phone: '047-2510202', image: '/images/places/مستشفى بلطيم المركزي النموذجي.jpg', coords: [31.5323, 31.0765] },
      ]
    },
    {
      id: 'private-hospitals',
      title: 'المستشفيات الخاصة',
      count: 8,
      icon: FaUserMd,
      items: [
        { name: 'مستشفى الشفاء التخصصي', address: 'شارع الخليفة المأمون - كفر الشيخ', phone: '047-3232000', image: '/images/places/مستشفى الشفاء التخصصي.png', coords: [31.1134, 30.9405] },
        { name: 'مستشفى النخبة الطبي الحديث', address: 'طريق بلطيم الدولي الموحد', phone: '047-3254100', image: '/images/places/مستشفى النخبة الطبي الحديث.jpg', coords: [31.1198, 30.9456] },
        { name: 'مستشفى الدلتا التخصصي', address: 'حي المحاربة - كفر الشيخ', phone: '047-3211500', image: '/images/places/مستشفى الدلتا التخصصي.jpg', coords: [31.1043, 30.9312] },
        { name: 'مركز مكة الطبي التخصصي', address: 'شارع الجيش - كفر الشيخ', phone: '047-3221990', image: '/images/places/مركز مكة الطبي التخصصي.jpg', coords: [31.1145, 30.9472] },
        { name: 'مستشفى السلام التخصصي', address: 'كفر الشيخ - شارع المصنع الجديد', phone: '047-3221440', image: '/images/places/مستشفى السلام التخصصي.jpg', coords: [31.1098, 30.9334] },
        { name: 'مستشفى الصفوة التخصصي', address: 'كفر الشيخ - تقسيم المعلمين الهدوء', phone: '047-3240500', image: '/images/places/مستشفى الصفوة التخصصي.jpg', coords: [31.1012, 30.9356] },
        { name: 'مستشفى الرحمة الطبي بدسوق', address: 'دسوق - شارع الشركات الرئيسي', phone: '047-2569000', image: '/images/places/مستشفى الرحمة الطبي بدسوق.jpg', coords: [31.1298, 30.6456] },
        { name: 'مستشفى الحياة للعيون والقلب', address: 'كفر الشيخ - طريق الاستاد الرياضي', phone: '047-3210100', image: '/images/places/مستشفى الحياة للعيون والقلب.jpg', coords: [31.1176, 30.9392] },
      ]
    },
    {
      id: 'parks',
      title: 'النوادي والمتنزهات',
      count: 9,
      icon: FaTree,
      items: [
        { name: 'حديقة صنعاء الشهيرة', address: 'شارع الاستاد - بجوار ديوان عام المحافظة', phone: 'مفتوحة للعامة', image: '/images/places/حديقة صنعاء الشهيرة.jpg', coords: [31.1143, 30.9489] },
        { name: 'نادي كفر الشيخ الرياضي الاجتماعي', address: 'شارع الاستاد الرياضي الرئيسي', phone: 'أعضاء وزوار', image: '/images/places/نادي كفر الشيخ الرياضي الاجتماعي.jpg', coords: [31.1154, 30.9467] },
        { name: 'حديقة الأسرة والطفولة بدسوق', address: 'دسوق - كورنيش النيل المميز', phone: 'مفتوحة للعامة', image: '/images/places/حديقة الأسرة والطفولة بدسوق.jpg', coords: [31.1345, 30.6432] },
        { name: 'نادي سيتي كلوب الرياضي الجديد', address: 'مدخل المحافظة الرئيسي - طريق طنطا', phone: 'لأعضاء النادي', image: '/images/places/نادي سيتي كلوب الرياضي الجديد.jpg', coords: [31.0856, 30.9543] },
        { name: 'حديقة العائلات ببلطيم', address: 'بلطيم - شاطئ النرجس السياحي', phone: 'مفتوحة للعامة', image: '/images/places/حديقة العائلات ببلطيم.jpg', coords: [31.5456, 31.0876] },
        { name: 'نادي مطوبس الرياضي المطور', address: 'مطوبس - شارع الثورة الرئيسي', phone: 'أعضاء وزوار', image: '/images/places/نادي مطوبس الرياضي المطور.jpg', coords: [31.2956, 30.5256] },
        { name: 'حديقة الخالدين التذكارية', address: 'كفر الشيخ - ميدان النصر الرئيسي', phone: 'مفتوحة للعامة', image: '/images/places/حديقة الخالدين التذكارية.jpg', coords: [31.1089, 30.9412] },
        { name: 'نادي بيلا الرياضي الاجتماعي', address: 'بيلا - بجوار محطة قطار بيلا', phone: 'أعضاء وزوار', image: '/images/places/نادي بيلا الرياضي الاجتماعي.jpg', coords: [31.1856, 31.2256] },
        { name: 'حديقة الكورنيش بفوه الأثرية', address: 'فوه - كورنيش النيل بجوار المسجد الأثري', phone: 'مفتوحة للعامة', image: '/images/places/حديقة الكورنيش بفوه الأثري.jpg', coords: [31.2067, 30.5512] },
      ]
    },
    {
      id: 'transports',
      title: 'مواقف ومواصلات',
      count: 6,
      icon: FaBus,
      items: [
        { name: 'موقف كفر الشيخ العمومي الجديد', address: 'طريق المحلة الجديد - كفر الشيخ', phone: 'المحافظات والمدن الكبرى', image: '/images/places/موقف كفر الشيخ العمومي الجديد.jpg', coords: [31.1234, 30.9598] },
        { name: 'موقف بلطيم السياحي الجديد', address: 'مدخل مدينة بلطيم السياحية', phone: 'المدن الساحلية ومراكز المحافظة', image: '/images/places/موقف بلطيم السياحي الجديد.jpg', coords: [31.5298, 31.0734] },
        { name: 'موقف دسوق الإقليمي الموحد', address: 'مدخل مدينة دسوق الرئيسي', phone: 'كفر الشيخ، الإسكندرية، طنطا', image: '/images/places/موقف دسوق الإقليمي الموحد.jpg', coords: [31.1287, 30.6587] },
        { name: 'موقف مطوبس وفوه الإقليمي', address: 'طريق فوه مطوبس الدولي المشترك', phone: 'الوجه البحري والدلتا والبحيرة', image: '/images/places/موقف مطوبس وفوه الإقليمي.jpg', coords: [31.2543, 30.5345] },
        { name: 'موقف سيدي سالم الإقليمي', address: 'مدخل سيدي سالم الرئيسي العام', phone: 'كفر الشيخ، طنطا، ومراكز المحافظة', image: '/images/places/موقف سيدي سالم الإقليمي.jpg', coords: [31.2789, 30.7954] },
        { name: 'موقف بيلا العمومي للسرفيس', address: 'بيلا - بجوار الكوبري العلوي العمومي', phone: 'كفر الشيخ، المنصورة، طنطا، بيلا', image: '/images/places/موقف بيلا العمومي للسرفيس.jpg', coords: [31.1898, 31.2212] },
      ]
    }
  ];

  const activeCatData = categories.find(cat => cat.id === activeCategory) || categories[0];
  const items = activeCatData.items;
  const isSlider = items.length > 4;

  const nextSlide = () => {
    setDirection(1);
    setSlideIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setSlideIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getVisibleItems = () => {
    if (!isSlider) return items;
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(items[(slideIndex + i) % items.length]);
    }
    return visible;
  };
  const visibleItems = getVisibleItems();

  const getMapConfig = (categoryId) => {
    switch (categoryId) {
      case 'hotels':
        return { center: [31.2441, 30.8808], zoom: 10 };
      case 'gov-hospitals':
        return { center: [31.1843, 30.8525], zoom: 10 };
      case 'private-hospitals':
        return { center: [31.1111, 30.9279], zoom: 12 };
      case 'parks':
        return { center: [31.1997, 30.8660], zoom: 10 };
      case 'transports':
        return { center: [31.2508, 30.8738], zoom: 10 };
      default:
        return { center: [31.1107, 30.9388], zoom: 10 };
    }
  };

  const mapConfig = getMapConfig(activeCategory);

  return (
    <section className="pt-20 pb-0 bg-gray-50 text-navy relative overflow-hidden">
      {/* Subtle background element to make it sing */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
        
        {/* Section Header (Calm and Elegant) */}
        <div className="mb-12 text-center">
          <span className="text-gold font-bold tracking-wide text-sm lg:text-base mb-3 block">
            دليل الخدمات
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-navy font-cairo mb-4 leading-tight">
            دليل الخدمات والمرافق بالعاصمة
          </h2>
          <p className="text-gray-500 text-sm lg:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            الوصول السريع إلى العناوين وأرقام الهواتف لكافة المواقع والخدمات الرئيسية في محافظة كفر الشيخ.
          </p>
        </div>

        {/* Horizontal Tabs Nav (Calm and Premium App-style) */}
        <div className="flex justify-center mb-12 overflow-x-auto lg:overflow-x-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex bg-white p-1.5 rounded-2xl border border-gray-200/60 shadow-sm gap-1.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs lg:text-sm whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-gray-500 hover:text-navy hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-gold' : 'text-gray-400'} />
                  <span>{cat.title}</span>
                  
                  {/* Subtle, beautiful badge showing the count */}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black transition-all ${
                    isActive 
                      ? 'bg-white/15 text-gold' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Display (Calm Spacious Grid / Premium Slider) */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Grid Wrapper */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    {visibleItems.map((item, idx) => (
                      <motion.div
                        key={`${activeCategory}-${item.name}-${slideIndex}`}
                        custom={direction}
                        initial={isSlider ? { opacity: 0, x: direction > 0 ? 80 : -80, scale: 0.95 } : { opacity: 0 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={isSlider ? { opacity: 0, x: direction > 0 ? -80 : 80, scale: 0.95 } : { opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                        className="bg-white border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-md hover:border-navy/20 transition-all duration-300 flex flex-col overflow-hidden group"
                      >
                        {/* Top Image Card - Compacted height to h-36 */}
                        <div className="w-full h-36 overflow-hidden relative bg-gray-50">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-navy/5"></div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Quiet Top Category Label */}
                            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold mb-2">
                              {(() => {
                                const Icon = activeCatData.icon;
                                return <Icon size={10} className="text-navy-light" />;
                              })()}
                              <span>{activeCatData.title}</span>
                            </div>

                            <h4 className="font-bold text-sm lg:text-base text-navy mb-1.5 leading-snug group-hover:text-gold transition-colors">{item.name}</h4>
                          </div>

                          <div className="space-y-1.5 mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                              <FaMapMarkerAlt className="text-gold shrink-0 mt-0.5" />
                              <span>{item.address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <FaPhoneAlt className="text-gold shrink-0" />
                              <span dir="ltr">{item.phone}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows for Slider */}
                {isSlider && (
                  <div className="flex items-center justify-center gap-6 mt-10">
                    <button 
                      onClick={prevSlide} 
                      className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-navy hover:bg-gold hover:border-gold hover:text-white transition-all shadow-sm cursor-pointer z-20"
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                    <div className="text-xs font-bold text-navy bg-white border border-gray-200/60 px-4 py-2 rounded-full shadow-sm">
                      {slideIndex + 1} / {items.length}
                    </div>
                    <button 
                      onClick={nextSlide} 
                      className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-navy hover:bg-gold hover:border-gold hover:text-white transition-all shadow-sm cursor-pointer z-20"
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Dynamic Map Component taking full width edge-to-edge */}
      <div className="mt-10 bg-gray-50 border-t border-gray-200/60 pt-10 pb-0 relative overflow-hidden w-full">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 mb-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full mb-3">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
            <span>خريطة تفاعلية حية</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-navy font-cairo">الخريطة التفاعلية للمواقع</h3>
          <p className="text-gray-500 text-sm mt-2 max-w-xl leading-relaxed">
            توضح مواقع الفئة المختارة جغرافياً على خريطة المحافظة التفاعلية.
          </p>
        </div>

        {/* Full-width Map container */}
        <div className="w-full h-[500px] border-t border-gray-100 z-10 relative">
          <MapContainer 
            center={mapConfig.center} 
            zoom={mapConfig.zoom} 
            scrollWheelZoom={false}
            className="w-full h-full"
            attributionControl={false}
          >
            <ChangeMapView center={mapConfig.center} zoom={mapConfig.zoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {activeCatData.items.map((item) => (
              item.coords && (
                <Marker 
                  key={item.name} 
                  position={item.coords} 
                  icon={getCustomIcon(activeCategory)}
                >
                  <Popup className="custom-popup">
                    <div className="p-3 text-right max-w-[250px] font-cairo">
                      <h4 className="font-bold text-sm text-navy mb-1.5">{item.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{item.address}</p>
                      <div className="text-[10px] text-gold font-bold">هاتف: {item.phone}</div>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>
      </div>

    </section>
  );
};

export default GovernorateDirectory;
