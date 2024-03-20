import {Formik, Form, Field, ErrorMessage} from "formik"
import styled from "styled-components";

export const ChronosInputSelectCont = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    gap: 5px;
    align-items: flex-start;

    
`;

export const ChronosInputSelectLabel = styled.label`

`;

export const ChronosInputSelectErrorMessage = styled(ErrorMessage)``;

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
    }
`;

export const ChronosInputSelectOption = styled.option`
`;