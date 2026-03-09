import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaEye, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
    FaUserGraduate, FaTimes, FaSearch,
    FaWhatsapp, FaTrash, FaUserFriends
} from 'react-icons/fa';

const ManageApplications = () => {

    const [apps, setApps] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("All")
    const [selectedApp, setSelectedApp] = useState(null)

    useEffect(() => {
        fetchApps()
    }, [])

    const fetchApps = async () => {

        try {

            setLoading(true)

            const res = await axios.get("http://localhost:5000/api/admin/applications")

            if (res.data?.success) {

                setApps(res.data.data)

            } else if (Array.isArray(res.data)) {

                setApps(res.data)

            }

        } catch (err) {

            console.error("Fetch error:", err)

        } finally {

            setLoading(false)

        }

    }

    const updateStatus = async (id, newStatus) => {

        try {

            await axios.patch(`http://localhost:5000/api/admin/applications/${id}/status`, {
                status: newStatus
            })

            setApps(prev =>
                prev.map(app =>
                    app._id === id ? { ...app, status: newStatus } : app
                )
            )

            if (selectedApp?._id === id) {

                setSelectedApp({ ...selectedApp, status: newStatus })

            }

        } catch (err) {

            alert("Failed to update status")

        }

    }

    const deleteApp = async (id) => {

        if (!window.confirm("Delete application?")) return

        try {

            await axios.delete(`http://localhost:5000/api/admin/applications/${id}`)

            setApps(prev => prev.filter(app => app._id !== id))

            setSelectedApp(null)

        } catch (err) {

            alert("Delete failed")

        }

    }

    /* ---------- FILTER ---------- */

    const filteredApps = useMemo(() => {

        return apps.filter(app => {

            const name =
                app.applicantName ||
                app.studentName ||
                ""

            const email =
                app.email ||
                app.studentEmail ||
                ""

            const matchesSearch =
                name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                email.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesFilter =
                filterStatus === "All" ||
                app.status === filterStatus

            return matchesSearch && matchesFilter

        })

    }, [apps, searchTerm, filterStatus])


    if (loading) {

        return (
            <div className="h-screen flex items-center justify-center text-xl font-bold">
                Loading Applications...
            </div>
        )

    }

    /* ---------- UI ---------- */

    return (

        <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-6">

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}

                <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">

                    <h1 className="text-4xl font-black">
                        Applications <span className="text-blue-600">Hub</span>
                    </h1>

                    <div className="bg-white p-1 rounded-xl shadow border flex">

                        {['All', 'Pending', 'Processing', 'Approved', 'Rejected', 'Contacted'].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-4 py-2 text-xs font-bold uppercase rounded-lg ${filterStatus === s
                                        ?
                                        "bg-black text-white"
                                        :
                                        "text-gray-500"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}

                    </div>

                </div>

                {/* SEARCH */}

                <div className="relative mb-8">

                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-4 rounded-xl border"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

                {/* TABLE */}

                <div className="bg-white rounded-2xl shadow border overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="p-4 text-left text-xs uppercase">Student</th>
                                <th className="p-4 text-left text-xs uppercase">Course</th>
                                <th className="p-4 text-center text-xs uppercase">Status</th>
                                <th className="p-4 text-right text-xs uppercase">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredApps.length > 0 ?

                                filteredApps.map(app => {

                                    const name =
                                        app.applicantName ||
                                        app.studentName ||
                                        "N/A"

                                    const email =
                                        app.email ||
                                        app.studentEmail ||
                                        "N/A"

                                    const phone =
                                        app.mobile ||
                                        app.studentPhone ||
                                        app.phone ||
                                        "N/A"

                                    const course =
                                        app.desiredCourse ||
                                        app.subject ||
                                        "N/A"

                                    const country =
                                        app.desiredCountry ||
                                        app.country ||
                                        "N/A"

                                    return (

                                        <tr
                                            key={app._id}
                                            className="border-t hover:bg-blue-50 cursor-pointer"
                                            onClick={() => setSelectedApp(app)}
                                        >

                                            <td className="p-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold">

                                                        {name.charAt(0)}

                                                    </div>

                                                    <div>

                                                        <div className="font-bold">{name}</div>

                                                        <div className="text-xs text-gray-400">{email}</div>

                                                    </div>

                                                </div>

                                            </td>

                                            <td className="p-4">

                                                <div className="font-bold text-sm">{course}</div>

                                                <div className="text-xs text-blue-600 font-bold">
                                                    {country}
                                                </div>

                                            </td>

                                            <td className="p-4 text-center">

                                                <StatusChip status={app.status} />

                                            </td>

                                            <td className="p-4 text-right">

                                                <button className="p-2 rounded-lg bg-gray-100">
                                                    <FaEye />
                                                </button>

                                            </td>

                                        </tr>

                                    )

                                })

                                :

                                <tr>
                                    <td colSpan="4" className="text-center p-8 text-gray-400">
                                        No applications found
                                    </td>
                                </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {/* -------- DRAWER -------- */}

            <AnimatePresence>

                {selectedApp && (

                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl p-6 overflow-y-auto"
                    >

                        <div className="flex justify-between mb-6">

                            <h2 className="font-bold text-xl">
                                Student Details
                            </h2>

                            <button onClick={() => setSelectedApp(null)}>
                                <FaTimes />
                            </button>

                        </div>

                        <div className="space-y-4">

                            <InfoRow
                                label="Name"
                                value={
                                    selectedApp.applicantName ||
                                    selectedApp.studentName
                                }
                            />

                            <InfoRow
                                label="Email"
                                value={
                                    selectedApp.email ||
                                    selectedApp.studentEmail
                                }
                            />

                            <InfoRow
                                label="Mobile"
                                value={
                                    selectedApp.mobile ||
                                    selectedApp.studentPhone ||
                                    selectedApp.phone
                                }
                            />

                            <InfoRow
                                label="Guardian"
                                value={selectedApp.guardianName}
                            />

                            <InfoRow
                                label="Area"
                                value={selectedApp.area}
                            />

                        </div>

                        <div className="flex gap-3 mt-8">

                            <a
                                href={`https://wa.me/${(selectedApp.mobile || selectedApp.phone || "").replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 bg-green-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                            >

                                <FaWhatsapp />
                                WhatsApp

                            </a>

                            <button
                                onClick={() => deleteApp(selectedApp._id)}
                                className="bg-red-100 text-red-600 px-4 rounded-xl"
                            >

                                <FaTrash />

                            </button>

                        </div>

                    </motion.aside>

                )}

            </AnimatePresence>

        </div>

    )

}

/* -------- COMPONENTS -------- */

const StatusChip = ({ status }) => {

    const colors = {
        Approved: "bg-green-100 text-green-600",
        Rejected: "bg-red-100 text-red-600",
        Processing: "bg-blue-100 text-blue-600",
        Pending: "bg-yellow-100 text-yellow-600",
        Contacted: "bg-purple-100 text-purple-600"
    }

    return (

        <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors[status]}`}>
            {status || "Pending"}
        </span>

    )

}

const InfoRow = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-bold">{value || "N/A"}</p>
    </div>
)

export default ManageApplications