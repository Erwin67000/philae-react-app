import React from 'react';

const Configurateur = () => {
    return (
        <main>
            <h1>Configurateur 3D</h1>
            <p>Personnalisez votre design en temps réel.</p>
            <div id="viewer-3d" style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}>
                {/* Ici, on ajoutera le canvas 3D plus tard avec une lib comme Three.js */}
            </div>
        </main>
    );
};

export default Configurateur;