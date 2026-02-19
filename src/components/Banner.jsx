import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import {
    HiCheckBadge,
    HiArrowUpRight,
    HiAcademicCap,
    HiGlobeAmericas
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const Counter = ({ value, suffix = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);
    
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 40,
        stiffness: 90,
    });

    useEffect(() => {
        if (inView) motionValue.set(value);
    }, [inView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return (
        <span ref={ref} className="text-xl md:text-2xl font-black text-slate-900 leading-none">
            {displayValue}{suffix}
        </span>
    );
};

const Banner = () => {
    return (
        <section className="relative w-full py-12 md:py-20 lg:py-24 bg-[#fcfcfd] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] z-0 opacity-60" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px] z-0 opacity-60" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] uppercase tracking-wider mb-6 shadow-sm">
                            <HiCheckBadge className="text-base" />
                            Premier Choice for Students
                        </div>

                        {/* Heading - Made more compact */}
                        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-900 leading-[1.2] mb-5 tracking-tight">
                            Elevate Your <span className="text-blue-600">Future</span> <br className="hidden md:block" />
                            with Global Education
                        </h1>

                        {/* Description - Size adjusted */}
                        <p className="text-sm md:text-base text-slate-600 mb-8 leading-relaxed max-w-lg font-medium">
                            <span className="font-bold text-blue-600">Study Link Ltd.</span> bridges the gap between you and your dream university with sophisticated, transparent processing.
                        </p>

                        {/* Stats Row - Compact Padding */}
                        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
                            {[
                                { label: "Success Rate", val: 95, suf: "%" },
                                { label: "Partners", val: 200, suf: "+" },
                                { label: "Visa Granted", val: 2500, suf: "+" }
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/40 transition-transform hover:-translate-y-1 duration-300 text-center lg:text-left">
                                    <Counter value={item.val} suffix={item.suf} />
                                    <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wide">{item.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Buttons - Adjusted padding */}
                        <div className="flex flex-wrap gap-3">
                            <Link to={'/apply'}>
                                <button className="px-7 py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 group">
                                    Start Application
                                    <HiArrowUpRight className="text-lg group-hover:rotate-45 transition-transform duration-300" />
                                </button>
                            </Link>
                            <Link to={'/consult'}>
                                <button className="px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95">
                                    Book Consultation
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Side: Visual Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-emerald-100 rounded-[3rem] blur-2xl opacity-40 -z-10" />
                        
                        <div className="relative z-10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-[6px] border-white shadow-2xl">
                            <img
                                src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260"
                                alt="Faith Overseas Student"
                                className="w-full h-[400px] md:h-[580px] object-cover transition-transform hover:scale-105 duration-700"
                            />

                            {/* Main Glass Card (Compact) */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                                        <HiAcademicCap size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Verified Institution</h4>
                                        <p className="text-[10px] text-slate-500 font-semibold">Certified by global education boards.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge (Compact) */}
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 md:flex items-center gap-3 py-3 px-5 bg-white text-slate-900 rounded-2xl shadow-xl z-20 border border-slate-50 hidden"
                        >
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                                <HiGlobeAmericas className="text-emerald-600 text-2xl animate-pulse" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
                                <span className="text-xs font-black">Global Support</span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Banner;