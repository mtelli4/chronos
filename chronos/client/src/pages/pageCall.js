import React from 'react'
import ChronosCallCard from '../components/ChronosCallCard'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StudentAbsList from '../components/StudentAbsList';
import "../css/styleCall.css";
import ChronosButton from '../components/ChronosButton';

// Variables d'initialisation du formik
const validationSchema = Yup.object({});
const initialValues = {};


const PageCall = () => {

    const navigate = useNavigate();
    const [studentList, setStudentList] = useState([]);
    const [absentList, setAbsentList] = useState([]);
    const [lateList, setLateList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour suivre l'état de chargement

    useEffect(() => { 
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/eleve_cours/1"); // 1 correspond à l'id du cours envoyé
            console.log(response);
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

    const handleSubmit = (absences, lates) => {
        // Envoyer les données au serveur pour authentification
        axios.post('http://localhost:5000/end_call',  { 'absences': absences, 'lates': lates, 'coursId': 1 })
        .then(() => {
        navigate('/'); // Redirige vers la page d'accueil (Calendrier)
        })
        .catch((error) => {
        console.log(error);
        })
    };

  return (
    <>
        <Formik
            onSubmit={() => handleSubmit(absentList, lateList)} // Appel de la fonction handleSubmit avec absentList comme paramètre
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            <div className='callWrap'>
            <div className='callTitle'>
                <h3>Méthode d’optimisation</h3>
                <h4>16 decembre 2024</h4>
            </div>
            <Form className='callForm'>
                {studentList
                .sort((a, b) => a.Utilisateur.nom.localeCompare(b.Utilisateur.nom)) // Trie les élèves par leur nom dans l'ordre alphabétique
                .map((student) => (
                    <ChronosCallCard Student={student} absentList={absentList} setAbsentList={setAbsentList} setLateList={setLateList} />
                ))
                }
                <ChronosCallCard Student={"rrr"} absentList={absentList} setAbsentList={setAbsentList} setLateList={setLateList} />
                <ChronosCallCard Student={"rrr"} absentList={absentList} setAbsentList={setAbsentList} setLateList={setLateList} />
                <ChronosCallCard Student={"rrr"} absentList={absentList} setAbsentList={setAbsentList} setLateList={setLateList} />

                <ChronosButton width="200px" type="submit" text={"Valider l'appel"} />

            </Form>
            </div>
        </Formik>
    </>
  )
}

export default PageCall 
