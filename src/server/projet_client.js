const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { create } = require('docx'); // Nécessite npm install docx
const { Packer } = require('docx');
const jsPDF = require('jspdf'); // Nécessite npm install jspdf -- pour PDF simple (alternative à reportlab)
const nodemailer = require('nodemailer'); // Nécessite npm install nodemailer -- pour e-mail
const DxfParser = require('dxf-parser'); // Nécessite npm install dxf-parser -- mais pour écrire DXF, on peut utiliser une lib comme dxf-writer
// Note : Pour générer DXF en JS, il n'y a pas de lib parfaite comme ezdxf. On utilise une implémentation simple ici.
// Pour une lib complète, envisagez 'dxf' ou implémentez manuellement.

function storeClientData(clientData) {
  clientData.clientId = uuidv4();
  try {
    let existingData = [];
    if (fs.existsSync('clients.json')) {
      const fileContent = fs.readFileSync('clients.json', 'utf8');
      existingData = fileContent.split('\n').filter(line => line.trim()).map(line => JSON.parse(line));
    }
    existingData.push(clientData);
    fs.writeFileSync('clients.json', existingData.map(data => JSON.stringify(data)).join('\n') + '\n');
    return { clientId: clientData.clientId, success: true };
  } catch (error) {
    console.error(`Erreur lors du stockage des données : ${error}`);
    return { clientId: null, success: false };
  }
}

function generateDevis(clientData) {
  const { Document, Paragraph, HeadingLevel } = create();
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: 'Devis - Philae Design',
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph(`Client ID: ${clientData.clientId}`),
        new Paragraph(`Email: ${clientData.email}`),
        new Paragraph(`Dimensions: Longueur=${clientData.longueur}mm, Largeur=${clientData.largeur}mm, Hauteur=${clientData.hauteur}mm`),
        new Paragraph(`Épaisseur: ${clientData.epaisseur}mm`),
        new Paragraph('Prix estimatif: À calculer selon vos tarifs'), // Personnaliser
      ],
    }],
  });

  const filename = `devis_${clientData.clientId}.docx`;
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(filename, buffer);
  }).catch(err => console.error(err));
  return filename;
}

function generateDxfPlan(clientData) {
  // Implémentation simple de DXF (entête + rectangle basique). Pour plus complexe, utiliser une lib dédiée.
  const dxfContent = `
0
SECTION
2
HEADER
9
$ACADVER
1
AC1009
0
ENDSEC
0
SECTION
2
ENTITIES
0
POLYLINE
8
0
66
1
10
0.0
20
0.0
30
0.0
70
1
0
VERTEX
8
0
10
0.0
20
0.0
0
VERTEX
8
0
10
${clientData.longueur}
20
0.0
0
VERTEX
8
0
10
${clientData.longueur}
20
${clientData.largeur}
0
VERTEX
8
0
10
0.0
20
${clientData.largeur}
0
SEQEND
0
ENDSEC
0
EOF
`;
  const filename = `plan_${clientData.clientId}.dxf`;
  fs.writeFileSync(filename, dxfContent);
  return filename;
}

function convertDxfToPdf(dxfFile, clientData) {
  const pdf = new jsPDF();
  pdf.setFontSize(12);
  pdf.text(`Plan - Philae Design (Client ID: ${clientData.clientId})`, 20, 20);
  pdf.text(`Dimensions: ${clientData.longueur}x${clientData.largeur}x${clientData.hauteur}mm`, 20, 30);
  pdf.text(`Épaisseur: ${clientData.epaisseur}mm`, 20, 40);
  pdf.text(`Email: ${clientData.email}`, 20, 50);
  // Ajouter la géométrie : pour simplicité, on dessine un rectangle (à étendre pour parser DXF si besoin)
  pdf.rect(20, 60, clientData.longueur / 10, clientData.largeur / 10); // Échelle réduite
  const pdfFile = dxfFile.replace('.dxf', '.pdf');
  pdf.save(pdfFile);
  return pdfFile;
}

async function sendEmail(clientData, attachments) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Remplacer par votre serveur SMTP
    port: 587,
    secure: false,
    auth: {
      user: 'votre_email@example.com', // Remplacer
      pass: 'votre_mot_de_passe', // Remplacer
    },
  });

  let mailOptions = {
    from: 'votre_email@example.com',
    to: clientData.email,
    subject: 'Votre configuration - Philae Design',
    text: `
Bonjour,

Merci pour votre configuration sur Philae Design.
Voici vos paramètres :
- Longueur : ${clientData.longueur}mm
- Largeur : ${clientData.largeur}mm
- Hauteur : ${clientData.hauteur}mm
- Épaisseur : ${clientData.epaisseur}mm

Vous trouverez en pièce jointe votre devis et votre plan.
Cordialement,
L'équipe Philae Design
    `,
    attachments: attachments.map(file => ({ path: file })),
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'e-mail : ${error}`);
    return false;
  }
}

async function processClientProject(params) {
  const { clientId, success } = storeClientData(params);
  if (!success) {
    return "Erreur lors du stockage des données.";
  }

  const devisFile = generateDevis(params);
  const dxfFile = generateDxfPlan(params);
  const pdfFile = convertDxfToPdf(dxfFile, params);

  const emailSuccess = await sendEmail(params, [devisFile, pdfFile]);
  if (emailSuccess) {
    return `Documents générés et e-mail envoyé à ${params.email}.`;
  } else {
    return "Erreur lors de l'envoi de l'e-mail.";
  }
}

// Exemple d'utilisation
if (require.main === module) {
  const sampleParams = {
    email: 'client@example.com',
    longueur: 1000,
    largeur: 400,
    hauteur: 2300,
    epaisseur: 19
  };
  processClientProject(sampleParams).then(result => console.log(result));
}

module.exports = { processClientProject };