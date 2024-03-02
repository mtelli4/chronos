import React from 'react'
import { CallCardCont } from './callCardsElements.js'
import { useState } from 'react'


const CallCard = ({student, absentList, setAbsentList, setLateList}) => {
    // Etat local pour enregistrer si l'élève est absent ou présent
    const [isAbsent, setIsAbsent] = useState(false);
    // État local pour stocker le temps de retard
    const [lateTime, setLateTime] = useState('');
    // État local pour suivre l'état de modification
    const [isHide, setIsHide] = useState(false);

    // Fonction appelée lors du clic sur le composant CallCardCont
    function handleClick() {
        // Changement d'absent à présent ou inversement
        setIsAbsent(!isAbsent);
        // Affiche ou masque le champ des retards
        setIsHide(!isHide);
        // Ajoute ou retire l'étudiant de la liste des absents selon si prevIsAbsent est true ou false
        if (!isAbsent) { // Si absent
            // Ajoute l'id de l'étudiant dans la liste
            setAbsentList(absentList => [...absentList, student.id]);

        } else { // Si présent
            // Retire l'id de l'étudiant de la liste
            const tmp = absentList.filter((studentId) => studentId !== student.id);
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
              (element) => element.eleveId === student.id
            );
          
            // Si l'élément existe, met à jour le temps de retard
            if (existingElementIndex !== -1) {
              return lateList.map((element) =>
                element.eleveId === student.id ? { ...element, time: event.target.value } : element
              );
            }

            // Si l'élément n'existe pas, ajout d'un nouveau retard
            return [
              ...lateList,
              { eleveId: student.id, time: event.target.value },
            ];
        });
    };

    return (
        <CallCardCont>
            <div onClick={() => handleClick()}>
                <p>{student.prenom}</p>
                <p>{student.nom}</p>
                <p>{isAbsent?"Absent":"Présent"}</p>
            </div>
            <div style={{ display: isHide ? 'none' : 'block' }}>
                <label htmlFor="tempsRetard">Temps de Retard (minutes):</label>
                <input
                    type="number"
                    id="lateTime"
                    name="lateTime"
                    value={lateTime}
                    onChange={handleInputChange}
                />
            </div>
        </CallCardCont>
    )
}

export default CallCard