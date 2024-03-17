import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { authService } from '../services/authService';
import Calendar from '../components/Calendar';
import "../css/stylePageEdt.css";

const PageEdt = () => {
  const [userEmail, setUserEmail] = useState();
  const [userRoles, setUserRoles] = useState();
  const [currentRole, setCurrentRole] = useState();
  const [currentWeek, setCurrentWeek] = useState([]);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;

    // Mettre à jour le local storage avec le nouveau rôle sélectionné
    authService.setCurrentRole(selectedRole);
    setCurrentRole(selectedRole);

    authService.setCurrentRoleId(userRoles[selectedRole]);
  };

  useEffect(() => {
    const roles = authService.getUserRoles()
    setUserRoles(roles)

    const currentRole = authService.getCurrentRole()
    setCurrentRole(currentRole)

    const email = authService.getUserEmail()
    setUserEmail(email)
  }, []);

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
    axios.get("http://localhost:5000/eleves/1/cours").then((response) => { //si tu veux voir tout les cours --> http://localhost:5000/cours
      setListCours(response.data)
    })
  }, []);

  // Fonction pour obtenir le libellé du jour de la semaine
  function getDayLabel(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDay();
    const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    return dayNames[day];
  }

  // Fonction pour obtenir le numéro de la semaine à partir d'une date
  Date.prototype.getWeekNumber = function () {
    const date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  // Fonction pour obtenir le label du mois à partir d'une date (Janvier, Février, etc...)
  Date.prototype.getMonthLabel = function () {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return monthNames[this.getMonth()];
  };


  // Fonction pour organiser les cours dans une structure hiérarchique
  function organizeCoursesByDate(courses) {
    const organizedData = {};

    // On parcours chaque cours de la BDD
    courses.forEach(cours => {
      const date = new Date(cours.debutCours);
      const year = date.getFullYear();
      const month = date.getMonthLabel();
      const week = date.getWeekNumber();
      const day = getDayLabel(cours.debutCours);

      // Initialiser les champs de la structure s'ils n'existent pas déjà
      if (!organizedData[year]) organizedData[year] = {};
      if (!organizedData[year][month]) organizedData[year][month] = {};
      if (!organizedData[year][month][week]) organizedData[year][month][week] = {};
      if (!organizedData[year][month][week][day]) organizedData[year][month][week][day] = [];
      
      organizedData[year][month][week][day].push({
        title: cours.libelle,
        room: 169, //il faut qu'on ajoute le numéro de la salle dans la BDD
        startHour: cours.debutCours,
        duration: cours.duree,
        color: cours.color,
      });
    });

    return organizedData;
  }
  const organizedCourses = organizeCoursesByDate(listCours);

  return (
      <>
          {/* <div className='MonthSelector'></div> */}
          <p>Ceci est votre role courant: {currentRole}</p>
          <div>
          <label htmlFor="roleSelector">Sélecteur de role: </label>
          <select id="roleSelector" value={currentRole} onChange={handleRoleChange}>
              {Object.keys(userRoles ?? {}).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
          </select>
        </div>
          <div className='calendarCont'>
            <Calendar weekdata={weekLst} onWeekChange={handleWeekChange} />
          </div>
      </>
  )
}

export default PageEdt
