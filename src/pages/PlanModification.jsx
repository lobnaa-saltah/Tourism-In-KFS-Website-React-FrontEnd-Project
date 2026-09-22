import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineInformationCircle,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineBanknotes,
  HiOutlineReceiptPercent,
  HiOutlineMagnifyingGlass,
  HiCheckCircle,
  HiOutlineCheckCircle,
  HiArrowLeft,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const TABS = [
  { id: 'definition', label: 'التعريف بالخدمة', Icon: HiOutlineInformationCircle },
  { id: 'documents', label: 'المستندات المطلوبة', Icon: HiOutlineDocumentText },
  { id: 'terms', label: 'الشروط والأحكام', Icon: HiOutlineShieldCheck },
];

const RequirementItem = ({ text }) => (
  <div className="flex items-center gap-3 bg-[#f8fafc] border border-gray-100 hover:border-navy/20 hover:bg-navy/5 p-4 rounded-2xl transition-all duration-200 group">
    <div className="w-8 h-8 rounded-xl bg-navy/10 flex items-center justify-center shrink-0 group-hover:bg-navy/15 transition-colors">
      <HiOutlineCheckCircle className="text-navy" size={18} />
    </div>
    <span className="text-gray-700 text-base font-bold leading-snug">{text}</span>
  </div>
);

const PlanModification = () => {
  const [activeTab, setActiveTab] = useState('definition');
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [requestCode, setRequestCode] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!requestCode.trim()) return;
    setTrackResult({
      code: requestCode,
      status: 'طلبك قيد المراجعة الفنية لدى قسم التخطيط العمراني.',
    });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-cairo overflow-x-hidden" dir="rtl">

      <PageHero title="طلب تعديل مخطط تفصيلي" subtitle="خدمة رقمية موثقة بالكامل — تقديم إلكتروني دون الحاجة لزيارة المركز" />

      {/* ── Main Content Grid ── */}
      <section className="container mx-auto px-4 lg:px-8 py-14 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* ── LEFT COL: Fees + Tracker ── */}
          <div className="lg:col-span-4 flex flex-col order-2 lg:order-1">

            {/* === FEES CARD === */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-3xl overflow-hidden shadow-xl border border-white/60 bg-white"
            >
              <div className="bg-navy px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center">
                    <HiOutlineBanknotes className="text-gold" size={20} />
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-sm leading-none">بيان الرسوم الفنية</p>
                    <p className="text-white/50 text-[11px] mt-0.5">المطالبة الرقمية المعتمدة</p>
                  </div>
                </div>
                <HiOutlineReceiptPercent className="text-gold/60" size={22} />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm font-bold">الرسم الفني</span>
                  <span className="text-navy font-black text-lg">500.00 ج.م</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm font-bold">ضريبة القيمة المضافة (14%)</span>
                  <span className="text-navy font-black text-lg">70.00 ج.م</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm font-bold">دمغة الشهداء</span>
                  <span className="text-navy font-black text-lg">5.00 ج.م</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 text-sm font-bold">مقابل المتابعة (SMS)</span>
                  <span className="text-navy font-black text-lg">10.00 ج.م</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-navy font-black text-sm">الإجمالي التقريبي</span>
                  <span className="text-gold font-black text-xl">585.00 ج.م</span>
                </div>
              </div>
            </motion.div>

            {/* === TRACKER CARD === */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-white/60 mt-6"
            >
              <div className="bg-navy px-6 py-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center">
                  <HiOutlineMagnifyingGlass className="text-gold" size={18} />
                </div>
                <div>
                  <p className="text-white font-black text-sm leading-none">تتبع الطلب</p>
                  <p className="text-white/50 text-[11px] mt-0.5">أدخل كود الطلب الخاص بك</p>
                </div>
              </div>

              <form onSubmit={handleTrack} className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="أدخل كود الطلب"
                  value={requestCode}
                  onChange={(e) => setRequestCode(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
                <button
                  type="submit"
                  className="w-full bg-navy hover:bg-navy-dark text-white font-black py-3 rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  بحث
                </button>
              </form>

              <AnimatePresence>
                {trackResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mx-6 mb-6 bg-gradient-to-l from-gold/10 to-gold/5 border border-gold/25 rounded-2xl p-4 text-right space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] bg-gold/20 text-gold font-bold px-2 py-0.5 rounded-full">قيد المعالجة</span>
                      <p className="text-xs font-bold text-navy">
                        كود الطلب: <span className="text-gold font-mono">{trackResult.code}</span>
                      </p>
                    </div>
                    <p className="text-gray-500 text-xs">
                      الحالة الراهنة: <span className="font-bold text-navy">{trackResult.status}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* ── RIGHT COL: Tabs ── */}
          <div className="lg:col-span-8 flex flex-col order-1 lg:order-2">

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-white/60 flex flex-col flex-1"
            >
              {/* Tab Bar */}
              <div className="bg-navy px-4 lg:px-6 flex items-center gap-1 overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 lg:px-5 py-4 text-xs lg:text-sm font-black transition-all duration-200 border-b-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-gold border-gold bg-white/5'
                        : 'text-white/50 border-transparent hover:text-white/80'
                    }`}
                  >
                    <tab.Icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 lg:p-8 flex-1">

                <AnimatePresence mode="wait">
                  {/* ── DEFINITION ── */}
                  {activeTab === 'definition' && (
                    <motion.div
                      key="definition"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-navy/10 flex items-center justify-center">
                          <HiOutlinePencilSquare className="text-navy" size={22} />
                        </div>
                        <div>
                          <h2 className="text-navy font-black text-lg">التعريف بالخدمة</h2>
                          <p className="text-gray-500 text-xs">نظرة عامة على الخدمة</p>
                        </div>
                      </div>

                      <div className="bg-navy/5 rounded-3xl p-6 lg:p-8 border border-navy/10">
                        <p className="text-gray-700 text-sm leading-relaxed font-medium">
                          خدمة تتيح للعميل تقديم طلب لتعديل أو تطوير المخطط التفصيلي للعقار
                          بما يتناسب مع احتياجاته والمتطلبات الهندسية والمعمارية، مع مراجعة
                          التعديلات المقترحة وتنفيذها بدقة لضمان أفضل استغلال للمساحات
                          وتحسين التصميم بشكل احترافي.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* ── DOCUMENTS ── */}
                  {activeTab === 'documents' && (
                    <motion.div
                      key="documents"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-navy/10 flex items-center justify-center">
                          <HiOutlineDocumentText className="text-navy" size={22} />
                        </div>
                        <div>
                          <h2 className="text-navy font-black text-lg">المستندات المطلوبة</h2>
                          <p className="text-gray-500 text-xs">الوثائق اللازمة لتقديم الطلب</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <RequirementItem text="صورة من بطاقة الرقم القومي سارية." />
                        <RequirementItem text="المخطط التفصيلي الأصلي للعقار." />
                        <RequirementItem text="المخططات والرسومات الهندسية للمقترح." />
                        <RequirementItem text="تقرير فني شامل يوضح التعديلات المطلوبة." />
                        <RequirementItem text="إيصال سداد رسوم المعاينة الفنية." />
                        <RequirementItem text="موافقة المكاتب الهندسية الاستشارية المعتمدة." />
                      </div>
                    </motion.div>
                  )}

                  {/* ── TERMS ── */}
                  {activeTab === 'terms' && (
                    <motion.div
                      key="terms"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-navy/10 flex items-center justify-center">
                          <HiOutlineShieldCheck className="text-navy" size={22} />
                        </div>
                        <div>
                          <h2 className="text-navy font-black text-lg">الشروط والأحكام</h2>
                          <p className="text-gray-500 text-xs">الضوابط القانونية الواجبة</p>
                        </div>
                      </div>

                      <div className="bg-navy/5 rounded-3xl p-6 lg:p-8 border border-navy/10 space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">1</span>
                          <p className="text-gray-700 text-sm font-medium">يلتزم مقدم الطلب بصحة كافة البيانات المذكورة في الطلب.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
                          <p className="text-gray-700 text-sm font-medium">يتم حساب المقابل بناءً على الفئات المعتمدة بالمحافظة والمساحة الفعلية.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">3</span>
                          <p className="text-gray-700 text-sm font-medium">المقابل المدفوع لا تُسترد في حال البدء في المعاينة الميدانية.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">4</span>
                          <p className="text-gray-700 text-sm font-medium">يجب أن تكون التعديلات مطابقة للاشتراطات البنائية والتخطيطية المعتمدة.</p>
                        </div>
                      </div>

                      {/* Agreement Checkbox */}
                      <div className="mt-6 flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="agree"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="w-5 h-5 rounded-lg border-gray-300 text-navy focus:ring-navy/20 cursor-pointer"
                        />
                        <label htmlFor="agree" className="text-gray-700 text-sm font-bold cursor-pointer">
                          أوافق على جميع الشروط والأحكام المذكورة أعلاه
                        </label>
                      </div>

                      <button
                        onClick={() => navigate('/login')}
                        disabled={!agreed}
                        className={`mt-6 w-full font-black py-3.5 rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 ${
                          agreed
                            ? 'bg-navy hover:bg-navy-dark text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <HiCheckCircle size={18} />
                        تقديم الطلب
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

            {/* Back Button */}
            <div className="mt-6">
              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-2 text-navy hover:text-gold font-black text-sm transition-colors duration-200"
              >
                <HiArrowLeft size={16} />
                العودة إلى الخدمات
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default PlanModification;
