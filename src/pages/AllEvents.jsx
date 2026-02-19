import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/events.json')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-black uppercase italic tracking-[0.3em] text-slate-400">
            Fetching Events...
        </div>
    );

    return (
        <div className="pt-28 pb-20 px-4 md:px-6 bg-[#fcfcfd]">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-12 md:mb-16">
                    <span className="text-blue-600 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">Archive 2026</span>
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                        Discovery <span className="text-blue-600 not-italic">&</span> Events
                    </h1>
                    <div className="h-1 w-20 bg-blue-600 mt-6 rounded-full"></div>
                </div>

                {/* Grid Setup: grid-cols-2 for mobile, grid-cols-3/4 for desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
                    {events.map((event, index) => (
                        <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
                        >
                            {/* Image Wrapper */}
                            <div className="relative h-32 md:h-52 rounded-[1rem] md:rounded-[2rem] overflow-hidden mb-5">
                                <img 
                                    src={event.image} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    alt={event.title} 
                                />
                                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                                    <span className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[7px] md:text-[9px] font-black uppercase tracking-widest">
                                        {event.type}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-1">
                                <div className="flex items-center gap-1.5 text-blue-600 mb-2">
                                    <HiOutlineCalendar className="shrink-0" size={14} />
                                    <span className="font-black text-[8px] md:text-[10px] uppercase tracking-wider">{event.date}</span>
                                </div>
                                
                                <h3 className="text-[11px] md:text-lg font-black text-slate-900 mb-4 uppercase italic leading-tight line-clamp-2 h-8 md:h-12 group-hover:text-blue-600 transition-colors">
                                    {event.title}
                                </h3>

                                <div className="flex items-center gap-1.5 text-slate-400 mb-6 font-bold text-[8px] md:text-[11px] uppercase">
                                    <HiOutlineLocationMarker className="shrink-0" />
                                    <span className="truncate">{event.location.split(',')[0]}</span>
                                </div>

                                <Link to={`/event/${event.id}`}>
                                    <button className="w-full py-3 md:py-4 bg-slate-50 group-hover:bg-blue-600 text-slate-900 group-hover:text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[11px] tracking-widest uppercase transition-all flex items-center justify-center gap-2">
                                        Book Now <HiOutlineArrowRight className="hidden md:block" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* No More Events Note */}
                <div className="mt-20 text-center">
                    <p className="text-slate-300 font-black text-[10px] uppercase tracking-[0.5em]">End of Calendar</p>
                </div>
            </div>
        </div>
    );
};

export default AllEvents;