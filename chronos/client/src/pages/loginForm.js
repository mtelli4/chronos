import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authService } from "../services/authService";

const LoginForm = () => {
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
      if (response?.data?.state == 2) {
        navigate('/psw'); // Si route présente dans App.js, redirige vers le composant/page associé
      } else if (response?.data?.state == 1) {
        if(response?.data?.accessToken){
          authService.setToken(response.data.accessToken);
          authService.setCurrentRole(authService.getUserRoles()[0]);
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
      
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Form>
        <div>
          {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
        </div>
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
