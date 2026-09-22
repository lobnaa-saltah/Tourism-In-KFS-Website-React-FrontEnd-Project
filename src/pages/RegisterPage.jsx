import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero/PageHero';
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineBriefcase,
  HiOutlineIdentification,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineCamera,
  HiCheckCircle,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';

const fadeTab = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const TABS = [
  { id: 'personal', label: 'البيانات الشخصية', icon: HiOutlineUser },
  { id: 'account', label: 'بيانات الحساب', icon: HiOutlineShieldCheck },
  { id: 'identity', label: 'إثبات الهوية', icon: HiOutlineIdentification },
];

const Field = ({ label, required, children }) => (
  <div>
    <label className="block text-navy font-bold text-sm mb-2 text-right">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full border border-gray-200 rounded-xl py-3.5 px-4 text-navy font-bold placeholder-gray-300 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all duration-200 bg-[#fafafa]";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '', job: '',
    nationalId: '', password: '', confirmPassword: '',
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-cairo pb-24" dir="rtl">

      <PageHero title="إنشاء حساب جديد" subtitle="انضم إلى بوابتنا الرقمية للاستفادة من كافة الخدمات الإلكترونية." />

      {/* ── Wide & Spacious Form Card ── */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl pt-10">
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >

          {/* ── Tabs Navigation Bar ── */}
          <div className="bg-[#f8fafc] border-b border-gray-100 px-6 sm:px-10 pt-5 pb-0">
            <div className="flex items-center justify-start gap-4 overflow-x-auto no-scrollbar">
              {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2.5 px-7 py-4 rounded-t-2xl font-bold text-base transition-all duration-200 whitespace-nowrap cursor-pointer border-b-2 relative ${
                      isActive
                        ? 'bg-white text-navy border-gold shadow-sm'
                        : 'text-gray-400 border-transparent hover:text-navy hover:bg-white/60'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-gold' : 'text-gray-400'} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Tab Content Form ── */}
          <form onSubmit={handleSubmit} className="px-6 sm:px-12 py-10 min-h-[380px] flex flex-col justify-between">
            
            <AnimatePresence mode="wait">

              {/* ── TAB 1: البيانات الشخصية ── */}
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeTab}
                  className="space-y-7"
                >
                  {/* Profile Picture Upload Option — Avatar Circle + Select Button */}
                  <Field label="الصورة الشخصية (اختياري)">
                    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#fafafa] border border-gray-200">
                      {/* Avatar Circle Preview on Right */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full border-2 border-navy/20 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative group">
                          {avatarFile ? (
                            <img
                              src={URL.createObjectURL(avatarFile)}
                              alt="Avatar Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <HiOutlineUser className="text-navy/40" size={32} />
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-navy font-bold text-sm">
                            {avatarFile ? avatarFile.name : 'الصورة الشخصية للحساب'}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {avatarFile ? 'تم اختيار الصورة بنجاح' : 'JPG أو PNG بحجم أقصى 5 ميجابايت'}
                          </p>
                        </div>
                      </div>

                      {/* Select Button on Left */}
                      <label className="shrink-0 bg-navy hover:bg-navy/90 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow active:scale-[0.98]">
                        <span>{avatarFile ? 'تغيير الصورة' : 'اختر صورة'}</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png"
                          className="sr-only"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAvatarFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </Field>

                  <Field label="الاسم الكامل" required>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={set('fullName')}
                        placeholder="أدخل اسمك الرباعي كما هو في البطاقة"
                        className={inputCls}
                      />
                      <HiOutlineUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-300" size={20} />
                    </div>
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="البريد الإلكتروني">
                      <div className="relative">
                        <input
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          placeholder="example@mail.com"
                          dir="ltr"
                          className={inputCls}
                        />
                        <HiOutlineEnvelope className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-300" size={20} />
                      </div>
                    </Field>
                    <Field label="رقم الهاتف" required>
                      <div className="relative">
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="01xxxxxxxxx"
                          dir="ltr"
                          className={inputCls}
                        />
                        <HiOutlinePhone className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-300" size={20} />
                      </div>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="العنوان (كما هو مسجل بالبطاقة)">
                      <div className="relative">
                        <input
                          type="text"
                          value={form.address}
                          onChange={set('address')}
                          placeholder="المحافظة / المركز / القرية"
                          className={inputCls}
                        />
                        <HiOutlineMapPin className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-300" size={20} />
                      </div>
                    </Field>

                    <Field label="الوظيفة (اختياري)">
                      <div className="relative">
                        <input
                          type="text"
                          value={form.job}
                          onChange={set('job')}
                          placeholder="مثال: مهندس، طبيب، موظف حكومي..."
                          className={inputCls}
                        />
                        <HiOutlineBriefcase className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-300" size={20} />
                      </div>
                    </Field>
                  </div>
                </motion.div>
              )}

              {/* ── TAB 2: بيانات الحساب ── */}
              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeTab}
                  className="space-y-7"
                >
                  <Field label="الرقم القومي (14 رقم)" required>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={14}
                        value={form.nationalId}
                        onChange={(e) => setForm({ ...form, nationalId: e.target.value.replace(/\D/g, '') })}
                        placeholder="أدخل رقمك القومي المكون من 14 رقم"
                        dir="rtl"
                        className="w-full border border-gray-200 rounded-xl py-3.5 pr-12 pl-4 text-right text-navy font-bold placeholder-gray-300 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all bg-[#fafafa]"
                      />
                      <HiOutlineIdentification className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-300" size={22} />
                    </div>
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="كلمة المرور" required>
                      <div className="relative">
                        <input
                          type={showPass ? 'text' : 'password'}
                          value={form.password}
                          onChange={set('password')}
                          placeholder="••••••••"
                          dir="rtl"
                          className="w-full border border-gray-200 rounded-xl py-3.5 pr-12 pl-12 text-right text-navy font-bold placeholder-gray-300 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all bg-[#fafafa]"
                        />
                        <HiOutlineLockClosed className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-300" size={20} />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 hover:text-navy transition-colors"
                        >
                          {showPass ? <HiOutlineEye size={18} /> : <HiOutlineEyeSlash size={18} />}
                        </button>
                      </div>
                    </Field>

                    <Field label="تأكيد كلمة المرور" required>
                      <div className="relative">
                        <input
                          type={showConfirm ? 'text' : 'password'}
                          value={form.confirmPassword}
                          onChange={set('confirmPassword')}
                          placeholder="••••••••"
                          dir="rtl"
                          className="w-full border border-gray-200 rounded-xl py-3.5 pr-12 pl-12 text-right text-navy font-bold placeholder-gray-300 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all bg-[#fafafa]"
                        />
                        <HiOutlineLockClosed className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-300" size={20} />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 hover:text-navy transition-colors"
                        >
                          {showConfirm ? <HiOutlineEye size={18} /> : <HiOutlineEyeSlash size={18} />}
                        </button>
                      </div>
                    </Field>
                  </div>

                  <p className="text-gray-400 text-xs text-right leading-relaxed">
                    يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل مع حروف وأرقام ورموز.
                  </p>
                </motion.div>
              )}

              {/* ── TAB 3: إثبات الهوية ── */}
              {activeTab === 'identity' && (
                <motion.div
                  key="identity"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeTab}
                  className="space-y-8"
                >
                  <Field label="صورة واضحة من بطاقة الرقم القومي (وجه أمامي)" required>
                    <label className={`flex items-center justify-between gap-4 cursor-pointer ${inputCls} py-5 border-dashed border-2 hover:border-navy/40 transition-colors`}>
                      <div className="flex items-center gap-3 text-gray-500">
                        <HiOutlineCamera size={24} className="text-navy" />
                        <span className="text-sm font-medium">{idFile ? idFile.name : 'اختر صورة البطاقة الوطنية'}</span>
                      </div>
                      {idFile && <HiCheckCircle className="text-navy shrink-0" size={22} />}
                      <span className="shrink-0 bg-navy/10 hover:bg-navy/15 text-navy font-bold text-xs px-4 py-2 rounded-lg transition-colors">
                        اختر ملف
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        className="sr-only"
                        onChange={(e) => setIdFile(e.target.files[0])}
                      />
                    </label>
                    <p className="text-gray-400 text-xs mt-2 text-right">
                      سيتم استخدام هذه الصورة لمراجعة وتفعيل حسابك رسمياً. الأنواع المسموح بها: JPG، PNG.
                    </p>
                  </Field>

                  {/* Full Width Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-navy hover:bg-navy/90 text-white font-black py-4.5 rounded-xl transition-all flex items-center justify-center gap-2 text-base shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                    >
                      {loading ? (
                        <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      ) : (
                        <span>إنشاء الحساب الآن</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Bottom Login Nav Link */}
            <div className="border-t border-gray-100 pt-8 mt-10 text-center">
              <p className="text-gray-500 text-sm">
                لديك حساب بالفعل؟{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-navy font-bold hover:text-navy/70 transition-colors cursor-pointer"
                >
                  تسجيل الدخول
                </button>
              </p>
            </div>

          </form>
        </motion.div>
      </div>

    </div>
  );
};

export default RegisterPage;
