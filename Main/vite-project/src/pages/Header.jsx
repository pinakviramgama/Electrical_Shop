import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm px-2 px-md-4">
      <Container fluid className="d-flex align-items-center">
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-3">
          <img
            src="/logo.jpeg"
            alt="Logo"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
            className="rounded-circle me-2"
          />
          <span className="fw-bold text-primary">Bajrang Krupa</span>
        </Navbar.Brand>

        {/* Hamburger */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          {/* Nav Links */}
          <Nav className="me-auto flex-grow-1 flex-lg-grow-0">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="#products">Products</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
                      <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* Search always visible */}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}