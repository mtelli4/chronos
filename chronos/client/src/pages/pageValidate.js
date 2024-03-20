import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/styleCall.css";
import { authService } from '../services/authService';
import ChronosValidateCard from '../components/ChronosValidateCard';

const PageValidate = () => {
    const [formations, setFormationsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/secretary_formation/${authService.getUserId()}`);
            // Rempli la liste des étudiants avec tous les étudiants du cours récupérés
            setFormationsList(response.data.Secretaire.Formations);
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
    <>
        <div className='justifyCont'>
            <div className='callTitle'>
                <h3>Liste des absences et des retards</h3>
            </div>

            <div className='justifyCardCont'>
                {formations.map((formation) => ( 
                    <ChronosValidateCard key={formation.id} Formation={formation} />
                ))}
            </div>
        </div>
    </>
  )
}

export default PageValidate
