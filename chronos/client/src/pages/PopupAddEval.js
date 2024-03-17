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
            <Formik initialValues={initialValuesInsertEval} onSubmit={onSubmitInsertEval} validationSchema={validationSchemaInsert} enableReinitialize>
                <Form className='addEvalForm'>
                    <div>
                    <h4 className='addEvalSubTitle'>Libellé</h4>
                    <ChronosInput width={"45%"} type={"text"} name={"libelle"} title="" component="div" />
                    </div>

                    <div>
                    <h4 className='addEvalSubTitle'>Coefficient</h4>
                    <ChronosInput width={"15%"} type={"number"} name={"coefficient"} title="" component="div" />
                    </div>
                    <div>
                    <h4 className='addEvalSubTitle'>Note maximale</h4>
                    <ChronosInput width={"15%"} type={"number"} name={"noteMaximale"} title="" component="div" />
                    </div>

                    <div>
                    <h4 className='addEvalSubTitle'>Période</h4>
                    <ChronosInputSelect defaultLabel="Sélectionner une période" name="periodeId" options={periodes} />
                    </div>

                    <div className='addEvalButtonCont'>
                      <ChronosButton width={"150px"} height={"40px"} id="insertEvaluation" text="Confirmer" type="submit" />
                    </div>
                    <FormObserver />
                </Form>
            </Formik>
            }
    </>
  )
}

export default PopupAddEval
