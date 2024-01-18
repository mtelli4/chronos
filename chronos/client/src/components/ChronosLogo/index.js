import React from 'react';
import chronosC from "../../images/chronos-c.svg";
import { ChronosC, ChronosLogoCont, ChronosText, ChronosTextCont } from './ChronosLogoElements';

const ChronosLogo = ({ fontsize }) => { // fontsize en rem
  return (
    <ChronosLogoCont to="/">
        <ChronosC fontsize={fontsize} src={chronosC}/>
        <ChronosTextCont>
            <ChronosText fontsize={fontsize}>hronos</ChronosText>
        </ChronosTextCont>
    </ChronosLogoCont>
  )
}

export default ChronosLogo
