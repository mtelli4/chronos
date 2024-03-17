import React from 'react'
import { ChronosInputSelectCont, ChronosInputSelectErrorMessage, ChronosInputSelectField, ChronosInputSelectLabel, ChronosInputSelectOption } from './ChronosInputSelectElements'

const ChronosInputSelect = ({ defaultLabel, label, name, options }) => {
  return (
    <ChronosInputSelectCont>
        <ChronosInputSelectLabel htmlFor={name}>{label}</ChronosInputSelectLabel>
        <ChronosInputSelectErrorMessage name={name} component="span"/>

        <ChronosInputSelectField component="select" name={name}>

            <ChronosInputSelectOption defaultValue value="">
                {defaultLabel || "Sélectionnez la formation"}
            </ChronosInputSelectOption>

            {options.map(option => (
                <ChronosInputSelectOption value={parseInt(option.id)}>{option.libelle}</ChronosInputSelectOption>
            ))}
        </ChronosInputSelectField>
    </ChronosInputSelectCont>
  )
}

export default ChronosInputSelect
