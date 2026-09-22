import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMap, HiPlay, HiArrowLeft } from 'react-icons/hi2';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const stats = [
  { value: '18', label: 'خدمة إلكترونية' },
  { value: '3', label: 'نوع خدمة' },
  { value: '24h', label: 'متابعة مستمرة' },
];

const categories = [
  {
    id: 'registration',
    title: 'التسجيل المكاني',
    desc: 'هي خدمة المعاينة بالإحداثيات والتسجيل على قواعد البيانات المركزية والإفادة بوثيقة معلومات مؤمنة موضحاً بها بيانات الموقع من حيث موقف الحيز العمراني والرصد في منظومة المتغيرات المكانية ومناطق الإشتراطات والحظر وبيانات أخرى.',
    subTitle: 'التسجيل المكاني بغرض التقدم علي',
    services: [
      { name: 'رخص البناء', link: '/services/spatial/building-permits' },
      { name: 'تصالح', link: '/services/spatial/reconciliation' },
      { name: 'إستعلام مكاني', link: '/services/spatial/inquiry' },
      { name: 'طلب توصيل مرافق', link: '/services/spatial/utilities-request' },
      { name: 'رخصة أكشاك', link: '/services/spatial/kiosk-licensing' },
      { name: 'إشغال أمام المحال وتند المحال', link: '/services/spatial/store-occupancy' },
      { name: 'إستئناف أعمال البناء', link: '/services/spatial/resume-building' },
      { name: 'إنشاء أبراج المحمول', link: '/services/spatial/mobile-towers' },
      { name: 'لطلب دراسة قيد الإرتفاع', link: '/services/spatial/height-limit' },
    ]
  },
  {
    id: 'validity',
    title: 'صلاحية الموقع',
    desc: 'خدمة يتقدم عليها المواطن تمهيداً لاستخراج رخصة البناء، يحدد بها الاشتراطات البنائية والتخطيطية طبقا للمخططات التفصيلية. هذه الخدمة تشمل خدمة اعمال الرفع المساحي.',
    subTitle: 'صلاحية الموقع بغرض التقدم علي',
    services: [
      { name: 'صلاحية الموقع (قرية)', link: '/services/spatial/site-validity-village' },
      { name: 'صلاحية الموقع (مدينة)', link: '/services/spatial/site-validity-city' },
    ]
  },
  {
    id: 'surveying',
    title: 'الأعمال المساحية',
    desc: 'هي مجموعة الخدمات المساحية المتنوعة جميعها تعتمد على المعاينة بالاحداثيات باستخدام أحدث أجهزة الرفع المساحي والتسجيل على قواعد البيانات المركزية والإفادة بوثيقة مؤمنة موضحاً بها بيانات الموقع من حيث موقف الحيز العمراني والرصد في منظومة المتغيرات المكانية وبيانات أخري.',
    subTitle: 'الأعمال المساحية بغرض التقدم علي',
    services: [
      { name: 'رفع مساحي', link: '/services/spatial/surveying-lift' },
      { name: 'توقيع مساحي', link: '/services/spatial/surveying-mark' },
      { name: 'ميزانية شبكية', link: '/services/spatial/network-budget' },
      { name: 'كارت وصف نقطة ثابتة', link: '/services/spatial/fixed-point-card' },
      { name: 'شهادة المنسوب', link: '/services/spatial/level-certificate' },
      { name: 'إنشاء شبكة مساحية', link: '/services/spatial/survey-network' },
      { name: 'تقرير معدلات الحفر والردم', link: '/services/spatial/excavation-report' },
    ]
  }
];

const SpatialServices = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8fafc] min-h-screen font-cairo overflow-x-hidden pb-20">
      
      <PageHero
        title="منظومة الخدمات المكانية"
        subtitle="خدمات جغرافية رقمية موثقة وآمنة — تقديم إلكتروني بالكامل دون الحاجة لزيارة المركز"
        stats={stats}
      />

      {/* ── Video Section ── */}
      <section className="container mx-auto px-4 lg:px-8 py-20 max-w-4xl text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-gold font-bold text-sm mb-2">شاهد الشرح</p>
          <h2 className="text-3xl font-black text-navy mb-10">فيديو تعريفي بمراحل الحصول على الخدمة</h2>

          <div className="relative rounded-3xl overflow-hidden bg-navy aspect-video flex items-center justify-center shadow-xl border border-gray-200 group cursor-pointer">
            {/* Fake video background to match the screenshot */}
            <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern.png')] bg-cover" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-600/30">
                <HiPlay size={36} className="ml-1" />
              </div>
              <span className="text-white font-bold">شاهد الفيديو</span>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white/50 text-xs flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full bg-gold text-navy font-bold flex items-center justify-center">i</span>
                فيديو يوضح خطوات التقديم من البداية حتى استلام الخدمة
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Categories Section ── */}
      <section className="container mx-auto px-4 lg:px-8 pb-20 max-w-6xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <p className="text-gold font-bold text-sm mb-2">اختر الخدمة</p>
          <h2 className="text-3xl font-black text-navy">تصنيفات الخدمات المكانية</h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {categories.map((category, idx) => (
            <motion.div 
              key={category.id}
              custom={idx * 0.1}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
                <div className="flex flex-row items-center justify-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <HiOutlineMap size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-navy">{category.title}</h3>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                  {category.desc}
                </p>
              </div>

              <div className="w-full mt-6">
                <div className="relative text-center mb-8">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -translate-y-1/2" />
                  <h4 className="inline-block text-lg font-bold text-navy bg-white px-4 relative z-10">
                    {category.subTitle}
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, sIdx) => {
                    const serviceName = typeof service === 'string' ? service : service.name;
                    const serviceLink = typeof service === 'object' ? service.link : null;

                    return (
                      <button 
                        key={sIdx}
                        onClick={() => serviceLink && navigate(serviceLink)}
                        className="group flex items-center justify-between bg-gray-50 hover:bg-navy p-4 rounded-2xl transition-colors duration-300 text-right cursor-pointer"
                      >
                        <span className="text-sm font-bold text-navy group-hover:text-white transition-colors">
                          {serviceName}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gold group-hover:bg-white/10 transition-colors shrink-0">
                          <HiArrowLeft size={16} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SpatialServices;
