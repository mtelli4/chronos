import styled from "styled-components";

export const ChronosValidateSubCardCont = styled.li`
    width: 95%;
    margin: 0 auto;
    border: 3px solid #ddd;
    list-style: none;
    padding: 10px;
    border-radius: 7px;
`;

export const ChronosValidateSubCardName = styled.div`
    user-select: none;
    cursor: pointer;

`;

export const ChronosValidateSubCardContent = styled.ul`
    height: ${props => props.show ? "225px" : "0px"};
    transition : all 0.5s cubic-bezier(.76,1.65,0,1);
    overflow: hidden;
`;