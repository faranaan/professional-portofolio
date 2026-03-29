import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="p-4 bg-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex gap-4">
                <Link to="/">{t('nav.home')}</Link>
                <a href="#projects" className="hover:text-accent transition-colors">
                    {t('nav.projects')}
                </a>
            </div>
            <div className="flex gap-2">
                <button onClick={() => changeLanguage('id')} className={`px-3 py-1 rounded ${i18n.language === 'id' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                    ID
                </button>
                <button onClick={() => changeLanguage('en')} className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                    EN
                </button>
            </div>
        </nav>
    )
}