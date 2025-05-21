import React, {useEffect, useState} from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import CustomSpinner from "../components/CustomSpinner.jsx";
import "./home.css";

const Home = () => {
    const [proverbs, setProverbs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllProverbs = () => {
        try {
            axios.get("/proverbs").then((response) => {
                const proverbs = response.data;
                setProverbs(proverbs);
                console.log(loading);
                setLoading(false);
            })
                .catch((err) => {
                    console.error("Error fetching proverbs:", err);
                    setLoading(true);
                });
        } catch (err) {
            console.error("Error fetching proverbs:", err);
            console.log(loading);
            setLoading(true);
        }
    }

    useEffect(() => {
        getAllProverbs();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">📜 List of Afghan Proverbs</h2>
            <p className="text-muted text-center">
                Explore timeless Afghan wisdom in Dari, Pashto, and English.
            </p>

            {loading ? (
                <CustomSpinner/>
            ) : (
                <div className="d-flex flex-wrap gap-4 justify-content-between " style={{marginBottom: "6rem"}}>
                    {proverbs.map((proverb, index) => (
                        <div key={proverb.id} className="card shadow-sm card-proverb">
                            <div className="card-body">
                                <h5 className="card-title mb-2">
                                    #{index + 1} - {proverb.translationEn}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Category: <span className="badge bg-info text-dark">{proverb.category}</span>
                                </h6>

                                <div className="mb-2">
                                    <strong>Dari:</strong> <span>{proverb.textDari}</span>
                                </div>
                                <div className="mb-2">
                                    <strong>Pashto:</strong> <span>{proverb.textPashto}</span>
                                </div>
                                <div className="mb-5">
                                    <strong>Meaning:</strong>
                                    <p className="card-text">{proverb.meaning}</p>
                                </div>

                                <Link to={`/view-proverb/${proverb.id}`}
                                      className="btn btn-outline-primary btn-sm position-absolute mb-3 bottom-0">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>

    )
}

export default Home;