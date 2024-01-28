import React from 'react'
import { CallCardCont } from './callCardsElements.js'
import { useState } from 'react'
import { Field } from 'formik';


const CallCard = ({student, number}) => {
    const [isAbsent, setIsAbsent] = useState(true);
    function handleClick() {
        setIsAbsent(!isAbsent);
    }

    return (
        <CallCardCont onClick={() => handleClick()}>
            <p>{student.prenom}</p>
            <p>{student.nom}</p>
            <p>{isAbsent?"Absent":"Présent"}</p>
            <Field id="inputStudent" name={"student"+number} value={isAbsent?2:1} style={{display:"none"}} />
        </CallCardCont>
    )
}

export default CallCard