import React from 'react';
import { motion } from 'framer-motion';
import { 
    FaFacebookF, 
    FaInstagram, 
    FaLinkedinIn, 
    FaYoutube, 
    FaPaperPlane, 
    FaPhoneAlt, 
    FaEnvelope, 
    FaMapMarkerAlt,
    FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* --- Top Section: Branding & Newsletter --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                                S
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-tighter italic">
                                Study<span className="text-blue-500">Link</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-md">
                            আপনার বিদেশের উচ্চশিক্ষার স্বপ্নকে বাস্তবে রূপ দিতে আমরা আছি আপনার পাশে। সঠিক গাইডলাইন এবং ভিসা প্রসেসিংয়ে আমরাই আপনার বিশ্বস্ত সঙ্গী।
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{ y: -5, backgroundColor: '#2563eb' }}
                                    className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white transition-colors cursor-pointer shadow-lg"
                                >
                                    <Icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-700/50 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center md:text-left">
                                    <h3 className="text-xl font-black text-white mb-2">Get Latest Updates!</h3>
                                    <p className="text-slate-400 text-sm font-medium">Subscribe for scholarship news & visa updates.</p>
                                </div>
                                <div className="w-full md:w-auto flex bg-slate-900 p-2 rounded-2xl border border-slate-700 focus-within:border-blue-500 transition-colors">
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        className="bg-transparent border-none px-4 py-2 text-sm focus:outline-none w-full md:w-48 text-white" 
                                    />
                                    <button className="bg-blue-600 p-3 rounded-xl text-white hover:bg-blue-500 transition-all active:scale-95">
                                        <FaPaperPlane size={16} />
                                    </button>
                                </div>
                            </div>
                            {/* Decoration Circle */}
                            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all" />
                        </div>
                    </div>
                </div>

                {/* --- Middle Section: Quick Links --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-semibold">
                            <li><a href="/" className="hover:text-blue-500 transition-colors flex items-center gap-2 group"><FaArrowRight size={10} className="text-blue-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Home</a></li>
                            <li><a href="/about" className="hover:text-blue-500 transition-colors flex items-center gap-2 group"><FaArrowRight size={10} className="text-blue-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> About Us</a></li>
                            <li><a href="/all-stories" className="hover:text-blue-500 transition-colors flex items-center gap-2 group"><FaArrowRight size={10} className="text-blue-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Success Stories</a></li>
                            <li><a href="/all-news" className="hover:text-blue-500 transition-colors flex items-center gap-2 group"><FaArrowRight size={10} className="text-blue-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Articles</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Our Services</h4>
                        <ul className="space-y-4 text-sm font-semibold">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">University Admission</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Visa Counseling</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Scholarship Support</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Pre-Departure Guide</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">Contact Info</h4>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-sm">
                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-500">
                                    <FaMapMarkerAlt />
                                </div>
                                <p className="font-medium">House/1234, Dhaka, Bangladesh</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-500">
                                    <FaPhoneAlt />
                                </div>
                                <p className="font-medium">+880 1234-567890</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-500">
                                    <FaEnvelope />
                                </div>
                                <p className="font-medium">info@studylink.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Bottom Section: Copyright --- */}
                <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        &copy; {currentYear} StudyLink Education. All Rights Reserved.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;