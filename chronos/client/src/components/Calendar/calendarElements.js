import styled from "styled-components";

export const CalendarCont = styled.div`
    border: 2px solid blue;
    width: 100%;
    min-height: 100vh; // TODO mettre en %

    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 12% 88%;
    row-gap: 20px;
`;

export const CalendarDays = styled.div`
    grid-column: 2;
    grid-row: 1;

    display: flex;
`;

export const CalendarDay = styled.span`
    width: ${props => 100 / props.dayssize}%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.75rem;
    border-bottom: 4px solid black;
`;

export const CalendarHours = styled.div`
    grid-column: 1;
    grid-row: 2;

    display: flex;
    flex-direction: column;
    height: 95%;
`;

export const CalendarHour = styled.span`
    font-size: 0.75;
    height: ${props => (100 / props.hourssize)}%;

    display: flex;
    justify-content: center;

    &:after {
        content: "";
        position: absolute;
        width: 100px;
        height: 1px;
        background-color: #000;
        opacity: 0.15;
        width: 90%;
        transform: translateX(55%);
        z-index: -1;
    }
`;

export const CalendarMain = styled.div`
    grid-column: 2;
    grid-row: 2;
    display: flex;
    height: 95%;
`;

export const CalendarMainCol = styled.div`
    width: ${props => 100 / props.dayssize}%;
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
`;