import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes, FaStar, FaPaperPlane, FaUser } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const FeedbackButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        
        // Form field theke value collect kora
        const userName = form.userName.value;
        const userMessage = form.message.value;

        // Backend Schema anujayi object toiri (Exact Field Names)
        const feedbackData = {
            name: userName,
            rating: rating,
            message: userMessage, 
            status: "pending"
        };

        // Debugging-er jonno (Browser console-e check korun)
        console.log("📤 Payload being sent:", feedbackData);

        try {
            // Backend endpoint URL check korun
            const res = await axios.post('https://studylinkserver.thinkcodify.site/api/reviews/submit', feedbackData);
            
            if (res.data.success || res.status === 201 || res.status === 200) {
                Swal.fire({
                    title: "Sent Successfully!",
                    text: "Your review is waiting for admin approval.",
                    icon: "success",
                    confirmButtonColor: "#2563eb",
                    borderRadius: '1.5rem'
                });
                
                // Form reset ebong modal close
                setIsModalOpen(false);
                form.reset();
                setRating(5);
            }
        } catch (err) {
            console.error("❌ Submission Error:", err.response?.data || err.message);
            
            // Backend validation error thakle seta dekhabe
            const errorMsg = err.response?.data?.message || "Failed to send. Try again later.";
            Swal.fire("Error", errorMsg, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* --- Floating Trigger Button --- */}
            <div className="fixed bottom-8 right-8 z-[100]">
                <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-700"></div>
                    <div className="relative flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-xl border border-slate-100">
                        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                            <FaCommentDots size={18} />
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-[10px] uppercase tracking-[0.25em] font-black text-blue-600 leading-none">Share</p>
                            <h4 className="text-sm font-bold text-slate-900 leading-none mt-1">Feedback</h4>
                        </div>
                    </div>
                </motion.button>
            </div>

            {/* --- Linked Review Modal --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            className="bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-10 relative shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-all"
                            >
                                <FaTimes size={20} />
                            </button>

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-black text-slate-900 uppercase italic">
                                    Rate Your <span className="text-blue-600 not-italic">Journey</span>
                                </h3>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Your review helps us grow</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Star Rating Selection */}
                                <div className="flex flex-col items-center bg-slate-50 py-5 rounded-3xl border border-slate-100">
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-3">Overall Experience</p>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(0)}
                                                className="transition-transform active:scale-90"
                                            >
                                                <FaStar 
                                                    size={26} 
                                                    className={`transition-colors duration-200 ${star <= (hover || rating) ? 'text-orange-400' : 'text-slate-200'}`} 
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                        <input 
                                            name="userName" 
                                            required 
                                            placeholder="What's your name?" 
                                            className="w-full bg-slate-50 border-none p-5 pl-12 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all" 
                                        />
                                    </div>

                                    <textarea 
                                        name="message" 
                                        required 
                                        rows="4" 
                                        placeholder="Write your story here..." 
                                        className="w-full bg-slate-50 border-none p-5 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none resize-none transition-all" 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? "Transmitting..." : <><FaPaperPlane /> Submit Review</>}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FeedbackButton;