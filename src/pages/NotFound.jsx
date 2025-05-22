import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import NotFoundImg from "../img/notFound/page-not-found_prev_ui.png";

const NotFound = () => {
    return (
        <div className="d-flex align-items-center justify-content-center bg-body-secondary"  style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem 1rem",
            backgroundColor: "#f8f9fa",
        }}>
            <Container className="text-center">
                <Row className="justify-content-center align-items-center">
                    <Col md={8} lg={6}>
                        <Image
                            src={NotFoundImg}
                            alt="Page Not Found"
                            fluid
                            className="mb-4"
                            style={{ maxHeight: "300px" }}
                        />
                        <h1 className="display-3 text-danger fw-bold">404</h1>
                        <h4 className="mb-3 text-secondary">Oops! The page you're looking for doesn't exist.</h4>
                        <p className="mb-4 text-muted">It might have been removed, renamed, or never existed in the first place.</p>
                        <Link to="/">
                            <Button variant="outline-primary" size="lg">
                                ⬅ Go Back Home
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NotFound;
