import React, { useEffect, useState, useRef } from 'react';
import Plot from 'react-plotly.js';
import { computeGeometry } from './geometry3D';
import { SketchPicker } from 'react-color';

// Définis les faces pour les arêtes et panneaux (déplacées dans le composant)
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
  // State pour les dimensions
  const [Longueur, setLongueur] = useState(600);
  const [Largeur, setLargeur] = useState(400);
  const [Hauteur, setHauteur] = useState(800);
  const minValue = 200;
  const maxValue = 2500;

  // Compute geometry
  const {
    arete1, arete2, arete3, arete1_2, arete1_3, arete1_4,
    arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4,
    panneau_fond, joue1, joue2, socle, dessus
  } = computeGeometry(Longueur, Largeur, Hauteur);

  // Prépare les traces pour Plotly (simplifié)
  const arêtes = [arete1, arete2, arete3, arete1_2, arete1_3, arete1_4, arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4];
  // Nouvelle palette Philae
  const PALETTE = [
    'rgb(191, 124, 43)', // beige
    'rgb(89, 58, 40)',   // bleu vif
    'rgb(38, 20, 14)',   // bleu foncé
    'rgb(165, 115, 86)',
    'rgb(140, 90, 72)'      // bleu très foncé
  ];
  // Couleur des arêtes (bleu foncé)
  const arêteColors = 'rgb(89, 58, 40)';
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
  const [projectionType, setProjectionType] = useState('perspective');
  useEffect(() => {
    if (plotRef.current && plotRef.current.figure) {
      const camera = {
        up: { x: 0, y: 0, z: 1 },
        center: { x: 0, y: 0, z: 0 },
        eye: { x: 200, y: -800, z: 200 },
        projection: { type: projectionType }
      };
      window.Plotly.relayout(plotRef.current.figure, { 'scene.camera': camera });
    }
  }, [projectionType]);

  // State pour la couleur des panneaux
  // Couleur par défaut des panneaux (beige)
  const [panelcolor, setPanelcolor] = useState({ r: 251, g: 228, b: 214, a: 1 });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const panels = [
    { data: panneau_fond, name: 'Fond', color: panelcolor },
    { data: joue1, name: 'Joue1', color: panelcolor },
    { data: joue2, name: 'Joue2', color: panelcolor },
    { data: socle, name: 'Socle', color: panelcolor },
    { data: dessus, name: 'Dessus', color: panelcolor }
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

  // Bouton pour générer devis et plan
  const handleGenerate = async () => {
    const email = window.prompt('Entrez votre email pour recevoir le devis et le plan :');
    if (!email) return;

    const params = {
      email,
      longueur: Longueur,
      largeur: Largeur,
      hauteur: Hauteur,
      epaisseur: 19 // Valeur par défaut, à rendre dynamique si besoin
    };

    try {
      const response = await fetch('http://localhost:5000/api/generate-devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      alert('Erreur lors de la génération du devis.');
    }
  };

  return (
    <div style={{ width: '100vw', height: '60vh' }}>
      <div style={{ padding: '20px' }}>
        <label style={{ marginRight: 16 }}>
          Longueur: <input type="range" min={400} max={1600} value={Longueur} onChange={e => setLongueur(Number(e.target.value))} />
          <span style={{ marginLeft: 8 }}>{Longueur}</span>
        </label>
        <label style={{ marginRight: 16 }}>
          Largeur: <input type="range" min={150} max={800} value={Largeur} onChange={e => setLargeur(Number(e.target.value))} />
          <span style={{ marginLeft: 8 }}>{Largeur}</span>
        </label>
        <label style={{ marginRight: 16 }}>
          Hauteur: <input type="range" min={400} max={2500} value={Hauteur} onChange={e => setHauteur(Number(e.target.value))} />
          <span style={{ marginLeft: 8 }}>{Hauteur}</span>
        </label>
        <label style={{ marginRight: 16, position: 'relative' }}>
          Couleur panneau:
          <div
            style={{
              display: 'inline-block',
              width: 40,
              height: 40,
              background: `rgba(${panelcolor.r},${panelcolor.g},${panelcolor.b},${panelcolor.a})`,
              border: '1px solid #888',
              borderRadius: 4,
              cursor: 'pointer',
              verticalAlign: 'middle',
              marginLeft: 8
            }}
            onClick={() => setShowColorPicker(true)}
          />
        </label>
        {showColorPicker && (
          <div
            style={{
              position: 'fixed',
              zIndex: 9999,
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.0)'
            }}
            onClick={() => setShowColorPicker(false)}
          >
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 70,
                transform: 'translateX(-50%)',
                zIndex: 10000
              }}
              onClick={e => e.stopPropagation()}
            >
              <SketchPicker
                color={panelcolor}
                onChange={color => setPanelcolor(color.rgb)}
                presetColors={[
                'rgb(191, 124, 43)', // beige
                'rgb(89, 58, 40)',   // bleu vif
                'rgb(38, 20, 14)',   // bleu foncé
                'rgb(165, 115, 86)',
                'rgb(140, 90, 72)'      // bleu très foncé
                ]}
              />
            </div>
          </div>
        )}
        <label style={{ marginRight: 16 }}>
          Projection:
          <select value={projectionType} onChange={e => setProjectionType(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="perspective">Perspective</option>
            <option value="orthographic">Orthographic</option>
          </select>
        </label>
      </div>
      <div style={{ width: '90vw', height: '60vw', position: 'relative', zIndex: 1 }}>
        <Plot
          data={[...arêteTraces, ...panelTraces]}
          layout={{
            scene: {
              xaxis: { range: [-30, Longueur + 30], title: 'X' },
              yaxis: { range: [-30, Largeur + 30], title: 'Y' },
              zaxis: { range: [-30, Hauteur + 30], title: 'Z' },
              aspectmode: 'data',
              camera: {
                up: { x: 0, y: 0, z: 1 },
                eye: { x: 1, y: -4.5, z: 0.15 },
                projection: { type: projectionType }
              }
            },
            showlegend: false,
            autosize: true,
            margin: { l: 20, r: 20, t: 0, b: 0 }
          }}
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true, displayModeBar: false }}
          ref={plotRef}
        />
        <button
          style={{
            position: 'absolute',
            left: '90%',
            top: '30%',
            zIndex: 10,
            padding: '26px 34px',
            background: 'rgba(0, 0, 0, 1)',
            color: 'rgba(0, 0, 0, 1)',
            border: 'none',
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 1)'
          }}
          onClick={handleGenerate}
        >
          Générer devis & plan
        </button>
      </div>
    </div>
  );
};

export default Configurateur;