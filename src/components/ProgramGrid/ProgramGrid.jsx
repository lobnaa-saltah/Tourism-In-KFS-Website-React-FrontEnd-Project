import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProgramCard from '../ProgramCard/ProgramCard';
import './ProgramGrid.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const ProgramGrid = ({ programs, searchTerm = '' }) => {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let result = programs;

    if (filter === 'available') {
      result = result.filter((p) => p.available);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    return result;
  }, [programs, filter, searchTerm]);

  return (
    <section className="program-grid-section" aria-label="البرامج التدريبية">
      <div className="program-grid-section__container">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="program-grid-section__header"
        >
          <motion.h2 variants={fadeUp} className="program-grid-section__title">
            أحدث البرامج التدريبية
          </motion.h2>
          <motion.p variants={fadeUp} className="program-grid-section__subtitle">
            استعرض برامجنا التدريبية المتنوعة وسجل الآن لتطوير مهاراتك
          </motion.p>
        </motion.div>

        <div className="program-grid-section__filters">
          <button
            onClick={() => setFilter('all')}
            className={`program-grid-section__filter ${filter === 'all' ? 'program-grid-section__filter--active' : ''}`}
          >
            الكل ({programs.length})
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`program-grid-section__filter ${filter === 'available' ? 'program-grid-section__filter--active' : ''}`}
          >
            متاح للتسجيل ({programs.filter((p) => p.available).length})
          </button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="program-grid"
        >
          {filtered.map((program) => (
            <motion.div key={program.id} variants={fadeUp}>
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="program-grid-section__empty">
            <p>لا توجد برامج تدريبية تطابق البحث.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramGrid;
