import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { HiMenuAlt2 } from 'react-icons/hi';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar khola ba bondho korar function
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar: Prop hishebe state pathano hocche */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Mobile Header (Desktop e hidden) */}
        <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <h1 className="font-black text-slate-900 tracking-tight">STUDYLINK</h1>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200"
          >
            <HiMenuAlt2 size={24} />
          </button>
        </header>

        {/* Page Content: Mobile e full width thakbe */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;