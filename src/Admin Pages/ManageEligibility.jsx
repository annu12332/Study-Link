import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { 
    FaUserGraduate, FaWhatsapp, FaEnvelope, FaSearch, FaTimes,
    FaCheckCircle, FaClock, FaFilter, FaUniversity, FaTrash,
    FaGlobeAmericas, FaChartLine, FaExternalLinkAlt, FaCalendarAlt
} from 'react-icons/fa';

const API_BASE_URL = 'https://studylinkserver.thinkcodify.site/api/eligibility';

const ManageEligibility = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null); // Modal State
    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchRequests = useCallback(async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/all`);
            setRequests(res.data);
        } catch (err) {
            toast.error("Database sync failed");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchRequests(); }, [fetchRequests]);

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`${API_BASE_URL}/status/${id}`, { status: newStatus });
            setRequests(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
            if(selectedItem) setSelectedItem(prev => ({...prev, status: newStatus}));
            toast.success(`Marked as ${newStatus}`);
        } catch (err) { toast.error("Update failed"); }
    };

    const deleteRecord = async (id) => {
        if (!window.confirm("Are you sure? This is permanent.")) return;
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            setRequests(prev => prev.filter(item => item._id !== id));
            setSelectedItem(null);
            toast.success("Record deleted");
        } catch (err) { toast.error("Delete failed"); }
    };

    const filteredData = requests.filter(item => {
        const matchesTab = activeTab === 'All' || item.status === activeTab;
        const matchesSearch = item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900">
            <Toaster position="top-right" />
            
            {/* Header & Stats */}
            <div className="bg-white border-b border-slate-100 pt-10 pb-6 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <span className="p-2 bg-blue-600 text-white rounded-lg"><FaUserGraduate size={20}/></span>
                            Eligibility Portal
                        </h1>
                    </div>
                    
                    <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                        {['All', 'Unchecked', 'Contacted', 'Processed'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
                {/* Search Bar */}
                <div className="relative mb-8">
                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input type="text" placeholder="Search students..." 
                        className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 ring-blue-500/10 transition-all font-bold text-sm"
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* Grid Layout */}
                {loading ? <LoadingGrid /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredData.map(item => (
                                <StudentCard key={item._id} item={item} onClick={() => setSelectedItem(item)} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* --- Detail Modal --- */}
            <AnimatePresence>
                {selectedItem && (
                    <DetailModal 
                        item={selectedItem} 
                        onClose={() => setSelectedItem(null)} 
                        onUpdate={updateStatus} 
                        onDelete={deleteRecord} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Sub Components ---

const StudentCard = ({ item, onClick }) => (
    <motion.div 
        layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
        onClick={onClick}
        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                item.status === 'Processed' ? 'bg-green-100 text-green-700' : item.status === 'Contacted' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
            }`}>
                {item.status}
            </div>
            <FaExternalLinkAlt className="text-slate-200 group-hover:text-blue-500 transition-colors" size={12}/>
        </div>
        <h3 className="text-lg font-black text-slate-800 mb-1 truncate">{item.fullName}</h3>
        <p className="text-xs font-bold text-slate-400 mb-4 truncate">{item.email}</p>
        
        <div className="flex items-center gap-4 py-3 border-t border-slate-50">
            <div className="flex-1">
                <p className="text-[8px] font-black text-slate-300 uppercase">Education</p>
                <p className="text-[11px] font-bold text-slate-600">{item.education}</p>
            </div>
            <div className="flex-1">
                <p className="text-[8px] font-black text-slate-300 uppercase">Target</p>
                <p className="text-[11px] font-bold text-slate-600">{item.country}</p>
            </div>
        </div>
    </motion.div>
);

const DetailModal = ({ item, onClose, onUpdate, onDelete }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl"
        >
            {/* Modal Header */}
            <div className="bg-slate-900 p-8 text-white relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                    <FaTimes size={20}/>
                </button>
                <div className="flex items-center gap-5">
                    <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20">
                        <FaUserGraduate />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">{item.fullName}</h2>
                        <div className="flex flex-wrap gap-4 mt-2">
                            <span className="flex items-center gap-1 text-xs text-slate-400 font-bold"><FaEnvelope/> {item.email}</span>
                            <span className="flex items-center gap-1 text-xs text-green-400 font-bold"><FaWhatsapp/> {item.phone}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#FDFDFF]">
                <ModalInfo icon={<FaUniversity/>} label="Previous Education" value={item.education} />
                <ModalInfo icon={<FaChartLine/>} label="Current CGPA" value={item.cgpa} />
                <ModalInfo icon={<FaGlobeAmericas/>} label="Preferred Country" value={item.country} />
                <ModalInfo icon={<FaCheckCircle/>} label="Language Test Score" value={item.testScore} />
                <ModalInfo icon={<FaCalendarAlt/>} label="Subject Interest" value={item.subject} />
                <ModalInfo icon={<FaClock/>} label="Requested On" value={new Date(item.createdAt).toLocaleString()} />
            </div>

            {/* Modal Footer / Actions */}
            <div className="p-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2">
                    <button onClick={() => onUpdate(item._id, 'Contacted')} className="px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Contacted</button>
                    <button onClick={() => onUpdate(item._id, 'Processed')} className="px-6 py-3 bg-green-50 text-green-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all">Mark Processed</button>
                </div>
                <button onClick={() => onDelete(item._id)} className="flex items-center gap-2 text-red-400 hover:text-red-600 text-xs font-bold transition-colors">
                    <FaTrash size={12}/> Delete Record
                </button>
            </div>
        </motion.div>
    </div>
);

const ModalInfo = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-50 shadow-sm">
        <div className="text-blue-500 mt-1">{icon}</div>
        <div>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-black text-slate-700">{value}</p>
        </div>
    </div>
);

const LoadingGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-white rounded-[2rem] animate-pulse border border-slate-100" />)}
    </div>
);

export default ManageEligibility;