import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Triangle, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero/PageHero';

const SubmitComplaint = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-cairo" dir="rtl">
      {/* 1. Header Section */}
      <PageHero
        title="كيف يمكننا مساعدتك؟"
        subtitle="اختر نوع الطلب الذي تريد تقديمه وسيتم توجيهك إلى النموذج المناسب"
      />

      <div className="container mx-auto px-4 max-w-5xl mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Right Card: Submit Complaint (Navy) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-navy rounded-3xl p-10 text-center flex flex-col items-center justify-between group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full border border-slate-700/30"
          >
            <div>
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 transition-transform group-hover:scale-110 duration-300">
                <Edit size={32} strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-black text-white mb-4">تقديم شكوى</h2>
              <p className="text-slate-300 font-medium leading-relaxed mb-8 max-w-xs mx-auto text-sm">
                إذا كنت تواجه مشكلة مع إحدى الخدمات أو لديك استفسار حول معاملة رسمية
              </p>
            </div>
            <Link to="/submit-complaint/form" className="bg-white/10 hover:bg-white/20 text-white font-bold rounded-full px-8 py-3 flex items-center justify-center gap-3 transition-colors duration-300 w-fit mx-auto mt-auto">
              <span>ابدأ الآن</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Left Card: Urgent Report (Red) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#df4b38] rounded-3xl p-10 text-center flex flex-col items-center justify-between group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full border border-red-500/30"
          >
            <div>
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 transition-transform group-hover:scale-110 duration-300">
                <Triangle size={32} strokeWidth={2.5} fill="currentColor" className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-4">بلاغ عاجل</h2>
              <p className="text-red-100 font-medium leading-relaxed mb-8 max-w-xs mx-auto text-sm">
                للإبلاغ عن حالات طارئة أو مخالفات أو مشكلات تحتاج إلى تدخل فوري
              </p>
            </div>
            <Link to="/submit-complaint/urgent" className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-full px-8 py-3 flex items-center justify-center gap-3 transition-colors duration-300 w-fit mx-auto mt-auto">
              <span>ابدأ الآن</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
