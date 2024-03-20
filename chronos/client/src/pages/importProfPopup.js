import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup";
import "../css/styleImportStudent.css"
import ChronosInputSelect from '../components/ChronosInputSelect';
import ChronosInputFile from '../components/ChronosInputFile';
import ChronosButton from '../components/ChronosButton';

const ImportProfPopup = ({ initialValues, validationSchemaStudent, formations, handleFileChange, handleImport }) => {
  return (
    <>
        <div className='importStudentCont'>
            <h3 className='importStudentTitle'>Importer des professeurs</h3>
            
            <Formik initialValues={initialValues} validationSchema={validationSchemaStudent}>
              <Form className="importStudentFormCont">
                <a className='importStudentLink' href="/import_professeur_vierge.xlsx" download>
                  Modèle d'import de professeurs
                </a>

                {/* compo file */}
                <h4 className='importStudentSubTitle'>Liste</h4>
                <ChronosInputFile name="test" accept={".csv, .xls, .xlsx"} handleFileChange={handleFileChange} />
                
                <ChronosButton id="importStudents" text="Importer" type="submit" action={() => handleImport(2)} />
              </Form>
            </Formik>
        </div>
    </>
  )
}

export default ImportProfPopup
