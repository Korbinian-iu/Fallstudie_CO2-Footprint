// ============================================================================
// main.jsx
// ----------------------------------------------------------------------------
// Einstiegspunkt (Entry Point) der React-Anwendung.
// Wird von Vite über das <script>-Tag in index.html als Erstes geladen
// und mountet die Root-Komponente <App /> in das DOM.
// Hier werden außerdem die globalen Styles geladen.
// ============================================================================

// Bootstrap-Stylesheet global einbinden, damit alle react-bootstrap-Komponenten
// (Navbar, Table, Container, Buttons ...) korrekt dargestellt werden.
import 'bootstrap/dist/css/bootstrap.min.css';

// StrictMode: aktiviert zusätzliche Prüfungen während der Entwicklung
// (z. B. Warnungen bei veralteten APIs). Hat im Produktiv-Build keinen Effekt.
import { StrictMode } from 'react'

// createRoot ist der moderne Mount-Mechanismus seit React 18.
import { createRoot } from 'react-dom/client'

// Eigene globale CSS-Regeln des Projekts.
import './index.css'

// Root-Komponente der gesamten Anwendung.
import App from './App.jsx'

// Sucht das <div id="root"></div> in der index.html und rendert dort die App.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
