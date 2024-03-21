import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import des sous composants
// import ProfPresCard from '../ProfPresCard';


const ProfessorPresencesList = ({ Professor }) => {
    const [coursStats, setCoursList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement
    const [isVisible, setIsVisible] = useState(true); // État pour suivre la visibilité de la liste des absences

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

    // Rend visible ou invisible la liste des absences de l'élève
    const handleClick = () => {
        setIsVisible(!isVisible);
    };
    
    return (
        <div>
            <div onClick={handleClick}>
                <h3 style={{width: 400, color: '#0000FF'}}>{`${Professor.Utilisateur.nom} ${Professor.Utilisateur.prenom}`}</h3>
            </div>
            {isVisible && <div>
                {coursStats.map((cours) => ( 
                    <p>{cours.libelle} ({cours.duree/60})</p>
                ))}
            </div>}
        </div>
    );
};

export default ProfessorPresencesList;
