import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Calendar from '../components/Calendar';
import "../css/stylePageEdt.css";

const PageEdt = () => {

  const [currentWeek, setCurrentWeek] = useState([]);

    let weekLst = 
    [
      {
        day: "Lundi",
        classes: [
          {
            title: "Maintenance applicative", // Recup depuis la bdd
            room: "IUC - Blaise Pascal", // Recup depuis la bdd
            // autres infos
            startHour: "13h30", // Recup depuis la bdd
            duration: 4, // en heures
            color: "#2D8F4E",
          },
        ],
      },
      {
        day: "Mardi",
        classes: [
          {
            title: "Virtualisation avancée", // Recup depuis la bdd
            room: "IUC - 255/256", // Recup depuis la bdd
            // autres infos
            startHour: "08h15", // Recup depuis la bdd
            duration: 4, // en heures
            color: "#BD2727",
          },
          {
            title: "Communication : organisation et diffusion de l'information", // Recup depuis la bdd
            room: "IUC - 203", // Recup depuis la bdd
            // autres infos
            startHour: "13h30", // Recup depuis la bdd
            duration: 2, // en heures
            color: "#000000",
          },
          {
            title: "Projet personnel et professionnel", // Recup depuis la bdd
            room: "IUC - 203", // Recup depuis la bdd
            // autres infos
            startHour: "15h45", // Recup depuis la bdd
            duration: 2, // en heures
            color: "#7D3099",
          },
        ],
      },
      {
        day: "Mercredi",
        classes: [
          {
            title: "Virtualisation avancée", // Recup depuis la bdd
            room: "IUC - 255/256", // Recup depuis la bdd
            // autres infos
            startHour: "08h15", // Recup depuis la bdd
            duration: 4, // en heures
            color: "#BD2727",
          },
          {
            title: "Initialisation à l'entrepreunariat", // Recup depuis la bdd
            room: "IUC - 255/256", // Recup depuis la bdd
            // autres infos
            startHour: "13h30", // Recup depuis la bdd
            duration: 4, // en heures
            color: "#3275B0",
          },
        ],
      },
      {
        day: "Jeudi",
        classes: [
          {
            title: "Virtualisation avancée", // Recup depuis la bdd
            room: "IUC - 255/256", // Recup depuis la bdd
            // autres infos
            startHour: "08h15", // Recup depuis la bdd
            duration: 4, // en heures
            color: "#BD2727",
          },
          {
            title: "Droit du numérique et de la propriété intellectuelle", // Recup depuis la bdd
            room: "IUC - 255/256", // Recup depuis la bdd
            // autres infos
            startHour: "13h30", // Recup depuis la bdd
            duration: 4, // en heures
            color: "#192C6D",
          },
        ],
      },
      {
        day: "Vendredi",
        classes: [
          {
            title: "SAE : Soutenance - Développement avancé suivi", // Recup depuis la bdd
            room: "IUC - 161", // Recup depuis la bdd
            // autres infos
            startHour: "10h30", // Recup depuis la bdd
            duration: 2, // en heures
            color: "#CA630E",
          },
        ],
      },
    ];
    
    //setCurrentWeek(weekLst);

    function handleWeekChange(type) {
      console.log("%c" + type, "color: red; font-size: 40px;");
    }

    const [listCours, setListCours] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/cours").then((response) => {
        setListCours(response.data)
      })
    }, []);

    return (
        <>
            {/* <div className='MonthSelector'></div> */}
            <div className='calendarCont'>
              <Calendar weekdata={weekLst} onWeekChange={handleWeekChange} />
            </div>
        </>
    )
}

export default PageEdt
