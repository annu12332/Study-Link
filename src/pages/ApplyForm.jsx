import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
    FaGlobe, FaBookOpen, FaPaperPlane, FaCheckCircle, 
    FaArrowRight, FaArrowLeft 
} from 'react-icons/fa';

const ApplyForm = () => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => setIsSubmitted(true), 1500);
    };

    const inputStyle = "w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 text-sm font-semibold transition-all outline-none shadow-sm";
    const labelStyle = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-2 block";

    return (
        <section className="bg-[#f8fafc] py-20 px-6">
            <div className="max-w-3xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
                        Apply <span className="text-blue-600">Now</span>
                    </h2>
                    <div className="w-20 h-1 bg-red-600 mx-auto mt-3 rounded-full" />
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form 
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-8 md:p-12"
                                onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}
                            >
                                
                                {/* Step 1: Basic Info */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelStyle}>Your Name *</label>
                                                <div className="relative">
                                                    <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                                    <input type="text" placeholder="Full Name" className={`${inputStyle} pl-14`} required />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelStyle}>Email Address *</label>
                                                <div className="relative">
                                                    <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                                    <input type="email" placeholder="Email Address" className={`${inputStyle} pl-14`} required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelStyle}>Phone Number *</label>
                                                <div className="relative">
                                                    <FaPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                                    <input type="tel" placeholder="Phone Number" className={`${inputStyle} pl-14`} required />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelStyle}>Desired Country *</label>
                                                <div className="relative">
                                                    <FaGlobe className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                                    <input type="text" placeholder="e.g. UK, Canada" className={`${inputStyle} pl-14`} required />
                                                </div>
                                            </div>
                                        </div>

                                        <button onClick={nextStep} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-lg shadow-blue-200">
                                            NEXT STEP <FaArrowRight />
                                        </button>
                                    </div>
                                )}

                                {/* Step 2: Educational & Message */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelStyle}>Desired Subject *</label>
                                                <div className="relative">
                                                    <FaBookOpen className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                                    <input type="text" placeholder="Desired Subject" className={`${inputStyle} pl-14`} required />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelStyle}>Address *</label>
                                                <div className="relative">
                                                    <FaMapMarkerAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                                    <input type="text" placeholder="Your Address" className={`${inputStyle} pl-14`} required />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelStyle}>Your Message</label>
                                            <textarea rows="4" placeholder="Write your message here..." className={`${inputStyle} resize-none`}></textarea>
                                        </div>

                                        <div className="flex gap-4">
                                            <button onClick={prevStep} className="w-1/3 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                                                <FaArrowLeft /> BACK
                                            </button>
                                            <button type="submit" className="w-2/3 bg-red-600 text-white py-5 rounded-2xl font-black text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-lg shadow-red-100">
                                                SUBMIT APPLICATION <FaPaperPlane size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.form>
                        ) : (
                            /* Success State */
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="p-16 text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaCheckCircle size={35} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Application Submitted!</h3>
                                <p className="text-slate-500 font-medium text-sm mb-8">আমাদের প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
                                <button 
                                    onClick={() => {setIsSubmitted(false); setStep(1);}}
                                    className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-black tracking-widest uppercase"
                                >
                                    Apply Again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ApplyForm;