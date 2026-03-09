import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProgrammeDetails = () => {
    const { countrySlug, instSlug, programId } = useParams();

    const [programme, setProgramme] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgramme = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/programme/${programId}`
                );
                const data = await res.json();
                setProgramme(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProgramme();
    }, [programId]);

    if (loading)
        return (
            <div className="h-screen flex items-center justify-center text-xl font-bold text-blue-600">
                Loading Programme Details...
            </div>
        );

    if (!programme)
        return (
            <div className="h-screen flex items-center justify-center text-xl font-bold text-red-500">
                Programme Not Found!
            </div>
        );

    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
                <h1 className="text-4xl font-black mb-6 text-slate-900">
                    {programme.name}
                </h1>

                <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                    <p className="mb-2">
                        <span className="font-bold">Duration:</span> {programme.duration}
                    </p>
                    <p className="mb-2">
                        <span className="font-bold">Tuition Fee:</span> {programme.tuition || "N/A"}
                    </p>
                    <p className="mb-2">
                        <span className="font-bold">Degree Type:</span> {programme.degreeType || "N/A"}
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Requirements</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                            <p className="font-bold text-gray-600 mb-1">IELTS</p>
                            <p>{programme.requirements?.ielts || "N/A"}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="font-bold text-gray-600 mb-1">UKVI</p>
                            <p>{programme.requirements?.ukvi || "N/A"}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="font-bold text-gray-600 mb-1">PTE</p>
                            <p>{programme.requirements?.pte || "N/A"}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="font-bold text-gray-600 mb-1">Duolingo</p>
                            <p>{programme.requirements?.duolingo || "N/A"}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="font-bold text-gray-600 mb-1">SSC GPA</p>
                            <p>{programme.requirements?.ssc_gpa || "N/A"}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="font-bold text-gray-600 mb-1">HSC GPA</p>
                            <p>{programme.requirements?.hsc_gpa || "N/A"}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Application Instructions</h2>
                    <p>{programme.applicationInstructions || "Please contact the institute for application details."}</p>
                </div>

                <div className="text-center">
                    <a
                        href={programme.applyLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProgrammeDetails;