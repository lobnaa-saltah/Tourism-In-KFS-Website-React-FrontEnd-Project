import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const deputy = {
  name: 'الدكتور عمرو مجدي البشبيشي',
  title: 'نائب المحافظ',
  image: '/images/governor.png',
  qualifications: [
    '2024: دكتوراه في الحقوق – كلية الحقوق جامعة طنطا – رسالة بعنوان "دور الإدارة المحلية في تحقيق الاستقرار السياسي للدولة"',
    '2012: ماجستير في القانون العام كلية الحقوق جامعة طنطا',
    '2011: دبلومة العلوم القضائية كلية الحقوق جامعة طنطا',
    '2010: دبلومة التحكيم الدولي كلية الحقوق جامعة طنطا',
    '2010: ليسانس حقوق كلية الحقوق جامعة طنطا',
  ],
  training: [
    '2024: القيادة العامة والحوكمة من كلية الخدمة المدنية بدولة سنغافورة بالتعاون مع الأكاديمية الوطنية للتدريب',
    '2020: برنامج تدريب الساحة لنواب المحافظين',
    '2018: البرنامج الرئاسي لتأهيل التنفيذيين للقيادة EPLP',
    '2017: إدارة استمرارية الأعمال إدارة الأزمات',
    '2016: البرنامج الرئاسي لتأهيل الشباب للقيادة PLP',
  ],
  experience: [
    'نوفمبر 2019 حتى تاريخه: نائب محافظ كفر الشيخ',
    'يناير 2019 حتى نوفمبر 2019: رئيس عمل بالمكتب الفني لقطاع التدريب – الأكاديمية الوطنية للتدريب',
    'أغسطس 2013 حتى يناير 2019: باحث قانوني بمكتب محافظ كفر الشيخ',
  ],
};

const SectionBlock = ({ icon: Icon, title, items, delay = 0 }) => (
  <motion.div
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    className="mb-8"
  >
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
  </motion.div>
);

const DeputyPage = () => {
  return (
    <div className="bg-white min-h-screen font-cairo overflow-x-hidden">

      <PageHero title="نائب محافظ كفر الشيخ" subtitle="قيادات المحافظة" />

      {/* ── Profile Card ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">

              {/* ── الصورة ── */}
              <div className="lg:w-[340px] shrink-0">
                <img
                  src={deputy.image}
                  alt={deputy.name}
                  className="w-full h-full object-cover object-top max-h-[520px] lg:max-h-none"
                />
              </div>

              {/* ── المعلومات ── */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-start overflow-y-auto">

                {/* Badge */}
                <span className="inline-flex items-center gap-2 bg-gold/10 text-gold text-xs font-black px-3 py-1.5 rounded-full mb-5 self-start">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  {deputy.title}
                </span>

                {/* الاسم */}
                <h2 className="text-2xl lg:text-3xl font-black text-navy mb-8">{deputy.name}</h2>

                {/* المؤهلات */}
                <SectionBlock
                  icon={FaGraduationCap}
                  title="المؤهلات"
                  items={deputy.qualifications}
                  delay={0.1}
                />

                {/* الدورات التدريبية */}
                <SectionBlock
                  icon={FaChalkboardTeacher}
                  title="الدورات التدريبية"
                  items={deputy.training}
                  delay={0.2}
                />

                {/* الخبرات */}
                <SectionBlock
                  icon={FaBriefcase}
                  title="الخبرات"
                  items={deputy.experience}
                  delay={0.3}
                />

              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default DeputyPage;
