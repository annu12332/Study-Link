import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Icons from "lucide-react";
import { HiCheckCircle, HiCalendar } from 'react-icons/hi';

const ServiceDetails = () => {
    const { id } = useParams(); // URL থেকে ID নিবে
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // public/services.json থেকে ডেটা ফেচ করা হচ্ছে
        fetch('/services.json')
            .then((res) => res.json())
            .then((data) => {
                // ID অনুযায়ী নির্দিষ্ট সার্ভিসটি খুঁজে বের করা
                const foundService = data.data.find(s => s.id === parseInt(id));
                setService(foundService);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching service details:", err);
                setLoading(false);
            });
    }, [id]); // ID চেঞ্জ হলে আবার রান করবে

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!service) return (
        <div className="h-screen flex items-center justify-center font-black text-2xl text-slate-400 uppercase tracking-widest">
            Service Not Found
        </div>
    );

    const IconComponent = Icons[service.icon] || Icons.HelpCircle;

    return (
        <div className="pt-24 bg-white min-h-screen">
            {/* Header Section */}
            <div className="bg-slate-900 py-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/40 text-white transform hover:rotate-6 transition-transform">
                        <IconComponent size={40} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                        {service.title}
                    </h1>
                    <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        {service.description}
                    </p>
                </div>
            </div>

            {/* Content & Form Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-16">
                
                {/* Left Side: Details */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="relative">
                        <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight uppercase">
                            About our {service.title}
                        </h2>
                        <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>
                        <p className="text-slate-600 leading-8 text-lg font-medium">
                            We offer professional {service.title.toLowerCase()} tailored to your specific needs. 
                            Our team of experts ensures that every step of the process is handled with care, 
                            giving you the peace of mind to focus on your global education goals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {["Certified Experts", "End-to-End Support", "Quick Response", "Success Guaranteed"].map((point) => (
                            <div key={point} className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <HiCheckCircle size={24} />
                                </div>
                                <span className="font-bold text-slate-700">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Booking Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-slate-100 p-10 sticky top-32">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <HiCalendar size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 leading-tight">Book Service</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Get Started Today</p>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            alert("Booking request sent for " + service.title);
                        }}>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none border border-transparent focus:bg-white" required />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                                <input type="email" placeholder="example@email.com" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none border border-transparent focus:bg-white" required />
                            </div>

                            <div className="space-y-1 mb-6">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone</label>
                                <input type="tel" placeholder="+880 1XXX XXXXXX" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none border border-transparent focus:bg-white" required />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl shadow-blue-200 hover:bg-slate-900 active:scale-95 transition-all duration-300">
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;