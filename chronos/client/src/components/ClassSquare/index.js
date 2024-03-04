import React from 'react';
import { ClassSquareCont, ClassSquareTitle, ClassSquareRoom, ClassSquareBorder, ClassSquareTextCont } from './classSquareElements'; 
import { ajouterDuree, ajusterCouleur, hexToRgb } from "../../js/calendar_script";

const ClassSquare = ({ color, title, room, startTopPercent, duration, onSelect }) => {
    
    const couleurFroid = ajusterCouleur(color, false);
    const couleurChaud = ajusterCouleur(couleurFroid, true);
    const couleurOriginaleRGB = hexToRgb(color);
    
  return (
    <ClassSquareCont onClick={() => onSelect()} duration={duration} starttoppercent={startTopPercent} r={couleurOriginaleRGB.r} g={couleurOriginaleRGB.g} b={couleurOriginaleRGB.b}>
        <ClassSquareBorder clr1={couleurChaud} clr2={couleurFroid} />
        <ClassSquareTextCont color={couleurFroid}>
            <ClassSquareTitle>{title}</ClassSquareTitle>
            <ClassSquareRoom>{room}</ClassSquareRoom>
        </ClassSquareTextCont>
    </ClassSquareCont>
  )
}

export default ClassSquare
