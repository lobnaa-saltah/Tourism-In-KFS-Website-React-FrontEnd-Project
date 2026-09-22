import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Search, ShieldAlert, Zap, Droplet, Flame, PhoneCall, Mail, 
  Activity, Scale, Building2, ShoppingBag, Eye, HeartPulse, Hospital,
  Building, Pill, Briefcase, Plane, GraduationCap, Gavel,
  Leaf, Factory, Car, Baby, TrafficCone, Map, HelpCircle,
  Accessibility, Users, AlertTriangle, PlusCircle
} from 'lucide-react';
import PageHero from '../components/PageHero/PageHero';

const directoryData = [
  {
    category: "أرقام تهمك",
    items: [
      { name: "الطوارئ", number: "112", icon: AlertTriangle },
      { name: "الإسعاف", number: "123", icon: PlusCircle },
      { name: "النجدة", number: "122", icon: Car },
      { name: "المطافئ", number: "180", icon: Flame },
    ]
  },
  {
    category: "أرقام الوزارات والهيئات",
    items: [
      { name: "وزارة الداخلية", number: "138", icon: ShieldAlert },
      { name: "وزارة العدل", number: "19379", icon: Gavel },
      { name: "الدفاع", number: "19136", icon: Plane },
      { name: "التربية والتعليم", number: "19151", icon: GraduationCap },
      { name: "السياحة", number: "19654", icon: Plane },
      { name: "البيئة", number: "19808", icon: Leaf },
      { name: "التجارة والصناعة", number: "19805", icon: Factory },
      { name: "الأوقاف", number: "107", icon: Building2 },
      { name: "الهيئة العامة للاستثمار", number: "16044", icon: Briefcase },
      { name: "الهيئة العامة للطرق والكباري", number: "19487", icon: Map },
    ]
  },
  {
    category: "طوارئ وخدمات عاجلة",
    items: [
      { name: "طوارئ الصحة", number: "105", icon: HeartPulse },
      { name: "عمليات المحافظة", number: "114", icon: Building },
      { name: "الأمن العام", number: "115", icon: ShieldAlert },
      { name: "شرطة السياحة", number: "126", icon: Briefcase },
      { name: "شرطة المرور", number: "128", icon: TrafficCone },
      { name: "نجدة الطفل", number: "16000", icon: Baby },
      { name: "الرعاية الحرجة والعاجلة", number: "16474", icon: Hospital },
      { name: "مكافحة وعلاج الإدمان", number: "16023", icon: Pill },
    ]
  },
  {
    category: "مرافق وخدمات عامة",
    items: [
      { name: "استعلامات الكهرباء", number: "121", icon: Zap },
      { name: "مياه الشرب", number: "125", icon: Droplet },
      { name: "الغاز الطبيعي", number: "129", icon: Flame },
      { name: "دليل التليفونات", number: "140", icon: PhoneCall },
      { name: "البريد المصري", number: "16789", icon: Mail },
      { name: "التأمين الصحي", number: "106", icon: Hospital },
    ]
  },
  {
    category: "شكاوى ورقابة",
    items: [
      { name: "مجلس الوزراء", number: "16528", icon: Building2 },
      { name: "النيابة الإدارية", number: "16177", icon: Scale },
      { name: "هيئة الرقابة الإدارية", number: "16100", icon: Eye },
      { name: "التموين", number: "15999", icon: ShoppingBag },
      { name: "ذوي الهمم", number: "15044", icon: Accessibility },
      { name: "لجنة المرأة", number: "1560", icon: Users },
    ]
  }
];

const PhoneDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search
  const filteredData = directoryData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.includes(searchTerm) || item.number.includes(searchTerm)
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-cairo" dir="rtl">
      
      {/* Hero / Header Section using PageHero */}
      <PageHero
        title={<span className="block mt-6">دليل الهاتف والأرقام الهامة</span>}
        subtitle="وصول سريع للأرقام الطوارئ والخدمات العامة بالمحافظة."
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-xl mx-auto mt-5"
        >
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="ابحث عن اسم الجهة أو رقم الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-navy font-bold text-sm md:text-base rounded-xl py-4 pr-12 pl-6 outline-none focus:ring-2 focus:ring-[#dca826]/50 transition-all shadow-sm placeholder:text-slate-400 border border-slate-200 focus:border-[#dca826]"
          />
        </motion.div>
      </PageHero>

      {/* Directory Content */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl mt-16">
        {filteredData.length > 0 ? (
          <div className="space-y-16">
            {filteredData.map((category, catIdx) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <div className="flex items-center mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-navy bg-[#dca826]/15 px-6 py-3 rounded-xl inline-flex items-center">
                    {category.category}
                  </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                  {category.items.map((item, itemIdx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (catIdx * 0.1) + (itemIdx * 0.05) }}
                      className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 group"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-full bg-[#dca826]/10 flex items-center justify-center text-[#dca826] mb-4 group-hover:scale-110 group-hover:bg-[#dca826] group-hover:text-white transition-all duration-300">
                        <item.icon size={26} strokeWidth={1.5} />
                      </div>
                      
                      {/* Details */}
                      <h3 className="text-navy font-bold text-sm md:text-base mb-1 min-h-[40px] flex items-center justify-center">
                        {item.name}
                      </h3>
                      
                      <div className="text-[#dca826] font-black text-xl mb-4 tracking-wider" dir="ltr">
                        {item.number}
                      </div>
                      
                      {/* Call Button */}
                      <a 
                        href={`tel:${item.number}`} 
                        className="w-full py-2 px-4 rounded-full border border-slate-200 text-slate-500 font-bold text-sm flex items-center justify-center gap-2 hover:border-[#dca826] hover:text-[#dca826] hover:bg-[#dca826]/5 transition-all duration-300"
                      >
                        <span>اتصل الآن</span>
                        <Phone size={14} className="rotate-12" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-6">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-bold text-navy mb-3">لا توجد نتائج مطابقة</h3>
            <p className="text-slate-500 font-medium">لم نتمكن من العثور على أي جهة أو رقم يطابق بحثك "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-6 px-6 py-2 bg-navy text-white rounded-lg font-bold hover:bg-navy/90 transition-colors"
            >
              مسح البحث
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PhoneDirectory;
