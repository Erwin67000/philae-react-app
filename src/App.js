import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Accueil from './pages/Accueil';
import Configurateur from './pages/Configurateur';
import Boutique from './pages/Boutique';
import Contact from './pages/Contact';
import projet_client from './pages/projet_client';

function App() {
    return (
        <Router>
            <Header /> {/* Header identique partout ! */}
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/configurateur" element={<Configurateur />} />
                <Route path="/boutique" element={<Boutique />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <footer style={{ textAlign: 'center', padding: '10px' }}>
                <p>&copy; 2025 Philae Design</p>
            </footer>
        </Router>
    );
}

export default App;