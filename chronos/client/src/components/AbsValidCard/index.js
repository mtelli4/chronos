import React, { useState } from 'react';
import axios from 'axios';


const AbsValidCard = ({ Absence }) => {
  const [isVisible, setIsVisible] = useState(true); // État pour suivre la visibilité de la liste des absences

  function getFileName() {
    const filePathList = Absence.justificatif.split('/');
    return filePathList[filePathList.length - 1];
  }

  const handleSubmit = () => {
    try {
      // Envoi la justification de l'absence
      axios.post('http://localhost:5000/set_valid_absence', {"absId": Absence.id})
      // Rend l'absence validé invisible
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour déclencher le téléchargement du fichier
  const downloadFile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/uploads/${Absence.justificatif}`, {
        responseType: 'blob', // Spécifie que la réponse est un blob (fichier binaire)
      });

      // Crée un lien temporaire et télécharge le fichier
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', getFileName()); // Nom du fichier à télécharger
      document.body.appendChild(link);
      link.click();

      // Nettoie l'URL temporaire
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
    }
  };

  return isVisible && (
      <div>
        <h5>
          <p>
            {Absence.retard === null ? 'Absence' : `Retard de ${Absence.retard} minutes`}
          </p>
          <p>
            {Absence.Cour.libelle}
          </p>
          <p>
            {Absence.Cour.debutCours}
          </p>
        </h5>

        <p>
          Raison : {Absence.message !== "" ? Absence.message : ""}
        </p>
        
        <p>{Absence.justificatif === "" ? "" : "Justificatif :"}</p>

        {(Absence.justificatif !== "") && (
          <button onClick={downloadFile}>Télécharger le justificatif</button>
        )}

        {(
          <button onClick={handleSubmit}>Valider l'absence</button>
        )}
      </div>
  );
};

export default AbsValidCard;
