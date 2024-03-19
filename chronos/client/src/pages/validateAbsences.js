import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import des sous composants
import FormationList from '../components/FormationList';


const ValidationAbsPage = () => {
  const [formations, setFormationsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/secretary_formation/1"); // 1 correspond à l'id de la secrétaire
        // Rempli la liste des étudiants avec tous les étudiants du cours récupérés
        setFormationsList(response.data.Formations);
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
      <h1>Liste des absences</h1>
      {formations.map((formation) => ( 
        <FormationList key={formation.id} Formation={formation} />
      ))}
    </div>
  );
};

export default ValidationAbsPage;
