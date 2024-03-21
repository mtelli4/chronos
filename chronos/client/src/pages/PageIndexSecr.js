import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/styleImportStudent.css";
import prof from "../images/prof-icon.png";
import student from "../images/student-icon.png";

const PageIndexSecr = () => {
    const navigate = useNavigate()
  return (
    <>
        <img className='importPurpleTriangle' />

        <div className='importCont'>
            <h2 className='ImportTitle'>Bonjour ! Où allons nous ?</h2>

            <div className='typeLstGrid'>
                <div className='gridElem' onClick={() => { navigate("/notes") }}>
                    <img src={prof} className='gridImg' />
                    <div className='gridElemTitle'>Notes</div>
                </div>

                <div className='gridElem' onClick={() => { navigate("/validate") }}>
                    <img src={student} className='gridImg' />
                    <div className='gridElemTitle'>Absences d'élèves</div>
                </div>

                <div className='gridElem' onClick={() => { navigate("/prof-pres") }}>
                    <img src={student} className='gridImg' />
                    <div className='gridElemTitle'>Absences de professeurs</div>
                </div>
            </div>
        </div>

        {/* <Popup html={popupToOpen == "student" ? <ImportStudentPopup initialValues={initialValues} validationSchemaStudent={validationSchemaStudent} formations={formations} handleFileChange={handleFileChange} handleImport={handleImport} /> : <ImportProfPopup initialValues={initialValues} validationSchemaStudent={validationSchemaStudent} formations={formations} handleFileChange={handleFileChange} handleImport={handleImport} />} isActive={isActive} format={"square"} setIsActive={setIsActive} overflow={"auto"} /> */}
    </>
  )
}

export default PageIndexSecr
