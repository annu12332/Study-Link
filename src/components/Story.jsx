import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaGraduationCap, FaGlobe, FaTimes, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SuccessStories = () => {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);

    useEffect(() => {
        fetch('/stories.json')
            .then(res => res.json())
            .then(data => setStories(data.stories));
    }, []);

    return (
        <section className="bg-white py-8 md:py-12 px-4 md:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header - Ultra Compact */}
                <div className="flex flex-col items-center text-center mb-6 md:mb-8">
                    <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="text-blue-600 text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase block mb-1">
                            TESTIMONIALS
                        </span>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase leading-none mb-2">
                            Global <span className="text-blue-600 italic">Impact</span>
                        </h2>
                        <Link to="/all-stories" className="group inline-flex items-center gap-1.5 text-slate-500 font-bold text-[8px] md:text-[9px] uppercase tracking-widest hover:text-blue-600 transition-all">
                            View All Alumni <FaArrowRight size={8} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Grid: 2 Columns on small, 4 Columns from MD Screen upwards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
                    {stories.slice(0, 4).map((story) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -4 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedStory(story)}
                            className="bg-slate-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-100 cursor-pointer group transition-all hover:bg-white hover:shadow-lg hover:shadow-blue-100/40"
                        >
                            <div className="relative mb-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden shadow-sm ring-2 ring-white">
                                    <img src={story.image} className="w-full h-full object-cover" alt={story.name} />
                                </div>
                                <FaQuoteLeft className="absolute -bottom-1 -right-1 text-blue-600 text-[7px] md:text-[8px] bg-white p-1 rounded shadow-sm" />
                            </div>

                            <h4 className="text-[10px] md:text-xs font-black text-slate-900 mb-0.5 uppercase italic leading-tight truncate">
                                {story.name}
                            </h4>
                            
                            <div className="flex items-center gap-1 text-blue-600 text-[7px] md:text-[8px] font-bold uppercase tracking-tighter mb-2">
                                <FaGraduationCap size={8} /> {story.country}
                            </div>

                            <p className="text-slate-500 text-[8px] md:text-[10px] leading-tight line-clamp-3 mb-3 font-medium italic">
                                "{story.quote}"
                            </p>

                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-orange-400 text-[6px] md:text-[7px]" />)}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal Detail View */}
                <AnimatePresence>
                    {selectedStory && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center"
                            onClick={() => setSelectedStory(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="bg-white max-w-sm md:max-w-md w-full rounded-2xl overflow-hidden relative shadow-2xl"
                                onClick={e => e.stopPropagation()}
                            >
                                <button onClick={() => setSelectedStory(null)} className="absolute top-3 right-3 p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all z-10">
                                    <FaTimes size={10} />
                                </button>
                                
                                <div className="p-5 md:p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <img src={selectedStory.image} className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover shadow-lg" alt="" />
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 uppercase italic leading-none mb-1">{selectedStory.name}</h3>
                                            <p className="text-blue-600 font-bold text-[8px] uppercase tracking-widest">{selectedStory.university}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <p className="text-xs md:text-sm italic text-slate-900 font-bold leading-tight">"{selectedStory.quote}"</p>
                                        <p className="text-[10px] md:text-[12px] text-slate-600 font-medium leading-relaxed">{selectedStory.details}</p>
                                    </div>

                                    <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
                                        <div className="flex items-center gap-1 text-[8px] font-black uppercase text-slate-400">
                                            <FaGlobe size={8} /> {selectedStory.course}
                                        </div>
                                        <div className="bg-blue-600 text-white px-2 py-1 rounded text-[7px] font-black uppercase">
                                            {selectedStory.country} Visa Granted
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default SuccessStories;