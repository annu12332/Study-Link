import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebookMessenger, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <section className="bg-white py-20 px-6 lg:px-12 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-[120px] -z-10 opacity-50" />
            
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Side: Contact Info */}
                    <div className="space-y-10">
                        <div>
                            <span className="text-blue-600 text-xs font-black tracking-[0.4em] uppercase block mb-4">
                                Get In Touch
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
                                Ready to <span className="text-blue-600">Start?</span>
                            </h2>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md">
                                আপনার উচ্চশিক্ষার স্বপ্ন পূরণে আমরা আছি আপনার পাশে। যেকোনো প্রয়োজনে সরাসরি আমাদের সাথে যোগাযোগ করুন।
                            </p>
                        </div>

                        {/* Quick Contact Cards */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <motion.a 
                                href="tel:+8801XXXXXXXXX"
                                whileHover={{ y: -5 }}
                                className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center group"
                            >
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all mb-4">
                                    <FaPhoneAlt size={18} />
                                </div>
                                <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-1">Call Us</h4>
                                <p className="text-slate-500 text-xs font-bold">+880 1XXX-XXXXXX</p>
                            </motion.a>

                            <motion.a 
                                href="https://wa.me/8801XXXXXXXXX"
                                whileHover={{ y: -5 }}
                                className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex flex-col items-center text-center group"
                            >
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all mb-4">
                                    <FaWhatsapp size={20} />
                                </div>
                                <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-1">WhatsApp</h4>
                                <p className="text-slate-500 text-xs font-bold">Chat with Expert</p>
                            </motion.a>
                        </div>

                        {/* Detailed Info */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-blue-600"><FaMapMarkerAlt size={20} /></div>
                                <div>
                                    <h5 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">Our Office</h5>
                                    <p className="text-slate-500 text-sm font-medium">House #123, Road #05, Dhanmondi, Dhaka-1209, Bangladesh</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5">
                                <div className="mt-1 text-blue-600"><FaEnvelope size={20} /></div>
                                <div>
                                    <h5 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">Email Support</h5>
                                    <p className="text-slate-500 text-sm font-medium">info@faithoverseas.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] border border-slate-50 relative"
                    >
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Phone Number</label>
                                    <input type="tel" placeholder="+880 1XXX..." className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Interested Country</label>
                                <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none appearance-none">
                                    <option>UK</option>
                                    <option>Canada</option>
                                    <option>Australia</option>
                                    <option>USA</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Your Message</label>
                                <textarea rows="4" placeholder="How can we help you?" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"></textarea>
                            </div>

                            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-100 active:scale-[0.98]">
                                Send Message <FaPaperPlane size={12} />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ContactUs;