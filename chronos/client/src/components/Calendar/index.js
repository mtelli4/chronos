import React, {useState, useEffect} from 'react';
import { CalendarCont, CalendarDays, CalendarDay, CalendarMain, CalendarHours, CalendarHour, CalendarMainCol} from './calendarElements';

const Calendar = () => {

    const [hours, setHours] = useState([]);

    // Recup depuis bdd les cours
    useEffect(() => {
        setHours(["8h00", "9h00", "10h00", "11h00", "12h00", "13h00", "14h00", "15h00", "16h00", "17h00", "18h00"]);
    });

  return (
    <CalendarCont>
        <CalendarDays>
            <CalendarDay>Lundi</CalendarDay>
            <CalendarDay>Mardi</CalendarDay>
            <CalendarDay>Mercredi</CalendarDay>
            <CalendarDay>Jeudi</CalendarDay>
            <CalendarDay>Vendredi</CalendarDay>
            <CalendarDay>Samedi</CalendarDay>
        </CalendarDays>

        <CalendarHours>
            {hours.map((item) => (
                <CalendarHour key={item.id} size={hours.length}>{item}</CalendarHour>
            ))}
        </CalendarHours>

        <CalendarMain>
            <CalendarMainCol></CalendarMainCol>
            <CalendarMainCol></CalendarMainCol>
            <CalendarMainCol></CalendarMainCol>
            <CalendarMainCol></CalendarMainCol>
            <CalendarMainCol></CalendarMainCol>
            <CalendarMainCol></CalendarMainCol>
        </CalendarMain>
    </CalendarCont>
  )
}

export default Calendar
