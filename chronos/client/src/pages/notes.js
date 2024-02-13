import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik"
import * as Yup from "yup";


function Notes() {
    const [roles, setRoles] = useState(1);
    const [notes, setNotes] = useState({ "eleves": [], "evaluations": [] })
    const [formations, setFormations] = useState([])
    const [modules, setModules] = useState([])

    const [currentFormation, setCurrentFormation] = useState([""])

    const formRef = useRef();

    const FormObserver = () => {
        const { values } = useFormikContext();
        useEffect(() => {
            if (values.hasOwnProperty("formationId")) {
                if (currentFormation === values.formationId) {
                    return
                }
                setCurrentFormation(values.formationId)
                if (values.formationId === '') {
                    axios.get("http://localhost:5000/modules").then((response) => {
                        setModules(response.data)
                    })
                } else {
                    axios.get(`http://localhost:5000/modules/byFormation/`, { params: { id: values.formationId } }).then((response) => {
                        setModules(response.data)
                    })
                }
            }
        }, [values.formationId]);

        return null;
    };

    const initialValuesSearch = {}
    const initialValuesInsertEval = {
        libelle:"",
        coefficient:1
        }

    const onSubmitSearch = (data) => {
        Object.keys(data).forEach(key => {
            if (data[key] === '') {
                delete data[key];
            }
        });
        axios.get("http://localhost:5000/notes", { params: data })
            .then((response) => {
                console.log("Succès SearchNotes")
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
    })

    const validationSchemaInsert = Yup.object().shape({
        libelle: Yup.string().min(5).max(50).required("Ce champ est obligatoire."),
        coefficient: Yup.number().required("Ce champ est obligatoire."),
    })

    const onSubmitInsertEval = (data) => {
        if ((!data.hasOwnProperty("libelle")) || (!data.hasOwnProperty("coefficient")) || formRef.current.values.moduleId==""){
            console.log("return")
            return
        }
        axios.post("http://localhost:5000/notes/insertEvaluations", { moduleId: formRef.current.values.moduleId, coefficient:data.coefficient, libelle:data.libelle })
            .then((response) => {
                console.log("Succès InsertEvaluations")
                onSubmitSearch(formRef.current.values);
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

    useEffect(() => {
        axios.get("http://localhost:5000/notes").then((response) => {
            setNotes(response.data)
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

    function handleChange(e,eleveId,evalId){
        console.log(e)
        if(e.key === 'Enter') {
            if (e.target.value === ""){
                axios.post("http://localhost:5000/notes/deleteNote", {evalId:evalId,eleveId:eleveId}).then((response) => {
                    //APPARITION POP UP DE CONFIMATION A CUSTOM("Upsert réussi")
                    if(response.data.hasBeenDeleted){
                        alert("Suppression réussie, cliquer pour mettre à jour");
                        onSubmitSearch(formRef.current.values)
                    }
                })
                .catch(function (error) {
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
                    alert("UpsertError");
                });
            }else{
                axios.post("http://localhost:5000/notes/insertNotes", {evalId:evalId,eleveId:eleveId,note:e.target.value}).then((response) => {
                    //APPARITION POP UP DE CONFIMATION A CUSTOM("Upsert réussi")
                    alert("Upsert réussi, cliquer pour mettre à jour");
                    onSubmitSearch(formRef.current.values)
                })
                .catch(function (error) {
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
                    alert("UpsertError");
                });

            }
            console.log(e.target.value)
        }
    }

    return (
        <>
        <h1> Role actuel : {['Secrétaire','Professeurs','Eleves'].at(roles)}
        </h1>
        <button className="" onClick={() => {setRoles(0)}}>Secrétaire</button>
        <button className="" onClick={() => {setRoles(1)}}>Professeurs</button>
        <button className="" onClick={() => {setRoles(2)}}>Eleves</button>
        {
        roles==0 &&
        <>

        </> 
        }

        {roles==1 && 
        <>
            <Formik initialValues={initialValuesSearch} onSubmit={onSubmitSearch} validationSchema={validationSchema} innerRef={formRef}>
                <Form>
                    <label>Formation</label>
                    <ErrorMessage name="formationId" component="span" />
                    <Field as="select" name="formationId">
                        <option disabled value=''>Sélectionner une formation</option>
                        <option defaultValue value=''>Sélectionner une formation</option>
                        {formations.map(formation => (
                            <option value={parseInt(formation.id)}> {formation.id} - {formation.libelle} </option>
                        ))}
                    </Field>
                    <label>Module</label>
                    <ErrorMessage name="moduleId" component="span" />
                    <Field as="select" name="moduleId">
                        <option disabled value=''>Sélectionner un modules</option>
                        <option defaultValue value=''>Sélectionner un modules</option>
                        {modules.map(module => (
                            <option value={parseInt(module.id)}>{module.id}.({module.codeApogee}) - {module.libelle}</option>
                        ))}
                    </Field>
                    <button id="searchNote" type="submit">chercher</button>
                    <FormObserver />
                </Form>
            </Formik>


            {
            (!(typeof formRef.current === 'undefined'))&&
            formRef.current != null && 
            formRef.current.values.hasOwnProperty("moduleId") && 
            formRef.current.values.moduleId!="" &&
            <Formik initialValues={initialValuesInsertEval} onSubmit={onSubmitInsertEval} validationSchema={validationSchemaInsert}>
                <Form>
                    <label>Libelle</label>
                    <ErrorMessage name="libelle" component="span"/>
                    <Field 
                        name="libelle" 
                        placeholder="Veuillez saisir un libellé pour votre évaluation"
                    />
                    <label>Coefficient</label>
                    <ErrorMessage name="coefficient" component="span"/>
                    <Field 
                        name="coefficient" 
                        type="number"
                    />
                    <button id="insertEvaluation" type="submit">Confirmer</button>
                    <FormObserver />
                </Form>
            </Formik>
            }


            <table>
                <tr>
                    <td style={{ border: "1pt solid black" }}>
                    </td> 
                    <td style={{ border: "1pt solid black" }}>
                        Moyenne Eleve
                    </td>
                    {
                        notes.evaluations.map((evals) => {
                            return (
                                <td style={{ border: "1pt solid black" }}>{evals.libelle}<br/>Coeff:{evals.coefficient}</td>
                            )
                        })
                    }
                </tr>
                {notes.eleves.map((eleve) => {
                    return (
                        <tr>
                            <td style={{ border: "1pt solid black" }}>{eleve.nom} {eleve.prenom}</td>
                            <td style={{ border: "1pt solid black" }}>{eleve.moyenne}</td>
                            {notes.evaluations.map((evals) => {
                                let val = ""
                                if (notes.hasOwnProperty(eleve.id)) {
                                    if (notes[eleve.id].hasOwnProperty(evals.id)) {
                                        val = notes[eleve.id][evals.id]
                                    }
                                }
                                return (
                                    <td style={{ border: "1pt solid black" }}>
                                        <input className="" type="number"  defaultValue={val} onKeyDown={event => handleChange(event,eleve.id,evals.id)} /> 
                                        
                                    </td>
                                )
                            })}

                        </tr>
                    )
                })}
                <tr>
                    <td style={{ border: "1pt solid black" }}>
                    </td> 
                    <td style={{ border: "1pt solid black" }}>
                        Moyenne Pour note
                    </td>
                    {
                        notes.evaluations.map((evals) => {
                            return (
                                <td style={{ border: "1pt solid black" }}>{evals.moyenne}</td>
                            )
                        })
                    }
                </tr>
            </table>
        
        </>
        }
        
        {
        roles==2 &&
        <>

        </> 
        }
        </>
    )
}

export default Notes;