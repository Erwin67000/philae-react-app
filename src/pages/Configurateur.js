import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { arete1, arete2, arete3, arete1_2, arete1_3, arete1_4, arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4, panneau_fond, joue1, joue2, socle, dessus, face_arete, face_panneau, Longueur, Largeur, Hauteur } from './geometry3D';

const Configurateur = () => {
  const [dimensions, setDimensions] = useState({ Longueur, Largeur, Hauteur });

  useEffect(() => {
    // Trigger geometry update when dimensions change
    window.location.reload(); // Temporary reload, will be replaced with dynamic update
  }, [dimensions]);

  const max_dim = Math.max(dimensions.Longueur, dimensions.Largeur, dimensions.Hauteur) * 1.1;

  // Prepare data for all arêtes with correct indices
  const arêtes = [arete1, arete2, arete3, arete1_2, arete1_3, arete1_4, arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4];
  const arêteTraces = arêtes.map((arête, idx) => {
    const points = Object.values(arête);
    return {
      type: 'mesh3d',
      x: points.map(p => p[0]),
      y: points.map(p => p[1]),
      z: points.map(p => p[2]),
      i: face_arete.map(([i]) => i),
      j: face_arete.map(([_, j]) => j),
      k: face_arete.map(([_, __, k]) => k),
      color: 'rgba(150, 110, 51, 1)',
      opacity: 1,
      flatshading: true,
      name: `arête_${idx}`,
      visible: true
    };
  });

  // Prepare data for panels
  const panels = [
    { data: panneau_fond, name: 'Fond', color: 'blue' },
    { data: joue1, name: 'Joue1', color: 'blue' },
    { data: joue2, name: 'Joue2', color: 'blue' },
    { data: socle, name: 'Socle', color: 'blue' },
    { data: dessus, name: 'Dessus', color: 'blue' }
  ];
  const panelTraces = panels.map(({ data, name, color }) => {
    const points = Object.values(data);
    return {
      type: 'mesh3d',
      x: points.map(p => p[0]),
      y: points.map(p => p[1]),
      z: points.map(p => p[2]),
      i: face_panneau.map(([i]) => i),
      j: face_panneau.map(([_, j]) => j),
      k: face_panneau.map(([_, __, k]) => k),
      color: color,
      opacity: 0.7,
      flatshading: true,
      name: `face_${name}`,
      visible: true
    };
  });

  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      {/* Controls for dynamic dimensions */}
      <div style={{ padding: '20px', background: '#f0f0f0' }}>
        <label>
          Longueur: <input type="number" value={dimensions.Longueur} onChange={e => setDimensions({ ...dimensions, Longueur: parseInt(e.target.value) })} />
        </label>
        <label style={{ marginLeft: '20px' }}>
          Largeur: <input type="number" value={dimensions.Largeur} onChange={e => setDimensions({ ...dimensions, Largeur: parseInt(e.target.value) })} />
        </label>
        <label style={{ marginLeft: '20px' }}>
          Hauteur: <input type="number" value={dimensions.Hauteur} onChange={e => setDimensions({ ...dimensions, Hauteur: parseInt(e.target.value) })} />
        </label>
      </div>
      {/* Full-screen 3D visualization */}
      <div style={{ width: '100%', height: 'calc(100% - 60px)' }}>
        <Plot
          data={[...arêteTraces, ...panelTraces]}
          layout={{
            scene: {
              xaxis_title: 'X',
              yaxis_title: 'Y',
              zaxis_title: 'Z',
              aspectmode: 'cube',
              xaxis: { range: [-30, max_dim] },
              yaxis: { range: [-30, max_dim] },
              zaxis: { range: [-30, max_dim] },
              camera: { up: { x: 0, y: 0, z: 1 }, eye: { x: 1.25, y: 1.25, z: 1.25 } }
            },
            showlegend: true,
            autosize: true,
            margin: { l: 0, r: 0, t: 0, b: 0 }
          }}
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true }}
        />
      </div>
    </main>
  );
};

export default Configurateur;