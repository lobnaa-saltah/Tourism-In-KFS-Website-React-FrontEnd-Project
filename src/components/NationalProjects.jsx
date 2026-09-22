import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { nationalProjectsData } from '../data/nationalProjects';

const NationalProjects = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section id="projects" className="section-padding bg-navy text-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-gold font-bold tracking-wide text-sm lg:text-base mb-3 block">
            الإنجازات الوطنية
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white font-cairo mb-4 leading-tight">
            مشروعات قومية عملاقة
          </h2>
          <p className="text-white/50 text-base">
            نستعرض أهم المشروعات التي تساهم في تحقيق النهضة الاقتصادية والاجتماعية في المحافظة.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-5 max-w-6xl mx-auto">
          {nationalProjectsData.map((project, index) => {
            const isMiddle = index === 1;
            return (
              <motion.div
                key={project.id}
                onClick={() => navigate(`/national-projects/${project.id}`, { state: { item: project } })}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="w-full lg:w-1/3 h-[400px] flex-shrink-0"
              >
                <motion.div
                  className="relative group rounded-3xl overflow-hidden cursor-pointer w-full h-full shadow-2xl"
                >
                  {/* Image - full visible */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover ${project.imagePosition || 'object-center'} transition-transform duration-700 group-hover:scale-[1.04]`}
                  />

                  {/* White shine ray on hover - top left */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-3xl z-20">
                    <div className="absolute -top-[100%] -left-[100%] w-12 h-[400%] bg-white/40 rotate-[35deg] blur-[4px] group-hover:translate-x-[1500px] transition-transform duration-[1200ms] ease-in-out" />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Text at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-gold text-navy text-[11px] font-black rounded-full">
                        {project.category}
                      </span>
                      {project.progress === 100 && (
                        <span className="flex items-center gap-1 text-green-400 text-[11px] font-bold bg-green-400/10 px-2 py-1 rounded-full">
                          <FaCheckCircle size={10} />
                          مكتمل
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <button className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-bold transition-colors duration-300">
                      <span>تفاصيل المشروع</span>
                      <FaExternalLinkAlt size={10} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NationalProjects;
