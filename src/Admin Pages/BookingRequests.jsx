import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

/* ── inline SVG icons ── */
const Ico = ({ d, size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink: 0 }}>
        <path d={d} />
    </svg>
);
const I = {
    ticket: "M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.1 1.11h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z",
    clock: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2",
    check: "M20 6L9 17l-5-5",
    x: "M18 6L6 18M6 6l12 12",
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
    refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
    search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
    alert: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
    sort: "M3 6h18M7 12h10M11 18h2",
};

const STATUS_CFG = {
    Pending: { bg: "#FFF7ED", border: "#FED7AA", color: "#C2410C", dot: "#F97316" },
    Approved: { bg: "#F0FDF4", border: "#BBF7D0", color: "#15803D", dot: "#22C55E" },
    Rejected: { bg: "#FFF1F2", border: "#FECDD3", color: "#BE123C", dot: "#F43F5E" },
};

const fmtDate = d => {
    if (!d) return "—";
    try { return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }); }
    catch { return d; }
};

const avatarGrad = name => {
    const g = [["#1e40af", "#3b82f6"], ["#065f46", "#10b981"], ["#7c2d12", "#f97316"],
    ["#4c1d95", "#8b5cf6"], ["#164e63", "#06b6d4"], ["#881337", "#f43f5e"]];
    const i = (name || "A").charCodeAt(0) % g.length;
    return `linear-gradient(135deg,${g[i][0]},${g[i][1]})`;
};

const initials = n => (n || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

/* ── Status Badge ── */
const StatusBadge = ({ status }) => {
    const c = STATUS_CFG[status] || STATUS_CFG.Pending;
    return (
        <span style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide whitespace-nowrap">
            <span style={{ background: c.dot }} className="w-1.5 h-1.5 rounded-full" />
            {status || "Pending"}
        </span>
    );
};

/* ── Stat Card ── */
const StatCard = ({ label, value, color, icon }) => (
    <div style={{ background: color + "12", border: `1px solid ${color}28` }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl">
        <div style={{ color }}>{icon}</div>
        <div>
            <p style={{ color }} className="text-2xl font-black leading-none">{value}</p>
            <p className="text-slate-500 text-[11px] font-semibold mt-0.5">{label}</p>
        </div>
    </div>
);

/* ════════════════════════════════
   MAIN
════════════════════════════════ */
export default function BookingRequests() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setFilter] = useState("All");
    const [sortNewest, setSort] = useState(true);
    const [toast, setToast] = useState(null);
    const [updating, setUpdating] = useState(null);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type }); setTimeout(() => setToast(null), 2800);
    };

    const fetchBookings = async () => {
        try {
            const res = await axios.get("https://studylinkserver.thinkcodify.site/api/admin/all-bookings");
            setBookings(res.data || []);
        } catch (err) {
            console.error(err);
            showToast("Failed to load bookings", "error");
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchBookings(); }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        setUpdating(id + newStatus);
        try {
            const res = await axios.patch(`https://studylinkserver.thinkcodify.site/api/admin/update-status/${id}`, { status: newStatus });
            if (res.data.success) {
                setBookings(p => p.map(b => b._id === id ? { ...b, status: newStatus } : b));
                showToast(`Booking ${newStatus.toLowerCase()} successfully`);
            }
        } catch { showToast("Status update failed", "error"); }
        finally { setUpdating(null); }
    };

    const filtered = bookings
        .filter(b => {
            const s = search.toLowerCase();
            const matchS = (b.eventTitle || "").toLowerCase().includes(s) ||
                (b.userName || "").toLowerCase().includes(s) ||
                (b.userEmail || "").toLowerCase().includes(s);
            const matchF = statusFilter === "All" || (b.status || "Pending") === statusFilter;
            return matchS && matchF;
        })
        .sort((a, b) => sortNewest
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt)
        );

    const counts = {
        Pending: bookings.filter(b => (b.status || "Pending") === "Pending").length,
        Approved: bookings.filter(b => b.status === "Approved").length,
        Rejected: bookings.filter(b => b.status === "Rejected").length,
    };

    /* ── loading ── */
    if (loading) return (
        <div style={{ background: "linear-gradient(135deg,#f0f4ff,#f8faff)" }}
            className="h-screen flex items-center justify-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-5">
                <div style={{ background: "linear-gradient(135deg,#1e40af,#3b82f6)" }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl">
                    <Ico d={I.ticket} size={28} color="white" />
                </div>
                <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-2 h-2 rounded-full bg-blue-400"
                            animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                    ))}
                </div>
                <p className="text-slate-500 text-sm font-medium">Loading bookings…</p>
            </motion.div>
        </div>
    );

    return (
        <div style={{ background: "linear-gradient(150deg,#f0f5ff 0%,#f8faff 55%,#f0fdf4 100%)", minHeight: "100vh", fontFamily: "'DM Sans',system-ui,sans-serif" }}>

            {/* ── Toast ── */}
            <AnimatePresence>
                {toast && (
                    <motion.div initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
                        style={{
                            background: toast.type === "error" ? "#fef2f2" : "#f0fdf4",
                            border: `1px solid ${toast.type === "error" ? "#fecaca" : "#bbf7d0"}`,
                            color: toast.type === "error" ? "#dc2626" : "#15803d",
                        }}
                        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-semibold whitespace-nowrap">
                        <Ico d={toast.type === "error" ? I.alert : I.check} size={14} color="currentColor" />
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto px-4 py-10">

                {/* ══ HEADER ══ */}
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div style={{ background: "linear-gradient(135deg,#1e40af,#3b82f6)" }}
                                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <Ico d={I.ticket} size={26} color="white" />
                            </div>
                            <div>
                                <h1 style={{ fontWeight: 900, letterSpacing: "-0.02em" }}
                                    className="text-3xl text-slate-900 leading-tight">Booking Requests</h1>
                                <p className="text-slate-400 text-sm mt-0.5">
                                    {bookings.length} total · Admin Dashboard
                                </p>
                            </div>
                        </div>
                        <button onClick={fetchBookings}
                            className="self-start sm:self-auto flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 border border-slate-200 bg-white rounded-xl px-4 py-2.5 transition hover:border-blue-300 hover:shadow-sm">
                            <Ico d={I.refresh} size={14} /> Refresh
                        </button>
                    </div>
                </motion.div>

                {/* ══ STATS ══ */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                    className="flex flex-wrap gap-3 mb-6">
                    <StatCard label="Total" value={bookings.length} color="#3b82f6" icon={<Ico d={I.ticket} size={18} color="#3b82f6" />} />
                    <StatCard label="Pending" value={counts.Pending} color="#f97316" icon={<Ico d={I.clock} size={18} color="#f97316" />} />
                    <StatCard label="Approved" value={counts.Approved} color="#22c55e" icon={<Ico d={I.check} size={18} color="#22c55e" />} />
                    <StatCard label="Rejected" value={counts.Rejected} color="#f43f5e" icon={<Ico d={I.x} size={18} color="#f43f5e" />} />
                </motion.div>

                {/* ══ TOOLBAR ══ */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5 flex flex-col md:flex-row gap-3">
                    {/* search */}
                    <div className="relative flex-1">
                        <Ico d={I.search} size={14} color="#94a3b8"
                            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                        <input
                            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                            placeholder="Search by event, name or email…"
                            value={search} onChange={e => setSearch(e.target.value)} />
                        {search && <button onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 text-xl leading-none">×</button>}
                    </div>

                    {/* status filter */}
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                        <Ico d={I.filter} size={13} color="#94a3b8" />
                        <select value={statusFilter} onChange={e => setFilter(e.target.value)}
                            className="text-sm font-semibold text-slate-600 bg-transparent focus:outline-none cursor-pointer pr-1">
                            <option value="All">All Statuses</option>
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                        </select>
                    </div>

                    {/* sort */}
                    <button onClick={() => setSort(p => !p)}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 border border-slate-200 bg-slate-50 rounded-xl px-3 py-2.5 transition flex-shrink-0">
                        <Ico d={I.sort} size={14} />
                        {sortNewest ? "Newest first" : "Oldest first"}
                    </button>

                    {/* count */}
                    <div className="flex items-center px-3.5 bg-blue-50 border border-blue-100 rounded-xl flex-shrink-0 py-2.5">
                        <span className="text-blue-700 font-black text-sm">{filtered.length}</span>
                        <span className="text-blue-400 text-xs ml-1">results</span>
                    </div>
                </motion.div>

                {/* ══ BOOKING CARDS ══ */}
                <div className="space-y-3">
                    <AnimatePresence>
                        {filtered.map((book, idx) => {
                            const cfg = STATUS_CFG[book.status || "Pending"];
                            const isApproved = book.status === "Approved";
                            const isRejected = book.status === "Rejected";

                            return (
                                <motion.div key={book._id}
                                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ delay: idx * 0.025 }}
                                    style={{ border: `1.5px solid ${cfg.border}` }}
                                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">

                                    <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">

                                        {/* ── Avatar ── */}
                                        <div style={{ background: avatarGrad(book.userName), flexShrink: 0 }}
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-base shadow-sm self-start sm:self-auto">
                                            {initials(book.userName)}
                                        </div>

                                        {/* ── Main info ── */}
                                        <div className="flex-1 min-w-0">
                                            {/* top row */}
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <h3 className="font-bold text-slate-800 text-[15px] leading-tight">
                                                    {book.userName || "Unknown"}
                                                </h3>
                                                <StatusBadge status={book.status || "Pending"} />
                                            </div>

                                            {/* event title */}
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <Ico d={I.ticket} size={12} color="#3b82f6" />
                                                <span className="text-sm font-semibold text-blue-600 truncate">
                                                    {book.eventTitle || "—"}
                                                </span>
                                            </div>

                                            {/* contact + date */}
                                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <Ico d={I.mail} size={11} color="#94a3b8" />{book.userEmail || "—"}
                                                </span>
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <Ico d={I.phone} size={11} color="#94a3b8" />{book.userPhone || "—"}
                                                </span>
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <Ico d={I.clock} size={11} color="#94a3b8" />
                                                    {fmtDate(book.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* ── Action buttons ── */}
                                        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap sm:flex-nowrap">
                                            {!isApproved && (
                                                <button
                                                    onClick={() => handleStatusUpdate(book._id, "Approved")}
                                                    disabled={updating === book._id + "Approved"}
                                                    style={{ background: "linear-gradient(135deg,#15803d,#22c55e)" }}
                                                    className="flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm hover:opacity-90 disabled:opacity-60 transition whitespace-nowrap">
                                                    <Ico d={I.check} size={13} color="white" />
                                                    {updating === book._id + "Approved" ? "Saving…" : "Approve"}
                                                </button>
                                            )}
                                            {!isRejected && (
                                                <button
                                                    onClick={() => handleStatusUpdate(book._id, "Rejected")}
                                                    disabled={updating === book._id + "Rejected"}
                                                    className="flex items-center gap-1.5 text-rose-500 text-xs font-bold px-4 py-2.5 rounded-xl border border-rose-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 disabled:opacity-60 transition whitespace-nowrap">
                                                    <Ico d={I.x} size={13} color="currentColor" />
                                                    {updating === book._id + "Rejected" ? "Saving…" : "Reject"}
                                                </button>
                                            )}
                                            {/* already finalised */}
                                            {isApproved && isRejected === false && (
                                                <span className="text-xs text-slate-300 font-semibold px-3">Finalised</span>
                                            )}
                                        </div>

                                    </div>

                                    {/* bottom accent line based on status */}
                                    <div style={{ background: cfg.dot, height: 3 }} className="w-full" />

                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* ── Empty state ── */}
                {filtered.length === 0 && (
                    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-32 text-center">
                        <div style={{ background: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" }}
                            className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6">
                            <Ico d={I.ticket} size={42} color="#cbd5e1" />
                        </div>
                        <p className="text-xl font-bold text-slate-400">No bookings found</p>
                        <p className="text-slate-300 text-sm mt-1.5">
                            {search || statusFilter !== "All" ? "Try adjusting your search or filter" : "No booking requests yet"}
                        </p>
                        {(search || statusFilter !== "All") && (
                            <button onClick={() => { setSearch(""); setFilter("All"); }}
                                className="mt-5 text-sm font-bold text-blue-500 border border-blue-200 rounded-xl px-5 py-2.5 hover:bg-blue-50 transition">
                                Clear filters
                            </button>
                        )}
                    </motion.div>
                )}

            </div>
        </div>
    );
}