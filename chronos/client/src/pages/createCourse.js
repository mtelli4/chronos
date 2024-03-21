import {useState, useEffect, React} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup";
import axios from 'axios';

function CreateCourse({setHeaderVisibility}) {

    React.useEffect(() => {
        setHeaderVisibility();
      });

    const initialValues = {
        libelle:"",
        debutCours:"",
        duree:0,
        moduleId:0
    }

    const validationSchema = Yup.object().shape({
        libelle: Yup.string().min(5).max(25).required("Ce champ est obligatoire."),
        debutCours: Yup.date().required("Ce champ est obligatoire."),
        duree: Yup.number().required("Ce champ est obligatoire."),
        moduleId: Yup.number().required("Ce champ est obligatoire.")
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:5000/cours", data)
        .then((response) => {
            console.log("Succès")
        }).catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }

    const [modules, setModules] = useState([])
    
    useEffect(() => {
        axios.get("http://localhost:5000/modules").then((response) => {
            console.log(response)
            setModules(response.data)
        })
    }, [])

    console.log(modules)
    return ( 
        <div className="createCourseContainer">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Libellé</label>
                    <ErrorMessage name="libelle" component="span"/>
                    <Field 
                        id="inputCreateCourse" 
                        name="libelle" 
                        placeholder="Veuillez saisir un libellé pour votre cours"
                    />
                    <br></br>
                    <label>debutCours</label>
                    <ErrorMessage name="debutCours" component="span"/>
                    <Field 
                        id="inputCreateCourse" 
                        name="debutCours"
                        type="datetime-local"
                        placeholder="Veuillez sélectionner la date et l'heure de début de vote cours"
                    />
                    <br></br>
                    <label>Durée</label>
                    <ErrorMessage name="duree" component="span"/>
                    <Field 
                        id="inputCreateCourse" 
                        name="duree" 
                        placeholder="Veuillez saisir la durée de votre cours"
                    />
                    <br></br>
                    <label>ID Module</label>
                    <ErrorMessage name="moduleId" component="span"/>
                    <Field as="select" name="moduleId">
                        <option disabled value="">Sélectionner un modules</option>
                        {modules.map(module => (
                            <option value={module.id}>({module.codeApogee}) - {module.libelle}</option>
                        ))}
                    </Field>
                    <button id="createCourse" type="submit">Créer</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreateCourse;