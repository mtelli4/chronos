import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ChronosInput from '../components/ChronosInput';
import * as Yup from 'yup';
import "../css/styleLogin.css";
import axios from 'axios';

const ForgotPasswordPage = () => {

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Veuillez saisir un format d\'e-mail valide.').required('Veuillez saisir votre adresse e-mail.'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("http://localhost:5000/api/sendVerificationCode", {
        to: values.email,
      });
      alert("Email sent!");
    } catch(err) {
      alert(err);
    }
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>

      <Form className='LoginFormCont'>   
        <ChronosInput width="100%" title="Email :" type="email" component="div" name="email" />
        <button type="submit" className='LoginConfirmButton'>Recevoir un code par mail</button>
      </Form>
      
    </Formik>
  );
};

export default ForgotPasswordPage;
