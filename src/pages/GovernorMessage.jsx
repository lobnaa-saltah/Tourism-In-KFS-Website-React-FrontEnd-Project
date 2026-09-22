import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaQuoteRight } from 'react-icons/fa';
import PageHero from '../components/PageHero/PageHero';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const GovernorMessage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f8fafc] min-h-screen font-cairo overflow-x-hidden pb-16">
      
      <PageHero title={t('governor_message.title', 'كلمة السيد المحافظ')} subtitle="المهندس إبراهيم عبد القادر مكي محجوب" />

      {/* ── Content Card ── */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', damping: 25 }}
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 max-w-6xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            
            {/* Right: Governor Portrait Image */}
            <div className="w-full lg:w-[280px] shrink-0 flex flex-col items-center">
              <div className="relative group w-full rounded-2xl overflow-hidden shadow-lg border-4 border-gray-50 transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src="/images/governor_new.jpg" 
                  alt="المهندس إبراهيم عبد القادر مكي محجوب"
                  className="w-full h-full object-cover object-top" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-base font-black text-gold mt-4 text-center">
                {t('governor_message.role', 'محافظ كفر الشيخ')}
              </h3>
            </div>

            {/* Left: Message Text */}
            <div className="flex-1 flex flex-col gap-4">
              
              <div className="text-gold opacity-30 self-start">
                <FaQuoteRight size={28} />
              </div>

              <div className="text-navy/80 text-sm leading-relaxed space-y-4 text-justify">
                <p>
                  {t('governor_message.p1', 'نرحب بكم في الموقع الرسمي لمحافظة كفر الشيخ، ويسعدنا أن نطور هذه المنصة الإلكترونية لتكون وسيلتكم المفضلة للاطلاع على خدماتنا وما يحدث على أرض المحافظة من أخبار ومشروعات، وكذلك الحصول على خدماتكم بكل يسر، سواء من خلالنا أو من خلال اتصال المنصة بمنصات التواصل الأخرى.')}
                </p>
                <p>
                  {t('governor_message.p2', 'ونؤكد لكم حرصنا المستمر على تطوير خدماتنا على الموقع الإلكتروني وتطوير محتواه حتى يلبي تطلعاتكم ويضمن لكم تجربة مميزة وثرية في كل مرة تتصفحون فيها موقعنا، تخاطب المنصة المواطن والمستثمر والسائح وكل راغب في المعرفة عن محافظتنا.')}
                </p>
                <p>
                  {t('governor_message.p3', 'آملين أن نصبو ونرتقي بمحافظتنا لتكون واحدة من أفضل المحافظات الرائدة في تحقيق الاستدامة وجودة الحياة، وأكثرها جذباً لراغبي العمل، السياحة، والاستثمار.')}
                </p>
                <p>
                  {t('governor_message.p4', 'وأخيراً، نؤكد اعتزازنا بكم كركيزة أساسية في تحقيق التنمية والدعم في تنفيذ رؤية مصر 2030 على أرض محافظتنا، ولدينا المزيد لنقدمه لكم، كما يسعدنا أن نتلقى ملاحظاتكم واقتراحاتكم عبر المنصة أو وسائل تواصلنا، والتي بلا شك ستفيدنا في الارتقاء بجودة خدماتنا، شاكرين تواصلكم معنا.')}
                </p>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-navy font-black text-lg">
                  {t('governor_message.signature', 'المهندس إبراهيم عبد القادر مكي محجوب')}
                </p>
              </div>

            </div>

          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default GovernorMessage;
