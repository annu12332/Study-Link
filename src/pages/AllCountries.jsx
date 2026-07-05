import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";

const AllCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://studylinkserver.thinkcodify.site/api/countries")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((data) => {
                /**
                 * logic: যদি ব্যাকএন্ড সরাসরি [{}, {}] পাঠায় তবে data সেট হবে।
                 * যদি { data: [{}, {}] } বা { countries: [{}, {}] } পাঠায় তবে সেটি হ্যান্ডেল করবে।
                 */
                if (Array.isArray(data)) {
                    setCountries(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setCountries(data.data);
                } else if (data.countries && Array.isArray(data.countries)) {
                    setCountries(data.countries);
                } else {
                    setCountries([]); // যদি কোনোভাবেই অ্যারে না পায়
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setError(err.message);
                setLoading(false);
                setCountries([]); // এরর হলেও স্টেট যেন অ্যারে থাকে
            });
    }, []);

    // --- Loading State ---
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-20 border-t-blue-600"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading destinations...</p>
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 font-bold">Error: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-12">
                <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                    Study Destinations
                </h2>
                <div className="w-20 h-1.5 bg-blue-600 mt-2 rounded-full"></div>
            </div>

            {/* Main Content */}
            {(!countries || countries.length === 0) ? (
                <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 text-lg font-medium">No countries found in the database.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {countries.map((country) => (
                        <Link
                            key={country._id}
                            to={`/country/${country.slug}`}
                            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={country.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"}
                                    alt={country.country}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {country.is_popular && (
                                    <div className="absolute top-5 left-5 bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg tracking-widest uppercase">
                                        Popular
                                    </div>
                                )}
                            </div>

                            {/* Info Section */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-blue-600 mb-3">
                                    <FaMapMarkerAlt size={12} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                        {country.at_a_glance?.capital || "Explore More"}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                                    {country.country}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
                                    {country.special_highlights || `Discover educational opportunities and cultural experiences in ${country.country}.`}
                                </p>

                                <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                                        <FaUniversity />
                                        <span>{country.institutes?.length || 0} Institutes</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <FaArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllCountries;