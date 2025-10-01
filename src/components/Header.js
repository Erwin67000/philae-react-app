import React from 'react';
import { Link } from 'react-router-dom'; // Pour des liens sans rechargement

const Header = () => {
    return (
        <header style={{ backgroundImage: "url('/assets/background.png')", backgroundSize: 'cover', padding: '40px', textAlign: 'center' }}>
              background: rgb(251, 228, 214) !important;
                color: rgb(12, 9, 80) !important;
            <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'inline', margin: '0 15px' }}><Link to="/">Accueil</Link></li>
                    <li style={{ display: 'inline', margin: '0 15px' }}><Link to="/configurateur">Configurateur</Link></li>
                    <li style={{ display: 'inline', margin: '0 15px' }}><Link to="/boutique">Boutique</Link></li>
                    <li style={{ display: 'inline', margin: '0 15px' }}><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;