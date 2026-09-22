import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FloatingClock = () => {
  const { i18n } = useTranslation();
  const [time, setTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const footer = document.querySelector('footer');
      const footerRect = footer ? footer.getBoundingClientRect() : null;
      const viewportHeight = window.innerHeight;

      // Show clock from the very first section (scrollY >= 0) and hide before footer is visible
      const beforeFooter = footerRect ? footerRect.top > viewportHeight : true;

      setIsVisible(beforeFooter);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const formattedGregorian = new Intl.DateTimeFormat(i18n.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(time);

  const formattedHijri = new Intl.DateTimeFormat(i18n.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    calendar: 'islamic-umalqura'
  }).format(time);

  const formattedDay = new Intl.DateTimeFormat(i18n.language, {
    weekday: 'long'
  }).format(time);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const timeString = time.toLocaleTimeString(i18n.language, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  const timeParts = timeString.split(' ');
  const displayTime = timeParts[0];
  const displayPeriod = timeParts[1] || '';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.7, x: -30 }}
          className="fixed z-50 transition-all duration-300 ease-out hidden sm:block"
          style={{
            bottom: '24px',
            left: '24px',
          }}
        >
          <div
            onClick={handleScrollToTop}
            className="relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 cursor-pointer select-none"
          >
            {/* Central Time Circle */}
            <div className="absolute w-16 h-16 md:w-18 md:h-18 bg-navy border-2 md:border-3 border-gold/70 rounded-full flex flex-col items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-20 overflow-hidden">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[10px] md:text-xs font-black tracking-tight tabular-nums text-white">
                  {displayTime}
                </span>
                {displayPeriod && (
                  <span className="text-gold font-bold text-[8px] md:text-[9px] uppercase -mt-0.5">
                    {displayPeriod}
                  </span>
                )}
              </div>
            </div>

            {/* Rotating Date Ring */}
            <div className="absolute inset-0 animate-spin-slow z-10 pointer-events-none">
              <svg viewBox="0 0 144 144" className="w-full h-full overflow-visible">
                <defs>
                  {/* Perfect medium radius to fit the medium size and readable text */}
                  <path id="topPath" d="M 72,25 a 47,47 0 1,1 0,94 a 47,47 0 1,1 0,-94" fill="none" />
                  <path id="bottomPath" d="M 72,119 a 47,47 0 1,1 0,-94 a 47,47 0 1,1 0,94" fill="none" />
                </defs>
                <text fill="#ffcc33" fontSize="9" fontWeight="900" letterSpacing="0.3px" textAnchor="middle" className="font-sans select-none">
                  <textPath href="#topPath" startOffset="50%">
                    {formattedDay} • {formattedGregorian} م
                  </textPath>
                </text>
                <text fill="#ffcc33" fontSize="9" fontWeight="900" letterSpacing="0.3px" textAnchor="middle" className="font-sans select-none">
                  <textPath href="#bottomPath" startOffset="50%">
                    {formattedHijri}
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingClock;

// Styles block
const styles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .animate-spin-slow { animation: spin-slow 24s linear infinite; }
`;

// Dynamically inject styles on load
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}
