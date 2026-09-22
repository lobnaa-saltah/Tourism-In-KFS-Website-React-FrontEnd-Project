import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaCar, FaSearch, FaIdCard, FaMoneyBillWave, FaCalendarCheck, FaArrowLeft,
  FaBolt, FaExchangeAlt, FaExclamationTriangle, FaFileInvoiceDollar, FaBreadSlice,
  FaFileSignature, FaFileContract, FaBuilding, FaRegCalendarAlt, FaMapMarkedAlt,
  FaComments, FaBook, FaRegClock, FaUsers,
  FaChartLine, FaIndustry, FaHandshake, FaGlobe,
  FaFingerprint, FaCloud, FaMobileAlt,
  FaCheckCircle, FaFileAlt
} from 'react-icons/fa';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const steps = [
  { num: 1, title: 'تسجيل الدخول', desc: 'قم بتسجيل الدخول بحسابك على البوابة أو إنشاء حساب جديد.' },
  { num: 2, title: 'إدخال البيانات', desc: 'املأ النموذج الإلكتروني بالبيانات المطلوبة بدقة.' },
  { num: 3, title: 'رفع المستندات', desc: 'ارفع صور واضحة من المستندات والأوراق المطلوبة.' },
  { num: 4, title: 'سداد الرسوم', desc: 'ادفع الرسوم المقررة إلكترونياً عبر وسائل الدفع المتاحة.' },
  { num: 5, title: 'متابعة الطلب', desc: 'سيصلك إشعار بحالة الطلب ويمكنك متابعته من لوحة التحكم.' },
];

const requirements = [
  { icon: FaIdCard, text: 'بطاقة رقم قومي سارية (أصل وصورة).' },
  { icon: FaFileAlt, text: 'مستند يثبت صفة مقدم الطلب في حال التوكيل.' },
  { icon: FaMoneyBillWave, text: 'إيصال سداد الرسوم الإدارية إن وجدت.' },
  { icon: FaCheckCircle, text: 'استيفاء أي موافقات أمنية أو فنية مسبقة إن تطلب الأمر.' }
];

// Centralized Data for all categories
const categoriesData = {
  'traffic': {
    title: 'الخدمات المرورية',
    subtitle: 'إنجاز كافة المعاملات المرورية الخاصة برخص القيادة والمركبات والمخالفات إلكترونياً.',
    subServices: [
      { id: 1, title: 'الاستعلام عن المخالفات', desc: 'استعلم عن المخالفات المرورية المسجلة على مركبتك برقم اللوحة.', icon: FaSearch, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 2, title: 'تجديد رخصة مركبة', desc: 'إجراءات تجديد رخصة السيارة بالكامل ودفع الرسوم إلكترونياً.', icon: FaCar, color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { id: 3, title: 'استخراج بدل فاقد/تالف', desc: 'استخراج بدل فاقد أو تالف لرخصة القيادة أو تسيير المركبة.', icon: FaIdCard, color: 'text-amber-500', bg: 'bg-amber-50' },
      { id: 4, title: 'التظلم على المخالفات', desc: 'تقديم تظلم إلكتروني على المخالفات المرورية ومتابعة حالته.', icon: FaMoneyBillWave, color: 'text-rose-500', bg: 'bg-rose-50' },
      { id: 5, title: 'حجز موعد للفحص الفني', desc: 'احجز موعد مسبق بوحدات المرور لتجنب الزحام والانتظار.', icon: FaCalendarCheck, color: 'text-violet-500', bg: 'bg-violet-50' },
    ]
  },
  'supply-electricity': {
    title: 'التموين والكهرباء',
    subtitle: 'إدارة خدماتك التموينية والكهربائية بكل شفافية وسهولة من مكان واحد.',
    subServices: [
      { id: 1, title: 'إصدار بطاقة تموين', desc: 'استخراج بطاقة تموينية جديدة لأول مرة للفئات المستحقة.', icon: FaBreadSlice, color: 'text-amber-500', bg: 'bg-amber-50' },
      { id: 2, title: 'الاستعلام عن فاتورة الكهرباء', desc: 'اعرف قيمة فاتورة الكهرباء الشهرية الخاصة بك وسددها فوراً.', icon: FaBolt, color: 'text-sky-500', bg: 'bg-sky-50' },
      { id: 3, title: 'نقل بطاقة لمحافظة أخرى', desc: 'قدم طلب لنقل بطاقتك التموينية إلى محافظة أو مكتب تموين آخر.', icon: FaExchangeAlt, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 4, title: 'الإبلاغ عن أعطال الكهرباء', desc: 'قدم بلاغ عن أعطال أو انقطاع التيار الكهربائي في منطقتك.', icon: FaExclamationTriangle, color: 'text-rose-500', bg: 'bg-rose-50' },
      { id: 5, title: 'دفع فواتير مسبقة الدفع', desc: 'شحن عدادات الكهرباء مسبقة الدفع بكل سهولة عبر كروت الـ NFC.', icon: FaFileInvoiceDollar, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ]
  },
  'real-estate': {
    title: 'التوثيق العقاري',
    subtitle: 'خدمات الشهر العقاري والتوثيق الرقمي بين يديك، لضمان حقوقك وتوثيق معاملاتك بكل أمان.',
    subServices: [
      { id: 1, title: 'استخراج توكيل عام', desc: 'استخرج توكيل عام قضايا أو شامل إلكترونياً بخطوات بسيطة.', icon: FaFileSignature, color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { id: 2, title: 'توثيق عقود البيع', desc: 'توثيق عقود بيع السيارات والعقارات بشكل قانوني سريع.', icon: FaFileContract, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 3, title: 'استعلام عن كثافة الفروع', desc: 'اعرف مدى زحام فروع الشهر العقاري قبل التوجه إليها لتوفر وقتك.', icon: FaBuilding, color: 'text-amber-500', bg: 'bg-amber-50' },
      { id: 4, title: 'حجز موعد شهر عقاري', desc: 'احجز موعد مسبق في الفرع الأقرب إليك لإنهاء معاملاتك بلا انتظار.', icon: FaRegCalendarAlt, color: 'text-rose-500', bg: 'bg-rose-50' },
      { id: 5, title: 'خريطة فروع التوثيق', desc: 'اكتشف أماكن ومكاتب الشهر العقاري في محافظة كفر الشيخ ومواعيد عملها.', icon: FaMapMarkedAlt, color: 'text-violet-500', bg: 'bg-violet-50' },
    ]
  },
  'complaints': {
    title: 'الشكاوى الحكومية',
    subtitle: 'صوتك مسموع، منظومة موحدة لاستقبال شكاوى ومقترحات المواطنين لضمان جودة الخدمات.',
    subServices: [
      { id: 1, title: 'تقديم شكوى جديدة', desc: 'أرسل شكواك أو مقترحك للجهات الحكومية المعنية ومتابعتها إلكترونياً.', icon: FaComments, color: 'text-rose-500', bg: 'bg-rose-50' },
      { id: 2, title: 'متابعة حالة الشكوى', desc: 'استعلم عن حالة الشكوى المقدمة مسبقاً والردود الخاصة بها.', icon: FaSearch, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 3, title: 'دليل الجهات الحكومية', desc: 'تصفح قائمة الجهات الحكومية والمصالح واعرف كيفية التواصل معها.', icon: FaBook, color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { id: 4, title: 'الشكاوى العاجلة', desc: 'تقديم بلاغ طوارئ للجهات المعنية لسرعة التدخل الفوري.', icon: FaRegClock, color: 'text-amber-500', bg: 'bg-amber-50' },
      { id: 5, title: 'التواصل المجتمعي', desc: 'شارك برأيك في القضايا المجتمعية وساهم في تحسين الخدمات.', icon: FaUsers, color: 'text-violet-500', bg: 'bg-violet-50' },
    ]
  },
  'investment-services': {
    title: 'خدمات الاستثمار',
    subtitle: 'تسهيلات ودعم متكامل لرجال الأعمال والمستثمرين لتعزيز بيئة الأعمال وتطوير المشروعات.',
    subServices: [
      { id: 1, title: 'استخراج رخصة تشغيل', desc: 'قدم طلب استخراج أو تجديد رخصة تشغيل لمنشأتك التجارية أو الصناعية.', icon: FaFileAlt, color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { id: 2, title: 'تأسيس الشركات', desc: 'إجراءات تأسيس شركتك إلكترونياً ومتابعة الطلب مع هيئة الاستثمار.', icon: FaIndustry, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 3, title: 'مؤشرات الاستثمار', desc: 'اطلع على أهم مؤشرات السوق والفرص الاستثمارية الواعدة في المحافظة.', icon: FaChartLine, color: 'text-amber-500', bg: 'bg-amber-50' },
      { id: 4, title: 'دليل المستثمر', desc: 'تصفح التشريعات والقوانين والمزايا المتاحة للمستثمرين في مختلف القطاعات.', icon: FaBook, color: 'text-violet-500', bg: 'bg-violet-50' },
      { id: 5, title: 'حجز أراضي صناعية', desc: 'قدم طلب لتخصيص أو حجز أراضي في المناطق الصناعية والاستثمارية.', icon: FaGlobe, color: 'text-rose-500', bg: 'bg-rose-50' },
      { id: 6, title: 'الشراكة الحكومية', desc: 'تعرف على مشروعات الشراكة بين القطاع العام والخاص (PPP) المتاحة.', icon: FaHandshake, color: 'text-sky-500', bg: 'bg-sky-50' },
    ]
  },
  'digital-transformation': {
    title: 'التحول الرقمي',
    subtitle: 'بوابتك الذكية للوصول إلى كافة الخدمات الحكومية المرقمنة بسرعة وسهولة من أي مكان.',
    subServices: [
      { id: 1, title: 'التسجيل في البوابة', desc: 'أنشئ حسابك الموحد للوصول إلى كافة الخدمات الحكومية الرقمية.', icon: FaFingerprint, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 2, title: 'الدفع الإلكتروني', desc: 'سدد الرسوم والفواتير الحكومية عبر بوابات الدفع الإلكترونية المعتمدة.', icon: FaMoneyBillWave, color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { id: 3, title: 'التوقيع الإلكتروني', desc: 'استخرج شهادة التوقيع الإلكتروني لاعتماد الوثائق الرسمية عن بُعد.', icon: FaFileSignature, color: 'text-violet-500', bg: 'bg-violet-50' },
      { id: 4, title: 'الاستعلام عن الخدمات', desc: 'دليل شامل لجميع الخدمات الرقمية المتاحة وخطوات تنفيذها.', icon: FaSearch, color: 'text-amber-500', bg: 'bg-amber-50' },
      { id: 5, title: 'تطبيق الهاتف الذكي', desc: 'حمل التطبيق الرسمي للوصول لخدمات المحافظة من هاتفك المحمول.', icon: FaMobileAlt, color: 'text-rose-500', bg: 'bg-rose-50' },
      { id: 6, title: 'الحوسبة السحابية', desc: 'خدمات الاستضافة السحابية الآمنة للمؤسسات والشركات الناشئة.', icon: FaCloud, color: 'text-sky-500', bg: 'bg-sky-50' },
    ]
  }
};

const ServiceCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const detailsRef = React.useRef(null);
  
  const data = categoriesData[categoryId];
  const [selectedService, setSelectedService] = React.useState(() => data?.subServices?.[0] || null);

  // Initialize selected service when data loads
  React.useEffect(() => {
    if (data?.subServices?.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedService(data.subServices[0]);
    }
  }, [categoryId, data]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setTimeout(() => {
      if (detailsRef.current) {
        const y = detailsRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  // Fallback if URL is invalid
  if (!data) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center font-cairo">
        <h2 className="text-2xl font-bold text-navy mb-4">القسم غير موجود</h2>
        <button onClick={() => navigate('/')} className="bg-gold text-navy px-6 py-2 rounded-xl font-bold">العودة للرئيسية</button>
      </div>
    );
  }

  const { title, subtitle, subServices } = data;

  return (
    <div className="bg-slate-50 min-h-screen font-cairo overflow-x-hidden" dir="rtl">
      <PageHero
        title={title}
        subtitle={subtitle}
      />

      <section className="container mx-auto px-4 lg:px-8 max-w-7xl py-16 -mt-12 relative z-20">
        
        {/* Services Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {subServices.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              onClick={() => handleServiceClick(service)}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-start h-full cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner shrink-0`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-navy mb-3 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-medium">
                {service.desc}
              </p>
              
              <div 
                className="flex items-center gap-2 text-sm font-bold text-navy group-hover:text-gold transition-colors mt-auto"
              >
                <span>تفاصيل الخدمة</span>
                <FaArrowLeft size={12} className="transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Design Section (Instead of a separate page) */}
        {selectedService && (
          <motion.div 
            ref={detailsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20 border-t-2 border-slate-100 pt-16"
          >
            {/* Section Header */}
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-navy mb-2">تفاصيل وملف الخدمة</h2>
              <p className="text-slate-500 font-medium">كل ما تحتاجه للبدء في تنفيذ طلبك إلكترونياً</p>
            </div>
              
            {/* Top Section: Overview & Steps Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
              {/* Service Overview */}
              <motion.div 
                initial="hidden" animate="visible" variants={fadeUp}
                className="lg:col-span-5 bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] h-full flex flex-col"
              >
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                  <div className={`w-16 h-16 shrink-0 rounded-2xl ${selectedService.bg} ${selectedService.color} flex items-center justify-center shadow-inner`}>
                     <selectedService.icon size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-navy">{selectedService.title}</h2>
                    <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold mt-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      خدمة متاحة إلكترونياً
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-black text-navy mb-6">المستندات والشروط المطلوبة</h3>
                <ul className="space-y-4 mb-8">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center shrink-0">
                        <req.icon size={18} />
                      </div>
                      <span className="text-slate-600 font-medium leading-relaxed pt-2">{req.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Service Info Integrated into Card */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mt-auto">
                  <h4 className="font-black text-navy mb-4 text-sm">معلومات الخدمة</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                        <FaRegClock size={16} />
                      </div>
                      <div>
                        <span className="block text-xs text-slate-400 font-bold mb-1">المدة المتوقعة</span>
                        <span className="block text-navy font-black text-sm">3 أيام عمل</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                        <FaMoneyBillWave size={16} />
                      </div>
                      <div>
                        <span className="block text-xs text-slate-400 font-bold mb-1">رسوم الخدمة</span>
                        <span className="block text-navy font-black text-sm">مجاناً</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Execution Steps */}
              <motion.div 
                initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}
                className="lg:col-span-7 bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] h-full"
              >
                <h3 className="text-xl font-black text-navy mb-8">خطوات تنفيذ الخدمة</h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute right-6 top-4 bottom-4 w-0.5 bg-slate-100"></div>
                  
                  <div className="flex flex-col gap-6">
                    {steps.map((step, idx) => (
                      <div key={idx} className="flex gap-6 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-navy text-white font-black flex items-center justify-center shrink-0 shadow-lg border-4 border-white">
                          {step.num}
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-5 flex-1 border border-slate-100 hover:border-navy/20 hover:shadow-md transition-all">
                          <h4 className="font-bold text-navy mb-2">{step.title}</h4>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Bottom Actions (CTA Banner) */}
            <motion.div 
              initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }}
              className="bg-navy rounded-[2rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mt-8"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 text-center md:text-right flex-1">
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                  جاهز للبدء بـ <span className="text-amber-400">{selectedService.title}</span>؟
                </h3>
                <p className="text-slate-300 text-sm max-w-xl mx-auto md:mx-0 leading-relaxed">
                  تأكد من تجهيز كافة المستندات المطلوبة بصيغة PDF قبل البدء في تعبئة الطلب لضمان سرعة التنفيذ.
                </p>
              </div>
              
              <div className="relative z-10 shrink-0 w-full md:w-auto">
                <button 
                  onClick={() => navigate('/service/request', { state: { service: { title: selectedService.title } } })}
                  className="w-full md:w-auto px-12 bg-white/10 border border-white/20 text-white hover:bg-amber-400 hover:text-white hover:border-transparent font-black py-4 lg:py-5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm text-lg"
                >
                  ابدأ الخدمة الآن
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

      </section>
    </div>
  );
};

export default ServiceCategory;
