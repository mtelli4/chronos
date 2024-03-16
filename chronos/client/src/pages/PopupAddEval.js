import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik"
import "../css/styleNotes.css";
import ChronosButton from '../components/ChronosButton';
import "../css/styleImportStudent.css";
import ChronosInput from '../components/ChronosInput';
import ChronosInputSelect from '../components/ChronosInputSelect';

const  PopupAddEval = ({ formRef, initialValuesInsertEval, onSubmitInsertEval, validationSchemaInsert, periodes, FormObserver }) => {
  return (
    <>
        <h3 className='importStudentTitle'>
            Créer une évaluation
        </h3>
        {(!(typeof formRef.current === 'undefined')) &&
                        formRef.current != null &&
                        formRef.current.values.hasOwnProperty("moduleId") &&
                        formRef.current.values.moduleId != "" &&
            <Formik initialValues={initialValuesInsertEval} onSubmit={onSubmitInsertEval} validationSchema={validationSchemaInsert}>
                <Form>
                    <h4 className='addEvalSubTitle'>Libellé</h4>
                    <ChronosInput width={"33%"} type={"text"} name={"libelle"} title="" component="div" />

                    <h4 className='addEvalSubTitle'>Coefficient</h4>
                    <ChronosInput width={"33%"} type={"number"} name={"coefficient"} title="" component="div" />

                    <h4 className='addEvalSubTitle'>Note maximale</h4>
                    <ChronosInput width={"33%"} type={"number"} name={"noteMaximale"} title="" component="div" />

                    <h4 className='addEvalSubTitle'>Période</h4>
                    <ChronosInputSelect defaultLabel="Sélectionner une période" name="periodeId" options={periodes} />

                    <ChronosButton id="insertEvaluation" text="Confirmer" type="submit" />
                    <FormObserver />
                </Form>
            </Formik>
            }
    </>
  )
}

export default PopupAddEval
