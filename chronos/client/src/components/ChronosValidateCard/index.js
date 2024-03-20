import React from 'react'
import { ChronosValidateCardCont, ChronosValidateCardFormation, ChronosValidateCardListName } from './ChronosValidateCardElements'
import ChronosValidateSubCard from '../ChronosValidateSubCard';

const ChronosValidateCard = ({ Formation }) => {
    const [show, setShow] = React.useState(false);

  return (
    <ChronosValidateCardCont show={show}>
        <ChronosValidateCardFormation onClick={() => setShow(!show)}>{Formation.libelle}</ChronosValidateCardFormation>
        <ChronosValidateCardListName show={show}>
                {Formation.Eleves
                    .sort((a, b) => a.Utilisateur.nom.localeCompare(b.Utilisateur.nom)) // Trie les élèves par leur nom dans l'ordre alphabétique
                    .map((student) => ( // Groupes de chaque formation
                        <ChronosValidateSubCard key={student.id} Student={student}/>
                ))}
        </ChronosValidateCardListName>
    </ChronosValidateCardCont>
  )
}

export default ChronosValidateCard
