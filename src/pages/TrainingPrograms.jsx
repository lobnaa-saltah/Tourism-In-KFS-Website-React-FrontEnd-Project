import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const programs = [
  { id: 1, title: 'إدارة الاجتماعات الاحترافية',           desc: 'برنامج تدريبي متخصص لتطوير مهارات إدارة الاجتماعات والتواصل الفعال',             img: '/brain-images/training_event_1.png' },
  { id: 2, title: 'الذكاء الاصطناعي وتطوير العمل الحكومي', desc: 'برنامج تدريبي حول تطبيقات الذكاء الاصطناعي في البيئات الحكومية',             img: '/brain-images/training_program_ai.png' },
  { id: 3, title: 'تشغيل ومراقبة الحملات الميكانيكية',     desc: 'تدريب شامل على تشغيل ومراقبة المعدات والميكانيكا في البلديات',             img: '/brain-images/training_program_mechanical.png' },
  { id: 4, title: 'تصميم الجرافيك',                        desc: 'تعلم أساسيات وتقنيات التصميم الجرافيكي باستخدام أحدث البرامج',             img: '/brain-images/training_event_2.png' },
  { id: 5, title: 'تطوير الويب Full Stack',                 desc: 'برنامج متكامل لتعلم تطوير تطبيقات الويب من الواجهة الأمامية إلى الخلفية',  img: '/brain-images/training_event_3.png' },
  { id: 6, title: 'مدرب الحساب الذهني',                    desc: 'برنامج تدريبي لتطوير مهارات الحساب السريع والتفكير الرياضي',              img: '/brain-images/training_event_1.png' },
  { id: 7, title: 'ICDL',                                   desc: 'الشهادة الدولية لمحترفي الحاسوب - مهارات الأساس في تكنولوجيا المعلومات',  img: '/brain-images/training_event_2.png' },
  { id: 8, title: 'دورة اللغة الإنجليزية',                desc: 'برنامج تعليمي لتطوير مهارات اللغة الإنجليزية للموظفين الحكوميين',         img: '/brain-images/training_event_3.png' },
  { id: 9, title: 'دورة البرمجة',                          desc: 'تعلم أساسيات البرمجة وتطوير التطبيقات باستخدام لغات متعددة',             img: '/brain-images/training_program_ai.png' },
];

const TrainingPrograms = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen font-cairo overflow-x-hidden" dir="rtl">

      <PageHero
        title="جميع البرامج التدريبية"
        subtitle="استعرض برامجنا التدريبية المتنوعة وسجّل الآن لتطوير مهاراتك وتعزيز كفاءتك المهنية"
      />



      {/* ── Programs Grid ── */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {programs.map((prog) => (
              <motion.div
                key={prog.id}
                variants={fadeUp}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1 text-right">
                  <h3 className="text-navy font-black text-base mb-2 leading-snug">{prog.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-5">{prog.desc}</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-navy hover:bg-gold text-white font-black py-3 rounded-xl text-sm transition-all duration-300"
                  >
                    التسجيل في البرنامج
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default TrainingPrograms;
