import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaPlus, FaTrash, FaNewspaper, FaImage, FaCalendarAlt, FaClock } from 'react-icons/fa';

const UploadNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [formData, setFormData] = useState({ 
        title: '', 
        description: '', // Short summary
        details: '',     // Full details
        category: 'Notice', 
        image: '', 
        date: '', 
        time: '' 
    });

    const fetchNews = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/news');
            if (res.data.success) setNewsList(res.data.data);
        } catch (err) { console.error("Fetch error", err); }
    };

    useEffect(() => { fetchNews(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/admin/upload-news', formData);
            if (res.data.success) {
                Swal.fire("Success", "News Published Successfully!", "success");
                setFormData({ title: '', description: '', details: '', category: 'Notice', image: '', date: '', time: '' });
                fetchNews();
            }
        } catch (err) { Swal.fire("Error", "Failed to post news", "error"); }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This news will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5000/api/admin/delete-news/${id}`);
                fetchNews();
            }
        });
    };

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                    <h2 className="text-3xl font-black flex items-center gap-3 italic text-slate-900">
                        <FaNewspaper className="text-blue-600" /> 
                        NEWS <span className="text-blue-600 underline decoration-slate-300">PORTAL</span>
                    </h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Manage global updates and student notices</p>
                </header>

                {/* Extended Upload Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-2 block">News Headline</label>
                            <input 
                                type="text" placeholder="Enter a catchy headline..." required
                                className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all text-sm font-bold"
                                value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                            />
                        </div>

                        {/* Date & Time */}
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-2 block">Publish Date</label>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-4 top-4 text-blue-600" />
                                <input 
                                    type="date" required
                                    className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none text-sm font-bold"
                                    value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-2 block">Display Time</label>
                            <div className="relative">
                                <FaClock className="absolute left-4 top-4 text-blue-600" />
                                <input 
                                    type="time" required
                                    className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none text-sm font-bold"
                                    value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Image URL & Category */}
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-2 block">Thumbnail Image URL</label>
                            <div className="relative">
                                <FaImage className="absolute left-4 top-4 text-blue-600" />
                                <input 
                                    type="url" placeholder="https://image-link.com"
                                    className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none text-sm font-bold"
                                    value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-2 block">News Category</label>
                            <select 
                                className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold appearance-none border-2 border-transparent focus:border-blue-500"
                                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="Notice">Notice</option>
                                <option value="Event">Event</option>
                                <option value="Achievement">Achievement</option>
                                <option value="Visa Update">Visa Update</option>
                            </select>
                        </div>

                        {/* Description & Details */}
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-2 block">Short Summary (For Cards)</label>
                            <textarea 
                                placeholder="Briefly explain the news..." required 
                                className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold h-20 resize-none"
                                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-2 block">Full Details (Deep Dive)</label>
                            <textarea 
                                placeholder="Write the complete story here..." required 
                                className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold h-40"
                                value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})}
                            />
                        </div>
                    </div>

                    <button type="submit" className="mt-8 w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98]">
                        <FaPlus size={14} /> Publish To Website
                    </button>
                </form>

                {/* Management List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newsList.map((item) => (
                        <div key={item._id} className="bg-white p-5 rounded-3xl border border-slate-100 flex gap-4 items-center group hover:shadow-md transition-all">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                                <img src={item.image || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow overflow-hidden">
                                <span className="text-[8px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-full">{item.category}</span>
                                <h3 className="text-xs font-black text-slate-900 mt-1 truncate uppercase">{item.title}</h3>
                                <p className="text-[9px] text-slate-400 font-bold mt-0.5">{item.date} • {item.time}</p>
                            </div>
                            <button onClick={() => handleDelete(item._id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                <FaTrash size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UploadNews;