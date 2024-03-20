import "../css/styleCall.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChronosJustifyCard from '../components/ChronosJustifyCard'

const PageJustify = () => {

    const [absences, setAbsencesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/eleve_absence/9/0"); // 9 correspond à l'id de l'utilisateur et 0 pour signifier que l'on cherche les absences non justifiées
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
    <>
        <div className='justifyCont'>
            <div className='callTitle'>
                <h3>Mes absences et retards</h3>
            </div>

            <div className='justifyCardCont'>
                {absences.map((absence) => (
                    <ChronosJustifyCard key={absence.id} userId={absence.eleveId} idList={absence.id} Absence={absence} onRemove={handleRemoveAbsence} />
                ))}

                {/* Test pour voir la grille dans tt sa beauté */}
                {/* {absences.map((absence) => (
                    <ChronosJustifyCard key={absence.id} userId={absence.eleveId} idList={absence.id} Absence={absence} onRemove={handleRemoveAbsence} />
                ))}

                {absences.map((absence) => (
                    <ChronosJustifyCard key={absence.id} userId={absence.eleveId} idList={absence.id} Absence={absence} onRemove={handleRemoveAbsence} />
                ))} */}
            </div>
        </div>
        
    </>
  )
}

export default PageJustify
