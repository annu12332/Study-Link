import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiCheckCircle, HiMail, HiGlobe, HiCurrencyDollar, HiUserGroup, HiClock, HiLightningBolt } from 'react-icons/hi';

const CountryDetails = () => {
    const { id } = useParams(); // URL থেকে slug (যেমন: study-in-china) নিবে
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/country.json') // নিশ্চিত করুন ফাইলটি public/ ফোল্ডারে আছে
            .then(res => res.json())
            .then(data => {
                // আপনার JSON এ "countries" নামে মূল অ্যারে আছে
                if (data && data.countries) {
                    const found = data.countries.find(c => c.slug === id);
                    setCountry(found);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-black text-blue-600 animate-pulse uppercase tracking-widest">
            Loading Country Data...
        </div>
    );

    if (!country) return (
        <div className="h-screen flex items-center justify-center font-black text-2xl text-slate-400 uppercase tracking-widest">
            Country Not Found
        </div>
    );

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px]">
                <img 
                    src={country.image} 
                    alt={country.country} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex items-center justify-center">
                    <div className="text-center px-6">
                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter drop-shadow-2xl">
                            {country.country}
                        </h1>
                        <p className="text-blue-400 font-bold uppercase tracking-[0.3em] mt-4">Study in {country.country}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-12">
                
                {/* Left Side: Stats and Info */}
                <div className="lg:col-span-2 space-y-12">
                    
                    {/* At a Glance Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { label: "Capital", val: country.at_a_glance?.capital, icon: <HiGlobe /> },
                            { label: "Currency", val: country.at_a_glance?.currency, icon: <HiCurrencyDollar /> },
                            { label: "Language", val: country.at_a_glance?.language, icon: <HiUserGroup /> },
                            { label: "Population", val: country.at_a_glance?.population, icon: <HiUserGroup /> },
                            { label: "GDP", val: country.at_a_glance?.gdp, icon: <HiLightningBolt /> },
                            { label: "Time Zone", val: country.at_a_glance?.time_zone, icon: <HiClock /> },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="text-blue-600 text-3xl mb-4">{item.icon}</div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                                <p className="text-lg font-black text-slate-900 tracking-tight">{item.val || 'N/A'}</p>
                            </div>
                        ))}
                    </div>

                    {/* Special Highlights Section */}
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter uppercase italic flex items-center gap-3">
                           <span className="w-10 h-1 bg-blue-600 rounded-full"></span> Special Highlights
                        </h2>
                        <div className="bg-blue-50/50 p-8 rounded-[2rem] border-l-8 border-blue-600">
                            <p className="text-slate-700 text-2xl leading-relaxed font-bold italic tracking-tight">
                                "{country.special_highlights}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-950 p-10 rounded-[3rem] text-white sticky top-32 shadow-2xl shadow-blue-900/20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
                                <HiMail className="text-white text-3xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase italic tracking-tight">Admission Help</h3>
                                <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Talk to Experts</p>
                            </div>
                        </div>
                        
                        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none transition-all" 
                            />
                            <input 
                                type="tel" 
                                placeholder="Phone Number" 
                                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none transition-all" 
                            />
                            <button className="w-full bg-blue-600 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-slate-950 transition-all mt-4">
                                Book Consultation
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;