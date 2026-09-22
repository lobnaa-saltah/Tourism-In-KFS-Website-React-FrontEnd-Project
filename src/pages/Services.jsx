import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineMap, 
  HiOutlineMegaphone, 
  HiOutlineBookOpen, 
  HiOutlinePencilSquare,
  HiArrowLeft
} from 'react-icons/hi2';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const servicesList = [
    {
      id: 1,
      title: 'الخدمات المكانية',
      icon: <HiOutlineMap size={36} strokeWidth={1.5} />,
      desc: 'الوصول إلى الخرائط التفاعلية والبيانات الجغرافية والمخططات التفصيلية للمحافظة.',
      link: '/services/spatial',
    },
    {
      id: 2,
      title: 'ترخيص الإعلانات (علي أملاك خاصة)',
      icon: <HiOutlineMegaphone size={36} strokeWidth={1.5} />,
      desc: 'تقديم ومتابعة طلبات ترخيص الإعلانات واللوحات الإرشادية على الأملاك الخاصة.',
      link: '/services/private-property-ads',
    },
    {
      id: 3,
      title: 'استدامة للتدريب والتطوير',
      icon: <HiOutlineBookOpen size={36} strokeWidth={1.5} />,
      desc: 'البرامج التدريبية المخصصة لتطوير مهارات الكوادر البشرية وبناء القدرات المحلية.',
      link: '/services/training',
    },
    {
      id: 4,
      title: 'طلب تعديل مخطط تفصيلي',
      icon: <HiOutlinePencilSquare size={36} strokeWidth={1.5} />,
      desc: 'تقديم مقترحات تعديل خطوط التنظيم والمخططات التفصيلية للمناطق العمرانية.',
      link: '/services/detailed-plan-modification',
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-cairo overflow-x-hidden pb-20">
      
      <PageHero title={t('services.page_title', 'جميع الخدمات')} subtitle={t('services.page_subtitle', 'مجموعة شاملة من الخدمات الموجهة لدعم مواطني المحافظة.')} />

      {/* ── Services Grid ── */}
      <section className="container mx-auto px-4 lg:px-8 py-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesList.map((service, i) => (
            <motion.div
              key={service.id}
              onClick={() => service.link ? navigate(service.link) : null}
              custom={i * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative bg-white hover:bg-navy rounded-3xl p-8 border border-navy/20 hover:border-navy hover:shadow-[0_20px_40px_-15px_rgba(17,67,87,0.3)] hover:-translate-y-1 overflow-hidden transition-all duration-500 cursor-pointer"
            >
              {/* Decorative gradient flare */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/0 rounded-full blur-3xl group-hover:bg-gold/15 transition-all duration-700 pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                {/* Icon Container */}
                <div
                  className="w-16 h-16 shrink-0 rounded-2xl bg-gray-50 group-hover:bg-white/10 flex items-center justify-center text-navy group-hover:text-gold transition-all duration-500 shadow-sm"
                >
                  {service.icon}
                </div>

                {/* Content */}
                <div className="flex-1 text-right">
                  <h3 className="text-xl font-black text-navy group-hover:text-white transition-colors duration-500 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-gray-500 group-hover:text-white/70 transition-colors duration-500 line-clamp-3 mb-6">
                    {service.desc}
                  </p>
                  
                  {/* Link Style Button */}
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-navy group-hover:text-gold transition-colors duration-500">
                    <span>ابدأ الخدمة</span>
                    <HiArrowLeft className="group-hover:-translate-x-1.5 transition-transform duration-300" size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Services;
