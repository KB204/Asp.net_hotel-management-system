import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './StyleNav.css';
import { Link as ScrollLink } from 'react-scroll';

function NavBar() {
    return (
        <>
            <Navbar bg="light" variant="light" expand="lg" className="shadow-lg sticky-top">
                <Container>
                    <Navbar.Brand href="#home">Riad Royale</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link as={ScrollLink} to="homesection" smooth={true} offset={-70} duration={500} className="nav-link mx-3">
                                Home
                            </Nav.Link>
                            <Nav.Link as={ScrollLink} to="servicesSection" smooth={true} offset={-70} duration={500} className="nav-link mx-3">
                                Services
                            </Nav.Link>
                            <Nav.Link href="#pricing" className="mx-3">
                                Pricing
                            </Nav.Link>
                            <Nav.Link href="#pricing" className="mx-3">
                                Book
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
