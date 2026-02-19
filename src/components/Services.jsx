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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
        }
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: "spring", stiffness: 100 } 
        }
    };

    if (loading) return (
        <div className="h-64 flex items-center justify-center bg-white">
            <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
    );

    if (error) return (
        <div className="text-red-500 text-center py-10 bg-white">
            <p className="text-xs font-bold px-4 py-2 bg-red-50 inline-block rounded-lg uppercase tracking-wider">Error: {error}</p>
        </div>
    );

    return (
        <section className="bg-white py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
            {/* Background Accents - Scaled down for compactness */}
            <div className="absolute top-0 right-0 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-blue-50/50 rounded-full blur-[80px] -z-10" />

            <div className="max-w-7xl mx-auto">
                
                {/* Header Section - More Compact */}
                <div className="text-center mb-10 md:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 text-blue-600 text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase border border-blue-100 px-3 py-1.5 rounded-full bg-white shadow-sm mb-4">
                            <Sparkles size={12} /> {sectionInfo.badge || "Our Expertise"}
                        </span>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight uppercase italic">
                            {sectionInfo.title?.split(' ')[0]} <span className="text-blue-600 not-italic">{sectionInfo.title?.split(' ')[1]}</span>
                        </h2>
                        <p className="text-slate-500 mt-3 max-w-xl mx-auto text-[11px] md:text-sm font-medium px-4 leading-relaxed">
                            {sectionInfo.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Services Grid - Compact Gaps */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
                >
                    {services.slice(0, 4).map((service) => {
                        const IconComponent = IconMap[service.icon] || Users;
                        const isHighlighted = service.is_highlighted;

                        return (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className={`group relative p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border transition-all duration-300
                                    ${isHighlighted
                                        ? 'bg-slate-900 border-slate-900 shadow-xl shadow-blue-100/50 z-10'
                                        : 'bg-white border-slate-100 hover:shadow-xl hover:shadow-slate-100 hover:border-transparent'
                                    }`}
                            >
                                {/* Icon Container - Sized down */}
                                <div className={`mb-4 md:mb-6 inline-flex p-2.5 md:p-4 rounded-xl transition-all duration-300
                                    ${isHighlighted 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                                    }`}>
                                    <IconComponent size={20} className="md:w-6 md:h-6" strokeWidth={2.5} />
                                </div>

                                <h3 className={`font-black text-[11px] md:text-base mb-1.5 md:mb-3 leading-tight uppercase
                                    ${isHighlighted ? 'text-white' : 'text-slate-900'}`}>
                                    {service.title}
                                </h3>

                                <p className={`text-[10px] md:text-[13px] leading-relaxed font-medium line-clamp-3 md:line-clamp-4
                                    ${isHighlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {service.description}
                                </p>

                                {/* Hover Line */}
                                {!isHighlighted && (
                                    <div className="hidden md:block absolute bottom-6 left-8 w-6 h-0.5 bg-blue-600 rounded-full group-hover:w-12 transition-all duration-300" />
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA Button Section - Reduced Margin */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 md:mt-14 text-center"
                >
                    <Link to={'/services'}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 text-white font-bold bg-blue-600 hover:bg-slate-900 px-6 py-3.5 md:px-8 md:py-4 rounded-xl transition-all shadow-lg shadow-blue-100 text-[10px] md:text-xs tracking-widest uppercase group"
                        >
                            EXPLORE ALL SERVICES
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;