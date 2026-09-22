import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Triangle, AlertCircle, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero/PageHero';

const UrgentReportForm = () => {
  const [formData, setFormData] = useState({
    reportType: '',
    location: '',
    description: '',
    fullName: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Urgent Report Submitted", formData);
    // Add success handling logic here
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-cairo" dir="rtl">
      <PageHero
        title="بلاغ عاجل"
        subtitle="غرفة العمليات المركزية تعمل على مدار الساعة للاستجابة للبلاغات الطارئة"
      />

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-red-100 overflow-hidden"
        >
          {/* Form Header (Red Theme) */}
          <div className="bg-[#df4b38] p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                <Triangle size={32} strokeWidth={2.5} fill="currentColor" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">نموذج الإبلاغ عن حالة طارئة</h2>
              <p className="text-red-100 text-sm">سيتم توجيه هذا البلاغ فوراً للجهات المختصة للتدخل السريع</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Section 1: Urgent Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-r-4 border-[#df4b38] pr-3 mb-6 bg-red-50 p-2 rounded-l-lg">
                  <AlertCircle size={20} className="text-[#df4b38]" />
                  <h3 className="text-lg font-bold text-navy">أولاً: بيانات الحالة الطارئة</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-bold text-navy">نوع البلاغ <span className="text-red-500">*</span></label>
                    <select 
                      name="reportType"
                      value={formData.reportType}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#df4b38]/50 focus:border-[#df4b38] transition-all"
                      required
                    >
                      <option value="" disabled>اختر نوع البلاغ الطارئ</option>
                      <option value="fire">حريق</option>
                      <option value="accident">حادث سير</option>
                      <option value="building">انهيار مبنى أو منشأة</option>
                      <option value="medical">طوارئ طبية عاجلة</option>
                      <option value="infrastructure">كسر ماسورة مياه أو عطل كهرباء خطير</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-bold text-navy flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      الموقع بالتفصيل <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="اذكر اسم المركز، المدينة، الشارع، وأي علامة مميزة..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#df4b38]/50 focus:border-[#df4b38] transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-bold text-navy">وصف الحالة بدقة <span className="text-red-500">*</span></label>
                    <textarea 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="صف ما يحدث الآن باختصار شديد..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-navy focus:outline-none focus:ring-2 focus:ring-[#df4b38]/50 focus:border-[#df4b38] transition-all resize-none"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Section 2: Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-r-4 border-[#df4b38] pr-3 mb-6">
                  <h3 className="text-lg font-bold text-navy">ثانياً: بيانات المُبلغ (للتواصل في حالة الضرورة)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">رقم الهاتف للتواصل <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#df4b38]/50 focus:border-[#df4b38] transition-all text-left"
                      dir="ltr"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">الاسم الكامل (اختياري)</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#df4b38]/50 focus:border-[#df4b38] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#df4b38] hover:bg-[#c93f2f] text-white font-bold rounded-xl px-8 py-5 flex items-center justify-center gap-3 transition-colors duration-300 shadow-lg mt-4 animate-pulse hover:animate-none"
              >
                <AlertCircle size={22} />
                <span>إرسال البلاغ العاجل فوراً</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UrgentReportForm;
