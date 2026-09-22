import React from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaEye, FaCheckCircle, FaApple, FaGooglePlay } from 'react-icons/fa';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const plans = [
  {
    id: 6,
    year: '2024-2025',
    date: '2026/01/06',
    file: '/pdfs/investment-plans/plan-2024-2025.pdf',
    hasFinalReport: true,
    reportFile: '/pdfs/investment-plans/report-2024-2025.pdf'
  },
  {
    id: 5,
    year: '2023-2024',
    date: '2026/01/06',
    file: '/pdfs/investment-plans/plan-2023-2024.pdf',
    hasFinalReport: true,
    reportFile: '/pdfs/investment-plans/report-2023-2024.pdf'
  },
  {
    id: 4,
    year: '2022-2023',
    date: '2026/01/06',
    file: '/pdfs/investment-plans/plan-2022-2023.pdf',
    hasFinalReport: true,
    reportFile: '/pdfs/investment-plans/report-2022-2023.pdf'
  },
  {
    id: 3,
    year: '2021-2022',
    date: '2026/01/06',
    file: '/pdfs/investment-plans/plan-2021-2022.pdf',
    hasFinalReport: true,
    reportFile: '/pdfs/investment-plans/report-2021-2022.pdf'
  },
  {
    id: 2,
    year: '2020-2021',
    date: '2026/01/06',
    file: '/pdfs/investment-plans/plan-2020-2021.pdf',
    hasFinalReport: true,
    reportFile: '/pdfs/investment-plans/report-2020-2021.pdf'
  },
  {
    id: 1,
    year: '2019-2020',
    date: '2026/01/06',
    file: '/pdfs/investment-plans/plan-2019-2020.pdf',
    hasFinalReport: true,
    reportFile: '/pdfs/investment-plans/report-2019-2020.pdf'
  }
];

const InvestmentPlan = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen font-cairo overflow-x-hidden" dir="rtl">
      
      {/* 1. Page Hero */}
      <PageHero
        title="مشروعات الخطة الاستثمارية"
        subtitle="الأرشيف الرسمي لخطط وإنجازات محافظة كفر الشيخ - إنشـاءات - رصف - إنارة - كهرباء"
      />

      {/* 2. Main Content Container */}
      <section className="container mx-auto px-4 lg:px-8 max-w-7xl py-12 -mt-8 relative z-20">
        
        {/* Top Section: Sharek Banner & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          
          {/* Sharek Banner (Spans 2 columns on lg) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-2 bg-navy rounded-[2rem] p-8 lg:p-10 text-white shadow-[0_15px_50px_rgba(30,58,138,0.3)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group"
          >
            {/* Background Decorations (Only Blue/White, no gold/yellow) */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none transition-colors duration-700"></div>
            
            <div className="relative z-10 flex-1 text-center md:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold mb-4">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                صوتك يهمنا
              </div>
              <h3 className="text-3xl font-black mb-4">شارك في رسم مستقبلك</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-md">
                تابع مشاريع الخطة الاستثمارية في منطقتك، وقدم مقترحاتك وملاحظاتك مباشرة عبر تطبيق شارك 2030 الرسمي.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a href="#" className="flex items-center gap-3 bg-white text-navy hover:bg-gold hover:text-white px-6 py-3 rounded-xl transition-all font-bold text-sm shadow-lg">
                  <FaApple size={20} />
                  <span>App Store</span>
                </a>
                <a href="#" className="flex items-center gap-3 bg-white/10 text-white hover:bg-white hover:text-navy px-6 py-3 rounded-xl border border-white/20 transition-all font-bold text-sm">
                  <FaGooglePlay size={20} />
                  <span>Google Play</span>
                </a>
              </div>
            </div>

            {/* Phone Illustration - Premium Glassmorphism */}
            <div className="relative z-10 shrink-0 transform group-hover:-translate-y-2 transition-transform duration-500">
               {/* Outer glow */}
               <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-110"></div>
               
               <div className="w-32 h-64 bg-white/10 backdrop-blur-md rounded-[2.5rem] border-[2px] border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col items-center justify-start overflow-hidden relative">
                  {/* Screen reflection */}
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none"></div>
                  
                  {/* Notch */}
                  <div className="w-12 h-4 bg-navy rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center">
                    <div className="w-3 h-1 bg-white/20 rounded-full"></div>
                  </div>

                  {/* App Icon Area */}
                  <div className="mt-12 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00aaff] to-[#005580] flex items-center justify-center mb-4 shadow-lg border border-white/10 relative z-10">
                      <span className="text-white font-black text-sm drop-shadow-md">شارك</span>
                  </div>

                  {/* UI Lines */}
                  <div className="w-20 h-2.5 bg-white/30 rounded-full mb-3 relative z-10"></div>
                  <div className="w-16 h-2 bg-white/20 rounded-full mb-6 relative z-10"></div>
                  
                  {/* UI Cards */}
                  <div className="w-full px-4 grid grid-cols-2 gap-2 relative z-10">
                     <div className="h-12 bg-white/10 rounded-xl border border-white/5 backdrop-blur-sm"></div>
                     <div className="h-12 bg-white/10 rounded-xl border border-white/5 backdrop-blur-sm"></div>
                  </div>
                  
                  {/* Bottom indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/30 rounded-full"></div>
               </div>
            </div>
          </motion.div>

          {/* Stats Box */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-white to-slate-50 rounded-[2rem] p-8 border-2 border-navy/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-8">
               <h3 className="text-navy font-black text-xl border-b-2 border-gold/30 pb-2 w-full text-center">إحصائيات الأرشيف</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl border border-slate-100">
                <span className="text-slate-600 font-bold">إجمالي الخطط</span>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gold font-black text-xl border border-slate-50">
                   6
                </div>
              </div>
              
              <div className="flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl border border-slate-100">
                <span className="text-slate-600 font-bold">نطاق السنين</span>
                <div className="px-4 py-2 bg-navy text-white rounded-xl font-bold text-sm shadow-sm">
                   2019 - 2025
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-slate-200 to-transparent"></div>
          <h2 className="text-2xl font-black text-navy text-center">
            أرشيف الخطط المتاحة
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(212,163,43,0.1)] hover:border-gold/30 transition-all duration-500 overflow-hidden group flex flex-col relative"
            >
              {/* Card Header */}
              <div className="bg-navy p-6 relative overflow-hidden flex justify-between items-center">
                 {/* Decorative background in header (no gold glow) */}
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none transition-colors duration-500"></div>
                 
                 <div>
                   <h3 className="text-2xl font-black text-white">
                     عام {plan.year}
                   </h3>
                 </div>
                 
                 <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-gold transition-colors duration-300 shadow-inner">
                   <FaFilePdf size={24} className="text-white" />
                 </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-xs font-bold mb-1">تاريخ الرفع بالأرشيف</span>
                    <span className="text-slate-700 font-bold text-sm">{plan.date}</span>
                  </div>
                  
                  {/* Download Button */}
                  <a 
                    href={plan.file} 
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-navy hover:text-white transition-all text-xs font-bold"
                    title="تحميل الملف"
                  >
                    <span>تحميل</span>
                    <FaDownload size={12} />
                  </a>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-auto">
                  <a 
                    href={plan.file} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-navy text-white font-bold hover:bg-[#1d6b87] transition-all shadow-sm group/btn"
                  >
                    <FaEye size={16} className="group-hover/btn:scale-110 transition-transform" />
                    <span>عرض الخطة الأساسية</span>
                  </a>
                  
                  {plan.hasFinalReport && (
                    <a 
                      href={plan.reportFile}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-700 transition-all shadow-sm group/btn"
                    >
                      <FaCheckCircle size={16} className="group-hover/btn:scale-110 transition-transform" />
                      <span>عرض التقرير الختامي</span>
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default InvestmentPlan;
