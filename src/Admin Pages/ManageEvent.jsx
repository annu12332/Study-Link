import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { HiOutlineTrash, HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

const ManageEvents = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            // Fix 1: Backend path matching (/api/events conceptually or matching your server.js)
            // server.js e apnar route holo "/api/events" get korar jonno
            const res = await axios.get("http://localhost:5000/api/events");
            // Fix 2: Backend response mapping (res.data.data access kora)
            setEvents(res.data.data || []); 
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleAddEvent = async (e) => {
        e.preventDefault();

        const form = e.target;

        const newEvent = {
            title: form.title.value,
            image: form.image.value,
            date: form.date.value,
            time: form.time.value,
            location: form.location.value,
            description: form.description.value,
            type: "Premium",
            category: "Workshop"
        };

        try {
            // Fix 3: URL mismatch fixed to match server.js route (/api/admin/add-event)
            const res = await axios.post(
                "http://localhost:5000/api/admin/add-event",
                newEvent
            );

            if (res.data.success) {
                Swal.fire("Success", "Event Added!", "success");
                form.reset();
                fetchEvents();
            }
        } catch (err) {
            console.error("Add error:", err.response);
            Swal.fire("Error", "Failed to add event. Check Console.", "error");
        }
    };

    const handleDelete = (id) => {

        Swal.fire({
            title: "Delete Event?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete"
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {
                    // Fix 4: Matching your server.js delete route (/api/admin/delete-event/:id)
                    await axios.delete(`http://localhost:5000/api/admin/delete-event/${id}`);

                    setEvents(events.filter(e => e._id !== id));

                    Swal.fire("Deleted!", "Event removed.", "success");

                } catch (err) {
                    Swal.fire("Error", "Delete failed", "error");
                }

            }

        });

    };

    return (

        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 md:px-10">

            <div className="max-w-7xl mx-auto">

                {/* PAGE TITLE */}

                <div className="mb-10">

                    <h1 className="text-4xl font-black text-slate-900">
                        Event <span className="text-blue-600">Management</span>
                    </h1>

                    <p className="text-slate-500 mt-2 text-sm">
                        Add and manage platform events
                    </p>

                </div>


                {/* ADD EVENT FORM */}

                <div className="bg-white rounded-2xl shadow border p-8 mb-12">

                    <h2 className="text-xl font-bold mb-6 text-slate-800">
                        Add New Event
                    </h2>

                    <form
                        onSubmit={handleAddEvent}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >

                        <input
                            name="title"
                            required
                            placeholder="Event Title"
                            className="border p-3 rounded-lg outline-none focus:border-blue-500 transition"
                        />

                        <input
                            name="image"
                            required
                            placeholder="Image URL"
                            className="border p-3 rounded-lg outline-none focus:border-blue-500 transition"
                        />

                        <input
                            name="location"
                            required
                            placeholder="Location"
                            className="border p-3 rounded-lg outline-none focus:border-blue-500 transition"
                        />

                        <input
                            type="date"
                            name="date"
                            required
                            className="border p-3 rounded-lg outline-none focus:border-blue-500 transition"
                        />

                        <input
                            type="time"
                            name="time"
                            required
                            className="border p-3 rounded-lg outline-none focus:border-blue-500 transition"
                        />

                        <textarea
                            name="description"
                            required
                            placeholder="Event Description"
                            className="border p-3 rounded-lg md:col-span-2 lg:col-span-3 outline-none focus:border-blue-500 transition"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition md:col-span-2 lg:col-span-3"
                        >
                            Publish Event
                        </button>

                    </form>

                </div>


                {/* ALL EVENTS */}

                <h2 className="text-2xl font-bold mb-6 text-slate-800">
                    All Events
                </h2>


                {loading ? (

                    <div className="text-center py-20 text-slate-400">
                        Loading Events...
                    </div>

                ) : (

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {events && events.map((event) => (

                            <div
                                key={event._id}
                                className="bg-white rounded-xl shadow border overflow-hidden hover:shadow-lg transition"
                            >

                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-40 object-cover"
                                    onError={(e) =>
                                        (e.target.src = "https://via.placeholder.com/400x200")
                                    }
                                />

                                <div className="p-4">

                                    <h3 className="font-bold text-slate-800">
                                        {event.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {event.description?.slice(0, 60)}...
                                    </p>

                                    <div className="mt-3 space-y-1 text-sm">

                                        <p className="flex items-center gap-2 text-slate-600">
                                            <HiOutlineCalendar className="text-blue-600" />
                                            {event.date}
                                        </p>

                                        <p className="flex items-center gap-2 text-slate-600">
                                            <HiOutlineLocationMarker className="text-blue-600" />
                                            {event.location}
                                        </p>

                                    </div>

                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600"
                                    >
                                        <HiOutlineTrash />
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

};

export default ManageEvents;