import React from 'react'
import { ChronosInputSelectCont, ChronosInputSelectErrorMessage, ChronosInputSelectField, ChronosInputSelectLabel, ChronosInputSelectOption } from './ChronosInputSelectElements'

const ChronosInputSelect = ({ label, name, options }) => {
  return (
    <ChronosInputSelectCont>
        <ChronosInputSelectLabel for={name}>{label}</ChronosInputSelectLabel>
        <ChronosInputSelectErrorMessage name={name} component="span"/>
        <ChronosInputSelectField as="select" name={name}>
            <ChronosInputSelectOption disabled value="">
                Sélectionnez la formation
            </ChronosInputSelectOption>

            {options.map(option => (
                <ChronosInputSelectOption value={option.id}>{option.libelle}</ChronosInputSelectOption>
            ))}

        </ChronosInputSelectField>
    </ChronosInputSelectCont>
  )
}

export default ChronosInputSelect
