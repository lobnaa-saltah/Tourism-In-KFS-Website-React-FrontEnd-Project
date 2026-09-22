import { useTranslation } from 'react-i18next';
import { FaIndustry, FaCity, FaArrowRight, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const InvestmentSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const investmentPillars = [
    {
      id: 1,
      title: 'المناطق الصناعية',
      desc: 'مناطق صناعية متكاملة ومجهزة بأحدث البنية التحتية لتوطين الصناعات المختلفة وتوفير بيئة عمل مثالية.',
      image: '/images/tourism/المناطق الصناعيه.jpg',
      icon: <FaIndustry size={28} />,
      link: '/investments/industrial',
    },
    {
      id: 2,
      title: 'فرص استثمارية متنوعة',
      desc: 'مجالات متعددة تشمل الزراعة، السياحة، التكنولوجيا، والطاقة المتجددة لتناسب كافة التطلعات الاستثمارية.',
      image: '/images/tourism/فرص استثماريه متنوعه.jpg',
      icon: <FaChartLine size={28} />,
      link: '/investments/diverse-opportunities',
    }
  ];

  return (
    <section id="investments" className="py-24 bg-gray-50 border-b border-gray-100/60 overflow-hidden relative">
      {/* Subtle background element to make it sing */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 gap-6">
          <div>
            <span className="text-gold font-bold tracking-wide text-sm lg:text-base mb-3 block">
              مستقبل مشرق
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-navy font-cairo leading-tight">
              استثمر في كفر الشيخ
            </h2>
            <p className="text-gray-500 text-lg mt-4 leading-relaxed">
              وجهتك الأولى للاستثمار الآمن والمربح بفضل الموقع الاستراتيجي، الموارد الغنية، والدعم الحكومي المتواصل المخصص لنجاحك.
            </p>
          </div>
        </div>

        {/* Elegant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {investmentPillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => navigate(pillar.link)}
              className="group bg-gray-50 border border-gray-100 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:border-gold/30 transition-all duration-500 flex flex-col items-center text-center"
            >
              {/* Full Width Rectangular Image */}
              <div className="w-full h-56 relative group-hover:shadow-md transition-shadow duration-500 overflow-hidden">
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-colors"></div>
                
                {/* White shine ray on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <div className="absolute -top-[100%] -left-[100%] w-12 h-[400%] bg-white/40 rotate-[35deg] blur-[4px] group-hover:translate-x-[1500px] transition-transform duration-[1200ms] ease-in-out" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-black text-navy mb-4 group-hover:text-gold transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {pillar.desc}
                </p>
                <div className="flex justify-center items-center gap-2 text-navy font-bold text-sm group-hover:text-gold transition-colors">
                  <span>اكتشف التفاصيل</span>
                  <FaArrowRight size={14} className={`transform transition-transform ${i18n.dir() === 'rtl' ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => navigate('/investments')}
            className="px-10 py-4 bg-navy text-white font-bold rounded-2xl hover:bg-gold hover:text-white transition-all flex items-center gap-3 shadow-xl group border border-navy/5"
          >
            دليل المستثمر
            <FaArrowRight size={18} className={`transition-transform ${i18n.dir() === 'rtl' ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default InvestmentSection;
