import React from "react";
import { Navbar, Nav, Container, NavbarToggle } from "react-bootstrap";
import Logo from "./image-logo.png";

const MyNavbar = () => {
  return (
    <Navbar bg="success" variant="dark" className="shadow">
      <Container> {/*Inhalte der Navbar zentriert und nicht am Rand klebend*/}
        <Navbar.Brand href="#home">
            <img src={Logo} alt="Logo" height="30" className="d-inline-block align-top"/>
            CO2 Footprint
        </Navbar.Brand> {/*Logo oder Name der Seite*/}
        <NavbarToggle aria-controls="basic-navbar-nav" />{/*für responive design, Butto für mobile Ansicht*/}
        <Navbar.Collapse id="basic-navbar-nav"> {/*alles was im ausklappbaren Menü verschwinden soll*/}
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-white">Home</Nav.Link>
            <Nav.Link href="#kontakt" className="text-white">Kontakt</Nav.Link>
            <Nav.Link href="#about" className="text-white">Über uns</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar; {/*diese Datei ist fertig und darf von anderen Komponenten benutzt werden*/}
