import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

/* ── inline SVG icons ── */
const Ico = ({ d, size = 18, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink: 0 }}>
        <path d={d} />
    </svg>
);
const I = {
    cal: "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z",
    clock: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2",
    trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
    plus: "M12 5v14M5 12h14",
    img: "M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2z",
    text: "M4 6h16M4 10h16M4 14h10",
    event: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    x: "M18 6L6 18M6 6l12 12",
    check: "M20 6L9 17l-5-5",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
    refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
};

const formatDate = d => {
    if (!d) return "—";
    try { return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }); }
    catch { return d; }
};

/* ── field wrapper ── */
const Field = ({ label, icon, children, span = 1 }) => (
    <div style={{ gridColumn: `span ${span}` }} className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <Ico d={icon} size={12} color="#94a3b8" /> {label}
        </label>
        {children}
    </div>
);

const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all duration-200";

/* ════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════ */
export default function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState("grid"); // grid | list
    const [toast, setToast] = useState(null);
    const [imgErrors, setImgErrors] = useState({});

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchEvents = async () => {
        try {
            const res = await axios.get("https://studylinkserver.thinkcodify.site/api/events");
            setEvents(res.data.data || []);
        } catch (err) {
            console.error(err);
            showToast("Failed to load events", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchEvents(); }, []);

    const handleAddEvent = async e => {
        e.preventDefault();
        setSubmitting(true);
        const form = e.target;
        const newEvent = {
            title: form.title.value,
            image: form.image.value,
            date: form.date.value,
            time: form.time.value,
            location: form.location.value,
            description: form.description.value,
            type: "Premium",
            category: "Workshop",
        };
        try {
            const res = await axios.post("https://studylinkserver.thinkcodify.site/api/admin/add-event", newEvent);
            if (res.data.success) {
                showToast("Event published successfully!");
                form.reset();
                setShowForm(false);
                fetchEvents();
            }
        } catch (err) {
            console.error(err);
            showToast("Failed to add event", "error");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = id => {
        Swal.fire({
            title: "Delete this event?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete",
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://studylinkserver.thinkcodify.site/api/admin/delete-event/${id}`);
                    setEvents(prev => prev.filter(e => e._id !== id));
                    showToast("Event deleted");
                } catch {
                    showToast("Delete failed", "error");
                }
            }
        });
    };

    const filtered = events.filter(ev =>
        (ev.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (ev.location || "").toLowerCase().includes(search.toLowerCase())
    );

    /* ── EVENT CARD (grid) ── */
    const GridCard = ({ event, idx }) => (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: idx * 0.04 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
        >
            {/* image */}
            <div className="relative h-44 bg-slate-100 overflow-hidden">
                {imgErrors[event._id] ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-100">
                        <Ico d={I.img} size={32} color="#cbd5e1" />
                        <span className="text-xs text-slate-400">No image</span>
                    </div>
                ) : (
                    <img src={event.image} alt={event.title}
                        className="w-full h-full object-cover"
                        onError={() => setImgErrors(p => ({ ...p, [event._id]: true }))} />
                )}
                {/* type chip */}
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {event.type || "Event"}
                </span>
            </div>

            {/* body */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-slate-800 text-[15px] leading-snug line-clamp-2 mb-1">
                    {event.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">
                    {event.description || "No description"}
                </p>

                <div className="mt-auto space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Ico d={I.cal} size={13} color="#3b82f6" />
                        <span>{formatDate(event.date)}</span>
                        {event.time && <><span className="text-slate-300">·</span>
                            <Ico d={I.clock} size={12} color="#94a3b8" />
                            <span>{event.time}</span></>}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Ico d={I.pin} size={13} color="#3b82f6" />
                        <span className="truncate">{event.location || "—"}</span>
                    </div>
                </div>

                <button onClick={() => handleDelete(event._id)}
                    className="mt-4 w-full flex items-center justify-center gap-2 border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200">
                    <Ico d={I.trash} size={14} color="currentColor" /> Delete Event
                </button>
            </div>
        </motion.div>
    );

    /* ── EVENT ROW (list) ── */
    const ListRow = ({ event, idx }) => (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ delay: idx * 0.03 }}
            className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all duration-200"
        >
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                {imgErrors[event._id] ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <Ico d={I.img} size={20} color="#cbd5e1" />
                    </div>
                ) : (
                    <img src={event.image} alt={event.title}
                        className="w-full h-full object-cover"
                        onError={() => setImgErrors(p => ({ ...p, [event._id]: true }))} />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-800 text-sm truncate">{event.title}</h3>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 uppercase">
                        {event.type || "Event"}
                    </span>
                </div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Ico d={I.cal} size={11} color="#94a3b8" />{formatDate(event.date)}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Ico d={I.clock} size={11} color="#94a3b8" />{event.time || "—"}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Ico d={I.pin} size={11} color="#94a3b8" />{event.location || "—"}
                    </span>
                </div>
            </div>
            <button onClick={() => handleDelete(event._id)}
                className="flex-shrink-0 flex items-center gap-1.5 border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200">
                <Ico d={I.trash} size={13} color="currentColor" /> Delete
            </button>
        </motion.div>
    );

    /* ════════════════════ RENDER ════════════════════ */
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
                        <Ico d={toast.type === "error" ? I.x : I.check} size={15} color="currentColor" />
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
                                <Ico d={I.event} size={26} color="white" />
                            </div>
                            <div>
                                <h1 style={{ fontWeight: 900, letterSpacing: "-0.02em" }} className="text-3xl text-slate-900 leading-tight">
                                    Event Management
                                </h1>
                                <p className="text-slate-400 text-sm mt-0.5">{events.length} total events · Admin Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <button onClick={fetchEvents}
                                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 border border-slate-200 bg-white rounded-xl px-4 py-2.5 transition hover:border-blue-300 hover:shadow-sm">
                                <Ico d={I.refresh} size={14} /> Refresh
                            </button>
                            <button onClick={() => setShowForm(p => !p)}
                                style={{ background: showForm ? "#64748b" : "linear-gradient(135deg,#1e40af,#3b82f6)" }}
                                className="flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 hover:opacity-90 transition">
                                <Ico d={showForm ? I.x : I.plus} size={15} color="white" />
                                {showForm ? "Cancel" : "Add Event"}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* ── STATS ROW ── */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                        { label: "Total Events", value: events.length, color: "#3b82f6" },
                        { label: "This Month", value: events.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).length, color: "#8b5cf6" },
                        { label: "Upcoming", value: events.filter(e => new Date(e.date) >= new Date()).length, color: "#22c55e" },
                        { label: "Past", value: events.filter(e => new Date(e.date) < new Date()).length, color: "#f97316" },
                    ].map(s => (
                        <div key={s.label} style={{ background: s.color + "10", border: `1px solid ${s.color}28` }}
                            className="rounded-2xl px-4 py-3 flex flex-col">
                            <span style={{ color: s.color }} className="text-2xl font-black leading-none">{s.value}</span>
                            <span className="text-slate-500 text-xs font-semibold mt-1">{s.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* ══ ADD EVENT FORM ══ */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden mb-6">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <div style={{ background: "#eff6ff" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
                                        <Ico d={I.plus} size={16} color="#3b82f6" />
                                    </div>
                                    <h2 className="font-bold text-slate-800 text-lg">Publish New Event</h2>
                                </div>

                                <form onSubmit={handleAddEvent}
                                    style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>

                                    <Field label="Event Title" icon={I.event} span={2}>
                                        <input name="title" required placeholder="e.g. Study Abroad Workshop 2025"
                                            className={inputCls} />
                                    </Field>

                                    <Field label="Image URL" icon={I.img} span={2}>
                                        <input name="image" required placeholder="https://example.com/image.jpg"
                                            className={inputCls} />
                                    </Field>

                                    <Field label="Location" icon={I.pin}>
                                        <input name="location" required placeholder="City, Country or Online"
                                            className={inputCls} />
                                    </Field>

                                    <Field label="Date" icon={I.cal}>
                                        <input type="date" name="date" required className={inputCls} />
                                    </Field>

                                    <Field label="Time" icon={I.clock} span={2}>
                                        <input type="time" name="time" required className={inputCls + " max-w-[200px]"} />
                                    </Field>

                                    <Field label="Description" icon={I.text} span={2}>
                                        <textarea name="description" required rows={3}
                                            placeholder="Describe the event, agenda, and who should attend…"
                                            className={inputCls + " resize-none"} />
                                    </Field>

                                    {/* actions */}
                                    <div style={{ gridColumn: "span 2" }} className="flex gap-3 pt-2">
                                        <button type="submit" disabled={submitting}
                                            style={{ background: "linear-gradient(135deg,#1e40af,#3b82f6)" }}
                                            className="flex items-center gap-2 text-white font-bold px-8 py-3 rounded-xl shadow-md shadow-blue-200 hover:opacity-90 disabled:opacity-60 transition text-sm">
                                            <Ico d={submitting ? I.refresh : I.check} size={15} color="white" />
                                            {submitting ? "Publishing…" : "Publish Event"}
                                        </button>
                                        <button type="button" onClick={() => setShowForm(false)}
                                            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-500 font-semibold text-sm hover:bg-slate-50 transition">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ══ TOOLBAR ══ */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    {/* search */}
                    <div className="relative flex-1">
                        <Ico d={I.search} size={14} color="#94a3b8"
                            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                        <input className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                            placeholder="Search events by title or location…"
                            value={search} onChange={e => setSearch(e.target.value)} />
                        {search && <button onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 text-xl leading-none">×</button>}
                    </div>

                    {/* view toggle */}
                    <div className="flex bg-slate-100 rounded-xl p-1 gap-1 flex-shrink-0">
                        {[["grid", I.grid], ["list", I.list]].map(([mode, icon]) => (
                            <button key={mode} onClick={() => setViewMode(mode)}
                                style={viewMode === mode ? { background: "white", boxShadow: "0 1px 4px #0001" } : {}}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 transition capitalize">
                                <Ico d={icon} size={13} /> {mode}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center px-3.5 bg-blue-50 border border-blue-100 rounded-xl flex-shrink-0 py-2.5">
                        <span className="text-blue-700 font-black text-sm">{filtered.length}</span>
                        <span className="text-blue-400 text-xs ml-1">results</span>
                    </div>
                </motion.div>

                {/* ══ EVENTS ══ */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-5">
                        <div style={{ background: "linear-gradient(135deg,#1e40af,#3b82f6)" }}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse">
                            <Ico d={I.event} size={24} color="white" />
                        </div>
                        <div className="flex gap-1.5">
                            {[0, 1, 2].map(i => (
                                <motion.div key={i} className="w-2 h-2 rounded-full bg-blue-400"
                                    animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                            ))}
                        </div>
                        <p className="text-slate-400 text-sm font-medium">Loading events…</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-32 text-center">
                        <div style={{ background: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" }}
                            className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6">
                            <Ico d={I.event} size={40} color="#cbd5e1" />
                        </div>
                        <p className="text-xl font-bold text-slate-400">No events found</p>
                        <p className="text-slate-300 text-sm mt-1.5">
                            {search ? "Try a different search term" : "Add your first event above"}
                        </p>
                        {search && (
                            <button onClick={() => setSearch("")}
                                className="mt-5 text-sm font-bold text-blue-500 border border-blue-200 rounded-xl px-5 py-2.5 hover:bg-blue-50 transition">
                                Clear search
                            </button>
                        )}
                    </motion.div>
                ) : viewMode === "grid" ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {filtered.map((event, idx) => (
                                <GridCard key={event._id} event={event} idx={idx} />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <AnimatePresence>
                            {filtered.map((event, idx) => (
                                <ListRow key={event._id} event={event} idx={idx} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}

            </div>
        </div>
    );
}