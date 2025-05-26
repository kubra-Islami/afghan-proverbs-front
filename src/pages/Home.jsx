import React, {useEffect, useState} from "react";
// import axios from "axios";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import CustomSpinner from "../components/CustomSpinner";
import {useOnlineStatus} from "../contexts/OnlineStatusContext";
import api from "../Api/api.jsx";
import "./home.css";


const Home = () => {
    const isOnline = useOnlineStatus(); // ✅ Use context
    const [proverbs, setProverbs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // const getAllProverbs = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:3000/proverbs");
    //         setProverbs(response.data);
    //         setError(false);
    //     } catch (err) {
    //         console.error("Error fetching proverbs:", err);
    //         setError(true);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const getAllProverbs = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/proverbs`);
            setProverbs(response.data);
            setError(false);
        } catch (err) {
            console.error("Error fetching proverbs:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (isOnline) {
            getAllProverbs();
        } else {
            setLoading(false);
        }
    }, [isOnline]);

    return (
        <Container className="mt-5 mb-5">
            {loading ? (
                <CustomSpinner/>
            ) : error ? (
                <p className="text-danger text-center">
                    Failed to load proverbs. Please try again later.
                </p>
            ) : (
                <>
                    {isOnline && (
                        <>
                            <h2 className="text-center fw-bold mb-2">📚 Afghan Proverbs</h2>
                            <p className="text-center text-muted mb-5">
                                Discover meaningful Afghan wisdom in Dari, Pashto, and English.
                            </p>
                        </>
                    )}

                    <Row className="g-4">
                        {proverbs.map((proverb, index) => (
                            <Col key={proverb.id} xs={12} md={6} lg={4}>
                                <Card className="h-100 shadow rounded-4 p-3 proverb-card">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <Badge className="text-capitalize">
                                            {proverb.category}
                                        </Badge>
                                        <span className="text-muted small">#{index + 1}</span>
                                    </div>

                                    <Card.Body className="px-0">
                                        <Card.Title className="fs-5 fw-semibold text-primary mb-3">
                                            {proverb.translationEn}
                                        </Card.Title>

                                        <blockquote className="blockquote mb-3">
                                            <p className="mb-1">
                                                <strong>Dari:</strong> {proverb.textDari}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Pashto:</strong> {proverb.textPashto}
                                            </p>
                                        </blockquote>

                                        <Card.Text
                                            className="fst-italic text-muted mb-4"
                                            style={{fontSize: "0.95rem"}}
                                        >
                                            {proverb.meaning}
                                        </Card.Text>

                                        <div className="d-grid">
                                            <Link to={`/view-proverb/${proverb.id}`}>
                                                <Button
                                                    variant="outline-primary"
                                                    className="btn btn-outline-primary btn-sm position-absolute mb-3 bottom-0"
                                                    size="sm"
                                                >
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
};

export default Home;
