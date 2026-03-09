import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLocationMarker, HiSearch, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AllInstitutes = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstitutes = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/all-institutes');
                if (res.data.success) {
                    setData(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInstitutes();
    }, []);

    const filtered = data.filter(i => 
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        i.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
                    <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Loading Directory...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="pt-32 pb-24 bg-slate-50 min-h-screen px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3 block"
                        >
                            Partner Institutions
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-4xl font-black text-slate-900 italic uppercase leading-none"
                        >
                            Global <span className="text-blue-600 not-italic">Directory</span>
                        </motion.h1>
                        <p className="text-slate-500 font-medium mt-6 text-sm md:text-lg border-l-4 border-blue-600 pl-4">
                            Explore <span className="text-slate-900 font-bold">{data.length}+</span> premier universities around the globe.
                        </p>
                    </div>
                    
                    {/* Modern Search Bar */}
                    <div className="relative w-full md:w-auto">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 z-10 text-xl">
                            <HiSearch />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search university..." 
                            className="bg-white border-2 border-slate-100 rounded-none py-4 md:py-5 pl-14 pr-8 w-full md:w-[400px] focus:ring-0 focus:border-blue-600 font-bold text-slate-800 shadow-xl shadow-slate-200/50 transition-all placeholder:text-slate-300 outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid Section - Resized for Specific Screens */}
                {/* grid-cols-2 (mobile), md:grid-cols-3 (tablet), lg:grid-cols-4 (desktop) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filtered.map((inst) => (
                            <motion.div
                                layout
                                key={inst._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link to={`/institute/${inst.slug}`} className="block group">
                                    <div className="relative bg-white border border-slate-200 aspect-square overflow-hidden flex flex-col transition-all duration-500 group-hover:border-blue-600 group-hover:shadow-xl group-hover:shadow-blue-100/50">
                                        
                                        {/* Image Area */}
                                        <div className="relative h-3/5 md:h-2/3 overflow-hidden">
                                            <img 
                                                src={inst.image || "https://via.placeholder.com/600x600?text=University"} 
                                                alt={inst.name} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            />
                                            {/* Floating Badge */}
                                            <div className="absolute top-2 left-2 md:top-4 md:left-4">
                                                <span className="bg-blue-600 text-white text-[8px] md:text-[10px] font-black px-2 py-1 uppercase tracking-tighter italic">
                                                    {inst.country}
                                                </span>
                                            </div>
                                            {/* Hover Overlay - Hidden on small touch screens for better UX */}
                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center">
                                                <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                    View <HiArrowRight />
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="h-2/5 md:h-1/3 p-3 md:p-5 flex flex-col justify-between bg-white relative">
                                            <div>
                                                <h3 className="text-xs md:text-lg font-black text-slate-900 uppercase italic leading-tight line-clamp-2 transition-colors group-hover:text-blue-600">
                                                    {inst.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-slate-400 mt-1 md:mt-2 text-[8px] md:text-[11px] font-bold uppercase tracking-wider">
                                                    <HiLocationMarker className="text-blue-600" /> 
                                                    <span className="truncate">{inst.location}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Bottom Decorative Line */}
                                            <div className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-500 w-0 group-hover:w-full" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filtered.length === 0 && (
                    <div className="text-center py-24 border-2 border-dashed border-slate-200">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-200 uppercase italic">No Match Found</h2>
                        <p className="text-slate-400 mt-2 text-xs md:text-base">Try searching with a different keyword</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllInstitutes;