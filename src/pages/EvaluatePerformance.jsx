import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Timer, Users, Building, MessageSquare } from 'lucide-react';
import PageHero from '../components/PageHero/PageHero';

const RatingQuestion = ({ id, question, value, onChange }) => {
  const options = ['راض جدا', 'راض', 'محايد', 'غير راض', 'غير راض تماما'];
  
  return (
    <div className="mb-8">
      <p className="text-navy font-bold mb-4">{id}- {question}</p>
      <div className="flex flex-wrap md:flex-nowrap gap-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onChange(id, option)}
            className={`flex-1 py-3 px-2 text-sm md:text-base rounded-full border transition-all duration-200 ${
              value === option 
                ? 'border-[#dca826] bg-[#dca826]/10 text-[#dca826] font-bold shadow-sm' 
                : 'border-slate-200 text-slate-600 hover:border-[#dca826]/50 hover:bg-slate-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const SectionCard = ({ title, icon: Icon, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-10 mb-8"
  >
    <div className="flex items-center gap-3 border-r-4 border-[#dca826] pr-4 mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-[#dca826]">{title}</h2>
      {Icon && <Icon className="text-[#dca826] mr-auto" size={28} />}
    </div>
    {children}
  </motion.div>
);

const EvaluatePerformance = () => {
  const [basicInfo, setBasicInfo] = useState({
    center: '',
    ageGroup: '',
    name: '',
    phone: '',
    gender: 'ذكر'
  });
  const [ratings, setRatings] = useState({});
  const [suggestions, setSuggestions] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [complaintReason, setComplaintReason] = useState('');

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (id, value) => {
    setRatings(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey Submitted", { basicInfo, ratings, suggestions, employeeName, complaintReason });
    // Handle submission
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-cairo" dir="rtl">
      <PageHero
        title="تقييم مستوى أداء الخدمات"
        subtitle="مشاركتك تساعدنا على تحسين جودة الخدمات المقدمة للمواطنين."
      />

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <p className="text-center font-bold text-[#dca826] text-lg mb-6">جميع الحقول التي تحتوي على هذه العلامة (*) مطلوبة</p>
        
        <form onSubmit={handleSubmit}>
          
          {/* Basic Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-10 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-navy font-bold text-sm">اختر المركز التكنولوجي *</label>
                <select 
                  name="center"
                  value={basicInfo.center}
                  onChange={handleBasicInfoChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                  required
                >
                  <option value="">-- اختر المركز --</option>
                  <option value="kfs">كفر الشيخ</option>
                  <option value="desouk">دسوق</option>
                  <option value="bella">بيلا</option>
                  <option value="baltim">بلطيم</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-navy font-bold text-sm">الفئة العمرية *</label>
                <select 
                  name="ageGroup"
                  value={basicInfo.ageGroup}
                  onChange={handleBasicInfoChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                  required
                >
                  <option value="under18">أقل من 18</option>
                  <option value="18-30">18 - 30</option>
                  <option value="31-50">31 - 50</option>
                  <option value="over50">أكبر من 50</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-navy font-bold text-sm">الاسم (اختياري)</label>
                <input 
                  type="text" 
                  name="name"
                  value={basicInfo.name}
                  onChange={handleBasicInfoChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-navy font-bold text-sm">رقم الهاتف (اختياري)</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={basicInfo.phone}
                  onChange={handleBasicInfoChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all text-left"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-navy font-bold text-sm mb-2">الجنس *</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="ذكر" 
                      checked={basicInfo.gender === 'ذكر'} 
                      onChange={handleBasicInfoChange}
                      className="text-[#dca826] focus:ring-[#dca826]" 
                    />
                    <span className="text-navy">ذكر</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="أنثى" 
                      checked={basicInfo.gender === 'أنثى'} 
                      onChange={handleBasicInfoChange}
                      className="text-[#dca826] focus:ring-[#dca826]" 
                    />
                    <span className="text-navy">أنثى</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 1 */}
          <SectionCard title="أولاً: مدى رضاك عن الخدمات المقدمة" icon={ClipboardList}>
            <RatingQuestion 
              id="1.1" 
              question="ما مدى رضاك عن سهولة الوصول إلى المراكز التكنولوجية؟ *" 
              value={ratings['1.1']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="1.2" 
              question="ما مدى رضاك عن وضوح إجراءات طلب الخدمة؟ *" 
              value={ratings['1.2']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="1.3" 
              question="إلى أي مدى أنت راض عن مدى تلبية الخدمات المقدمة لاحتياجاتك؟ *" 
              value={ratings['1.3']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="1.4" 
              question="إلى أي مدى أنت راض عن الإرشاد حول استخدام بوابة الخدمات الحكومية؟ *" 
              value={ratings['1.4']} onChange={handleRatingChange} 
            />
          </SectionCard>

          {/* Section 2 */}
          <SectionCard title="ثانياً: تقييم سرعة تقديم الخدمات" icon={Timer}>
            <RatingQuestion 
              id="2.1" 
              question="ما مدى رضاك عن سرعة تقديم الخدمة لك في المركز التكنولوجي؟ *" 
              value={ratings['2.1']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="2.2" 
              question="إلى أي مدى أنت راض عن وضوح المدة المتوقعة لإنجاز طلبك عند التقديم؟ *" 
              value={ratings['2.2']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="2.3" 
              question="إلى أي مدى أنت راض عن وضوح تبرير التأخير عند تأخر إنجاز الخدمة؟ *" 
              value={ratings['2.3']} onChange={handleRatingChange} 
            />
          </SectionCard>

          {/* Section 3 */}
          <SectionCard title="ثالثاً: تقييم أداء الموظفين" icon={Users}>
            <RatingQuestion 
              id="3.1" 
              question="إلى أي مدى أنت راض عن تعامل موظفي المركز معك؟ *" 
              value={ratings['3.1']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="3.2" 
              question="إلى أي مدى أنت راض عن اهتمام الموظفين بحل مشكلتك أو استفسارك؟ *" 
              value={ratings['3.2']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="3.3" 
              question="إلى أي مدى أنت راض عن سهولة التواصل مع الموظفين؟ *" 
              value={ratings['3.3']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="3.4" 
              question="إلى أي مدى أنت راض عن وضوح وشفافية الرسوم المحصلة مقابل الخدمة؟ *" 
              value={ratings['3.4']} onChange={handleRatingChange} 
            />
          </SectionCard>

          {/* Section 4 */}
          <SectionCard title="رابعاً: تقييم بيئة المركز التكنولوجي" icon={Building}>
            <RatingQuestion 
              id="4.1" 
              question="إلى أي مدى أنت راض عن نظافة وتنظيم المركز التكنولوجي؟ *" 
              value={ratings['4.1']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="4.2" 
              question="إلى أي مدى أنت راض عن مناسبة وراحة أماكن الجلوس والانتظار؟ *" 
              value={ratings['4.2']} onChange={handleRatingChange} 
            />
            <RatingQuestion 
              id="4.3" 
              question="إلى أي مدى أنت راض عن الوسائل التكنولوجية المتاحة لذوي الهمم لتسهيل حصولهم على الخدمات؟ *" 
              value={ratings['4.3']} onChange={handleRatingChange} 
            />
          </SectionCard>

          {/* Section 5 */}
          <SectionCard title="خامساً: الاقتراحات والتوصيات" icon={MessageSquare}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-navy font-bold">هل لديك أي اقتراحات لتحسين الخدمات المقدمة في المراكز التكنولوجية؟ (اختياري)</label>
                <textarea 
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  rows={4}
                  placeholder="اكتب اقتراحك هنا..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-6">
                <h3 className="text-xl font-bold text-[#dca826] text-center mb-2">شكوى من موظف معين (إن وجد)</h3>
                <p className="text-center text-slate-500 text-sm mb-6">هذا الجزء اختياري ويستخدم فقط في حالة وجود شكوى محددة من موظف.</p>
                
                <div className="space-y-2">
                  <label className="block text-navy font-bold text-sm">اسم الموظف</label>
                  <input 
                    type="text" 
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="ادخل اسم الموظف إن أمكن"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-navy font-bold text-sm">الرجاء شرح سبب الشكوى</label>
                  <textarea 
                    value={complaintReason}
                    onChange={(e) => setComplaintReason(e.target.value)}
                    rows={4}
                    placeholder="اشرح تفاصيل الموقف هنا..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-navy focus:outline-none focus:ring-2 focus:ring-[#dca826]/50 focus:border-[#dca826] transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Submit Button */}
          <div className="flex justify-center mt-10 mb-20">
            <button
              type="submit"
              className="bg-[#dca826] hover:bg-[#c99a22] text-white font-bold rounded-full px-16 py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              إرسال التقييم
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default EvaluatePerformance;
