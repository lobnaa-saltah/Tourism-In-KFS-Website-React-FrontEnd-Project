import { useTranslation } from 'react-i18next';
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaHeadset } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ComplaintsSection = () => {
  const { t, i18n } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="complaints" className="py-12 lg:py-16 bg-navy relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]"></div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Info Side (Dark Theme) */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-gold text-xs font-bold mb-4 border border-white/10 backdrop-blur-md shadow-lg">
                <FaHeadset size={14} />
                <span>{t('contact.label', 'بوابة الشكاوى والمقترحات')}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 font-cairo leading-tight">
                {t('contact.title', 'نحن هنا لسماعك')}
              </h2>
              <p className="text-white/60 text-sm lg:text-base font-medium leading-relaxed">
                {t('contact.subtitle', 'صوتك يهمنا جداً. سواء كان لديك استفسار، مقترح للتطوير، أو شكوى، فريقنا مستعد للتجاوب السريع والفعّال لمساعدتك.')}
              </p>
            </div>

            <div className="space-y-2">
              {[
                { icon: <FaPhoneAlt />, label: t('contact.phone', 'الخط الساخن'), val: '16528' },
                { icon: <FaEnvelope />, label: t('contact.email', 'البريد الإلكتروني'), val: 'portal@kfs.gov.eg' },
                { icon: <FaMapMarkerAlt />, label: t('contact.address', 'العنوان'), val: t('contact.address_val', 'ديوان عام المحافظة، كفر الشيخ') },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/10">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gold shadow-inner backdrop-blur-md flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 font-bold uppercase mb-1 tracking-wider">{item.label}</p>
                    <p className="text-white font-semibold text-lg">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side (Light Nested Card) */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-white/20">
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner ring-8 ring-green-500/10">
                    <FaCheckCircle size={56} />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-navy mb-4">{t('contact.success', 'تم الإرسال بنجاح')}</h3>
                  <p className="text-gray-500 text-lg max-w-md mx-auto">{t('contact.success_desc', 'شكراً لتواصلك معنا. سيتم مراجعة رسالتك باهتمام والتواصل معك في أقرب وقت عبر بياناتك المسجلة.')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-6 font-cairo">أرسل رسالتك الآن</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-navy px-2">{t('contact.form.name', 'الاسم الكامل')}</label>
                        <input 
                          required
                          type="text" 
                          className="h-12 px-5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all font-medium text-navy placeholder:text-gray-400 text-sm"
                          placeholder={t('contact.form.name_placeholder', 'أدخل اسمك ثلاثي')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-navy px-2">{t('contact.form.email', 'رقم الهاتف أو البريد')}</label>
                        <input 
                          required
                          type="text" 
                          className="h-12 px-5 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all font-medium text-navy placeholder:text-gray-400 text-sm"
                          placeholder="وسيلة للتواصل معك"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-navy px-2">{t('contact.form.subject', 'نوع الرسالة')}</label>
                        <div className="relative">
                          <select className="w-full h-12 px-5 appearance-none rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all font-medium text-navy cursor-pointer text-sm">
                            <option>{t('contact.form.subj.complaint', 'شكوى')}</option>
                            <option>{t('contact.form.subj.suggestion', 'مقترح تطوير')}</option>
                            <option>{t('contact.form.subj.inquiry', 'استفسار عام')}</option>
                          </select>
                          <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-navy ${i18n.dir() === 'rtl' ? 'left-5' : 'right-5'}`}>
                            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-navy px-2">{t('contact.form.message', 'تفاصيل الرسالة')}</label>
                        <textarea 
                          required
                          rows="4"
                          className="p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all font-medium text-navy placeholder:text-gray-400 resize-none text-sm"
                          placeholder={t('contact.form.msg_placeholder', 'اكتب تفاصيل رسالتك هنا بوضوح وسرية تامة...')}
                        ></textarea>
                      </div>

                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button 
                      type="submit"
                      className="w-full px-6 py-4 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
                    >
                      {t('contact.form.submit', 'إرسال الرسالة')}
                      <FaPaperPlane size={18} className={`transition-transform ${i18n.dir() === 'rtl' ? '-scale-x-100 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ComplaintsSection;
