import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import axios from 'axios';

// Import des sous composants
import ProfessorPresencesList from '../components/ProfessorPresencesList';


const ProfessorList = () => {
  const [formations, setFormationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requête récupérant les élèves des formations assigné à la secrétaire
        const response = await axios.get(`http://localhost:5000/secretary_professor/${authService.getUserId()}`);
        // Rempli la liste avec les élèves et leurs formations
        setFormationsList(response.data.Secretaire.Formations);
        console.log(response.data);
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
    <div>
      <h1>Présences professeurs</h1>
      {formations.map((formation) => (
        formation.ModuleCours.length > 0 && formation.ModuleCours.map((module) => (
          module.Professeurs.length > 0 && module.Professeurs.map((professor) => (
            <ProfessorPresencesList key={professor.id} Professor={professor}  />
            // console.log(professor)
          ))
        ))
      ))}
    </div>
  );
};

export default ProfessorList;
