import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Menu, X } from "lucide-react"; // Tambahkan Menu & X untuk ikon Hamburger
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State Hamburger Menu
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Fungsi klik Beranda
    const handleHomeClick = (e: React.MouseEvent) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false); // Tutup menu mobile jika terbuka
    };

    // Fungsi Sakti untuk navigasi ke Section tertentu (Resume/Projects)
    const handleScrollNav = (e: React.MouseEvent, targetId: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false); // Tutup menu mobile
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="sticky top-0 z-50 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
        >
            {/* CONTAINER UTAMA (Selalu Tampil) */}
            <div className="p-4 max-w-7xl mx-auto flex items-center justify-between">
                
                {/* 1. KIRI: LOGO */}
                <div className="flex items-center gap-6 sm:gap-8">
                    <Link to="/" onClick={handleHomeClick} className="font-bold text-2xl text-text-mainLight dark:text-text-mainDark tracking-tight group">
                        <motion.span whileHover={{ scale: 1.1 }} className="inline-block">
                            MF<span className="text-accent group-hover:text-blue-500 transition-colors">.</span>
                        </motion.span>
                    </Link>

                    {/* DESKTOP MENU (Hilang di HP) */}
                    <div className="hidden md:flex gap-6 text-sm font-semibold text-text-mutedLight dark:text-text-mutedDark">
                        <Link to="/" onClick={handleHomeClick} className="relative hover:text-accent transition-colors group">
                            {t('nav.home', 'Beranda')}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                        </Link>
                        <a href="#resume" onClick={(e) => handleScrollNav(e, 'resume')} className="relative hover:text-accent transition-colors group">
                            {t('nav.resume', 'Resume')}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                        </a>
                        <a href="#projects" onClick={(e) => handleScrollNav(e, 'projects')} className="relative hover:text-accent transition-colors group">
                            {t('nav.projects', 'Proyek')}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                        </a>
                    </div>
                </div>
                
                {/* 2. KANAN: CONTROLS & HAMBURGER */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <button 
                        onClick={toggleTheme}
                        className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors overflow-hidden"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={isDarkMode ? "dark" : "light"}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>

                    <div className="hidden sm:block h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

                    {/* Language Switcher */}
                    <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        {['id', 'en'].map((lng) => (
                            <button 
                                key={lng}
                                onClick={() => changeLanguage(lng)} 
                                className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all relative ${
                                    i18n.language === lng 
                                    ? 'text-accent dark:text-white' 
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                <span className="relative z-10 uppercase">{lng}</span>
                                {i18n.language === lng && (
                                    <motion.div 
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white dark:bg-gray-600 rounded-md shadow-sm"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tombol Hamburger Mobile (Hanya tampil di layar kecil < md) */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-accent transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* DROPDOWN MENU MOBILE */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark overflow-hidden shadow-lg"
                    >
                        <div className="flex flex-col p-4 gap-2 text-base font-bold text-gray-700 dark:text-gray-300">
                            <Link 
                                to="/" 
                                onClick={handleHomeClick} 
                                className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent transition-colors"
                            >
                                {t('nav.home', 'Beranda')}
                            </Link>
                            <a 
                                href="#resume" 
                                onClick={(e) => handleScrollNav(e, 'resume')} 
                                className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent transition-colors"
                            >
                                {t('nav.resume', 'Resume')}
                            </a>
                            <a 
                                href="#projects" 
                                onClick={(e) => handleScrollNav(e, 'projects')} 
                                className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent transition-colors"
                            >
                                {t('nav.projects', 'Proyek')}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}