import HeroSection from '../components/HeroSection';
import KeyEvents from '../components/KeyEvents';
import ServicesSection from '../components/ServicesSection';
import NewsSection from '../components/NewsSection';
import StatsSection from '../components/StatsSection';
import NationalProjects from '../components/NationalProjects';
import TourismSection from '../components/TourismSection';
import InvestmentSection from '../components/InvestmentSection';
import NewsletterSection from '../components/NewsletterSection';
import ImportantLinks from '../components/ImportantLinks';
import GovernorateDirectory from '../components/GovernorateDirectory';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white"
    >
      <HeroSection />
      <KeyEvents />
      <NewsSection />
      <ServicesSection />
      <TourismSection />
      <NationalProjects />

      <section className="py-12 lg:py-16 bg-singing relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none -ml-40 -mt-40"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-royal/5 rounded-full blur-[100px] pointer-events-none -mr-40 -mb-40"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content (Right side in RTL) */}
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-gold/10 text-gold text-sm font-bold mb-6 shadow-sm">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                خارطة التنمية
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-navy mb-6 font-cairo leading-tight">
                مشروعات الخطة الاستثمارية <br /> لمحافظة كفر الشيخ
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mb-10">
                اطلع على الخطة الاستثمارية السنوية للمحافظة، والتقارير الموثقة للعام الحالي والأعوام السابقة. نحن نرسم ملامح المستقبل من خلال رؤية وطنية تهدف إلى تحسين البنية التحتية والخدمات وتوطين التنمية المستدامة في كافة المراكز.
              </p>
              <button 
                onClick={() => navigate('/investment-plan')}
                className="px-8 py-4 bg-navy hover:bg-navy-light text-white font-bold rounded-2xl transition-all shadow-xl hover:-translate-y-1 inline-block"
              >
                استكشاف الخطة الكاملة
              </button>
            </div>
            
            {/* Images Collage (Left side in RTL) */}
            <div className="w-full lg:w-1/2 relative min-h-[380px] lg:min-h-[450px] flex items-center justify-center">
              
              {/* Main large image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute top-4 lg:top-8 right-4 lg:right-8 w-[60%] h-[60%] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white z-10"
              >
                <img src="/images/projects/investment-plan.jpg" alt="Investment Plan" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-navy/10 mix-blend-multiply"></div>
              </motion.div>
              
              {/* Overlapping secondary image */}
              <motion.div 
                initial={{ opacity: 0, x: -30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 w-[50%] h-[50%] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white z-20"
              >
                <img src="/images/projects/hayahkarima.jpg" alt="Development Projects" className="w-full h-full object-cover" />
              </motion.div>
              
              {/* Floating Vision 2030 Logo */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:-translate-x-[60%] lg:-translate-y-2/3 bg-white rounded-3xl p-3 lg:p-4 shadow-2xl border border-gray-100 z-30"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                <img src="/images/vision/egypt-vision.png" alt="Egypt Vision 2030" className="w-24 lg:w-32 object-contain" />
              </motion.div>

              <style>{`
                @keyframes float {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-15px); }
                  100% { transform: translateY(0px); }
                }
              `}</style>
              
            </div>

          </div>
        </div>
      </section>

      <InvestmentSection />
      
      <ImportantLinks />
      
      <StatsSection />

      <NewsletterSection />
      
      <GovernorateDirectory />

    </motion.div>

  );
};


export default Home;

