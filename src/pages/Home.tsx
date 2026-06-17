import { ArrowRight, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import Projects from "./Projects";
import { motion } from "framer-motion";

export default function Home() {
    const { t } = useTranslation();

    const handleContact = () => {
        const phoneNumber = "6288803482016"; // GANTI NOMORMU
        const message = encodeURIComponent("Halo Far'an, saya melihat portofolio Anda dan tertarik untuk berdiskusi lebih lanjut.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="flex flex-col gap-24 py-16 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto min-h-screen">
            
            {/* --- HERO SECTION --- */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-10"
            >
                <div className="flex-1 space-y-8 text-center md:text-left">
                    <div className="space-y-4">
                        <p className="text-accent dark:text-blue-400 font-medium tracking-wide uppercase text-sm">
                            {t('hero.badge')}
                        </p>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                            {t('hero.title', { name: "Muhammad Far'an" })}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
                            {t('hero.subtitle')}
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                        <a href="#projects" className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-7 py-3.5 rounded-xl font-medium shadow-md">
                            {t('hero.cta_projects')} <ArrowRight size={20} />
                        </a>
                        <a href="/cv.pdf" target="_blank" className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-7 py-3.5 rounded-xl font-medium">
                            {t('hero.cta_cv')} <Download size={20} />
                        </a>
                    </div>
                </div>

                <div className="w-56 h-56 md:w-80 md:h-80 bg-gray-100 dark:bg-gray-800 rounded-full flex-shrink-0 border-8 border-white dark:border-gray-900 shadow-2xl overflow-hidden relative">
                    <img 
                        src="/images/faran-profile.jpeg" 
                        alt="Muhammad Far'an Profile" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.section>
            
            {/* --- ABOUT SECTION --- */}
            <motion.section 
                id="about" 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 bg-surface-light/80 dark:bg-surface-dark/80 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm"
            >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-accent pb-3 inline-block">
                    {t('about.title')}
                </h2>
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-6 text-lg">
                    <p>{t('about.p1')}</p>
                    <p>{t('about.p2')}</p>
                </div>
            </motion.section>
            
            <Projects />

            {/* --- CONTACT SECTION --- */}
            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                className="mt-12 mb-24 bg-[#0a1128] dark:bg-surface-dark rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-gray-800"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        {t('contact.title')} <span className="text-blue-500">{t('contact.title_highlight')}</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                    <div className="pt-8">
                        <button 
                            onClick={handleContact}
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-medium transition-all"
                        >
                            {t('contact.cta')} <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}