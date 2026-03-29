import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SiReact, SiGithub, SiHtml5, SiCss } from "react-icons/si";
import type { JSX } from "react";

const techIcons: { [key: string]: JSX.Element } = {
    "React": <SiReact className="text-[#61DAFB]" />,
    "HTML": <SiHtml5 className="text-[#E34F26]" />,
    "CSS": <SiCss className="text-[#1572B6]" />,
};

interface ProjectProps {
    project: {
        id: string;
        title: string;
        description: { id: string; en: string; };
        techStack: string[];
        image: string;
        repoLink: string;
        demoLink: string;
    };
}

export default function ProjectCard({ project }: ProjectProps) {
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language as 'id' | 'en';
    const description = project.description[currentLang] || project.description.en;

    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                <img src={project.image} alt="project.title" className="w-full h-full object-cover transition-transform dudration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-center items-center p-6 backdrop-blur-sm">
                    <p className="text-white font-medium mb-4 tracking-wide text-sm uppercase">Tech Stack</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {project.techStack.map((tech, index) => (
                            <div key={index} className="flex flex-col items-center gap-1">
                                <span className="text-2xl text-white">
                                    {techIcons[tech] || <span className="text-xs">🛠️</span>}
                                </span>
                                <span className="text-[10px] text-gray-300">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {description}
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                    {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                            <ExternalLink size={16} /> Demo
                        </a>
                    )}
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        <SiGithub size={16} /> Repo
                    </a>
                    <Link to={`/projects/${project.id}`} className="ml-auot text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                        {t('cta_projects', 'Detail')} →
                    </Link>
                </div>
            </div>
        </div>
    )
}