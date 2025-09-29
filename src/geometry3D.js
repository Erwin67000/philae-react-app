import numpy as np
import pandas as pd

l = 40
h = 40
epaisseur = 19

Longueur = 1000
Largeur = 400
Hauteur = 2300

sqrt2 = np.sqrt(2)
sqrt3 = np.sqrt(3)
alpha = np.arccos(sqrt2 / sqrt3)

delta_x = np.tan(alpha) * l / 2
delta_hx = h * np.tan(alpha)
R3 = np.sqrt(h**2 + (l/2)**2)
Rot3 = np.arccos((l/2)/R3) if R3 > 0 else 0
Rot5 = np.arccos((-l/2)/R3) if R3 > 0 else 0
Rot3_y = R3 * np.cos(Rot3 - np.pi/4)
Rot3_z = R3 * np.sin(Rot3 - np.pi/4)

arete1 = pd.DataFrame({
    'Point0': [0, 0, 0],
    'Point1': [delta_hx, delta_hx, delta_hx],
    'Point2': [delta_x, delta_x, -delta_x],
    'Point3': [Rot3_y, Rot3_y, Rot3_z],
    'Point4': [delta_x, -delta_x, delta_x],
    'Point5': [Rot3_y, Rot3_z, Rot3_y],
    'Point6': [Longueur, 0, 0],
    'Point7': [Longueur - delta_hx, delta_hx, delta_hx],
    'Point8': [Longueur - delta_x, delta_x, -delta_x],
    'Point9': [Longueur - Rot3_y, Rot3_y, Rot3_z],
    'Point10': [Longueur - delta_x, -delta_x, delta_x],
    'Point11': [Longueur - Rot3_y, Rot3_z, Rot3_y],
}, index=['X', 'Y', 'Z'])

# Define arete2 DataFrame
arete2 = pd.DataFrame({
    'Point0': [0, 0, 0],
    'Point1': [delta_hx, delta_hx, delta_hx],
    'Point2': [-delta_x, delta_x, delta_x],
    'Point3': [Rot3_z, Rot3_y, Rot3_y],
    'Point4': [delta_x, delta_x, -delta_x],
    'Point5': [Rot3_y, Rot3_y, Rot3_z],
    'Point6': [0, Largeur, 0],
    'Point7': [delta_hx, Largeur - delta_hx, delta_hx],
    'Point8': [-delta_x, Largeur - delta_x, delta_x],
    'Point9': [Rot3_z, Largeur - Rot3_y, Rot3_y],
    'Point10': [delta_x, Largeur - delta_x, -delta_x],
    'Point11': [Rot3_y, Largeur - Rot3_y, Rot3_z]
}, index=['X', 'Y', 'Z'])

# Define arete3 DataFrame
arete3 = pd.DataFrame({
    'Point0': [0, 0, 0],
    'Point1': [delta_hx, delta_hx, delta_hx],
    'Point2': [delta_x, -delta_x, delta_x],
    'Point3': [Rot3_y, Rot3_z, Rot3_y],
    'Point4': [-delta_x, delta_x, delta_x],
    'Point5': [Rot3_z, Rot3_y, Rot3_y],
    'Point6': [0, 0, Hauteur],
    'Point7': [delta_hx, delta_hx, Hauteur - delta_hx],
    'Point8': [delta_x, -delta_x, Hauteur - delta_x],
    'Point9': [Rot3_y, Rot3_z, Hauteur - Rot3_y],
    'Point10': [-delta_x, delta_x, Hauteur - delta_x],
    'Point11': [Rot3_z, Rot3_y, Hauteur - Rot3_y],
}, index=['X', 'Y', 'Z'])

# Create derived arêtes
arete1_2 = arete1.copy()
arete1_2.loc['Y'] = Largeur - arete1.loc['Y']
arete1_3 = arete1.copy()
arete1_3.loc['Z'] = Hauteur - arete1.loc['Z']
arete1_4 = arete1_2.copy()
arete1_4.loc['Z'] = Hauteur - arete1_2.loc['Z']

arete2_1 = arete2.copy()
arete2_1.loc['X'] = Longueur - arete2.loc['X']
arete2_3 = arete2.copy()
arete2_3.loc['Z'] = Hauteur - arete2.loc['Z']
arete2_4 = arete2_1.copy()
arete2_4.loc['Z'] = Hauteur - arete2_1.loc['Z']

arete3_1 = arete3.copy()
arete3_1.loc['X'] = Longueur - arete3.loc['X']
arete3_2 = arete3.copy()
arete3_2.loc['Y'] = Largeur - arete3.loc['Y']
arete3_4 = arete3_1.copy()
arete3_4.loc['Y'] = Largeur - arete3_1.loc['Y']

# Create panneau_fond DataFrame
panneau_fond = pd.DataFrame({
    'B1': arete1_2['Point5'] + pd.Series([-epaisseur, epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'B2': arete1_2['Point11'] + pd.Series([epaisseur, epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'B3': arete1_4['Point11'] + pd.Series([epaisseur, epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'B4': arete1_4['Point5'] + pd.Series([-epaisseur, epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'H1': arete1_2['Point5'],
    'H2': arete1_2['Point11'],
    'H3': arete1_4['Point11'],
    'H4': arete1_4['Point5']
}, index=['X', 'Y', 'Z'])

# Create joue1 DataFrame
joue1 = pd.DataFrame({
    'B1': arete2['Point3'] + pd.Series([-epaisseur, -epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'B2': arete2['Point9'] + pd.Series([-epaisseur, epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'B3': arete2_3['Point9'] + pd.Series([-epaisseur, epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'B4': arete2_3['Point3'] + pd.Series([-epaisseur, -epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'H1': arete2['Point3'],
    'H2': arete2['Point9'],
    'H3': arete2_3['Point9'],
    'H4': arete2_3['Point3']
}, index=['X', 'Y', 'Z'])

# Create joue2 DataFrame (mirrored or adjusted version of joue1 for variety)
joue2 = pd.DataFrame({
    'B1': arete2_1['Point3'] + pd.Series([epaisseur, -epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'B2': arete2_1['Point9'] + pd.Series([epaisseur, epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'B3': arete2_4['Point9'] + pd.Series([epaisseur, epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'B4': arete2_4['Point3'] + pd.Series([epaisseur, -epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'H1': arete2_1['Point3'],
    'H2': arete2_1['Point9'],
    'H3': arete2_4['Point9'],
    'H4': arete2_4['Point3']
}, index=['X', 'Y', 'Z'])

socle = pd.DataFrame({
    'B1': arete1['Point3'] + pd.Series([-epaisseur, -epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'B2': arete1['Point9'] + pd.Series([epaisseur, -epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'B3': arete1_2['Point9'] + pd.Series([epaisseur, epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'B4': arete1_2['Point3'] + pd.Series([-epaisseur, epaisseur, -epaisseur], index=['X', 'Y', 'Z']),
    'H1': arete1['Point3'],
    'H2': arete1['Point9'],
    'H3': arete1_2['Point9'],
    'H4': arete1_2['Point3']
}, index=['X', 'Y', 'Z'])


dessus = pd.DataFrame({
    'B1': arete1_3['Point3'] + pd.Series([-epaisseur, -epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'B2': arete1_3['Point9'] + pd.Series([epaisseur, -epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'B3': arete1_4['Point9'] + pd.Series([epaisseur, epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'B4': arete1_4['Point3'] + pd.Series([-epaisseur, epaisseur, epaisseur], index=['X', 'Y', 'Z']),
    'H1': arete1_3['Point3'],
    'H2': arete1_3['Point9'],
    'H3': arete1_4['Point9'],
    'H4': arete1_4['Point3']
}, index=['X', 'Y', 'Z'])



# Define face indices renamed to face_arete
face_arete = [
    [0, 2, 8], [8, 6, 0],
    [6, 10, 4], [4, 0, 6],
    [1, 3, 9], [9, 7, 1],
    [7, 11, 5], [5, 1, 7],
    [2, 3, 8], [8, 9, 3],
    [4, 5, 10], [10, 11, 5]
]

# Define face_panneau
face_panneau = [
    [0, 1, 2],
    [2, 3, 0],
    [4, 5, 6],
    [6, 7, 4]
]
