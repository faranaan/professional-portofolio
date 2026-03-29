import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects.json";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Projects() {
    const { t } = useTranslation();
    const [visibleCount, setVisibleCount] = useState(3);
    const handleSeeMore = () => {
        setVisibleCount(projectsData.length);
    }

    return (
        <section id="projects" className="py-24 px-6 sm:px-8 lg:px-12 bg-theme-light">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-text-mainLight mb-4">
                        {t('projects_page.title')}
                    </h2>
                    <p className="text-lg text-text-mutedLight max-w-2xl">
                        {t('projects_page.subtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.slice(0, visibleCount).map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                {visibleCount < projectsData.length && (
                    <div className="mt-16 flex justify-center">
                        <button onClick={handleSeeMore} className="group flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 text-text-mainLight rounded-full hover:border-accent hover:text-accent shadow-sm hover:shadow-md transition-all duration-300 font-medium">
                            {t('cta_projects')}
                            <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}