import { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" sticky="top" className="shadow-sm px-2 px-md-4">
        <Container fluid className="d-flex justify-content-between">

          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/logo.jpeg"
              alt="Logo"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
              className="rounded-circle me-2"
            />
            <span className="fw-bold text-primary">Bajrang Krupa</span>
          </Navbar.Brand>

          {/* Hamburger Button */}
          <button
            className="btn btn-outline-primary"
            onClick={handleShow}
          >
            ☰
          </button>

        </Container>
      </Navbar>

      {/* Sidebar */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold text-primary">
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column fs-5">
            <Nav.Link as={Link} to="/" onClick={handleClose}>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about" onClick={handleClose}>
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" onClick={handleClose}>
              Contact
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}