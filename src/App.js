import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Accueil from './pages/Accueil';
import Configurateur from './pages/Configurateur';
import Boutique from './pages/Boutique';
import Contact from './pages/Contact';

function AppContent() {
    const location = useLocation();
    const hideFooter = location.pathname === '/configurateur';
    return (
        <>
            <Header /> {/* Header identique partout ! */}
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/configurateur" element={<Configurateur />} />
                <Route path="/boutique" element={<Boutique />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            {!hideFooter && (
                <footer style={{ textAlign: 'center', padding: '10px' }}>
                    <p>&copy; 2025 Philae Design</p>
                </footer>
            )}
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;