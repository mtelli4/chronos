import React, { useState } from 'react';
import axios from 'axios';


const AbsValidCard = ({ Absence }) => {
  // Variable d'état pour enregistrer si l'absence a été validé ou non
  const [validate, setValidate] = useState(false);

  function getFileName() {
    const filePathList = Absence.justificatif.split('/');
    return filePathList[filePathList.length - 1];
  }

  const handleSubmit = () => {
    try {
      // Envoi la justification de l'absence
      axios.post('http://localhost:5000/set_valid_absence', {"idAbsence": Absence.id})
      // Met l'absence en validé
      setValidate(true);
    } catch (error) {
      console.log(error);
    }
  };

  return !Absence.envoye && (
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

        <p>
          {Absence.reason !== "" ? Absence.reason : ""}
        </p>

        {(Absence.justificatif !== "") && (
          <a href={Absence.justificatif} download={getFileName()}>
            Télécharger le justificatif
          </a>
        )}

        {!validate && (
          <button onClick={handleSubmit}>Valider l'absence</button>
        )}
      </div>
  );
};

export default AbsValidCard;
