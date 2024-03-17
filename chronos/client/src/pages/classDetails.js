import React from 'react';
import "../css/styleClassDetails.css";
import { ajouterDuree } from "../js/calendar_script";
import { ajusterCouleur, hexToRgb } from '../js/calendar_script';

// Content de la popup calendar
const ClassDetails = ({ title, heureDebut, duree, informations, color }) => {
    
    const couleurFroid = ajusterCouleur(color, false);
    const couleurChaud = ajusterCouleur(couleurFroid, true);
    const couleurOriginaleRGB = hexToRgb(color);

  return (
    <>
        <div style={{background : "linear-gradient(" + couleurChaud + "," + couleurFroid + ")"}} className='leftBorder'></div>

        <div className='classDetailsCont' style={{color : couleurFroid, background : "rgba(" + couleurOriginaleRGB.r + "," +  couleurOriginaleRGB.g + "," + couleurOriginaleRGB.b + "," + "0.5)"}}>
            <div className='classDetailsTitle'>
                <h2>{title}</h2>
                <p>{heureDebut} - {ajouterDuree(heureDebut, duree, false)}</p>
            </div>

            <div className='classDetailsInfo'>
                <ul>
                    {informations.map((item) => (
                        <li>{item}</li>
                    ))}
                </ul>

                <div className='classDetailsChatCont'></div>
            </div>
        </div>
    </>
  )
}

export default ClassDetails
