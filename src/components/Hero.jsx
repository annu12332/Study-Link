import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        tag: "Admission 2026",
        title: "Your Future Starts with Quality Education",
        description: "Expert guidance for UK, USA, and Canada. We simplify your visa process from start to finish.",
        image: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260",
    },
    {
        id: 2,
        tag: "Global Scholarships",
        title: "Find Your Perfect University Abroad",
        description: "Connect with 500+ top-ranked global universities. Find the best scholarships for your profile.",
        image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260",
    },
    {
        id: 3,
        tag: "Visa Success 99%",
        title: "Seamless Visa & Career Guidance",
        description: "Dedicated team for perfect documentation. Achieve your dreams with Study Link’s premium services.",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260",
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative w-full h-[80vh] md:h-[85vh] bg-[#F8FAFC] overflow-hidden">
            {/* Background Layer */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img src={slides[current].image} alt="Study Abroad" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-transparent md:bg-gradient-to-r md:from-white/95 md:via-white/80 md:to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
                <div className="w-full max-w-xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Compact Tag */}
                            <div className="inline-flex items-center px-2.5 py-1 rounded bg-blue-600/10 border border-blue-600/10 text-[#0055FF] font-bold text-[10px] uppercase tracking-widest mb-4">
                                {slides[current].tag}
                            </div>

                            {/* Headline */}
                            <h1 className="text-3xl md:text-5xl lg:text-[54px] font-black text-slate-900 leading-[1.1] mb-4 tracking-tight uppercase italic">
                                {slides[current].title.split(' ').map((word, i) => (
                                    <span key={i} className={["Future", "Abroad", "Visa", "Success"].includes(word) ? "text-[#0055FF]" : ""}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>

                            {/* Short Description */}
                            <p className="text-xs md:text-sm text-slate-500 mb-8 leading-relaxed max-w-[380px] font-medium">
                                {slides[current].description}
                            </p>

                            {/* Compact Vertical Buttons */}
                            <div className="flex flex-col gap-3 w-fit">
                                {/* 1. Analyze My Eligibility (Navy Blue) */}
                                <Link to="/eligibility">
                                    <button className="flex items-center gap-3 px-5 py-3 bg-[#111827] hover:bg-slate-800 text-white rounded-lg font-bold text-xs md:text-sm transition-all shadow-lg active:scale-95 group">
                                        Analyze My Eligibility
                                        <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                                    </button>
                                </Link>

                                {/* 2. Start Application (Vibrant Blue) 
                                <Link to="/apply">
                                    <button className="flex items-center gap-3 px-5 py-2.5 bg-[#0055FF] hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] uppercase tracking-widest transition-all shadow-md active:scale-95">
                                        Start Application
                                        <HiArrowRight size={12} />
                                    </button> 
                                </Link>*/}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute bottom-10 left-0 right-0">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                    {/* Progress Dots */}
                    <div className="flex items-center gap-1.5">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-1 transition-all duration-300 rounded-full ${current === i ? 'w-6 bg-[#0055FF]' : 'w-2 bg-slate-300'}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                        <button onClick={prevSlide} className="w-9 h-9 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white transition-all active:scale-90 shadow-sm">
                            <HiChevronLeft size={18} />
                        </button>
                        <button onClick={nextSlide} className="w-9 h-9 rounded-lg bg-[#111827] flex items-center justify-center text-white hover:bg-[#0055FF] transition-all active:scale-90 shadow-md">
                            <HiChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;