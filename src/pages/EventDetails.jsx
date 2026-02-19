import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    HiOutlineCalendar, 
    HiOutlineLocationMarker, 
    HiOutlineClock, 
    HiOutlineArrowLeft,
    HiOutlineCheckCircle,
    HiOutlineUser,
    HiOutlineMail,
    HiOutlinePhone
} from 'react-icons/hi';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        fetch('/events.json')
            .then(res => res.json())
            .then(data => {
                const found = data.data.find(e => e.id === id);
                setEvent(found);
                setLoading(false);
            });
    }, [id]);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsRegistered(true);
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-black uppercase italic tracking-[0.3em] text-blue-600 animate-pulse">
            Loading Event Details...
        </div>
    );

    if (!event) return <div className="h-screen flex items-center justify-center">Event Not Found!</div>;

    return (
        <section className="pt-24 md:pt-32 pb-20 px-4 md:px-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest mb-8 transition-all group"
                >
                    <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform"/> Back to events
                </button>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* Left Side: Event Info */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <img 
                                src={event.image} 
                                alt={event.title} 
                                className="w-full h-[250px] md:h-[500px] object-cover rounded-[2rem] md:rounded-[3.5rem] shadow-2xl shadow-blue-100 mb-10"
                            />
                            
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                                    {event.type}
                                </span>
                                <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                                    {event.category}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-6xl font-black text-slate-900 uppercase italic leading-none mb-8">
                                {event.title}
                            </h1>

                            <div className="grid sm:grid-cols-2 gap-6 mb-10 p-6 md:p-8 bg-slate-50 rounded-[2rem] md:rounded-[3rem] border border-slate-100">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-500 font-bold uppercase text-[10px] md:text-xs">
                                        <HiOutlineCalendar className="text-blue-600" size={20}/> {event.date}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 font-bold uppercase text-[10px] md:text-xs">
                                        <HiOutlineClock className="text-blue-600" size={20}/> {event.time}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-500 font-bold uppercase text-[10px] md:text-xs">
                                        <HiOutlineLocationMarker className="text-blue-600" size={20}/> {event.location}
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <h3 className="text-xl font-black text-slate-900 uppercase italic mb-4">Description</h3>
                                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                                    {event.description}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Registration Form */}
                    <div className="lg:col-span-5">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] sticky top-32 shadow-2xl shadow-blue-200"
                        >
                            {isRegistered ? (
                                <div className="text-center py-10">
                                    <HiOutlineCheckCircle className="text-blue-500 mx-auto mb-6" size={80} />
                                    <h3 className="text-2xl font-black text-white uppercase italic mb-4">Spot Reserved!</h3>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed">
                                        Check your email for the entrance pass. See you there!
                                    </p>
                                    <button 
                                        onClick={() => setIsRegistered(false)}
                                        className="mt-8 text-blue-500 font-black text-[10px] uppercase tracking-[0.3em] underline underline-offset-8"
                                    >
                                        Register Another
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">Register Seat</h3>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">Limited slots available for this session</p>

                                    <form onSubmit={handleRegister} className="space-y-5">
                                        <div className="relative">
                                            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                            <input required type="text" placeholder="FULL NAME" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 md:py-5 pl-12 pr-4 text-white text-[10px] font-black tracking-[0.2em] focus:outline-none focus:border-blue-600 transition-all uppercase" />
                                        </div>
                                        <div className="relative">
                                            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                            <input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 md:py-5 pl-12 pr-4 text-white text-[10px] font-black tracking-[0.2em] focus:outline-none focus:border-blue-600 transition-all uppercase" />
                                        </div>
                                        <div className="relative">
                                            <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                            <input required type="tel" placeholder="PHONE NUMBER" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 md:py-5 pl-12 pr-4 text-white text-[10px] font-black tracking-[0.2em] focus:outline-none focus:border-blue-600 transition-all uppercase" />
                                        </div>
                                        
                                        <button className="w-full bg-blue-600 hover:bg-white hover:text-blue-600 text-white py-5 md:py-6 rounded-2xl font-black text-[11px] tracking-[0.4em] uppercase transition-all duration-500 shadow-xl shadow-blue-900/40 active:scale-95">
                                            Confirm Booking
                                        </button>
                                    </form>
                                    <p className="text-[8px] text-slate-600 text-center font-bold tracking-[0.3em] uppercase mt-8">
                                        Security Secured • Instant Confirmation
                                    </p>
                                </>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EventDetails;