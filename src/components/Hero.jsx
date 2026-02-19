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
        <section className="relative w-full h-[70vh] md:h-[80vh] bg-[#fdfeff] overflow-hidden">
            {/* Background with Zoom Effect */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[current].image}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Compact Overlay - increased white density for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/60 to-transparent md:bg-gradient-to-r md:from-white/95 md:via-white/70 md:to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
                <div className="w-full max-w-lg lg:max-w-md"> {/* Restricted width for compactness */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Tag - Smaller & Tighter */}
                            <div className="inline-flex items-center px-2 py-0.5 rounded bg-blue-600/10 border border-blue-600/10 text-blue-600 font-extrabold text-[9px] uppercase tracking-tighter mb-3">
                                {slides[current].tag}
                            </div>

                            {/* Heading - Significantly smaller on large screens */}
                            <h1 className="text-2xl md:text-4xl lg:text-[40px] font-black text-slate-900 leading-[1.1] mb-3 tracking-tight uppercase italic">
                                {slides[current].title.split(' ').map((word, i) => (
                                    <span key={i} className={["Future", "Abroad", "Visa", "Success"].includes(word) ? "text-blue-600" : ""}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>

                            {/* Description - Compact font and narrow max-width */}
                            <p className="text-[11px] md:text-sm text-slate-500 mb-5 leading-snug max-w-[320px] font-medium">
                                {slides[current].description}
                            </p>

                            {/* Button - Scaled down */}
                            <div className="flex items-center">
                                <Link to="/apply">
                                    <button className="px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-md active:scale-95">
                                        Start Application
                                        <HiArrowRight />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Controls - Shifted upwards slightly for a more 'integrated' feel */}
            <div className="absolute bottom-10 left-0 right-0">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

                    {/* Dots - Minimalist */}
                    <div className="flex items-center gap-1">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className="relative py-1 outline-none group"
                            >
                                <div className={`transition-all duration-300 rounded-full h-1 ${current === i ? 'w-5 bg-blue-600' : 'w-1.5 bg-slate-300'}`} />
                            </button>
                        ))}
                    </div>

                    {/* Nav Arrows - Ultra Compact */}
                    <div className="flex gap-1">
                        <button
                            onClick={prevSlide}
                            className="w-7 h-7 rounded bg-white/60 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white transition-all active:scale-90"
                        >
                            <HiChevronLeft size={14} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-7 h-7 rounded bg-slate-900 flex items-center justify-center text-white hover:bg-blue-600 transition-all active:scale-90"
                        >
                            <HiChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;