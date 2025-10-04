import React from 'react';
import { Link } from 'react-router-dom'; // Pour des liens sans rechargement

const Header = () => {
    return (
    <header className="philae-header" style={{ backgroundSize: 'cover', padding: '40px', textAlign: 'center' }}>
            <img src="/assets/logo.jpg" alt="Logo Philae Design" style={{ height: '80px' }} />
            <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'inline', margin: '0 80px' }}><Link to="/">Accueil</Link></li>
                    <li style={{ display: 'inline', margin: '0 80px' }}><Link to="/configurateur">Configurateur</Link></li>
                    <li style={{ display: 'inline', margin: '0 80px' }}><Link to="/boutique">Boutique</Link></li>
                    <li style={{ display: 'inline', margin: '0 80px' }}><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;