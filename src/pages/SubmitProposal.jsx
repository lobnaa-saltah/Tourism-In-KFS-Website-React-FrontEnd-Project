import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import PageHero from '../components/PageHero/PageHero';

const SubmitProposal = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    title: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Proposal Submitted", formData);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-cairo" dir="rtl">
      <PageHero
        title="تقديم مقترح"
        subtitle="مساهمتك تساعد في تطوير خدماتنا. شاركنا بأفكارك."
      />

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        >
          {/* Form Header (Dark Navy) */}
          <div className="bg-navy p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-[#dca826] mx-auto mb-4">
                <Lightbulb size={28} strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">نموذج تقديم مقترح</h2>
              <p className="text-slate-300 text-sm">كل فكرة هي خطوة نحو مستقبل أفضل.</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Section 1: Personal Info (Optional) */}
              <div className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-navy">بياناتك الشخصية (اختياري)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">الاسم الكامل</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
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

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">رقم الهاتف للتواصل</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100 my-8" />

              {/* Section 2: Proposal Details */}
              <div className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-navy">تفاصيل المقترح</h3>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy">عنوان المقترح <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy">اشرح مقترحك بالتفصيل <span className="text-red-500">*</span></label>
                  <textarea 
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-navy hover:bg-[#1a2333] text-white font-bold rounded-xl px-8 py-4 flex items-center justify-center transition-colors duration-300 shadow-md mt-8"
              >
                إرسال المقترح
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitProposal;
