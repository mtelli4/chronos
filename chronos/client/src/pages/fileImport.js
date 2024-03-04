import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup";

const FileImport = () => {
  const initialValues = {
    formationId:0,
    file:""
  }

  const validationSchemaStudent = Yup.object().shape({
      formationId: Yup.number().required("Ce champ est obligatoire."),
      file: Yup.mixed().required('Ce fichier est obligatoire')
  })

  const validationSchemaTeacher = Yup.object().shape({
      file: Yup.mixed().required('Ce fichier est obligatoire')
  })

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const validColumns = (columns, importType) => {
    var requiredKeys = null;

    switch (importType) {
      // Eleves
      case 1:
        requiredKeys = ['nom', 'prenom', 'email', 'numeroEtudiant', 'tiersTemps'];
        break;
      // Profs
      case 2:
        requiredKeys = ['nom', 'prenom', 'email', 'vacataire'];
        break;
      default:
        return false;
    }
    
    return requiredKeys.every(key => columns.includes(key));
  };

  const handleImport = (importType) => {
    if (file) {
      // Vérifier le type de fichier
      const fileType = file.type;

      if (fileType === 'application/vnd.ms-excel' || fileType === 'text/csv') {
        // Traitement des fichiers CSV avec papaparse
        Papa.parse(file, {
          complete: (result) => {
            const formData = {
              "data": result.data,
            };

            // Check if the excel has the right columns
            const columns = Object.keys(result.data[0]);

            if (validColumns(columns, importType) !== true) {
              alert("Le fichier ne possède pas les bons champs !");
              return;
            }

            var url = "http://localhost:5000/professeurs/insertListProfs";

            // Students import
            console.log(importType);
            if (importType === 1) {
              // Get formationId
              let formationSelect = document.getElementById('formationSelect').selectedOptions;
              let formationId;
              if (formationSelect.length > 0) {
                formationId = formationSelect[0].value;
              } else {
                formationId = null;
              }

              formData.formationId = formationId;

              url = "http://localhost:5000/eleves/insertListEleves";
            }

            //requête post axios
            axios.post(url, formData)
            .then((response) => {
              const errors = response.data.filter((obj) => Object.keys(obj).length !== 0);

              if (errors.length > 0) {
                const errorMessage = "Une erreur est survenue lors de l'import des élèves suivants : \n" + errors.map((error) => JSON.stringify(error, null, 2)).join('\n');;
                alert(errorMessage);
              } else {
                //APPARITION POP UP DE CONFIMATION A CUSTOM("Votre liste a été importée avec succès !")
                alert("Votre liste a été importée avec succès!");
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
                alert("Une erreur s'est produite lors de l'importation de la liste.");
            });
          },
          header: true, // si votre fichier CSV a des en-têtes de colonnes
        });
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Traitement des fichiers Excel (XLSX) avec la bibliothèque xlsx
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Récupérer la première feuille de calcul
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convertir la feuille de calcul en tableau JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log('Données Excel (XLSX):', jsonData);
          const jsonDataObjects = jsonData.slice(1).map((row) => {
            const obj = {};
            row.forEach((value, index) => {
              obj[jsonData[0][index]] = value;
            });
            return obj;
          });
          
          const formData = {
            "data": jsonDataObjects,
          };

          // Check if the excel has the right columns
          const columns = Object.keys(jsonData[0]);

          if (validColumns(columns, importType) !== true) {
            alert("Le fichier ne possède pas les bons champs !");
            return;
          }

          var url = "http://localhost:5000/professeurs/insertListProfs";

          // Students import
          if (importType === 1) {
            let formationSelect = document.getElementById('formationSelect').selectedOptions;
            let formationId;
            if (formationSelect.length > 0) {
              formationId = formationSelect[0].value;
            } else {
              formationId = null;
            }

            formData.formationId = formationId;

            url = "http://localhost:5000/eleves/insertListEleves";
          }
          
          console.log('Données Excel (XLSX):', jsonDataObjects);
          axios.post(url, formData)
            .then((response) => {
              const errors = response.data.filter((obj) => Object.keys(obj).length !== 0);

              if (errors.length > 0) {
                const errorMessage = "Une erreur est survenue lors de l'import des élèves suivants : \n" + errors.map((error) => JSON.stringify(error, null, 2)).join('\n');;
                alert(errorMessage);
              } else {
                //APPARITION POP UP DE CONFIMATION A CUSTOM("Votre liste a été importée avec succès !")
                alert("Votre liste a été importée avec succès!");
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
                alert("Une erreur s'est produite lors de l'importation de la liste.");
            });
        };

        reader.readAsArrayBuffer(file);
      } else {
        console.error('Type de fichier non pris en charge.');
      }
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  };

  const [formations, setFormations] = useState([])
    
  useEffect(() => {
      axios.get("http://localhost:5000/formations").then((response) => {
          setFormations(response.data)
      })
  }, [])
  
  return (
    <div>
      <div className="importStudentsContainer">
          <p>Veuillez importer un fichier calc (.csv ou .xlsx) de votre liste d'élèves.</p>
          <p>
            Télécharger un modèle{" "}
            <a href="/import_eleve_vierge.xlsx" download>
              Modèle d'import élève
            </a>
          </p>
          <Formik initialValues={initialValues} validationSchema={validationSchemaStudent}>
            <Form className="formContainer">
                <label>Formations</label>
                <ErrorMessage name="formationId" component="span"/>
                <Field as="select" id='formationSelect' name="formationId">
                    <option disabled value="">Sélectionnez la formation</option>
                    {formations.map(formation => (
                        <option value={formation.id}>{formation.libelle}</option>
                    ))}
                </Field>
              <input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
              <button id="importStudents" type="submit" onClick={() => handleImport(1)}>Importer</button>
            </Form>
          </Formik>
      </div>
      <div className="importTeachersContainer">
          <p>Veuillez importer un fichier calc (.csv ou .xls) de votre liste de professeurs.</p>
          <p>
            Télécharger un modèle{" "}
            <a href="/import_professeur_vierge.xlsx" download>
              Modèle d'import professeur
            </a>
          </p>
          <Formik initialValues={initialValues} validationSchema={validationSchemaTeacher}>
            <Form className="formContainer">
              <input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
              <button id="importTeachers" type="submit" onClick={() => handleImport(2)}>Importer</button>
            </Form>
          </Formik>
      </div>
    </div>
  );
};

export default FileImport;
