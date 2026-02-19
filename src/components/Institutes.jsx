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

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <section className="bg-[#f8fafc] py-24 px-4 md:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 text-blue-600 text-[10px] font-black tracking-[0.3em] uppercase border border-blue-100 px-5 py-2 rounded-full bg-white mb-6"
                    >
                        <Sparkles size={12} /> {sectionInfo.badge}
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase italic">
                        Our <span className="text-blue-600 not-italic">Institutes</span>
                    </h2>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center gap-2 md:gap-4 mb-12">
                    {countries.map((country) => (
                        <button
                            key={country}
                            onClick={() => setActiveTab(country)}
                            className={`px-6 md:px-10 py-3 rounded-2xl font-black text-xs tracking-widest transition-all ${
                                activeTab === country ? 'bg-slate-900 text-white shadow-xl scale-105' : 'bg-white text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            {country.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Info Card */}
                    <div className="lg:col-span-4 bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                        <HiAcademicCap className="absolute -bottom-10 -right-10 text-[15rem] opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black mb-6 leading-tight uppercase italic">Study in {activeTab}</h3>
                            <p className="text-blue-100 mb-8 font-medium">Explore top-tier universities in {activeTab} and shape your future career.</p>
                            <Link to={`/country/${activeTab.toLowerCase()}`} className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all">
                                Country Guide <HiArrowRight />
                            </Link>
                        </div>
                    </div>

                    {/* University List Grid */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                className="grid sm:grid-cols-2 gap-4 h-full"
                            >
                                {filteredData.map((uni) => (
                                    <Link key={uni.id} to={`/institute/${uni.id}`}>
                                        <motion.div whileHover={{ x: 10 }} className="p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-500 hover:shadow-xl transition-all flex items-center gap-4 h-full">
                                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 transition-colors">
                                                <HiLocationMarker size={20} />
                                            </div>
                                            <span className="font-black text-slate-800 text-sm uppercase italic tracking-tight">{uni.name}</span>
                                        </motion.div>
                                    </Link>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link to="/all-institutes">
                        <motion.button whileHover={{ scale: 1.05 }} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 mx-auto group">
                            Explore All Institutes <HiArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Institutes;