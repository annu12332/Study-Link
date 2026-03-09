import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
    HiOutlineCheckCircle, 
    HiOutlineXCircle, 
    HiOutlineClock, 
    HiOutlineMail, 
    HiOutlinePhone,
    HiOutlineTicket
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const BookingRequests = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // ১. সব বুকিং রিকোয়েস্ট ফেচ করা
    const fetchBookings = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/all-bookings');
            setBookings(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // ২. স্ট্যাটাস আপডেট ফাংশন (Approved/Rejected)
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await axios.patch(`http://localhost:5000/api/admin/update-status/${id}`, { 
                status: newStatus 
            });
            
            if (res.data.success) {
                // স্টেট আপডেট করা যাতে পেজ রিফ্রেশ ছাড়াই চেঞ্জ দেখা যায়
                setBookings(bookings.map(book => 
                    book._id === id ? { ...book, status: newStatus } : book
                ));
                
                Swal.fire({
                    title: `Booking ${newStatus}`,
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        } catch (err) {
            Swal.fire('Error', 'Update failed!', 'error');
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-black uppercase italic tracking-widest text-blue-600 animate-pulse">Loading Requests...</div>;

    return (
        <div className="pt-24 pb-20 px-4 md:px-10 bg-[#fcfcfc] min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 border-l-8 border-blue-600 pl-6">
                            Booking Requests
                        </h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 pl-8">
                            Review and manage participant seat reservations
                        </p>
                    </div>
                    
                    {/* Stats Counter (Optional) */}
                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center min-w-[100px]">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</p>
                            <p className="text-xl font-black text-amber-500">{bookings.filter(b => b.status === 'Pending').length}</p>
                        </div>
                        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center min-w-[100px]">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Approved</p>
                            <p className="text-xl font-black text-blue-600">{bookings.filter(b => b.status === 'Approved').length}</p>
                        </div>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-50 border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] italic">
                                <tr>
                                    <th className="p-6">Event & Participant</th>
                                    <th className="p-6">Contact Info</th>
                                    <th className="p-6">Submission Date</th>
                                    <th className="p-6">Status</th>
                                    <th className="p-6 text-center">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <AnimatePresence>
                                    {bookings.map((book) => (
                                        <motion.tr 
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={book._id} 
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                                        <HiOutlineTicket size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black uppercase italic text-slate-800 text-xs tracking-tight">{book.eventTitle}</h4>
                                                        <p className="text-slate-500 text-[10px] font-bold uppercase mt-1">{book.userName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-bold text-slate-500 flex items-center gap-2 lowercase">
                                                        <HiOutlineMail className="text-blue-600" /> {book.userEmail}
                                                    </p>
                                                    <p className="text-[9px] font-bold text-slate-500 flex items-center gap-2">
                                                        <HiOutlinePhone className="text-blue-600" /> {book.userPhone}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <p className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-2">
                                                    <HiOutlineClock /> {new Date(book.createdAt).toLocaleDateString()}
                                                </p>
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase italic tracking-widest ${
                                                    book.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                                    book.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                                                }`}>
                                                    {book.status}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center gap-2">
                                                    {book.status !== 'Approved' && (
                                                        <button 
                                                            onClick={() => handleStatusUpdate(book._id, 'Approved')}
                                                            className="p-3 bg-slate-900 text-white hover:bg-green-600 rounded-xl transition-all shadow-lg active:scale-90"
                                                            title="Approve"
                                                        >
                                                            <HiOutlineCheckCircle size={18} />
                                                        </button>
                                                    )}
                                                    {book.status !== 'Rejected' && (
                                                        <button 
                                                            onClick={() => handleStatusUpdate(book._id, 'Rejected')}
                                                            className="p-3 bg-white border border-slate-200 text-slate-400 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-90"
                                                            title="Reject"
                                                        >
                                                            <HiOutlineXCircle size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        {bookings.length === 0 && (
                            <div className="p-20 text-center font-black uppercase italic text-slate-300 tracking-[0.5em]">
                                No Booking Requests Yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingRequests;