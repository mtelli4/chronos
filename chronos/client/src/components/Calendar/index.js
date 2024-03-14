import React, { useState, useEffect, useRef } from 'react';
import {
  CalendarCont,
  CalendarDays,
  CalendarDay,
  CalendarMain,
  CalendarHours,
  CalendarHour,
  CalendarMainCol,
  CalendarButton,
  CalendarWeek
} from './calendarElements';
import ClassSquare from '../ClassSquare';
import { createDaysLst, createHoursLst, trouverHeuresExtremes } from '../../js/calendar_script';
import buttonPrev from "../../images/buttonPrev.svg";
import buttonAft from "../../images/buttonAft.svg";
import Popup from '../Popup';
import ClassDetails from '../../pages/classDetails';

const Calendar = ({ weekdata, onWeekChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState({ color: "#000000", title: "", duration: 0, startHour: "00h00", informations: [] });
  const [currentMonthIndex, setCurrentMonthIndex] = useState();
  const [currentWeekIndex, setCurrentWeekIndex] = useState();

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

  Date.prototype.getMonthNumber = function () {
    return this.getMonth() + 1;
  };

  const date = new Date();
  const currentYear = date.getFullYear();
  const month = date.getMonthNumber();
  const week = date.getWeekNumber();

  const [days, setDays] = useState([]);
  const [extremeHours, setExtremeHours] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {//INITIALISATION
    setCurrentWeekIndex(week)
    setCurrentMonthIndex(month)

    if (weekdata && weekdata[currentYear] && weekdata[currentYear][currentMonthIndex] && weekdata[currentYear][currentMonthIndex][currentWeekIndex]) {
      setDays(createDaysLst(weekdata[currentYear][currentMonthIndex][currentWeekIndex]));
      setExtremeHours(trouverHeuresExtremes(weekdata[currentYear][currentMonthIndex][currentWeekIndex]));
    }
    console.log(weekdata);
  }, [weekdata]);

  useEffect(() => {
    if (extremeHours.length !== 0) {
      setHours(createHoursLst(extremeHours.heureDebutPlusTot, extremeHours.heureFinPlusTard, extremeHours.dureeFinPlusTard));
    }
  }, [extremeHours]);

  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setCurrentWeekIndex((prevIndex) => prevIndex + 1); // Passer à la semaine suivante
      onWeekChange("after");
    } else if (isRightSwipe) {
      setCurrentWeekIndex((prevIndex) => prevIndex - 1); // Passer à la semaine précédente
      onWeekChange("prev");
    }
  };

  function getStartTop(startHourOfClass) {
    if(hours.length == 0){
      return null
    }
    let startHourOfWeek = hours[0];
    const startHour = new Date(startHourOfClass);
    
    const [startHourOfWeekH, startHourOfWeekM] = startHourOfWeek.split('h').map(Number);//[8,0]
    const [startHourOfClassH, startHourOfClassM] = [startHour.getUTCHours(), startHour.getUTCMinutes()];
    const differenceEnMinutes = (startHourOfClassH * 60 + startHourOfClassM) - (startHourOfWeekH * 60 + startHourOfWeekM);
    const differenceEnHeures = differenceEnMinutes / 60;

    return differenceEnHeures * (100 / hours.length);
  }

  function handleClick(item) {
    setIsActive(true);
    setSelectedSquare(item);
  }

  function getMonthNumberFromWeek(weekNumber, year) {
    const date = new Date(year, 0, 1); // Le 1er janvier de l'année
    const daysToAdd = (weekNumber - 1) * 7; // Nombre de jours à ajouter pour atteindre la première semaine
    date.setDate(date.getDate() + daysToAdd);
  
    // Récupérer le numéro du mois (0-11)
    const monthNumber = date.getMonth();
    
    // Ajouter 1 au numéro du mois car les mois dans JavaScript vont de 0 à 11
    return monthNumber + 1;
  }

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];
  function getMonthNameByNumber(monthNumber) {
    return months[monthNumber-1];
  }
  
  function handleNav(type){
    if(type === "prev"){
      setCurrentWeekIndex((prevIndex) => prevIndex - 1)
      setCurrentMonthIndex(getMonthNumberFromWeek(currentWeekIndex - 1, currentYear));
    }else if(type === "next"){
      setCurrentWeekIndex((prevIndex) => prevIndex + 1)
      setCurrentMonthIndex(getMonthNumberFromWeek(currentWeekIndex + 1, currentYear));
    }
  }

  function getDayNumberByLabel(weekdayLabel, weekNumber, year) {
    // Créer une date au début du mois de janvier pour obtenir le numéro du jour pour le jour spécifié
    let date = new Date(year, 0, 1);
  
    // Déterminer le jour de la semaine correspondant au label fourni
    const weekdays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const targetWeekdayIndex = weekdays.indexOf(weekdayLabel);
  
    // Ajouter le nombre de jours nécessaires pour atteindre la semaine et le jour spécifiés
    date.setDate(date.getDate() + (targetWeekdayIndex - date.getDay() + 7) % 7 + (weekNumber - 1) * 7);
  
    // Extraire le numéro du jour
    const dayNumber = date.getDate();
  
    return dayNumber;
  }
  const changeMonth = (index)=>{
    setCurrentMonthIndex(index); 
    let date = new Date(`${index}-01-${currentYear}`)
    // On veut éviter de compter de prendre le premier jour du mois s'il s'agit d'un samedi ou dimanche
    switch (date.getDay()){
      case 0:       //Dimanche
        date.setDate(date.getDate()+1)
      case 6:       //Samedi
        date.setDate(date.getDate()+2)
    }
    setCurrentWeekIndex(date.getWeekNumber())
  }
  
  return (
    <>
    <div>
    {
      months.map((mois, index)=>{
        return <span style={{color: index==currentMonthIndex-1?"red":"black"}} onClick={()=>changeMonth(index+1)}> {mois} </span>
      })
    }
    </div>
    <CalendarCont>
      {weekdata && weekdata[currentYear] && weekdata[currentYear][currentMonthIndex] && weekdata[currentYear][currentMonthIndex][currentWeekIndex] ? (
        <>
        <CalendarWeek>
          <CalendarButton onClick={() => handleNav("prev")} type={"prev"} src={buttonPrev} weekIndex={currentWeekIndex}/>
          <CalendarDays>
            {days.map((item) => (
              <CalendarDay dayssize={days.length} key={item.id}>{item} {getDayNumberByLabel(item, currentWeekIndex, currentYear)}</CalendarDay>
            ))}
          </CalendarDays>
          <CalendarButton onClick={() => handleNav("next")} type={"after"} src={buttonAft} weekIndex={currentWeekIndex} />
        </CalendarWeek>
        </>
      ) : <p>loading</p>}
      {hours.length !== 0 ? (
        <CalendarHours id="calendarhours">
          {hours.map((item) => (
            <CalendarHour hourssize={hours.length} key={item.id}>{item}</CalendarHour>
          ))}
        </CalendarHours>
      ) : <p>loading</p>}
      <CalendarMain id="calendarmain">
        {weekdata && weekdata[currentYear] && weekdata[currentYear][currentMonthIndex] ? (
          <>
            {Object.keys(weekdata[currentYear][currentMonthIndex][currentWeekIndex]).map(jour => (

              <CalendarMainCol dayssize={days.length}>
                {weekdata[currentYear][currentMonthIndex][currentWeekIndex][jour].map((classData) => (
                  <ClassSquare
                    key={classData.id}
                    title={classData.title}
                    room={classData.room}
                    color="#fe4455"
                    duration={classData.duration/60 * (100 / hours.length)}
                    startTopPercent={getStartTop(classData.startHour)}
                    professors={classData.professors}
                    onSelect={() => handleClick(classData)}
                  />
                ))}
                </CalendarMainCol>
            ))}
          </>
        ) : <p>Loading...</p>}
      </CalendarMain>
      <Popup html={<ClassDetails color="#fe4455" title={selectedSquare.title} informations={[selectedSquare.room]} professors={selectedSquare.professors} heureDebut={new Date(selectedSquare.startHour)} duree={selectedSquare.duration} />} overflow={"hidden"} format={"landscape"} isActive={isActive} setIsActive={setIsActive} />
    </CalendarCont>
    </>
  );
};

export default Calendar;
