import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Destinations = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('/country.json');
                if (!response.ok) throw new Error('Failed to fetch country data');
                const data = await response.json();
                const popularCountries = data.countries.filter(c => c.is_popular).slice(0, 8);
                setCountries(popularCountries);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    // Container variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
        }
    };

    // Card variants
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: "spring", stiffness: 100 } 
        }
    };

    if (loading) return (
        <div className="h-96 bg-white flex items-center justify-center">
            <Loader2 className="text-blue-600 animate-spin w-10 h-10" />
        </div>
    );

    return (
        <section className="relative bg-[#f8fafc] py-16 md:py-24 px-4 sm:px-12 lg:px-24 overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-100/40 rounded-full blur-[80px] -z-10" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 text-blue-600 text-[8px] md:text-[10px] font-black tracking-[0.4em] uppercase border border-blue-100 px-5 py-2 rounded-full bg-white shadow-sm mb-6">
                            <Sparkles size={12} /> Top Destinations
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter uppercase italic">
                            Global <span className="text-blue-600 not-italic">Education</span> Hubs
                        </h2>
                    </motion.div>
                </div>

                {/* Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
                >
                    {countries.map((country) => (
                        <motion.div key={country.slug} variants={itemVariants}>
                            <Link to={`/country/${country.slug}`}>
                                <motion.div
                                    whileHover="hover" // হোভার করলে চাইল্ড এলিমেন্টগুলোকেও ট্রিগার করবে
                                    className="group relative h-60 md:h-80 rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-200 shadow-lg transition-all duration-500"
                                >
                                    {/* Image */}
                                    <motion.img
                                        src={country.image}
                                        alt={country.country}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        variants={{
                                            hover: { scale: 1.1 }
                                        }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end">
                                        <motion.p 
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                hover: { opacity: 1, y: 0 }
                                            }}
                                            className="text-[8px] md:text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1"
                                        >
                                            Start Journey
                                        </motion.p>
                                        <h3 className="text-lg md:text-2xl font-black text-white tracking-tight uppercase italic">
                                            {country.country}
                                        </h3>
                                        {/* Underline */}
                                        <motion.div 
                                            className="h-1 bg-blue-500 mt-2 rounded-full"
                                            variants={{
                                                hidden: { width: 0 },
                                                hover: { width: "100%" }
                                            }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </div>

                                    {/* Pin Icon */}
                                    <div className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
                                        <MapPin size={18} />
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Button */}
                <div className="mt-16 text-center">
                    <Link to="/countries">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em]"
                        >
                            Explore All Countries
                            <ArrowRight size={18} />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Destinations;