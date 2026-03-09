import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HiOutlineViewGrid,
    HiOutlineOfficeBuilding,
    HiOutlineClipboardList,
    HiOutlineBriefcase,
    HiOutlineAcademicCap,
    HiOutlineGlobe,
    HiOutlineCalendar,
    HiOutlineTicket,
    HiOutlineStar,
    HiOutlineNewspaper,
    HiOutlineLogout,
    HiOutlineLightningBolt,
    HiX
} from 'react-icons/hi';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: <HiOutlineViewGrid />, path: '/admin' },
        { name: 'Add Institute', icon: <HiOutlineOfficeBuilding />, path: '/admin/add-institute' },
        { name: 'Applications', icon: <HiOutlineClipboardList />, path: '/admin/applications' },
        { name: 'Services', icon: <HiOutlineBriefcase />, path: '/admin/services' },
        { name: 'Add Course', icon: <HiOutlineAcademicCap />, path: '/admin/add-course' },
        { name: 'Add Country', icon: <HiOutlineGlobe />, path: '/admin/add-country' },

        // === EVENT & NEWS MANAGEMENT ===
        { name: 'Manage Events', icon: <HiOutlineCalendar />, path: '/admin/manage-events' },
        { name: 'Event Bookings', icon: <HiOutlineTicket />, path: '/admin/event-bookings' },
        { name: 'Manage Reviews', icon: <HiOutlineStar />, path: '/admin/review' },
        { name: 'Upload News', icon: <HiOutlineNewspaper />, path: '/admin/news' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-slate-400 flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 lg:static lg:block
            `}>

                {/* Logo Section */}
                <div className="p-6 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <HiOutlineLightningBolt size={20} />
                        </div>
                        <h1 className="text-white font-black text-xl tracking-tight leading-none">
                            STUDY<br /><span className="text-blue-500 text-sm tracking-widest uppercase">Link</span>
                        </h1>
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={toggleSidebar} className="lg:hidden text-slate-500 hover:text-white transition-colors">
                        <HiX size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 mt-6 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30'
                                    : 'hover:bg-white/5 hover:text-slate-200'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Section */}
                <div className="p-6 border-t border-white/5">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-400 transition-colors text-sm font-black uppercase tracking-widest">
                        <HiOutlineLogout size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;