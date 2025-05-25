import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const NavbarSection = () => {
    return (
        <Navbar expand="lg" className="bg-light shadow-sm py-3">
            <Container>
                <Navbar.Brand href="/" className="fw-bold logo fs-4">
                    Afghan Proverbs
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-content" />
                <Navbar.Collapse id="navbar-content">
                    <Nav className="ms-auto">
                        <Nav.Link
                            href="/"
                            className="me-3 px-3 py-2 rounded text-dark fw-medium hover-effect"
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/add-proverb"
                            className="px-3 py-2 rounded text-dark fw-medium hover-effect"
                        >
                            Add a Proverb
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarSection;
