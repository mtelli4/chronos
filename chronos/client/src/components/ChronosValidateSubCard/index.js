import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { ChronosValidateSubCardCont, ChronosValidateSubCardContent, ChronosValidateSubCardName } from './ChronosValidateSubCardElements'
import ChronosValidateSuperSubCard from '../ChronosValidateSuperSubCard';

const ChronosValidateSubCard = ({ Student }) => {
    const [show, setShow] = useState(false);
    console.log(Student)
    const [absences, setAbsencesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/eleve_absence/${Student.id}/1`);
                // Rempli la liste des absences de l'étudiant
                setAbsencesList(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        // Si la requête n'a pas encore été lancée
        if (isLoading) {
          fetchData();
        }
    }, [isLoading]); // Déclenche le useEffect uniquement si isLoading passe à true à nouveau

  return (
    <ChronosValidateSubCardCont>
        <ChronosValidateSubCardName onClick={() => setShow(!show)}>{Student.Utilisateur.nom.toUpperCase()} {Student.Utilisateur.prenom}</ChronosValidateSubCardName>
        <ChronosValidateSubCardContent show={show}>
            {/* contenu */}
            {absences.map((absence) => ( 
                (absence.envoye && 
                    <ChronosValidateSuperSubCard absence={absence} />
                )
            ))}
        </ChronosValidateSubCardContent>
    </ChronosValidateSubCardCont>
  )
}

export default ChronosValidateSubCard
