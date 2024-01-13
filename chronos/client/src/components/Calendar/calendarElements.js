import styled from "styled-components";

export const CalendarCont = styled.div`
    border: 2px solid blue;
    width: 100%;
    height: 100vh; // TODO : changer en %

    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 12% 88%;
`;

export const CalendarDays = styled.div`
    grid-column: 2;
    grid-row: 1;

    display: flex;
    border-bottom: 4px solid black;
`;

export const CalendarDay = styled.span`
    width: 16.7%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.75rem;
`;

export const CalendarHours = styled.div`
    grid-column: 1;
    grid-row: 2;

    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

export const CalendarHour = styled.span`
    font-size: 0.75;
    height: ${props => (100 / props.size) + "%"};

    display: flex;
    justify-content: center;

    &:after {
        content: "";
        position: absolute;
        width: 85%;
        transform: translateX(57.5%);
        height: 1px;
        background: #C8C8C8;
    }
`;

export const CalendarMain = styled.div`
    grid-column: 2;
    grid-row: 2;
    display: flex;
`;

export const CalendarMainCol = styled.div`
    width: 16.7%;
    margin-top: 20px;
`;