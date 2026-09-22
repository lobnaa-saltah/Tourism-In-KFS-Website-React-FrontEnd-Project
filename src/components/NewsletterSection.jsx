import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const NewsletterSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-y border-slate-100 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal/5 rounded-full blur-[100px] pointer-events-none -ml-40 -mb-40"></div>

      {/* Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,43,73,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,43,73,0.05)_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto w-full"
        >

          {/* Text Area */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-navy text-xs font-bold mb-6 border border-slate-100">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
            النشرة الإخبارية
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-navy mb-6 leading-tight">
            كن جزءاً من <span className="text-transparent bg-clip-text bg-gradient-to-l from-gold to-yellow-500 drop-shadow-sm">مستقبل المحافظة</span>
          </h2>
          <p className="text-navy/70 text-lg leading-relaxed font-medium mb-12 max-w-2xl mx-auto">
            اشترك الآن لتصلك أحدث المبادرات، والمشاريع القومية، والخدمات الحكومية الجديدة الخاصة بمحافظة كفر الشيخ مباشرة إلى بريدك الإلكتروني.
          </p>

          {/* Input Area */}
          <div className="w-full max-w-3xl bg-slate-50 border border-slate-100 p-3 lg:p-4 rounded-3xl shadow-sm relative">
            <div className="relative flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                  <FaEnvelope className="text-navy/40" size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="أدخل بريدك الإلكتروني هنا..."
                  className="w-full h-14 lg:h-16 pr-12 pl-6 rounded-2xl bg-white border border-slate-200 hover:border-gold/50 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-navy/30 text-navy font-bold text-sm lg:text-base shadow-sm"
                />
              </div>
              <button className="h-14 lg:h-16 px-10 bg-navy text-white font-bold rounded-2xl hover:bg-navy-light hover:scale-[1.02] transition-all shadow-lg shadow-navy/20 flex items-center justify-center gap-3 shrink-0 group">
                اشتراك
                <FaPaperPlane className="text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
          <p className="text-navy/40 text-xs mt-4 text-center font-bold">
            * لن نقوم بإرسال رسائل مزعجة، نعدك بذلك!
          </p>

        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
