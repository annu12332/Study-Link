import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
    const [courseData, setCourseData] = useState({
        university: '',
        subject: '',
        country: '',
        degreeType: 'Undergraduate',
        monthlyFee: '',
        minSscGpa: '',
        minHscGpa: '',
        maxStudyGap: '',
        minIelts: '',
        moiAcceptable: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCourseData({
            ...courseData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://studylinkserver.thinkcodify.site/api/admin/add-course', courseData);
            alert(res.data.message);
            // ফর্ম ক্লিয়ার করা
            setCourseData({
                university: '', subject: '', country: '', degreeType: 'Undergraduate',
                monthlyFee: '', minSscGpa: '', minHscGpa: '', maxStudyGap: '',
                minIelts: '', moiAcceptable: false
            });
        } catch (err) {
            alert("Error adding course");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Add New Course (Admin)</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="university" placeholder="University Name" value={courseData.university} onChange={handleChange} className="p-2 border rounded" required />
                <input type="text" name="subject" placeholder="Subject Name" value={courseData.subject} onChange={handleChange} className="p-2 border rounded" required />
                <input type="text" name="country" placeholder="Country" value={courseData.country} onChange={handleChange} className="p-2 border rounded" required />
                
                <select name="degreeType" value={courseData.degreeType} onChange={handleChange} className="p-2 border rounded">
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Diploma">Diploma</option>
                </select>

                <input type="number" name="monthlyFee" placeholder="Monthly Fee ($)" value={courseData.monthlyFee} onChange={handleChange} className="p-2 border rounded" required />
                <input type="number" step="0.01" name="minSscGpa" placeholder="Min SSC GPA" value={courseData.minSscGpa} onChange={handleChange} className="p-2 border rounded" required />
                <input type="number" step="0.01" name="minHscGpa" placeholder="Min HSC GPA" value={courseData.minHscGpa} onChange={handleChange} className="p-2 border rounded" required />
                <input type="number" name="maxStudyGap" placeholder="Max Study Gap (Years)" value={courseData.maxStudyGap} onChange={handleChange} className="p-2 border rounded" required />
                <input type="number" step="0.1" name="minIelts" placeholder="Min IELTS Score" value={courseData.minIelts} onChange={handleChange} className="p-2 border rounded" />

                <div className="flex items-center gap-2">
                    <input type="checkbox" name="moiAcceptable" checked={courseData.moiAcceptable} onChange={handleChange} />
                    <label>MOI Acceptable?</label>
                </div>

                <button type="submit" className="md:col-span-2 bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
                    Save Course to Database
                </button>
            </form>
        </div>
    );
};

export default AddCourse;