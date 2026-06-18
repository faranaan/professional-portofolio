import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
    ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, 
    Calendar, ShieldCheck, FileText, ChevronDown,
    LayoutDashboard, BookOpenCheck, Clock, Ticket,
    MapPinned, Radio, BarChart3, BellRing
} from "lucide-react";
import { 
    SiFlutter, SiGithub, SiReact, SiHtml5, SiCss, SiTypescript, 
    SiTailwindcss, SiLaravel, SiPhp, SiPostgresql, SiYoutube, SiGoogleplay,
    SiDocker, SiFigma, SiBootstrap
} from "react-icons/si";
import type { JSX } from "react";
import projectsData from '../data/projects.json';
import { motion, AnimatePresence } from "framer-motion";

const techIcons: { [key: string]: JSX.Element } = {
    "React": <SiReact className="text-[#61DAFB]" />,
    "HTML": <SiHtml5 className="text-[#E34F26]" />,
    "CSS": <SiCss className="text-[#1572B6]" />,
    "TypeScript": <SiTypescript className="text-[#3178C6]" />,
    "Tailwind CSS": <SiTailwindcss className="text-[#06B6D4]" />,
    "Laravel": <SiLaravel className="text-[#FF2D20]" />,
    "PHP": <SiPhp className="text-[#777BB4]" />,
    "Flutter": <SiFlutter className="text-[#02569B]" />,
    "PostgreSQL": <SiPostgresql className="text-[#4169E1]" />,
    "ASP.NET Core": <span className="text-[#512BD4] font-bold">.NET</span>,
    "Docker": <SiDocker className="text-[#2496ED]" />,
    "Figma": <SiFigma className="text-[#F24E1E]" />,
    "Bootstrap": <SiBootstrap className="text-[#7952B3]" />
};

const iconMap: { [key: string]: JSX.Element } = {
    "Calendar": <Calendar className="text-accent dark:text-blue-400" size={24} />,
    "ShieldCheck": <ShieldCheck className="text-accent dark:text-blue-400" size={24} />,
    "FileText": <FileText className="text-accent dark:text-blue-400" size={24} />,
    "LayoutDashboard": <LayoutDashboard className="text-accent dark:text-blue-400" size={24} />,
    "BookOpenCheck": <BookOpenCheck className="text-accent dark:text-blue-400" size={24} />,
    "Clock": <Clock className="text-accent dark:text-blue-400" size={24} />,
    "Ticket": <Ticket className="text-accent dark:text-blue-400" size={24} />,
    "MapPinned": <MapPinned className="text-accent dark:text-blue-400" size={24} />,
    "Radio": <Radio className="text-accent dark:text-blue-400" size={24} />,
    "BarChart3": <BarChart3 className="text-accent dark:text-blue-400" size={24} />,
    "BellRing": <BellRing className="text-accent dark:text-blue-400" size={24} />
};

export default function ProjectDetail() {
    const { id } = useParams();
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language as 'id' | 'en';
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showVideoMenu, setShowVideoMenu] = useState(false);
    const [showRepoMenu, setShowRepoMenu] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const project = projectsData.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-theme-light dark:bg-theme-dark">
                <h1 className="text-2xl text-text-mainLight dark:text-white">{t('projects_page.p1', 'Project not found')}</h1>
            </div>
        );
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
    };

    const renderBlock = (block: any, index: number) => {
        const blockVariants = {
            hidden: { opacity: 0, y: 30 },
            visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                    duration: 0.6, 
                    ease: "easeOut" as const
                } 
            }
        };

        switch (block.type) {
            case 'hero-section':
                return (
                    <motion.div 
                        key={index} 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={blockVariants}
                        className="text-center py-16 md:py-24 space-y-6"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent dark:bg-accent/20 dark:text-blue-400 text-sm font-bold tracking-widest uppercase inline-block">
                            {block.badge[currentLang] || block.badge.en}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {block.title[currentLang] || block.title.en}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {block.subtitle[currentLang] || block.subtitle.en}
                        </p>
                        {block.stats && (
                            <div className="flex justify-center gap-12 pt-8 border-t border-gray-200 dark:border-gray-800 mt-8 max-w-2xl mx-auto">
                                {block.stats.map((stat: any, i: number) => (
                                    <div key={i} className="text-center">
                                        <p className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</p>
                                        <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {stat.label[currentLang] || stat.label.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                );
            case 'text-heading':
                return (
                    <motion.div 
                        key={index} 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, margin: "-100px" }} 
                        variants={blockVariants}
                        className="py-12 max-w-3xl mx-auto text-center space-y-4"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 text-xs font-bold tracking-widest uppercase inline-block">
                            {block.badge[currentLang] || block.badge.en}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            {block.title[currentLang] || block.title.en}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line pt-4">
                            {block.content[currentLang] || block.content.en}
                        </p>
                    </motion.div>
                );
            case 'feature-grid':
                return (
                    <motion.div 
                        key={index} 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, margin: "-100px" }} 
                        variants={blockVariants}
                        className="py-16"
                    >
                        <div className="text-center mb-12 space-y-4">
                            <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 text-xs font-bold tracking-widest uppercase inline-block">
                                {block.badge[currentLang] || block.badge.en}
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {block.title[currentLang] || block.title.en}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {block.items.map((item: any, i: number) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ y: -10 }}
                                    className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-6">
                                        {iconMap[item.icon] || <span>✨</span>}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                        {item.title[currentLang] || item.title.en}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                        {item.desc[currentLang] || item.desc.en}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-theme-light dark:bg-theme-dark font-sans transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
                
                {/* Back Button */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="inline-flex items-center gap-2 text-text-mutedLight dark:text-gray-400 hover:text-accent dark:hover:text-blue-400 transition-colors mb-10">
                        <ArrowLeft size={20} />
                        {t('nav.home', 'Home')}
                    </Link>
                </motion.div>

                {/* Main Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 mb-8">
                        {project.techStack.map((tech, i) => (
                            <span key={i} className="flex items-center gap-2 px-4 py-1.5 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full shadow-sm">
                                <span className="text-lg">{techIcons[tech]}</span>
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        {/* 1. Live Demo / Play Store */}
                        {project.demoLink && (
                            <a 
                                href={project.demoLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium shadow-md hover:shadow-lg ${
                                    project.demoLink.includes('play.google.com') 
                                    ? 'bg-[#01875F] hover:bg-[#016B4B] text-white' 
                                    : 'bg-accent hover:bg-accent-hover text-white'
                                }`}
                            >
                                {project.demoLink.includes('play.google.com') ? (
                                    <><SiGoogleplay size={18} /> Play Store</>
                                ) : (
                                    <><ExternalLink size={18} /> {t('project_detail.live_demo', 'Live Demo')}</>
                                )}
                            </a>
                        )}

                        {/* 2. Repository */}
                        {(project as any).repoLinks && (project as any).repoLinks.length > 0 ? (
                            <div className="relative z-40">
                                <button 
                                    onClick={() => setShowRepoMenu(!showRepoMenu)}
                                    className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium shadow-sm group"
                                >
                                    <SiGithub size={18} className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors" /> 
                                    {t('project_detail.repo', 'Repositories')} 
                                    <ChevronDown size={18} className={`transition-transform duration-300 ${showRepoMenu ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showRepoMenu && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col"
                                        >
                                            {(project as any).repoLinks.map((repo: any, idx: number) => (
                                                <a 
                                                    key={idx}
                                                    href={repo.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0"
                                                >
                                                    <SiGithub size={16} />
                                                    <span className="text-sm font-medium">{repo.label[currentLang] || repo.label.en}</span>
                                                </a>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : project.repoLink ? (
                            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium shadow-sm">
                                <SiGithub size={18} /> {t('project_detail.repo', 'Repository')}
                            </a>
                        ) : null}

                        {/* 3. YouTube Demos */}
                        {project.videoLinks && project.videoLinks.length > 0 && (
                            <div className="relative z-50">
                                <button 
                                    onClick={() => setShowVideoMenu(!showVideoMenu)}
                                    className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30 px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all font-medium shadow-sm group"
                                >
                                    <SiYoutube size={18} className="text-red-500 group-hover:text-white transition-colors" /> 
                                    {t('project_detail.watch_demos', 'Watch Demos')} 
                                    <ChevronDown size={18} className={`transition-transform duration-300 ${showVideoMenu ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showVideoMenu && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col"
                                        >
                                            {project.videoLinks.map((video: any, idx: number) => (
                                                <a 
                                                    key={idx}
                                                    href={video.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0"
                                                >
                                                    <SiYoutube size={16} className="text-red-500" />
                                                    <span className="text-sm font-medium">{video.label[currentLang] || video.label.en}</span>
                                                </a>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800 aspect-video mb-16 group transition-colors"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={currentImageIndex}
                                src={project.gallery[currentImageIndex]} 
                                alt={`${project.title} screenshot ${currentImageIndex + 1}`} 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        
                        {project.gallery.length > 1 && (
                            <>
                                <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 text-gray-900 dark:text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all">
                                    <ChevronLeft size={24} />
                                </button>
                                <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 text-gray-900 dark:text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all">
                                    <ChevronRight size={24} />
                                </button>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {project.gallery.map((_, idx) => (
                                        <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 dark:bg-gray-500/50'}`} />
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                )}

                {/* Blocks */}
                <div className="space-y-4">
                    {project.caseStudy?.map((block, index) => renderBlock(block, index))}
                </div>
            </div>
        </div>
    )
}