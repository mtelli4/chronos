import React from 'react'
import ChronosInput from '../ChronosInput'
import { ChronosCallCardSubTitle, ChronosCallCardStatus, ChronosCallCardTextCont, ChronosCallCardCont, ChronosCallCardImg, ChronosCallCardText } from './ChronosCallCardElements';
import { useState } from 'react'
import test from "../../images/test.jpg"

const ChronosCallCard = ({ Student, absentList, setAbsentList, setLateList }) => {
    // Etat local pour enregistrer si l'élève est absent ou présent
    const [isAbsent, setIsAbsent] = useState(false);
    // État local pour stocker le temps de retard
    const [lateTime, setLateTime] = useState('');
    // État local pour suivre l'état de modification
    const [isHide, setIsHide] = useState(false);

    // Fonction appelée lors du clic sur l'étudiant
    function handleClick() {
        // Changement d'absent à présent ou inversement
        setIsAbsent(!isAbsent);
        // Affiche ou masque le champ des retards
        setIsHide(!isHide);
        // Ajoute ou retire l'étudiant de la liste des absents selon si prevIsAbsent est true ou false
        if (!isAbsent) { // Si absent
            // Ajoute l'id de l'étudiant dans la liste
            setAbsentList(absentList => [...absentList, Student.id]);

        } else { // Si présent
            // Retire l'id de l'étudiant de la liste
            const tmp = absentList.filter((studentId) => studentId !== Student.id);
            setAbsentList(tmp);
        }
    }

    // Fonction appelée lors du changement du champ numérique
    const handleInputChange = (event) => {
        // Changement d'absent à présent ou inversement
        setLateTime(event.target.value);
        // Ajout/Modification du temps de retard dans la liste    
        setLateList((lateList) => {
            // Vérifie si l'élément existe dans la liste
            const existingElementIndex = lateList.findIndex(
              (element) => element.eleveId === Student.id
            );
          
            // Si l'élément existe, met à jour le temps de retard
            if (existingElementIndex !== -1) {
              return lateList.map((element) =>
                element.eleveId === Student.id ? { ...element, time: event.target.value } : element
              );
            }

            // Si l'élément n'existe pas, ajout d'un nouveau retard
            return [
              ...lateList,
              { eleveId: Student.id, time: event.target.value },
            ];
        });
    };

  return (
    <ChronosCallCardCont isAbsent={isAbsent} onClick={() => handleClick()}>
        <ChronosCallCardImg src={test} />
        <ChronosCallCardTextCont>
        <ChronosCallCardText>
            Idrissi Nidal
        </ChronosCallCardText>

        <ChronosCallCardStatus isAbsent={isAbsent}>
            {isAbsent ? "Absent" : "Présent"}
        </ChronosCallCardStatus>

        <ChronosCallCardSubTitle>Retard (minutes)</ChronosCallCardSubTitle>
        <ChronosInput width={"75px"} height="30px" onChange={(e) => handleInputChange(e)} type={"number"} name="lateTime"  />

        </ChronosCallCardTextCont>
    </ChronosCallCardCont>
  )
}

export default ChronosCallCard
