import React, { useState, useRef } from "react";
import axios from "axios";

const StudentEligibilityForm = () => {
    // FORM STATE
    const [formData, setFormData] = useState({
        country: "",
        degreeType: "Undergraduate", // DB er sathe mil rekhe default 'Undergraduate' kora holo
        sscGpa: "",
        hscGpa: "",
        testType: "IELTS",
        testScore: "",
        budget: "",
        studyGap: "0",
        intake: "Fall",
        moi: "No",
    });

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    const resultRef = useRef(null);

    // APPLICATION STATE
    const [appData, setAppData] = useState({
        applicantName: "",
        gender: "Male",
        email: "",
        guardianName: "",
        area: "",
        dob: "",
        mobile: "",
        sscBoard: "",
        sscYear: "",
        sscGpaVal: "",
        hscBoard: "",
        hscYear: "",
        hscGpaVal: "",
        ugUni: "",
        ugDegree: "",
        ugCourse: "",
        ugGpa: "",
        ugYear: "",
        pgUni: "",
        pgDegree: "",
        pgCourse: "",
        pgGpa: "",
        pgYear: "",
        desiredCountry: "",
        desiredUniversity: "",
        desiredCourse: "",
        ielts: "",
        ukvi: "",
        pte: "",
        duolingo: "",
        sat: "",
        act: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAppChange = (e) => {
        setAppData({ ...appData, [e.target.name]: e.target.value });
    };

    // SEARCH LOGIC
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Backend-e pathanor age data structure thik kora
            const searchPayload = {
                ...formData,
                sscGpa: parseFloat(formData.sscGpa) || 0,
                hscGpa: parseFloat(formData.hscGpa) || 0,
                testScore: parseFloat(formData.testScore) || 0,
                budget: parseInt(formData.budget) || 0,
                studyGap: parseInt(formData.studyGap) || 0,
            };

            const res = await axios.post(
                "http://localhost:5000/api/check-eligibility",
                searchPayload
            );

            if (res.data.success) {
                setCourses(res.data.data || []);
            } else {
                setCourses([]);
            }

            // Scroll to results
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 300);

        } catch (error) {
            console.error("Search Error:", error);
            alert("Could not connect to server. Check if backend is running on port 5000.");
        } finally {
            setLoading(false);
        }
    };

    const openApplyModal = (course) => {
        setSelectedCourse(course);
        setAppData({
            ...appData,
            desiredCountry: course.country,
            desiredUniversity: course.university,
            desiredCourse: course.subject,
        });
        setShowApplyModal(true);
        setCurrentStep(1);
    };

    const closeApplyModal = () => {
        setShowApplyModal(false);
    };

    const submitApplication = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/apply", {
                courseId: selectedCourse._id,
                ...appData,
                userScores: formData,
            });

            if (res.data.success) {
                alert("Application submitted successfully!");
                closeApplyModal();
            }
        } catch (error) {
            console.error("Submit Error:", error);
            alert("Submission failed.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
            
            {/* SEARCH FORM */}
            <form onSubmit={handleSearch} className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-sm mb-12 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-blue-900">Check Your Eligibility</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">COUNTRY</label>
                        <input name="country" placeholder="UK / Canada / USA" onChange={handleChange} className="input" required />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">DEGREE TYPE</label>
                        <select name="degreeType" onChange={handleChange} className="input">
                            <option value="Undergraduate">Undergraduate (Bachelors)</option>
                            <option value="Postgraduate">Postgraduate (Masters)</option>
                            <option value="Diploma">Diploma / Foundation</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">STUDY GAP (YEARS)</label>
                        <input type="number" name="studyGap" placeholder="0" onChange={handleChange} className="input" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">SSC GPA</label>
                        <input type="number" step="0.01" name="sscGpa" placeholder="e.g. 5.00" onChange={handleChange} className="input" required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-500 ml-1">HSC GPA</label>
                        <input type="number" step="0.01" name="hscGpa" placeholder="e.g. 5.00" onChange={handleChange} className="input" required />
                    </div>

                    <div className="pt-5">
                        <button type="submit" className="w-full bg-blue-600 text-white h-[48px] font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                            {loading ? "SEARCHING..." : "FIND COURSES"}
                        </button>
                    </div>
                </div>
            </form>

            {/* RESULT SECTION */}
            <div ref={resultRef} className="max-w-5xl mx-auto space-y-4 min-h-[200px]">
                {courses.length > 0 ? (
                    <>
                        <p className="text-sm font-semibold text-gray-500 mb-2">{courses.length} Courses Found</p>
                        {courses.map((course) => (
                            <div key={course._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:border-blue-300 transition-colors">
                                <div className="text-center md:text-left">
                                    <h3 className="text-xl font-bold text-blue-900">{course.university}</h3>
                                    <p className="text-blue-600 font-semibold">{course.subject}</p>
                                    <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">{course.degreeType}</span>
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">Country: {course.country}</span>
                                    </div>
                                </div>
                                <button onClick={() => openApplyModal(course)} className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition w-full md:w-auto">
                                    APPLY NOW
                                </button>
                            </div>
                        ))}
                    </>
                ) : (
                    !loading && (
                        <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 font-medium">No courses found matching your criteria.</p>
                            <p className="text-sm text-gray-400">Try adjusting your GPA or Study Gap.</p>
                        </div>
                    )
                )}
            </div>

            {/* APPLY MODAL (Steps 1, 2, 3) */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative">
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="font-bold text-xl text-blue-900">Application Form</h3>
                                <p className="text-sm text-gray-500">Step {currentStep} of 3</p>
                            </div>
                            <button onClick={closeApplyModal} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="p-8">
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h4 className="font-bold text-lg text-gray-700 border-b pb-2">Personal Information</h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div><label className="text-xs font-bold text-gray-500">FULL NAME</label><input name="applicantName" placeholder="Full Name" onChange={handleAppChange} className="input" /></div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500">GENDER</label>
                                            <div className="flex gap-6 mt-3">
                                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value="Male" checked={appData.gender === "Male"} onChange={handleAppChange} /> Male</label>
                                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value="Female" onChange={handleAppChange} /> Female</label>
                                            </div>
                                        </div>
                                        <div><label className="text-xs font-bold text-gray-500">EMAIL</label><input name="email" placeholder="email@example.com" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-500">MOBILE</label><input name="mobile" placeholder="+8801xxxxxxxxx" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-500">DATE OF BIRTH</label><input type="date" name="dob" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-500">CITY/AREA</label><input name="area" placeholder="e.g. Chittagong" onChange={handleAppChange} className="input" /></div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-8">
                                    <h4 className="font-bold text-lg text-gray-700 border-b pb-2">Academic Background</h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div><label className="text-xs font-bold text-gray-400">SSC BOARD</label><input name="sscBoard" placeholder="e.g. Dhaka" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-400">SSC YEAR</label><input name="sscYear" placeholder="2020" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-400">SSC GPA</label><input name="sscGpaVal" placeholder="5.00" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-400">HSC BOARD</label><input name="hscBoard" placeholder="e.g. Dhaka" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-400">HSC YEAR</label><input name="hscYear" placeholder="2022" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-400">HSC GPA</label><input name="hscGpaVal" placeholder="5.00" onChange={handleAppChange} className="input" /></div>
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-700 border-b pb-2 mt-6">Graduation Info (Optional)</h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <input name="ugUni" placeholder="University Name" onChange={handleAppChange} className="input" />
                                        <input name="ugDegree" placeholder="Degree (BSc/BBA)" onChange={handleAppChange} className="input" />
                                        <input name="ugGpa" placeholder="CGPA" onChange={handleAppChange} className="input" />
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
                                        <p className="text-blue-900 font-bold text-lg">You are applying for:</p>
                                        <p className="text-blue-700">{selectedCourse?.subject} at <span className="underline">{selectedCourse?.university}</span></p>
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-700 border-b pb-2">Language Proficiency</h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div><label className="text-xs font-bold text-gray-400">IELTS</label><input name="ielts" placeholder="Score" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-400">PTE</label><input name="pte" placeholder="Score" onChange={handleAppChange} className="input" /></div>
                                        <div><label className="text-xs font-bold text-gray-400">DUOLINGO</label><input name="duolingo" placeholder="Score" onChange={handleAppChange} className="input" /></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t flex justify-between bg-gray-50">
                            {currentStep > 1 ? (
                                <button onClick={() => setCurrentStep(currentStep - 1)} className="px-8 py-3 border-2 border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition">
                                    BACK
                                </button>
                            ) : <div></div>}
                            <button
                                onClick={currentStep === 3 ? submitApplication : () => setCurrentStep(currentStep + 1)}
                                className="bg-blue-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                            >
                                {currentStep === 3 ? "SUBMIT APPLICATION" : "NEXT STEP"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .input {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    outline: none;
                    transition: all 0.2s;
                    font-size: 15px;
                    background-color: #fff;
                }
                .input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
            `}</style>
        </div>
    );
};

export default StudentEligibilityForm;