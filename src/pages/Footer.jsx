import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa"
import {FaX} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-light border-top shadow-sm" style={{paddingBottom:"4rem",paddingTop:"4rem"}}>
            <Container>
                <Row className="text-center text-md-start align-items-center">
                    <Col md={6}>
                        <p className="mb-1 fw-semibold" style={{ color: "#EE7A32" }}>
                            Afghan Proverbs © {new Date().getFullYear()}
                        </p>
                        <small className="text-muted">
                            Sharing the wisdom of generations — Dari | Pashto | English
                        </small>
                    </Col>
                    <Col md={6} className="text-md-end mt-3 mt-md-0">
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a
                                href="https://github.com/kubra-Islami"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark fs-5"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/kubra-islami/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark fs-5"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href="https://x.com/IslamiKubra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-dark fs-5"
                            >
                                <FaX />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
