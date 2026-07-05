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
                "https://studylinkserver.thinkcodify.site/api/check-eligibility",
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
            const res = await axios.post("https://studylinkserver.thinkcodify.site/api/apply", {
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
                    <h3 className="font-bold text-xl text-blue-900 uppercase tracking-wide">Application Form</h3>
                    <p className="text-sm text-gray-500 font-medium">Step {currentStep} of 3</p>
                </div>
                <button onClick={closeApplyModal} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <div className="p-8">
                {/* STEP 1: PERSONAL INFORMATION */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h4 className="font-bold text-lg text-gray-700 border-b pb-2 uppercase text-sm tracking-wider">Personal Information</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Applicant Name</label><input name="applicantName" placeholder="Full Name" onChange={handleAppChange} className="input w-full p-3 border rounded-lg mt-1" /></div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Gender</label>
                                <div className="flex gap-6 mt-3">
                                    <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="gender" value="Male" checked={appData.gender === "Male"} onChange={handleAppChange} /> Male</label>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="gender" value="Female" onChange={handleAppChange} /> Female</label>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" name="gender" value="Other" onChange={handleAppChange} /> Other</label>
                                </div>
                            </div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Email Address</label><input name="email" type="email" placeholder="email@example.com" onChange={handleAppChange} className="input w-full p-3 border rounded-lg mt-1" /></div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Guardian's Name</label><input name="guardianName" placeholder="Father's/Mother's Name" onChange={handleAppChange} className="input w-full p-3 border rounded-lg mt-1" /></div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Area</label><input name="area" placeholder="e.g. Dhanmondi, Dhaka" onChange={handleAppChange} className="input w-full p-3 border rounded-lg mt-1" /></div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Date of Birth</label><input type="date" name="dob" onChange={handleAppChange} className="input w-full p-3 border rounded-lg mt-1" /></div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Mobile No.</label><input name="mobile" placeholder="+8801xxxxxxxxx" onChange={handleAppChange} className="input w-full p-3 border rounded-lg mt-1" /></div>
                        </div>
                    </div>
                )}

                {/* STEP 2: EDUCATIONAL BACKGROUND */}
                {currentStep === 2 && (
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-lg text-gray-700 border-b pb-2 uppercase text-sm tracking-wider mb-4">Schooling</h4>
                            <div className="grid md:grid-cols-4 gap-4 items-end">
                                <div className="text-xs font-bold text-gray-500 pb-2">LEVEL OF EDUCATION</div>
                                <div className="text-xs font-bold text-gray-500 pb-2">BOARD/GROUP</div>
                                <div className="text-xs font-bold text-gray-500 pb-2">YEAR OF GRADUATION</div>
                                <div className="text-xs font-bold text-gray-500 pb-2">GRADES/CGPA</div>

                                <div className="text-sm font-semibold text-gray-600">O LEVEL / SSC / DAKHIL</div>
                                <input name="sscBoard" placeholder="DHAKA" onChange={handleAppChange} className="input p-2 border rounded" />
                                <input name="sscYear" placeholder="2010" onChange={handleAppChange} className="input p-2 border rounded" />
                                <input name="sscGpaVal" placeholder="4.5" onChange={handleAppChange} className="input p-2 border rounded" />

                                <div className="text-sm font-semibold text-gray-600">A2 LEVEL / HSC / ALIM</div>
                                <input name="hscBoard" placeholder="DHAKA" onChange={handleAppChange} className="input p-2 border rounded" />
                                <input name="hscYear" placeholder="2012" onChange={handleAppChange} className="input p-2 border rounded" />
                                <input name="hscGpaVal" placeholder="4.2" onChange={handleAppChange} className="input p-2 border rounded" />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg text-gray-700 border-b pb-2 uppercase text-sm tracking-wider mb-4">Undergraduation or Postgraduation</h4>
                            <div className="grid md:grid-cols-5 gap-3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">University</label>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Degree</label>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Course</label>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">GPA</label>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Year of Graduation</label>

                                {/* UG Row */}
                                <input name="ugUni" placeholder="University" onChange={handleAppChange} className="input p-2 border rounded text-sm" />
                                <input name="ugDegree" placeholder="B.Sc./BBA" onChange={handleAppChange} className="input p-2 border rounded text-sm" />
                                <input name="ugCourse" placeholder="Subject" onChange={handleAppChange} className="input p-2 border rounded text-sm" />
                                <input name="ugGpa" placeholder="4.00" onChange={handleAppChange} className="input p-2 border rounded text-sm" />
                                <input name="ugYear" placeholder="2016" onChange={handleAppChange} className="input p-2 border rounded text-sm" />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: SEARCH DETAILS & TESTING */}
                {currentStep === 3 && (
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-lg text-gray-700 border-b pb-2 uppercase text-sm tracking-wider mb-4">University Search Details</h4>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1 text-center">Desired Country</label><input name="desiredCountry" placeholder="Ex: Canada" onChange={handleAppChange} className="input w-full p-3 border rounded-lg" /></div>
                                <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1 text-center">Desired University</label><input name="desiredUni" placeholder="Ex: Capilano University" onChange={handleAppChange} className="input w-full p-3 border rounded-lg" /></div>
                                <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1 text-center">Desired Course / Subject</label><input name="desiredCourse" placeholder="Ex: Bachelor of Science" onChange={handleAppChange} className="input w-full p-3 border rounded-lg" /></div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg text-gray-700 border-b pb-2 uppercase text-sm tracking-wider mb-4">Additional Testing Details</h4>
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-bold text-gray-600">IELTS</span>
                                    <input name="ielts" placeholder="IELTS SCORE" onChange={handleAppChange} className="border-none focus:ring-0 text-right uppercase text-sm" />
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-bold text-gray-600">UKVI</span>
                                    <input name="ukvi" placeholder="UKVI SCORE" onChange={handleAppChange} className="border-none focus:ring-0 text-right uppercase text-sm" />
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-bold text-gray-600">PTE</span>
                                    <input name="pte" placeholder="PTE SCORE" onChange={handleAppChange} className="border-none focus:ring-0 text-right uppercase text-sm" />
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-bold text-gray-600">DUOLINGO</span>
                                    <input name="duolingo" placeholder="DUOLINGO SCORE" onChange={handleAppChange} className="border-none focus:ring-0 text-right uppercase text-sm" />
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-bold text-gray-600">SAT</span>
                                    <input name="sat" placeholder="SAT SCORE" onChange={handleAppChange} className="border-none focus:ring-0 text-right uppercase text-sm" />
                                </div>
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-sm font-bold text-gray-600">ACT</span>
                                    <input name="act" placeholder="ACT SCORE" onChange={handleAppChange} className="border-none focus:ring-0 text-right uppercase text-sm" />
                                </div>
                            </div>
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