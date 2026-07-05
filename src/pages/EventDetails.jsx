import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // Axios ইমপোর্ট করুন
import { 
    HiOutlineCalendar, 
    HiOutlineLocationMarker, 
    HiOutlineClock, 
    HiOutlineArrowLeft,
    HiOutlineCheckCircle,
    HiOutlineUser,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineTag
} from 'react-icons/hi';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // API Base URL (আপনার ব্যাকেন্ড পোর্ট অনুযায়ী পরিবর্তন করুন)
    const API_URL = "https://studylinkserver.thinkcodify.site/api";

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // সরাসরি ব্যাকেন্ড থেকে ডাটা আনা হচ্ছে
                const res = await axios.get(`${API_URL}/countries`); // অথবা আপনার নির্দিষ্ট ইভেন্ট রাউট
                // নোট: আপনার ব্যাকেন্ডে যদি নির্দিষ্ট ইভেন্ট গেট রাউট থাকে তবে সেটি ব্যবহার করুন
                // আপাতত আমি সব ইভেন্ট থেকে আইডি দিয়ে ফিল্টার করার লজিক রাখছি
                const resEvents = await axios.get(`${API_URL}/admin/applications`); // আপনার ইভেন্ট রাউট দিন
                
                // যদি ইভেন্টের জন্য আলাদা রাউট না থাকে তবে এভাবে ফিল্টার করতে পারেন
                // কিন্তু প্রডাকশনে app.get("/api/events/:id") থাকা ভালো
                const found = resEvents.data.data.find(e => e._id === id); 
                setEvent(found);
            } catch (err) {
                console.error("Error fetching event:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = {
            eventId: id,
            eventTitle: event.title,
            applicantName: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
        };

        try {
            // আপনার ব্যাকেন্ডের /api/apply রাউটে ডাটা পাঠানো হচ্ছে
            const response = await axios.post(`${API_URL}/api/apply`, formData);
            if (response.data.success) {
                setIsRegistered(true);
            }
        } catch (err) {
            alert("Registration failed. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center font-black uppercase italic tracking-[0.3em] text-blue-600 animate-pulse">
            Loading Event Details...
        </div>
    );

    if (!event) return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
            <p className="font-bold text-slate-500 uppercase tracking-widest">Event Not Found!</p>
            <button onClick={() => navigate(-1)} className="text-blue-600 font-black text-xs uppercase underline">Go Back</button>
        </div>
    );

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
                                src={event.image || "https://via.placeholder.com/800x400"} 
                                alt={event.title} 
                                className="w-full h-[250px] md:h-[500px] object-cover rounded-[2rem] md:rounded-[3.5rem] shadow-2xl shadow-blue-100 mb-10"
                            />
                            
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">
                                    <HiOutlineTag /> {event.category || 'Seminar'}
                                </span>
                                <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                                    {event.status || 'Upcoming'}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-6xl font-black text-slate-900 uppercase italic leading-none mb-8">
                                {event.title}
                            </h1>

                            <div className="grid sm:grid-cols-2 gap-6 mb-10 p-6 md:p-8 bg-slate-50 rounded-[2rem] md:rounded-[3rem] border border-slate-100">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-500 font-bold uppercase text-[10px] md:text-xs">
                                        <HiOutlineCalendar className="text-blue-600" size={20}/> 
                                        {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
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
                                        Registration successful for {event.title}. Our team will contact you soon.
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
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                                        {event.ticketPrice > 0 ? `Fee: ${event.ticketPrice} BDT` : 'Free Registration'}
                                    </p>

                                    <form onSubmit={handleRegister} className="space-y-5">
                                        <div className="relative">
                                            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                            <input name="name" required type="text" placeholder="FULL NAME" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 md:py-5 pl-12 pr-4 text-white text-[10px] font-black tracking-[0.2em] focus:outline-none focus:border-blue-600 transition-all uppercase" />
                                        </div>
                                        <div className="relative">
                                            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                            <input name="email" required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 md:py-5 pl-12 pr-4 text-white text-[10px] font-black tracking-[0.2em] focus:outline-none focus:border-blue-600 transition-all uppercase" />
                                        </div>
                                        <div className="relative">
                                            <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                            <input name="phone" required type="tel" placeholder="PHONE NUMBER" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 md:py-5 pl-12 pr-4 text-white text-[10px] font-black tracking-[0.2em] focus:outline-none focus:border-blue-600 transition-all uppercase" />
                                        </div>
                                        
                                        <button 
                                            disabled={submitting}
                                            className="w-full bg-blue-600 hover:bg-white hover:text-blue-600 text-white py-5 md:py-6 rounded-2xl font-black text-[11px] tracking-[0.4em] uppercase transition-all duration-500 shadow-xl shadow-blue-900/40 active:scale-95 disabled:opacity-50"
                                        >
                                            {submitting ? "Processing..." : "Confirm Booking"}
                                        </button>
                                    </form>
                                    <p className="text-[8px] text-slate-600 text-center font-bold tracking-[0.3em] uppercase mt-8">
                                        Official Entry • Study Link Global
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