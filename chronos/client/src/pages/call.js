import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import des sous composants
import CallCard from '../components/CallCard';


// Variables d'initialisation du formik
const validationSchema = Yup.object({});
const initialValues = {};


const CallForm = () => {
  /* ------------------------------------- PRE-CHARGEMENT DE LA PAGE ------------------------------------- */
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [absentList, setAbsentList] = useState([]);
  const [lateList, setLateList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cours/ROLE_USER/1/2024"); // 1 correspond à l'id du cours envoyé
        // Rempli la liste des étudiants avec tous les étudiants du cours récupérés
        setStudentList(
          response.data.Groupes.reduce((accumulator, currentList) => {
            return accumulator.concat(currentList.Eleves);
          }, [])
        );
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

  /* ------------------------------------- CHARGEMENT DE LA PAGE ------------------------------------- */
  // Liste des callcards pour chaque élève
  const callCardList = studentList.map((student, index) => (
    <div>
      <CallCard student={student} absentList={absentList} setAbsentList={setAbsentList} setLateList={setLateList} key={student.id} />
    </div>
  ));

  /* ------------------------------------- ENVOI ------------------------------------- */
  const handleSubmit = (absences, lates) => {
    // Envoyer les données au serveur pour authentification
    axios.post('http://localhost:5000/insert_abs',  { 'absences': absences, 'lates': lates, 'coursId': 1 })
    .then(() => {
      navigate('/'); // Redirige vers la page d'accueil (Calendrier)
    })
    .catch((error) => {
      console.log(error);
    })
  };

  /* ------------------------------------- AFFICHAGE DE LA PAGE ------------------------------------- */
  return (
    <Formik
      onSubmit={() => handleSubmit(absentList, lateList)} // Appel de la fonction handleSubmit avec absentList comme paramètre
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form>
        {callCardList}
        <div>
          <button type="submit">Valider l'appel</button>
        </div>
      </Form>
    </Formik>
  );
};
export default CallForm;
