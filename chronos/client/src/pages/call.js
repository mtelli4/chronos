import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CallForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Format d\'e-mail invalide').required('L\'e-mail est requis'),
    password: Yup.string().required('Le mot de passe est requis'),
  });









  const [modules, setModules] = useState([])
    
  useEffect(() => {
      axios.get("http://localhost:5000/modules").then((response) => {
          console.log(response)
          setModules(response.data)
      })
  }, [])











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









const studentComponent = ({ data }) => {
    // Sous-composant d'appel qui utilise les données SQL pour afficher les élèves

    





    return (
      <div>
        <h2>Nom élève</h2>
        <p>{data.nom}</p>
        {/* Ajoutez d'autres éléments du sous-composant en fonction des données */}
      </div>
    );
  };











export default CallForm;
