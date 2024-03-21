import React, { useState } from 'react';
import { ChronosInputFieldCont, ChronosEye, ChronosInputCont, ChronosInputErrorMessage, ChronosInputField, ChronosInputTitle } from './ChronosInputElements';
import eyeOpened from "../../images/eye-opened-icon.png";
import eyeClosed from "../../images/eye-closed-icon.png";

const ChronosInput = ({ placeholder, width, height, type, name, title, component, value, onChange }) => {

  const [eyeIcon, setEyeIcon] = useState(eyeClosed);

  function handleClick() {
    if (eyeIcon == eyeOpened) {
      setEyeIcon(eyeClosed);
    } 
    
    else {
      setEyeIcon(eyeOpened);
    }
  }

  return (
    <ChronosInputCont width={width}>
        <ChronosInputTitle htmlFor={name}>{title}</ChronosInputTitle>
        <ChronosInputFieldCont>
          <ChronosInputField placeholder={placeholder} height={height} onChange={onChange} value={value} type={type == "password" ? (eyeIcon === eyeOpened ? "text" : type) : type} name={name}></ChronosInputField>
          {
            type == "password" ? (<ChronosEye onClick={() => {handleClick()}} src={eyeIcon} />) : ""
          }
        </ChronosInputFieldCont>
        <ChronosInputErrorMessage component={component} name={name}></ChronosInputErrorMessage>
    </ChronosInputCont>
  )
}

export default ChronosInput
