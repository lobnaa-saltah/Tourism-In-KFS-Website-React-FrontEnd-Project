import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaChevronDown, FaChevronUp, FaUser } from 'react-icons/fa';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

// ── بيانات السكرتير العام المساعد الحالي ────────────────────────────────────────────
const currentAssistant = {
  name: 'اللواء محمد منصور محمود شعير',
  title: 'سكرتير عام مساعد كفر الشيخ',
  image: '/images/governor.png',
  educationList: [
    'بكالوريوس علوم عسكرية من الكلية الحربية',
    'بكالوريوس تجارة جامعة عين شمس',
    'دبلومة في الموارد البشرية',
  ],
  experience: [
    'سكرتير عام مساعد جنوب سيناء.',
    'رئيس الوحدة المحلية لمدينة سفاجا',
    'رئيس الوحدة المحلية لمدينة نوبيع',
  ],
};

// ── أرشيف السكرتيرين العامين المساعدين السابقين ───────────────────────────────────────
const formerAssistants = [
  { name: 'اللواء عبد الغفار الديب', period: '2023 – 2024' },
  { name: 'اللواء ماهر هاشم', period: '2022 – 2023' },
  { name: 'المهندسة عايدة ماضي', period: '2021 – 2022' },
  { name: 'اللواء ياسر حفناوي', period: '2019 – 2021' },
  { name: 'السيد محمد أبو غنيمة', period: '2016 – 2019' },
  { name: 'المهندس مجدي عطا الله', period: '2014 – 2016' },
  { name: 'اللواء حسين الطاهر', period: '2013 – 2014' },
  { name: 'اللواء سعد عبد العظيم', period: '2008 – 2012' },
  { name: 'المهندس حافظ عيسوي', period: '2007 – 2008' },
  { name: 'المحاسب زكريا شريف', period: '2000 – 2007' },
  { name: 'السيد محمد الخولي', period: '1990 – 2000' },
  { name: 'السيد هارون مصطفى', period: '1983 – 1990' },
  { name: 'اللواء مصطفى شاهين', period: '1982 – 1983' },
  { name: 'المهندس أحمد كحيلو', period: '1980 – 1982' },
  { name: 'اللواء محمد عبد الغني', period: '1977 – 1980' },
  { name: 'السيد عبد الوهاب شكري', period: '1975 – 1977' },
  { name: 'السيد عبد المنعم رسلان', period: '1974 – 1975' },
  { name: 'السيد أحمد عبد الفتاح', period: '1972 – 1974' },
  { name: 'السيد محي الدين عبيد', period: '1971 – 1972' },
  { name: 'السيد محمود صابر', period: '1967 – 1971' },
  { name: 'السيد جمال محرز', period: '1965 – 1967' },
  { name: 'السيد يوسف طوقان', period: '1962 – 1965' },
  { name: 'السيد عبد الفتاح أحمد', period: '1961 – 1967' },
];

// ── مكون SectionBlock ────────────────────────────────────────────────────────
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

// ── بطاقة سكرتير مساعد سابق ───────────────────────────────────────────────────────
const FormerCard = ({ person, i }) => (
  <motion.div
    custom={i * 0.03}
    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
    className="group flex flex-col items-center gap-3 bg-white border border-gray-100 rounded-2xl p-5 hover:border-gold/40 hover:shadow-md transition-all duration-300 text-center"
  >
    <div className="w-20 h-20 rounded-full bg-navy/5 flex items-center justify-center border-2 border-gray-100 group-hover:border-gold transition-all duration-300">
      <FaUser className="text-navy/20 group-hover:text-gold transition-colors" size={24} />
    </div>
    <div>
      <p className="font-black text-navy text-sm leading-snug">{person.name}</p>
      <p className="text-gold text-xs font-bold mt-1">{person.period}</p>
    </div>
  </motion.div>
);

// ── الصفحة الرئيسية ──────────────────────────────────────────────────────────
const AssistantPage = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="bg-white min-h-screen font-cairo overflow-x-hidden">

      <PageHero title="سكرتير عام مساعد كفر الشيخ" subtitle="قيادات المحافظة" />

      {/* ── السكرتير العام المساعد الحالي ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-white border border-gray-100 rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">

              {/* الصورة */}
              <div className="lg:w-[340px] shrink-0">
                <img
                  src={currentAssistant.image}
                  alt={currentAssistant.name}
                  className="w-full h-full object-cover object-top max-h-[520px] lg:max-h-none"
                />
              </div>

              {/* المعلومات */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-start">

                <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-xs font-black px-3 py-1.5 rounded-full mb-5 self-start">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  السكرتير العام المساعد الحالي
                </span>

                <h2 className="text-2xl lg:text-3xl font-black text-navy mb-2">{currentAssistant.name}</h2>
                <p className="text-navy font-bold text-sm lg:text-base mb-6">{currentAssistant.title}</p>

                <SectionBlock icon={FaGraduationCap} title="المؤهلات" items={currentAssistant.educationList} />
                <SectionBlock icon={FaBriefcase} title="الخبرات" items={currentAssistant.experience} />

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── أرشيف السكرتيرين المساعدين السابقين ── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-gold font-bold text-sm mb-2 tracking-wide">عبر التاريخ</p>
            <h2 className="text-4xl font-black text-navy">الأرشيف التاريخي للسادة السكرتير العام المساعد السابقين</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {(showAll ? formerAssistants : formerAssistants.slice(0, 6)).map((person, i) => (
              <FormerCard key={i} person={person} i={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-navy text-white hover:bg-[#114357] px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>{showAll ? 'عرض أقل' : 'عرض الأرشيف كاملاً'}</span>
              {showAll ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AssistantPage;
