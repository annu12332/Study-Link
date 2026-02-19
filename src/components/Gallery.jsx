import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpandAlt, FaTimes, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetch('/gellary.json')
            .then(res => res.json())
            .then(data => setImages(data.data));
    }, []);

    const categories = ['All', 'Events', 'Visa', 'Office'];
    const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

    return (
        <section className="bg-white py-10 md:py-16 px-4 md:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* Header & Filter - Compact Layout */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-10 gap-6">
                    <div className="text-center md:text-left">
                        <span className="text-blue-600 text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase block mb-1">MEMORIES</span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 uppercase italic leading-tight tracking-tight">
                            Visual <span className="text-blue-600">Gallery</span>
                        </h2>
                    </div>

                    {/* Compact Filter Tabs */}
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 overflow-x-auto max-w-full scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 md:px-5 md:py-2 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    filter === cat 
                                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-100' 
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid: 2 columns mobile, 4 columns from MD upwards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredImages.slice(0, 4).map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="relative group aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-all"
                                onClick={() => setSelectedImage(item)}
                            >
                                <img 
                                    src={item.image} 
                                    alt="" 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                                />
                                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
                                        <FaExpandAlt className="text-white text-sm md:text-lg" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Bottom Action Link */}
                <div className="mt-8 md:mt-10 text-center">
                    <Link to={'/photos'}>
                        <button className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all inline-flex items-center gap-2 group">
                            Explore Full Experience 
                            <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>

                {/* Lightbox Preview - Enhanced UX */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center"
                            onClick={() => setSelectedImage(null)}
                        >
                            <button className="absolute top-5 right-5 text-white p-3 z-[110] bg-white/10 rounded-full hover:bg-red-500 transition-colors">
                                <FaTimes size={16} />
                            </button>
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="relative max-w-4xl w-full flex flex-col items-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img 
                                    src={selectedImage.image} 
                                    className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl ring-1 ring-white/20" 
                                    alt={selectedImage.title} 
                                />
                                <div className="mt-5 text-center px-4">
                                    <h3 className="text-white text-lg md:text-2xl font-black uppercase italic tracking-tight">{selectedImage.title}</h3>
                                    <div className="inline-block mt-2 px-3 py-1 bg-blue-600 rounded-lg">
                                        <p className="text-white font-bold uppercase tracking-widest text-[8px] md:text-[9px]">{selectedImage.category}</p>
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

export default Gallery;