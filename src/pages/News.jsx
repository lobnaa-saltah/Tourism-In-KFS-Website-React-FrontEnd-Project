import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

export const newsItems = [
  {
    id: 1,
    title: 'استجابة فورية.. محافظ كفرالشيخ: الانتهاء من إصلاح خط الطرد بطريق ترعة القهوجي بمدينة مسير',
    excerpt: 'وجّه المهندس إبراهيم مكي، محافظ كفرالشيخ، بسرعة الانتهاء من أعمال إصلاح وصيانة خط طرد الصرف الصحي بط...',
    date: '27 يونيو, 2026',
    category: 'أخبار المحافظة',
    img: '/brain-images/training_event_1.png',
  },
  {
    id: 2,
    title: 'محافظ كفرالشيخ يتابع أعمال رصف طريق محلة موسى ضمن مشروعات الخطة الاستثمارية',
    excerpt: 'المهندس إبراهيم مكي: تطوير شبكة الطرق يدعم التنمية الشاملة ويُحسن جودة الحياة لأهالينا تابع المهندس إ...',
    date: '28 يونيو, 2026',
    category: 'أخبار المحافظة',
    img: '/brain-images/training_program_ai.png',
  },
  {
    id: 3,
    title: 'محافظ كفرالشيخ يتابع جهود النظافة والتجميل ودهان الأرصفة والبلدورات بعاصمة المحافظة ضمن مبادرة «جميلة يا بلدي»',
    excerpt: 'المهندس إبراهيم مكي: العمل الميداني مستمر للارتقاء بالمظهر الحضاري وتحسين جودة الخدمات المقدمة للموا...',
    date: '28 يونيو, 2026',
    category: 'أخبار المحافظة',
    img: '/brain-images/training_event_2.png',
  },
  {
    id: 4,
    title: 'محافظ كفرالشيخ: تقييم شامل لأداء المراكز والمدن وفق معايير دقيقة لرفع كفاءة الخدمات وتعزيز التنافس',
    excerpt: 'تنفيذًا لتوجيهات المهندس إبراهيم مكي، محافظ كفرالشيخ، عقد الدكتور عمرو البشبيشي، نائب محافظ كفرالشيخ...',
    date: '28 يونيو, 2026',
    category: 'أخبار المحافظة',
    img: '/brain-images/training_event_3.png',
  },
  {
    id: 5,
    title: 'محافظ كفرالشيخ يتابع أعمال رفع كفاءة الطرق بقرى مركز كفرالشيخ ضمن مبادرة «تأهيل الطرق»',
    excerpt: 'المهندس إبراهيم مكي: تطوير شبكة الطرق يسهم في تحسين الخدمات وتيسير حركة المواطنين ودعم جهود التنمية...',
    date: '28 يونيو, 2026',
    category: 'أخبار المحافظة',
    img: '/brain-images/training_program_mechanical.png',
  },
  {
    id: 6,
    title: 'محافظ كفرالشيخ يتابع زراعة الأشجار ببلطيم ضمن المبادرة الرئاسية «100 مليون شجرة» ومبادرة «جميلة يا بلدي»',
    excerpt: 'المهندس إبراهيم مكي: زيادة المسطحات الخضراء تدعم التنمية البيئية وتحسن جودة الحياة للأجيال الحالية و...',
    date: '28 يونيو, 2026',
    category: 'أخبار المحافظة',
    img: '/brain-images/training_event_1.png',
  },
  {
    id: 7,
    title: 'المحافظة عبر مركز سيطرة الشبكة الوطنية للطوارئ والسلامة العامة.. ويوجه بمواصلة جهود التنمية والتواصل المباشر',
    excerpt: 'أجرى المهندس إبراهيم مكي، محافظ كفرالشيخ، اليوم الأحد، متابعة شاملة من داخل مركز سيطرة الشبكة الوطني...',
    date: '28 يونيو, 2026',
    category: 'أخبار المحافظة',
    img: '/brain-images/training_program_ai.png',
  },
  {
    id: 8,
    title: 'محافظ كفرالشيخ يتابع جهود مديرية التموين لضبط الأسواق بمطوبس',
    excerpt: 'تابع المهندس إبراهيم مكي، محافظ كفرالشيخ، جهود مديرية التموين والتجارة الداخلية، التي أسفرت عن ضبط العديد من المخالفات...',
    date: '29 يونيو, 2026',
    category: 'أخبار المحافظة',
    img: '/brain-images/training_event_2.png',
  },
  {
    id: 9,
    title: 'انطلاق مبادرة التشجير بالمحافظة ضمن الخطة القومية للمناخ',
    excerpt: 'بمشاركة واسعة من المتطوعين، تم اليوم تدشين المرحلة الأولى من أعمال التشجير في شوارع المحافظة الرئيسية...',
    date: '30 يونيو, 2026',
    category: 'أخبار المحافظة',
    img: '/brain-images/training_event_3.png',
  }
];

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

const News = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-50/60 min-h-screen font-cairo overflow-x-hidden pb-20" dir="rtl">
      
      {/* 1. Page Hero Banner */}
      {/* We use a dark background or rely on PageHero default */}
      <PageHero
        title="آخر الأخبار والمقالات"
        subtitle="تابع آخر المستجدات والفعاليات والأخبار الرسمية لمحافظة كفر الشيخ"
      />

      {/* 2. Filters Section */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl pt-10 pb-6 flex items-center justify-center">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button className="bg-[#22354e] text-gold px-8 py-2.5 rounded-full font-bold text-sm shadow-md transition-all hover:bg-navy-dark">
            الكل
          </button>
          <button className="bg-white text-navy px-6 py-2.5 rounded-full font-bold text-sm shadow-sm border border-slate-200 transition-all hover:border-gold hover:text-gold flex items-center gap-2">
            أخبار المحافظة
            <span className="bg-slate-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">1412</span>
          </button>
          <button className="bg-white text-navy px-6 py-2.5 rounded-full font-bold text-sm shadow-sm border border-slate-200 transition-all hover:border-gold hover:text-gold flex items-center gap-2">
            إنجازات الدولة
            <span className="bg-slate-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">0</span>
          </button>
        </div>
      </section>

      {/* 3. News Grid */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {newsItems.map((news) => (
            <motion.div
              key={news.id}
              variants={fadeUp}
              onClick={() => navigate(`/news/${news.id}`, { state: { item: news } })}
              className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-1 relative">
                {/* Badge overlapping top */}
                <div className="flex justify-center -mt-10 mb-5 relative z-10">
                  <span className="bg-[#d4a32b] text-white px-5 py-1.5 rounded-full text-[11px] font-bold shadow-md">
                    {news.category}
                  </span>
                </div>

                <h3 className="text-[#22354e] font-black text-[17px] leading-[1.6] text-center mb-4 min-h-[50px]">
                  {highlightText(news.title)}
                </h3>
                
                <p className="text-gray-500 text-[13px] leading-relaxed text-center flex-1 mb-6">
                  {news.excerpt}
                </p>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-start">
                  <span className="text-gray-400 text-[11px] font-medium tracking-wide">
                    {news.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 4. Pagination (Redesigned) */}
        <div className="mt-16 flex flex-col items-center justify-center gap-3 border-t border-slate-200 pt-8">
          
          <div className="flex items-center gap-2">
            {/* Previous Button (Right arrow in RTL) */}
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-gray-400 hover:text-navy hover:border-navy hover:bg-slate-50 transition-all text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <FaChevronRight size={12} />
            </button>
            
            <button className="w-10 h-10 rounded-xl bg-navy text-white font-bold flex items-center justify-center text-sm shadow-md transition-all hover:shadow-lg">
              1
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-navy font-bold hover:bg-slate-50 hover:border-navy transition-all text-sm shadow-sm">
              2
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-navy font-bold hover:bg-slate-50 hover:border-navy transition-all text-sm shadow-sm">
              3
            </button>
            
            <span className="text-gray-400 px-1 font-bold tracking-widest">...</span>
            
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-navy font-bold hover:bg-slate-50 hover:border-navy transition-all text-sm shadow-sm">
              157
            </button>

            {/* Next Button (Left arrow in RTL) */}
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-navy hover:text-gold hover:border-gold hover:bg-slate-50 transition-all text-sm shadow-sm">
              <FaChevronLeft size={12} />
            </button>
          </div>

          <div className="text-gray-400 text-xs md:text-[11px] font-medium tracking-wide">
            عرض 1 إلى 9 من أصل 1412 خبر
          </div>
        </div>

      </section>

    </div>
  );
};

export default News;
