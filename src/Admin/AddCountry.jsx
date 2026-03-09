import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";

const AddCountryFull = () => {
    const [formData, setFormData] = useState({
        country: "",
        slug: "",
        image: "",
        is_popular: false,
        special_highlights: "",
        at_a_glance: {
            capital: "",
            currency: "",
            language: "",
            work_permit: "Available"
        },
        institutes: [],
    });

    const [countries, setCountries] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // --- Fetch Countries ---
    const fetchCountries = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/countries");
            setCountries(res.data.data);
        } catch (err) {
            console.error("Error fetching countries:", err);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    // Helper to generate slug
    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    };

    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("at_a_glance.")) {
            const key = name.split(".")[1];
            setFormData({
                ...formData,
                at_a_glance: { ...formData.at_a_glance, [key]: value },
            });
        } else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (name === "country") {
            setFormData({
                ...formData,
                country: value,
                slug: generateSlug(value)
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // --- Institutes ---
    const addInstitute = () => {
        setFormData({
            ...formData,
            institutes: [
                ...formData.institutes,
                { name: "", slug: "", programmes: [] },
            ],
        });
    };

    const removeInstitute = (index) => {
        const updated = [...formData.institutes];
        updated.splice(index, 1);
        setFormData({ ...formData, institutes: updated });
    };

    const handleInstituteChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...formData.institutes];
        if (name === "name") {
            updated[index].name = value;
            updated[index].slug = generateSlug(value);
        } else {
            updated[index][name] = value;
        }
        setFormData({ ...formData, institutes: updated });
    };

    // --- Programmes ---
    const addProgramme = (instIndex) => {
        const updated = [...formData.institutes];
        updated[instIndex].programmes.push({
            name: "",
            duration: "",
            requirements: { ielts: "", hsc_gpa: "", ssc_gpa: "", ug_gpa: "" },
        });
        setFormData({ ...formData, institutes: updated });
    };

    const removeProgramme = (instIndex, progIndex) => {
        const updated = [...formData.institutes];
        updated[instIndex].programmes.splice(progIndex, 1);
        setFormData({ ...formData, institutes: updated });
    };

    const handleProgrammeChange = (instIndex, progIndex, e) => {
        const { name, value } = e.target;
        const updated = [...formData.institutes];
        if (name.startsWith("requirements.")) {
            const key = name.split(".")[1];
            updated[instIndex].programmes[progIndex].requirements[key] = value;
        } else {
            updated[instIndex].programmes[progIndex][name] = value;
        }
        setFormData({ ...formData, institutes: updated });
    };

    // --- Submit / Update ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.patch(`http://localhost:5000/api/admin/country/${editingId}`, formData);
                alert("Country Updated Successfully!");
            } else {
                await axios.post("http://localhost:5000/api/admin/add-country", formData);
                alert("Country Added Successfully!");
            }
            resetForm();
            fetchCountries();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Operation failed");
        }
    };

    // --- Delete ---
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this country?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/country/${id}`);
                alert("Deleted Successfully");
                fetchCountries();
            } catch (err) {
                alert("Delete failed");
            }
        }
    };

    // --- Edit Mode ---
    const handleEdit = (country) => {
        setEditingId(country._id);
        setFormData({
            country: country.country || "",
            slug: country.slug || "",
            image: country.image || "",
            is_popular: country.is_popular || false,
            special_highlights: country.special_highlights || "",
            at_a_glance: {
                capital: country.at_a_glance?.capital || "",
                currency: country.at_a_glance?.currency || "",
                language: country.at_a_glance?.language || "",
                work_permit: country.at_a_glance?.work_permit || "Available",
            },
            institutes: country.institutes || [],
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            country: "",
            slug: "",
            image: "",
            is_popular: false,
            special_highlights: "",
            at_a_glance: { capital: "", currency: "", language: "", work_permit: "Available" },
            institutes: [],
        });
    };

    return (
        <div className="min-h-screen p-6 bg-slate-50 text-slate-800">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-black mb-6 text-slate-900">
                    {editingId ? "✏️ Edit Country" : "🌍 Add New Country"}
                </h1>

                <form className="bg-white p-6 rounded-xl shadow-lg space-y-6 border border-slate-200" onSubmit={handleSubmit}>
                    {/* Basic Country Info */}
                    <div>
                        <h2 className="font-bold text-lg mb-3 text-blue-600">Basic Information</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Country Name" name="country" value={formData.country} onChange={handleChange} className="border rounded-lg p-2" required />
                            <input type="text" placeholder="Slug (Auto)" name="slug" value={formData.slug} onChange={handleChange} className="border rounded-lg p-2 bg-gray-50 font-mono text-xs" required />
                            <input type="text" placeholder="Image URL" name="image" value={formData.image} onChange={handleChange} className="border rounded-lg p-2" />
                            <input type="text" placeholder="Special Highlights" name="special_highlights" value={formData.special_highlights} onChange={handleChange} className="border rounded-lg p-2" />

                            <label className="flex items-center gap-2 font-semibold cursor-pointer">
                                <input type="checkbox" name="is_popular" checked={formData.is_popular} onChange={handleChange} className="w-4 h-4" />
                                Mark as Popular Country
                            </label>
                        </div>
                    </div>

                    {/* At a Glance Section */}
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <h2 className="font-bold text-lg mb-3 text-blue-700">At a Glance Details</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Capital City</label>
                                <input type="text" placeholder="e.g. London" name="at_a_glance.capital" value={formData.at_a_glance.capital} onChange={handleChange} className="border rounded-lg p-2 text-sm" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Currency</label>
                                <input type="text" placeholder="e.g. GBP" name="at_a_glance.currency" value={formData.at_a_glance.currency} onChange={handleChange} className="border rounded-lg p-2 text-sm" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Language</label>
                                <input type="text" placeholder="e.g. English" name="at_a_glance.language" value={formData.at_a_glance.language} onChange={handleChange} className="border rounded-lg p-2 text-sm" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Work Permit</label>
                                <select name="at_a_glance.work_permit" value={formData.at_a_glance.work_permit} onChange={handleChange} className="border rounded-lg p-2 text-sm bg-white">
                                    <option value="Available">Available</option>
                                    <option value="Not Available">Not Available</option>
                                    <option value="Limited">Limited</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Institutes */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-lg text-blue-600">Academic Institutions</h2>
                        {formData.institutes.map((inst, i) => (
                            <div key={i} className="border p-4 rounded-xl space-y-2 bg-gray-50 border-slate-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-slate-700">Institute {i + 1}</h3>
                                    <button type="button" onClick={() => removeInstitute(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"><FaTrash /></button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-2">
                                    <input type="text" name="name" placeholder="Institute Name" value={inst.name} onChange={(e) => handleInstituteChange(i, e)} className="border rounded-lg p-2 w-full" required />
                                    <input type="text" name="slug" placeholder="Slug (Auto)" value={inst.slug} onChange={(e) => handleInstituteChange(i, e)} className="border rounded-lg p-2 w-full bg-white font-mono text-xs" required />
                                </div>

                                <div className="space-y-2 mt-4 pl-4 border-l-2 border-blue-200">
                                    <h4 className="font-bold text-sm text-slate-600">Programmes</h4>
                                    {inst.programmes.map((prog, j) => (
                                        <div key={j} className="border p-3 rounded-lg bg-white space-y-3 relative shadow-sm">
                                            <button type="button" onClick={() => removeProgramme(i, j)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><FaTrash size={12} /></button>
                                            <div className="grid md:grid-cols-2 gap-2">
                                                <input type="text" name="name" placeholder="Programme Name" value={prog.name} onChange={(e) => handleProgrammeChange(i, j, e)} className="border rounded-lg p-2 w-full text-sm" />
                                                <input type="text" name="duration" placeholder="Duration" value={prog.duration} onChange={(e) => handleProgrammeChange(i, j, e)} className="border rounded-lg p-2 w-full text-sm" />
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                {['ielts', 'hsc_gpa', 'ssc_gpa', 'ug_gpa'].map((req) => (
                                                    <div key={req} className="flex flex-col gap-1">
                                                        <label className="text-[9px] font-bold text-slate-400 uppercase">{req.replace('_', ' ')}</label>
                                                        <input type="text" name={`requirements.${req}`} placeholder="Value" value={prog.requirements[req] || ""} onChange={(e) => handleProgrammeChange(i, j, e)} className="border rounded-lg p-2 text-xs" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addProgramme(i)} className="flex items-center gap-2 text-blue-600 text-xs font-bold mt-2 hover:underline"><FaPlus size={10} /> Add Programme</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addInstitute} className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg border border-green-200 font-bold hover:bg-green-100 transition"><FaPlus /> Add New Institute</button>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="flex-1 px-6 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 shadow-lg transition-all">
                            {editingId ? "Update Country Data" : "Save Country Data"}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm} className="px-6 py-4 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300 transition-all">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                {/* Country List Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-black mb-6 text-slate-900 flex items-center gap-2">
                        📋 Existing Countries <span className="text-sm font-normal text-slate-500">({countries.length})</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {countries.map((c) => (
                            <div key={c._id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 group hover:shadow-xl transition-all duration-300">
                                <div className="h-32 bg-slate-200 relative overflow-hidden">
                                    {c.image ? (
                                        <img src={c.image} alt={c.country} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                                    )}
                                    {c.is_popular && (
                                        <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-black px-2 py-1 rounded-md shadow-sm">POPULAR</span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-slate-800">{c.country}</h3>
                                    <p className="text-xs text-slate-400 font-mono mb-3">{c.slug}</p>

                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Capital</p>
                                            <p className="text-sm font-semibold">{c.at_a_glance?.capital || "N/A"}</p>
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Institutes</p>
                                            <p className="text-sm font-semibold">{c.institutes?.length || 0}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 border-t pt-4">
                                        <button onClick={() => handleEdit(c)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all">
                                            <FaEdit size={14} /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(c._id)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all">
                                            <FaTrash size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCountryFull;