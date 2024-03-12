import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import des sous composants
import AbsValidCard from '../AbsValidCard';


const StudentAbsList = ({ Student }) => {
    const [absences, setAbsencesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement
    const [isVisible, setIsVisible] = useState(true); // État pour suivre la visibilité de la liste des absences

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/eleve_absence/${Student.id}`);
                // Rempli la liste des absences de l'étudiant
                setAbsencesList(response.data);
                console.log("ABSENCES");
                console.log(response);
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

    // Rend visible ou invisible la liste des absences de l'élève
    const handleClick = () => {
        setIsVisible(!isVisible);
    };
    
    return (
        <div>
            <div onClick={handleClick}>
                <h1>{`${Student.nom} ${Student.prenom}`}</h1>
            </div>
            {isVisible && <div>
                {absences.map((absence) => ( 
                    (!absence.envoye && <AbsValidCard key={absence.id} Absence={absence} />)
                ))}
            </div>}
        </div>
    );
};

export default StudentAbsList;
