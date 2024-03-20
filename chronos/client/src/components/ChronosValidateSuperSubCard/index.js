import React, { useState } from 'react';
import axios from 'axios';
import { ChronosValidateSuperSubCardButtons, ChronosValidateSuperSubCardCont, ChronosValidateSuperSubCardReason, ChronosValidateSuperSubCardSubTitle, ChronosValidateSuperSubCardTitle } from './ChronosValidateSuperSubCardElements'
import ChronosButton from '../ChronosButton';
import { setFormattedDate } from '../../js/utils';

const ChronosValidateSuperSubCard = ({ absence }) => {

    function getFileName() {
    const filePathList = absence.justificatif.split('/');
    return filePathList[filePathList.length - 1];
  }

  const handleSubmit = () => {
    try {
      // Envoi la justification de l'absence
      axios.post('http://localhost:5000/set_valid_absence', {"absId": absence.id});
      window.location.reload();
      // Rend l'absence validé invisible
    //   setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour déclencher le téléchargement du fichier
  const downloadFile = async () => {
    try {
        console.log("rtyuiop");
      const response = await axios.get(`http://localhost:5000/uploads/${absence.justificatif}`, {
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
      console.log("rty");
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
    }
  };
  return (
    <ChronosValidateSuperSubCardCont>
        <ChronosValidateSuperSubCardTitle>
            {absence.retard === null ? 'absence' : `Retard de ${absence.retard} minutes`}
        </ChronosValidateSuperSubCardTitle>

        <ChronosValidateSuperSubCardSubTitle>
            {absence.Cour.libelle + " - " + setFormattedDate(absence.Cour.debutCours)}
        </ChronosValidateSuperSubCardSubTitle>

        <ChronosValidateSuperSubCardReason>
            Raison : {absence.message !== "" ? absence.message : ""}
        </ChronosValidateSuperSubCardReason>

        <ChronosValidateSuperSubCardButtons>
            {(absence.justificatif !== "") && (
                <ChronosButton font="0.75rem" width="50%" action={() => downloadFile()} text="Télecharger le justificatif" />
            )}
            <ChronosButton font="0.75rem" width="50%" type="submit" action={handleSubmit} text="Valider l'absence" />
        </ChronosValidateSuperSubCardButtons>

    </ChronosValidateSuperSubCardCont>
  )
}

export default ChronosValidateSuperSubCard
