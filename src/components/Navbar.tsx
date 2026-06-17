import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Tambahkan useLocation & useNavigate
import { useTranslation } from "react-i18next";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const location = useLocation(); // Untuk cek posisi rute
    const navigate = useNavigate();

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

    // FUNGSI SAKTI: Jika di Home, scroll ke atas. Jika di Detail, pindah ke Home.
    const handleHomeClick = (e: React.MouseEvent) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="sticky top-0 z-50 p-4 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md flex items-center justify-between border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
        >
            <div className="flex items-center gap-6">
                {/* Logo juga diberi fungsi handleHomeClick */}
                <Link to="/" onClick={handleHomeClick} className="font-bold text-xl text-text-mainLight dark:text-text-mainDark tracking-tight group">
                    <motion.span whileHover={{ scale: 1.1 }} className="inline-block">
                        MF<span className="text-accent group-hover:text-blue-500 transition-colors">.</span>
                    </motion.span>
                </Link>

                <div className="flex gap-4 text-sm font-medium text-text-mutedLight dark:text-text-mutedDark">
                    {/* Link Beranda yang sudah diperbaiki */}
                    <Link 
                        to="/" 
                        onClick={handleHomeClick} 
                        className="relative hover:text-accent transition-colors group"
                    >
                        {t('nav.home', 'Beranda')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                    </Link>

                    {/* Tombol Proyek: Scroll halus ke ID projects */}
                    <a 
                        href="#projects" 
                        onClick={(e) => {
                            e.preventDefault();
                            if (location.pathname !== '/') {
                                navigate('/');
                                // Beri sedikit jeda agar navigasi selesai baru scroll
                                setTimeout(() => {
                                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            } else {
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="relative hover:text-accent transition-colors group"
                    >
                        {t('nav.projects', 'Proyek')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                    </a>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
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

                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

                <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    {['id', 'en'].map((lng) => (
                        <button 
                            key={lng}
                            onClick={() => changeLanguage(lng)} 
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all relative ${
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
            </div>
        </motion.nav>
    );
}