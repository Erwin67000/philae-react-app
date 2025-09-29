const l = 40;
const h = 40;
const epaisseur = 19;

const Longueur = 1000;
const Largeur = 400;
const Hauteur = 2300;

const sqrt2 = Math.sqrt(2);
const sqrt3 = Math.sqrt(3);
const alpha = Math.acos(sqrt2 / sqrt3);

const delta_x = Math.tan(alpha) * l / 2;
const delta_hx = h * Math.tan(alpha);
const R3 = Math.sqrt(h ** 2 + (l / 2) ** 2);
const Rot3 = R3 > 0 ? Math.acos((l / 2) / R3) : 0;
const Rot3_y = R3 * Math.cos(Rot3 - Math.PI / 4);
const Rot3_z = R3 * Math.sin(Rot3 - Math.PI / 4);

const arete1 = {
  Point0: [0, 0, 0],
  Point1: [delta_hx, delta_hx, delta_hx],
  Point2: [delta_x, delta_x, -delta_x],
  Point3: [Rot3_y, Rot3_y, Rot3_z],
  Point4: [delta_x, -delta_x, delta_x],
  Point5: [Rot3_y, Rot3_z, Rot3_y],
  Point6: [Longueur, 0, 0],
  Point7: [Longueur - delta_hx, delta_hx, delta_hx],
  Point8: [Longueur - delta_x, delta_x, -delta_x],
  Point9: [Longueur - Rot3_y, Rot3_y, Rot3_z],
  Point10: [Longueur - delta_x, -delta_x, delta_x],
  Point11: [Longueur - Rot3_y, Rot3_z, Rot3_y]
};

const arete2 = {
  Point0: [0, 0, 0],
  Point1: [delta_hx, delta_hx, delta_hx],
  Point2: [-delta_x, delta_x, delta_x],
  Point3: [Rot3_z, Rot3_y, Rot3_y],
  Point4: [delta_x, delta_x, -delta_x],
  Point5: [Rot3_y, Rot3_y, Rot3_z],
  Point6: [0, Largeur, 0],
  Point7: [delta_hx, Largeur - delta_hx, delta_hx],
  Point8: [-delta_x, Largeur - delta_x, delta_x],
  Point9: [Rot3_z, Largeur - Rot3_y, Rot3_y],
  Point10: [delta_x, Largeur - delta_x, -delta_x],
  Point11: [Rot3_y, Largeur - Rot3_y, Rot3_z]
};

const arete3 = {
  Point0: [0, 0, 0],
  Point1: [delta_hx, delta_hx, delta_hx],
  Point2: [delta_x, -delta_x, delta_x],
  Point3: [Rot3_y, Rot3_z, Rot3_y],
  Point4: [-delta_x, delta_x, delta_x],
  Point5: [Rot3_z, Rot3_y, Rot3_y],
  Point6: [0, 0, Hauteur],
  Point7: [delta_hx, delta_hx, Hauteur - delta_hx],
  Point8: [delta_x, -delta_x, Hauteur - delta_x],
  Point9: [Rot3_y, Rot3_z, Hauteur - Rot3_y],
  Point10: [-delta_x, delta_x, Hauteur - delta_x],
  Point11: [Rot3_z, Rot3_y, Hauteur - Rot3_y]
};

// Create derived arêtes
function deepCopyArete(arete) {
  // Deep copy all 12 points
  const newArete = {};
  for (let i = 0; i < 12; i++) {
    newArete[`Point${i}`] = [...arete[`Point${i}`]];
  }
  return newArete;
}

// arete1_2: Y transform
const arete1_2 = deepCopyArete(arete1);
for (let i = 0; i < 12; i++) {
  arete1_2[`Point${i}`][1] = Largeur - arete1[`Point${i}`][1];
}

// arete1_3: Z transform
const arete1_3 = deepCopyArete(arete1);
for (let i = 0; i < 12; i++) {
  arete1_3[`Point${i}`][2] = Hauteur - arete1[`Point${i}`][2];
}

// arete1_4: Y then Z transform
const arete1_4 = deepCopyArete(arete1_2);
for (let i = 0; i < 12; i++) {
  arete1_4[`Point${i}`][2] = Hauteur - arete1_2[`Point${i}`][2];
}

// arete2_1: X transform
const arete2_1 = deepCopyArete(arete2);
for (let i = 0; i < 12; i++) {
  arete2_1[`Point${i}`][0] = Longueur - arete2[`Point${i}`][0];
}

// arete2_3: X transform
const arete2_3 = deepCopyArete(arete2);
for (let i = 0; i < 12; i++) {
  arete2_3[`Point${i}`][2] = Hauteur - arete2[`Point${i}`][2];
}

// arete2_4: X transform
const arete2_4 = deepCopyArete(arete2_1);
for (let i = 0; i < 12; i++) {
  arete2_4[`Point${i}`][2] = Hauteur - arete2[`Point${i}`][2];
}

// arete3_1: X transform
const arete3_1 = deepCopyArete(arete3);
for (let i = 0; i < 12; i++) {
  arete3_1[`Point${i}`][0] = Longueur - arete2[`Point${i}`][0];
}

// arete3_2: X transform
const arete3_2 = deepCopyArete(arete3);
for (let i = 0; i < 12; i++) {
  arete3_1[`Point${i}`][1] = Largeur - arete2[`Point${i}`][1];
}

// arete3_4: X transform
const arete3_4 = deepCopyArete(arete3_1);
for (let i = 0; i < 12; i++) {
  arete3_1[`Point${i}`][1] = Largeur - arete2[`Point${i}`][1];
}


const panneau_fond = {
  B1: [arete1_2.Point5[0] - epaisseur, arete1_2.Point5[1] + epaisseur, arete1_2.Point5[2] - epaisseur],
  B2: [arete1_2.Point11[0] + epaisseur, arete1_2.Point11[1] + epaisseur, arete1_2.Point11[2] - epaisseur],
  B3: [arete1_4.Point11[0] + epaisseur, arete1_4.Point11[1] + epaisseur, arete1_4.Point11[2] + epaisseur],
  B4: [arete1_4.Point5[0] - epaisseur, arete1_4.Point5[1] + epaisseur, arete1_4.Point5[2] + epaisseur],
  H1: arete1_2.Point5,
  H2: arete1_2.Point11,
  H3: arete1_4.Point11,
  H4: arete1_4.Point5
};

const joue1 = {
  B1: [arete2.Point3[0] - epaisseur, arete2.Point3[1] - epaisseur, arete2.Point3[2] - epaisseur],
  B2: [arete2.Point9[0] - epaisseur, arete2.Point9[1] + epaisseur, arete2.Point9[2] - epaisseur],
  B3: [arete2_3.Point9[0] - epaisseur, arete2_3.Point9[1] + epaisseur, arete2_3.Point9[2] + epaisseur],
  B4: [arete2_3.Point3[0] - epaisseur, arete2_3.Point3[1] - epaisseur, arete2_3.Point3[2] + epaisseur],
  H1: arete2.Point3,
  H2: arete2.Point9,
  H3: arete2_3.Point9,
  H4: arete2_3.Point3
};

const joue2 = {
  B1: [arete2_1.Point3[0] + epaisseur, arete2_1.Point3[1] - epaisseur, arete2_1.Point3[2] - epaisseur],
  B2: [arete2_1.Point9[0] + epaisseur, arete2_1.Point9[1] + epaisseur, arete2_1.Point9[2] - epaisseur],
  B3: [arete2_4.Point9[0] + epaisseur, arete2_4.Point9[1] + epaisseur, arete2_4.Point9[2] + epaisseur],
  B4: [arete2_4.Point3[0] + epaisseur, arete2_4.Point3[1] - epaisseur, arete2_4.Point3[2] + epaisseur],
  H1: arete2_1.Point3,
  H2: arete2_1.Point9,
  H3: arete2_4.Point9,
  H4: arete2_4.Point3
};

const socle = {
  B1: [arete1.Point3[0] - epaisseur, arete1.Point3[1] - epaisseur, arete1.Point3[2] - epaisseur],
  B2: [arete1.Point9[0] + epaisseur, arete1.Point9[1] - epaisseur, arete1.Point9[2] - epaisseur],
  B3: [arete1_2.Point9[0] + epaisseur, arete1_2.Point9[1] + epaisseur, arete1_2.Point9[2] - epaisseur],
  B4: [arete1_2.Point3[0] - epaisseur, arete1_2.Point3[1] + epaisseur, arete1_2.Point3[2] - epaisseur],
  H1: arete1.Point3,
  H2: arete1.Point9,
  H3: arete1_2.Point9,
  H4: arete1_2.Point3
};

const dessus = {
  B1: [arete1_3.Point3[0] - epaisseur, arete1_3.Point3[1] - epaisseur, arete1_3.Point3[2] + epaisseur],
  B2: [arete1_3.Point9[0] + epaisseur, arete1_3.Point9[1] - epaisseur, arete1_3.Point9[2] + epaisseur],
  B3: [arete1_4.Point9[0] + epaisseur, arete1_4.Point9[1] + epaisseur, arete1_4.Point9[2] + epaisseur],
  B4: [arete1_4.Point3[0] - epaisseur, arete1_4.Point3[1] + epaisseur, arete1_4.Point3[2] + epaisseur],
  H1: arete1_3.Point3,
  H2: arete1_3.Point9,
  H3: arete1_4.Point9,
  H4: arete1_4.Point3
};

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

export { arete1, arete2, arete3, arete1_2, arete1_3, arete1_4, arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4, panneau_fond, joue1, joue2, socle, dessus, face_arete, face_panneau, Longueur, Largeur, Hauteur };