import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import {
    HiCheckBadge,
    HiArrowUpRight,
    HiAcademicCap,
    HiGlobeAmericas
} from 'react-icons/hi2';

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
        <span ref={ref} className="text-2xl md:text-4xl font-black text-slate-900">
            {displayValue}{suffix}
        </span>
    );
};

const Banner = () => {
    return (
        <section className="relative w-full py-16 md:py-24 lg:py-32 bg-[#fcfcfd] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] z-0 opacity-60" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] z-0 opacity-60" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-8 shadow-sm">
                            <HiCheckBadge className="text-lg" />
                            Premier Choice for Students
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tighter">
                            Elevate Your <span className="text-blue-600">Future</span> <br className="hidden md:block" />
                            with Global Education
                        </h1>

                        <p className="text-base md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl font-medium">
                            <span className="font-bold text-blue-600">Faith Overseas Ltd.</span> bridges the gap between you and your dream university with sophisticated, transparent processing.
                        </p>

                        {/* White Glass Stats Row */}
                        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-12">
                            {[
                                { label: "Success Rate", val: 95, suf: "%", color: "text-blue-600" },
                                { label: "Partners", val: 200, suf: "+", color: "text-emerald-600" },
                                { label: "Visa Granted", val: 2500, suf: "+", color: "text-orange-600" }
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 transition-transform hover:-translate-y-1 duration-300">
                                    <Counter value={item.val} suffix={item.suf} />
                                    <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase mt-2 tracking-wide">{item.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-10 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 active:scale-95 group">
                                Start Application
                                <HiArrowUpRight className="text-xl group-hover:rotate-45 transition-transform duration-300" />
                            </button>
                            <button className="px-10 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95">
                                Book Consultation
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Side: Visual Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        {/* Decorative background for image */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-emerald-100 rounded-[4rem] blur-2xl opacity-40 -z-10" />
                        
                        <div className="relative z-10 rounded-[3rem] md:rounded-[4.5rem] overflow-hidden border-[8px] border-white shadow-2xl">
                            <img
                                src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260"
                                alt="Faith Overseas Student"
                                className="w-full h-[450px] md:h-[680px] object-cover transition-transform hover:scale-105 duration-700"
                            />

                            {/* Main Glass Card (White) */}
                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-2xl">
                                <div className="flex items-center gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                        <HiAcademicCap size={30} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-base md:text-lg">Verified Institution</h4>
                                        <p className="text-xs text-slate-500 font-bold">Certified by global education boards.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge (White Glass) */}
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 md:flex items-center gap-4 py-4 px-6 bg-white text-slate-900 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-20 border border-slate-50 hidden"
                        >
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                <HiGlobeAmericas className="text-emerald-600 text-3xl animate-pulse" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
                                <span className="text-sm font-black">Global Support</span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Banner;