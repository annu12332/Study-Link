import React from 'react';

const StatusCard = ({ title, value, icon, colorTheme = "blue" }) => {
    // Dynamic color mapping jate frontend e bar bar full class likhte na hoy
    const themeClasses = {
        emerald: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600",
        amber: "bg-amber-50 text-amber-600",
        rose: "bg-rose-50 text-rose-600",
        indigo: "bg-indigo-50 text-indigo-600"
    };

    const activeTheme = themeClasses[colorTheme] || themeClasses.blue;

    return (
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            {/* Icon Container with subtle animation */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 ${activeTheme}`}>
                {icon}
            </div>
            
            <div>
                {/* Title: Nature/Eco-luxury styling */}
                <p className="text-[10px] font-extrabold uppercase tracking-[2.5px] text-slate-400 mb-1">
                    {title}
                </p> 
                
                {/* Value: Dynamic counter ba static value */}
                <h3 className="text-4xl font-black text-slate-900 leading-tight">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </h3>
            </div>
        </div>
    );
};

export default StatusCard;