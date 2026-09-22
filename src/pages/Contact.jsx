import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Headset } from 'lucide-react';
import PageHero from '../components/PageHero/PageHero';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted", formData);
  };

  const contactCards = [
    {
      icon: Clock,
      title: "مواعيد العمل",
      details: "الأحد - الخميس: 8 صباحاً - 3 مساءً",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      delay: 0.4
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: "info@kafrelsheikh.gov.eg",
      color: "text-blue-500",
      bg: "bg-blue-50",
      delay: 0.3
    },
    {
      icon: Phone,
      title: "أرقام التواصل",
      details: "047-3220555 | 047-3220666",
      color: "text-amber-500",
      bg: "bg-amber-50",
      delay: 0.2
    },
    {
      icon: MapPin,
      title: "العنوان الرئيسي",
      details: "مبنى ديوان عام محافظة كفر الشيخ، شارع المحافظة",
      color: "text-slate-600",
      bg: "bg-slate-100",
      delay: 0.1
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-cairo" dir="rtl">
      <PageHero
        title="تواصل معنا والدعم الفني"
        subtitle="نحن هنا للاستماع إليك ومساعدتك. تواصل معنا لأي استفسار أو مشكلة تقنية."
      />

      <div className="container mx-auto px-4 max-w-6xl mt-12 relative z-20">
        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactCards.reverse().map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay }}
              className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-[#dca826]/30 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-20 h-20 rounded-[1.5rem] ${card.bg} ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed" dir="auto">{card.details}</p>
            </motion.div>
          ))}
        </div>

        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-navy mb-2">كيف يمكننا مساعدتك؟</h2>
          <p className="text-slate-500">يرجى تعبئة النموذج وسيقوم فريقنا بالتواصل معك في أقرب وقت</p>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Form Side */}
            <div className="lg:col-span-8 p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">الاسم الكامل <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-navy">رقم الهاتف <span className="text-red-500">*</span></label>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label className="block text-sm font-bold text-navy">نوع الاستفسار <span className="text-red-500">*</span></label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                      required
                    >
                      <option value="" disabled>-- اختر نوع الرسالة --</option>
                      <option value="general">استفسار عام</option>
                      <option value="tech_support">مشكلة تقنية / دعم فني</option>
                      <option value="complaint">شكوى</option>
                      <option value="suggestion">اقتراح لتطوير الموقع</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-navy">نص الرسالة <span className="text-red-500">*</span></label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="اكتب رسالتك أو اشرح المشكلة التقنية التي تواجهها بالتفصيل..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-navy hover:bg-[#1d6b87] text-white font-bold rounded-xl px-8 py-4 flex items-center justify-center gap-3 transition-colors duration-300 shadow-md w-full"
                  >
                    <span>إرسال الرسالة</span>
                    <Send size={18} fill="currentColor" />
                  </button>
                </div>
              </form>
            </div>

            {/* Illustration / Image Side */}
            <div className="lg:col-span-4 bg-navy relative min-h-[300px] hidden lg:block overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 mb-6">
                  <Headset size={40} className="text-[#dca826]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">بوابة التواصل<br/>الموحدة</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  نحن نعمل على مدار الساعة لضمان تقديم أفضل مستوى من الخدمة والدعم الفني لكافة المواطنين.
                </p>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Contact;
