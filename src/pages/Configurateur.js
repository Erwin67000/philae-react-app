import React, { useEffect, useState, useRef } from 'react';
import Plot from 'react-plotly.js';
import { computeGeometry } from './geometry3D';


  const face_arete = [
    [0, 2, 8], [8, 6, 0],
    [6, 10, 4], [4, 0, 6],
    [1, 3, 9], [9, 7, 1],
    [7, 11, 5], [5, 1, 7],
    [2, 3, 8], [8, 9, 3],
    [4, 5, 10], [10, 11, 5]
  ];

  const face_panneau = [
    [0, 1, 2],
    [2, 3, 0],
    [4, 5, 6],
    [6, 7, 4]
  ];


const Configurateur = () => {

  // State for dimensions
  // Default value 200, min/max can be changed as needed
  const [Longueur, setLongueur] = useState(600);
  const [Largeur, setLargeur] = useState(400);
  const [Hauteur, setHauteur] = useState(800);
  const minValue = 200; // Set your min value here
  const maxValue = 2500; // Set your max value here

  // Compute geometry based on current state
  const {
    arete1, arete2, arete3, arete1_2, arete1_3, arete1_4,
    arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4,
    panneau_fond, joue1, joue2, socle, dessus
  } = computeGeometry(Longueur, Largeur, Hauteur);

  const max_dim = Math.max(Longueur, Largeur, Hauteur) * 1.1;

  // Prepare data for all arêtes with unique colors and scatter3d for vertices
  const arêtes = [arete1, arete2, arete3, arete1_2, arete1_3, arete1_4, arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4];
  const arêteColors = 'rgba(170, 132, 74, 1)';
  const arêteTraces = arêtes.map((arête, idx) => {
    const points = Object.values(arête);
    return {
      type: 'mesh3d',
      x: points.map(p => p[0]),
      y: points.map(p => p[1]),
      z: points.map(p => p[2]),
      i: face_arete.map(f => f[0]),
      j: face_arete.map(f => f[1]),
      k: face_arete.map(f => f[2]),
      color: arêteColors,
      opacity: 1,
      flatshading: true,
      name: `arête_${idx}`,
      visible: true
    };
  });

    const plotRef = useRef();
    // Set initial camera only once for 'zoom extents' effect
      const [projectionType, setProjectionType] = useState('perspective');
      useEffect(() => {
        if (plotRef.current && plotRef.current !== null) {
          const camera = {
            up: { x: 0, y: 0, z: 1 },
            center: { x: 0, y: 0, z: 0 },
            eye: { x: 200, y: -800, z: 200 },
            projection: { type: projectionType }
          };
          if (plotRef.current && plotRef.current.figure) {
            window.Plotly.relayout(plotRef.current.figure, { 'scene.camera': camera });
          }
        }
      }, [projectionType]);

  // Prepare data for panels
  const panelcolor = 'rgba(86, 111, 165, 1)';
  const panels = [
    { data: panneau_fond, name: 'Fond', color: panelcolor },
    { data: joue1, name: 'Joue1', color:  panelcolor },
    { data: joue2, name: 'Joue2', color:  panelcolor},
    { data: socle, name: 'Socle', color:  panelcolor },
    { data: dessus, name: 'Dessus', color:  panelcolor }
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
      opacity: 1,
      flatshading: true,
      name: `face_${name}`,
      visible: true
    };
  });

  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <div style={{ padding: 16, background: '#f8f8f8', display: 'flex', gap: 16 }}>
        <label>
          Longueur:
          <input
           type="range"
            value={Longueur}
            onChange={e => setLongueur(Math.max(minValue, Math.min(maxValue, Number(e.target.value))))}
            min={minValue}
            max={1400}
            step={10}
            style={{ marginLeft: 8, width: 120 }}
          />
          <span style={{ marginLeft: 8 }}>{Longueur}</span>
        </label>
        <label>
          Largeur:
          <input
            type="range"
            value={Largeur}
            onChange={e => setLargeur(Math.max(minValue, Math.min(maxValue, Number(e.target.value))))}
            min={minValue}
            max={800}
            step={10}
            style={{ marginLeft: 8, width: 120 }}
          />
          <span style={{ marginLeft: 8 }}>{Largeur}</span>
        </label>
        <label>
          Hauteur:
          <input
            type="range"
            value={Hauteur}
            onChange={e => setHauteur(Math.max(minValue, Math.min(maxValue, Number(e.target.value))))}
            min={800}
            max={maxValue}
            step={10}
            style={{ marginLeft: 8, width: 120 }}
          />
          <span style={{ marginLeft: 8 }}>{Hauteur}</span>
        </label>
      </div>
      <div style={{ width: '100%', height: 'calc(100% - 56px)' }}>
        <label style={{ marginRight: 16 }}>
          Projection:
          <select value={projectionType} onChange={e => setProjectionType(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="perspective">Perspective</option>
            <option value="orthographic">Orthographic</option>
          </select>
        </label>
        <Plot
          data={[...arêteTraces, ...panelTraces]}
          layout={{
            scene: {
              xaxis: { range: [-30, Longueur + 30], title: 'X' },
              yaxis: { range: [-30, Largeur + 30], title: 'Y' },
              zaxis: { range: [-30, Hauteur + 30], title: 'Z' },
              aspectmode: 'data', // auto-fit and allow zoom
              camera: {
                up: { x: 0, y: 0, z: 1 },
                center: { x: 0, y: 0, z: 0 },
                eye: { x: 1, y: -2.5, z: .3 },
                projection: { type: projectionType }
              },
            showlegend: false,
            autosize: true,
            margin: { l: 0, r: 0, t: 0, b: 0 }
          }
        }}
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true }}
          // No onRelayout needed, let Plotly handle camera after initial mount
        />
      </div>
    </main>
  );
};

export default Configurateur;