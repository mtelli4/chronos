import React, {useState, useEffect} from 'react';
import { CalendarCont, CalendarDays, CalendarDay, CalendarMain, CalendarHours, CalendarHour, CalendarMainCol} from './calendarElements';
import ClassSquare from '../ClassSquare';
import { createDaysLst, createHoursLst, trouverHeuresExtremes } from '../../js/calendar_script';

const Calendar = ({ weekdata }) => { // days, jours = lst / classes = [{}]

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
    console.log(extremeHours);
    let hours = createHoursLst(extremeHours.heureDebutPlusTot, extremeHours.heureFinPlusTard, extremeHours.dureeFinPlusTard);

  return (
    <CalendarCont>
        <CalendarDays>
            {days.map((item) => (
                <CalendarDay dayssize={days.length} key={item.id}>{item}</CalendarDay>
            ))}
        </CalendarDays>

        <CalendarHours id="calendarhours">
            {hours.map((item) => (
                <CalendarHour hourssize={hours.length} key={item.id}>{item}</CalendarHour>
            ))}
        </CalendarHours>

        <CalendarMain id='calendarmain'>
            {weekdata.map((item) => (
                <CalendarMainCol dayssize={days.length}>
                    {item.classes.map((item2) => (
                        <ClassSquare title={item2.title} room={item2.room} color="#ab4c6e" duration={item2.duration * (100 / hours.length)} startTopPercent={getStartTop(item2.startHour)} />
                    ))}
                </CalendarMainCol>
            ))}
        </CalendarMain>
    </CalendarCont>
  )
}

export default Calendar
