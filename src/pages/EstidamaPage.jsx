import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaEye,
  FaFileAlt,
  FaHeart,
  FaUsers,
  FaLightbulb,
  FaGraduationCap,
  FaBookOpen,
  FaVideo,
  FaStar,
  FaChevronLeft,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Data Definition ─────────────────────────────────────────────────────────

const features = [
  {
    icon: FaUsers,
    title: 'طاقة استيعابية',
    desc: '165 متدرباً في آن واحد داخل قاعات التدريب المجهزة بأعلى التقنيات.',
  },
  {
    icon: FaLightbulb,
    title: 'شاشات تفاعلية ذكية',
    desc: 'قاعات مزودة بالشاشات التفاعلية الذكية لتجربة تدريبية تفاعلية حديثة.',
  },
  {
    icon: FaGraduationCap,
    title: 'معمل التكنولوجيا',
    desc: 'طاقة 28 متدرباً مجهز بأحدث الأجهزة للبرامج التدريبية الرقمية والتقنية.',
  },
  {
    icon: FaBookOpen,
    title: 'مكتبة رقمية',
    desc: 'أرشفة إلكترونية وقاعة اجتماعات افتراضية متطورة بالأنظمة الافتراضية الحديثة.',
  },
  {
    icon: FaVideo,
    title: 'تدريب عن بُعد',
    desc: 'تسجيل التفاعلات باستخدام أنظمة البث والتسجيل المباشر لتقديم التدريب التفاعلي عن بعد.',
  },
  {
    icon: FaStar,
    title: 'إدارة رقمية كاملة',
    desc: 'إدارة كافة العمليات من التسجيل والإشراف حتى الاختبارات وإصدار التقارير إلكترونياً.',
  },
];

const featuredPrograms = [
  {
    id: 1,
    title: 'إدارة وتشغيل ومراقبة الحملات الميكانيكية بالمحليات',
    desc: 'هو برنامج تدريبي يقدمه "مركز استدامة للتدريب والتطوير"، يستهدف المديرين والعاملين بالحملات الميكانيكية.',
    date: 'من 13 إلى 16 يوليو 2026',
    img: '/brain-images/training_program_mechanical.png',
  },
  {
    id: 2,
    title: 'الذكاء الاصطناعي وتطوير العمل الحكومي',
    desc: 'هو برنامج تدريبي متخصص يقدمه "مركز استدامة للتدريب والتطوير"، يستهدف المديرين والعاملين بالمحافظة.',
    date: 'من 13 إلى 16 يوليو 2026',
    img: '/brain-images/training_program_ai.png',
  },
  {
    id: 3,
    title: 'إدارة الاجتماعات الاحترافية',
    desc: 'هو برنامج تدريبي متخصص يقدمه "مركز استدامة للتدريب والتطوير"، موجه للمديرين والعاملين.',
    date: 'من 13 إلى 16 يوليو 2026',
    img: '/brain-images/training_event_1.png',
  },
];

const newsEvents = [
  {
    id: 1,
    title: 'إطلاق فعاليات برنامج إعداد مدربين معتمدين في الذكاء الاصطناعي',
    img: '/brain-images/training_event_1.png',
  },
  {
    id: 2,
    title: 'لجنة إدارة الجائزة تراجع وتفرز ملفات الترشح المستلمة بمركز الأرشيف',
    img: '/brain-images/training_event_2.png',
  },
  {
    id: 3,
    title: 'تكريم 325 من الحاصلين على دورات التحول الرقمي ورسائل الإدارة',
    img: '/brain-images/training_event_3.png',
  },
  {
    id: 4,
    title: 'ورشة عمل حول القيادة الفعالة وإدارة الأزمات في المؤسسات الحكومية',
    img: '/brain-images/training_program_ai.png',
  },
];

const EstidamaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50/60 min-h-screen font-cairo overflow-x-hidden pb-20" dir="rtl">
      <style>{`
        .swiper-pagination-bullet { background-color: #0f172a !important; opacity: 0.3; }
        .swiper-pagination-bullet-active { background-color: #d4a32b !important; opacity: 1; }
        .swiper-pagination { bottom: 0px !important; }
      `}</style>

      {/* 1. Page Hero Banner */}
      <PageHero
        title="استدامة للتدريب والتطوير"
        subtitle="مركز رائد في بناء القدرات البشرية وتطوير الكوادر الحكومية بمحافظة كفر الشيخ، يعتمد على أحدث التقنيات الرقمية"
        stats={[
          { value: '420', label: 'برنامج تدريبي' },
          { value: '9912', label: 'متدرب' },
          { value: '165', label: 'الطاقة الاستيعابية' },
        ]}
      />

      {/* 2. Section: About Center (نبذة ورؤية ورسالة وقيم) */}
      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Right Poster/Logo Image Only Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-4 flex"
          >
            <div className="relative w-full h-full min-h-[340px] flex items-center justify-center">
              <img
                src="/brain-images/estidama_logo.png"
                alt="شعار مركز استدامة"
                className="w-full h-full object-cover rounded-3xl shadow-lg border border-slate-200"
              />
            </div>
          </motion.div>

          {/* Left Details & Vision/Mission Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-8 flex flex-col justify-between space-y-4"
          >
            <div>
              <h2 className="text-2xl lg:text-3xl font-black text-navy mb-2 leading-snug">
                مركز استدامة <span className="text-gold">للتدريب والتطوير</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                مركز رائد في بناء القدرات البشرية وتطوير الكوادر الحكومية بمحافظة كفر الشيخ، يعتمد على أحدث التقنيات الرقمية لرفع كفاءة الجهاز الإداري وتحقيق رؤية مصر 2030.
              </p>
            </div>

            <div className="space-y-3 pt-1 flex-1 flex flex-col justify-between">
              {/* Card 1: الرؤية */}
              <div className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-gold/50 transition-all flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-navy text-white group-hover:bg-gold transition-colors duration-300 flex items-center justify-center shrink-0 shadow-sm">
                  <FaEye size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-base mb-0.5 group-hover:text-gold-dark transition-colors">الرؤية</h4>
                  <p className="text-gray-500 text-xs md:text-sm">
                    الريادة في تطوير العنصر البشري والرقمنة وإقليم الدلتا.
                  </p>
                </div>
              </div>

              {/* Card 2: الرسالة */}
              <div className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-gold/50 transition-all flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-navy text-white group-hover:bg-gold transition-colors duration-300 flex items-center justify-center shrink-0 shadow-sm">
                  <FaFileAlt size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-base mb-0.5 group-hover:text-gold-dark transition-colors">الرسالة</h4>
                  <p className="text-gray-500 text-xs md:text-sm">
                    تدريب تفاعلي عالي الجودة لتحسين أداء رأس المال البشري.
                  </p>
                </div>
              </div>

              {/* Card 3: القيم */}
              <div className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-gold/50 transition-all flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-navy text-white group-hover:bg-gold transition-colors duration-300 flex items-center justify-center shrink-0 shadow-sm">
                  <FaHeart size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-base mb-0.5 group-hover:text-gold-dark transition-colors">القيم</h4>
                  <p className="text-gray-500 text-xs md:text-sm">
                    الشفافية • التكامل • الفاعلية • الإبداع • القيادة • التميز.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Section: Feature Cards Grid (إمكانيات ومميزات المركز) */}
      <section className="py-14 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl lg:text-3xl font-black text-navy">
              إمكانيات ومميزات المركز
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/70 hover:border-gold/40 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy group-hover:bg-gold group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-sm">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy text-base mb-1.5 group-hover:text-gold-dark transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Section: Video Section (الفيديو التعريفي بمركز استدامة) */}
      <section className="py-16 container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-8"
        >
          <h2 className="text-2xl lg:text-3xl font-black text-navy">
            الفيديو التعريفي بمركز استدامة
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-navy rounded-3xl overflow-hidden shadow-2xl border border-navy-light/20 relative"
        >
          <div className="relative aspect-video w-full">
            <video
              src="/videos/videoEstidama.mp4"
              controls
              poster="/brain-images/training_event_1.png"
              className="w-full h-full object-cover"
            >
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>
        </motion.div>
      </section>

      {/* 5. Section: Featured Programs (أحدث البرامج التدريبية) */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-black text-navy mb-2">
              أحدث البرامج التدريبية
            </h2>
            <p className="text-gray-500 text-xs md:text-sm max-w-md mx-auto">
              اختر برنامجك التدريبي المفضل وسجّل الآن
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10"
          >
            {featuredPrograms.map((prog) => (
              <motion.div
                key={prog.id}
                variants={fadeUp}
                className="group bg-slate-50/60 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={prog.img}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1 text-right">
                  <h3 className="text-navy font-black text-base mb-2 leading-snug line-clamp-2">
                    {prog.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">
                    {prog.desc}
                  </p>
                  <p className="text-gold font-bold text-[11px] mb-4">
                    الفترة من: <span className="text-navy">{prog.date}</span>
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-navy hover:bg-[#d4a32b] text-white font-black py-3 rounded-xl text-xs md:text-sm transition-all duration-300 shadow-md"
                  >
                    التسجيل في البرنامج
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Button: عرض كل البرامج */}
          <div className="text-center">
            <button
              onClick={() => navigate('/training-programs')}
              className="inline-flex items-center gap-2 px-12 py-3.5 rounded-xl bg-navy hover:bg-[#d4a32b] text-white font-black text-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>عرض كل البرامج</span>
              <FaChevronLeft size={12} />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Section: Latest Events Slider (أهم الأحداث بمركز استدامة) */}
      <section className="py-16 border-t border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-black text-navy mb-2">
              أهم الأحداث بمركز استدامة
            </h2>
            <p className="text-gray-500 text-xs md:text-sm max-w-2xl mx-auto font-medium">
              مركز استدامة.. شريكك الاستراتيجي في رحلة التحول الرقمي وتطوير رأس المال البشري في إقليم الدلتا.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="!pb-14"
            >
              {newsEvents.map((evt) => (
                <SwiperSlide key={evt.id}>
                  <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-56 overflow-hidden bg-slate-200">
                      <img
                        src={evt.img}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-90" />
                      <p className="absolute bottom-4 inset-x-4 text-white font-bold text-sm leading-snug line-clamp-2 z-10">
                        {evt.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default EstidamaPage;