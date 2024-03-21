import React from 'react'
import { ChronosButtonCont } from './ChronosButtonElements'

const ChronosButton = ({ border, font, width, height, action, id, text, type }) => {
  return (
    <ChronosButtonCont border={border} font={font} width={width} height={height} onClick={action} id={id} type={type}>
        { text }
    </ChronosButtonCont>
  )
}

export default ChronosButton
