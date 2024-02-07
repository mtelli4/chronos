import React from 'react'
import { CallCardCont } from './callCardsElements.js'
import { useState } from 'react'
import { Field } from 'formik'


const CallCard = ({student, number, absentList, setAbsentList}) => {
    // Etat local pour enregistrer si l'élève est absent ou présent
    const [isAbsent, setIsAbsent] = useState(false);

    function handleClick() {
        // Changement d'absent à présent ou inversement
        setIsAbsent((prevIsAbsent) => {
            // Changement d'absent à présent ou inversement
            console.log(prevIsAbsent);
      
            console.log('%cSTATE', 'color:blue; font-size:30px;');
            console.log(!prevIsAbsent); // Utilisez !prevIsAbsent pour obtenir le nouvel état






            // Ajoute ou retire l'étudiant de la liste des absents selon si prevIsAbsent est true ou false
            if (!prevIsAbsent) { // Si absent
                console.log("%cADD", "color:green; font-size:30px;");
                console.log(absentList);
                // Ajoute l'id de l'étudiant dans la liste
                setAbsentList(absentList => [...absentList, student.id]);
                console.log(absentList);

            } else { // Si présent
                console.log("%cREM", "color:red; font-size:30px;");
                console.log(absentList);
                // Retire l'id de l'étudiant de la liste
                const tmp = absentList.filter((studentId) => studentId !== student.id);
                setAbsentList(tmp);
                console.log(absentList);
            }
        return !prevIsAbsent; // Retourne le nouvel état
        });
    }

    return (
        <CallCardCont onClick={() => handleClick()}>
            <p>{student.prenom}</p>
            <p>{student.nom}</p>
            <p>{isAbsent?"Absent":"Présent"}</p>
        </CallCardCont>
    )
}

export default CallCard