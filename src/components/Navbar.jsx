import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX, HiChevronDown, HiPhone, HiChevronRight, HiAcademicCap, HiGlobeAlt, HiUserGroup } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeMobileMenu, setActiveMobileMenu] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation(); 

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    // Scroll & Progress Logic
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentProgress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(currentProgress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: '/' },
        {
            name: 'About Us',
            icon: <HiUserGroup className="text-orange-500" />,
            submenu: [
                { name: 'Our Services', to: '/services' },
                { name: 'Events', to: '/all-events' },
                { name: 'Contact Us', to: '/contact' },
                { name: 'Stories', to: '/all-stories' },
                { name: 'Gellary', to: '/photos' },
                { name: 'Blog', to: '/Blog' }
            ]
        },
        {
            name: 'Institutions' ,to: '/all-institutes',
            icon: <HiAcademicCap className="text-blue-500" />,
            
        },
        {
            name: 'Countries',to:'/countries',
            icon: <HiGlobeAlt className="text-emerald-500" />,
        
        },
        { name: 'News', to: '/all-news' },
        { name: 'Contact Us', to: '/contact' },
    ];

    return (
        <>
            <nav className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
                scrolled 
                ? 'bg-white/95 backdrop-blur-xl py-2 shadow-lg' 
                : 'bg-transparent py-5'
            }`}>
                <div className="absolute bottom-0 left-0 h-[2.5px] bg-blue-600 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />

                <div className="max-w-7xl mx-auto px-5 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo Section */}
                        <Link to="/" className="flex items-center group cursor-pointer">
                            <motion.div whileHover={{ rotate: 10, scale: 1.05 }} className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-500/30">
                                <span className="text-white font-black text-xl">S</span>
                            </motion.div>
                            <h1 className="text-2xl font-black tracking-tighter text-slate-900">
                                STUDY<span className="text-blue-600">LINK</span>
                            </h1>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative group px-1">
                                    {link.submenu ? (
                                        <button className="flex items-center px-4 py-2 text-[15px] font-bold text-slate-700 hover:text-blue-600 transition-all rounded-lg hover:bg-blue-50/50">
                                            {link.name}
                                            <HiChevronDown className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
                                        </button>
                                    ) : (
                                        <Link to={link.to} className="flex items-center px-4 py-2 text-[15px] font-bold text-slate-700 hover:text-blue-600 transition-all rounded-lg hover:bg-blue-50/50">
                                            {link.name}
                                        </Link>
                                    )}
                                    
                                    {link.submenu && (
                                        <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-64 transform group-hover:translate-y-0 translate-y-2">
                                            <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 p-2 overflow-hidden">
                                                <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1 flex items-center gap-2">
                                                    {link.icon} Explore {link.name}
                                                </div>
                                                {link.submenu.map((subItem) => (
                                                    <Link 
                                                        key={subItem.name} 
                                                        to={subItem.to} 
                                                        className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all group/item"
                                                    >
                                                        {subItem.name}
                                                        <HiChevronRight className="opacity-0 -translate-x-2 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Contact & CTA */}
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50">
                                    <HiPhone size={18} className="animate-pulse" />
                                </div>
                                <div className="ml-3 hidden xl:block">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Expert Support</p>
                                    <p className="text-sm font-black text-slate-800">+880 1234567890</p>
                                </div>
                            </div>

                            <Link to="/apply">
                                <button className="hidden lg:block bg-slate-900 hover:bg-blue-600 text-white px-7 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-slate-200 active:scale-95">
                                    Apply Now
                                </button>
                            </Link>

                            <button 
                                onClick={() => setIsSidebarOpen(true)} 
                                className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                <HiMenuAlt3 size={26} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={() => setIsSidebarOpen(false)} 
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[110]" 
                        />
                        <motion.div 
                            initial={{ x: '100%' }} 
                            animate={{ x: 0 }} 
                            exit={{ x: '100%' }} 
                            transition={{ type: 'spring', damping: 28, stiffness: 200 }} 
                            className="fixed right-0 top-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl z-[120] p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <Link to="/" className="font-black text-xl text-slate-900 tracking-tight">STUDY<span className="text-blue-600">LINK</span></Link>
                                <button 
                                    onClick={() => setIsSidebarOpen(false)} 
                                    className="p-2 rounded-xl bg-slate-100 text-rose-500 hover:bg-rose-50 transition-colors"
                                >
                                    <HiX size={22} />
                                </button>
                            </div>
                            
                            <div className="flex-1 space-y-2 overflow-y-auto">
                                {navLinks.map((link, idx) => (
                                    <div key={idx} className="space-y-1">
                                        {link.submenu ? (
                                            <button 
                                                onClick={() => setActiveMobileMenu(activeMobileMenu === idx ? null : idx)}
                                                className={`w-full flex justify-between items-center p-4 rounded-2xl font-bold transition-all ${activeMobileMenu === idx ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'}`}
                                            >
                                                <span className="flex items-center gap-3">{link.icon} {link.name}</span>
                                                <HiChevronDown className={`transition-transform duration-300 ${activeMobileMenu === idx ? 'rotate-180' : ''}`} />
                                            </button>
                                        ) : (
                                            <Link 
                                                to={link.to}
                                                className="w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all"
                                            >
                                                {link.icon} {link.name}
                                            </Link>
                                        )}
                                        <AnimatePresence>
                                            {activeMobileMenu === idx && link.submenu && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }} 
                                                    animate={{ height: 'auto', opacity: 1 }} 
                                                    exit={{ height: 0, opacity: 0 }} 
                                                    className="pl-12 space-y-1 overflow-hidden"
                                                >
                                                    {link.submenu.map(sub => (
                                                        <Link key={sub.name} to={sub.to} className="block py-3 text-[15px] font-semibold text-slate-500 hover:text-blue-600 transition-colors">{sub.name}</Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                                <a href="tel:+8801969908432" className="flex items-center justify-center gap-2 w-full py-4 text-slate-600 font-bold text-sm">
                                    <HiPhone className="text-blue-600" /> +880 1234567890
                                </a>
                                <Link to="/apply">
                                    <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 active:scale-95 transition-transform">
                                        Apply Now
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar; 