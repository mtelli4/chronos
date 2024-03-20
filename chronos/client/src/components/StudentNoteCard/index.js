import React from 'react'
import { StudentNoteCardTitleMoy, StudentNoteCardTitleCont, StudentNoteCardTitle, StudentNoteCardCont, StudentNoteCardContent, StudentNoteCardContentSection, StudentNoteCardContentSectionNote, StudentNoteCardContentSectionTitle } from './StudentNoteCardElemets'

const StudentNoteCard= () => {


  return (
    <StudentNoteCardCont>
        <StudentNoteCardTitleCont>
            <StudentNoteCardTitle>
                Anglais
            </StudentNoteCardTitle>

            <StudentNoteCardTitleMoy>
                ( ... )
            </StudentNoteCardTitleMoy>
        </StudentNoteCardTitleCont> 

        <StudentNoteCardContent>
            <StudentNoteCardContentSection>
                <StudentNoteCardContentSectionTitle>
                    English Oral (Moyenne : /15):
                </StudentNoteCardContentSectionTitle>

                <StudentNoteCardContentSectionNote>
                    15/15
                </StudentNoteCardContentSectionNote>
            </StudentNoteCardContentSection> 

            <StudentNoteCardContentSection>
                <StudentNoteCardContentSectionTitle>
                    English Oral (Moyenne : /15):
                </StudentNoteCardContentSectionTitle>

                <StudentNoteCardContentSectionNote>
                    15/15
                </StudentNoteCardContentSectionNote>
            </StudentNoteCardContentSection> 
        </StudentNoteCardContent>
    </StudentNoteCardCont>
  )
}

export default StudentNoteCard