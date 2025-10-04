import React from 'react';
import { Link } from 'react-router-dom'; // Pour des liens sans rechargement

const Header = () => {
    return (
    <header className="philae-header" style={{ backgroundSize: 'cover', padding: '20px', textAlign: 'center' }}>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0, fontFamily: 'Outfit, sans-serif' }}>
                    <li style={{ display: 'inline', margin: '0 40px' }}><Link to="/">Accueil</Link></li>
                    <li style={{ display: 'inline', margin: '0 40px' }}><Link to="/configurateur">Configurateur</Link></li>
                    <li style={{ display: 'inline', margin: '0 40px' }}><Link to="/boutique">Boutique</Link></li>
                    <li style={{ display: 'inline', margin: '0 40px' }}><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;