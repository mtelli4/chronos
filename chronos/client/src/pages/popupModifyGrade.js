import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik"
import * as Yup from "yup";
import "../css/styleNotes.css";
import ChronosButton from '../components/ChronosButton';
import "../css/styleImportStudent.css";
import ChronosInput from '../components/ChronosInput';
import ChronosInputSelect from '../components/ChronosInputSelect';


const PopupModifyGrade = ({ eleveName, evalName, currentGrade, currentStatusId, maxGradeEval, onDelete, onSubmit, statusList }) => {
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    setInitialValues({ grade: currentGrade, statusId: currentStatusId })
  }, [currentGrade, currentStatusId])

  const validationSchema = Yup.object().shape({
    grade: Yup.number().nullable(),
    statusId: Yup.number().integer().nullable(),
  })
  return (
    <>
      <h3 className='importStudentTitle'>
        {eleveName} - {evalName}
      </h3>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
        <Form className='addEvalForm'>
          <div>
            <h4 className='addEvalSubTitle'>Note /{maxGradeEval}</h4>
            <ChronosInput width={"45%"} type={"number"} name={"grade"} title="" component="div" />
          </div>
          <div>
            <h4 className='addEvalSubTitle'>Statut</h4>
            <ChronosInputSelect defaultLabel="Sélectionner un statut" name="statusId" options={statusList} />
          </div>
          <div className='addEvalButtonCont'>
            <ChronosButton width={"150px"} height={"40px"} id="insertGrade" text="Confirmer" type="submit" />
          </div>
          <div className='addEvalButtonCont'>
            <ChronosButton width={"150px"} height={"40px"} id="deleteGrade" text="Réinitialiser" action={onDelete} type="button"/>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default PopupModifyGrade
