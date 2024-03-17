import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik"
import * as Yup from "yup";
import ChronosTable from '../components/ChronosTable';
import "../css/styleNotes.css";
import { authService } from "../services/authService";
import { ChronosInputSelectOption } from '../components/ChronosInputSelect/ChronosInputSelectElements';
import ChronosInputSelect from '../components/ChronosInputSelect';
import ChronosButton from '../components/ChronosButton';
import Popup from '../components/Popup/index.js';
import ToggleButton from '../components/ToggleButton/index.js';
import toggleIcon from "../images/plus.png"
import PopupAddEval from './PopupAddEval.js';
import PopupModifyGrade from './popupModifyGrade.js';

const PageNotes = () => {
    const [notes, setNotes] = useState({ "eleves": [], "evaluations": [], "modules": [] })
    const [notesDetails, setNotesDetails] = useState({})
    const [formations, setFormations] = useState([])
    const [modules, setModules] = useState([])
    const [periodes, setPeriodes] = useState([])
    const [statusList, setStatusList] = useState([])
    const [showTable, setShowTable] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showChangeGrade, setShowChangeGrade] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState({evalName:"", eleveName:"", evalId : "", eleveId : "",maxGradeEval:"" , currentGrade: "", currentStatusId:""});
    const role = authService.getCurrentRole();
    const roleId = authService.getCurrentRoleId();

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
                    axios.get("http://localhost:5000/modules/byFilter", { params: { role: role, roleId: roleId } }).then((response) => {
                        setModules(response.data)
                    })
                } else {
                    axios.get("http://localhost:5000/modules/byFilter", { params: { role: role, roleId: roleId, formation: values.formationId } }).then((response) => {
                        setModules(response.data)
                    })
                }
            }
        }, [values.formationId]);

        return null;
    };

    //Initialisation des paramètres pour le formulaire de recherche de notes
    const initialValuesSearch = {
        formationId: '',
        moduleId: '',
        periodeId: ''
    }
    const validationSchema = Yup.object().shape({
        formationId: Yup.number().when([], {
            is: () => role.includes('ROLE_SECRETARY') || role.includes('ROLE_DIRECTOR') || role.includes('ROLE_DEPARTMENT_DIRECTOR') || role.includes('ROLE_PROFESSOR'),
            then: () => Yup.number().required("Ce champ est obligatoire."),
            otherwise: () => Yup.number().nullable().notRequired(),
        }),
        moduleId: Yup.number().when([], {
            is: () => role.includes('ROLE_PROFESSOR'),
            then: () => Yup.number().required("Ce champ est obligatoire."),
            otherwise: () => Yup.number().nullable().notRequired(),
        }),
        periodeId: Yup.number().notRequired(),
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
        data["profil"] = role
        if (role.includes('ROLE_USER')) {
            data["eleveId"] = roleId
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

    const getModulesDetails = (data)=>{
        //Suppression des champs vides, pour ne pas les prendre en compte dans la recherche
        Object.keys(data).forEach(key => {
            if (data[key] === '') {
                delete data[key];
            }
        });
        //Appel à l'API de récupération des notes du module sélectionné
        axios.get("http://localhost:5000/notes", { params: data})
        .then((response) => {
            //Mise à jour des notes
            console.log("Succès SearchNotes")
            setNotesDetails(response.data)
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
        //Récupération des modules disponibles au lancement
        axios.get("http://localhost:5000/modules/byFilter", { params: { role: role, roleId: roleId } }).then((response) => {
            setModules(response.data)
        })

        //Récupération des formations disponibles au lancement
        axios.get("http://localhost:5000/formations/byRole", { params: { role: role, roleId: roleId } }).then((response) => {
            setFormations(response.data)
        })

        var statusList= []

        axios.get("http://localhost:5000/statut").then((response) => {
          setStatusList(response.data)
        })

        //Récupération des périodes disponibles au lancement
        axios.get("http://localhost:5000/periodes").then((response) => {
            setPeriodes(response.data)
        })

        if (role.includes('ROLE_USER')) {
            onSubmitSearch(formRef.current.values);
        }
    }, [])

    function deleteNote(evalId, eleveId){
        axios.post("http://localhost:5000/notes/deleteNote", { evalId: evalId, eleveId: eleveId }).then((response) => {
            //APPARITION POP UP DE CONFIMATION A CUSTOM("Upsert réussi")
            if (response.data.hasBeenDeleted) {
                //Appel à l'API pour mettre à jour l'affichage des notes
                setShowChangeGrade(false);
                setSelectedGrade({evalName:"", eleveName:"", evalId : "", eleveId : "",maxGradeEval:"" , currentGrade: "", currentStatusId:""});
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
    }

    //Fonction de gestion lors de la saisie/suppression/modification de notes
    function handleChange(data) {
        const eleveId = selectedGrade.eleveId
        const evalId = selectedGrade.evalId
        const grade = data.grade === undefined ||data.statusId ===""? null:data.grade
        const statutId = data.statusId === undefined ||data.statusId ==="" ? null: data.statusId

        //Si la case est vide, suppression de la note, sinon insertion/modification de la note
        if (grade === null && statutId === null) {
            deleteNote(evalId, eleveId)
        } else {
            axios.post("http://localhost:5000/notes/insertNotes", { evalId: evalId, eleveId: eleveId, note: grade, statutId: statutId }).then((response) => {
                //APPARITION POP UP DE CONFIMATION A CUSTOM("Upsert réussi")
                //Appel à l'API pour mettre à jour l'affichage des notes
                setShowChangeGrade(false);
                setSelectedGrade({evalName:"", eleveName:"", evalId : "", eleveId : "",maxGradeEval:"" , currentGrade: "", currentStatusId:""});
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
    }

    function handleActionOnModify(eleveName, evalName,eleveId, evalId, maxGradeEval) {
        const newSelectedGrade = {evalName : evalName, eleveName : eleveName, evalId:evalId, eleveId:eleveId, maxGradeEval:maxGradeEval}
        if (notes.hasOwnProperty(eleveId) && notes[eleveId].hasOwnProperty(evalId) && notes[eleveId][evalId].hasOwnProperty("note")){
            newSelectedGrade.currentGrade = notes[eleveId][evalId].note
        }else{
            newSelectedGrade.currentGrade = 0
        }
        if (notes.hasOwnProperty(eleveId) && notes[eleveId].hasOwnProperty(evalId) && notes[eleveId][evalId].hasOwnProperty("statutId")){
            newSelectedGrade.currentStatusId = notes[eleveId][evalId].statutId
        }else{
            newSelectedGrade.currentStatusId = ""
        }

        setSelectedGrade(newSelectedGrade)
        setShowChangeGrade(true);
    }


  return (
    <>
        {/* Affichage de la page pour les professeurs */}
        {role.includes('ROLE_PROFESSOR') &&
                <>
                    {/* Formulaire de recherche de notes */}
                        <Formik initialValues={initialValuesSearch} onSubmit={onSubmitSearch} validationSchema={validationSchema} innerRef={formRef}>
                            <Form className='notesFormulaireRecherche'>
                                    <div className='notesSelectCont'>
                                        <ChronosInputSelect defaultLabel="Formation" name="formationId" label="" options={formations} />
                                        <ChronosInputSelect defaultLabel="Module" name="moduleId" label="" options={modules} />
                                        <ChronosInputSelect defaultLabel="Période" name="periodeId" label="" options={periodes} />
                                    </div>
                                    
                                    <ChronosButton action={() => setShowTable("prof")} text="Chercher" type="submit" id="searchNote" />
                                    <FormObserver />
                            </Form>
                        </Formik>

                    {/* Formulaire d'insertion d'évaluation */}
                    <Popup html={<PopupAddEval formRef={formRef} initialValuesInsertEval={initialValuesInsertEval} validationSchemaInsert={validationSchemaInsert} periodes={periodes} FormObserver={FormObserver} onSubmitInsertEval={onSubmitInsertEval} />} isActive={showPopup} format={"square"} setIsActive={setShowPopup} overflow="auto" />
                    
                    {/* Formulaire de changement de note */}
                    <Popup html={<PopupModifyGrade evalName={selectedGrade.evalName} eleveName={selectedGrade.eleveName} maxGradeEval={selectedGrade.maxGradeEval} currentGrade={selectedGrade.currentGrade} currentStatusId={selectedGrade.currentStatusId} onSubmit={handleChange} onDelete={() => deleteNote(selectedGrade.evalId,selectedGrade.eleveId)} statusList={statusList}/>} isActive={showChangeGrade} format={"square"} setIsActive={setShowChangeGrade} overflow="auto" />

                    {/* Tableau d'affichage des notes */}
                    {
                        showTable == "prof" &&
                        (
                            <div className='contentContNotes'>
                                <ToggleButton src={toggleIcon} action={() => setShowPopup(true)} text="Créer une évaluation" />
                                <div className='notesTableCont'>
                                    <ChronosTable actionOnModify={handleActionOnModify} modifiable={true} width={100} correspondance={notes} columns={notes.evaluations} rows={notes.eleves} />
                                </div>
                            </div>
                        )
                    }
                    

                </>
        }
    </>
  )
}

export default PageNotes
