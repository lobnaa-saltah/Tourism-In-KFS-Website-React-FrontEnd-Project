import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero/PageHero';
import { FaChevronDown, FaChevronUp, FaUser, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

// ── بيانات المحافظ الحالي ───────────────────────────────────────────────────
const currentGovernor = {
  name: 'المهندس إبراهيم عبد القادر مكي محجوب',
  title: 'رئيس مجلس إدارة الشركة المصرية القابضة للبتروكيماويات',
  image: '/images/governor_new.jpg',
  educationList: [
    'بكالوريوس الهندسة الكيميائية – جامعة الإسكندرية 1991.',
  ],
  positions: [
    'رئيس مجلس إدارة - الشركة المصرية القابضة للبتروكيماويات ديسمبر 2022.',
    'رئيس مجلس الإدارة والعضو المنتدب - شركة مصر لإنتاج الأسمدة موبكو.',
    'رئيس مجلس الإدارة والعضو المنتدب - الشركة المصرية لإنتاج الألكيل البنزين الخطي إيالب.',
    'تولى منصب مساعد رئيس - الشركة للإنتاج في شركة إيالب.',
    'شغل عدة مناصب قيادية في شركة المشروعات البترولية والاستشارات الفنية إيبروم، من بينها مدير عام العمليات ومدير عام الشئون الفنية.',
    'في عام 2004، انضم إلى الشركة المصرية لإنتاج الألكيل البنزين الخطي إيالب بإدارة العمليات.',
    'بدأ مسيرته المهنية عام 1992 في شركة البتروكيماويات المصرية، وتدرج في المناصب حتى أصبح رئيس قطاع الشؤون الفنية - أكثر من 30 عاماً من الخبرة في قطاع البتروكيماويات والأسمدة.',
  ],
};

// ── أرشيف المحافظين السابقين ────────────────────────────────────────────────
const formerGovernors = [
  { name: 'اللواء الدكتور علاء إبراهيم عبدالمعطي', period: '2024 – 2026', image: '/images/alaa_abdelmoaty.png' },
  { name: 'اللواء جمال نورالدين', period: '2019 – 2024' },
  { name: 'دكتور إسماعيل طه', period: '2018 – 2019' },
  { name: 'اللواء السيد نصر', period: '2015 – 2018' },
  { name: 'دكتور أسامة حمدي', period: '2015 – 2015' },
  { name: 'المستشار محمد عجوة', period: '2013 – 2015' },
  { name: 'اللواء أحمد زكي عابدين', period: '2008 – 2012' },
  { name: 'اللواء صلاح سلامه', period: '2004 – 2008' },
  { name: 'المستشار محمد بدبدي', period: '2002 – 2004' },
  { name: 'المستشار علي عبد الشكور', period: '2001 – 2002' },
  { name: 'المستشار حسين مصطفى', period: '1999 – 2001' },
  { name: 'مستشار محمود أبو الليل', period: '1996 – 1999' },
  { name: 'السيد محمد القاضي', period: '1991 – 1996' },
  { name: 'المستشار ماهر الجندي', period: '1991 – 1991' },
  { name: 'المهندس نبيل حلاوة', period: '1983 – 1991' },
  { name: 'الدكتور محمد شتله', period: '1981 – 1983' },
  { name: 'السيد عبد الرشيد منصور', period: '1980 – 1981' },
  { name: 'اللواء محمد سلامه', period: '1978 – 1980' },
  { name: 'السيد محي أبو شادي', period: '1976 – 1978' },
  { name: 'السيد حسين الريحاني', period: '1971 – 1976' },
  { name: 'السيد محمد رفاعي', period: '1971 – 1971' },
  { name: 'السيد إبراهيم بغدادي', period: '1967 – 1971' },
  { name: 'السيد محمود حماد', period: '1965 – 1967' },
  { name: 'السيد أحمد حمدي عبيد', period: '1960 – 1965' },
];

// ── مكون SectionBlock مشترك ────────────────────────────────────────────
const SectionBlock = ({ icon: Icon, title, items }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-navy shrink-0" size={20} />
      <h3 className="font-black text-navy text-xl">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
          <span className="w-2.5 h-2.5 rounded-full bg-navy shrink-0 mt-1.5" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// ── بطاقة محافظ سابق ────────────────────────────────────────────────────────
const FormerCard = ({ gov, i }) => (
  <motion.div
    custom={i * 0.03}
    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
    className="group flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-5 hover:border-gold/40 hover:shadow-md transition-all duration-300 text-center"
  >
    {gov.image ? (
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-gold transition-all duration-300">
        <img src={gov.image} alt={gov.name} className="w-full h-full object-cover object-top" />
      </div>
    ) : (
      <div className="w-20 h-20 rounded-full bg-navy/5 flex items-center justify-center border-2 border-gray-100 group-hover:border-gold transition-all duration-300">
        <FaUser className="text-navy/20 group-hover:text-gold transition-colors" size={24} />
      </div>
    )}
    <div>
      <p className="font-black text-navy text-sm leading-snug">{gov.name}</p>
      <p className="text-gold text-xs font-bold mt-1 dir-ltr">{gov.period}</p>
    </div>
  </motion.div>
);

// ── الصفحة الرئيسية ──────────────────────────────────────────────────────────
const GovernorPage = () => {
  const [bioOpen, setBioOpen] = useState(false);
  const [showAllGovernors, setShowAllGovernors] = useState(false);

  return (
    <div className="bg-white min-h-screen font-cairo overflow-x-hidden">

      <PageHero title="محافظ كفر الشيخ" subtitle="قيادات المحافظة" />

      {/* ── المحافظ الحالي ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-white border border-gray-100 rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* صورة */}
              <div className="lg:w-[340px] shrink-0">
                <img
                  src={currentGovernor.image}
                  alt={currentGovernor.name}
                  className="w-full h-full object-cover object-top max-h-[480px] lg:max-h-none"
                />
              </div>

              {/* المعلومات */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-start">
                <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-xs font-black px-3 py-1.5 rounded-full mb-5 self-start">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  المحافظ الحالي
                </span>
                <h2 className="text-2xl lg:text-3xl font-black text-navy mb-2">{currentGovernor.name}</h2>
                <p className="text-navy font-bold text-sm lg:text-base mb-6">{currentGovernor.title}</p>

                <SectionBlock
                  icon={FaGraduationCap}
                  title="المؤهلات"
                  items={currentGovernor.educationList}
                />
                <SectionBlock
                  icon={FaBriefcase}
                  title="المناصب القيادية"
                  items={currentGovernor.positions}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── أرشيف المحافظين السابقين ── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-gold font-bold text-sm mb-2 tracking-wide">عبر التاريخ</p>
            <h2 className="text-4xl font-black text-navy">الأرشيف التاريخي للسادة المحافظ السابقين</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {(showAllGovernors ? formerGovernors : formerGovernors.slice(0, 6)).map((gov, i) => (
              <FormerCard key={i} gov={gov} i={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllGovernors(!showAllGovernors)}
              className="inline-flex items-center gap-2 bg-navy text-white hover:bg-[#114357] px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>{showAllGovernors ? 'عرض أقل' : 'عرض الأرشيف كاملاً'}</span>
              {showAllGovernors ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GovernorPage;
