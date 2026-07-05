import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
    HiCheckCircle, HiLocationMarker, HiArrowLeft, 
    HiClipboardCheck, HiArrowRight, HiShieldCheck, 
    HiAcademicCap, HiGlobeAlt 
} from 'react-icons/hi';
import { motion } from 'framer-motion';

const InstituteDetails = () => {
    const { slug } = useParams();
    const [inst, setInst] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`https://studylinkserver.thinkcodify.site/api/all-institutes`);
                if (res.data.success) {
                    const found = res.data.data.find(item => item.slug === slug);
                    setInst(found);
                }
            } catch (err) {
                console.error("Error loading details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [slug]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
                <p className="text-slate-900 font-bold uppercase tracking-widest text-xs">Loading Institute...</p>
            </div>
        </div>
    );

    if (!inst) return (
        <div className="h-screen flex flex-col items-center justify-center bg-white px-6">
            <h1 className="text-3xl font-extrabold text-slate-700 mb-6">Institute Not Found</h1>
            <Link to="/institutes" className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <HiArrowLeft /> Back to Directory
            </Link>
        </div>
    );

    return (
        <section className="pt-24 pb-16 bg-gray-50 min-h-screen">

            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Back Button */}
                <Link
                    to="/institutes"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-8"
                >
                    <HiArrowLeft /> Back to Institutes
                </Link>

                <div className="grid lg:grid-cols-12 gap-10">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-7 space-y-10">

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="overflow-hidden rounded-2xl shadow-lg bg-white"
                        >
                            <img
                                src={inst.image}
                                alt={inst.name}
                                className="w-full h-[250px] md:h-[420px] object-cover"
                            />
                        </motion.div>

                        {/* Institute Info */}
                        <div>
                            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                                {inst.country}
                            </p>

                            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
                                {inst.name}
                            </h1>

                            <div className="flex items-center gap-2 text-gray-500 mt-3">
                                <HiLocationMarker className="text-blue-600" />
                                {inst.location}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                About This Institute
                            </h2>

                            <p className="text-gray-600 leading-relaxed">
                                {inst.description ||
                                    "This institution is known for its global academic excellence and research innovation. Students benefit from modern facilities, international faculty, and strong career pathways."}
                            </p>
                        </div>

                        {/* Features */}
                        {inst.features?.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    Key Features
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    {inst.features.map((f, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-3 bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
                                        >
                                            <HiCheckCircle className="text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {f}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="lg:col-span-5">

                        <div className="sticky top-28 space-y-6">

                            {/* Eligibility Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <HiAcademicCap size={26} />
                                    <h3 className="text-2xl font-bold">
                                        Check Eligibility
                                    </h3>
                                </div>

                                <p className="text-sm text-blue-100 mb-6">
                                    Find out your chances of getting admission to
                                    <span className="font-semibold"> {inst.name}</span>.
                                </p>

                                <div className="space-y-2 mb-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <HiShieldCheck /> Instant assessment
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <HiGlobeAlt /> Global education standards
                                    </div>
                                </div>

                                <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
                                    <HiClipboardCheck />
                                    Start Assessment
                                    <HiArrowRight />
                                </button>
                            </motion.div>

                            {/* Support Card */}
                            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                    Need Help?
                                </h4>

                                <p className="text-sm text-gray-600 mb-4">
                                    Our education advisors can guide you through
                                    admission requirements and application steps.
                                </p>

                                <button className="text-blue-600 font-semibold hover:underline text-sm">
                                    Talk to an Advisor
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default InstituteDetails;