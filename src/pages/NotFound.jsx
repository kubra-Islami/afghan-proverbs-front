import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import NotFoundImg from "../img/page-not-found.webp"; // ✅ Import image properly

const NotFound = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-center text-center text-white"
            style={{
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${NotFoundImg}) no-repeat center center`,
                backgroundSize: "cover",
                height: "100dvh",
                margin: 0,
                padding: 0,
                overflow: "hidden",
            }}
        >
        <Container>
            <Row className="justify-content-center">
                <Col md={9} lg={7}>
                    <div className='text-white'>
                        <h2 className="display-1 fw-bold">404</h2>
                        <h3 className="mb-4">Sorry, something went wrong</h3>
                        <Link to="/">
                            <Button variant="primary">Go to Homepage</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default NotFound;
