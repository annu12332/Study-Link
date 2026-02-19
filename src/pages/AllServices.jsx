import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Sparkles, HelpCircle } from 'lucide-react';
import * as Icons from "lucide-react";

const AllServices = () => {
    const [servicesData, setServicesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/services.json')
            .then((response) => response.json())
            .then((data) => {
                setServicesData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    // Container variants for stagger effect
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
        }
    };

    // Card variants
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: "spring", stiffness: 100, damping: 12 } 
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
                <Loader2 className="text-blue-600 w-12 h-12" />
            </motion.div>
        </div>
    );

    if (!servicesData) return <div className="text-center py-20 font-black text-slate-400">No data found!</div>;

    return (
        <section className="relative py-20 md:py-32 bg-[#f8fafc] min-h-screen overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-200/40 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-sm mb-6">
                            <Sparkles size={14} /> {servicesData.section_info.badge}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
                            Our <span className="text-blue-600 not-italic">All</span> Services
                        </h2>
                        <div className="w-12 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
                        <p className="text-slate-500 font-bold mt-6 uppercase tracking-[0.15em] text-[10px] md:text-xs max-w-lg mx-auto leading-relaxed">
                            {servicesData.section_info.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Services Grid - Mobile: 2 columns, Tablet: 2, Desktop: 4 */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
                >
                    {servicesData.data.map((service) => {
                        const IconComponent = Icons[service.icon] || HelpCircle;
                        
                        return (
                            <motion.div key={service.id} variants={itemVariants}>
                                <Link 
                                    to={`/service/${service.id}`} 
                                    className="group relative h-full bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Hover background splash */}
                                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 -z-10" />

                                    <div>
                                        {/* Icon Container */}
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                                            service.is_highlighted 
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                            : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                                        }`}>
                                            <IconComponent size={24} className="md:w-8 md:h-8" strokeWidth={2.5} />
                                        </div>

                                        <h3 className="text-sm md:text-xl font-black text-slate-900 mb-3 tracking-tight uppercase group-hover:text-blue-600 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 text-[10px] md:text-sm leading-relaxed mb-6 font-medium line-clamp-4 md:line-clamp-none transition-colors group-hover:text-slate-600">
                                            {service.description}
                                        </p>
                                    </div>
                                    
                                    {/* Footer Link with arrow animation */}
                                    <div className="flex items-center text-blue-600 font-black text-[9px] md:text-[10px] tracking-[0.2em] uppercase gap-2 mt-auto">
                                        Learn More 
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            <ArrowRight size={14} className="md:w-4 md:h-4" />
                                        </motion.span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default AllServices;