import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUserEdit, FaEnvelope, FaWhatsapp, FaTwitter, FaFacebookF, FaShareAlt, FaPaperPlane, FaRegCalendarAlt, FaRegUser } from 'react-icons/fa';
import PageHero from '../components/PageHero/PageHero';
import { newsItems } from './News';

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

// Dummy events data (Should ideally come from a central store/API)
const eventsData = [
  {
    id: 1,
    title: 'سلسلة احمي نفسك: استخدام الذكاء الاصطناعي بحذر',
    image: '/images/projects/ai-safety.jpg',
    date: '13 ديسمبر, 2025',
    author: 'فريق التحرير',
    content: `
      <p>في إطار سعي المحافظة لنشر الوعي التكنولوجي بين الشباب، أطلقت المحافظة مبادرة "احمي نفسك" والتي تهدف إلى التوعية بمخاطر وكيفية الاستخدام الآمن للذكاء الاصطناعي.</p>
      <p>تضمنت المبادرة سلسلة من ورش العمل التفاعلية التي شارك فيها خبراء في أمن المعلومات، حيث تم استعراض أبرز التطبيقات العملية للذكاء الاصطناعي وكيفية حماية البيانات الشخصية من الاختراقات المحتملة.</p>
      <h3>أهم محاور المبادرة:</h3>
      <ul>
        <li>التعريف بأساسيات الذكاء الاصطناعي.</li>
        <li>الاستخدام الآمن لتطبيقات الذكاء الاصطناعي.</li>
        <li>كيفية حماية الخصوصية الرقمية.</li>
        <li>التعرف على الأخبار الزائفة وطرق مكافحتها.</li>
      </ul>
      <p>وقد شهدت المبادرة إقبالاً كبيراً من طلاب الجامعات والمهتمين بالتكنولوجيا، مما يعكس الوعي المتزايد بأهمية هذا المجال الحيوي.</p>
    `
  },
  {
    id: 2,
    title: 'الاستراتيجية الوطنية لحقوق الإنسان 2021-2026',
    image: '/images/projects/human-rights.jpg',
    date: '13 ديسمبر, 2025',
    author: 'فريق التحرير',
    content: '<p>تفاصيل حول الاستراتيجية الوطنية لحقوق الإنسان وكيفية تطبيقها في المحافظة...</p>'
  },
  {
    id: 3,
    title: 'توطين أهداف التنمية المستدامة في كفر الشيخ',
    image: '/images/vision/sdgs.jpg',
    date: '13 ديسمبر, 2025',
    author: 'فريق التحرير',
    content: '<p>خطة المحافظة لتوطين أهداف التنمية المستدامة ورؤية مصر 2030...</p>'
  },
  {
    id: 4,
    title: 'فوة حيث يلتقي التاريخ بالإبداع',
    image: '/images/projects/fuwah.jpg',
    date: '13 ديسمبر, 2025',
    author: 'فريق التحرير',
    content: '<p>جولة تعريفية بمدينة فوة وتاريخها العريق وصناعة الكليم اليدوي...</p>'
  },
  {
    id: 5,
    title: 'قدم على تصالح في مخالفات البناء',
    image: '/images/projects/tasaloh.jpg',
    date: '13 ديسمبر, 2025',
    author: 'فريق التحرير',
    content: '<p>بدء تلقي طلبات التصالح في مخالفات البناء وفقاً للقانون الجديد وتسهيلات للمواطنين...</p>'
  },
  {
    id: 6,
    title: 'خطة المواطن الاستثمارية لمحافظة كفر الشيخ 2024 / 2025',
    image: '/images/projects/investment-plan.jpg',
    date: '13 ديسمبر, 2025',
    author: 'فريق التحرير',
    content: '<p>عرض تفصيلي لخطة المواطن الاستثمارية للعام المالي الحالي وأهم المشروعات المستهدفة...</p>'
  }
];

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Try to get data from navigation state, otherwise fallback to finding it in eventsData
  const stateItem = location.state?.item;
  
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (stateItem) {
      setEvent({
        id: stateItem.id,
        title: stateItem.title,
        image: stateItem.img || stateItem.image,
        date: stateItem.date || '13 ديسمبر, 2025',
        author: 'فريق التحرير',
        category: stateItem.category || 'أخبار المحافظة',
        content: stateItem.content || `
          <p class="lead">${stateItem.excerpt || 'تفاصيل الخبر'}</p>
          <p>أكد السيد المحافظ على أهمية الاستمرار في تنفيذ المشروعات الجارية وفق الجداول الزمنية المحددة وبأعلى معايير الجودة، بما يدعم جهود التنمية ويرتقي بمستوى الخدمات المقدمة للمواطنين.</p>
          <p>كما شدد المحافظ على استمرار حملات إزالة الإشغالات والتعديات ومراجعة التراخيص والالتزام بالاشتراطات القانونية، مؤكداً اتخاذ الإجراءات اللازمة حيال أي مخالفات من شأنها التأثير على السيولة المرورية أو الإضرار بالمصلحة العامة، بما يسهم في تحقيق الانضباط والحفاظ على المظهر الحضاري بمختلف أنحاء المحافظة.</p>
          <p>جاء ذلك بحضور القيادات التنفيذية المعنية ومسؤولي القطاعات المختلفة.</p>
        `
      });
    } else {
      const found = newsItems.find(e => e.id === parseInt(id)) || eventsData.find(e => e.id === parseInt(id)) || newsItems[0];
      setEvent({
        id: found.id,
        title: found.title,
        image: found.img || found.image,
        date: found.date,
        author: found.author || 'فريق التحرير',
        category: found.category || 'أخبار المحافظة',
        content: found.content || `<p class="lead">${found.excerpt || 'تفاصيل الخبر'}</p><p>تفاصيل إضافية...</p>`
      });
    }
  }, [id, stateItem]);

  const relatedNews = newsItems.filter(e => e.id !== parseInt(id)).slice(0, 3);

  const [commentData, setCommentData] = useState({ name: '', email: '', comment: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setCommentData({ name: '', email: '', comment: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  if (!event) return null;

  return (
    <div className="bg-slate-50 min-h-screen font-cairo overflow-x-hidden pb-20" dir="rtl">
      
      {/* Standard Page Hero */}
      <PageHero 
        title="تفاصيل الخبر" 
        subtitle="تابع آخر المستجدات والقرارات الرسمية داخل محافظة كفر الشيخ"
      />

      {/* Main Content & Sidebar Layout */}
      <section className="container mx-auto px-4 lg:px-8 py-16 -mt-12 relative z-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Article Content (Right side in RTL) */}
          <div className="lg:col-span-8 space-y-8">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[1.5rem] p-6 md:p-10 shadow-md border border-slate-100"
            >
              {/* Event Meta Data */}
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm font-bold mb-6">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                  <FaRegCalendarAlt className="text-gold" size={16} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                  <FaRegUser className="text-gold" size={16} />
                  <span>بواسطة {event.author}</span>
                </div>
                <div className="flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-xl">
                  <span>{event.category}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-black text-navy mb-8 leading-[1.5]">
                {highlightText(event.title)}
              </h1>

              {/* Featured Image inside content */}
              <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-sm bg-slate-50 flex justify-center border border-slate-100">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-auto max-h-[600px] object-contain"
                />
              </div>

              {/* Content Styling */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-navy prose-headings:font-black prose-p:text-slate-600 prose-p:leading-[2] prose-p:mb-6 prose-a:text-gold prose-li:text-slate-600 prose-li:font-medium"
                dangerouslySetInnerHTML={{ __html: event.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-6 border-t border-slate-100 flex items-center flex-wrap gap-2 text-sm">
                <span className="text-slate-400 ml-2">الكلمات الدالة:</span>
                <a href="#" className="text-blue-500 hover:text-navy transition-colors font-bold">#كفر_الشيخ</a>
                <a href="#" className="text-blue-500 hover:text-navy transition-colors font-bold">#المحافظة</a>
                <a href="#" className="text-blue-500 hover:text-navy transition-colors font-bold">#أخبار_رسمية</a>
              </div>
            </motion.div>

            {/* Comment Section (Light Design) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden"
            >
              
              <div className="relative z-10">
                <div className="mb-8 border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-navy mb-2">اترك تعليقك البناء</h3>
                  <p className="text-slate-500 text-sm font-medium">نرحب بمقترحاتكم وتعليقاتكم لتطوير خدماتنا</p>
                </div>
                
                {isSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-6 rounded-2xl text-center font-bold">
                    تم إرسال تعليقك بنجاح! شكراً لمشاركتك.
                  </div>
                ) : (
                  <form onSubmit={handleCommentSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input 
                          type="text" 
                          required 
                          value={commentData.name}
                          onChange={(e) => setCommentData({...commentData, name: e.target.value})}
                          placeholder="الاسم الكريم" 
                          className="w-full bg-slate-50 border border-slate-200 text-navy placeholder-slate-400 rounded-xl px-5 py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-medium"
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          required 
                          value={commentData.email}
                          onChange={(e) => setCommentData({...commentData, email: e.target.value})}
                          placeholder="البريد الإلكتروني" 
                          className="w-full bg-slate-50 border border-slate-200 text-navy placeholder-slate-400 rounded-xl px-5 py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <textarea 
                        required 
                        rows="4"
                        value={commentData.comment}
                        onChange={(e) => setCommentData({...commentData, comment: e.target.value})}
                        placeholder="نرحب بمقترحاتكم وتعليقاتكم هنا..." 
                        className="w-full bg-slate-50 border border-slate-200 text-navy placeholder-slate-400 rounded-xl px-5 py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none font-medium"
                      ></textarea>
                    </div>
                    <div className="text-right">
                      <button 
                        type="submit" 
                        className="bg-navy text-white font-bold px-10 py-3.5 rounded-xl hover:bg-gold hover:text-white transition-all shadow-md hover:shadow-lg inline-flex items-center gap-3"
                      >
                        إضافة تعليقك الآن
                        <FaPaperPlane size={14} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Layout (Left side in RTL) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Share Widget */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 text-center"
            >
              <div className="mb-6 border-b border-slate-100 pb-4 inline-block mx-auto min-w-[200px]">
                <h4 className="font-black text-navy text-lg">مشاركة الخبر</h4>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 hover:bg-gold hover:text-white flex items-center justify-center transition-colors shadow-sm">
                  <FaFacebookF size={20} />
                </button>
                <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 hover:bg-gold hover:text-white flex items-center justify-center transition-colors shadow-sm">
                  <FaTwitter size={20} />
                </button>
                <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 hover:bg-gold hover:text-white flex items-center justify-center transition-colors shadow-sm">
                  <FaWhatsapp size={22} />
                </button>
                <button className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 hover:bg-gold hover:text-white flex items-center justify-center transition-colors shadow-sm">
                  <FaEnvelope size={20} />
                </button>
              </div>
            </motion.div>

            {/* Related News Widget */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100"
            >
              <div className="mb-6 border-b border-slate-100 pb-4 inline-block mx-auto min-w-[200px] text-center w-full">
                <h4 className="font-black text-navy text-lg text-right">أخبار قد تهمك</h4>
              </div>
              
              <div className="space-y-4">
                {relatedNews.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => navigate(`/news/${item.id}`, { state: { item } })}
                    className="flex gap-4 group cursor-pointer items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex-1 text-right">
                      <h5 className="text-[13px] font-bold text-navy group-hover:text-gold transition-colors leading-tight line-clamp-2">
                        {highlightText(item.title)}
                      </h5>
                    </div>
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                      <img src={item.img || item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default NewsDetails;
