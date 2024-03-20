import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChronosInputFile from '../ChronosInputFile'
import { ChronosJustifyCardTextarea, ChronosJustifyCardButton, ChronosJustifyCardReason, ChronosJustifyCardCont, ChronosJustifyCardSubTitle, ChronosJustifyCardSuperSubTitle, ChronosJustifyCardTextCont, ChronosJustifyCardTitle } from './ChronosJustifyCardElements';
import ToggleButton from '../ToggleButton';
import icon from "../../images/coche.png";
import { setFormattedDate } from '../../js/utils';

const ChronosJustifyCard = ({ Absence, userId, onRemove, idList }) => {
  // Variable contenant le texte de justification de l'absence
  const [reason, setReason] = useState('');
  // Variable contenant le fichier justificatif d'absence (photo, image, pdf, ..)
  const [file, setFile] = useState(null);

  const [isHovered, setIsHovered] = useState(false);

  // Enregistre le fichier dans la variable
  const handleFileChange = (event) => {
    console.log(event)
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

    <ChronosJustifyCardCont onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <ChronosJustifyCardTextCont>
            <ChronosJustifyCardTitle>{Absence.retard === null ? 'Absence' : `Retard de ${Absence.retard} minutes`}</ChronosJustifyCardTitle>
            <ChronosJustifyCardSubTitle>{Absence.Cour.libelle}</ChronosJustifyCardSubTitle>
            <ChronosJustifyCardSuperSubTitle>{setFormattedDate(Absence.Cour.debutCours)}</ChronosJustifyCardSuperSubTitle>
        </ChronosJustifyCardTextCont>
 

        <ChronosJustifyCardReason>
            <ChronosJustifyCardSubTitle>Raison de l'absence</ChronosJustifyCardSubTitle>
            <ChronosJustifyCardTextarea
                placeholder={Absence.retard === null ? 'Raison de l\'absence' : 'Raison du retard'}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
            />
            <ChronosInputFile name="justifyFile" accept=".pdf, .png, .jpeg, .jpg" handleFileChange={handleFileChange} />
        </ChronosJustifyCardReason>

        <ChronosJustifyCardButton isHovered={isHovered}>
            <ToggleButton src={icon} action={handleSubmit} text="valider"/>
        </ChronosJustifyCardButton>

    </ChronosJustifyCardCont>
  )
}

export default ChronosJustifyCard
