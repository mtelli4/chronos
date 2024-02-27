import React, { useState } from 'react';

// Import des sous composants
import AbsCard from '../components/AbsCard';


const AbsencePage = () => {
  const [absences, setAbsences] = useState([
    { id: 1, reason: 'Maladie' },
    { id: 2, reason: 'Rendez-vous médical' },
    { id: 3, reason: 'Congé' },
  ]);

  // Fonction qui supprime une absence validé de la liste des absences
  const handleRemoveAbsence = (id) => {
    // Supprime l'absence
    const updatedAbsences = absences.filter((absence) => absence.id !== id);
    // Met à jour la liste
    setAbsences(updatedAbsences);
  };

  return (
    <div>
      <h1>Liste des absences</h1>
      {absences.map((absence) => (
        <AbsCard key={absence.id} id={absence.id} onRemove={handleRemoveAbsence} />
      ))}
    </div>
  );
};

export default AbsencePage;
