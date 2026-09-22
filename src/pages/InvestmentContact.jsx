import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane, FaBuilding } from 'react-icons/fa';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const InvestmentContact = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-cairo overflow-x-hidden flex flex-col" dir="rtl">
      
      {/* 1. Hero Banner */}
      <PageHero
        title="تواصل مع قطاع الاستثمار"
        subtitle="نحن هنا لدعمك وتسهيل إجراءات استثمارك في محافظة كفر الشيخ."
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-16 flex-1 flex flex-col justify-center">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100 relative group"
        >
          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-gold via-yellow-500 to-navy z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Right Column: Contact Info (Navy Background) */}
          <div className="w-full lg:w-2/5 bg-navy text-white p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between">
            {/* Abstract Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-[#1a356b] rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold text-xs font-bold mb-8">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                دعم المستثمرين
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">
                قطاع <span className="text-gold">الاستثمار</span>
              </h2>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium">
                نحن هنا للإجابة على كافة استفساراتكم حول الفرص الاستثمارية والمناطق الصناعية بالمحافظة، وتقديم الدعم الكامل لتسهيل بدء أعمالكم.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-gold text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-400 font-bold mb-1">موقعنا</h4>
                    <p className="font-bold text-lg">ديوان عام محافظة كفر الشيخ</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FaBuilding className="text-gold text-xl" />
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-400 font-bold mb-1">الإدارة</h4>
                    <p className="font-bold text-lg">إدارة الاستثمار والمناطق الصناعية</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Left Column: The Form */}
          <div className="w-full lg:w-3/5 p-10 lg:p-14 bg-white relative">
            <h3 className="text-2xl font-black text-navy mb-8 flex items-center gap-3">
               أرسل استفسارك الآن
            </h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 block">الاسم الكامل <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-navy font-medium"
                    placeholder="أدخل اسمك الثلاثي"
                  />
                </div>
                
                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 block">اسم الشركة <span className="text-slate-400 text-xs font-normal">(إن وجد)</span></label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-navy font-medium"
                    placeholder="اسم شركتك أو مؤسستك"
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 block">البريد الإلكتروني <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-navy font-medium"
                    placeholder="example@mail.com"
                    dir="ltr"
                  />
                </div>
                
                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 block">رقم الهاتف <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-navy font-medium text-right"
                    placeholder="010XXXXXXXX"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 block">موضوع الاستفسار <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-navy font-medium"
                  placeholder="مثال: استفسار عن المنطقة الصناعية بمطوبس"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 block">رسالتك <span className="text-red-500">*</span></label>
                <textarea 
                  rows="4"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-navy font-medium resize-none"
                  placeholder="اكتب تفاصيل استفسارك أو طلبك هنا..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-navy text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#c29526] hover:shadow-lg hover:shadow-[#c29526]/30 transition-all duration-300 mt-4 group"
              >
                <span>إرسال الطلب الآن</span>
                <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default InvestmentContact;
