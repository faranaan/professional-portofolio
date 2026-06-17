import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-theme-light dark:bg-theme-dark text-text-mainLight dark:text-text-mainDark transition-colors duration-300 bg-grid-pattern">
            <Navbar />
            
            <main className="flex-grow overflow-hidden">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}