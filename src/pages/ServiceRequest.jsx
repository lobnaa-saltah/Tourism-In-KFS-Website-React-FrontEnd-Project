import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaUser, FaIdCard, FaFileUpload, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';

const ServiceRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service || { title: 'طلب خدمة جديدة' };

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-cairo p-4" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2rem] p-10 max-w-lg w-full text-center shadow-2xl border border-slate-100"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck size={40} />
          </div>
          <h2 className="text-3xl font-black text-navy mb-4">تم تقديم الطلب بنجاح!</h2>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            رقم الطلب الخاص بك هو <span className="font-bold text-navy bg-slate-100 px-2 py-1 rounded">REQ-84729</span>. سيتم مراجعة الطلب وإرسال إشعار لك فور الانتهاء.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-gold hover:text-navy transition-colors"
          >
            العودة للرئيسية
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-cairo py-12 px-4 sm:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-navy transition-colors font-bold mb-6">
            <FaArrowRight size={14} />
            <span>رجوع</span>
          </button>
          <h1 className="text-3xl font-black text-navy mb-2">تقديم طلب: {service.title}</h1>
          <p className="text-slate-500">يرجى إكمال البيانات المطلوبة بدقة لضمان سرعة تنفيذ طلبك.</p>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_5px_20px_rgba(0,0,0,0.02)] border border-slate-100 mb-8 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            {['البيانات الشخصية', 'تفاصيل الطلب والمرفقات', 'المراجعة والتقديم'].map((label, idx) => {
              const stepNum = idx + 1;
              const isActive = step >= stepNum;
              const isCurrent = step === stepNum;
              return (
                <div key={idx} className="flex flex-col items-center gap-3 relative z-10 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-colors duration-300 ${
                    isActive ? 'bg-navy text-white shadow-lg' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > stepNum ? <FaCheck size={16} /> : stepNum}
                  </div>
                  <span className={`text-sm font-bold text-center ${isCurrent ? 'text-navy' : 'text-slate-400'}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Progress Line */}
          <div className="absolute top-14 left-16 right-16 h-1 bg-slate-100 -z-0">
             <div className="h-full bg-navy transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-xl shadow-navy/5 border border-slate-100">
          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            
            {/* Step 1 */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-xl font-black text-navy border-b border-slate-100 pb-4 mb-6">البيانات الشخصية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الرباعي <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <FaUser className="absolute right-4 top-3.5 text-slate-400" />
                      <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors font-medium" placeholder="اكتب اسمك كما في البطاقة" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الرقم القومي <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <FaIdCard className="absolute right-4 top-3.5 text-slate-400" />
                      <input type="text" required pattern="[0-9]{14}" maxLength="14" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors font-medium" placeholder="14 رقم" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-xl font-black text-navy border-b border-slate-100 pb-4 mb-6">المرفقات المطلوبة</h3>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-navy hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-navy shadow-sm mx-auto mb-4 transition-colors">
                    <FaFileUpload size={24} />
                  </div>
                  <h4 className="font-bold text-navy mb-2">اضغط هنا لرفع المستندات</h4>
                  <p className="text-sm text-slate-500 mb-4">صورة البطاقة، التوكيل، والمستندات الداعمة (PDF أو JPG)</p>
                  <button type="button" className="bg-white border border-slate-200 text-slate-600 font-bold py-2 px-6 rounded-lg shadow-sm">تصفح الملفات</button>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-xl font-black text-navy border-b border-slate-100 pb-4 mb-6">إقرار وتعهد</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-800">
                  <h4 className="font-bold mb-2 flex items-center gap-2"><FaCheckCircle /> إقرار بصحة البيانات</h4>
                  <p className="text-sm leading-relaxed">
                    أقر أنا مقدم الطلب بأن كافة البيانات والمستندات المرفقة صحيحة وعلى مسئوليتي الشخصية، وفي حال ثبوت غير ذلك أتحمل كافة المسئوليات القانونية الناتجة عن ذلك.
                  </p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer mt-4">
                  <input type="checkbox" required className="mt-1 w-5 h-5 rounded border-slate-300 text-navy focus:ring-navy" />
                  <span className="text-sm font-bold text-slate-700">أوافق على الإقرار والشروط والأحكام الخاصة بالخدمة.</span>
                </label>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
              <button 
                type="button" 
                onClick={handlePrev}
                disabled={step === 1 || isSubmitting}
                className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <FaArrowRight size={12} />
                <span>السابق</span>
              </button>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-navy text-white font-bold px-10 py-3.5 rounded-xl hover:bg-gold hover:text-navy transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>جاري التقديم...</span>
                ) : (
                  <>
                    <span>{step === 3 ? 'تأكيد وتقديم الطلب' : 'التالي'}</span>
                    {step !== 3 && <FaArrowLeft size={12} />}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ServiceRequest;
