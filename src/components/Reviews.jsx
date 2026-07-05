import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaStar, FaCheckCircle, FaQuoteLeft, FaGoogle, FaUniversity, FaGraduationCap } from 'react-icons/fa';

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Database theke approved review fetch korar function
    const fetchApprovedReviews = async () => {
        try {
            const res = await axios.get('https://studylinkserver.thinkcodify.site/api/reviews/approved');
            if (res.data.success) {
                setReviews(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching reviews:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApprovedReviews();
    }, []);

    return (
        <section className="bg-[#fcfcfd] py-12 md:py-16 px-4 md:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6">
                    <div className="text-center md:text-left">
                        <span className="text-blue-600 text-[9px] font-black tracking-[0.3em] uppercase block mb-2">TESTIMONIALS</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic leading-none tracking-tight">
                            Students
                            <span className="text-blue-600 not-italic"> Feedback</span>
                        </h2>
                    </div>

                    {/* Compact Stats Card */}
                    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg shadow-blue-100/50 flex items-center gap-5 border border-slate-50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-blue-50 rounded-full -mr-6 -mt-6 transition-transform group-hover:scale-150 duration-700" />
                        
                        <div className="relative z-10 text-center md:text-left">
                            <div className="text-xl md:text-3xl font-black text-slate-900 leading-none">4.9<span className="text-blue-600 text-xs md:text-sm">/5</span></div>
                            <div className="flex text-orange-400 gap-0.5 my-1 text-[8px] md:text-xs">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <div className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest">Google Rating</div>
                        </div>

                        <div className="w-[1px] h-10 bg-slate-100 relative z-10" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="bg-slate-50 p-2 rounded-xl mb-1 group-hover:bg-red-50 transition-colors">
                                <FaGoogle className="text-xs md:text-lg text-red-500" />
                            </div>
                            <span className="text-[7px] md:text-[8px] font-black text-slate-900 uppercase tracking-tighter">Verified</span>
                        </div>
                    </div>
                </div>

                {/* --- Dynamic Grid --- */}
                {loading ? (
                    <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                        Loading Stories...
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                        {reviews.map((rev, index) => (
                            <motion.div
                                key={rev._id} // MongoDB ID use kora hoyeche
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-200/20 transition-all duration-500 flex flex-col h-full group"
                            >
                                {/* Profile Header */}
                                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 mb-4">
                                    <div className="relative shrink-0">
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden ring-2 ring-slate-50 group-hover:ring-blue-100 transition-all bg-blue-50 flex items-center justify-center text-blue-600 font-black">
                                            {/* Image thakle image, na thakle Initial letter */}
                                            {rev.image ? (
                                                <img src={rev.image} alt={rev.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-lg uppercase">{rev.name[0]}</span>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded shadow-lg hidden md:block scale-75">
                                            <FaQuoteLeft size={8} />
                                        </div>
                                    </div>
                                    <div className="overflow-hidden w-full">
                                        <h4 className="font-black text-slate-900 text-[10px] md:text-sm leading-tight uppercase italic truncate">{rev.name}</h4>
                                        <div className="flex justify-center md:justify-start items-center gap-1.5 mt-0.5">
                                            <span className="text-[7px] md:text-[8px] font-bold text-emerald-500 uppercase flex items-center gap-0.5">
                                                <FaCheckCircle size={8}/> <span>Verified</span>
                                            </span>
                                            <span className="text-slate-300 text-[7px] md:text-[8px] font-bold uppercase">
                                                {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Comment */}
                                <div className="flex-grow">
                                    <p className="text-slate-600 text-[9px] md:text-[13px] leading-snug md:leading-relaxed font-medium mb-4 italic line-clamp-4 md:line-clamp-5">
                                        "{rev.message}"
                                    </p>
                                </div>

                                {/* Info Footer */}
                                <div className="pt-3 border-t border-slate-50 mt-auto space-y-1.5">
                                    <div className="flex items-start gap-1.5">
                                        <FaUniversity className="text-blue-600 mt-0.5 shrink-0" size={10} />
                                        <div className="text-[8px] md:text-[10px] font-black text-slate-800 uppercase tracking-tight leading-tight line-clamp-1">
                                            {rev.university || "Global Institution"}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                        <FaGraduationCap className="text-slate-400 mt-0.5 shrink-0" size={10} />
                                        <div className="text-[7px] md:text-[9px] font-bold text-slate-500 uppercase tracking-tighter leading-tight line-clamp-1">
                                            {rev.course || "Higher Education"}
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 pt-1">
                                        {[...Array(Number(rev.rating))].map((_, i) => (
                                            <FaStar key={i} className="text-orange-400" size={7} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* --- CTA Action --- */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-12 text-center p-8 md:p-12 rounded-[2rem] bg-slate-900 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-[80px]" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500 rounded-full blur-[80px]" />
                    </div>
                    
                    <h3 className="text-xl md:text-3xl font-black text-white uppercase italic mb-6 relative z-10">
                        Share Your <span className="text-blue-500">Experience</span>
                    </h3>
                    <button className="group relative z-10 bg-white text-slate-900 px-8 py-4 rounded-xl font-black text-[9px] tracking-[0.2em] uppercase hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                        Write a Google Review
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ReviewsPage;