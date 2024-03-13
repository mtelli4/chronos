import React, { useState } from 'react';
import axios from 'axios';


const AbsJustifCard = ({ userId, Absence, idList, onRemove }) => {
  // Variable contenant le texte de justification de l'absence
  const [reason, setReason] = useState('');
  // Variable contenant le fichier justificatif d'absence (photo, image, pdf, ..)
  const [file, setFile] = useState(null);

  // Enregistre le fichier dans la variable
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!(file !== null) && reason === "") {
      console.log("Veuillez remplir tous les champs")
    } else {
      if (file !== null) { // Si il y a fichier
        try {
          axios.post('http://localhost:5000/add_justification_file', {"reason": reason, "absId": Absence.id, "userId": userId, "file": file}, {
            headers: {
              'Content-Type': 'multipart/form-data', // Assurez-vous que le type de contenu est correct
            },
          });
          console.log("fichier déposé");
        } catch (error) {
          console.log(error);
        }
      } 
      else { // S'il n'y a pas de fichier
        try {
          // Envoi la justification de l'absence
          axios.post('http://localhost:5000/add_justification', {"reason": reason, "absId": Absence.id})
          console.log("raison envoyé");
        } catch (error) {
          console.log(error);
        }
      }
      // Supprime l'absence justifié de la liste des absences
      onRemove(idList);
    }
  }

  return (
      <div>
        <h2>
          <p>
          {Absence.retard === null ? 'Absence' : `Retard de ${Absence.retard} minutes`}
          </p>
          <p>
          {Absence.Cour.libelle}
          </p>
          <p>
          {Absence.Cour.debutCours}
          </p>
        </h2>

        <textarea
          placeholder={Absence.retard === null ? 'Raison de l\'absence' : 'Raison du retard'}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
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

export default AbsJustifCard;
