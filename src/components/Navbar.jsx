import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, Search, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileLeadersOpen, setMobileLeadersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aboutOpen, setAboutOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isSolid = scrolled || location.pathname !== '/';
  const langRef = useRef(null);
  const aboutRef = useRef(null);
  const moreRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAboutOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { 
      name: t('nav.about'), 
      path: '/about',
      dropdown: [
        { name: t('nav.about_sub.info', 'عن المحافظة'), path: '/about' },
        { name: t('nav.about_sub.message', 'كلمة المحافظ'), path: '/about/message' },
        { 
          name: t('nav.about_sub.leaders', 'قيادات المحافظة'), 
          path: '/about/leaders',
          subDropdown: [
            { name: t('nav.leaders.governor', 'المحافظ'), path: '/about/leaders/governor' },
            { name: t('nav.leaders.deputy', 'نائب المحافظ'), path: '/about/leaders/deputy' },
            { name: t('nav.leaders.secretary', 'السكرتير العام'), path: '/about/leaders/secretary' },
            { name: t('nav.leaders.assistant', 'السكرتير العام المساعد'), path: '/about/leaders/assistant' },
          ]
        },
        { name: t('nav.about_sub.map', 'خريطة المحافظة'), path: '/about/map' },
      ]
    },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.investments'), path: '/investments' },
    { name: t('nav.tourism'), path: '/tourism' },
    { name: t('nav.directory', 'دليل الهاتف'), path: '/directory' },
    { name: t('nav.contact'), path: '/contact' },
    { name: t('nav.submit_proposal', 'تقديم مقترح'), path: '/submit-proposal' },
    { name: t('nav.submit_complaint', 'تقديم شكوي أو بلاغ'), path: '/submit-complaint' },
    { name: t('nav.evaluate_performance', 'تقييم مستوى أداء الخدمات'), path: '/evaluate-performance' },
  ];

  const languages = [
    { code: 'ar', name: 'العربية', dir: 'rtl' },
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'fr', name: 'Français', dir: 'ltr' },
    { code: 'de', name: 'Deutsch', dir: 'ltr' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isSolid ? 'bg-white shadow-lg py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <div className="relative group">
            <img
              src="/images/logo/kfslogo.jpg"
              alt="KFS Logo"
              className={`rounded-full object-cover transition-all duration-500 w-12 h-12 border-2 ${isSolid ? 'border-gold/20' : 'border-white/20'} group-hover:border-gold`}
            />
          </div>
          <div className={`flex flex-col ${isSolid ? 'hidden lg:flex' : 'flex'}`}>
            <h1 className={`font-bold leading-tight transition-colors duration-500 text-xl ${isSolid ? 'text-navy' : 'text-white'}`}>
              {t('footer.governorate_title', 'محافظة كفر الشيخ')}
            </h1>
            <p className={`text-sm tracking-[0.2em] font-black uppercase ${
              isSolid ? 'text-gold' : 'text-gold'
            }`}>
              {t('footer.portal_subtitle', 'البوابة الذكية')}
            </p>
          </div>
        </Link>

        {/* Desktop Links - Centralized */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.slice(0, 6).map((link) => (
            <div 
              key={link.path} 
              className="relative group/nav" 
              ref={link.dropdown ? aboutRef : null}
            >
              {link.dropdown ? (
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className={`flex items-center gap-1 text-base font-bold transition-all hover:text-gold relative cursor-pointer ${
                    isSolid ? 'text-navy' : 'text-white'
                  } ${isActive(link.path) ? 'text-gold' : ''}`}
                >

                  {link.name}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${aboutOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 text-base font-bold transition-all hover:text-gold relative ${
                    isSolid ? 'text-navy' : 'text-white'
                  } ${isActive(link.path) ? 'text-gold' : ''}`}
                >

                  {link.name}
                </Link>
              )}

              {/* First Level Dropdown */}
              {link.dropdown && (
                <div className={`absolute top-full mt-2 right-0 w-56 bg-white shadow-2xl rounded-2xl border border-gray-100 p-2 z-[70] transition-all duration-300 ${
                  aboutOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}>
                  {link.dropdown.map((subLink) => (
                    <div key={subLink.path} className="relative group/sub">
                      {subLink.subDropdown ? (
                        <>
                          <button
                            className="flex items-center justify-between px-4 py-3 text-sm text-navy hover:bg-gold/10 hover:text-gold rounded-xl transition-colors font-medium w-full text-right cursor-pointer"
                          >
                            <span>{subLink.name}</span>
                            <ChevronDown size={14} className={`-rotate-90 ${i18n.dir() === 'rtl' ? 'rotate-90' : '-rotate-90'}`} />
                          </button>
                        </>
                      ) : (
                        <Link
                          to={subLink.path}
                          onClick={() => setAboutOpen(false)}
                          className="flex items-center justify-between px-4 py-3 text-sm text-navy hover:bg-gold/10 hover:text-gold rounded-xl transition-colors font-medium"
                        >
                          {subLink.name}
                        </Link>
                      )}

                      {/* Second Level Dropdown (Sub-menu) */}
                      {subLink.subDropdown && (
                        <div className={`absolute top-0 ${i18n.dir() === 'rtl' ? 'right-full mr-2' : 'left-full ml-2'} w-56 bg-white shadow-2xl rounded-2xl opacity-0 translate-x-2 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:translate-x-0 group-hover/sub:pointer-events-auto transition-all duration-300 border border-gray-100 p-2 z-[80]`}>
                          {subLink.subDropdown.map((deepLink) => (
                            <Link
                              key={deepLink.path}
                              to={deepLink.path}
                              onClick={() => setAboutOpen(false)}
                              className="block px-4 py-3 text-sm text-navy hover:bg-gold/10 hover:text-gold rounded-xl transition-colors font-medium"
                            >
                              {deepLink.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* More Dropdown */}
          <div className="relative" ref={moreRef}>
            <button 
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1 text-base font-bold hover:text-gold transition-colors cursor-pointer ${
                isSolid ? 'text-navy' : 'text-white'
              }`}
            >
              {t('nav.more', 'المزيد')} <ChevronDown size={14} className={`transition-transform duration-300 ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute top-full mt-2 right-0 min-w-max bg-white shadow-xl rounded-xl border border-gray-100 p-2 transition-all duration-300 z-50 ${
              moreOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}>
              {navLinks.slice(6).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMoreOpen(false)}
                  className="block px-4 py-2.5 text-sm text-navy hover:bg-gold/10 hover:text-gold rounded-lg transition-colors font-medium whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-4">
          <button 
            onClick={() => setSearchOpen(true)}
            className={`p-2 rounded-lg transition-colors ${
              isSolid ? 'bg-gray-100 text-navy' : 'bg-white/10 text-white'
            } hover:bg-gold hover:text-white cursor-pointer`}
          >
            <Search size={20} />
          </button>
          <button 
            className={`p-2 rounded-lg transition-colors ${
              isSolid ? 'bg-gray-100 text-navy' : 'bg-white/10 text-white'
            } hover:bg-gold hover:text-white cursor-pointer`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button 
            onClick={() => setSearchOpen(true)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              isSolid ? 'bg-gray-100 text-navy' : 'bg-white/10 text-white'
            } hover:bg-gold hover:text-white cursor-pointer`}
          >
            <Search size={20} />
          </button>

          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-2 px-4 h-10 rounded-lg border transition-all ${
                isSolid 
                  ? 'border-gray-200 text-navy bg-white hover:bg-gold hover:border-gold hover:text-white' 
                  : 'border-white/20 text-white bg-white/10 hover:bg-gold hover:border-gold hover:text-white'
              }`}
            >
              <Globe size={18} />
              <span className="text-sm font-bold">{currentLang.name}</span>

              <ChevronDown size={14} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 right-0 w-36 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100 z-[60]"
                >
                  {languages.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="w-full px-4 py-2.5 text-sm text-navy hover:bg-gold/10 hover:text-gold transition-colors text-right font-cairo block"
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: i18n.dir() === 'rtl' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: i18n.dir() === 'rtl' ? 100 : -100 }}
            className="fixed inset-0 top-[72px] bg-white z-[40] flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.path} className="flex flex-col">
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                        className="text-2xl font-bold text-navy py-4 border-b border-gray-50 flex items-center justify-between group"
                      >
                        {link.name}
                        <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-all ${mobileAboutOpen ? 'bg-gold rotate-180' : ''}`}>
                          <ChevronDown size={16} className={mobileAboutOpen ? 'text-white' : 'text-gold'} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {mobileAboutOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gray-50/50 rounded-2xl px-4"
                          >
                            {link.dropdown.map(sub => (
                              <div key={sub.path} className="flex flex-col">
                                {sub.subDropdown ? (
                                  <>
                                    <button
                                      onClick={() => setMobileLeadersOpen(!mobileLeadersOpen)}
                                      className="text-lg font-bold text-navy/80 py-4 flex items-center justify-between border-b border-white/50"
                                    >
                                      {sub.name}
                                      <ChevronDown size={14} className={`transition-transform ${mobileLeadersOpen ? 'rotate-180 text-gold' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                      {mobileLeadersOpen && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden pl-4 flex flex-col"
                                        >
                                          {sub.subDropdown.map(deep => (
                                            <Link
                                              key={deep.path}
                                              to={deep.path}
                                              onClick={() => setIsOpen(false)}
                                              className="text-base font-medium text-gray-600 py-3 border-b border-white/20 last:border-0"
                                            >
                                              {deep.name}
                                            </Link>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                ) : (
                                  <Link
                                    to={sub.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-bold text-navy/80 py-4 border-b border-white/50 last:border-0"
                                  >
                                    {sub.name}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-bold text-navy py-4 border-b border-gray-50 flex items-center justify-between group"
                    >
                      {link.name}
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gold transition-colors">
                        <ChevronDown className="-rotate-90 text-gold group-hover:text-white" size={16} />
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-8 flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Globe className="text-gold" />
                  <span className="font-bold text-navy">{t('nav.language', 'اللغة')}</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  {languages.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${i18n.language === lang.code ? 'bg-gold text-white shadow-lg' : 'bg-white text-navy border border-gray-100'}`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              <button className="w-full py-4 bg-navy text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                <Phone size={20} />
                <span>{t('nav.emergency_call', 'اتصال الطوارئ')} 19000</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Full-screen Search Overlay matching the exact design */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-navy-dark/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-6"
          >
            {/* Close button */}
            <button 
              onClick={() => setSearchOpen(false)}
              className="absolute top-6 left-6 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all duration-300 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Search container */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl text-center flex flex-col items-center"
            >
              {/* Gold Heading */}
              <h2 className="text-3xl md:text-5xl font-extrabold text-gold font-cairo mb-4 drop-shadow-md">
                ما الذي تبحث عنه؟
              </h2>
              
              {/* Description */}
              <p className="text-white/80 text-sm md:text-lg mb-10 font-medium max-w-xl leading-relaxed">
                ابحث في أخبار، خدمات، ومشروعات محافظة كفر الشيخ
              </p>

              {/* Pill Search Input Bar */}
              <div className="relative w-full max-w-2xl bg-white rounded-full p-1.5 flex items-center shadow-2xl border border-white/10 hover:shadow-gold/10 transition-all duration-300">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="اكتب كلمة البحث هنا..."
                  className="w-full bg-transparent px-6 py-3.5 outline-none text-navy placeholder:text-navy/40 text-base md:text-lg font-bold text-right"
                  autoFocus
                />
                <button 
                  onClick={() => alert(`جاري البحث عن: ${searchQuery}`)}
                  className="flex items-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-light text-white font-bold rounded-full transition-all duration-300 shrink-0 shadow-md cursor-pointer hover:scale-[1.02]"
                >
                  <Search size={18} />
                  <span>بحث</span>
                </button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <span className="text-white/60 text-sm font-bold">كلمات شائعة:</span>
                {[
                  t('search.suggest1', 'الخطة الاستثمارية'),
                  t('search.suggest2', 'وظائف'),
                  t('search.suggest3', 'حياة كريمة')
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-4 py-2 bg-white/10 hover:bg-gold hover:text-white text-white text-xs font-bold rounded-full transition-all duration-300 cursor-pointer border border-white/5"
                  >
                    {tag}
                  </button>
                ))}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

