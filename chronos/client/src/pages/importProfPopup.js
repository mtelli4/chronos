import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup";
import "../css/styleImportStudent.css"
import ChronosInputSelect from '../components/ChronosInputSelect';
import ChronosInputFile from '../components/ChronosInputFile';

const ImportProfPopup = () => {
  return (
    <>
        <div className='importStudentCont'>
            <h3 className='importStudentTitle'>Importer des professeurs</h3>

            <Formik initialValues={initialValues} validationSchema={validationSchemaStudent}>
              <Form className="importStudentFormCont">
                {/* compo file */}
                <h4 className='importStudentSubTitle'>Liste</h4>
                <ChronosInputFile name="test" accept={".csv, .xls, .xlsx"} handleFileChange={handleFileChange} />
                
                <button id="importTeachers" type="submit" onClick={() => handleImport(1)}>Importer</button>
              </Form>
            </Formik>
        </div>
    </>
  )
}

export default ImportProfPopup
