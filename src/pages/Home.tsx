import { ArrowRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import Projects from "./Projects";
import Resume from "../components/Resume"; // Pastikan path ini sesuai
import { motion } from "framer-motion";

export default function Home() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language as 'id' | 'en';
    
    // 👇 GANTI DENGAN EMAIL ASLIMU DI SINI 👇
    const myEmail = "emailkamu@gmail.com"; 

    // Konfigurasi Email untuk "Let's Get in Touch"
    const contactSubject = currentLang === 'id' 
        ? "Tawaran Kerja Sama: Portofolio Muhammad Far'an" 
        : "Portfolio Inquiry: Let's Collaborate";
    const contactBody = currentLang === 'id'
        ? "Halo Far'an,\n\nSaya melihat portofolio Anda dan tertarik untuk berdiskusi lebih lanjut mengenai peluang kerja sama.\n\nTerima kasih,\n[Nama Anda / Perusahaan]"
        : "Hi Far'an,\n\nI saw your portfolio and am interested in discussing potential collaboration opportunities further.\n\nThank you,\n[Your Name / Company]";
    const mailtoContact = `mailto:${myEmail}?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(contactBody)}`;

    // Konfigurasi Email untuk "Request CV"
    const cvSubject = currentLang === 'id'
        ? "Permintaan CV Lengkap - Muhammad Far'an"
        : "Request for Full Resume - Muhammad Far'an";
    const cvBody = currentLang === 'id'
        ? "Halo Far'an,\n\nSaya sangat tertarik dengan proyek-proyek di portofolio Anda. Boleh minta salinan Curriculum Vitae (CV) lengkap Anda untuk keperluan evaluasi profesional?\n\nTerima kasih,\n[Nama Anda / Perusahaan]"
        : "Hi Far'an,\n\nI am very interested in the projects on your portfolio. Could I request a copy of your full Curriculum Vitae (CV) for professional evaluation purposes?\n\nThank you,\n[Your Name / Company]";
    const mailtoCV = `mailto:${myEmail}?subject=${encodeURIComponent(cvSubject)}&body=${encodeURIComponent(cvBody)}`;

    return (
        <div className="flex flex-col gap-16 py-16 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto min-h-screen">
            
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
                        <a href="#projects" className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-7 py-3.5 rounded-xl font-medium shadow-md transition-transform hover:scale-105">
                            {t('hero.cta_projects')} <ArrowRight size={20} />
                        </a>
                        
                        {/* --- TOMBOL REQUEST CV --- */}
                        <a 
                            href={mailtoCV}
                            className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-7 py-3.5 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer"
                        >
                            {t('hero.cta_cv', currentLang === 'id' ? 'Minta CV' : 'Request CV')} <Mail size={20} />
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
            
            {/* --- RESUME SECTION --- */}
            <Resume />

            {/* --- PROJECTS SECTION --- */}
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
                        {/* --- TOMBOL CONTACT VIA EMAIL --- */}
                        <a 
                            href={mailtoContact}
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
                        >
                            {t('contact.cta')} <Mail size={20} />
                        </a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}