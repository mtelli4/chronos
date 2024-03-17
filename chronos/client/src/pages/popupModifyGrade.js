import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik"
import "../css/styleNotes.css";
import ChronosButton from '../components/ChronosButton';
import "../css/styleImportStudent.css";
import ChronosInput from '../components/ChronosInput';
import ChronosInputSelect from '../components/ChronosInputSelect';


const PopupModifyGrade = ({ evalName, eleveName }) => {
  return (
    <>
        <h3 className='importStudentTitle'>
            { eleveName + " - " + evalName }
        </h3>
    </>
  )
}

export default PopupModifyGrade
