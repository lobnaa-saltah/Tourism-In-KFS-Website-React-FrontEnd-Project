import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const investmentOpportunities = [
  {
    id: 1,
    title: 'المناطق الصناعية',
    excerpt: 'المناطق الصناعية في كفرالشيخ:محافظة كفر الشيخ، الواقعة في شمال دلتا النيل بمصر، تتميز بتواجد عدة منا...',
    img: '/images/tourism/المناطق الصناعيه.jpg', 
    link: '/investments/industrial',
  },
  {
    id: 2,
    title: 'فرص متنوعة',
    excerpt: 'تفتح محافظة كفر الشيخ أبوابها للمستثمرين ورجال الأعمال من خلال مجموعة حصرية ومتنوعة من الفرص الاستثم...',
    img: '/images/tourism/فرص استثماريه متنوعه.jpg',
    link: '/investments/diverse-opportunities',
  }
];

const Investment = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50/60 min-h-screen font-cairo overflow-x-hidden" dir="rtl">
      
      {/* 1. Page Hero Banner */}
      <PageHero
        title="الفرص الاستثمارية في المحافظة"
        subtitle="اكتشف آفاقاً جديدة للنمو والتطور في مختلف قطاعات المحافظة الواعدة."
      />

      {/* 2. Opportunities Grid */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {investmentOpportunities.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-8 flex flex-col flex-1 text-center items-center">
                <h3 className="text-[#d4a32b] font-black text-2xl mb-4">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 text-[15px] leading-relaxed flex-1 mb-8">
                  {item.excerpt}
                </p>
                
                {/* Action Button */}
                <button 
                  onClick={() => navigate(item.link)}
                  className="mt-auto bg-[#d4a32b] text-white hover:bg-[#c29526] font-bold px-8 py-2.5 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm w-4/5"
                >
                  عرض التفاصيل 
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Call to Action Banner (National Investment Map) */}
      <section className="w-full bg-[#172545] relative overflow-hidden mt-12">
         {/* Subtle pattern background */}
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
         
         <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10 py-12 lg:py-16">
            <div className="flex flex-col items-center justify-center text-center gap-6">
               
               {/* Content (Text) */}
               <div className="w-full">
                  <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 leading-snug">
                    هل تبحث عن <span className="text-gold">خريطة أشمل</span> للاستثمار في مصر؟
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
                    يمكنك الآن تصفح المزيد من الفرص التفاعلية والمشروعات القومية عبر بوابة <span className="text-gold font-bold">خريطة مصر الاستثمارية</span> التابعة لوزارة الاستثمار.
                  </p>
               </div>
               
               {/* Action Button */}
               <div className="w-full mt-4">
                  <button className="group relative overflow-hidden border border-gold bg-transparent hover:bg-gold text-gold hover:text-white font-bold px-10 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-sm hover:shadow-[0_5px_25px_rgba(212,163,43,0.3)] text-lg mx-auto">
                    <FaMapMarkedAlt size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
                    <span>استكشف الخريطة التفاعلية</span>
                  </button>
               </div>
               
            </div>
         </div>
      </section>

    </div>
  );
};

export default Investment;
