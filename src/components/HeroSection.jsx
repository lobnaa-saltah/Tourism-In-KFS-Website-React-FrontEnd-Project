import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="relative z-10">

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen pt-28 pb-36 flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-dark overflow-hidden">

        {/* Background Decorative Islamic Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamicGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M30 15 L45 30 L30 45 L15 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="3" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamicGrid)" />
          </svg>
        </div>

        {/* Atmospheric Glow Flares */}
        <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-navy-light/35 rounded-full blur-[150px] pointer-events-none z-0"></div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

            {/* ── Content Column (60%) ── */}
            <div className="w-full lg:w-7/12 text-center lg:text-start flex flex-col items-center lg:items-start select-none">

              {/* Welcome Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs lg:text-sm font-bold mb-6 backdrop-blur-md"
              >
                <span className="w-2 h-2 bg-gold rounded-full"></span>
                {t('hero.welcome', 'أهلاً بكم في البوابة الرقمية الموحدة')}
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight font-cairo drop-shadow-sm"
              >
                {t('hero.title_part1', 'مستقبل')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark font-black">
                  {t('hero.title_part2', 'كفر الشيخ')}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/80 text-base lg:text-lg leading-relaxed max-w-xl mb-10 font-medium"
              >
                {t('hero.subtitle', 'نحو مجتمع ذكي ومستدام يوفر خدمات حكومية عالمية المستوى بكل سهولة وأمان.')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center lg:justify-start w-full"
              >
                <a
                  href="#services"
                  className="block w-full max-w-[360px] px-8 py-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-navy-dark font-bold rounded-xl transition-all duration-300 hover:brightness-110 cursor-pointer text-center"
                >
                  {t('hero.cta', 'ابدأ الآن')}
                </a>
              </motion.div>

            </div>

            {/* ── Video Column (40%) ── */}
            <div className="w-full lg:w-5/12 flex items-center justify-center relative">

              {/* Offset architectural border – gold (top-left) */}
              <div className="absolute inset-0 rounded-[2rem] border border-gold/30 -translate-x-4 -translate-y-4 -z-10 pointer-events-none"></div>

              {/* Offset architectural border – navy (bottom-right) */}
              <div className="absolute inset-0 rounded-[2rem] border border-navy-light/40 translate-x-4 translate-y-4 -z-10 pointer-events-none"></div>

              {/* Video card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative w-full max-w-[380px] aspect-[4/5] p-[2px] bg-gradient-to-b from-gold via-navy-light/40 to-transparent rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(13,59,76,0.6)] overflow-hidden z-10"
              >
                <div className="w-full h-full rounded-[1.9rem] overflow-hidden bg-navy-dark relative">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/video.mp4" type="video/mp4" />
                  </video>
                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-dark/95 via-navy-dark/40 to-transparent pointer-events-none"></div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto translate-y-[1px]">
            <path
              d="M0,96 L80,85.3 C160,75 320,53 480,53.3 C640,53 800,75 960,85.3 C1120,96 1280,96 1360,96 L1440,96 L1440,120 L1360,120 C1280,120 1120,120 960,120 C800,120 640,120 480,120 C320,120 160,120 80,120 L0,120 Z"
              fill="#f9fafb"
            />
          </svg>
        </div>

      </section>

    </div>
  );
};

export default HeroSection;
