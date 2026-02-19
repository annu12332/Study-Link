import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpandAlt, FaArrowLeft, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AllPhotos = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        fetch('/gellary.json')
            .then(res => res.json())
            .then(data => setImages(data.data))
            .catch(err => console.error("Error loading gallery:", err));
    }, []);

    const categories = ['All', 'Events', 'Visa', 'Office', 'Success'];
    const filteredImages = activeFilter === 'All' 
        ? images 
        : images.filter(img => img.category === activeFilter);

    return (
        <section className="min-h-screen bg-white pt-24 md:pt-32 pb-20 px-4 md:px-10">
            <div className="max-w-[1600px] mx-auto">
                
                {/* --- Top Navigation & Header --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6 transition-all"
                        >
                            <FaArrowLeft /> Back to Home
                        </button>
                        <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic leading-none tracking-tighter">
                            Photo <span className="text-blue-600">Archive</span>
                        </h1>
                    </div>

                    {/* Desktop Category Filter */}
                    <div className="hidden md:flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                                    activeFilter === cat 
                                    ? 'bg-white text-blue-600 shadow-lg scale-105' 
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Category Filter (Horizontal Scroll) */}
                <div className="flex md:hidden overflow-x-auto gap-3 pb-6 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                                activeFilter === cat 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* --- Photos Grid (Mobile: 2 Column, Desktop: 4 Column) --- */}
                <motion.div 
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredImages.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative aspect-square rounded-[1.5rem] md:rounded-[3rem] overflow-hidden bg-slate-100 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all"
                                onClick={() => setSelectedImage(item)}
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                
                                {/* Hover Info Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-8">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <p className="text-blue-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">{item.category}</p>
                                        <h3 className="text-white font-bold text-xs md:text-lg leading-tight line-clamp-1">{item.title}</h3>
                                    </div>
                                    <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/20 backdrop-blur-md p-2 md:p-3 rounded-full text-white">
                                        <FaExpandAlt size={12} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* --- Empty State --- */}
                {filteredImages.length === 0 && (
                    <div className="py-40 text-center">
                        <FaCamera className="mx-auto text-slate-200 mb-6" size={50} />
                        <h3 className="text-slate-400 font-black uppercase tracking-widest">No Photos Found In This Category</h3>
                    </div>
                )}
            </div>

            {/* --- Premium Lightbox Modal --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-6 right-6 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all">
                            <FaTimes size={20} />
                        </button>

                        <motion.div 
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            className="max-w-6xl w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={selectedImage.image} 
                                className="max-h-[75vh] w-auto object-contain rounded-2xl md:rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.3)]"
                                alt={selectedImage.title}
                            />
                            <div className="mt-8 text-center px-6">
                                <h3 className="text-white text-xl md:text-4xl font-black uppercase italic tracking-tight">{selectedImage.title}</h3>
                                <p className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mt-3">{selectedImage.category}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AllPhotos;