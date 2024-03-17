import React from 'react'
import { ChronosButtonCont } from './ChronosButtonElements'

const ChronosButton = ({ width, height, action, id, text, type }) => {
  return (
    <ChronosButtonCont width={width} height={height} onClick={action} id={id} type={type}>
        { text }
    </ChronosButtonCont>
  )
}

export default ChronosButton
