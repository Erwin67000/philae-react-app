import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
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

const line_arete = [
  [2, 8], [3, 9], [4, 10], [5, 11],
  [0, 2], [0, 4], [6, 10], [6, 8],
  [1, 3], [1, 5], [7, 11], [7, 9],
  [2, 3], [4, 5], [10, 11], [8, 9]
];

const face_panneau = [
  [0, 1, 2],
  [2, 3, 0],
  [4, 5, 6],
  [6, 7, 4]
];

const Configurateur = () => {
  // Disable scroll on mount, restore on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  // State pour les dimensions
  const [Longueur, setLongueur] = useState(600);
  const [Largeur, setLargeur] = useState(400);
  const [Hauteur, setHauteur] = useState(800);

  // Compute geometry
  const {
    arete1, arete2, arete3, arete1_2, arete1_3, arete1_4,
    arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4,
    panneau_fond, joue1, joue2, socle, dessus
  } = computeGeometry(Longueur, Largeur, Hauteur);

  // Prépare les traces pour Plotly (simplifié)
  const arêtes = [arete1, arete2, arete3, arete1_2, arete1_3, arete1_4, arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4];

  // Pour chaque arête, générer les faces et lignes
  let arêteData = [];
  arêtes.forEach((arête, arêteIdx) => {
    const pointsRef = Object.values(arête);
    // Faces pour cette arête
    face_arete.forEach((triplet, faceIdx) => {
      const [i, j, k] = triplet;
      arêteData.push({
        type: 'mesh3d',
        x: [pointsRef[i][0], pointsRef[j][0], pointsRef[k][0]],
        y: [pointsRef[i][1], pointsRef[j][1], pointsRef[k][1]],
        z: [pointsRef[i][2], pointsRef[j][2], pointsRef[k][2]],
        i: [0],
        j: [1],
        k: [2],
        color: 'rgb(89, 58, 40)',
        opacity: 1,
        flatshading: true,
        name: `face_arete_${arêteIdx}_${faceIdx}`,
        visible: true
      });
    });
    // Lignes pour cette arête
    line_arete.forEach(([i, j], lineIdx) => {
      arêteData.push({
        type: 'scatter3d',
        mode: 'lines',
        x: [pointsRef[i][0], pointsRef[j][0]],
        y: [pointsRef[i][1], pointsRef[j][1]],
        z: [pointsRef[i][2], pointsRef[j][2]],
        line: {
          color: 'rgba(5, 5, 5, 1)',
          width: 5
        },
        name: `ligne_arete_${arêteIdx}_${lineIdx}`,
        showlegend: false
      });
    });
  });

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
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
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
              height: 20,
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
              top: 100,
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
                top: 0,
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
      </div>
      <div style={{ width: '80vw', height: '900px', position: 'relative', zIndex: 1, marginLeft: 'auto', marginRight: 'auto' }}>
        <Plot
          data={[...arêteData, ...panelTraces]}
          layout={{
            scene: {
              xaxis: { range: [-30, Longueur + 30], title: 'X' },
              yaxis: { range: [-30, Largeur + 30], title: 'Y' },
              zaxis: { range: [-30, Hauteur + 30], title: 'Z' },
              aspectmode: 'data',
              camera: {
                up: { x: 0, y: 0, z: 1 },
                eye: { x: 1, y: -4.5, z: 0.15 },
                projection: { type: 'perspective'}
              }
            },
            showlegend: false,
            autosize: true,
            margin: { l: 20, r: 20, t: 20, b: 20 }
          }}
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true, displayModeBar: false }}
        />
        <button
          style={{
            position: 'absolute',
            left: '80%',
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
}



export default Configurateur;