import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// Variables d'initialisation du formik
const initialValues = {
  email: '',
  password: '',
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Format d\'e-mail invalide').required('L\'e-mail est requis'),
  password: Yup.string().required('Le mot de passe est requis'),
});


const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    // Envoyer les données au serveur pour authentification
    axios.post('http://localhost:5000/login',  { 'email': values.email, 'password': values.password })
      .then((response) => {
        const result = response.data;
        if (result === 2) {
          navigate('/psw'); // Redirige vers la page de changement de mdp
        } else if (result === 1) {
          console.log('Authentifié');
          navigate('/'); // Redirige vers la page d'accueil (Calendrier)
        } else {
          console.log('error');
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="email">Email :</label>
          <Field type="email" id="inputEmail" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <Field type="password" id="inputPassword" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>

        <div>
          <button type="submit">Soumettre</button>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
