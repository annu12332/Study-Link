import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiPlus, HiPencilAlt, HiTrash } from 'react-icons/hi';

const ManageServices = () => {
    // ১. ইনিশিয়াল ভ্যালু সবসময় খালি অ্যারে [] রাখুন
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', icon: 'HelpCircle' });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = 'https://studylinkserver.thinkcodify.site/api/services';

    useEffect(() => { 
        fetchServices(); 
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_BASE_URL);
            
            // ব্যাকেন্ড থেকে ডাটা যদি res.data.services বা অন্য কোনো ফিল্ডে আসে সেটি চেক করা
            const fetchedData = Array.isArray(res.data) ? res.data : (res.data.services || []);
            setServices(fetchedData);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Error:", err.message);
            setServices([]); // এরর হলে খালি অ্যারে সেট করা যাতে .map এরর না দেয়
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${API_BASE_URL}/update/${editId}`, formData);
            } else {
                await axios.post(`${API_BASE_URL}/add`, formData);
            }
            
            closeModal();
            fetchServices();
        } catch (err) {
            console.error("Submission Error Response:", err.response);
            alert("Action failed: " + (err.response?.data?.message || "Server error occurred"));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this service?")) {
            try {
                await axios.delete(`${API_BASE_URL}/delete/${id}`);
                fetchServices();
            } catch (err) {
                console.error("Delete Error:", err.message);
                alert("Could not delete service.");
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', icon: 'HelpCircle' });
        setEditId(null);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">Manage Services</h2>
                <button 
                    onClick={() => { setEditId(null); setFormData({ title: '', description: '', icon: 'HelpCircle' }); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                    <HiPlus /> Add New Service
                </button>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Icon</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Service Title</th>
                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {/* Optional Chaining ?.map এবং Array চেক ব্যবহার করা হয়েছে */}
                        {Array.isArray(services) && services.length > 0 ? (
                            services.map(s => (
                                <tr key={s._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-6 text-xl">{s.icon}</td>
                                    <td className="p-6 font-bold text-slate-700">{s.title}</td>
                                    <td className="p-6">
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={() => { 
                                                    setEditId(s._id); 
                                                    setFormData({ title: s.title, description: s.description, icon: s.icon }); 
                                                    setIsModalOpen(true); 
                                                }}
                                                className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                                            >
                                                <HiPencilAlt size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(s._id)}
                                                className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                <HiTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-20 text-center text-slate-400 italic">
                                    {loading ? "Loading services..." : "No services available."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl">
                        <h3 className="text-xl font-black mb-6 text-[#0F172A]">{editId ? 'Edit Service' : 'Add Service'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input 
                                type="text" placeholder="Service Title" 
                                value={formData.title} 
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full bg-slate-50 px-6 py-4 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-blue-600"
                                required 
                            />
                            <textarea 
                                placeholder="Description" 
                                value={formData.description} 
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full bg-slate-50 px-6 py-4 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-blue-600 h-32"
                                required 
                            ></textarea>
                            <input 
                                type="text" placeholder="Icon Name" 
                                value={formData.icon} 
                                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                                className="w-full bg-slate-50 px-6 py-4 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-blue-600"
                            />
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-200">
                                    {editId ? 'Save Changes' : 'Publish Service'}
                                </button>
                                <button type="button" onClick={closeModal} className="flex-1 bg-slate-100 text-slate-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;