import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Map, Building2, Landmark } from 'lucide-react';

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    { id: 1, label: t('stats.area', 'المساحة الكلية (كم²)'), value: '3,683', icon: <Map size={20} /> },
    { id: 2, label: t('stats.population', 'التعداد السكاني للمحافظة'), value: '3,818,712', icon: <Users size={20} /> },
    { id: 3, label: t('stats.cities', 'عدد المراكز والمدن'), value: '14', icon: <Building2 size={20} /> },
    { id: 4, label: t('stats.investments', 'فرص الاستثمار المتاحة'), value: '250', icon: <Landmark size={20} /> },
  ];

  return (
    <section className="py-16 lg:py-24 bg-navy relative overflow-hidden border-t border-white/5">
      
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold font-bold tracking-wide text-sm lg:text-base mb-3 block">
            المحافظة في أرقام
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white font-cairo mb-4 leading-tight">
            إحصائيات كفر الشيخ
          </h2>
          <p className="text-white/60 text-sm lg:text-base font-medium max-w-2xl mx-auto">
            حقائق ومعطيات رقمية تعكس المساحة الجغرافية والتعداد السكاني وفرص الاستثمار للمحافظة.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">

          {/* Right Side Nodes (RTL Context) */}
          <div className="flex flex-col gap-4 lg:gap-10 w-full lg:w-1/3">
            {stats.slice(0, 2).map((stat, i) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="flex items-center justify-end w-full group"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 lg:p-5 hover:bg-white/10 transition-all flex items-center gap-4 w-full max-w-[280px] shadow-xl relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-gold shrink-0 border border-white/5 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy transition-all duration-300 shadow-inner">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-xl lg:text-2xl font-bold text-white whitespace-nowrap">{stat.value}</span>
                      <span className="text-gold font-bold mb-1">+</span>
                    </div>
                    <p className="text-white/60 text-[10px] lg:text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
                {/* Connecting Line to Center */}
                <div className="hidden lg:block w-6 lg:w-12 h-px bg-white/20 group-hover:bg-gold transition-colors"></div>
              </motion.div>
            ))}
          </div>

          {/* Center Hub */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 flex justify-center py-8 lg:py-0 relative z-20"
          >
            <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-full bg-white shadow-[0_0_60px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center text-center p-6 border-[8px] border-gold/10 group hover:border-gold/30 transition-all duration-700 z-10">
              {/* Animated Decorative Rings */}
              <div className="absolute -inset-4 border-2 border-dashed border-white/20 rounded-full animate-[spin_30s_linear_infinite] pointer-events-none hidden lg:block -z-10"></div>
              <div className="absolute -inset-8 border border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse] pointer-events-none hidden lg:block -z-10"></div>
              
              <h2 className="text-2xl lg:text-3xl font-black text-navy leading-tight">
                محافظة <br/>
                <span className="text-gold mt-1 block">كفر الشيخ</span>
              </h2>
              <p className="text-gray-500 font-bold mt-3 text-xs bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                أرقام وحقائق
              </p>
            </div>
          </motion.div>

          {/* Left Side Nodes */}
          <div className="flex flex-col gap-4 lg:gap-10 w-full lg:w-1/3">
            {stats.slice(2, 4).map((stat, i) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="flex items-center justify-start w-full group"
              >
                {/* Connecting Line to Center */}
                <div className="hidden lg:block w-6 lg:w-12 h-px bg-white/20 group-hover:bg-gold transition-colors"></div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 lg:p-5 hover:bg-white/10 transition-all flex items-center gap-4 w-full max-w-[280px] shadow-xl relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-gold shrink-0 border border-white/5 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy transition-all duration-300 shadow-inner">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-xl lg:text-2xl font-bold text-white whitespace-nowrap">{stat.value}</span>
                      <span className="text-gold font-bold mb-1">+</span>
                    </div>
                    <p className="text-white/60 text-[10px] lg:text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;
