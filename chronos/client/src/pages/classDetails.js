import React, { useEffect, useState } from 'react'
import "../css/styleClassDetails.css"
import { ajouterDuree, ajouterDureeDate } from "../js/calendar_script"
import MessageApp from './messages';

// Content de la popup calendar
const ClassDetails = ({ coursId, title, professors, heureDebut, duree, informations, color, moduleId }) => {

    function ajusterCouleur(hexCode, versChaud = true) {
        // Conversion du code hexadécimal en valeurs R, G, B
        const r = parseInt(hexCode.slice(1, 3), 16);
        const g = parseInt(hexCode.slice(3, 5), 16);
        const b = parseInt(hexCode.slice(5, 7), 16);
    
        // Conversion RGB vers HSL
        let hsl = rgbToHsl(r, g, b);
    
        // Ajustement selon les spécifications
        if (versChaud) {
            // Se rapprocher des couleurs chaudes
            hsl[0] = (hsl[0] + 30) % 360;  // Augmenter la teinte
            hsl[1] = Math.max(0, hsl[1] - 10);  // Diminuer la saturation
            hsl[2] = Math.min(100, hsl[2] + 30);  // Augmenter la luminosité
        } else {
            // Se rapprocher des couleurs froides
            hsl[0] = (hsl[0] - 30 + 360) % 360;  // Diminuer la teinte
            hsl[1] = Math.min(100, hsl[1] + 35);  // Augmenter la saturation
            hsl[2] = Math.max(0, hsl[2] - 20);  // Diminuer la luminosité
        }
    
        // Conversion HSL vers RGB
        let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
    
        // Formatage des valeurs RGB en code hexadécimal
        const newHexCode = rgbToHex(rgb[0], rgb[1], rgb[2]);
    
        return newHexCode;
    }
    
    // Fonction pour convertir RGB en HSL
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max === min) {
            h = s = 0;  // Achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
    
        return [h * 360, s * 100, l * 100];
    }
    
    // Fonction pour convertir HSL en RGB
    function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
    
        if (s === 0) {
            r = g = b = l;  // Achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
    
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
    
        return [r * 255, g * 255, b * 255];
    }
    
    // Fonction pour convertir RGB en code hexadécimal
    function rgbToHex(r, g, b) {
        return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
    }

    function hexToRgb(hexCode) {
        // Supprimer le caractère '#' s'il est présent
        hexCode = hexCode.replace(/^#/, '');
    
        // Convertir les composantes hexadécimales en valeurs décimales
        const r = parseInt(hexCode.substring(0, 2), 16);
        const g = parseInt(hexCode.substring(2, 4), 16);
        const b = parseInt(hexCode.substring(4, 6), 16);
    
        // Retourner un objet avec les composantes RGB
        return { r, g, b };
    }
    
    const couleurFroid = ajusterCouleur(color, false);
    const couleurChaud = ajusterCouleur(couleurFroid, true);
    const couleurOriginaleRGB = hexToRgb(color);

    function formatterNombreAvecZero(n) {
        return n < 10 ? '0' + n : '' + n;
    }

  return (
    <>
        <div style={{background : "linear-gradient(" + couleurChaud + "," + couleurFroid + ")"}} className='leftBorder'></div>

        <div className='classDetailsCont' style={{color : couleurFroid, background : "rgba(" + couleurOriginaleRGB.r + "," +  couleurOriginaleRGB.g + "," + couleurOriginaleRGB.b + "," + "0.5)"}}>
            <div className='classDetailsTitle'>
                <h2>{title}</h2>
                <p>{heureDebut.getUTCHours()}H{formatterNombreAvecZero(heureDebut.getUTCMinutes())} - {ajouterDureeDate(heureDebut, duree, false).getUTCHours()}H{formatterNombreAvecZero(ajouterDureeDate(heureDebut, duree, false).getUTCMinutes())}</p>
            </div>

            {professors?.map((professor) => (
                <>
                    <p>{professor.Utilisateur?.nom} {professor.Utilisateur?.prenom}</p>
                </>
                
            ))}
            <div className='classDetailsInfo'>
            
                <ul>
                    {informations.map((item) => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
            
            <div className='classDetailsChatCont'>
                <MessageApp coursId={coursId} moduleId={moduleId} />
            </div>
        </div>
    </>
  )
}

export default ClassDetails
