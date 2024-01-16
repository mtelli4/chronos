import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const HeaderCont = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    border: 1px solid red;

    display: flex;
    justify-content: space-around;
`;

export const HeaderNav = styled.div`
    display: flex;
    border: 1px solid green;
`;

export const HeaderLinks = styled.div``;
 
export const HeaderLink = styled(LinkR)``;