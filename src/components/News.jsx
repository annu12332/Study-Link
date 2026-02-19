import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRegClock, FaRegCalendarAlt, FaArrowRight, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NewsAndArticles = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('/news.json')
            .then(res => res.json())
            .then(data => setNews(data.data));
    }, []);

    return (
        <section className="bg-white py-16 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-8">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic">
                            Latest <span className="text-blue-600">News</span>
                        </h2>
                    </div>
                    <Link to="/all-news" className="text-blue-600 font-black text-[10px] tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all">
                        View All <FaArrowRight size={10}/>
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {news.slice(0, 4).map((item) => (
                        <motion.article key={item.id} className="group">
                            <Link to={`/news/${item.id}`}>
                                <div className="relative h-32 md:h-56 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-4 shadow-sm">
                                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                    <div className="absolute top-2 left-2 md:top-4 md:left-4">
                                        <span className="bg-white/90 backdrop-blur px-2 py-0.5 md:px-3 md:py-1 rounded-lg text-[7px] md:text-[9px] font-black uppercase text-blue-600">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 text-[7px] md:text-[10px] font-bold uppercase mb-2">
                                    <div className="flex items-center gap-1"><FaRegCalendarAlt /> {item.date}</div>
                                    <div className="flex items-center gap-1"><FaRegClock /> {item.readTime}</div>
                                </div>
                                <h3 className="text-[10px] md:text-lg font-black text-slate-900 leading-tight line-clamp-2 uppercase italic group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsAndArticles;