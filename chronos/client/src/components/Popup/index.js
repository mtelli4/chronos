import React from 'react'
import { PopupCont, PopupScreen, PopupClose, PopupCloseImg } from './PopupElements'
import close from "../../images/cross-icon.svg";

const Popup = ({ html, isActive, format, setIsActive }) => { // "landscape" || "square" 
  return (
    <>
        <PopupScreen isActive={isActive}>
            <PopupCont format={format} isActive={isActive}>
                <PopupClose onClick={() => setIsActive(false)}>
                  <PopupCloseImg src={close} />
                </PopupClose>
                { html }
            </PopupCont>
        </PopupScreen>
    </>
  )
}

export default Popup
