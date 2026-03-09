import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Loader2, Sparkles, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Destinations = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('/country.json');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                // Strictly 4 items
                setCountries(data.countries.filter(c => c.is_popular).slice(0, 4));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    if (loading) return (
        <div className="h-96 flex items-center justify-center bg-white">
            <Loader2 className="text-blue-600 animate-spin w-10 h-10" />
        </div>
    );

    return (
        <section className="bg-white py-16 md:py-24 px-4 sm:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">
                
                {/* Centered Header */}
                <div className="text-center mb-12 md:mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em]"
                    >
                        <Sparkles size={14} /> Expert's Top Choice
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase"
                    >
                        Global <span className="text-blue-600 italic">Hubs</span>
                    </motion.h2>
                    <p className="text-slate-500 text-xs md:text-sm font-medium uppercase tracking-widest max-w-md mx-auto">
                        Explore the most preferred destinations for international studies
                    </p>
                </div>

                {/* Grid System: 2 Columns on Small Screens, 4 on Large */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {countries.map((country, idx) => (
                        <motion.div
                            key={country.slug}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link to={`/country/${country.slug}`} className="group relative block h-[260px] md:h-[400px] overflow-hidden rounded-2xl md:rounded-[2rem] bg-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl">
                                
                                {/* Image */}
                                <img
                                    src={country.image}
                                    alt={country.country}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                                {/* Content */}
                                <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
                                    <div className="space-y-1 md:space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center gap-1 text-blue-400 font-bold text-[8px] md:text-[10px] uppercase tracking-widest">
                                            <MapPin size={12} className="hidden md:block" /> {country.continent || 'Global'}
                                        </div>
                                        <h3 className="text-lg md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
                                            {country.country}
                                        </h3>
                                        
                                        {/* Minimal Hover Line */}
                                        <div className="w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all duration-500 rounded-full" />
                                    </div>
                                    
                                    {/* Action Icon for Desktop */}
                                    <div className="absolute top-4 right-4 h-8 w-8 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Centered Action Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 md:mt-20 text-center"
                >
                    <Link to="/countries">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            Explore All Countries
                            <MoveRight size={18} />
                        </motion.button>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default Destinations;