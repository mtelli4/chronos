import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';


const AbsenceCard = ({ idStudent, idCours, Absence, idList, onRemove }) => {
  // Variable contenant le texte de justification de l'absence
  const [reason, setReason] = useState('');
  // Variable contenant le fichier justificatif d'absence (photo, image, pdf, ..)
  const [file, setFile] = useState(null);

  // Enregistre le fichier dans la variable
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Supprime l'absence justifié de la liste des absences
    // onRemove(idList);

    try {
      // Envoi la justification de l'absence
      axios.post('http://localhost:5000/add_justification', {"reason": reason, "studentId": idStudent, "coursId": idCours, 'file': file}, {
        headers: {
          'Content-Type': 'multipart/form-data', // Assurez-vous que le type de contenu est correct
        },
      });


      console.log('Fichier déposé avec succès.');
    } catch (error) {
      console.error('Erreur lors du dépôt du fichier :', error);
    }


  }

  return (
    <div>
      <h2>
        {Absence.retard === null ? 'Absence' : 'Retard'}
      </h2>

      <textarea
        placeholder={Absence.retard === null ? 'Raison de l\'absence' : 'Raison du retard'}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <input type="file" accept=".pdf, .png, .jpeg, .jpg" onChange={handleFileChange} />
      {file && (
        <div>
          <p>Fichier sélectionné : {file.name}</p>
          <p>Type : {file.type}</p>
          <p>Taille : {file.size} octets</p>
        </div>
      )}

      <button onClick={handleSubmit}>Valider</button>
    </div>
  );
};

export default AbsenceCard;
