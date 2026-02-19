import React, { useState, useEffect } from 'react';
import { FaRegCalendarAlt, FaRegClock, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllNews = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('/news.json')
            .then(res => res.json())
            .then(data => setNews(data.data));
    }, []);

    return (
        <div className="pt-32 pb-20 px-4 md:px-6 bg-[#fcfcfd]">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase italic mb-16 tracking-tighter">
                    All <span className="text-blue-600">News</span>
                </h1>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                    {news.map((item) => (
                        <Link to={`/news/${item.id}`} key={item.id} className="bg-white p-3 md:p-6 rounded-[2rem] md:rounded-[3rem] border border-slate-100 hover:shadow-xl transition-all group">
                            <img src={item.image} className="w-full h-32 md:h-64 object-cover rounded-[1.5rem] md:rounded-[2.5rem] mb-6" alt="" />
                            <div className="px-1">
                                <span className="text-blue-600 text-[8px] md:text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                                <h3 className="text-sm md:text-2xl font-black text-slate-900 my-3 uppercase italic leading-tight">{item.title}</h3>
                                <p className="text-slate-500 text-xs hidden md:block mb-6 line-clamp-2">{item.excerpt}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase">{item.date}</span>
                                    <FaArrowRight className="text-blue-600" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllNews;