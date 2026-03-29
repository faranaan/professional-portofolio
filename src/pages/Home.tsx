import { ArrowRight, Download } from "lucide-react";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Projects from "./Projects";

export default function Home(){
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-24 py-16 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto min-h-screen">
            <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-10">
                <div className="flex-1 space-y-8 text-center md:text-left">
                    <div className="space-y-4">
                        <p className="text-blue-600 font-medium tracking-wide uppercase text-sm">
                            {t('hero.badge')}
                        </p>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                            {t('hero.title', { name: "Muhammad Far'an" })}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
                            {t('hero.subtitle')}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                        <Link to="/projects" className="flex items-center gap-2 bg-gray-900 text-white px-7 py-3.5 rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg">
                            {t('hero.cta_projects')} <ArrowRight size={20} />
                        </Link>
                        <a href="/cv.pdf" target="_blank" className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-7 py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium shadow-sm">
                            {t('hero.cta_cv')} <Download size={20} />
                        </a>
                    </div>
                </div>
                <div className="w-56 h-56 md:w-80 md:h-80 bg-gray-100 rounded-full flex-shrink-0 border-white shadow-2xl overflow-hidden flex items-center justify-center relative">
                    <span className="text-gray-400 font-medium">Foto Profile</span>
                </div>
            </section>
            <section className="space-y-8 bg-gray-50/50 p-8 md:p-12 rounded-3xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight border-b-2 border-blue-600 pb-3 inline-block">
                    {t('about.title')}
                </h2>
                <div className="text-gray-600 leading-relaxed space-y-6 text-lg">
                    <p>{t('about.p1')}</p>
                    <p>{t('about.p2')}</p>
                    <p>{t('about.p3')}</p>
                </div>
            </section>
            <Projects />
        </div>
    );
}