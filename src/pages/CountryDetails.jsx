import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
    HiMail, HiCurrencyDollar, HiUserGroup, HiLightningBolt, HiChevronDown, 
    HiAcademicCap, HiDocumentText, HiCheckCircle, HiLocationMarker, HiArrowRight 
} from 'react-icons/hi';

const CountryDetails = () => {
    const { id } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeInstitute, setActiveInstitute] = useState(null);
    const [activeProgramme, setActiveProgramme] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        fetch(`https://studylinkserver.thinkcodify.site/api/countries/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Country details not found");
                return res.json();
            })
            .then(data => {
                setCountry(data.data || data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-white">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 font-black text-slate-400 uppercase tracking-[0.3em] text-xs">Loading Destination...</p>
        </div>
    );

    if (error || !country) return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl text-center border border-slate-100">
                <h2 className="text-4xl font-black text-slate-800 mb-4 italic uppercase">Oops!</h2>
                <p className="text-slate-500 font-bold mb-8 uppercase tracking-widest text-xs">Information sync failed for this region.</p>
                <button onClick={() => window.history.back()} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all duration-500 shadow-lg shadow-blue-200">Go Back</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f9fafc] pb-20">
            {/* --- Hero Section --- */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden rounded-b-[3rem] shadow-lg">
                <img src={country.image} alt={country.country} className="w-full h-full object-cover brightness-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f9fafc]/90"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase drop-shadow-lg">{country.country}</h1>
                    <p className="mt-3 text-blue-100 font-semibold text-sm tracking-wide">Study & Research Hub</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 grid lg:grid-cols-12 gap-12">
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-12">

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-3xl p-6 shadow-lg">
                        {[
                            { label: "Capital", val: country.at_a_glance?.capital, icon: <HiLocationMarker />, color: "text-red-500" },
                            { label: "Currency", val: country.at_a_glance?.currency, icon: <HiCurrencyDollar />, color: "text-emerald-500" },
                            { label: "Language", val: country.at_a_glance?.language, icon: <HiUserGroup />, color: "text-blue-500" },
                            { label: "Work Permit", val: "Available", icon: <HiLightningBolt />, color: "text-amber-500" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-start gap-2 p-4 bg-slate-50 rounded-xl hover:shadow-md transition-all">
                                <div className={`text-2xl ${item.color}`}>{item.icon}</div>
                                <p className="text-xs font-bold text-gray-500 uppercase">{item.label}</p>
                                <p className="text-sm font-extrabold text-gray-900">{item.val || "N/A"}</p>
                            </div>
                        ))}
                    </div>

                    {/* Institutes Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Academic Institutions</h2>
                        <div className="space-y-4">
                            {country.institutes?.map((inst, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition-all">
                                    <button 
                                        onClick={() => { 
                                            setActiveInstitute(activeInstitute === idx ? null : idx); 
                                            setActiveProgramme(null); 
                                        }}
                                        className="w-full flex justify-between items-center p-4 md:p-6 hover:bg-blue-50 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <HiAcademicCap className="text-blue-600" size={24} />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-gray-900">{inst.name}</p>
                                                <p className="text-xs text-gray-500">{inst.programmes?.length || 0} Programmes Available</p>
                                            </div>
                                        </div>
                                        <HiChevronDown className={`transition-transform duration-300 ${activeInstitute === idx ? 'rotate-180' : 'rotate-0'}`} />
                                    </button>

                                    {/* Programmes List (Active Institute Only) */}
                                    {activeInstitute === idx && (
                                        <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 space-y-3">
                                            {inst.programmes?.map((prog, pIdx) => {
                                                const progId = `${idx}-${pIdx}`; // Unique ID based on Institute and Program index
                                                return (
                                                    <div key={pIdx} className="border rounded-xl bg-white overflow-hidden shadow-sm transition-all">
                                                        <button 
                                                            onClick={() => setActiveProgramme(activeProgramme === progId ? null : progId)}
                                                            className="w-full flex justify-between items-center p-4 text-left hover:bg-blue-50 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-2 h-2 rounded-full ${activeProgramme === progId ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                                                <p className={`font-semibold text-sm ${activeProgramme === progId ? 'text-blue-600' : 'text-gray-700'}`}>{prog.name}</p>
                                                            </div>
                                                            <HiArrowRight className={`text-sm transition-all ${activeProgramme === progId ? 'rotate-90 text-blue-600' : 'text-gray-400'}`} />
                                                        </button>

                                                        {/* Admission Requirements (Active Program Only) */}
                                                        {activeProgramme === progId && (
                                                            <div className="p-5 bg-blue-50/50 border-t border-blue-100 space-y-5 animate-in fade-in duration-300">
                                                                <div className="flex items-center gap-2">
                                                                    <HiDocumentText className="text-blue-600" />
                                                                    <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Admission Criteria</h4>
                                                                </div>
                                                                
                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                    <RequirementCard label="English" val={prog.requirements?.ielts} sub="IELTS Score" />
                                                                    <RequirementCard label="Intermediate" val={prog.requirements?.hsc_gpa} sub="HSC Min GPA" />
                                                                    <RequirementCard label="Secondary" val={prog.requirements?.ssc_gpa} sub="SSC Min GPA" />
                                                                    <RequirementCard label="Graduation" val={prog.requirements?.ug_gpa} sub="Undergrad GPA" />
                                                                </div>

                                                                <div className="flex items-start gap-3 bg-green-50 p-3 rounded-xl border border-green-100">
                                                                    <HiCheckCircle className="text-green-600 mt-0.5" size={18} />
                                                                    <p className="text-green-800 text-[10px] font-bold leading-tight uppercase">
                                                                        Scholarship Alert: Based on these scores, you may be eligible for financial aid.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-20 space-y-6">
                        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-4 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Quick Apply</h3>
                            <p className="text-xs text-gray-500">Get a professional response within 24 hours</p>
                            <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                                <input type="text" placeholder="Full Name" className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
                                <input type="email" placeholder="Email Address" className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
                                <select className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3 text-xs text-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white transition-all">
                                    <option>Select Institute</option>
                                    {country.institutes?.map((i, idx) => <option key={idx}>{i.name}</option>)}
                                </select>
                                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 shadow-lg shadow-blue-200 transition-all duration-300">Check Eligibility</button>
                            </form>
                        </div>

                        <div className="bg-blue-600 rounded-2xl p-6 text-white flex items-center justify-between cursor-pointer relative overflow-hidden group shadow-xl shadow-blue-200">
                            <div className="relative z-10">
                                <p className="text-xs opacity-80 uppercase font-bold tracking-widest">Need Expert Help?</p>
                                <h4 className="font-bold text-lg uppercase tracking-tight">Talk to Counselor</h4>
                            </div>
                            <HiMail className="text-3xl opacity-20 group-hover:opacity-100 transition-all group-hover:scale-125" />
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Requirement Card Sub-component
const RequirementCard = ({ label, val, sub }) => (
    <div className="bg-white p-3 rounded-xl border border-blue-100 text-center hover:shadow-sm transition-all">
        <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="font-black text-gray-900 text-lg">{val || "N/A"}</p>
        <p className="text-[8px] font-bold text-gray-400 uppercase">{sub}</p>
    </div>
);

export default CountryDetails;