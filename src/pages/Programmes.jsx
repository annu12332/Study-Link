import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Programmes = () => {

    const { countrySlug, instSlug } = useParams();

    const [programmes, setProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`https://studylinkserver.thinkcodify.site/api/programmes/${countrySlug}/${instSlug}`)
            .then(res => res.json())
            .then(data => {
                setProgrammes(data);
                setLoading(false);
            })
            .catch(err => console.error(err));

    }, [countrySlug, instSlug]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center text-2xl font-bold">
                Loading Programmes...
            </div>
        );
    }

    return (
        <section className="py-16 bg-slate-50 min-h-screen">

            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-4xl font-black text-center mb-12 uppercase">
                    Available Programmes
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    {programmes.map((prog) => (

                        <Link
                            key={prog._id}
                            to={`/programme/${countrySlug}/${instSlug}/${prog._id}`}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
                        >

                            <h3 className="text-xl font-bold mb-2">
                                {prog.name}
                            </h3>

                            <p className="text-gray-500">
                                Duration: {prog.duration}
                            </p>

                            <div className="mt-4 text-blue-600 font-semibold">
                                View Requirements →
                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default Programmes;