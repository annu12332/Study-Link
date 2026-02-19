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
        <section className="relative w-full h-[85vh] md:h-[90vh] bg-[#fdfeff] overflow-hidden">
            {/* Background with Zoom Effect */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[current].image}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Compact Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/10 md:bg-gradient-to-r md:from-white md:via-white/70 md:to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
                <div className="w-full max-w-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                            className="p-2 md:p-0"
                        >
                            {/* Compact Tag */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600/10 backdrop-blur-md border border-blue-600/20 text-blue-600 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4"
                            >
                                {slides[current].tag}
                            </motion.div>

                            {/* Ultra Compact Title */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-4 tracking-tighter uppercase italic">
                                {slides[current].title.split(' ').map((word, i) => (
                                    <span key={i} className={["Future", "Abroad", "Visa", "Success"].includes(word) ? "text-blue-600" : ""}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>

                            {/* Focused Description */}
                            <p className="text-sm md:text-lg text-slate-500 mb-8 leading-relaxed max-w-md font-medium">
                                {slides[current].description}
                            </p>

                            {/* Compact Buttons */}
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <Link to="/apply" className="w-full sm:w-auto">
                                    <button className="w-full px-7 py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95">
                                        Start Application
                                        <HiArrowRight />
                                    </button>
                                </Link>

                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Pagination Controls - Repositioned for Compactness */}
            <div className="absolute bottom-8 left-0 right-0">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

                    {/* Minimal Pagination */}
                    <div className="flex items-center gap-1.5">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className="relative py-2 outline-none group"
                            >
                                <div className={`transition-all duration-500 rounded-full h-1 ${current === i ? 'w-8 bg-blue-600' : 'w-4 bg-slate-300 group-hover:bg-slate-400'
                                    }`} />
                            </button>
                        ))}
                    </div>

                    {/* Compact Arrows */}
                    <div className="flex gap-2">
                        <button
                            onClick={prevSlide}
                            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white transition-all active:scale-90 bg-white/40 backdrop-blur-md"
                        >
                            <HiChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-blue-600 transition-all active:scale-90"
                        >
                            <HiChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Side Element (Optional) */}
            <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-48 h-48 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default Hero;