import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineIdentification,
  HiOutlineLockClosed,
} from 'react-icons/hi2';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div
      className="min-h-screen bg-[#f0f4f8] font-cairo flex flex-col items-center justify-center px-4"
      style={{ paddingTop: '100px', paddingBottom: '60px' }}
      dir="rtl"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full max-w-lg"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Card Header */}
          <div className="bg-navy px-8 py-7 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-4 border border-gold/30">
              <HiOutlineLockClosed className="text-gold" size={28} />
            </div>
            <h1 className="text-white font-black text-xl leading-snug">تسجيل الدخول إلى البوابة</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">

            {/* National ID */}
            <div>
              <label className="block text-navy font-bold text-sm mb-1.5 text-right">الرقم القومي</label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={14}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                  placeholder="أدخل رقمك القومي المكون من 14 رقم"
                  dir="rtl"
                  className="w-full border border-gray-200 rounded-xl py-3.5 pr-11 pl-4 text-right text-navy font-bold placeholder-gray-300 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all bg-[#fafafa]"
                />
                <HiOutlineIdentification className="absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-300" size={20} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-navy font-bold text-sm mb-1.5 text-right">كلمة المرور</label>
              <div className="relative mb-1.5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="rtl"
                  className="w-full border border-gray-200 rounded-xl py-3.5 pr-11 pl-11 text-right text-navy font-bold placeholder-gray-300 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all bg-[#fafafa]"
                />
                {/* Lock icon on right */}
                <HiOutlineLockClosed className="absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-300" size={20} />
                {/* Eye icon on left */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-400 hover:text-navy transition-colors"
                >
                  {showPassword ? <HiOutlineEye size={18} /> : <HiOutlineEyeSlash size={18} />}
                </button>
              </div>

              {/* Forgot password link directly under input */}
              <div className="text-right mb-3">
                <button type="button" className="text-navy text-xs font-bold hover:text-navy/70 transition-colors">
                  هل نسيت كلمة المرور؟
                </button>
              </div>
            </div>

            {/* Remember me checkbox on the right */}
            <div className="flex justify-start">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${
                    remember ? 'bg-navy border-navy' : 'border-gray-300 hover:border-navy/60 bg-white'
                  }`}
                >
                  {remember && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-600 text-sm font-medium">تذكرني</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy hover:bg-navy/90 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <span>تسجيل الدخول</span>
              )}
            </button>

            {/* Register link */}
            <div className="border-t border-gray-100 pt-5 text-center">
              <p className="text-gray-500 text-sm">
                ليس لديك حساب؟{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-navy font-bold hover:text-navy/70 transition-colors cursor-pointer"
                >
                  أنشئ حسابًا جديدًا
                </button>
              </p>
            </div>

          </form>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginPage;
