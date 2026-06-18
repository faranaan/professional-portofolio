import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import resumeData from "../data/resume.json";
import { BriefcaseBusiness, GraduationCap, Award, Code2 } from "lucide-react";

export default function Resume() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language as 'id' | 'en';

    const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
        <div className="flex items-center gap-3 mb-8 border-b-2 border-gray-100 dark:border-gray-800 pb-4">
            <div className="p-2.5 bg-accent/10 dark:bg-accent/20 text-accent rounded-xl">
                <Icon size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide uppercase">
                {title}
            </h3>
        </div>
    );

    const ResumeBlock = ({ item }: { item: any }) => (
        <div className="group mb-10 last:mb-0">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                    {item.role ? (item.role[currentLang] || item.role.en) : (item.degree ? (item.degree[currentLang] || item.degree.en) : item.title)}
                </h4>
                <span className="text-sm font-bold text-accent dark:text-blue-400 uppercase tracking-wider shrink-0">
                    {item.date[currentLang] || item.date.en}
                </span>
            </div>
            
            <h5 className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-4">
                {item.event ? (item.event[currentLang] || item.event.en) : (item.institution ? (item.institution[currentLang] || item.institution.en) : item.issuer)}
            </h5>
            
            <ul className="space-y-2.5 text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed pl-5">
                {item.points.map((point: any, idx: number) => (
                    <li key={idx} className="relative before:content-[''] before:absolute before:left-[-20px] before:top-[10px] before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">
                        {point[currentLang] || point.en}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <section id="resume" className="py-24 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                className="space-y-20"
            >
                {/* Organizational Experience */}
                <div>
                    <SectionHeader 
                        title={currentLang === 'id' ? "Pengalaman Organisasi & Profesional" : "Organizational & Professional Experience"} 
                        icon={BriefcaseBusiness} 
                    />
                    <div className="pl-2 md:pl-4">
                        {resumeData.experience.map((item, idx) => <ResumeBlock key={idx} item={item} />)}
                    </div>
                </div>

                {/* Trainings & Certifications */}
                <div>
                    <SectionHeader 
                        title={currentLang === 'id' ? "Pelatihan & Sertifikasi" : "Trainings & Certifications"} 
                        icon={Award} 
                    />
                    <div className="pl-2 md:pl-4">
                        {resumeData.trainings.map((item, idx) => <ResumeBlock key={idx} item={item} />)}
                    </div>
                </div>

                {/* Technical Skills */}
                <div>
                    <SectionHeader 
                        title={currentLang === 'id' ? "Keahlian Teknis" : "Technical Skills"} 
                        icon={Code2} 
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2 md:pl-4">
                        {Object.entries(resumeData.skills).map(([category, skills], idx) => (
                            <div key={idx} className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {skills.split(',').map((skill, skillIdx) => (
                                        <span 
                                            key={skillIdx} 
                                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg"
                                        >
                                            {skill.trim().replace('.', '')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <SectionHeader 
                        title={currentLang === 'id' ? "Pendidikan" : "Education"} 
                        icon={GraduationCap} 
                    />
                    <div className="pl-2 md:pl-4">
                        {resumeData.education.map((item, idx) => <ResumeBlock key={idx} item={item} />)}
                    </div>
                </div>

            </motion.div>
        </section>
    );
}