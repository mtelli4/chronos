import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { authService } from '../services/authService';
import Calendar from '../components/Calendar';
import "../css/stylePageEdt.css";

const PageEdt = () => {
  const [userEmail, setUserEmail] = useState();
  const [organizedCourses, setOrganizedCourses] = useState([])
  const role = authService.getCurrentRole();
  const roleId = authService.getCurrentRoleId();
  const [year, setYear] = useState((new Date()).getFullYear())

  useEffect(() => {
    const email = authService.getUserEmail()
    setUserEmail(email)
  }, []);


  function handleWeekChange(type) {
    console.log("%c" + type, "color: red; font-size: 40px;");
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/cours/${role}/${roleId}/${year}`)
      .then((response) => { //si tu veux voir tout les cours --> http://localhost:5000/cours
        console.log("DATA: " + JSON.stringify(response.data))
        setOrganizedCourses(organizeCoursesByDate(response.data))
      }).catch(error => {
        console.log("error while loading courses")
      });
  }, [year]);

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
    // const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[this.getMonth()];
  };

  Date.prototype.getMonthNumber = function () {
    return this.getMonth() + 1;
  };

  // Fonction pour organiser les cours dans une structure hiérarchique
  function organizeCoursesByDate(courses) {
    const organizedData = {};

    // Process courses and populate data structure

    // Add years without courses and populate empty months and weeks
    const yearsWithNoCourses = Array.from(new Set(courses.map(cours => new Date(cours.debutCours).getFullYear())));
    yearsWithNoCourses.forEach(year => {
      if (!organizedData[year]) organizedData[year] = {};

      const allMonths = Array.from({ length: 12 }, (_, i) => new Date(year, i).getMonthNumber());
      allMonths.forEach(month => {
        if (!organizedData[year][month]) organizedData[year][month] = {};

        const weeksInMonth = getWeeksInMonth(year, month);

        for (let i = 0; i < weeksInMonth.length; i++) {
          if (!organizedData[year][month][weeksInMonth[i]]) {
            organizedData[year][month][weeksInMonth[i]] = {};
          }
          // Add days from Monday to Saturday for the week
          const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
          daysOfWeek.forEach(day => {
            if (!organizedData[year][month][weeksInMonth[i]][day]) {
              organizedData[year][month][weeksInMonth[i]][day] = [];
            }
          });
        }
      });
    });

    courses.forEach(cours => {
      const date = new Date(cours.debutCours);
      const year = date.getFullYear();
      const month = date.getMonthNumber();
      const week = date.getWeekNumber();
      const day = getDayLabel(cours.debutCours); // Assuming getDayLabel exists and returns day label

      // Initialize data structure
      if (!organizedData[year]) organizedData[year] = {};
      if (!organizedData[year][month]) organizedData[year][month] = {};
      if (!organizedData[year][month][week]) organizedData[year][month][week] = {};
      organizedData[year][month][week][day] = organizedData[year][month][week][day] || [];
      console.log("COURS: " + JSON.stringify(cours))
      organizedData[year][month][week][day].push({
        title: cours.libelle,
        room: 169, // Replace with actual room number
        startHour: cours.debutCours,
        duration: cours.duree,
        color: cours.color,
        professors: cours.Professeurs
      });
    });
    return organizedData;
  }


  function getWeeksInMonth(year, month) {
    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);
    const weeks = [];
    for (let i = firstDate.getDate(); i <= lastDate.getDate(); i++) {
      const date = new Date(year, month - 1, i);
      const weekNumber = date.getWeekNumber();
      weeks.push(weekNumber);
    }
    const data = weeks.filter((element, index) => weeks.indexOf(element) === index);;
    return data;
  }
  return (
    <>
      {/* <div className='MonthSelector'></div> */}
      <div className='calendarCont'>
        <Calendar weekdata={organizedCourses} onWeekChange={handleWeekChange} setYear={setYear} year={year} />
      </div>
    </>
  )
}

export default PageEdt
