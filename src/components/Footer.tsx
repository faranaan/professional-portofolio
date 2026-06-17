import { useTranslation } from "react-i18next";
import { SiGithub, SiInstagram } from "react-icons/si";
import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    // Variabel animasi untuk ikon sosial
    const iconContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const iconItem = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 transition-colors duration-300"
        >
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Copyright */}
                <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors"
                >
                    © {currentYear} Muhammad Far'an. {t('footer.rights')}
                </motion.p>

                {/* Social Links dengan Stagger Animation */}
                <motion.div 
                    variants={iconContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center gap-6"
                >
                    {[
                        { href: "mailto:aan21102006@gmail.com", icon: <Mail size={20} /> },
                        { href: "https://linkedin.com/in/muhammad-far-an", icon: <FaLinkedin size={18} /> },
                        { href: "https://github.com/faranaan", icon: <SiGithub size={18} /> },
                        { href: "https://instagram.com/faran_aan", icon: <SiInstagram size={18} /> }
                    ].map((link, index) => (
                        <motion.a
                            key={index}
                            variants={iconItem}
                            whileHover={{ y: -3, scale: 1.1 }}
                            href={link.href}
                            target={link.href.startsWith('http') ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-blue-400 transition-colors"
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </motion.div>

            </div>
        </motion.footer>
    );
}