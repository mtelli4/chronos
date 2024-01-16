import React from 'react'
import Calendar from '../components/Calendar';

const PageEdt = () => {

    let weekLst = 
    [
      {
        day: "Lundi",
        classes: [
          {
            title: "Dépression", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "08h00", // Recup depuis la bdd
            duration: 1, // en heures
          },
        ],
        // classes: [
        //   {
        //     title: "Optimisation mes couilles", // Recup depuis la bdd
        //     room: "IUC - 255 / 256", // Recup depuis la bdd
        //     // autres infos
        //     startHour: "08h00", // Recup depuis la bdd
        //     duration: 2, // en heures
        //   },
        //   {
        //     title: "Optimisation mes couilles 2", // Recup depuis la bdd
        //     room: "IUC - 255 / 256", // Recup depuis la bdd
        //     // autres infos
        //     startHour: "10h45", // Recup depuis la bdd
        //     duration: 2, // en heures
        //   },
        //   {
        //     title: "Optimisation mes couilles", // Recup depuis la bdd
        //     room: "IUC - 255 / 256", // Recup depuis la bdd
        //     // autres infos
        //     startHour: "15h45", // Recup depuis la bdd
        //     duration: 2, // en heures
        //   },
        // ],
      },
      {
        day: "Mardi",
        classes: [
          {
            title: "Optimisation mes couilles", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "08h15", // Recup depuis la bdd
            duration: 4.5, // en heures
          },
          {
            title: "Optimisation mes couilles 2", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "13h30", // Recup depuis la bdd
            duration: 2, // en heures
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
            duration: 4.25, // en heures
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
          },
          {
            title: "Optimisation mes couilles 2", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "10h30", // Recup depuis la bdd
            duration: 1.25, // en heures
          },
          {
            title: "Optimisation mes couilles", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "15h45", // Recup depuis la bdd
            duration: 2, // en heures
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
            startHour: "10h45", // Recup depuis la bdd
            duration: 2, // en heures
          },
          {
            title: "Optimisation mes couilles", // Recup depuis la bdd
            room: "IUC - 255 / 256", // Recup depuis la bdd
            // autres infos
            startHour: "15h45", // Recup depuis la bdd
            duration: 2, // en heures
          },
        ],
      },
    ];

    return (
        <>
            <Calendar weekdata={weekLst} />
        </>
    )
}

export default PageEdt
