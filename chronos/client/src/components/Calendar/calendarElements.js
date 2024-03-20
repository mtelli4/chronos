import styled from "styled-components";

export const CalendarCont = styled.div`
    width: 100%;
    min-height: 100%;

    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 12% 88%;
    row-gap: 20px;
    position: relative;
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

    @media (max-width: 900px) {
        font-size: 1.1rem;
    }

    @media (max-width: 550px) {
        font-size: 0.75rem;
    }
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
        height: 1px;
        background-color: #000;
        opacity: 0.15;
        width: 85%;
        transform: translateX(60%);
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

export const CalendarSelector = styled.div`
    width: 90%;
    max-width: 1250px;
    margin-left: 40px;
    height: 90px;
    display: flex;
    padding: 0px 30px;
    align-items: center;
    gap: 40px;
    overflow-x: auto;
    background: #ddd;
    border-radius: 10px;

    @media (max-width: 750px) {
        margin: 0 auto;
        max-width: none;
    }
`;

export const CalendarYearButton = styled.img`
    height: 25%;
    user-select: none;
    transition: all 0.25s;
    cursor: pointer;

    &:hover {
        transform: scale(1.2);
    }

    &:active {
        transform: scale(0.9);
    }
`;

export const CalendarMonth = styled.div`
    font-size: ${props => props.selected ? "1.75rem" : "1.5rem"};
    display: block;
    user-select: none;
    cursor: pointer;
    background:  ${props => props.selected ? "linear-gradient(#AD6DFF, #8734DB)" : "#000"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: font-size 0.5s;
`;

export const CalendarYearText = styled.div`
    font-size: 4rem;
    font-weight: bold;
    font-style: italic;
    user-select: none;
    background: linear-gradient(#AD6DFF, #8734DB);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 50px;
`;