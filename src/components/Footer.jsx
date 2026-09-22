import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt, FaShieldAlt } from 'react-icons/fa';


const Footer = () => {
  const { t, i18n } = useTranslation();

  const footerLinks = {
    gov: [
      { name: t('footer.links.egypt_portal', 'بوابة مصر الرقمية'), url: 'https://digital.gov.eg' },
      { name: t('footer.links.cabinet', 'رئاسة مجلس الوزراء'), url: 'https://cabinet.gov.eg' },
      { name: t('footer.links.vision', 'رؤية مصر 2030'), url: 'https://mped.gov.eg' },
      { name: t('footer.links.complaints', 'الشكاوى الحكومية'), url: 'https://shakwa.eg' },
    ],
    services: [
      { name: t('nav.services'), path: '/services' },
      { name: t('nav.investments'), path: '/investments' },
      { name: t('nav.tourism'), path: '/tourism' },
      { name: t('nav.news'), path: '/news' },
    ],
    governorate: [
      { name: t('nav.about'), path: '/about' },
      { name: t('nav.projects'), path: '/projects' },
      { name: t('nav.media'), path: '/media' },
      { name: t('nav.contact'), path: '/contact' },
    ]
  };

  const socialIcons = [
    { Icon: FaFacebook, href: "#" },
    { Icon: FaTwitter, href: "#" },
    { Icon: FaYoutube, href: "#" },
    { Icon: FaInstagram, href: "#" },
  ];

  return (
    <footer className="bg-navy pt-16 pb-6 text-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royal/10 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20 z-0"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Brand Top Section */}
        <div className="flex flex-col items-center justify-center gap-8 mb-10 text-center">
          <div className="w-full flex flex-col items-center">
            <Link to="/" className="flex items-center justify-center gap-3 mb-5">
              <img src="/images/logo/kfslogo.jpg" alt="KFS Logo" className="w-16 h-16 rounded-full border-2 border-gold/30" />
              <div className="text-right">
                <h2 className="font-bold text-xl leading-tight">{i18n.language === 'ar' ? 'محافظة كفر الشيخ' : 'Kafr El Sheikh'}</h2>
                <p className="text-gold text-[10px] font-bold tracking-widest uppercase">{t('footer.portal', 'البوابة الرقمية الموحدة')}</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-lg mx-auto text-center">
              {t('footer.desc', 'المنصة الرقمية الرسمية لمحافظة كفر الشيخ لتوفير كافة الخدمات الحكومية والمعلوماتية للمواطنين والمستثمرين والزوار وفقاً لرؤية مصر 2030.')}
            </p>
            <div className="flex justify-center gap-4">
              {socialIcons.map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="pt-4 pb-12 mb-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Emergency Card */}
            <div className="group flex items-center gap-5 bg-white/[0.03] hover:bg-white/[0.08] p-6 rounded-3xl transition-all duration-500 w-full md:w-1/3 border border-white/5 hover:border-gold/30 shadow-lg cursor-default relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 shrink-0 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-inner relative z-10">
                <FaPhone size={22} />
              </div>
              <div className="relative z-10">
                <p className="text-xs text-white/40 uppercase font-bold mb-1 tracking-wider">{t('footer.emergency', 'الطوارئ')}</p>
                <p className="text-2xl font-black text-white group-hover:text-gold transition-colors duration-300" dir="ltr">19000</p>
              </div>
            </div>
            
            {/* Email Card */}
            <div className="group flex items-center gap-5 bg-white/[0.03] hover:bg-white/[0.08] p-6 rounded-3xl transition-all duration-500 w-full md:w-1/3 border border-white/5 hover:border-gold/30 shadow-lg cursor-default relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 shrink-0 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-inner relative z-10">
                <FaEnvelope size={22} />
              </div>
              <div className="relative z-10">
                <p className="text-xs text-white/40 uppercase font-bold mb-1 tracking-wider">{t('footer.email', 'البريد الإلكتروني')}</p>
                <p className="text-base font-bold text-white group-hover:text-gold transition-colors duration-300">portal@kfs.gov.eg</p>
              </div>
            </div>
            
            {/* Address Card */}
            <div className="group flex items-center gap-5 bg-white/[0.03] hover:bg-white/[0.08] p-6 rounded-3xl transition-all duration-500 w-full md:w-1/3 border border-white/5 hover:border-gold/30 shadow-lg cursor-default relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 shrink-0 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-inner relative z-10">
                <FaMapMarkerAlt size={22} />
              </div>
              <div className="relative z-10">
                <p className="text-xs text-white/40 uppercase font-bold mb-1 tracking-wider">{t('footer.address', 'العنوان')}</p>
                <p className="text-sm font-bold text-white leading-relaxed group-hover:text-gold transition-colors duration-300">{t('footer.address_val', 'ديوان عام المحافظة، كفر الشيخ، مصر')}</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gold/30 flex justify-center items-center">
          <p className="text-white/40 text-xs text-center leading-relaxed">
            {t('footer.copyright', '© 2026 جميع الحقوق محفوظة للبوابة الرقمية الموحدة لمحافظة كفر الشيخ.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


