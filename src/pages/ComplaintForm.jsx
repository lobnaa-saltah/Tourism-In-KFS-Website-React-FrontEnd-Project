import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileEdit, UploadCloud } from 'lucide-react';
import PageHero from '../components/PageHero/PageHero';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    phone: '',
    email: '',
    subject: '',
    details: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Submitted", formData);
    // Add success handling logic here
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-cairo" dir="rtl">
      <PageHero
        title="تقديم شكوى"
        subtitle="صوتك مسموع، نلتزم بمتابعة شكواك بجدية وشفافية"
      />

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-navy p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-[#dca826] mx-auto mb-4">
                <FileEdit size={32} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">نموذج تقديم شكوى رسمية</h2>
              <p className="text-slate-300 text-sm">يرجى التأكد من دقة البيانات المقدمة لضمان سرعة الاستجابة</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Section 1: Personal Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-r-4 border-[#dca826] pr-3 mb-6">
                  <h3 className="text-lg font-bold text-navy">أولاً: بياناتك الشخصية</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">الاسم الكامل</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">الرقم القومي (14 رقم)</label>
                    <input 
                      type="text" 
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleChange}
                      maxLength={14}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all text-left"
                      dir="ltr"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">رقم الهاتف للتواصل</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all text-left"
                      dir="ltr"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Section 2: Complaint Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-r-4 border-[#dca826] pr-3 mb-6">
                  <h3 className="text-lg font-bold text-navy">ثانياً: تفاصيل الشكوى</h3>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy">موضوع الشكوى <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy">نص الشكوى بالتفصيل <span className="text-red-500">*</span></label>
                  <textarea 
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy">إرفاق ملف (اختياري)</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      className="w-full bg-slate-50 border border-dashed border-slate-300 rounded-xl px-4 py-4 text-slate-500 focus:outline-none focus:border-[#dca826] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#dca826]/10 file:text-[#dca826] hover:file:bg-[#dca826]/20 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-medium">الأنواع المسموح بها PDF, JPG, PNG بحد أقصى للحجم 5MB</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#dca826] hover:bg-[#c99a22] text-white font-bold rounded-xl px-8 py-4 flex items-center justify-center transition-colors duration-300 shadow-md mt-4"
              >
                إرسال الشكوى
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComplaintForm;
