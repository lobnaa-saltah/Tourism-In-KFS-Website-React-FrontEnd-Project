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

const FEES = [
  { label: 'المقابل الفني', amount: '400.00' },
  { label: 'ضريبة القيمة المضافة (14%)', amount: '56.00', plus: true },
  { label: 'دمغة الشهداء', amount: '5.00' },
  { label: 'مقابل المتابعة (SMS)', amount: '10.00' },
];

const UtilitiesRequest = () => {
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
      status: 'طلبك قيد المراجعة الفنية لدى إدارة المرافق والمعاينات.',
    });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-cairo overflow-x-hidden" dir="rtl">

      <PageHero title="طلب توصيل مرافق" subtitle="خدمة رقمية موثقة بالكامل — تقديم إلكتروني دون الحاجة لزيارة المركز" />

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

              <div className="bg-white px-6 py-4 divide-y divide-gray-100">
                {FEES.map(({ label, amount, plus }, i) => (
                  <div key={i} className="flex items-center justify-between py-3 group">
                    <span className="text-navy font-bold text-sm tabular-nums tracking-tight">
                      {plus ? '+\u00a0' : ''}{amount}
                      <span className="text-[10px] font-bold text-gray-400 mr-1">ج.م</span>
                    </span>
                    <span className="text-gray-500 text-xs font-medium text-right">{label}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#f4f7f9] px-6 py-4 flex items-center justify-between border-t border-gray-100">
                <div>
                  <span className="text-2xl font-black text-navy tabular-nums tracking-tight">471.00</span>
                  <span className="text-gray-400 font-bold text-xs mr-1">ج.م</span>
                </div>
                <div className="text-right">
                  <p className="text-navy font-black text-sm leading-snug">الإجمالي الكلي</p>
                  <p className="text-gray-400 text-[11px] font-semibold">شامل كافة الرسوم والضرائب</p>
                </div>
              </div>
            </motion.div>

            {/* === TRACKER CARD === */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-white/60 flex flex-col flex-1 mt-6"
            >
              <div className="bg-gradient-to-l from-navy/95 to-navy px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <HiOutlineMagnifyingGlass className="text-gold" size={20} />
                </div>
                <div className="text-right">
                  <p className="text-white font-black text-sm leading-none">تتبع حالة طلبك</p>
                  <p className="text-white/50 text-[11px] mt-0.5">أدخل كود المعاملة للاستعلام</p>
                </div>
              </div>

              <div className="px-6 py-5 flex-1 flex flex-col justify-between">
                <form onSubmit={handleTrack} className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={requestCode}
                    onChange={(e) => setRequestCode(e.target.value)}
                    placeholder="كود الشهادة / الطلب"
                    className="w-full bg-[#f5f7fa] border border-gray-200 rounded-2xl py-3 px-4 text-center text-navy font-bold placeholder-gray-400 text-sm focus:outline-none focus:border-gold focus:bg-white transition-all duration-200"
                    dir="ltr"
                  />
                  <button
                    type="submit"
                    className="w-full bg-navy hover:bg-navy/90 text-white font-bold py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer hover:shadow-lg active:scale-[0.98]"
                  >
                    <span>استعلام عن الطلب</span>
                    <HiArrowLeft size={16} />
                  </button>
                </form>

                <AnimatePresence>
                  {trackResult && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 bg-gradient-to-l from-gold/10 to-gold/5 border border-gold/25 rounded-2xl p-4 text-right space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] bg-gold/20 text-gold font-bold px-2 py-0.5 rounded-full">قيد المعالجة</span>
                        <p className="text-xs font-bold text-navy">كود الطلب: <span className="text-gold font-mono">{trackResult.code}</span></p>
                      </div>
                      <p className="text-gray-500 text-xs">الحالة الراهنة: <span className="font-bold text-navy">{trackResult.status}</span></p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT COL: Service Details Tabs ── */}
          <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-white/60 flex flex-col flex-1"
            >
              <div className="bg-[#f8fafc] border-b border-gray-100 px-6 pt-5 pb-0">
                <div className="flex gap-1 overflow-x-auto">
                  {TABS.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-bold text-sm transition-all duration-200 whitespace-nowrap cursor-pointer border-b-2 ${
                        activeTab === id
                          ? 'bg-white text-navy border-gold shadow-sm'
                          : 'text-gray-400 border-transparent hover:text-navy hover:bg-white/60'
                      }`}
                    >
                      <Icon size={18} className={activeTab === id ? 'text-gold' : ''} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 lg:px-8 py-6 flex-1 flex flex-col justify-between" dir="rtl">
                <AnimatePresence mode="wait">
                  {activeTab === 'definition' && (
                    <motion.div
                      key="definition"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center shrink-0">
                          <HiOutlineInformationCircle className="text-gold" size={24} />
                        </div>
                        <div>
                          <h3 className="text-navy font-black text-lg mb-1">نبذة عن الخدمة</h3>
                          <p className="text-gray-400 text-xs">خدمة تقديم طلبات توصيل المرافق إلكترونياً</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-l from-blue-50 to-indigo-50/50 rounded-2xl p-5 mb-6">
                        <p className="text-gray-700 leading-loose text-base">
                          هي خدمة المعاينة بالإحداثيات والتسجيل علي قواعد البيانات المركزية والإفادة بوثيقة معلومات مؤمنة موضحاً بها بيانات الموقع من حيث موقف الحيز العمراني والرصد في منظومة المتغيرات المكانية ومناطق الإشتراطات والحظر وبيانات أخري.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'مدة المعالجة', value: '3–5 أيام عمل' },
                          { label: 'نوع الخدمة', value: 'رقمية بالكامل' },
                          { label: 'الجهة المختصة', value: 'مركز كفر الشيخ' },
                          { label: 'إمكانية التتبع', value: 'إلكترونية (SMS)' },
                        ].map(({ label, value }, i) => (
                          <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                            <p className="text-gray-400 text-[11px] font-bold mb-1">{label}</p>
                            <p className="text-navy font-black text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'documents' && (
                    <motion.div
                      key="documents"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shrink-0">
                          <HiOutlineDocumentText className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="text-navy font-black text-lg mb-1">المستندات المطلوبة</h3>
                          <p className="text-gray-400 text-xs">يرجى التأكد من توافر المستندات الرسمية المحددة</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          'صورة الرقم القومي.',
                          'أحد المستندات الأتية (مكلفة -صورة نموذج قبول التصالح - صورة رخصة- خطاب من الوحدة المحلية يفيد أن المنزل غير مخالف وقبل قانون البناء الموحد)',
                        ].map((doc, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-[#f8fafc] border border-gray-100 hover:border-gold/30 hover:bg-gold/5 p-4 rounded-2xl transition-all duration-200 group">
                            <div className="w-8 h-8 rounded-xl bg-gold/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold/25 transition-colors">
                              <HiCheckCircle className="text-gold" size={18} />
                            </div>
                            <span className="text-gray-700 text-base font-bold leading-relaxed pt-0.5">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'terms' && (
                    <motion.div
                      key="terms"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-navy/10 border border-navy/20 flex items-center justify-center shrink-0">
                          <HiOutlineShieldCheck className="text-navy" size={24} />
                        </div>
                        <div>
                          <h3 className="text-navy font-black text-lg mb-1">الشروط والأحكام</h3>
                          <p className="text-gray-400 text-xs">يُرجى الاطلاع على الشروط التخطيطية قبل التقديم</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          'يجب أن يكون الموقع داخل الحيز العمراني المعتمد لمحافظة كفر الشيخ.',
                        ].map((term, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-[#f8fafc] border border-gray-100 hover:border-navy/20 hover:bg-navy/5 p-4 rounded-2xl transition-all duration-200 group">
                            <div className="w-8 h-8 rounded-xl bg-navy/10 flex items-center justify-center shrink-0 group-hover:bg-navy/15 transition-colors">
                              <HiOutlineCheckCircle className="text-navy" size={18} />
                            </div>
                            <span className="text-gray-700 text-base font-bold leading-snug">{term}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── Full-Width CTA Section ── */}
      <section className="w-full bg-white border-t-2 border-gold/40 py-12 lg:py-16 px-4 text-center shadow-sm">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl lg:text-3xl font-black text-navy mb-3">جاهز للبدء في تقديم الطلب؟</h3>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
            يقر مقدم الطلب باطلاعه على الشروط والأحكام الفنية السابقة وصحة البيانات التي سيدلي بها.
          </p>

          <label className="inline-flex items-center gap-3 cursor-pointer select-none mb-8">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 accent-navy rounded cursor-pointer"
            />
            <span className="text-navy font-bold text-base">
              أوافق على جميع الشروط والأحكام
            </span>
          </label>

          <div>
            <button
              disabled={!agreed}
              onClick={() => navigate('/login')}
              className={`w-full sm:w-auto min-w-[280px] px-10 py-4 rounded-full font-bold text-base transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-md ${
                agreed
                  ? 'bg-navy hover:bg-navy/90 text-white cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>انتقل لصفحة التسجيل</span>
              <HiArrowLeft size={20} />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default UtilitiesRequest;
