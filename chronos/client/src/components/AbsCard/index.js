import React, { useState } from 'react';
const fs = require('fs').promises;


const AbsenceCard = ({ idStudent, idList, onRemove }) => {
  // Variable contenant le texte de justification de l'absence
  const [reason, setReason] = useState('');
  // Variable contenant le fichier justificatif d'absence (photo, image, pdf, ..)
  const [selectedFile, setSelectedFile] = useState(null);

  // Enregistre le fichier dans la variable
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Faire quelque chose avec le fichier sélectionné, comme l'afficher ou l'envoyer au serveur
      console.log('Fichier sélectionné :', file);
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    // Supprime l'absence justifié de la liste des absences
    onRemove(idList);

    // Dépose le fichier
    try {



        // Création du dossier
        const uploadPath = 'uploads/';
        const folderPath = path.join(uploadPath, 'newFolder');
        // Vérifie si le dossier existe, sinon le créé
        fs.mkdir(folderPath, { recursive: true });




        // Dépot du fichier dans le dossier
        axios.post('http://localhost:5000/uploads', formData);
        console.log('Fichier déposé avec succès.');
        setSelectedFile(file);
    } catch (error) {
        console.error('Erreur lors du dépôt du fichier :', error);
    }





    // Envoi la justification de l'absence
    




  }

  return (
    <div>
      <input
        type="text"
        placeholder="Raison de l'absence"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />



      
      <input type="file" accept=".pdf, .png, .jpeg, .jpg" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Fichier sélectionné : {selectedFile.name}</p>
          <p>Type : {selectedFile.type}</p>
          <p>Taille : {selectedFile.size} octets</p>
        </div>
      )}




      <button onClick={handleSubmit}>Valider</button>
    </div>
  );
};

export default AbsenceCard;
