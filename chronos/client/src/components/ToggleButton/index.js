import React from 'react'
import { ButtonToggleCont, ButtonToggleImg, ButtonToggleText, ButtonToggleWrap } from './ToggleButtonElements'

const ToggleButton = ({ src, action, text }) => {
    const [showText, setShowText] = React.useState(false);

  return (
    <ButtonToggleWrap>
        <ButtonToggleCont onMouseEnter={() => setShowText(true)} onMouseLeave={() => setShowText(false)} onClick={action}>
            <ButtonToggleImg src={src} />
        </ButtonToggleCont>

        <ButtonToggleText isVisible={showText}>{text}</ButtonToggleText>
    </ButtonToggleWrap>
  )
}

export default ToggleButton
