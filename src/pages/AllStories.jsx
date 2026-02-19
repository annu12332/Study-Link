import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaGraduationCap, FaGlobe, FaTimes, FaArrowLeft, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AllStoriesPage = () => {
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        // Fetching the 8 stories from your JSON
        fetch('/stories.json')
            .then(res => res.json())
            .then(data => {
                setStories(data.stories);
                setFilteredStories(data.stories);
            });
    }, []);

    // Filter Logic
    const handleFilter = (country) => {
        setActiveFilter(country);
        if (country === 'All') {
            setFilteredStories(stories);
        } else {
            setFilteredStories(stories.filter(s => s.country === country));
        }
    };

    const countries = ['All', 'UK', 'Canada', 'Australia', 'Germany', 'Finland'];

    return (
        <section className="bg-white min-h-screen py-16 md:py-28 px-4 md:px-12 relative overflow-hidden">
            {/* Soft Background Blur Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-[100px] -z-10 opacity-50" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-[120px] -z-10 opacity-50" />

            <div className="max-w-7xl mx-auto">

                {/* --- Header & Navigation --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6"
                        >
                            <FaArrowLeft /> Back to Home
                        </button>
                        <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                            Success <span className="text-blue-600 not-italic">Archive</span>
                        </h1>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 w-full md:w-auto overflow-x-auto no-scrollbar">
                        {countries.map((c) => (
                            <button
                                key={c}
                                onClick={() => handleFilter(c)}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === c
                                        ? 'bg-white text-blue-600 shadow-md scale-105'
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Stories Grid: 2 Col Mobile, 3 Col Desktop --- */}
                <motion.div
                    layout
                    className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredStories.map((story) => (
                            <motion.div
                                key={story.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -8 }}
                                onClick={() => setSelectedStory(story)}
                                className="bg-white p-4 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-200/20 transition-all cursor-pointer group flex flex-col h-full"
                            >
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-6 mb-6">
                                    <div className="relative shrink-0">
                                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-inner ring-4 ring-slate-50">
                                            <img src={story.image} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-md shadow-lg hidden md:block">
                                            <FaQuoteLeft size={8} />
                                        </div>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h4 className="font-black text-slate-900 text-[11px] md:text-xl uppercase italic leading-tight">{story.name}</h4>
                                        <p className="text-blue-600 text-[8px] md:text-xs font-black uppercase tracking-widest mt-1">{story.country}</p>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-[10px] md:text-base leading-snug md:leading-relaxed font-medium mb-6 line-clamp-3 md:line-clamp-4">
                                    "{story.quote}"
                                </p>

                                <div className="mt-auto pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase text-slate-400 mb-3">
                                        <FaGraduationCap className="text-blue-600" /> {story.university}
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => <FaStar key={i} className="text-orange-400" size={10} />)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* --- Detailed Modal --- */}
                <AnimatePresence>
                    {selectedStory && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
                            onClick={() => setSelectedStory(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 30 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 30 }}
                                className="bg-white max-w-3xl w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden relative shadow-[0_0_100px_rgba(59,130,246,0.2)]"
                                onClick={e => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedStory(null)}
                                    className="absolute top-6 right-6 p-4 bg-slate-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all z-10"
                                >
                                    <FaTimes />
                                </button>

                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Image Side */}
                                    <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                                        <img src={selectedStory.image} className="w-full h-full object-cover" alt="" />
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full md:w-3/5 p-8 md:p-14 flex flex-col">
                                        <span className="text-blue-600 font-black text-[10px] tracking-[0.3em] uppercase mb-4 block">Visa Success Story</span>
                                        <h3 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic leading-none mb-2">{selectedStory.name}</h3>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] mb-8 flex items-center gap-2">
                                            <FaGlobe className="text-blue-600" /> {selectedStory.university}
                                        </p>

                                        <div className="flex-grow">
                                            <p className="text-slate-600 text-sm md:text-lg leading-relaxed font-medium italic mb-6">
                                                "{selectedStory.quote}"
                                            </p>
                                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                                                {selectedStory.details}
                                            </p>
                                        </div>

                                        <div className="mt-10 flex flex-wrap gap-3">
                                            <div className="bg-emerald-50 text-emerald-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {selectedStory.country} Visa Approved
                                            </div>
                                            <div className="bg-blue-50 text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {selectedStory.course}
                                            </div>
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

export default AllStoriesPage;