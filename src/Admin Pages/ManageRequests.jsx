import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaSearch,
    FaChevronDown,
    FaChevronUp,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaUser,
    FaGraduationCap,
    FaTrash,
} from "react-icons/fa";

const ApplicationRequests = () => {
    const [applications, setApplications] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/admin/applications"
            );

            let fetchedData = [];

            if (res.data.applications) {
                fetchedData = res.data.applications;
            } else if (res.data.data) {
                fetchedData = res.data.data;
            } else if (Array.isArray(res.data)) {
                fetchedData = res.data;
            }

            setApplications(fetchedData);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/admin/applications/${id}/status`,
                { status: newStatus }
            );

            setApplications((prev) =>
                prev.map((app) =>
                    app._id === id ? { ...app, status: newStatus } : app
                )
            );
        } catch (err) {
            alert("Status update failed");
        }
    };

    const deleteApplication = async (id) => {
        if (!window.confirm("Delete this application?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/admin/applications/${id}`
            );

            setApplications((prev) => prev.filter((app) => app._id !== id));
        } catch (err) {
            alert("Delete failed");
        }
    };

    const filteredApps = applications.filter((app) => {
        const search = searchTerm.toLowerCase();

        return (
            app.applicantName?.toLowerCase().includes(search) ||
            app.email?.toLowerCase().includes(search)
        );
    });

    if (loading)
        return (
            <div className="h-screen flex items-center justify-center text-xl font-bold text-blue-600 animate-pulse">
                Loading Applications...
            </div>
        );

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">

                    <h1 className="text-3xl font-black text-slate-800 uppercase">
                        Applications
                        <span className="text-blue-600 ml-2">
                            ({filteredApps.length})
                        </span>
                    </h1>

                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search name or email..."
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                </div>

                {/* APPLICATION LIST */}

                <div className="space-y-4">

                    {filteredApps.length > 0 ? (

                        filteredApps.map((app) => (

                            <div
                                key={app._id}
                                className="bg-white border rounded-2xl shadow-sm"
                            >

                                {/* SUMMARY */}

                                <div
                                    className="flex justify-between items-center p-5 cursor-pointer hover:bg-slate-50"
                                    onClick={() =>
                                        setExpandedId(
                                            expandedId === app._id ? null : app._id
                                        )
                                    }
                                >

                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-xl font-bold">
                                            {app.applicantName?.charAt(0)}
                                        </div>

                                        <div>
                                            <p className="font-bold text-lg">
                                                {app.applicantName}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {app.email}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-center gap-6">

                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <FaMapMarkerAlt /> {app.area || "N/A"}
                                        </span>

                                        <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                            {app.status}
                                        </span>

                                        {expandedId === app._id ? (
                                            <FaChevronUp />
                                        ) : (
                                            <FaChevronDown />
                                        )}

                                    </div>

                                </div>

                                {/* DETAILS */}

                                <AnimatePresence>

                                    {expandedId === app._id && (

                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="border-t bg-slate-50"
                                        >

                                            <div className="grid md:grid-cols-3 gap-6 p-6">

                                                {/* PERSONAL */}

                                                <InfoCard title="Personal Info">
                                                    <Info label="Name" value={app.applicantName} />
                                                    <Info label="Gender" value={app.gender} />
                                                    <Info label="DOB" value={app.dob} />
                                                    <Info label="Guardian" value={app.guardianName} />
                                                </InfoCard>

                                                {/* CONTACT */}

                                                <InfoCard title="Contact">
                                                    <Info label="Phone" value={app.mobile} />
                                                    <Info label="Email" value={app.email} />
                                                    <Info label="Area" value={app.area} />
                                                </InfoCard>

                                                {/* STUDY PREFERENCE */}

                                                <InfoCard title="Study Preference">
                                                    <Info label="Country" value={app.desiredCountry} />
                                                    <Info label="University" value={app.desiredUniversity} />
                                                    <Info label="Course" value={app.desiredCourse} />
                                                </InfoCard>

                                                {/* SSC */}

                                                <InfoCard title="SSC">
                                                    <Info label="Board" value={app.sscBoard} />
                                                    <Info label="Year" value={app.sscYear} />
                                                    <Info label="GPA" value={app.sscGpaVal} />
                                                </InfoCard>

                                                {/* HSC */}

                                                <InfoCard title="HSC">
                                                    <Info label="Board" value={app.hscBoard} />
                                                    <Info label="Year" value={app.hscYear} />
                                                    <Info label="GPA" value={app.hscGpaVal} />
                                                </InfoCard>

                                                {/* UG */}

                                                <InfoCard title="Undergraduate">
                                                    <Info label="University" value={app.ugUni} />
                                                    <Info label="Degree" value={app.ugDegree} />
                                                    <Info label="Course" value={app.ugCourse} />
                                                    <Info label="GPA" value={app.ugGpa} />
                                                    <Info label="Year" value={app.ugYear} />
                                                </InfoCard>

                                                {/* PG */}

                                                <InfoCard title="Postgraduate">
                                                    <Info label="University" value={app.pgUni} />
                                                    <Info label="Degree" value={app.pgDegree} />
                                                    <Info label="Course" value={app.pgCourse} />
                                                    <Info label="GPA" value={app.pgGpa} />
                                                    <Info label="Year" value={app.pgYear} />
                                                </InfoCard>

                                                {/* TEST SCORES */}

                                                <InfoCard title="Test Scores">
                                                    <Info label="IELTS" value={app.ielts} />
                                                    <Info label="UKVI" value={app.ukvi} />
                                                    <Info label="PTE" value={app.pte} />
                                                    <Info label="Duolingo" value={app.duolingo} />
                                                    <Info label="SAT" value={app.sat} />
                                                    <Info label="ACT" value={app.act} />
                                                </InfoCard>

                                                {/* ADMIN */}

                                                <div className="bg-white border rounded-2xl p-5 space-y-4">

                                                    <h3 className="font-bold text-blue-600 uppercase text-sm">
                                                        Admin Control
                                                    </h3>

                                                    <select
                                                        value={app.status}
                                                        onChange={(e) =>
                                                            updateStatus(app._id, e.target.value)
                                                        }
                                                        className="w-full border p-3 rounded-lg"
                                                    >
                                                        <option>Pending</option>
                                                        <option>Contacted</option>
                                                        <option>Completed</option>
                                                        <option>Rejected</option>
                                                    </select>

                                                    <button
                                                        onClick={() => deleteApplication(app._id)}
                                                        className="flex items-center justify-center gap-2 w-full bg-red-100 text-red-600 py-3 rounded-xl hover:bg-red-500 hover:text-white transition"
                                                    >
                                                        <FaTrash />
                                                        Delete Application
                                                    </button>

                                                </div>

                                            </div>

                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>

                        ))

                    ) : (

                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
                            No Applications Found
                        </div>

                    )}

                </div>

            </div>
        </div>
    );
};

const InfoCard = ({ title, children }) => (
    <div className="bg-white border rounded-2xl p-5">
        <h3 className="font-bold text-blue-600 mb-4 uppercase text-sm">
            {title}
        </h3>
        <div className="space-y-2">{children}</div>
    </div>
);

const Info = ({ label, value }) => (
    <div className="flex justify-between text-sm border-b pb-1">
        <span className="text-gray-400">{label}</span>
        <span className="font-semibold">{value || "N/A"}</span>
    </div>
);

export default ApplicationRequests;