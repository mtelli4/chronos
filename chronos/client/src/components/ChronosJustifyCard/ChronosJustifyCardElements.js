import styled from "styled-components";

export const ChronosJustifyCardCont = styled.div`
    border: 5px solid #eee;
    border-radius: 20px;
    width: 100%;
    min-width: 300px;
    padding: 20px;
    position: relative;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
        transform: scale(1.01);
    }

    transition: all 0.5s cubic-bezier(.76,1.65,0,1);
`;

export const ChronosJustifyCardTitle = styled.h3`
    font-weight: normal;
    font-size: 2rem;
    color: #AD6DFF;

    @media screen and (max-width : 400px) {
        font-size: 1.75rem;
    }
`;

export const ChronosJustifyCardSubTitle = styled.h4`
    font-weight: normal;
    font-size: 1.25rem;
    color: #000;

    @media screen and (max-width : 400px) {
        font-size: 1rem;
    }
`;

export const ChronosJustifyCardSuperSubTitle = styled.h5`
    font-weight: normal;
    font-size: 1rem;
    color: #999;

    @media screen and (max-width : 400px) {
        font-size: 1rem;
    }
`;

export const ChronosJustifyCardTextCont = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    width: 80%;
`;

export const ChronosJustifyCardTextarea = styled.textarea`
    border: 2px solid #000;
    width: 90%;
    aspect-ratio: 4;
    border-radius: 5px;
    padding: 5px 10px;
`;

export const ChronosJustifyCardReason = styled.div`

`;

export const ChronosJustifyCardButton = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;

    transition: all 0.25s cubic-bezier(.76,1.65,0,1);
    transform: ${props => props.isHovered ? "scale(1)" : "scale(0)"};
`;
