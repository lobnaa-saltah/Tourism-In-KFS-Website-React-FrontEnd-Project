import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy, Clock, CornerUpLeft, CheckCircle } from 'lucide-react';
import PageHero from '../components/PageHero/PageHero';

const TechSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    details: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-cairo" dir="rtl">
      
      {/* 1. Header Section */}
      <PageHero
        title="الدعم الفني"
        subtitle="نحن هنا لمساعدتك في حل أي مشكلة تقنية قد تواجهك على البوابة الذكية للمحافظة."
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl mt-12">
        
        {/* Support Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row"
        >
          
          {/* Left Panel - Information (Navy Background) */}
          <div className="lg:w-1/3 bg-navy p-8 md:p-12 text-center lg:text-right flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
            
            <div className="relative z-10 text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#dca826] mx-auto mb-6 shadow-sm border border-white/10">
                <LifeBuoy size={32} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">فريق الدعم الفني</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                فريقنا المتخصص جاهز لمساعدتك في حل أي مشكلة تقنية تواجهك
              </p>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Info Block 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#dca826] shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1 text-right">أوقات العمل</h3>
                  <p className="text-slate-400 text-xs text-right">الأحد - الخميس | 9 صباحاً - 3 مساءً</p>
                </div>
              </div>

              {/* Info Block 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#dca826] shrink-0">
                  <CornerUpLeft size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1 text-right">زمن الاستجابة</h3>
                  <p className="text-slate-400 text-xs text-right">خلال 24 ساعة عمل كحد أقصى</p>
                </div>
              </div>

              {/* Info Block 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-white/10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#dca826] shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1 text-right">مستوى الأولوية</h3>
                  <p className="text-slate-400 text-xs text-right">يتم تصنيف الطلبات حسب درجة الاستعجال</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form (White Background) */}
          <div className="lg:w-2/3 p-8 md:p-12 lg:px-16">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
              <h2 className="text-2xl font-black text-navy">فتح تذكرة دعم فني</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy text-right">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy text-right">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy text-left focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone (Optional) */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy text-right">رقم الهاتف (اختياري)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy text-left focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                    dir="ltr"
                  />
                </div>

                {/* Ticket Subject */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy text-right">عنوان الطلب</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="مثال: مشكلة في تسجيل الدخول"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                    required
                  />
                </div>
              </div>

              {/* Problem Details */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-navy text-right">شرح المشكلة بالتفصيل</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={6}
                  placeholder="صف المشكلة التي تواجهها بأكبر قدر من التفصيل..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-navy hover:bg-navy/90 text-white font-bold rounded-xl px-8 py-4 flex items-center justify-center gap-3 transition-colors duration-300 shadow-md group"
              >
                <span>إرسال الطلب</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 512 512" 
                  className="w-5 h-5 text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                >
                  <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                </svg>
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default TechSupport;
