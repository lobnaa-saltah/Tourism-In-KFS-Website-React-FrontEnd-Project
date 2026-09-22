import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';

const GovernorMessage = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="pt-32 pb-24 bg-singing overflow-hidden relative" id="governor-message">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: i18n.dir() === 'rtl' ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-navy/20 border-8 border-white">
              <img 
                src="/images/alaa_abdelmoaty.png" 
                alt="Governor Alaa Abdel Moaty"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-royal/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
          </motion.div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-xs lg:text-sm font-bold mb-8 border border-gold/15 backdrop-blur-md shadow-sm">
                <Quote size={16} className="text-gold" />
                <span>{t('governor.label', 'كلمة السيد المحافظ')}</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-black text-navy mb-2 font-cairo">
                {t('governor.name', 'اللواء د. علاء عبدالمعطي')}
              </h2>
              <p className="text-gray-500 font-bold text-lg mb-8 tracking-wide">
                {t('governor.title', 'محافظ كفر الشيخ')}
              </p>

              <div className="space-y-6 text-gray-500 text-lg leading-relaxed mb-10">
                <p>
                  {t('governor.p1', 'إن رؤيتنا لمحافظة كفر الشيخ تنطلق من إيماننا العميق بقدرات هذا الشعب العظيم، ونسعى جاهدين لتحويل المحافظة إلى مركز اقتصادي وتقني رائد في قلب الدلتا.')}
                </p>
                <p>
                  {t('governor.p2', 'نحن نضع المواطن في قلب كل قرار نتخذه، من خلال تطوير البنية التحتية، وتعزيز الخدمات الرقمية، وخلق فرص عمل جديدة للشباب، مع الحفاظ على هويتنا التاريخية وجمالنا الطبيعي.')}
                </p>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernorMessage;
