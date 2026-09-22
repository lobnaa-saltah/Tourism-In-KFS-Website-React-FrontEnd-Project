import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const IntroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-32 pb-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-navy/20 border-8 border-white">
              <img 
                src="/images/ibrahim_mekki.png" 
                alt="Eng. Ibrahim Mekki"
                className="w-full h-auto block"
              />
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-navy/5 rounded-full blur-3xl"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-7/12 text-right"
          >
            <span className="text-gold font-bold tracking-wide text-sm lg:text-base mb-4 block">
              {t('hero.welcome', 'أهلاً بكم في البوابة الرقمية الموحدة')}
            </span>
            
            <h2 className="text-4xl lg:text-5xl font-black text-navy mb-8 font-cairo leading-tight">
              {t('hero.title_part1', 'مستقبل')} {t('hero.title_part2', 'كفر الشيخ')}
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              {t('hero.subtitle', 'نحو مجتمع ذكي ومستدام يوفر خدمات حكومية عالمية المستوى بكل سهولة وأمان.')}
            </p>

            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-white font-black rounded-2xl hover:bg-gold transition-all duration-300 shadow-lg shadow-navy/20 text-base group"
            >
              {t('governor.cta', 'اكتشف المحافظة')}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-1 rotate-180"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
