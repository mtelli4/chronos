import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChronosInput from '../components/ChronosInput';
import ChronosLogo from '../components/ChronosLogo';
import "../css/styleLogin.css";
import { Link } from 'react-router-dom';
import { authService } from "../services/authService";

const PageLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Veuillez saisir un format d\'e-mail valide.').required('Veuillez saisir votre adresse e-mail.'),
    password: Yup.string().required('Veuillez saisir votre mot de passe'),
  });

  const handleSubmit = async(values, { setSubmitting }) => {
    try{
      // Envoyer les données au serveur pour authentification
      const email = values.email
      const password = values.password

      const userData = {email,password};
      const response  = await authService.login(userData)
      console.log(response.data.state == 1)
      if (response?.data?.state == 2) {
        navigate('/psw'); // Si route présente dans App.js, redirige vers le composant/page associé
      } else if (response?.data?.state == 1) {
        console.log(response?.data?.accessToken)
        if(response?.data?.accessToken){
          console.log('Authentifié');
          authService.setToken(response.data.accessToken);
          const roles = authService.getUserRoles();
          const currentRole = Object.keys(roles)[0];
          authService.setCurrentRole(currentRole);
          authService.setCurrentRoleId(roles[currentRole]);
          navigate("/")
        }
      } else {
        console.log('error');
        setLoginError('Échec de la connexion. L\'adresse e-mail ou le mot de passe est incorrect.');
      }
    }catch (error) {
      console.log('Une erreur s\'est produite :', error);
      setLoginError('Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    } finally {
      setSubmitting(false);
    }
}

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
          <button>
              <Link to="/forgotPassword">Mot de passe oublié ou première connexion ?</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default PageLogin;
