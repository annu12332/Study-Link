import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiStar } from 'react-icons/hi';

const AllCountries = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/country.json') 
            .then(res => res.json())
            .then(resData => {
                setData(resData);
                setLoading(false);
            })
            .catch(err => console.error("Error:", err));
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center font-black text-blue-600 tracking-widest">LOADING...</div>;

    return (
        <section className="py-12 mt-14 md:py-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
                        Explore Destinations
                    </h2>
                    <p className="text-slate-500 mt-2 md:mt-4 font-bold uppercase tracking-widest text-[10px] md:text-sm">
                        Pick your dream country for study
                    </p>
                </div>

                {/* Mobile: 2 columns (grid-cols-2), Desktop: 3 columns (lg:grid-cols-3) */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {data?.countries?.map((item) => (
                        <Link 
                            to={`/country/${item.slug}`} 
                            key={item.slug} 
                            className="group bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Image Section - Adjusted height for mobile */}
                            <div className="relative h-40 md:h-64 overflow-hidden">
                                <img src={item.image} alt={item.country} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                {item.is_popular && (
                                    <div className="absolute top-2 left-2 md:top-6 md:left-6 bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-[7px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 md:gap-2 shadow-lg">
                                        <HiStar /> <span className="hidden xs:block">Popular</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Content Section - Compact for mobile */}
                            <div className="p-4 md:p-8">
                                <h3 className="text-sm md:text-2xl font-black text-slate-900 mb-1 md:mb-2 uppercase italic tracking-tight truncate">
                                    {item.country}
                                </h3>
                                {/* Mobile এ ডেসক্রিপশন হাইড রাখা ভালো যাতে কার্ড ক্লিন থাকে */}
                                <p className="hidden md:block text-slate-500 text-sm font-medium mb-6 line-clamp-2">
                                    {item.special_highlights}
                                </p>
                                
                                <div className="flex items-center justify-between border-t border-slate-50 pt-3 md:pt-6">
                                    <span className="text-[8px] md:text-xs font-black text-slate-400 uppercase tracking-widest truncate">
                                        {item.at_a_glance.capital}
                                    </span>
                                    <div className="text-blue-600 font-black text-[9px] md:text-xs uppercase tracking-widest flex items-center gap-1 md:gap-2 group-hover:gap-3 transition-all">
                                        <span className="hidden sm:block">Explore</span> <HiArrowRight />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllCountries;