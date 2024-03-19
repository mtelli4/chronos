import styled, { keyframes } from "styled-components";
import { Formik, Form, Field, ErrorMessage } from 'formik';


const appear = keyframes`
    0% {
        transform: scale(0) rotate(10deg);
    }

    25% {
        transform: scale(1) rotate(10deg);
    }

    50% {
        transform: rotate(-10deg);
    }

    75% {
        transform: rotate(10deg);
    }

    100% {
        transform: rotate(-10deg);
    }
`;

export const ChronosInputCont = styled.div`
    width: ${props => props.width};
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ChronosInputTitle = styled.label`
    font-size: 1.5rem;
    padding-left: 5px;
    padding-right: 5px;

    @media (max-width: 500px) {
        font-size: 1.25rem;
        transition: all 0.25s;
    }
`;

export const ChronosInputField = styled(Field)`
    width: 100%;
    border: 3px solid #000;
    height: ${props => props.height ? props.height : "40px"};
    border-radius: 6px;
    outline: none;
    padding-left: 10px;
    font-size: 1.25rem;
    background: none;

    &:active {
        border: 3px solid #000;
        outline: none;
    }
`;

export const ChronosInputErrorMessage = styled(ErrorMessage)`
    color: #ff0022;
    width: fit-content;
    transform-origin: center;
    margin-left: 20px;
    animation: ${appear} 0.4s linear;
`;

export const ChronosInputFieldCont = styled.div`
    width: 100%;
    height: 100%;

    position: relative;
`;

export const ChronosEye = styled.img`
    width: 25px;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;

    &:hover {
        transform:  translateY(-50%) scale(1.05);
    }

    &:active {
        transform:  translateY(-50%) scale(0.9);
    }
`; 