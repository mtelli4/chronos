import React, { useState, useEffect } from 'react';

function getDayLabel(dateTimeString) {
  const date = new Date(dateTimeString);
  const day = date.getDay();
  const dayNames = ["Dimanche", "Lundi", "Mardi","Mercredi","Jeudi","Vendredi","Samedi"];

  return dayNames[day];
}

function Agenda({listCours}) {

  return (<>
    <div>
          {listCours.map((cours, index) => {
              return ( 
                <div>
                  <p>Jour: {getDayLabel(cours.debutCours)}</p>
                  <p>Libellé: {cours.libelle}</p>
                  <p>Durée: {cours.duree}</p>
                  <p>Horaire: {cours.debutCours}</p>
                  <hr></hr>
                </div>
              )
          })}
    </div>
    </>);
}

export default Agenda;
