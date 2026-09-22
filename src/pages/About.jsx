import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../components/PageHero/PageHero';
import {
  FaBook, FaRunning, FaNewspaper, FaFlask, FaPalette,
  FaShieldAlt, FaPray, FaFlag, FaStar, FaAward, FaMoneyBillWave,
  FaChevronDown, FaChevronUp, FaLeaf, FaIndustry, FaMosque, FaHistory,
  FaEye, FaEnvelope, FaTree, FaCoins, FaTools
} from 'react-icons/fa';

// ─── Data ─────────────────────────────────────────────────────────────────────

const historyAccordion = [
  { id: 1,  icon: <FaBook />,         title: 'الآداب والعلوم الإنسانية',   names: ['أحمد لطفي السيد', 'طه حسين', 'محمود مختار', 'محيي الدين حسب الله'] },
  { id: 2,  icon: <FaRunning />,       title: 'الرياضة والثقافة البدنية',   names: ['رمضان الشيخ', 'محمد صالح', 'خالد مسعود'] },
  { id: 3,  icon: <FaNewspaper />,     title: 'الصحافة والإعلام',           names: ['إبراهيم عيسى', 'محمود عوض'] },
  { id: 4,  icon: <FaFlask />,         title: 'العلوم والتكنولوجيا',        names: ['د. أحمد زويل', 'د. مصطفى السيد'] },
  { id: 5,  icon: <FaPalette />,       title: 'الفنون',                     names: ['سيد مكاوي', 'محمد الكحلاوي', 'سيد درويش'] },
  { id: 6,  icon: <FaShieldAlt />,     title: 'القيادات الأمنية',           names: ['اللواء أحمد خليل', 'اللواء محمد عبد الحميد'] },
  { id: 7,  icon: <FaPray />,          title: 'رجال الدين',                 names: ['الشيخ إبراهيم الدسوقي', 'الشيخ طلحة أبو سعيد'] },
  { id: 8,  icon: <FaFlag />,          title: 'القيادات السياسية',          names: ['الوزير محمد رشاد', 'المحافظ السابق جمال البكري'] },
  { id: 9,  icon: <FaStar />,          title: 'القيادات العسكرية',          names: ['الفريق أول محمد الشحات'] },
  { id: 10, icon: <FaAward />,         title: 'القيادات القانونية',         names: ['المستشار أحمد مكي'] },
  { id: 11, icon: <FaMoneyBillWave />, title: 'ريادة الأعمال',             names: ['المهندس سامي عبد العزيز', 'د. محمود الرفاعي'] },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d } }),
};

// ─── Accordion ────────────────────────────────────────────────────────────────

const AccordionItem = ({ item, open, toggle }) => (
  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open ? 'border-gold/50 shadow-lg shadow-gold/10' : 'border-slate-200'}`}>
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between px-6 py-5 text-right bg-slate-50 hover:bg-slate-100 transition-colors"
    >
      <div className="flex items-center gap-4">
        <span className={`text-lg transition-colors ${open ? 'text-gold' : 'text-navy/30'}`}>{item.icon}</span>
        <span className="font-bold text-navy text-lg">{item.title}</span>
      </div>
      <span className={`text-sm transition-colors ${open ? 'text-gold' : 'text-navy/30'}`}>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </button>

    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 pt-2 flex flex-wrap gap-3 bg-white">
            {item.names.map((name, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-navy/80 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 hover:border-gold/30 hover:bg-gold/5 transition-all whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const About = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openInfo, setOpenInfo] = useState(null);

  return (
    <div className="bg-white min-h-screen font-cairo overflow-x-hidden">

      <PageHero
        title="كفر الشيخ"
        subtitle="حكاية عراقة تمتد عبر الأزمنة، وأرض خصبة تحمل إرث الحضارات وطموح المستقبل."
        stats={[
          { value: '+4M',  label: 'نسمة' },
          { value: '3470', label: 'كم² مساحة' },
          { value: '11',   label: 'مركزًا إدارياً' },
        ]}
      />
      {/* ── هوية ورؤية المحافظة ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-12 text-center"
          >
            <p className="text-gold font-bold text-sm mb-2 tracking-wide">تعرف على المحافظة</p>
            <h2 className="text-2xl font-black text-navy">هوية ورؤية المحافظة</h2>
          </motion.div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {[
              {
                id: 'history',
                icon: <FaHistory />,
                title: 'نبذة تاريخية عن محافظة كفر الشيخ',
                content: 'تقع محافظة كفر الشيخ ضمن الإطار الجغرافي للإقليم السادس من أقاليم مصر السفلى، المعروف قديماً باسم "خاسو" تم "اكسوز" باليونانية. وتضم كفر الشيخ العديد من المواقع والتلال الأثرية، حيث كانت مدينة "نوبو" عاصمة لمصر السفلى ومقر حكام الشمال قبل توحيد مصر. ومن "خاسو" خرج ملوك الأسرة الرابعة عشرة، وبرزت مدينة فوة كمدينة تجارية مهمة في العصور الإسلامية. وفي سنة 1960 صدر قرار جمهوري بتغيير اسمها من مديرية كفر الشيخ إلى محافظة كفر الشيخ.',
              },
              {
                id: 'naming',
                icon: <FaMosque />,
                title: 'سبب تسمية محافظة كفر الشيخ',
                content: 'تعود تسمية المحافظة إلى الشيخ طلحة أبي سعيد بن مدين التلمساني، وهو أحد علماء أهل السنة والجماعة ومن أعلام التصوف السني في القرن السابع الهجري. استقر بالمنطقة قادماً من المغرب عام 600 هـ، فأطلقوا عليها اسم "كفر الشيخ طلحة"، ومن ثم اختُصر الاسم إلى "كفر الشيخ".',
              },
              {
                id: 'vision',
                icon: <FaEye />,
                title: 'رؤية المحافظة',
                content: 'محافظة كفرالشيخ تسعى لغذاء مصر ومركز الإنتاج والتصنيع والتصدير الزراعي والسمكي.',
              },
              {
                id: 'mission',
                icon: <FaEnvelope />,
                title: 'رسالة المحافظة',
                content: 'تسعى المحافظة أن تكون محافظة حديثة ومتطورة، توفر فرص العمل والتنمية المستدامة لجميع سكانها، وذلك باستغلال مواردها الطبيعية بشكل مستدام وتحقيق رؤية مصر 2030.',
              },
            ].map((item) => (
              <motion.div
                key={item.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openInfo === item.id ? 'border-gold/50 shadow-lg shadow-gold/10' : 'border-slate-200'}`}>
                  <button
                    onClick={() => setOpenInfo(openInfo === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-right bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-lg transition-colors ${openInfo === item.id ? 'text-gold' : 'text-navy/30'}`}>{item.icon}</span>
                      <span className="font-bold text-navy text-lg">{item.title}</span>
                    </div>
                    <span className={`text-sm transition-colors ${openInfo === item.id ? 'text-gold' : 'text-navy/30'}`}>
                      {openInfo === item.id ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openInfo === item.id && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 bg-white">
                          <p className="text-gray-600 leading-relaxed text-[15px]">{item.content}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ما تمتاز به كفر الشيخ ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-14 text-center"
          >
            <p className="text-gold font-bold text-sm mb-2 tracking-wide">مميزات المحافظة</p>
            <h2 className="text-2xl font-black text-navy">ما تمتاز به كفر الشيخ</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaTree size={22} />,
                title: 'الموارد الطبيعية',
                desc: 'تقع على ساحل البحر المتوسط وبمحاذاة بحيرة البرلس. تحتوي على مساحات واسعة من الرمال السوداء الغنية بمعادن التيتانيوم والزركونيوم، إلى جانب الأراضي الزراعية الخصبة التي تُنتج القطن والقمح والسمسم.',
              },
              {
                icon: <FaCoins size={22} />,
                title: 'الموارد الاقتصادية',
                desc: 'تُعد من أبرز المحافظات الرائدة في إنتاج الأسماك وصناعة السكر والغزل والنسيج. تلعب بحيرة البرلس والبحر المتوسط دوراً محورياً في الأمن الغذائي لمصر.',
              },
              {
                icon: <FaTools size={22} />,
                title: 'الصناعات والحرف',
                desc: 'تشتهر بصناعات الأسماك واستخلاص السكر من البنجر، والصناعات الغذائية والجلدية، والسجاد والمنسوجات، فضلاً عن الصناعات الملاحية وبناء المراكب بمدينة البلس.',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                custom={i * 0.1}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="group border border-gray-100 rounded-2xl p-7 hover:border-gold/30 hover:shadow-lg transition-all duration-400"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-navy/5 flex items-center justify-center text-navy group-hover:bg-gold group-hover:text-white transition-all duration-300 shrink-0">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-black text-navy">{card.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ رموز أضاءت تاريخ المحافظة (Accordion – unchanged) ══ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-gold font-bold tracking-wide text-sm block mb-3">أعلام المحافظة</span>
            <h2 className="text-2xl font-black text-navy">رموز أضاءت تاريخ المحافظة</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto items-start">
            <div className="space-y-3">
              {historyAccordion.filter((_, idx) => idx % 2 === 0).map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i * 0.05}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                >
                  <AccordionItem
                    item={item}
                    open={openAccordion === item.id}
                    toggle={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  />
                </motion.div>
              ))}
            </div>
            <div className="space-y-3">
              {historyAccordion.filter((_, idx) => idx % 2 !== 0).map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i * 0.05}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                >
                  <AccordionItem
                    item={item}
                    open={openAccordion === item.id}
                    toggle={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
