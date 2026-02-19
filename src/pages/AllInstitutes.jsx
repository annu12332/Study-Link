import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AllInstitutes = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/institutes.json').then(res => res.json()).then(d => setData(d.data));
    }, []);

    const filtered = data.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <section className="pt-32 pb-24 bg-white min-h-screen px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 italic uppercase">Global <span className="text-blue-600 not-italic">Directory</span></h1>
                        <p className="text-slate-500 font-medium mt-4">Discover {data.length}+ world-class partner institutions.</p>
                    </div>
                    <div className="relative">
                        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search University..." 
                            className="bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 w-full md:w-80 focus:ring-2 focus:ring-blue-500 font-medium"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {filtered.map((inst) => (
                        <Link to={`/institute/${inst.id}`} key={inst.id}>
                            <motion.div whileHover={{ y: -10 }} className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all">
                                <div className="h-40 overflow-hidden">
                                    <img src={inst.image} alt={inst.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase">{inst.country}</span>
                                    <h3 className="text-lg font-black text-slate-900 mt-2 leading-tight uppercase italic">{inst.name}</h3>
                                    <div className="flex items-center gap-1 text-slate-400 mt-4 text-xs font-bold">
                                        <HiLocationMarker /> {inst.location}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllInstitutes;