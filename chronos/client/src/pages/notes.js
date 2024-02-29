import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik"
import * as Yup from "yup";


function Notes() {
    const [roles, setRoles] = useState(1);
    const [notes, setNotes] = useState({ "eleves": [], "evaluations": [] , "modules":[]})
    const [formations, setFormations] = useState([])
    const [modules, setModules] = useState([])
    const [periodes, setPeriodes] = useState([])

    const [currentFormation, setCurrentFormation] = useState([""])

    const formRef = useRef();

    const FormObserver = () => {
        const { values } = useFormikContext();
        useEffect(() => {
            // Mise à jour des modules disponibles en fonction de la formation actuellement sélectionnée dans le formulaire pour les professeurs
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

    //Initialisation des paramètres pour le formulaire de recherche de notes
    const initialValuesSearch = {}
    const validationSchema = Yup.object().shape({
    })
    //Fonction de validation du formulaire de recherche de notes
    const onSubmitSearch = (data) => {
        //Suppression des champs vides, pour ne pas les prendre en compte dans la recherche
        Object.keys(data).forEach(key => {
            if (data[key] === '') {
                delete data[key];
            }
        });

        //Ajout du rôle actuel pour la recherche de notes
        data["profil"] = roles
        if (roles==2){
            data["eleveId"] = 1
        }

        //Appel à l'API de récupération de notes
        axios.get("http://localhost:5000/notes", { params: data })
            .then((response) => {
                //Mise à jour des notes
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


    //Initialisation des paramètres pour le formulaire d'insertion d'évaluation du professeur
    const initialValuesInsertEval = {
        libelle: "",
        coefficient: 1,
        noteMaximale: 20
    }
    const validationSchemaInsert = Yup.object().shape({
        libelle: Yup.string().min(5).max(50).required("Ce champ est obligatoire."),
        coefficient: Yup.number().required("Ce champ est obligatoire."),
        noteMaximale: Yup.number().required("Ce champ est obligatoire."),
        periodeId: Yup.number().required("Ce champ est obligatoire."),
    })
    
    //Fonction d'insertion d'évaluation
    const onSubmitInsertEval = (data) => {
        if (formRef.current.values.moduleId == "") {
            console.log("return")
            return
        }
        //Appel de l'API d'insertion d'évaluations
        axios.post("http://localhost:5000/evaluations/insertEvaluations", { moduleId: formRef.current.values.moduleId, coefficient: data.coefficient, libelle: data.libelle, noteMaximale: data.noteMaximale, periodeId: data.periodeId })
            .then((response) => {
                //Appel à la fonction d'envoie de formulaire, pour mettre à jour avec la nouvelle évaluation
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

    //Fonction de suppression d'évaluation
    const deleteEvaluation = (evalId) => {
        //Appel de l'API de suppression d'évaluations
        axios.post("http://localhost:5000/evaluations/deleteEvaluations", { evalId: evalId })
            .then((response) => {
                //Appel à la fonction d'envoie de formulaire, pour mettre à jour sans l'évaluation supprimée
                console.log("Succès DeleteEvaluations")
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

    //Mise à jour des notes, quand on change de rôle
    useEffect(() => {
        let parameters = {"profil":roles}
        if (roles==2){
            parameters["eleveId"] = 1
        }
        axios.get("http://localhost:5000/notes", { params:parameters }).then((response) => {
            setNotes(response.data)
        })
    }, [roles])

    //Récupération des modules disponibles au lancement
    useEffect(() => {
        axios.get("http://localhost:5000/modules").then((response) => {
            setModules(response.data)
        })
    }, [])

    //Récupération des formations disponibles au lancement
    useEffect(() => {
        axios.get("http://localhost:5000/formations").then((response) => {
            setFormations(response.data)
        })
    }, [])

    //Récupération des périodes disponibles au lancement
    useEffect(() => {
        axios.get("http://localhost:5000/periodes").then((response) => {
            setPeriodes(response.data)
        })
    }, [])

    //Fonction de gestion lors de la saisie/suppression/modification de notes
    function handleChange(e, eleveId, evalId) {
        //Lorsque l'utilisateur valide sa saisie
        if (e.key === 'Enter') {
            //Si la case est vide, suppression de la note, sinon insertion/modification de la note
            if (e.target.value === "") {
                axios.post("http://localhost:5000/notes/deleteNote", { evalId: evalId, eleveId: eleveId }).then((response) => {
                    //APPARITION POP UP DE CONFIMATION A CUSTOM("Upsert réussi")
                    if (response.data.hasBeenDeleted) {
                        //Appel à l'API pour mettre à jour l'affichage des notes
                        onSubmitSearch(formRef.current.values)
                        alert("Suppression réussie");
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
            } else {
                axios.post("http://localhost:5000/notes/insertNotes", { evalId: evalId, eleveId: eleveId, note: e.target.value }).then((response) => {
                    //APPARITION POP UP DE CONFIMATION A CUSTOM("Upsert réussi")
                    //Appel à l'API pour mettre à jour l'affichage des notes
                    onSubmitSearch(formRef.current.values)
                    alert("Upsert réussi");
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
            {/* Tempororaire : Affichage du rôle actuel et bouton de sélection de rôle */}
            <h1> Role actuel : {['Secrétaire', 'Professeurs', 'Eleves'].at(roles)}
            </h1>
            <button className="" onClick={() => {setNotes({"evaluations":[],"eleves":[]}); setRoles(0);}}>Secrétaire</button>
            <button className="" onClick={() => {setNotes({"evaluations":[],"eleves":[]}); setRoles(1);}}>Professeurs</button>
            <button className="" onClick={() => {setNotes({"modules":[],"eleves":[]}); setRoles(2);}}>Eleves</button>
            
            {/* Affichage de la page pour les sécretaire */}
            {
                roles == 0 &&
                <>

                </>
            }

            {/* Affichage de la page pour les professeurs */}
            {roles == 1 &&
                <>
                    {/* Formulaire de recherche de notes */}
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
                            <label>Periode</label>
                            <ErrorMessage name="periodeId" component="span" />
                            <Field as="select" name="periodeId">
                                <option disabled value=''>Sélectionner une période</option>
                                <option defaultValue value=''>Sélectionner une période</option>
                                {periodes.map(periode => (
                                    <option value={parseInt(periode.id)}>{periode.id}.{periode.libelle}</option>
                                ))}
                            </Field>
                            <button id="searchNote" type="submit">chercher</button>
                            <FormObserver />
                        </Form>
                    </Formik>

                    {/* Formulaire d'insertion d'évaluation */}
                    {
                        (!(typeof formRef.current === 'undefined')) &&
                        formRef.current != null &&
                        formRef.current.values.hasOwnProperty("moduleId") &&
                        formRef.current.values.moduleId != "" &&
                        <Formik initialValues={initialValuesInsertEval} onSubmit={onSubmitInsertEval} validationSchema={validationSchemaInsert}>
                            <Form>
                                <label>Libelle</label>
                                <ErrorMessage name="libelle" component="span" />
                                <Field
                                    name="libelle"
                                    placeholder="Veuillez saisir un libellé pour votre évaluation"
                                />
                                <label>Coefficient</label>
                                <ErrorMessage name="coefficient" component="span" />
                                <Field
                                    name="coefficient"
                                    type="number"
                                />
                                <label>Note Maximale</label>
                                <ErrorMessage name="noteMaximale" component="span" />
                                <Field
                                    name="noteMaximale"
                                    type="number"
                                />
                                <label>Periode</label>
                                <ErrorMessage name="periodeId" component="span" />
                                <Field as="select" name="periodeId">
                                    <option disabled value=''>Sélectionner une période</option>
                                    <option defaultValue value=''>Sélectionner une période</option>
                                    {periodes.map(periode => (
                                        <option value={parseInt(periode.id)}>{periode.id}.{periode.libelle}</option>
                                    ))}
                                </Field>
                                <button id="insertEvaluation" type="submit">Confirmer</button>
                                <FormObserver />
                            </Form>
                        </Formik>
                    }

                    {/* Tableau d'affichage des notes */}
                    <table>
                        <tr>
                            {/* Première ligne, nom des évaluations */}
                            <td style={{ border: "1pt solid black" }}>
                            </td>
                            <td style={{ border: "1pt solid black" }}>
                                Moyenne Eleve
                            </td>
                            {
                                notes.evaluations.map((evals) => {
                                    return (
                                        <td key={"libelleEval" + evals.id} style={{ border: "1pt solid black" }}>
                                            {evals.libelle}<br />
                                            Coeff:{evals.coefficient}<br />
                                            Max:{evals.noteMaximale}<br />
                                            <button onClick={() => { deleteEvaluation(evals.id)}}> Supprimer</button>
                                        </td>
                                    )
                                })
                            }
                        </tr>
                        {notes.eleves.map((eleve) => {
                            return (
                                <tr>
                                    {/* Affichage du nom de l'élève et de sa moyenne */}
                                    <td key={"eleveIdentite" + eleve.id} style={{ border: "1pt solid black" }}>{eleve.nom} {eleve.prenom}</td>
                                    <td key={"eleveMoyenne" + eleve.id} style={{ border: "1pt solid black" }}>{eleve.moyenne}</td>

                                    {/* Affichage de toutes les notes de l'élève, pour toutes les évaluations */}
                                    {notes.evaluations.map((evals) => {
                                        let val = ""
                                        if (notes.hasOwnProperty(eleve.id)) {
                                            if (notes[eleve.id].hasOwnProperty(evals.id)) {
                                                val = notes[eleve.id][evals.id]
                                            }
                                        }
                                        return (
                                            <td key={"CaseEleve" + eleve.id + "Eval" + evals.id} style={{ border: "1pt solid black" }}>
                                                <input key={"InputEleve" + eleve.id + "Eval" + evals.id} className="" type="number" defaultValue={val} onKeyDown={event => handleChange(event, eleve.id, evals.id)} />

                                            </td>
                                        )
                                    })}

                                </tr>
                            )
                        })}
                        
                        {/* Affichage des moyennes pour chaque évaluation*/}
                        <tr>
                            <td style={{ border: "1pt solid black" }}>
                            </td>
                            <td style={{ border: "1pt solid black" }}>
                                Moyenne Pour note
                            </td>
                            {
                                notes.evaluations.map((evals) => {
                                    return (
                                        <td key={"MoyenneNote" + evals.id} style={{ border: "1pt solid black" }}>{evals.moyenne}</td>
                                    )
                                })
                            }
                        </tr>
                    </table>

                </>
            }



            {/* Affichage de la page pour les élèves */}
            {
                roles == 2 &&
                <>
                    {/* Formulaire de recherche de notes */}
                    <Formik initialValues={initialValuesSearch} onSubmit={onSubmitSearch} validationSchema={validationSchema} innerRef={formRef}>
                        <Form>
                            <label>Periode</label>
                            <ErrorMessage name="periodeId" component="span" />
                            <Field as="select" name="periodeId">
                                <option disabled value=''>Sélectionner une période</option>
                                <option defaultValue value=''>Sélectionner une période</option>
                                {periodes.map(periode => (
                                    <option value={parseInt(periode.id)}>{periode.id}.{periode.libelle}</option>
                                ))}
                            </Field>
                            <button id="searchNote" type="submit">chercher</button>
                            <FormObserver />
                        </Form>
                    </Formik>

                    {/* Affichage des notes pour chaque évaluation triées par modules  */}
                    {notes.modules.map((module) => {
                        return <>
                            {/* Affichage du nom du module et de la moyenne de l'élève dans ce dernier */}
                            <h1 key={"NomModule" + module.id}>{module.libelle} ({module.moyenne})</h1>

                            {notes.evaluations.map((evaluation) => {
                                {/* Affichage du nom de l'évaluation, la moyenne pour celle ci et la note de l'élève*/}
                                if (notes.hasOwnProperty(module.id) && notes[module.id].hasOwnProperty(evaluation.id)) {
                                    return (
                                        <>
                                            <div key={"EvaluationsInfos" + evaluation.id}>
                                                <p>{evaluation.libelle} (Moyenne : {evaluation.moyenne}/{evaluation.noteMaximale}): {notes[module.id][evaluation.id]}/{evaluation.noteMaximale}</p>
                                            </div>
                                        </>
                                    );
                                }
                                return (<></>);
                            })}
                        </>
                    }
                    )
                }
                </>
            }
        </>
    )
}

export default Notes;