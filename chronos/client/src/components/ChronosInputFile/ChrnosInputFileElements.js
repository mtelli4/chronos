import styled from "styled-components";

export const ChronosInputFileInput = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;


`;

export const ChronosInputFileLabel = styled.label`
    border: 2px solid black;
    background: #fff;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 3px;
    cursor: pointer;
    transition: transform 0.25s;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        border: none;
        background: linear-gradient(180deg, #AD6DFF, #8734DB);
        outline: none;
        transform: scale(1.1);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;  
    }

    &:active {
        transform: scale(0.9);
    }
`;

export const ChronosInputFileImg = styled.img`
    width: 50%;
`;

export const ChronosInputFileText = styled.p`
    font-size: 1rem;
    width: 50px;
    text-align: center;
`;