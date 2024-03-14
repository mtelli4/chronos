import React from 'react'

const PopupAddEval = () => {
  return (
    <>
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
                        <option defaultValue value=''>Sélectionner une période</option>
                        {periodes.map(periode => (
                            <option value={parseInt(periode.id)}>{periode.id}.{periode.libelle}</option>
                        ))}
                    </Field>
                    <ChronosButton id="insertEvaluation" text="Confirmer" type="submit" />
                    <FormObserver />
                </Form>
            </Formik>
    </>
  )
}

export default PopupAddEval
