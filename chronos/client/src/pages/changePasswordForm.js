import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    mail: '',
    mdp: '',
    confirmMdp: ''
  };

  const validationSchema = Yup.object().shape({
    mail: Yup.string().email('Format d\'e-mail invalide').required('L\'e-mail est requis'),
    mdp: Yup.string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial'
      )
      .required('Le mot de passe est requis'),
    confirmMdp: Yup.string()
      .required('Confirmer le mot de passe est requis'),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    console.log('Email:', values.mail, 'Mot de passe:', values.mdp, 'Mot de passe réécrit:', values.confirmMdp);
  
    // Si le mot de passe n'a pas bien été confirmé
    if (values.mdp !== values.confirmMdp) {
      setErrors({ confirmMdp: 'Les mots de passe ne correspondent pas' });
      setSubmitting(false);
      return;
    }

    // Envoyer les données au serveur pour authentification
    axios.post("http://localhost:5000/newPsw", { 'mail': values.mail, 'password': values.mdp })
      .then((response) => {
        console.log("Succès");
        console.log(response);
        const result = response.data;
        if (result === 1) {
          navigate('/login'); // Si route présente dans App.js, redirige vers le composant/page associé
        } else {
          console.log("Erreur lors du changement de mot de passe");
        }
      }).catch(function (error) {
        console.log("Echec");
        console.log(error);
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
          <label htmlFor="mail">Email :</label>
          <Field type="email" id="inputEmail" name="mail"/>
          <ErrorMessage name="password" component="div" />
        </div>
        <div>
          <label htmlFor="mdp">Nouveau mot de passe :</label>
          <Field type="password" id="inputPassword" name="mdp"/>
          <ErrorMessage name="mdp" component="div" />
        </div>
        <div>
          <label htmlFor="confirmMdp">Réécrivez votre mot de passe :</label>
          <Field type="password" id="inputPassword2" name="confirmMdp"/>
          <ErrorMessage name="confirmMdp" component="div" />
        </div>

        <div>
          <button type="submit">Soumettre</button>
        </div>
      </Form>
    </Formik>
  );
};

export default ChangePasswordForm;