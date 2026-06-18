import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { 
    SiReact, SiGithub, SiHtml5, SiCss, SiTypescript, 
    SiTailwindcss, SiLaravel, SiPhp, SiFlutter, SiPostgresql, SiDocker, SiFigma, SiBootstrap
} from "react-icons/si";
import { motion } from "framer-motion";
import type { JSX } from "react";

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

interface ProjectProps {
    project: any; 
}

export default function ProjectCard({ project }: ProjectProps) {
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language as 'id' | 'en';
    const description = project.description[currentLang] || project.description.en;

    const primaryRepo = project.repoLink || (project.repoLinks && project.repoLinks.length > 0 ? project.repoLinks[0].url : null);

    return (
        <motion.div 
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group flex flex-col h-full bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
        >
            <div className="relative h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Overlay Tech Stack */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gray-900/85 backdrop-blur-sm flex flex-col justify-center items-center p-3 transition-opacity duration-300"
                >
                    <p className="text-white font-bold mb-3 tracking-wider text-xs uppercase">
                        {t('project_card.tech_stack', 'Tech Stack')}
                    </p>
                    
                    {/* Menggunakan w-full dan pembagian item w-[30%] agar konsisten 3 item per baris */}
                    <div className="flex flex-wrap justify-center items-start gap-y-3 gap-x-1 w-full max-w-[95%]">
                        {project.techStack.map((tech: string, index: number) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileHover={{ scale: 1.15 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex flex-col items-center gap-1 w-[30%] text-center"
                            >
                                <span className="text-2xl text-white drop-shadow-md">
                                    {techIcons[tech] || <span className="text-sm">🛠️</span>}
                                </span>
                                <span className="text-[9px] md:text-[10px] font-medium text-gray-200 leading-tight">
                                    {tech}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3 transition-colors">
                    {description}
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors">
                    {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                            <ExternalLink size={16} /> {t('project_card.demo', 'Demo')}
                        </a>
                    )}
                    
                    {primaryRepo && (
                        <a href={primaryRepo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <SiGithub size={16} /> {t('project_card.repo', 'Repo')}
                        </a>
                    )}
                    
                    <Link to={`/projects/${project.id}`} className="ml-auto text-sm font-medium text-gray-900 dark:text-white hover:text-accent dark:hover:text-blue-400 transition-colors">
                        {t('project_card.detail', 'Details')} →
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}