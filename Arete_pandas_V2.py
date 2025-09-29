import numpy as np
import pandas as pd
import plotly.graph_objects as go
from dash import Dash, dcc, html, Input, Output, State, callback_context as ctx
import webbrowser

# Ne pas toucher de ICI
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

# Jusqu'à ICI, attention @GROK, je t'ai à l'oeil


#Début de la possibilité pour GROK de faire des modifications !




# Create figure

fig = go.Figure()

# Plot all 12 arêtes with only faces
arêtes = [arete1, arete2, arete3, arete1_2, arete1_3, arete1_4, arete2_1, arete2_3, arete2_4, arete3_1, arete3_2, arete3_4]
arête_traces = []
for idx, arête in enumerate(arêtes):
    points = arête.T.values  # 12x3 array of [x, y, z]
    i, j, k = zip(*face_arete)  # Unzip indices for Mesh3d
    trace = go.Mesh3d(x=points[:, 0], y=points[:, 1], z=points[:, 2],
                      i=i, j=j, k=k,
                      color='rgba(150, 110, 51, 1)', opacity=1, flatshading=True, name=f'arête_{idx}', visible=True)
    arête_traces.append(trace)
for trace in arête_traces:
    fig.add_trace(trace)  # Add traces directly without rows/cols

# Grouped plot for panels (panneau_fond, joue1, joue2, socle, dessus) with only faces
panels = [('panneau_fond', 'blue', 'Fond'),
          ('joue1', 'blue', 'Joue1'),
          ('joue2', 'blue', 'Joue2'),
          ('socle', 'blue', 'Socle'),
          ('dessus', 'blue', 'Dessus')]
panel_traces = {}
for panel_name, color, panel_label in panels:
    panel_df = globals()[panel_name]  # Dynamically access the DataFrame
    panel_points = panel_df[['B1', 'B2', 'B3', 'B4', 'H1', 'H2', 'H3', 'H4']].T.values  # 8x3 array of [x, y, z]
    i, j, k = zip(*face_panneau)  # Unzip indices for Mesh3d
    trace = go.Mesh3d(x=panel_points[:, 0], y=panel_points[:, 1], z=panel_points[:, 2],
                      i=i, j=j, k=k,
                      color=color, opacity=0.7, flatshading=True, name=f'face_{panel_label}', visible=True)
    panel_traces[panel_label] = trace
for trace in panel_traces.values():
    fig.add_trace(trace)

# Layout
max_dim = max(Longueur, Largeur, Hauteur) * 1.1
fig.update_layout(
    scene=dict(
        xaxis_title='X', yaxis_title='Y', zaxis_title='Z',
        aspectmode='cube',
        xaxis=dict(range=[-30, max_dim]),
        yaxis=dict(range=[-30, max_dim]),
        zaxis=dict(range=[-30, max_dim]),
        camera=dict(up=dict(x=0, y=0, z=1), eye=dict(x=1.25, y=1.25, z=1.25))
    ),
    showlegend=True
)

# Dash app with hide/show buttons
app = Dash(__name__)
app.layout = html.Div([
    html.Div([
        html.Button('Toggle Arêtes', id='btn-arêtes', n_clicks=0),
        html.Button('Toggle Fond', id='btn-fond', n_clicks=0),
        html.Button('Toggle Joue1', id='btn-joue1', n_clicks=0),
        html.Button('Toggle Joue2', id='btn-joue2', n_clicks=0),
        html.Button('Toggle Socle', id='btn-socle', n_clicks=0),
        html.Button('Toggle Dessus', id='btn-dessus', n_clicks=0),
    ], style={'padding': '10px'}),
    dcc.Graph(figure=fig, id='3d-graph', style={'height': '90vh', 'width': '100vw'})
])

# Callback to toggle visibility
@app.callback(
    Output('3d-graph', 'figure'),
    [Input('btn-arêtes', 'n_clicks'),
     Input('btn-fond', 'n_clicks'),
     Input('btn-joue1', 'n_clicks'),
     Input('btn-joue2', 'n_clicks'),
     Input('btn-socle', 'n_clicks'),
     Input('btn-dessus', 'n_clicks')],
    [State('3d-graph', 'figure')]
)
def toggle_visibility(n_arêtes, n_fond, n_joue1, n_joue2, n_socle, n_dessus, figure):
    if not ctx.triggered:
        return figure
    button_id = ctx.triggered[0]['prop_id'].split('.')[0]

    fig = go.Figure(figure)
    if button_id == 'btn-arêtes':
        visible = not all(trace.visible for trace in fig.data[:len(arête_traces)])
        for trace in fig.data[:len(arête_traces)]:
            trace.visible = visible
    elif button_id == 'btn-fond':
        for trace in fig.data:
            if trace.name == 'face_Fond':
                trace.visible = not trace.visible
    elif button_id == 'btn-joue1':
        for trace in fig.data:
            if trace.name == 'face_Joue1':
                trace.visible = not trace.visible
    elif button_id == 'btn-joue2':
        for trace in fig.data:
            if trace.name == 'face_Joue2':
                trace.visible = not trace.visible
    elif button_id == 'btn-socle':
        for trace in fig.data:
            if trace.name == 'face_Socle':
                trace.visible = not trace.visible
    elif button_id == 'btn-dessus':
        for trace in fig.data:
            if trace.name == 'face_Dessus':
                trace.visible = not trace.visible

    return fig

webbrowser.open('http://127.0.0.1:8051')
app.run_server(debug=True, port=8051)