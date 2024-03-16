import React from 'react'
import { ChronosButtonCont } from './ChronosButtonElements'

const ChronosButton = ({ action, id, text, type }) => {
  return (
    <ChronosButtonCont onClick={action} id={id} type={type}>
        { text }
    </ChronosButtonCont>
  )
}

export default ChronosButton
