import React from 'react'
import { ChronosButtonCont } from './ChronosButtonElements'

const ChronosButton = ({ id, text, type }) => {
  return (
    <ChronosButtonCont id={id} type={type}>
        { text }
    </ChronosButtonCont>
  )
}

export default ChronosButton
