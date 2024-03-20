import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import axios from 'axios';

// Import des sous composants
import AbsJustifCard from '../components/AbsJustifCard';


const JustifyAbsPage = () => {
  const [absences, setAbsencesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/eleve_absence/${authService.getUserId()}/0`); 
        // Rempli la liste des absences
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

  // Fonction qui supprime une absence validé de la liste des absences
  const handleRemoveAbsence = (id) => {
    // Supprime l'absence
    const updatedAbsences = absences.filter((absence) => absence.id !== id);
    // Met à jour la liste
    setAbsencesList(updatedAbsences);
  };

  return (
    <div>
      <h1>Liste des absences</h1>
      {absences.map((absence) => (
        <AbsJustifCard key={absence.id} userId={9} Absence={absence} idList={absence.id} onRemove={handleRemoveAbsence} />
      ))}
    </div>
  );
};

export default JustifyAbsPage;
