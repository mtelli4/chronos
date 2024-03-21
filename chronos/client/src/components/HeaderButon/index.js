import React from 'react'
import { HeaderButtonSquare, HeaderButtonBar, HeaderButtonCont } from './HeaderButtonElements';

const HeaderButton = ({ actionOnClick }) => {

    const [isHovered, setIsHovered] = React.useState(false);

  return (
    <HeaderButtonCont onClick={actionOnClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
        <HeaderButtonSquare isHovered={isHovered} i={0}></HeaderButtonSquare>
        <HeaderButtonSquare isHovered={isHovered} i={1}></HeaderButtonSquare>
        <HeaderButtonSquare isHovered={isHovered} i={2}></HeaderButtonSquare>
        <HeaderButtonBar isHovered={isHovered} i={2}></HeaderButtonBar>
    </HeaderButtonCont>
  )
}

export default HeaderButton
