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
        <section className="bg-white py-20 px-4 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header - Centered Version */}
                <div className="flex flex-col items-center text-center mb-16 gap-4">
                    <div>
                        <span className="text-blue-600 text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase block mb-3">
                            TESTIMONIALS
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                            Global <span className="text-blue-600 italic">Impact</span>
                        </h2>
                    </div>

                    {/* Subtitle or View All link centered */}
                    <Link to="/all-stories" className="group flex items-center gap-3 text-slate-900 font-black text-xs tracking-widest uppercase hover:text-blue-600 transition-all mt-2">
                        View All Alumni <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* Grid: 2 Columns on Mobile, 4 on Desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                    {stories.slice(0, 4).map((story) => (
                        <motion.div
                            key={story.id}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedStory(story)}
                            className="bg-slate-50 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-100 cursor-pointer group transition-all"
                        >
                            <div className="relative mb-6">
                                <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white">
                                    <img src={story.image} className="w-full h-full object-cover" alt="" />
                                </div>
                                <FaQuoteLeft className="absolute -bottom-2 -right-2 text-blue-600 text-xs md:text-lg bg-white p-1 md:p-2 rounded-lg shadow-md" />
                            </div>

                            <h4 className="text-[11px] md:text-xl font-black text-slate-900 mb-1 uppercase italic leading-tight">{story.name}</h4>
                            <div className="flex items-center gap-1 text-blue-600 text-[8px] md:text-[10px] font-bold uppercase tracking-tighter mb-4">
                                <FaGraduationCap /> {story.country}
                            </div>

                            <p className="text-slate-500 text-[9px] md:text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                                "{story.quote}"
                            </p>

                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-orange-400 text-[8px] md:text-xs" />)}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal Detail View */}
                <AnimatePresence>
                    {selectedStory && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm p-4 flex items-center justify-center"
                            onClick={() => setSelectedStory(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                                className="bg-white max-w-2xl w-full rounded-[3rem] overflow-hidden relative"
                                onClick={e => e.stopPropagation()}
                            >
                                <button onClick={() => setSelectedStory(null)} className="absolute top-6 right-6 p-3 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
                                    <FaTimes />
                                </button>
                                <div className="p-8 md:p-12">
                                    <div className="flex items-center gap-6 mb-8">
                                        <img src={selectedStory.image} className="w-24 h-24 rounded-[2rem] object-cover shadow-2xl" alt="" />
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900 uppercase italic">{selectedStory.name}</h3>
                                            <p className="text-blue-600 font-black text-xs uppercase tracking-widest">{selectedStory.university}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
                                        <p className="text-xl italic text-slate-900">"{selectedStory.quote}"</p>
                                        <p>{selectedStory.details}</p>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
                                            <FaGlobe /> {selectedStory.course}
                                        </div>
                                        <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase">
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