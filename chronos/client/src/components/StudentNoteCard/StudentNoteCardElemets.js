import styled from "styled-components";

export const StudentNoteCardCont = styled.div`
    border: 5px solid #eee;
    border-radius: 20px;
    width: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    gap: 20px;
    overflow: hidden;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
        transform: scale(1.01);
    }

    transition: all 0.5s cubic-bezier(.76,1.65,0,1);
`;

export const StudentNoteCardTitleCont = styled.div`
    width: 100%;
    background: linear-gradient(90deg, #AD6DFF, #8734DB);
    top: 0;
    left: 0;
    color : #fff;
    height: fit-content;
    padding: 20px 30px;
    display: flex;
    align-items: flex-end;
    gap: 15px;
`;

export const StudentNoteCardTitle = styled.h3`
    font-weight: normal;
    font-size: 2rem;
    width: 75%;
    display: flex;
    align-items: center;
`;

export const StudentNoteCardTitleMoy = styled.div`
    margin-bottom: 4px;
    font-size: 1.5rem;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: end;
`;

export const StudentNoteCardContent = styled.div`
    height: fit-content;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const StudentNoteCardContentSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;


export const StudentNoteCardContentSectionTitle = styled.h4`
    font-weight: normal;
    font-size: 1.25rem;
`;

export const StudentNoteCardContentSectionNote = styled.div`
    margin-left: 10px;
    font-size: 1rem;
`;



