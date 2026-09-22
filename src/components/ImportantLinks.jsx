import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';

const ImportantLinks = () => {
  const [activeTab, setActiveTab] = useState(0);

  const links = [
    { 
      id: 1, 
      title: 'مصر الرقمية (DEPI)', 
      desc: 'المبادرة الوطنية لتدريب وتأهيل الكوادر البشرية في مجالات التكنولوجيا والاتصالات والتحول الرقمي لتأهيلهم لسوق العمل.', 
      url: 'https://depi.gov.eg', 
      image: '/images/projects/depi.jpg',
      color: 'from-blue-600 to-cyan-500'
    },
    { 
      id: 2, 
      title: 'المبادرة الرئاسية "حياة كريمة"', 
      desc: 'المشروع القومي لتطوير الريف المصري والقرى الأكثر احتياجاً لتوفير حياة كريمة لكافة المواطنين بمستوى لائق ومتميز.', 
      url: 'https://www.hayakarima.com', 
      image: '/images/projects/hayahkarima.jpg',
      color: 'from-red-600 to-rose-500'
    },
    { 
      id: 3, 
      title: 'بوابة التصالح الإلكترونية', 
      desc: 'المنصة الرسمية لتقديم طلبات التصالح على مخالفات البناء وتسهيل إجراءات تقنين الأوضاع للمواطنين بالمحليات.', 
      url: 'https://lgs.gov.eg', 
      image: '/images/projects/tasaloh.jpg',
      color: 'from-emerald-600 to-teal-500'
    },
    { 
      id: 4, 
      title: 'رؤية مصر 2030', 
      desc: 'أجندة التنمية المستدامة الوطنية التي تمثل محطة أساسية في مسيرة التنمية الشاملة والنهضة للدولة المصرية.', 
      url: 'https://mped.gov.eg', 
      image: '/images/vision/egypt-vision.png',
      color: 'from-amber-600 to-yellow-500'
    },
    { 
      id: 5, 
      title: 'البوابة الموحدة لكفر الشيخ', 
      desc: 'البوابة الرقمية الموحدة للمحافظة للتعريف بالخدمات وتسهيل الوصول لكل ما يهم المواطن والمستثمر بكفر الشيخ.', 
      url: 'https://kfs.gov.eg', 
      image: '/images/logo/kfslogo.jpg',
      color: 'from-navy to-royal'
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background to make it sing */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royal/5 rounded-full blur-[100px] pointer-events-none -ml-32 -mb-32"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header (More Compact) */}
        <div className="mb-10 lg:mb-12 text-center max-w-2xl mx-auto">
          <span className="text-gold font-bold tracking-wide text-sm lg:text-base mb-3 block">
            الروابط الهامة
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-navy font-cairo mb-4 leading-tight">
            المواقع الوطنية الهامة
          </h2>
          <p className="text-gray-500 text-sm lg:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            المنصات والمبادرات الرسمية المعتمدة التي تقدم خدمات وتدريبات متميزة للمواطنين.
          </p>
        </div>

        {/* Content Layout: Single Unified Bento Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-navy/5 border border-gray-100 p-4 lg:p-6 flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch relative z-10">
          
          {/* Right Side: List of Links (Clean sidebar inside main container) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-1.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1 pl-1">
            {links.map((link, index) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                  activeTab === index 
                    ? 'bg-navy text-white shadow-sm' 
                    : 'hover:bg-slate-50 text-gray-700'
                }`}
              >
                <span className="font-bold text-xs lg:text-sm">{link.title}</span>
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeTab === index ? 'bg-gold scale-125' : 'bg-gray-300 group-hover:bg-gold'}`}></div>
              </button>
            ))}
          </div>

          {/* Left Side: Active Card Display (Integrated Panel inside main container) */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
                transition={{ duration: 0.3 }}
                className="bg-slate-100/80 rounded-2xl p-6 lg:p-8 flex items-center w-full min-h-[300px] border border-slate-200/60 group"
              >

                <div className="flex flex-col-reverse sm:flex-row gap-6 lg:gap-8 items-center w-full">
                  
                  {/* Text Details */}
                  <div className="flex-1 text-center sm:text-right">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold mb-3">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      بوابة معتمدة ورسمية
                    </div>
                    <h3 className="text-lg lg:text-xl font-black text-navy mb-2 lg:mb-3">
                      {links[activeTab].title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-xs lg:text-sm mb-5 min-h-[60px]">
                      {links[activeTab].desc}
                    </p>
                    
                    <a 
                      href={links[activeTab].url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-11 px-5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-gold hover:text-white transition-all duration-300 shadow-sm w-full sm:w-auto group/btn"
                    >
                      زيارة الموقع الإلكتروني
                      <FaExternalLinkAlt className="text-[10px] transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5" />
                    </a>
                  </div>

                  {/* Image / Logo Container */}
                  <div className="w-24 h-24 lg:w-32 lg:h-32 shrink-0 rounded-2xl border border-gray-100 shadow-sm transform group-hover:scale-105 transition-transform duration-500 overflow-hidden relative">
                    <img 
                      src={links[activeTab].image} 
                      alt={links[activeTab].title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'; // fallback
                      }}
                    />
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImportantLinks;
