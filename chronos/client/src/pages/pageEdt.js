import React, { useState, useEffect } from 'react'
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
            title: "Dépression", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "08h15", // Recup depuis la bdd
            duration: 2, // en heures
            color: "#000000",
          },
          {
            title: "Maintenance applicative", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "13h30", // Recup depuis la bdd
            duration: 4, // en heures
            color: "#000000",
          },
        ],
      },
      {
        day: "Mardi",
        classes: [
          {
            title: "Optimisation d'application", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "08h15", // Recup depuis la bdd
            duration: 4.5, // en heures
            color: "#000000",
          },
          {
            title: "Développement d'application", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "13h30", // Recup depuis la bdd
            duration: 4, // en heures
            color: "#000000",
          }
        ],
      },
      {
        day: "Mercredi",
        classes: [
          {
            title: "Optimisation mes couilles 2", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "13h30", // Recup depuis la bdd
            duration: 0.5, // en heures
            color: "#000000",
          },
        ],
      },
      {
        day: "Jeudi",
        classes: [
          {
            title: "Optimisation mes couilles", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "08h15", // Recup depuis la bdd
            duration: 2, // en heures
            color: "#000000",
          },
          {
            title: "Optimisation mes couilles 2", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "10h30", // Recup depuis la bdd
            duration: 1.25, // en heures
            color: "#000000",
          },
          {
            title: "Optimisation mes couilles", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "15h45", // Recup depuis la bdd
            duration: 2.5, // en heures
            color: "#000000",
          },
        ],
      },
      {
        day: "Vendredi",
        classes: [
          {
            title: "Optimisation mes couilles 2", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "07h45", // Recup depuis la bdd
            duration: 2.5, // en heures
            color: "#000000",
          },
          {
            title: "Optimisation mes couilles", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "15h45", // Recup depuis la bdd
            duration: 1.5, // en heures
            color: "#000000",
          },
        ],
      },
    ];
    
    //setCurrentWeek(weekLst);

    function handleWeekChange(type) {
      console.log("%c" + type, "color: red; font-size: 40px;");
    }

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
