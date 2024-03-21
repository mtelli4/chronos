import React from 'react'
import { StudentNoteCardTitleMoy, StudentNoteCardTitleCont, StudentNoteCardTitle, StudentNoteCardCont, StudentNoteCardContent, StudentNoteCardContentSection, StudentNoteCardContentSectionNote, StudentNoteCardContentSectionTitle } from './StudentNoteCardElemets'

const StudentNoteCard= ({ num, notes, module }) => {


  return (
    <StudentNoteCardCont num={num}>
        <StudentNoteCardTitleCont>
            <StudentNoteCardTitle>
                {module.libelle}
            </StudentNoteCardTitle>

            <StudentNoteCardTitleMoy>
                ( {module.additionalValue} )
            </StudentNoteCardTitleMoy>
        </StudentNoteCardTitleCont> 

        <StudentNoteCardContent>
            {notes.evaluations.map((evaluation) => {
                if (notes.hasOwnProperty(module.id) && notes[module.id].hasOwnProperty(evaluation.id)) {
                    return (
                <StudentNoteCardContentSection>
                    <StudentNoteCardContentSectionTitle>
                        {evaluation.libelle} (Moyenne : {evaluation.additionalValue}/{evaluation.noteMaximale}) :
                    </StudentNoteCardContentSectionTitle>

                    <StudentNoteCardContentSectionNote>
                    {notes[module.id][evaluation.id].note != null && <>{notes[module.id][evaluation.id].note}/{evaluation.noteMaximale}</>}
                    {notes[module.id][evaluation.id].hasOwnProperty("statut") && <> {notes[module.id][evaluation.id].statut}</>}
                    </StudentNoteCardContentSectionNote>
                </StudentNoteCardContentSection> )}
            })}
        </StudentNoteCardContent>
    </StudentNoteCardCont>
  )
}

export default StudentNoteCard