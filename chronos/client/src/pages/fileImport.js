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

  const validationSchema = Yup.object().shape({
      formationId: Yup.number().required("Ce champ est obligatoire."),
      file: Yup.mixed().required('Ce fichier est obligatoire')
  })

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleImport = (data) => {
    console.log("THIS IS DATA")
    console.log(data)
    if (file) {
      // Vérifier le type de fichier
      const fileType = file.type;

      if (fileType === 'application/vnd.ms-excel' || fileType === 'text/csv') {
        // Traitement des fichiers CSV avec papaparse
        Papa.parse(file, {
          complete: (result) => {
            console.log('Données CSV:', result.data);
            //requête post axios
            axios.post("http://localhost:5000/eleves/insertListEleves", result.data)
            .then((response) => {
                console.log("Succès")
                console.log(response)
                //APPARITION POP UP DE CONFIMATION A CUSTOM("Votre liste a été importée avec succès !")
                alert("Votre liste a été importée avec succès!");
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
          console.log('Données Excel (XLSX):', jsonDataObjects);
          axios.post("http://localhost:5000/eleves/insertListEleves", jsonDataObjects)
            .then((response) => {
                console.log("Succès")
                console.log(response)
                //APPARITION POP UP DE CONFIMATION A CUSTOM("Votre liste a été importée avec succès !")
                alert("Votre liste a été importée avec succès!");
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
    <div className="importStudentsContainer">
        <p>Veuillez importer un fichier calc (.csv ou .xls) de votre liste d'élève.</p>
        <Formik initialValues={initialValues} onSubmit={handleImport} validationSchema={validationSchema}>
          <Form className="formContainer">
              <label>Formations</label>
              <ErrorMessage name="formationId" component="span"/>
              <Field as="select" name="formationId">
                  <option disabled value="">Sélectionnez la formation</option>
                  {formations.map(formation => (
                      <option value={formation.id}>{formation.libelle}</option>
                  ))}
              </Field>
            <input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
            <button id="importStudents" onClick={handleImport}>Importer</button>{/*A modifier pour avoir un vrai submit*/}
          </Form>
        </Formik>
    </div>
  );
};

export default FileImport;
