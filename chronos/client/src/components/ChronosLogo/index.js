import React from 'react';
import chronosC from "../../images/chronos-c.svg";
import { ChronosC, ChronosLogoCont, ChronosText, ChronosTextCont } from './ChronosLogoElements';

const ChronosLogo = ({ fontsize, onMedia }) => { // fontsize en rem / onMedi = {min: 500px, fontsize: 2}
  return (
    <ChronosLogoCont to="/">
        <ChronosC fontsize={fontsize} onMedia={onMedia} src={chronosC}/>
        <ChronosTextCont>
            <ChronosText onMedia={onMedia} fontsize={fontsize}>hronos</ChronosText>
        </ChronosTextCont>
    </ChronosLogoCont>
  )
}

export default ChronosLogo
