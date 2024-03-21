import styled from "styled-components";

export const ChronosValidateCardCont = styled.div`
    border: 5px solid #eee;
    border-radius: 20px;
    width: 100%;
    min-width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: ${props => props.show ? "10px" : "0"};

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
        transform: scale(1.01);
    }

    transition: all 0.5s cubic-bezier(.76,1.65,0,1);
`;

export const ChronosValidateCardFormation = styled.div`
    cursor: pointer;
    user-select: none;
    font-size: 2rem;
`;

export const ChronosValidateCardListName = styled.ul`
    height: ${props => props.show ? "fit-content" : "0"};
    overflow: auto;
    scroll-snap-type: y mandatory;
    transition: all 0.5s cubic-bezier(.76,1.65,0,1);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;