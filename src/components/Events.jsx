import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Events = () => {
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

    if (loading) return <div className="py-20 text-center font-black animate-pulse tracking-widest text-slate-400">LOADING...</div>;

    return (
        <section className="bg-white py-16 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Minimal Header */}
                <div className="flex items-end justify-between mb-10 border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase italic leading-none">
                            Upcoming <span className="text-blue-600">Events</span>
                        </h2>
                        <p className="text-slate-400 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Global Education Seminars</p>
                    </div>
                    <Link to="/all-events" className="hidden sm:flex items-center gap-2 text-blue-600 font-black text-[10px] tracking-widest uppercase hover:gap-4 transition-all">
                        View All <HiOutlineArrowRight size={14}/>
                    </Link>
                </div>

                {/* Grid Setup: grid-cols-2 for mobile, grid-cols-4 for desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {events.slice(0, 4).map((event) => (
                        <motion.div
                            key={event.id}
                            whileHover={{ y: -5 }}
                            className="group bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-5 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all"
                        >
                            {/* Card Image */}
                            <div className="relative h-28 md:h-40 rounded-[1rem] md:rounded-[1.5rem] overflow-hidden mb-4">
                                <img src={event.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-0.5 rounded-md text-[7px] font-black uppercase bg-blue-600 text-white shadow-lg">
                                        {event.type}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex items-center gap-1.5 text-blue-600 mb-1.5 font-bold text-[8px] md:text-[9px] uppercase">
                                <HiOutlineCalendar size={12}/> {event.date.split(',')[0]} {/* তারিখ ছোট করার জন্য শুধু দিন দেখাচ্ছি */}
                            </div>
                            
                            <h3 className="text-[10px] md:text-sm font-black text-slate-900 mb-3 line-clamp-2 uppercase leading-tight h-8 md:h-10">
                                {event.title}
                            </h3>
                            
                            <div className="flex items-center gap-1.5 text-slate-400 text-[8px] md:text-[9px] font-bold uppercase mb-4">
                                <HiOutlineLocationMarker className="shrink-0" size={12} /> 
                                <span className="truncate">{event.location.split(',')[0]}</span>
                            </div>

                            <Link to={`/event/${event.id}`}>
                                <button className="w-full py-2.5 md:py-3 bg-white border border-slate-200 group-hover:bg-slate-900 group-hover:text-white rounded-xl font-black text-[8px] md:text-[9px] tracking-widest transition-all uppercase">
                                    Details
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="mt-8 sm:hidden">
                    <Link to="/all-events">
                        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase">
                            Explore All Events
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Events;