import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineVideoCamera, HiOutlineUserGroup, HiOutlineBadgeCheck, HiOutlineArrowRight } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const Consultation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        service: 'Study Abroad',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Thank you! Our expert will contact you shortly.");
    };

    const steps = [
        { icon: <HiOutlineCalendar />, title: "Book a Slot", desc: "Pick a date and time that fits your schedule." },
        { icon: <HiOutlineVideoCamera />, title: "Virtual Meet", desc: "Connect with our experts via Zoom or Google Meet." },
        { icon: <HiOutlineBadgeCheck />, title: "Get Solution", desc: "Receive personalized guidance and admission plan." }
    ];

    return (
        <div className="pt-24 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-blue-600 text-[12px] font-black tracking-[0.4em] uppercase block mb-4"
                    >
                        Expert Guidance
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6"
                    >
                        Free Online <br />
                        <span className="text-blue-600 italic">Consultation</span>
                    </motion.h1>
                    <p className="text-slate-500 font-medium md:text-lg">
                        আপনার উচ্চশিক্ষার স্বপ্ন পূরণে আমরা আছি আপনার পাশে। ঘরে বসেই কথা বলুন আমাদের অভিজ্ঞ কাউন্সেলরদের সাথে।
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    
                    {/* Left Side: Info & Steps */}
                    <div className="space-y-10">
                        <div className="bg-blue-600 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-4 uppercase italic">Why Consult Us?</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Direct Admission Support",
                                        "Scholarship Opportunity Assessment",
                                        "Visa Documentation Guidance",
                                        "Career Path Planning"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 font-bold text-blue-50">
                                            <HiOutlineBadgeCheck className="text-2xl text-white" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm uppercase flex items-center gap-3 hover:bg-slate-900 hover:text-white transition-all">
                                    <FaWhatsapp size={20} /> Chat with Experts
                                </button>
                            </div>
                            {/* Decorative Circle */}
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500 rounded-full opacity-50 shadow-inner" />
                        </div>

                        {/* Steps Grid */}
                        <div className="grid sm:grid-cols-3 gap-6">
                            {steps.map((step, i) => (
                                <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <div className="text-3xl text-blue-600 mb-4">{step.icon}</div>
                                    <h4 className="font-black text-slate-900 uppercase text-sm mb-2">{step.title}</h4>
                                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Consultation Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50"
                    >
                        <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">Request an Appointment</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Full Name</label>
                                    <input 
                                        type="text" required placeholder="John Doe"
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold"
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Email Address</label>
                                    <input 
                                        type="email" required placeholder="example@mail.com"
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold"
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Phone Number</label>
                                    <input 
                                        type="tel" required placeholder="+880 1xxx-xxxxxx"
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold"
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Country of Choice</label>
                                    <select 
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold text-slate-500"
                                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                                    >
                                        <option value="">Select Country</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                        <option value="USA">USA</option>
                                        <option value="Australia">Australia</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Your Message</label>
                                <textarea 
                                    rows="4" placeholder="Tell us about your study plans..."
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold"
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-slate-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-95"
                            >
                                Book Consultation Now <HiOutlineArrowRight size={20} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Consultation;