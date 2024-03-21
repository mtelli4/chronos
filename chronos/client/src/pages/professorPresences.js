import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import axios from 'axios';

// Import des sous composants
import ProfessorPresencesList from '../components/ProfessorPresencesList';


const ProfessorList = () => {
  const [professors, setProfessorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requête récupérant les élèves des formations assigné à la secrétaire
        const response = await axios.get(`http://localhost:5000/secretary_professor/${authService.getUserId()}`);
        // Rempli la liste avec les élèves et leurs formations
        setProfessorsList(response.data);
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
      <h1>Professeurs</h1>
      {professors.map((professor) => (
        <ProfessorPresencesList key={professor.id} Professor={professor}  />
      ))}
    </div>
  );
};

export default ProfessorList;
