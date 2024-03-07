import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import des sous composants
import AbsCard from '../components/AbsCard';


const AbsPage = () => {
  const [absences, setAbsencesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/eleve_absence/9"); // 1 correspond à l'id du cours envoyé
        // Rempli la liste des étudiants avec tous les étudiants du cours récupérés
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
        <AbsCard key={absence.id} idStudent={absence.eleveId} idCours={absence.coursId} Absence={absence} idList={absence.id} onRemove={handleRemoveAbsence} />
      ))}
    </div>
  );
};

export default AbsPage;
