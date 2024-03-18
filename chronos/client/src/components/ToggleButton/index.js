import React from 'react'
import { ButtonToggleCont, ButtonToggleImg, ButtonToggleText, ButtonToggleWrap } from './ToggleButtonElements'

const ToggleButton = ({ type, src, action, text }) => {
    const [showText, setShowText] = React.useState(false);

  return (
    <ButtonToggleWrap>
        <ButtonToggleCont type={type} onMouseEnter={() => setShowText(true)} onMouseLeave={() => setShowText(false)} onClick={() => action()}>
            <ButtonToggleImg src={src} />
        </ButtonToggleCont>

        <ButtonToggleText isVisible={showText}>{text}</ButtonToggleText>
    </ButtonToggleWrap>
  )
}

export default ToggleButton
