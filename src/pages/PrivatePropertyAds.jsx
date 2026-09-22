import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineMap,
  HiOutlineBookOpen,
  HiOutlinePencilSquare,
  HiPlus,
  HiArrowPath,
  HiArrowLeft,
} from 'react-icons/hi2';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const PrivatePropertyAds = () => {
  const navigate = useNavigate();

  const relatedServices = [
    { name: 'الخدمات المكانية', icon: HiOutlineMap, link: '/services/spatial' },
    { name: 'استدامة للتدريب والتطوير', icon: HiOutlineBookOpen, link: '/services/training' },
    { name: 'طلب تعديل مخطط تفصيلي', icon: HiOutlinePencilSquare, link: '/services/masterplan' },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-cairo overflow-x-hidden pb-20" dir="rtl">

      <PageHero title="ترخيص الإعلانات (علي أملاك خاصة)" subtitle={null} />

      {/* ── Main Details Grid Section ── */}
      <section className="container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT SIDEBAR: Related Services ── */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
            >
              <h3 className="text-navy font-black text-lg mb-4 pb-3 border-b border-gray-100 text-right">
                خدمات ذات صلة
              </h3>
              <div className="space-y-3">
                {relatedServices.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      onClick={() => item.link && navigate(item.link)}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gold/10 border border-gray-100 hover:border-gold/30 transition-all duration-200 cursor-pointer group"
                    >
                      <span className="text-navy font-bold text-sm group-hover:text-navy transition-colors">
                        {item.name}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                        <Icon size={18} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT MAIN CARD: Description & Features ── */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-md text-right space-y-6"
            >
              <p className="text-gray-700 leading-loose text-base font-normal">
                تعد خدمة <span className="font-bold text-navy">"تراخيص الإعلانات"</span> هي البوابة الرسمية لتنظيم كافة الأنشطة الإعلانية داخل النطاق الجغرافي للمحافظة. تهدف هذه الخدمة إلى الحفاظ على المظهر الحضاري والجمالي للمدن، وضمان التزام كافة اللافتات والشاشات الإعلانية بمعايير السلامة الإنشائية والضوابط القانونية المعمول بها.
              </p>

              <p className="text-gray-700 leading-loose text-base font-normal">
                من خلال هذه المنصة، يمكن للمنشآت التجارية، الشركات، والأفراد التقدم بطلبات استخراج تراخيص جديدة، أو تجديد التراخيص القائمة، أو تعديل مواصفات الإعلانات، مع الاستفادة من نظام تسعير عادل يعتمد على الموقع الجغرافي ونوع النشاط، وذلك لضمان شفافية الإجراءات وسرعة الحصول على الموافقات.
              </p>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xl font-black text-navy mb-5">
                  أبرز مزايا الخدمة:
                </h3>
                <ul className="space-y-4 pr-2">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-navy mt-2.5 shrink-0" />
                    <p className="text-gray-700 leading-relaxed text-base">
                      <span className="font-black text-navy">التنظيم الحضري:</span> حماية النسيج البصري للمدينة من التلوث البصري والإعلانات العشوائية.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-navy mt-2.5 shrink-0" />
                    <p className="text-gray-700 leading-relaxed text-base">
                      <span className="font-black text-navy">نظام تسعير شفاف:</span> احتساب دقيق للرسوم بناءً على الفئات المكانية والضوابط المعتمدة.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-navy mt-2.5 shrink-0" />
                    <p className="text-gray-700 leading-relaxed text-base">
                      <span className="font-black text-navy">سهولة التتبع:</span> متابعة حالة الطلب إلكترونياً من مرحلة المعاينة الميدانية وحتى إصدار الترخيص.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-navy mt-2.5 shrink-0" />
                    <p className="text-gray-700 leading-relaxed text-base">
                      <span className="font-black text-navy">الامتثال القانوني:</span> ضمان وضع الإعلانات في أماكن آمنة لا تعوق حركة المرور أو تؤثر على سلامة المنشآت.
                    </p>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── Sub-Services Section (الخدمات الفرعية المتاحة) ── */}
      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-navy/5 text-navy font-bold text-xs px-3.5 py-1 rounded-full mb-2.5 border border-navy/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            الخدمات المتاحة إلكترونياً
          </span>
          <h2 className="text-xl lg:text-2xl font-bold text-navy mb-2">
            الخدمات الفرعية المتاحة
          </h2>
          <p className="text-gray-500 text-xs md:text-sm max-w-xl mx-auto">
            اختر المعاملة المطلوبة للبدء في تقديم الطلب مباشرة عبر البوابة الرقمية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Sub Service 1: إصدار ترخيص إعلان جديد */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            onClick={() => navigate('/services/private-property-ads/new-license')}
            className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-1"
          >
            {/* Top Accent Line (Visible on Hover only) */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shadow-md group-hover:bg-gold group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <HiPlus size={20} strokeWidth={2.5} />
                </div>
                <span className="bg-gold/10 text-gold font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-gold/20">
                  متاح إلكترونياً ⚡
                </span>
              </div>

              <h3 className="text-base lg:text-lg font-bold text-navy transition-colors mb-2 text-right">
                إصدار ترخيص إعلان جديد
              </h3>

              <p className="text-gray-500 text-xs leading-relaxed text-right mb-5">
                تقديم طلب إصدار ترخيص لإعلان أو لافتة جديدة على الواجهات والأملاك الخاصة واستيفاء كافة المواصفات الفنية والهندسية.
              </p>
            </div>

            <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between text-navy font-bold text-xs group-hover:text-gold transition-colors">
              <span className="flex items-center gap-1.5">
                <span>بدء تقديم الطلب</span>
                <HiArrowLeft size={15} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
              </span>
              <span className="text-[11px] text-gray-400 font-normal">استجابة خلال 48 ساعة</span>
            </div>
          </motion.div>

          {/* Sub Service 2: تجديد ترخيص إعلان قائم */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            onClick={() => navigate('/services/private-property-ads/renew-license')}
            className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-1"
          >
            {/* Top Accent Line (Visible on Hover only) */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shadow-md group-hover:bg-gold group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <HiArrowPath size={20} strokeWidth={2.5} />
                </div>
                <span className="bg-navy/5 text-navy font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-navy/10">
                  تجديد فوري 🔄
                </span>
              </div>

              <h3 className="text-base lg:text-lg font-bold text-navy transition-colors mb-2 text-right">
                تجديد ترخيص إعلان قائم
              </h3>

              <p className="text-gray-500 text-xs leading-relaxed text-right mb-5">
                تجديد ترخيص الإعلانات واللافتات القائمة المسجلة سابقاً وتحديث البيانات الفنية ودفع الرسوم المقررة قبل انتهاء الترخيص.
              </p>
            </div>

            <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between text-navy font-bold text-xs group-hover:text-gold transition-colors">
              <span className="flex items-center gap-1.5">
                <span>تجديد الترخيص الآن</span>
                <HiArrowLeft size={15} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
              </span>
              <span className="text-[11px] text-gray-400 font-normal">ترخيص ممتد</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PrivatePropertyAds;
