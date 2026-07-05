import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const AddInstitute = () => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        country: "",
        location: "",
        image: "",
        programmes: [],
    });
    const [institutes, setInstitutes] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchInstitutes();
    }, []);

    const fetchInstitutes = async () => {
        const res = await axios.get("https://studylinkserver.thinkcodify.site/api/all-institutes");
        setInstitutes(res.data.data);
    };

    const generateSlug = (t) =>
        t.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setFormData({ ...formData, name: value, slug: generateSlug(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.patch(
                    `https://studylinkserver.thinkcodify.site/api/admin/institute/${editingId}`,
                    formData
                );
            } else {
                await axios.post(
                    "https://studylinkserver.thinkcodify.site/api/admin/add-institute",
                    formData
                );
            }
            alert("Success!");
            setFormData({
                name: "",
                slug: "",
                country: "",
                location: "",
                image: "",
                programmes: [],
            });
            setEditingId(null);
            fetchInstitutes();
        } catch (err) {
            alert("Error!");
        }
    };

    const handleEdit = (inst) => {
        setEditingId(inst._id);
        setFormData(inst);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this institute?")) {
            await axios.delete(`https://studylinkserver.thinkcodify.site/api/admin/institute/${id}`);
            fetchInstitutes();
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen px-4 md:px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 tracking-tight uppercase">
                    Manage <span className="text-blue-600 not-italic">Institutes</span>
                </h1>

                {/* --- Form Section --- */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6 mb-16"
                >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <InputField
                            label="University Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Oxford University"
                            required
                        />
                        <InputField
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="UK"
                            required
                        />
                        <InputField
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="London"
                            required
                        />
                        <InputField
                            label="Image URL"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="md:col-span-2"
                        />
                        <InputField
                            label="Slug (Auto)"
                            name="slug"
                            value={formData.slug}
                            readOnly
                            className="bg-gray-100 text-gray-500 font-mono"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 md:py-5 rounded-2xl font-bold uppercase hover:bg-blue-700 transition-all shadow-lg"
                    >
                        {editingId ? "Update Institute" : "Add Institute"}
                    </button>
                </form>

                {/* --- Institutes Directory --- */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {institutes.map((inst) => (
                        <div
                            key={inst._id}
                            className="bg-white rounded-3xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 transition-all"
                        >
                            <div className="h-48 w-full bg-gray-200 overflow-hidden rounded-t-3xl">
                                <img
                                    src={inst.image}
                                    alt={inst.name}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                                    {inst.country}
                                </span>
                                <h3 className="text-lg font-extrabold text-gray-900 mt-2 truncate uppercase italic">
                                    {inst.name}
                                </h3>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(inst)}
                                        className="flex-1 bg-gray-900 text-white py-2 rounded-xl text-xs font-bold uppercase hover:bg-blue-600 transition-colors"
                                    >
                                        <FaEdit className="inline mr-1" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(inst._id)}
                                        className="bg-red-50 text-red-500 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Reusable Input Field ---
const InputField = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    readOnly,
    className = "",
    required = false,
}) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="text-xs font-bold uppercase text-gray-500">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            className={`bg-white border border-gray-200 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />
    </div>
);

export default AddInstitute;