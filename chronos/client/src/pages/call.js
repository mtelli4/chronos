import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import CallCard from '../components/CallCard';

const CallForm = () => {
  const navigate = useNavigate();

  // const initialValues = {
  //   email: '',
  //   password: '',
  // };

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().email('Format d\'e-mail invalide').required('L\'e-mail est requis'),
  //   password: Yup.string().required('Le mot de passe est requis'),
  // });





  const [studentList, setStudentList] = useState([])
    
  useEffect(() => {
    axios.post("http://localhost:5000/eleve-cours", { 'id': 1 })
      .then((response) => {
        console.log("Test: ");
        console.log(response)
        setStudentList(response.data)
      })
  }, [])


  console.log("Test: ");
  console.log(studentList);

  const handleSubmit = (values, { setSubmitting }) => {
    // Envoyer les données au serveur pour authentification


    console.log("Liste :");
    console.log(values);
    // Créer une liste contenant que les élèves absents et l'envoyer dans axios
    // let studentAbsentList
    // studentList.map((student, index) => {

    // })




    // axios.post('http://localhost:5000/login',  { 'email': values.email, 'password': values.password })
    //   .then((response) => {
    //     console.log('Succès');
    //     console.log(response);
    //     const result = response.data;
    //     console.log('Test :\n');
    //     console.log(result);
    //     if (result === 2) {
    //       navigate('/psw'); // Si route présente dans App.js, redirige vers le composant/page associé
    //     } else if (result === 1) {
    //       console.log('Authentifié');
    //       navigate('/');
    //     } else {
    //       console.log('error');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Echec');
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setSubmitting(false);
    //   });
  };
  
  return (
    <Formik
      // initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>


          {studentList.map((student, index) => {
            return ( 
              <CallCard student={student} number={index} key={student.id}/>
            )
          })}
        <div>
          <button type="submit">Valider l'appel</button>
        </div>


      </Form>
    </Formik>
  );
};
export default CallForm;
