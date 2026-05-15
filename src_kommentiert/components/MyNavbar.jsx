// ============================================================================
// MyNavbar.jsx
// ----------------------------------------------------------------------------
// Globale Navigationsleiste der Anwendung (Aufgabe 1.1.b.a + 1.1.b.b).
//
// Enthält:
//   - Logo + Seitentitel "CO2 Footprint"   (Navbar.Brand)
//   - Toggle-Button für mobile Ansicht     (responsives Design, Aufgabe 1.1.b.d)
//   - Einklappbares Menü mit lokalen Links (Home, Kontakt, Über uns)
//
// Verwendet react-bootstrap, um responsives Verhalten ohne eigenen
// CSS-Aufwand zu erhalten.
// ============================================================================

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

// Logo wird als Bild-Asset eingebunden und von Vite gebündelt.
import Logo from "./image-logo.png";

const MyNavbar = () => {
  return (
    // expand="lg"        -> Menü wird erst ab "Large"-Breakpoint (>=992px) horizontal
    //                       ausgeklappt; darunter erscheint der Toggle-Button.
    // bg="success"       -> grüner Bootstrap-Hintergrund (thematisch zu Klima/CO2)
    // variant="dark"     -> helle Schriftfarbe für gute Lesbarkeit auf dunklem Grün
    // className="shadow" -> dezenter Schatten unter der Navbar
    <Navbar expand="lg" bg="success" variant="dark" className="shadow">
      {/* Container sorgt für die Standard-Bootstrap-Innenabstände,
          damit die Inhalte nicht am Bildschirmrand kleben. */}
      <Container>
        {/* Logo + Seitenname; Klick führt zur Startseite (#home). */}
        <Navbar.Brand href="#home">
          <img
            src={Logo}
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
          CO2 Footprint
        </Navbar.Brand>

        {/* Hamburger-Button: erscheint nur auf schmalen Bildschirmen
            (Tablet/Smartphone) und klappt das Menü ein/aus. */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar.Collapse: Bereich, der auf kleinen Geräten unter dem
            Toggle-Button verschwindet. */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* me-auto = margin-end: auto -> drückt die Links nach links. */}
          <Nav className="me-auto">
            <Nav.Link href="#home"    className="text-white">Home</Nav.Link>
            <Nav.Link href="#kontakt" className="text-white">Kontakt</Nav.Link>
            <Nav.Link href="#about"   className="text-white">Über uns</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
