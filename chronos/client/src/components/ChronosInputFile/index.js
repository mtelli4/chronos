import React from 'react'
import { ChronosInputFileText, ChronosInputFileImg, ChronosInputFileLabel, ChronosInputFileInput } from './ChrnosInputFileElements';
import iconBlack from "../../images/download-icon.png"
import iconWhite from "../../images/download-icon2.png"

const ChronosInputFile = ({ name, accept, handleFileChange }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [text, setText] = React.useState("...");

    function handleChange(e) {
        handleFileChange();
        console.log(e);
        setText("Fichier");
    }

    return (
    <>
        <ChronosInputFileLabel for={name} onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)}>
            <ChronosInputFileImg src={isHovered ? iconWhite : iconBlack} />
        </ChronosInputFileLabel>
        <ChronosInputFileText>{ text }</ChronosInputFileText>
        <ChronosInputFileInput id={name} name={name} type="file" accept={accept} onChange={(e) => handleChange(e)} />
    </>
  )
}

export default ChronosInputFile
