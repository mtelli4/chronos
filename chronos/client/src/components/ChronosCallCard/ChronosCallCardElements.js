import {styled, keyframes} from "styled-components";
import { Field } from "formik"


const appearAnim = keyframes`
    0% {
        transform: scaleX(0);
    }

    100% {
        transform: scaleX(1);
    }
`;

export const ChronosCallCardCont = styled.div`
    width: 100%;
    min-height: 150px;
    color: ${props => props.isAbsent ? "#000" : "#fff"};
    padding: 20px 40px;
    border-radius: 10px;
    background: ${props => props.isAbsent ? "#eee" : "linear-gradient(90deg, #AD6DFF, #8734DB)"};
    display: flex;
    align-items: center;
    gap : 10px;
    position : relative;
    cursor: pointer;
    margin: 0 auto;
    box-shadow: ${props => props.isAbsent ? "" : " rgba(0, 0, 0, 0.5) 0px 5px 7px -5px, rgba(0, 0, 0, 0.04) 0px 5px 5px -5px"};

    transition: all 0.5s ease;


    @media screen and (max-width: 650px) {
        min-height: 200px;
        align-items: flex-start;
    }

    @media screen and (max-width: 450px) {
        padding: 20px 30px;
    }

    @media screen and (max-width: 360px) {
        padding: 20px 20px;
    }

    overflow: hidden;

    animation: ${appearAnim} 0.75s cubic-bezier(.76,1.65,0,1);
`;

export const ChronosCallCardImg = styled.img`
    width: 75px;
    height: 75px;
    object-fit: cover;
    border: 4px solid #000;
    border-radius: 5px;
    user-select: none;

    @media (max-width : 450px) {
        width: 50px;
        height: 50px;
    }
`;

export const ChronosCallCardText = styled.div`
    font-size: 2rem;
    
    user-select: none;

    @media (max-width : 600px) {
        font-size: 1.5rem;
    }
`;

export const ChronosCallCardTextCont = styled.div`
    display: flex;
    flex-direction: column;
    
    user-select: none;
`;

export const ChronosCallCardStatus = styled.div`
    opacity: 0.25;
    font-size: 4rem;
    position: absolute;
    top: 50%;
    right: 40px;
    color: ${props => props.isAbsent ? "#000" : "#000"};
    transform: translateY(-50%);
    user-select: none;

    @media screen and (max-width : 650px) {
        transform: translateY(10%);
        left: 40px;
        right: auto;
    }

    @media screen and (max-width: 360px) {
        right: auto;
        left: 50%;
        top: 60%;
        font-size: 3.5rem;
        transform: translate(-50%, 10%);
    }
`;

export const ChronosCallCardSubTitle = styled.div`
    font-size: 1rem;
    font-weight: normal;

    @media (max-width : 600px) {
        font-size: 0.75;
    }
`;