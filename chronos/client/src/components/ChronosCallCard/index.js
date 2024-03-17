import React from 'react'
import ChronosInput from '../ChronosInput'

const ChronosCallCard = () => {
  return (
    <ChronosCallCardCont>
        <ChronosCallCardImg />
        <ChronosCallCardText>
            Idrissi Nidal
        </ChronosCallCardText>

        <ChronosInput type={"number"} id="lateTime"  />
    </ChronosCallCardCont>
  )
}

export default ChronosCallCard
