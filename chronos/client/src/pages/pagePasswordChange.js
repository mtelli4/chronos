import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChronosInput from '../components/ChronosInput';
import ChronosLogo from '../components/ChronosLogo';

const PagePasswordChange = () => {
    const navigate = useNavigate();

    const initialValues = {
      email: '',
      password: '',
      confirmPassword: ''
    };
  
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Format d\'e-mail invalide').required('L\'e-mail est requis'),
      password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
          'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial'
        )
        .required('Le mot de passe est requis'),
      confirmPassword: Yup.string()
        .required('Vous devez confirmer le mot de passe'),
    });
  
    const handleSubmit = (values, { setSubmitting, setErrors }) => {
      console.log('Email:', values.email, 'Mot de passe:', values.password, 'Mot de passe réécrit:', values.confirmPassword);
    
      // Si le mot de passe n'a pas bien été confirmé
      if (values.password !== values.confirmPassword) {
        setErrors({ confirmPassword: 'Les mots de passe ne correspondent pas' });
        setSubmitting(false);
        return;
      }

      // Mauvais code
      axios.get("http://localhost:5000/usersEAV/exists", { params: { userEmail: values.email, attribute: 'verificationCode', value: values.verificationCode } })
      .then((response) => {
        const { exists } = response.data;
        if (! exists) {
          alert('RATÉ');
          setSubmitting(false);
          return;
        } else {
          // Envoyer les données au serveur pour authentification
          axios.post("http://localhost:5000/newPsw", { 'email': values.email, 'password': values.password, value: values.verificationCode })
          .then((response) => {
            console.log("Succès");
            console.log(response);
            const result = response.data;
            if (result === 1) {
              alert('Mot de passe changé avec succès !')
              navigate('/login'); // Si route présente dans App.js, redirige vers le composant/page associé
            } else {
              console.log("Erreur lors du changement de mot de passe");
            }
          }).catch(function (error) {
            console.log("Echec");
            console.log(error);
          });
        }
      });
    };  
  
    return (
        <>
            <div className='LoginCont'>
                <img className='LoginPurpleTriangle' />
                <div className='LoginContentCont'>
                <div className='LoginTitleCont'>
                    <ChronosLogo fontsize={5} onMedia={{min: 500, fontsize: 4}} />
                    <h2 className='LoginSubtitle'>Petite phrase sympathique et accrochante</h2>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className='LoginFormCont'>
                      <ChronosInput width="100%" type="email" name="email" component="div" title="Email :" />
                      <ChronosInput width="100%" type="verificationCode" name="verificationCode" component="div" title="Code de vérification à 6 chiffres :" />
                      <ChronosInput width="100%" type="password" name="password" component="div" title="Nouveau mot de passe :"/>
                      <p>(Doit contenir un caractère spécial parmi ceux-ci : @$!%*#?&)</p>
                      <ChronosInput width="100%" type="password" name="confirmPassword" component="div" title="Confirmez le mot de passe :"/>
          
                  
                      <button className='LoginConfirmButton' type="submit">Soumettre</button>
                    </Form>
                </Formik>
                </div>
            </div>
        </>
    );
  };

export default PagePasswordChange
