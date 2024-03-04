import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChronosInput from '../components/ChronosInput';
import ChronosLogo from '../components/ChronosLogo';
import "../css/styleLogin.css";

const PageLogin = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Format d\'e-mail invalide').required('L\'e-mail est requis'),
    password: Yup.string().required('Le mot de passe est requis'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Envoyer les données au serveur pour authentification
    axios.post('http://localhost:5000/login',  { 'email': values.email, 'password': values.password })
      .then((response) => {
        console.log('Succès');
        console.log(response);
        const result = response.data;
        console.log('Test :\n');
        console.log(result);
        if (result === 2) {
          navigate('/psw'); // Si route présente dans App.js, redirige vers le composant/page associé
        } else if (result === 1) {
          console.log('Authentifié');
          navigate('/');
        } else {
          console.log('error');
        }
      })
      .catch((error) => {
        console.log('Echec');
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (

    <>
      <div className='LoginCont'>
        <img className='LoginPurpleTriangle' />
        <div className='LoginContentCont'>
          <div className='LoginTitleCont'>
            <ChronosLogo fontsize={5} onMedia={{min: 500, fontsize:4}} />
            <h2 className='LoginSubtitle'>Petite phrase sympathique et accrochante</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>

            <Form className='LoginFormCont'>   
              <ChronosInput width="100%" title="Email :" type="email" component="div" name="email" />
              <ChronosInput width="100%" title="Mot de passe :" type="password" component="div" name="password" />

              <button type="submit" className='LoginConfirmButton'>Soumettre</button>
            </Form>
            
          </Formik>
        </div>
      </div>
    </>
  );
};

export default PageLogin;
