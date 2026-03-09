import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatusCard from './StatusCard';
import { HiOutlineArrowNarrowRight, HiOutlineShieldCheck } from 'react-icons/hi';

const DashboardHome = () => {
    // 1. Data ebong Loading state
    const [stats, setStats] = useState({
        applications: 0,
        institutions: 0,
        stories: 0,
        loading: true
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Backend theke dynamic data fetch kora
                const [appRes, instRes, storyRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/applications'),
                    axios.get('http://localhost:5000/api/all-institutes'),
                    axios.get('http://localhost:5000/api/events')
                ]);

                setStats({
                    applications: appRes.data.data?.length || 0,
                    institutions: instRes.data.data?.length || 0,
                    stories: storyRes.data.data?.length || 0,
                    loading: false
                });
            } catch (err) {
                console.error("Dashboard Data Fetch Error:", err);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* 1. Header: Dynamic Session Details */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">System Overview</h1>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        Admin Portal <span className="mx-2 text-slate-200">|</span> 
                        <span className="text-[#3B82F6]"> StudyLink Global</span>
                    </p>
                </div>
                
                <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-[#1E293B] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                        A
                    </div>
                    <div className="leading-tight text-left">
                        <p className="text-xs font-bold text-[#1E293B]">Admin Manager</p>
                        <p className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-tighter">
                            {stats.loading ? "Connecting..." : "Verified Session"}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Welcome Banner: Interactive Action */}
            <div className="bg-[#0F172A] rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden group border border-white/5">
                <div className="relative z-10 max-w-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase mb-4">
                        <HiOutlineShieldCheck className={stats.loading ? "animate-spin" : ""} /> 
                        Security Protocol Active
                    </div>
                    <h2 className="text-3xl font-black leading-tight tracking-tight">
                        Welcome to <br/> <span className="text-blue-500 font-black">StudyLink</span> Command Center
                    </h2>
                    <p className="text-slate-400 text-xs mt-3 font-medium leading-relaxed">
                        Currently monitoring <span className="text-white font-bold">{stats.institutions}</span> institutions across the global network.
                    </p>
                    <button className="mt-8 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 group">
                        Review New Data <HiOutlineArrowNarrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                {/* Visual Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent" />
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-all duration-700" />
            </div>

            {/* 3. Status Grid: Now Fully Dynamic */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatusCard 
                    title="Active Traffic" 
                    value="Global" 
                    icon="🌐" 
                    color="bg-blue-50 text-blue-600" 
                />
                <StatusCard 
                    title="New Enquiries" 
                    value={stats.loading ? "..." : stats.applications.toLocaleString()} 
                    icon="📩" 
                    color="bg-slate-50 text-[#1E293B]" 
                />
                <StatusCard 
                    title="Institutions" 
                    value={stats.loading ? "..." : stats.institutions} 
                    icon="🏛️" 
                    color="bg-indigo-50 text-indigo-600" 
                />
                <StatusCard 
                    title="Success Stories" 
                    value={stats.loading ? "..." : stats.stories} 
                    icon="⭐" 
                    color="bg-amber-50 text-amber-600" 
                />
            </div>

            {/* 4. Activity Table Area */}
            <div className="bg-white rounded-[32px] border border-slate-200/60 overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="font-bold text-[#0F172A] text-base">Portal Activity Log</h3>
                        <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                            Live synchronization with StudyLink network.
                        </p>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2.5 bg-[#0F172A] hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold transition-all shadow-md">
                        Manage All Feeds
                    </button>
                </div>
                
                <div className="py-20 text-center bg-slate-50/30">
                    <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm text-slate-300">
                        {stats.loading ? <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> : "📁"}
                    </div>
                    <p className="text-slate-400 text-xs italic font-medium">
                        {stats.loading ? "Synchronizing database..." : "Everything is up to date. No pending alerts."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;