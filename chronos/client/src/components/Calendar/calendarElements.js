import styled from "styled-components";

export const CalendarCont = styled.div`
    width: 100%;
    min-height: 100%; // TODO mettre en %

    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 12% 88%;
    row-gap: 20px;
`;

export const CalendarDays = styled.div`
    display: flex;
    width: 100%;
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

export const CalendarButton = styled.img`
    width: 20px;
    aspect-ratio: 1;
    cursor: pointer;
    ${props => props.type == "after" ? "right" : "left"}: 0px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.25s;
    display:${props => props.weekIndex == 1 && props.type == "prev" || props.weekIndex == 52 && props.type == "after"? "none" : "block"};
    &:hover {
        transform: scale(1.1) translateY(-50%);
    }
`;

export const CalendarWeek = styled.div`
    grid-column: 2;
    grid-row: 1;

    display: flex;
    justify-content: center;
    position: relative;
`;