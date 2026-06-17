import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects.json";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Projects() {
    const { t } = useTranslation();
    const initialCount = 3;
    const [visibleCount, setVisibleCount] = useState(initialCount);

    const toggleVisibleCount = () => {
        if (visibleCount >= projectsData.length) {
            setVisibleCount(initialCount);
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            setVisibleCount(projectsData.length);
        }
    };

    const isExpanded = visibleCount >= projectsData.length;

    return (
        <section id="projects" className="py-24 px-6 sm:px-8 lg:px-12 bg-theme-light dark:bg-theme-dark transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                
                {/* 1. Header */}
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-text-mainLight dark:text-white mb-4">
                        {t('projects_page.title')}
                    </h2>
                    <p className="text-lg text-text-mutedLight dark:text-gray-400 max-w-2xl">
                        {t('projects_page.subtitle')}
                    </p>
                </div>

                {/* 2. Grid Container (React Murni) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.slice(0, visibleCount).map((project) => (
                        <div key={project.id}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {/* 3. Tombol Control */}
                {projectsData.length > initialCount && (
                    <div className="mt-16 flex justify-center">
                        <button 
                            onClick={toggleVisibleCount} 
                            className="group flex items-center gap-2 px-8 py-3 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-text-mainLight dark:text-white rounded-full hover:border-accent transition-all font-medium shadow-sm"
                        >
                            {isExpanded ? t('projects_page.cta_show_less') : t('projects_page.cta_show_more')}
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}