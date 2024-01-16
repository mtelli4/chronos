import React, { useState, useEffect } from 'react';

function Agenda({listCours}) {
  
  return (<>
    <div>
          {listCours.map((cours, index) => {
              return ( 
                <div>
                  <p>Libellé: {cours.libelle}</p>
                  <p>Durée: {cours.duree}</p>
                  <p>Horaire: {cours.horaire}</p>
                  <hr></hr>
                </div>
              )
          })}
    </div>
    </>);
}

export default Agenda;
