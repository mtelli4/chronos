import React, {useState, useEffect, useRef} from 'react';
import { CalendarCont, CalendarDays, CalendarDay, CalendarMain, CalendarHours, CalendarHour, CalendarMainCol, CalendarButton, CalendarWeek} from './calendarElements';
import ClassSquare from '../ClassSquare';
import { createDaysLst, createHoursLst, trouverHeuresExtremes, couleurAleatoire } from '../../js/calendar_script';
import buttonPrev from "../../images/buttonPrev.svg";
import buttonAft from "../../images/buttonAft.svg";

const Calendar = ({ weekdata, onWeekChange }) => { // days, jours = lst / classes = [{}]

    // Fonction pour calculer le top de départ
    function getStartTop(startHourOfClass) {
        // On part du principe que la liste est triée dans l'ordre
        // Donc le premier elem est la plus petite heure
        let startHourOfWeek = hours[0];

        // Convertir les heures au format "8h00" en minutes
        const [startHourOfWeekH, startHourOfWeekM] = startHourOfWeek.split('h').map(Number);
        const [startHourOfClassH, startHourOfClassM] = startHourOfClass.split('h').map(Number);

        // Calculer la différence en minutes
        const differenceEnMinutes = (startHourOfClassH * 60 + startHourOfClassM) - (startHourOfWeekH * 60 + startHourOfWeekM);

        // Convertir la différence en heures et minutes
        const differenceEnHeures = differenceEnMinutes / 60;

        // Retourner la différence en float
        return differenceEnHeures * (100 / hours.length);
    }

    let days = createDaysLst(weekdata);
    let extremeHours = trouverHeuresExtremes(weekdata);
    let hours = createHoursLst(extremeHours.heureDebutPlusTot, extremeHours.heureFinPlusTard, extremeHours.dureeFinPlusTard);

    const touchStart = useRef(null);
    const touchEnd = useRef(null);
  
    // the required distance between touchStart and touchEnd to be detected as a swipe
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
        onWeekChange("after");
      } 
      
      else if (isRightSwipe) {
        onWeekChange("prev");
      }
    };

  return (
    <CalendarCont>
        <CalendarWeek>
            <CalendarButton onClick={() => onWeekChange("prev")} type={"prev"} src={buttonPrev} />
            <CalendarDays>
                {days.map((item) => (
                    <CalendarDay dayssize={days.length} key={item.id}>{item}</CalendarDay>
                ))}
            </CalendarDays>
            <CalendarButton onClick={() => onWeekChange("after")} type={"after"} src={buttonAft} />
        </CalendarWeek>

        <CalendarHours id="calendarhours">
            {hours.map((item) => (
                <CalendarHour hourssize={hours.length} key={item.id}>{item}</CalendarHour>
            ))}
        </CalendarHours>

        <CalendarMain id='calendarmain' onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {weekdata.map((item) => (
                <CalendarMainCol dayssize={days.length}>
                    {item.classes.map((item2) => (
                        <ClassSquare title={item2.title} room={item2.room} color={couleurAleatoire()} duration={item2.duration * (100 / hours.length)} startTopPercent={getStartTop(item2.startHour)} />
                    ))}
                </CalendarMainCol>
            ))}
        </CalendarMain>
    </CalendarCont>
  )
}

export default Calendar
