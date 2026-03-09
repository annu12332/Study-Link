import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCheck, FaTrash, FaClock, FaStar } from 'react-icons/fa';

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch All Reviews
    const fetchReviews = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/all-reviews');
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
        fetchReviews();
    }, []);

    // Approve Review
    const handleApprove = async (id) => {
        try {
            const res = await axios.patch(`http://localhost:5000/api/admin/approve-review/${id}`);
            if (res.data.success) {
                Swal.fire("Approved!", "Review is now live.", "success");
                fetchReviews(); // Refresh list
            }
        } catch (err) {
            Swal.fire("Error", "Failed to approve", "error");
        }
    };

    // Delete Review
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/admin/delete-review/${id}`);
                    Swal.fire("Deleted!", "Review has been removed.", "success");
                    fetchReviews();
                } catch (err) {
                    Swal.fire("Error", "Failed to delete", "error");
                }
            }
        });
    };

    if (loading) return <div className="p-10 text-center font-bold">Loading Reviews...</div>;

    return (
        <div className="p-4 md:p-10 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase italic">
                    Review <span className="text-blue-600">Moderation</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 relative overflow-hidden">
                            {/* Status Badge */}
                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                review.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                            }`}>
                                {review.status}
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{review.name}</h4>
                                    <div className="flex text-orange-400 text-xs">
                                        {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-600 text-sm italic mb-6">"{review.message}"</p>

                            <div className="flex gap-3 pt-4 border-t border-slate-50">
                                {review.status === 'pending' && (
                                    <button 
                                        onClick={() => handleApprove(review._id)}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                                    >
                                        <FaCheck /> Approve
                                    </button>
                                )}
                                <button 
                                    onClick={() => handleDelete(review._id)}
                                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {reviews.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                        <FaClock className="mx-auto text-slate-200 text-5xl mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest">No reviews to moderate</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReviews;