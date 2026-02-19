import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';

const NewsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch('/news.json')
            .then(res => res.json())
            .then(data => setArticle(data.data.find(n => n.id === id)));
    }, [id]);

    if (!article) return <div className="py-40 text-center font-black">Article Loading...</div>;

    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase mb-8 hover:text-blue-600 transition-all">
                    <FaArrowLeft /> Back to News
                </button>
                
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic mb-6 inline-block">
                    {article.category}
                </span>
                
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic leading-tight mb-8">
                    {article.title}
                </h1>

                <div className="flex gap-6 mb-10 text-slate-400 text-[10px] font-black uppercase border-y border-slate-100 py-4">
                    <div className="flex items-center gap-2"><FaRegCalendarAlt className="text-blue-600" /> {article.date}</div>
                    <div className="flex items-center gap-2"><FaRegClock className="text-blue-600" /> {article.readTime}</div>
                </div>

                <img src={article.image} alt="" className="w-full h-[300px] md:h-[500px] object-cover rounded-[2rem] md:rounded-[4rem] mb-12 shadow-2xl shadow-blue-100" />

                <div className="prose prose-slate max-w-none">
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                        {article.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewsDetails;