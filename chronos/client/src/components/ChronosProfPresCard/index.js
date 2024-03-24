import React, { useState, useEffect } from 'react'
import { ChronosValidateCardCont, ChronosValidateCardFormation, ChronosValidateCardListName } from './ChronosProfPresCardElements'
import ChronosValidateSubCard from '../ChronosValidateSubCard';
import axios from 'axios';

const ChronosProfPresCard = ({ Professor }) => {
    const [show, setShow] = React.useState(false);

    const [coursStats, setCoursList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement

    useEffect(() => {
        const fetchData = async () => { 
            try {
                const response = await axios.get(`http://localhost:5000/professor_presences/${Professor.id}`);
                console.log(response.data);
                // Rempli la liste des absences de l'étudiant
                setCoursList(response.data);
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
    <ChronosValidateCardCont show={show}>
        <ChronosValidateCardFormation onClick={() => setShow(!show)}>{`${Professor.Utilisateur.nom} ${Professor.Utilisateur.prenom}`}</ChronosValidateCardFormation>
        <ChronosValidateCardListName show={show}>
                {coursStats.map((cours, index) => ( // Groupes de chaque formation
                        <div>{cours.libelle} ({cours.duree/60} heures)</div>
                ))}
        </ChronosValidateCardListName>
    </ChronosValidateCardCont>
  )
}

export default ChronosProfPresCard
