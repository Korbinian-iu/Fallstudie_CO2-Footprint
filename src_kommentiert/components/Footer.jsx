// ============================================================================
// Footer.jsx
// ----------------------------------------------------------------------------
// Footer der Anwendung (Aufgabe 1.1.b.b: "Footer mit rechtlichen Hinweisen").
//
// Aufbau:
//   - "Über uns": kurze Selbstbeschreibung der NGO
//   - "Unterstützen": Links zu Spenden / Mitgliedschaft / Newsletter
//   - "Rechtliches": Pflicht-Links (Impressum, Datenschutz, Cookies)
//   - Copyright-Zeile
//
// Hinweis: Die <a href="...">-Ziele sind aktuell Platzhalter und müssen
// später auf die echten Routen oder externen URLs gesetzt werden.
// ============================================================================

import { Container } from "react-bootstrap";
import React from "react";

const Footer = () => {
  return (
    // site-footer + bg-dark + text-light: dunkler Fußbereich mit heller Schrift
    <footer className="site-footer text-light bg-dark">
      <Container>
        <div className="footer-content">
          {/* Block 1: Kurze "Über uns"-Vorstellung */}
          <div className="footer-section">
            <h3>Über uns</h3>
            <p>
              Wir setzen uns leidenschaftlich für die Umwelt ein. Gemeinsam
              verändern wir die Welt!
            </p>
          </div>

          {/* Block 2: Zwei Link-Spalten ("Unterstützen" und "Rechtliches"),
              die per Flexbox nebeneinander stehen und bei wenig Platz umbrechen. */}
          <div className="d-flex gap-4 flex-wrap mb-4">
            <div className="footer-section2">
              <h5>Unterstützen</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="spenden" className="text-light">Jetzt Spenden</a>
                </li>
                <li>
                  <a href="mitmachen" className="text-light">Mitglied werden</a>
                </li>
                <li>
                  <a href="newsletter" className="text-light">Newsletter abonnieren</a>
                </li>
              </ul>
            </div>

            <div className="footer-section2">
              <h5>Rechtliches</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="impressum.html" className="text-light">Impressum</a>
                </li>
                <li>
                  <a href="datenschutz" className="text-light">Datenschutzerklärung</a>
                </li>
                <li>
                  <a href="cookies" className="text-light">Cookie-Einstellungen</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright-Zeile am unteren Rand des Footers. */}
          <div className="footer-bottom small">
            <p>
              &copy; 2026 Non-Profit Organisation e.V. - Gemeinnützigg anerkannt
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
