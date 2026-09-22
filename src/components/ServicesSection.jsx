import { motion } from 'framer-motion';
import { Car, Zap, Building2, MessageCircleWarning, TrendingUp, Fingerprint, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  { id: 1, title: 'الخدمات المرورية', desc: 'تجديد رخص القيادة والسيارات إلكترونياً بكل سهولة وأمان.', icon: Car, color: 'text-blue-500', bg: 'bg-blue-50', link: '/services/traffic' },
  { id: 2, title: 'التموين والكهرباء', desc: 'إدارة بطاقات التموين ودفع فواتير الكهرباء.', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', link: '/services/supply-electricity' },
  { id: 3, title: 'التوثيق العقاري', desc: 'خدمات الشهر العقاري والتوثيق الرقمي.', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-50', link: '/services/real-estate' },
  { id: 4, title: 'الشكاوى الحكومية', desc: 'منظومة الشكاوى الحكومية الموحدة.', icon: MessageCircleWarning, color: 'text-rose-500', bg: 'bg-rose-50', link: '/services/complaints' },
  { id: 5, title: 'خدمات الاستثمار', desc: 'تسهيلات للمستثمرين ورجال الأعمال.', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-50', link: '/services/investment-services' },
  { id: 6, title: 'التحول الرقمي', desc: 'بوابة مصر الرقمية والخدمات الذكية.', icon: Fingerprint, color: 'text-sky-500', bg: 'bg-sky-50', link: '/services/digital-transformation' },
];

const ServicesSection = () => {
  const navigate = useNavigate();
  return (
    <section id="services" className="section-padding bg-gray-50 border-y border-gray-100/60 overflow-hidden relative">
      {/* Subtle background element to make it sing */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-royal/5 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold font-bold tracking-wide text-sm lg:text-base mb-3 block"
          >
            الخدمات الذكية
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-black text-navy mb-4 font-cairo leading-tight"
          >
            بوابة الخدمات الحكومية
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gray-500 text-sm lg:text-base font-medium max-w-2xl mx-auto leading-relaxed"
          >
            خدمات رقمية متكاملة لتيسير معاملاتكم بكل أمان وشفافية.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                onClick={() => navigate(service.link)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative bg-white rounded-[2rem] p-5 flex flex-col justify-between h-[210px] border border-slate-100 hover:border-gold/30 shadow-sm hover:shadow-xl hover:shadow-navy/5 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Golden hover accent bar sliding from right */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold to-gold-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
                
                {/* Glowing light background blob in each card */}
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-slate-50 rounded-full blur-2xl group-hover:bg-gold/5 transition-colors duration-500 pointer-events-none"></div>

                {/* Top Row: Icon & Arrow Indicator */}
                <div className="flex justify-between items-center relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center text-navy shadow-inner group-hover:scale-110 group-hover:bg-gold group-hover:text-navy transition-all duration-500`}>
                    <Icon size={22} className={`${service.color} group-hover:text-navy transition-colors duration-500`} />
                  </div>
                  
                  {/* Premium circular arrow badge */}
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100/50 flex items-center justify-center text-slate-300 group-hover:bg-gold group-hover:text-navy group-hover:border-gold/20 transition-all duration-500">
                    <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Body Row: Title & Desc */}
                <div className="flex-1 flex flex-col justify-center mt-3 relative z-10">
                  <h3 className="text-lg font-black text-navy mb-1 group-hover:text-gold transition-colors duration-300 font-cairo">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-medium line-clamp-2">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Row: CTA Label */}
                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-300 group-hover:text-gold transition-colors duration-500 mt-2 relative z-10">
                  <span>ابدأ الخدمة الرقمية</span>
                  <span className="text-[9px] transform group-hover:-translate-x-1 transition-transform duration-500">←</span>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
