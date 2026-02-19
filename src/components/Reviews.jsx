import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaQuoteLeft, FaGoogle, FaArrowLeft, FaUniversity, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ReviewsPage = () => {
    const reviews = [
        {
            id: 1,
            name: "Ferdouse ali Meraz",
            date: "Sep 03, 2025",
            university: "University of Debrecen",
            program: "Vehicle Engineering",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ferdouse",
            comment: "Study Link help me a lot at visa processing of Hungary. Now I have got chance at University of Debrecen in Vehicle Engineering program.",
            rating: 5
        },
        {
            id: 2,
            name: "Tania Islam",
            date: "Aug 30, 2025",
            university: "Canada Top University",
            program: "Business Studies",
            image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
            comment: "Thank you Study Link. They try to make things easier and help me out throughout this journey and fulfill my dream.",
            rating: 5
        },
        {
            id: 3,
            name: "Lamiya Alam",
            date: "Aug 28, 2025",
            university: "Malaysian University",
            program: "General Studies",
            image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150",
            comment: "I can't speak highly enough of my experience with Study Link BD. They handled everything for my Malaysian student visa.",
            rating: 5
        },
        {
            id: 4,
            name: "Samiur Rahman",
            date: "Aug 20, 2025",
            university: "Monash University",
            program: "Information Tech",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samiur",
            comment: "Extremely professional and transparent service. The best consultancy in Dhaka for Australia study visa.",
            rating: 5
        }
    ];

    return (
        <section className="bg-[#fcfcfd] min-h-screen py-8 md:py-24 px-3 md:px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-6 md:gap-8">
                    <div className="w-full lg:w-auto">
                        
                        <h2 className="text-3xl md:text-7xl font-black text-slate-900 uppercase italic leading-[0.9] tracking-tighter">
                            Success
                            <span className="text-blue-600 not-italic"> Stories</span>
                        </h2>
                    </div>

                    {/* Stats Card - Balanced for small screens */}
                    <div className="w-full md:w-auto bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-blue-100/50 flex items-center justify-around md:justify-start gap-4 md:gap-8 border border-slate-50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700" />
                        
                        <div className="relative z-10">
                            <div className="text-2xl md:text-4xl font-black text-slate-900 leading-none">4.9<span className="text-blue-600 text-sm md:text-lg">/5</span></div>
                            <div className="flex text-orange-400 gap-0.5 my-1 md:my-2 text-[10px] md:text-base">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <div className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Google Rating</div>
                        </div>

                        <div className="w-[1px] h-10 md:h-16 bg-slate-100 relative z-10" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="bg-slate-50 p-2 md:p-3 rounded-xl md:rounded-2xl mb-1 md:mb-2">
                                <FaGoogle className="text-sm md:text-xl text-red-500" />
                            </div>
                            <span className="text-[7px] md:text-[9px] font-black text-slate-900 uppercase tracking-tighter">Verified</span>
                        </div>
                    </div>
                </div>

                {/* --- Grid: 2 columns on Mobile --- */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
                    {reviews.map((rev, index) => (
                        <motion.div
                            key={rev.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-4 md:p-10 rounded-[1.5rem] md:rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-200/20 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Profile Header */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 md:gap-4 mb-4 md:mb-8">
                                <div className="relative shrink-0">
                                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden ring-2 md:ring-4 ring-slate-50">
                                        <img src={rev.image} alt={rev.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-md shadow-lg hidden md:block">
                                        <FaQuoteLeft size={6} />
                                    </div>
                                </div>
                                <div className="overflow-hidden w-full">
                                    <h4 className="font-black text-slate-900 text-[9px] md:text-base leading-tight uppercase italic truncate">{rev.name}</h4>
                                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1 mt-0.5">
                                        <span className="text-[7px] md:text-[9px] font-bold text-emerald-500 uppercase flex items-center gap-0.5">
                                            <FaCheckCircle size={7}/> <span className="hidden xs:inline">Verified</span>
                                        </span>
                                        <span className="text-slate-300 text-[7px] md:text-[9px] font-bold uppercase truncate">{rev.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Comment - Line clamp to keep grid equal */}
                            <div className="flex-grow">
                                <p className="text-slate-600 text-[10px] md:text-base leading-snug md:leading-relaxed font-medium mb-4 md:mb-8 line-clamp-4 sm:line-clamp-none">
                                    "{rev.comment}"
                                </p>
                            </div>

                            {/* Info Footer */}
                            <div className="pt-3 md:pt-6 border-t border-slate-50 mt-auto space-y-1.5 md:space-y-3">
                                <div className="flex items-start gap-1.5 md:gap-3">
                                    <FaUniversity className="text-blue-600 mt-0.5 shrink-0" size={10} />
                                    <div className="text-[8px] md:text-xs font-black text-slate-800 uppercase tracking-tight leading-tight line-clamp-1">{rev.university}</div>
                                </div>
                                <div className="flex items-start gap-1.5 md:gap-3">
                                    <FaGraduationCap className="text-slate-400 mt-0.5 shrink-0" size={10} />
                                    <div className="text-[7px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tighter leading-tight line-clamp-1">{rev.program}</div>
                                </div>
                                <div className="flex gap-0.5 pt-1">
                                    {[...Array(rev.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-orange-400" size={8} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- Write Review Action --- */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 md:mt-24 text-center p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-slate-900 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-[80px]" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500 rounded-full blur-[80px]" />
                    </div>
                    
                    <h3 className="text-xl md:text-4xl font-black text-white uppercase italic mb-6 md:mb-8 relative z-10">
                        Share Your <span className="text-blue-500">Experience</span>
                    </h3>
                    <button className="group relative z-10 bg-white text-slate-900 px-6 py-3.5 md:px-12 md:py-5 rounded-xl md:rounded-2xl font-black text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95">
                        Write a Google Review
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ReviewsPage;