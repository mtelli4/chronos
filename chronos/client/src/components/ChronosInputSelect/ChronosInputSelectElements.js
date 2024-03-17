import {Formik, Form, Field, ErrorMessage} from "formik"
import styled from "styled-components";

export const ChronosInputSelectCont = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
    gap: 5px;
    align-items: center;

    
`;

export const ChronosInputSelectLabel = styled.label`
    padding-left: 10px;
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