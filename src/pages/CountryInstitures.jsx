import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CountryInstitutes = () => {

    const { slug } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:5000/api/country/${slug}`)
            .then(res => res.json())
            .then(data => setCountry(data));

    }, []);

    if (!country) return <div>Loading...</div>;

    return (

        <div>

            <h2>{country.country} Institutes</h2>

            {country.institutes.map(inst => (

                <Link
                    key={inst.slug}
                    to={`/institute/${country.slug}/${inst.slug}`}
                >

                    {inst.name}

                </Link>

            ))}

        </div>

    );

};

export default CountryInstitutes;