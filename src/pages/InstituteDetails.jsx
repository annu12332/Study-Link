import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiCheckCircle, HiLocationMarker, HiMail, HiUser, HiPhone, HiGlobe } from 'react-icons/hi';
import { motion } from 'framer-motion';

const InstituteDetails = () => {
    const { id } = useParams();
    const [inst, setInst] = useState(null);
    const [formStatus, setFormStatus] = useState(null);

    useEffect(() => {
        fetch('/institutes.json')
            .then(res => res.json())
            .then(data => setInst(data.data.find(item => item.id === id)));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('success');
        // এখানে আপনি চাইলে আপনার ইমেইল বা ডাটাবেস লজিক অ্যাড করতে পারেন
    };

    if (!inst) return (
        <div className="h-screen flex items-center justify-center font-black uppercase tracking-[0.3em] text-blue-600 animate-pulse">
            Loading Institution...
        </div>
    );

    return (
        <section className="pt-24 md:pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group mb-12"
                >
                    <img 
                        src={inst.image} 
                        alt={inst.name} 
                        className="w-full h-[300px] md:h-[500px] object-cover rounded-[2rem] md:rounded-[4rem] shadow-2xl shadow-blue-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-[2rem] md:rounded-[4rem]" />
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                        <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            {inst.country}
                        </span>
                        <h1 className="text-3xl md:text-6xl font-black text-white mt-4 uppercase italic leading-tight tracking-tighter">
                            {inst.name}
                        </h1>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* Content Left */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-2 text-blue-600 font-bold mb-6 italic uppercase tracking-wider">
                            <HiLocationMarker size={20} /> {inst.location}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 uppercase">About Institution</h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                            {inst.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {inst.features.map((f, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100"
                                >
                                    <HiCheckCircle className="text-blue-600 shrink-0" size={24} />
                                    <span className="font-bold text-slate-700 text-sm uppercase">{f}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Apply Form Right */}
                    <div className="lg:col-span-5">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900 p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-blue-200 sticky top-24"
                        >
                            <h3 className="text-2xl font-black text-white mb-2 uppercase italic">Apply Now</h3>
                            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-8">Start your journey today</p>

                            {formStatus === 'success' ? (
                                <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="bg-blue-600/20 border border-blue-500 p-6 rounded-2xl text-center"
                                >
                                    <HiCheckCircle className="text-blue-400 mx-auto mb-4" size={48} />
                                    <h4 className="text-white font-bold mb-2 uppercase">Application Sent!</h4>
                                    <p className="text-blue-100 text-xs">Our advisor will contact you within 24 hours.</p>
                                    <button 
                                        onClick={() => setFormStatus(null)}
                                        className="mt-6 text-xs text-blue-400 font-black uppercase tracking-widest underline"
                                    >
                                        Send Another
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name Input */}
                                    <div className="relative">
                                        <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="FULL NAME"
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white text-[10px] font-black tracking-widest focus:outline-none focus:border-blue-500 transition-all"
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div className="relative">
                                        <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            required
                                            type="email" 
                                            placeholder="EMAIL ADDRESS"
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white text-[10px] font-black tracking-widest focus:outline-none focus:border-blue-500 transition-all"
                                        />
                                    </div>

                                    {/* Phone Input */}
                                    <div className="relative">
                                        <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            required
                                            type="tel" 
                                            placeholder="PHONE NUMBER"
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white text-[10px] font-black tracking-widest focus:outline-none focus:border-blue-500 transition-all"
                                        />
                                    </div>

                                    {/* Program Selection */}
                                    <div className="relative">
                                        <HiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <select 
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white text-[10px] font-black tracking-widest focus:outline-none focus:border-blue-500 transition-all appearance-none"
                                        >
                                            <option>SELECT PROGRAM</option>
                                            <option>UNDERGRADUATE</option>
                                            <option>POSTGRADUATE</option>
                                            <option>PHD / DOCTORATE</option>
                                            <option>DIPLOMA</option>
                                        </select>
                                    </div>

                                    <button 
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-white hover:text-blue-600 text-white mt-4 py-5 rounded-xl font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-xl shadow-blue-900/20 active:scale-95"
                                    >
                                        Submit Application
                                    </button>
                                </form>
                            )}
                            
                            <p className="text-[8px] text-slate-500 mt-6 text-center font-bold tracking-widest uppercase">
                                Your data is secured with end-to-end encryption.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstituteDetails;