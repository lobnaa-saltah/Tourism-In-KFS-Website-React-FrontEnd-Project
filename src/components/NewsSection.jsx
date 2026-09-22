import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const highlightText = (text) => {
  if (!text) return text;
  const regex = /["«'](.*?)["»']/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <span key={index} className="text-gold">{part}</span>;
    }
    return part;
  });
};

const NewsSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const news = [
    {
      id: 1,
      title: t('news.item1.title', 'محافظ كفرالشيخ الجديد يصل الديوان العام ويباشر مهام منصبه.....'),
      image: '/images/governor_new.jpg',
      category: t('news.category.gov', 'أخبار المحافظة'),
      date: t('news.item1.date', 'منذ شهرين'),
      size: 'large'
    },
    {
      id: 2,
      title: t('news.item2.title', 'محافظ كفرالشيخ يتابع فعاليات مبادرة "جميلة يا كفر الشيخ"'),
      image: '/images/projects/news2.jpg',
      category: t('news.category.gov', 'أخبار المحافظة'),
      date: t('news.item2.date', 'منذ يومين'),
      size: 'small'
    },
    {
      id: 3,
      title: t('news.item3.title', 'محافظ كفرالشيخ: ضبط 361 كجم مواد غذائية مجهولة المصدر'),
      image: '/images/projects/news3.jpg',
      category: t('news.category.gov', 'أخبار المحافظة'),
      date: t('news.item3.date', 'منذ يومين'),
      size: 'small'
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative" id="news">
      {/* Subtle background element to make it sing */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royal/5 rounded-full blur-[100px] pointer-events-none -ml-40 -mb-40"></div>
      
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        {/* Centered Section Header */}
        <div className="mb-16">
          <span className="text-gold font-bold tracking-wide text-sm lg:text-base mb-3 block">
            المركز الإعلامي
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-navy font-cairo mb-4 leading-tight">
            {t('news.title', 'آخر الأخبار')}
          </h2>
          <p className="text-gray-500 text-base lg:text-lg font-medium max-w-2xl mx-auto">
            {t('news.subtitle', 'تحديثات يومية تسلط الضوء على آخر أخبار وأنشطة المحافظة.')}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => navigate(`/news/${item.id}`, { state: { item } })}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer aspect-square"
            >
              <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 lg:p-10 text-right">
                <div className="flex flex-col gap-2 mb-4">
                  <div>
                    <span className="px-4 py-1 bg-gold text-white text-[10px] font-black rounded-full shadow-lg">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold">
                    <Clock size={12} className="text-gold" />
                    <span>{item.date}</span>
                  </div>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight group-hover:text-gold transition-colors duration-300">
                  {highlightText(item.title)}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Perfectly Matched to KeyEvents */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => navigate('/news')}
            className="px-10 py-4 bg-navy hover:bg-navy/90 text-white font-bold rounded-2xl transition-all shadow-xl shadow-navy/10 flex items-center gap-3 group"
          >
            <span>{t('news.view_all', 'عرض كل الأخبار')}</span>
            <ArrowLeft className={`transition-transform duration-300 ${i18n.dir() === 'rtl' ? 'group-hover:-translate-x-2' : 'rotate-180 group-hover:translate-x-2'}`} size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
