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
        <section className="bg-white py-16 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Header & Filter */}
                <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic">
                            Visual <span className="text-blue-600">Gallery</span>
                        </h2>
                    </div>

                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 overflow-x-auto max-w-full">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 md:px-6 md:py-2.5 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    filter === cat ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Setup: 2 columns mobile, 3/4 columns desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredImages.slice(0, 4).map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative group aspect-square rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 cursor-pointer"
                                onClick={() => setSelectedImage(item)}
                            >
                                <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <FaExpandAlt className="text-white text-xl md:text-2xl" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Lightbox Preview */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md p-4 md:p-10 flex items-center justify-center"
                            onClick={() => setSelectedImage(null)}
                        >
                            <button className="absolute top-6 right-6 text-white p-4 z-[110] bg-white/10 rounded-full"><FaTimes size={20} /></button>
                            <motion.div 
                                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                                className="relative max-w-5xl w-full flex flex-col items-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src={selectedImage.image} className="max-h-[70vh] w-full object-contain rounded-3xl shadow-2xl" alt="" />
                                <div className="mt-6 text-center">
                                    <h3 className="text-white text-xl md:text-3xl font-black uppercase italic">{selectedImage.title}</h3>
                                    <p className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">{selectedImage.category}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 text-center">
                    <Link to={'/photos'}><button className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 hover:text-blue-600 transition-colors inline-flex items-center gap-2">
                        View Full Experience <FaArrowRight />
                    </button></Link>
                </div>
            </div>
        </section>
    );
};

export default Gallery;