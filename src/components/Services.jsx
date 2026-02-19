import React, { useState, useEffect } from 'react';
import { 
    Users, School, GraduationCap, Home, 
    FileText, Plane, Car, Languages, ArrowRight, Loader2, Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const IconMap = { Users, School, GraduationCap, Home, FileText, Plane, Car, Languages };

const Services = () => {
    const [services, setServices] = useState([]);
    const [sectionInfo, setSectionInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/services.json'); 
                if (!response.ok) throw new Error('Failed to load services data');
                const jsonData = await response.json();

                if (jsonData && jsonData.data) {
                    setServices(jsonData.data);
                    setSectionInfo(jsonData.section_info);
                } else {
                    throw new Error('Invalid JSON structure');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: "spring", stiffness: 100 } 
        }
    };

    if (loading) return (
        <div className="h-96 flex items-center justify-center bg-white">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        </div>
    );

    if (error) return (
        <div className="text-red-500 text-center py-20 bg-white">
            <p className="font-semibold px-4 py-2 bg-red-50 inline-block rounded-lg">Error: {error}</p>
        </div>
    );

    return (
        <section className="bg-white py-16 md:py-32 px-4 md:px-6 relative overflow-hidden">
            {/* Animated Background Accents */}
            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-50/60 rounded-full blur-[80px] md:blur-[120px] -z-10" 
            />

            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 text-blue-600 text-[9px] md:text-xs font-black tracking-[0.3em] uppercase border border-blue-100 px-4 py-2 rounded-full bg-white shadow-sm mb-5">
                            <Sparkles size={14} className="animate-pulse" /> {sectionInfo.badge || "Our Expertise"}
                        </span>
                        <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight uppercase italic">
                            {sectionInfo.title?.split(' ')[0]} <span className="text-blue-600 not-italic">{sectionInfo.title?.split(' ')[1]}</span>
                        </h2>
                        <p className="text-slate-500 mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-lg font-medium px-4">
                            {sectionInfo.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Services Grid - Mobile: 2 columns, Desktop: 4 columns */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8"
                >
                    {services.slice(0, 4).map((service, index) => {
                        const IconComponent = IconMap[service.icon] || Users;
                        const isHighlighted = service.is_highlighted;

                        return (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className={`group relative p-5 md:p-10 rounded-2xl md:rounded-[3rem] border transition-all duration-500
                                    ${isHighlighted
                                        ? 'bg-slate-900 border-slate-900 shadow-xl md:shadow-2xl shadow-blue-200 lg:scale-105 z-10'
                                        : 'bg-white border-slate-100 hover:shadow-2xl hover:shadow-slate-200 hover:border-transparent'
                                    }`}
                            >
                                {/* Icon Container */}
                                <div className={`mb-4 md:mb-8 inline-flex p-3 md:p-5 rounded-xl md:rounded-2xl transition-all duration-500 shadow-sm
                                    ${isHighlighted 
                                        ? 'bg-blue-600 text-white shadow-blue-900/20' 
                                        : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-200'
                                    }`}>
                                    <IconComponent size={24} className="md:w-8 md:h-8" strokeWidth={2.5} />
                                </div>

                                <h3 className={`font-black text-sm md:text-xl mb-2 md:mb-4 leading-tight uppercase
                                    ${isHighlighted ? 'text-white' : 'text-slate-900'}`}>
                                    {service.title}
                                </h3>

                                <p className={`text-[10px] md:text-sm leading-relaxed font-medium line-clamp-3 md:line-clamp-none
                                    ${isHighlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {service.description}
                                </p>

                                {/* Hover Accent Line (Only for non-highlighted & visible on desktop) */}
                                {!isHighlighted && (
                                    <motion.div 
                                        className="hidden md:block absolute bottom-8 left-10 h-1 bg-blue-600 rounded-full"
                                        initial={{ width: 32 }}
                                        whileHover={{ width: 64 }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 md:mt-20 text-center"
                >
                    <Link to={'/services'}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 md:gap-3 text-white font-black bg-blue-600 hover:bg-slate-900 px-7 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl transition-all shadow-lg md:shadow-xl shadow-blue-100 text-[10px] md:text-sm tracking-widest uppercase group"
                        >
                            EXPLORE ALL SERVICES
                            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;