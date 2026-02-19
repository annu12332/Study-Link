import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiAcademicCap, HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Loader2, Sparkles } from 'lucide-react';

const Institutes = () => {
    const [institutes, setInstitutes] = useState([]);
    const [sectionInfo, setSectionInfo] = useState({});
    const [activeTab, setActiveTab] = useState('UK');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/institutes.json')
            .then(res => res.json())
            .then(data => {
                setInstitutes(data.data);
                setSectionInfo(data.section_info);
                setLoading(false);
            });
    }, []);

    const countries = ['UK', 'Canada', 'Australia'];
    const filteredData = institutes.filter(inst => inst.country === activeTab);

    if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600 w-8 h-8" /></div>;

    return (
        <section className="bg-[#f8fafc] py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header - More Compact */}
                <div className="text-center mb-10 md:mb-12">
                    <motion.span 
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 text-blue-600 text-[9px] font-black tracking-[0.2em] uppercase border border-blue-100 px-4 py-1.5 rounded-full bg-white mb-4"
                    >
                        <Sparkles size={11} /> {sectionInfo.badge}
                    </motion.span>
                    <h2 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight uppercase italic leading-none">
                        Our <span className="text-blue-600 not-italic">Institutes</span>
                    </h2>
                </div>

                {/* Tab Switcher - Balanced size */}
                <div className="flex justify-center gap-2 md:gap-3 mb-10">
                    {countries.map((country) => (
                        <button
                            key={country}
                            onClick={() => setActiveTab(country)}
                            className={`px-5 md:px-8 py-2.5 rounded-xl font-black text-[10px] tracking-widest transition-all ${
                                activeTab === country ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                            }`}
                        >
                            {country.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    {/* Left Info Card - Scaled down padding */}
                    <div className="lg:col-span-4 bg-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                        <HiAcademicCap className="absolute -bottom-8 -right-8 text-[12rem] opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4 leading-tight uppercase italic">Study in {activeTab}</h3>
                            <p className="text-blue-100 mb-6 text-sm font-medium leading-relaxed">Explore top-tier universities in {activeTab} and shape your future career.</p>
                            <Link to={`/country/${activeTab.toLowerCase()}`} className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-lg font-black text-[9px] tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all">
                                Country Guide <HiArrowRight />
                            </Link>
                        </div>
                    </div>

                    {/* University List Grid - Compact gap */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                                className="grid sm:grid-cols-2 gap-3 h-full"
                            >
                                {filteredData.map((uni) => (
                                    <Link key={uni.id} to={`/institute/${uni.id}`}>
                                        <motion.div whileHover={{ x: 5 }} className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all flex items-center gap-3 h-full">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 transition-colors shrink-0">
                                                <HiLocationMarker size={18} />
                                            </div>
                                            <span className="font-black text-slate-800 text-[11px] md:text-xs uppercase italic tracking-tight line-clamp-2 leading-tight">{uni.name}</span>
                                        </motion.div>
                                    </Link>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer Button - Reduced margin */}
                <div className="mt-10 text-center">
                    <Link to="/all-institutes">
                        <motion.button whileHover={{ scale: 1.05 }} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-[9px] tracking-[0.2em] uppercase flex items-center gap-2 mx-auto group">
                            Explore All Institutes <HiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Institutes;