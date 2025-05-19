import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Card, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";
import CustomSpinner from "../components/CustomSpinner.jsx";

const ViewProverb = () => {
    const {id} = useParams();

    const [proverb, setProverb] = useState({});
    const [loading, setLoading] = useState(true);

    const getProverb = () => {
        try {
            axios.get(`/proverbs/${id}`).then((response) => {
                const proverb_data = response.data;
                setProverb(proverb_data);
                setLoading(false);
            })
                .catch((err) => {
                    console.error("Error fetching proverbs:", err);
                    setLoading(true);
                });
        } catch (err) {
            console.error("Error fetching proverbs:", err);
            setLoading(true);
        }
    }

    useEffect(() => {
        getProverb();
    }, []);


    return (<Container className='mt-5 text-center d-flex justify-content-center'>
            {loading ? <CustomSpinner/> :
                <Card className="shadow border-0 p-4 w-100" style={{ maxWidth: "600px" }}>
                    <Card.Body>
                        <h3 className="mb-3 text-center text-primary">{proverb?.textDari}</h3>

                        <div className="mb-3">
                            <strong>Translation (English):</strong>
                            <p className="mb-0 text-muted">{proverb?.translationEn}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Pashto:</strong>
                            <p className="mb-0 text-muted">{proverb?.textPashto}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Meaning:</strong>
                            <p className="mb-0">{proverb?.meaning}</p>
                        </div>

                        <div className="mb-4">
                            <strong>Category:</strong>
                            <span className="badge bg-secondary ms-2">{proverb?.category}</span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Link to="/">
                                <Button variant="outline-primary">← Back</Button>
                            </Link>
                            <Link to={`/edit-proverb/${proverb?.id}`}>
                                <Button variant="primary">Edit</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            }

        </Container>)
}

export default ViewProverb;