import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Calendar, MapPin } from 'lucide-react';

const TopBar = () => {
  const { t, i18n } = useTranslation();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(time);

  const formattedTime = time.toLocaleTimeString(i18n.language, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="hidden lg:block w-full bg-navy/95 backdrop-blur-md border-b border-white/5 py-2 z-[60] relative overflow-hidden">
      <div className="container mx-auto px-8 flex justify-between items-center text-white/80 text-xs font-medium tracking-wide">
        {/* Left Side: Live Date & Time */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group transition-colors hover:text-gold">
            <Calendar size={14} className="text-gold" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 group transition-colors hover:text-gold">
            <Clock size={14} className="text-gold" />
            <span className="font-mono tabular-nums">{formattedTime}</span>
          </div>
        </div>

        {/* Right Side: Location & Weather Placeholder */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gold" />
            <span>{t('topbar.location', 'جمهورية مصر العربية - محافظة كفر الشيخ')}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] uppercase font-bold tracking-widest">{t('topbar.status', 'البوابة الرسمية')}</span>
          </div>
        </div>
      </div>
      
      {/* Decorative pulse line */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent w-full"></div>
    </div>
  );
};

export default TopBar;
