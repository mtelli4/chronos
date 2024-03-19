import React from 'react'
import { ChronosInputFileText, ChronosInputFileImg, ChronosInputFileLabel, ChronosInputFileInput } from './ChrnosInputFileElements';
import iconBlack from "../../images/download-icon.png"
import iconWhite from "../../images/download-icon2.png"

const ChronosInputFile = ({ name, accept, handleFileChange }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [text, setText] = React.useState("...");

    function handleChange(e) {
        handleFileChange(e);
        console.log(e);
        setText(e.target.files[0].name);
    }

    return (
    <>
        <ChronosInputFileLabel for={name} onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)}>
            <ChronosInputFileImg src={isHovered ? iconWhite : iconBlack} />
        </ChronosInputFileLabel>
        
        <ChronosInputFileText>{ text }</ChronosInputFileText>
        <ChronosInputFileInput id={name} name={name} type="file" accept={accept} onChange={(event) => handleChange(event)} />
    </>
  )
}

export default ChronosInputFile
