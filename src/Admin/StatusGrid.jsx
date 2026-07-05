import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  HiOutlineGlobeAlt, 
  HiOutlineClipboardList, 
  HiOutlineAcademicCap, 
  HiOutlinePhotograph 
} from 'react-icons/hi';

// Individual Status Card Component (Agertai thakbe, just props use hobe)
const StatusCard = ({ title, value, subtext, icon, color, isOnline, loading }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
    <div className={`absolute top-0 right-0 p-3 ${color.bg} rounded-bl-2xl ${color.text}`}>
      {icon}
    </div>

    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{title}</p>
    
    {loading ? (
      <div className="h-8 w-24 bg-slate-100 animate-pulse mt-2 rounded"></div>
    ) : (
      <h3 className="text-2xl font-black text-slate-900 mt-2">{value}</h3>
    )}
    
    {isOnline ? (
      <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        {subtext}
      </div>
    ) : (
      <p className={`text-xs mt-4 font-bold ${color.subtext}`}>
        {subtext}
      </p>
    )}
  </div>
);

const StatusGrid = () => {
  const [counts, setCounts] = useState({
    applications: 0,
    institutes: 0,
    events: 0 // Stories/Events er jonno
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Backend theke shob data eksathe fetch kora
        const [appRes, instRes, eventRes] = await Promise.all([
          axios.get('https://studylinkserver.thinkcodify.site/api/admin/applications'),
          axios.get('https://studylinkserver.thinkcodify.site/api/all-institutes'),
          axios.get('https://studylinkserver.thinkcodify.site/api/events')
        ]);

        setCounts({
          applications: appRes.data.data?.length || 0,
          institutes: instRes.data.data?.length || 0,
          events: eventRes.data.data?.length || 0
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Global Support",
      value: "Active",
      subtext: "System Online",
      icon: <HiOutlineGlobeAlt size={20} />,
      isOnline: true,
      color: { bg: "bg-blue-50", text: "text-[#0055FF]", subtext: "text-emerald-600" }
    },
    {
      title: "New Applications",
      value: counts.applications.toLocaleString(),
      subtext: `Total submissions`,
      icon: <HiOutlineClipboardList size={20} />,
      isOnline: false,
      color: { bg: "bg-emerald-50", text: "text-emerald-600", subtext: "text-emerald-500" }
    },
    {
      title: "Institutions",
      value: counts.institutes,
      subtext: "Global Partners",
      icon: <HiOutlineAcademicCap size={20} />,
      isOnline: false,
      color: { bg: "bg-orange-50", text: "text-orange-600", subtext: "text-slate-400" }
    },
    {
      title: "Stories Published",
      value: counts.events,
      subtext: "Manage Gallery",
      icon: <HiOutlinePhotograph size={20} />,
      isOnline: false,
      color: { bg: "bg-purple-50", text: "text-purple-600", subtext: "text-[#0055FF] underline cursor-pointer" }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatusCard key={index} {...stat} loading={loading} />
      ))}
    </div>
  );
};

export default StatusGrid;