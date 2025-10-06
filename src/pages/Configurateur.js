import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColladaLoader } from 'three/examples/jsm/Addons.js'; 
import { computeGeometry } from './geometry3D';
import { SketchPicker } from 'react-color';

// Définis les faces pour les arêtes et panneaux
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
  const mountRef = useRef(null);

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

  // State pour la couleur des panneaux
  const [panelcolor, setPanelcolor] = useState({ r: 251, g: 228, b: 214, a: 1 });
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Initialisation de la scène Three.js
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / (window.innerHeight * 0.9), 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth * 0.8, 900);
    mountRef.current.appendChild(renderer.domElement);

    // Création des géométries pour arêtes
    const arêtes = [arete1, arete2, arete3, arete1_2, arete1_3, arete1_4, arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4];
    arêtes.forEach((arête, arêteIdx) => {
      const pointsRef = Object.values(arête);
      face_arete.forEach((triplet) => {
        const [i, j, k] = triplet;
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          pointsRef[i][0], pointsRef[i][1], pointsRef[i][2],
          pointsRef[j][0], pointsRef[j][1], pointsRef[j][2],
          pointsRef[k][0], pointsRef[k][1], pointsRef[k][2]
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const indices = [0, 1, 2];
        geometry.setIndex(indices);
        const material = new THREE.MeshBasicMaterial({ color: 'rgb(89, 58, 40)', side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      });
      line_arete.forEach(([i, j]) => {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          pointsRef[i][0], pointsRef[i][1], pointsRef[i][2],
          pointsRef[j][0], pointsRef[j][1], pointsRef[j][2]
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.LineBasicMaterial({ color: 0x050505, linewidth: 5 });
        const line = new THREE.Line(geometry, material);
        scene.add(line);
      });
    });

    // Création des géométries pour panneaux
    const panels = [
      { data: panneau_fond, name: 'Fond' },
      { data: joue1, name: 'Joue1' },
      { data: joue2, name: 'Joue2' },
      { data: socle, name: 'Socle' },
      { data: dessus, name: 'Dessus' }
    ];
    panels.forEach(({ data, name }) => {
      const points = Object.values(data);
      const geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        points[0][0], points[0][1], points[0][2],
        points[1][0], points[1][1], points[1][2],
        points[2][0], points[2][1], points[2][2],
        points[3][0], points[3][1], points[3][2],
        points[4][0], points[4][1], points[4][2],
        points[5][0], points[5][1], points[5][2],
        points[6][0], points[6][1], points[6][2],
        points[7][0], points[7][1], points[7][2]
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      const indices = [
        0, 1, 2, 2, 3, 0, // Face 1
        4, 5, 6, 6, 7, 4  // Face 2
      ];
      geometry.setIndex(indices);
      const material = new THREE.MeshBasicMaterial({ color: `rgb(${panelcolor.r}, ${panelcolor.g}, ${panelcolor.b})`, transparent: true, opacity: panelcolor.a });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    // Position de la caméra
    camera.position.set(0, -500, 500);
    camera.lookAt(0, 0, 0);

    // Contrôles interactifs
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enableRotate = true;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Nettoyage
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [Longueur, Largeur, Hauteur, panelcolor]);

  // Bouton pour générer devis et plan
  const handleGenerate = async () => {
    const email = window.prompt('Entrez votre email pour recevoir le devis et le plan :');
    if (!email) return;

    const params = {
      email,
      longueur: Longueur,
      largeur: Largeur,
      hauteur: Hauteur,
      epaisseur: 19
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
                  'rgb(191, 124, 43)',
                  'rgb(89, 58, 40)',
                  'rgb(38, 20, 14)',
                  'rgb(165, 115, 86)',
                  'rgb(140, 90, 72)'
                ]}
              />
            </div>
          </div>
        )}
      </div>
      <div ref={mountRef} style={{ width: '80vw', height: '900px', position: 'relative', zIndex: 1, marginLeft: 'auto', marginRight: 'auto' }}>
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
};

export default Configurateur;