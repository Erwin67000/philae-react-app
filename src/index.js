import './styles.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'docx'; // Nécessite npm install docx
import { Packer } from 'docx';
import jsPDF from 'jspdf'; // Nécessite npm install jspdf -- pour PDF simple (alternative à reportlab)
import nodemailer from 'nodemailer'; // Nécessite npm install nodemailer -- pour e-mail
// Note : Pour générer DXF en JS, il n'y a pas de lib parfaite comme ezdxf. On utilise une implémentation simple ici.
// Pour une lib complète, envisagez 'dxf' ou implémentez manuellement.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
