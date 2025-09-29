import React from 'react';
import { Link } from 'react-router-dom'; // Pour des liens sans rechargement

const Header = () => {
    return (
        <header style={{ backgroundImage: "url('/assets/background.png')", backgroundSize: 'cover', padding: '20px', textAlign: 'center' }}>
            <img src="/assets/logo.jpg" alt="Logo Philae Design" style={{ height: '50px' }} />
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