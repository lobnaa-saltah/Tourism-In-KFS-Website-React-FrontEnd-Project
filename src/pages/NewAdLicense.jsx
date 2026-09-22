import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineCalculator,
  HiOutlineInformationCircle,
  HiOutlineDocumentText,
  HiArrowRight,
  HiLockClosed,
} from 'react-icons/hi2';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const NewAdLicense = () => {
  const navigate = useNavigate();

  const feeItems = [
    { label: 'سعر المتر الأساسي:', amount: '0.00' },
    { label: 'مقابل استغلال المكان:', amount: '0.00' },
    { label: 'تأمين (10.00%):', amount: '0.00' },
    { label: 'ضريبة (14%):', amount: '0.00' },
    { label: 'طابع الشهداء + SMS:', amount: '15.00' },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-cairo overflow-x-hidden pb-20" dir="rtl">

      <PageHero title="إصدار ترخيص إعلان جديد" subtitle={null} />

      {/* ── Main Details Grid Section ── */}
      <section className="container mx-auto px-4 lg:px-8 py-10 max-w-6xl">

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/services/private-property-ads')}
            className="inline-flex items-center gap-2 text-navy hover:text-gold font-bold text-sm bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow"
          >
            <HiArrowRight size={16} />
            <span>العودة لصفحة التراخيص</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* ── LEFT COLUMN: Fee Estimation Card (تقدير المقابل) ── */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg flex flex-col justify-between flex-1"
            >
              {/* Header */}
              <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-center gap-2 text-center shrink-0">
                <HiOutlineCalculator className="text-gold" size={22} />
                <h3 className="text-navy font-black text-lg">تقدير المقابل</h3>
              </div>

              {/* Fee Items */}
              <div className="p-6 text-right flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {feeItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs py-1 border-b border-dashed border-gray-100 last:border-0">
                      <span className="text-navy font-bold tabular-nums text-sm">
                        {item.amount}
                      </span>
                      <span className="text-gray-500 font-semibold">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Required Banner */}
                <div className="mt-6 bg-[#162a36] rounded-2xl p-5 text-center shadow-inner">
                  <p className="text-gray-300 text-xs font-bold mb-1">
                    إجمالي المبلغ المطلوب
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-black text-gold tabular-nums tracking-tight">
                      15.00
                    </span>
                    <span className="text-gold font-bold text-xs">ج.م</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Service Description & Digital Application Form ── */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">

            {/* Top Card: Description */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-md text-right"
            >
              <p className="text-gray-700 leading-loose text-sm lg:text-base font-normal">
                تتيح هذه الخدمة للمنشآت التجارية والأفراد التقدم بطلب للحصول على ترخيص جديد لوضع إعلان (لافته، شاشه، أو إعلان تجاري) وفقاً للضوابط الهندسة والمعايير الجمالية المعتمدة. تهدف الخدمة إلى تنظيم المشهد البصري في المحافظة وضمان سلامة الإعلانات المثبتة.
              </p>
            </motion.div>

            {/* Bottom Card: Digital Application Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 text-center overflow-hidden"
            >
              {/* Top Accent Line (Visible on Hover only) */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <h2 className="text-xl lg:text-2xl font-black text-navy mb-1">
                استمارة تقديم الطلب الرقمية
              </h2>
              <p className="text-gray-400 text-xs font-semibold mb-8">
                نظام الربط الإلكتروني المباشر بمركز المتغيرات المكانية
              </p>

              {/* Login Prompt Banner */}
              <div className="bg-[#fef9c3] border border-gold/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 max-w-xl mx-auto shadow-sm">
                <p className="text-navy font-bold text-base">
                  يرجى تسجيل الدخول لتتمكن من تقديم الطلب.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-navy hover:bg-navy/90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer hover:shadow-lg"
                >
                  <HiLockClosed size={16} />
                  <span>تسجيل الدخول</span>
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default NewAdLicense;
