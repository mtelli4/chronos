import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios'
import {Formik, Form, Field, ErrorMessage, useFormikContext} from "formik"
import * as Yup from "yup";


function Notes() {
    const [notes, setNotes] = useState({ "eleves": [], "evaluations": [] })
    const [formations, setFormations] = useState([])
    const [modules, setModules] = useState([])

    const[ currentFormation, setCurrentFormation] = useState([""])

    const FormObserver = () => {
        const { values} = useFormikContext();
        useEffect(() => {
          if(values.hasOwnProperty("formationId")){
            if(currentFormation == values.formationId){
                return 
            }
            setCurrentFormation(values.formationId)
            if (values.formationId === '') {
                axios.get("http://localhost:5000/modules").then((response) => {
                    setModules(response.data)
                })
            }else{
                axios.get(`http://localhost:5000/modules/byFormation/`,{params:{id:values.formationId}}).then((response) => {
                    setModules(response.data)
                })
            }
          }
        }, [values.formationId]);      

        return null;
      };

    const initialValues = {
    }

    const onSubmit = (data) => {
        Object.keys(data).forEach(key => {
        if (data[key] === '') {
                 delete data[key];
          }
        });
        axios.get("http://localhost:5000/notes", {params : data})
        .then((response) => {
            console.log("Succès")
            setNotes(response.data)
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

    const validationSchema = Yup.object().shape({
        // libelle: Yup.string().min(5).max(25).required("Ce champ est obligatoire."),
        // horaire: Yup.string().required("Ce champ est obligatoire."),
        // duree: Yup.number().required("Ce champ est obligatoire."),
        // moduleId: Yup.number().required("Ce champ est obligatoire.")
    })

    useEffect(() => {
        axios.get("http://localhost:5000/notes").then((response) => {
            setNotes(response.data)
            console.log('notes')
            console.log(notes)
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/modules").then((response) => {
            setModules(response.data)
        })
    }, [])
    
    useEffect(() => {
        axios.get("http://localhost:5000/formations").then((response) => {
            setFormations(response.data)
        })
    }, [])

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Formation</label>
                    <ErrorMessage name="formationId" component="span"/>
                    <Field as="select" name="formationId">
                        <option disabled value=''>Sélectionner une formation</option>
                        <option defaultValue value=''>Sélectionner une formation</option>
                        {formations.map(formation => (
                            <option value={parseInt(formation.id)}> {formation.id} - {formation.libelle} </option>
                        ))}
                    </Field>
                    <label>Module</label>
                    <ErrorMessage name="moduleId" component="span"/>
                    <Field as="select" name="moduleId">
                        <option disabled value=''>Sélectionner un modules</option>
                        <option defaultValue value=''>Sélectionner un modules</option>
                        {modules.map(module => (
                            <option value={parseInt(module.id)}>{module.id}.({module.codeApogee}) - {module.libelle}</option>
                        ))}
                    </Field>
                    <button id="searchNote" type="submit">chercher</button>
                <FormObserver/>
                </Form>
            </Formik>


            <table>
                <tr>
                    <td style={{border: "1pt solid black"}}>
                        .
                    </td>
                    {
                        notes.evaluations.map((evals)=>{
                            return(
                                <td style={{border: "1pt solid black"}}>{evals.libelle}</td>
                            )
                        })
                    }
                </tr>
                {/* {notes.eleves.map((eleve) => {
                    return (
                        <tr>
                            <td style={{border: "1pt solid black"}}>{eleve.nom}</td>
                            {notes.evaluations.map((evals) => {
                                return (
                                    <td style={{border: "1pt solid black"}}>
                                        {notes[eleve.id][evals.id]}
                                    </td>
                                )
                            })}

                        </tr>
                    )
                })} */}
            </table>
        </>
    )
}

export default Notes;