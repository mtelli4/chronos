import {Formik, Form, Field, ErrorMessage} from "formik"
import styled, { keyframes } from "styled-components";

const appearAnim = keyframes`
    0% {
        transform: scaleX(0);
    }

    100% {
        transform: scaleX(100%);
    }
`;

const error = keyframes`
    0% {
        transform: translate(-50%, 0%) scale(0) rotate(10deg);
    }

    25% {
        transform: translate(-50%, 0%) scale(1) rotate(10deg);
    }

    50% {
        transform: translate(-50%, 0%) rotate(-10deg);
    }

    75% {
        transform: translate(-50%, 0%) rotate(10deg);
    }

    100% {
        transform: translate(-50%, 0%) rotate(-10deg);
    }
`;

export const ChronosInputSelectCont = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    gap: 5px;
    align-items: flex-start;
    transform-origin: left;
    position: relative;
    animation: ${appearAnim} 0.5s cubic-bezier(.76,1.65,0,1);
    
`;

export const ChronosInputSelectLabel = styled.label`

`;

export const ChronosInputSelectErrorMessage = styled(ErrorMessage)`
    color: #ff0044;
    position: absolute;
    top: 100%;
    left: 50%;
    width: max-content;
    z-index: 99;
    font-size: 0.75rem;
    transform: translate(-50%, 0%);
    animation: ${error} 0.75s;
`;

export const ChronosInputSelectField = styled(Field)`
    background: #fff;
    padding: 10px 15px;
    outline: none;
    border: 2px solid #000;
    width: fit-content;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        border: 2px solid #AD6DFF;
        outline: none;
        box-shadow: none;
        color: #AD6DFF;
    }
`;

export const ChronosInputSelectOption = styled.option`
`;