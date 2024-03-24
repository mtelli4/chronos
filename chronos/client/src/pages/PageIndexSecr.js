import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/styleImportStudent.css";
import coche from "../images/doublecoche.png";
import student from "../images/student-icon.png";
import list from "../images/liste.png";

const PageIndexSecr = () => {
    const navigate = useNavigate()
  return (
    <>
        <img className='importPurpleTriangle' />

        <div className='importCont'>
            <h2 className='ImportTitle'>Bonjour ! Où allons nous ?</h2>

            <div className='typeLstGrid'>
                <div className='gridElem' onClick={() => { navigate("/secretaire/notes") }}>
                    <img src={list} className='gridImg' />
                    <div className='gridElemTitle'>Notes</div>
                </div>

                <div className='gridElem' onClick={() => { navigate("/secretaire/validate") }}>
                    <img src={coche} className='gridImg' />
                    <div className='gridElemTitle'>Absences d'élèves</div>
                </div>

                <div className='gridElem' onClick={() => { navigate("/secretaire/prof-pres") }}>
                    <img src={student} className='gridImg' />
                    <div className='gridElemTitle'>Présences des professeurs</div>
                </div>
            </div>
        </div>

        {/* <Popup html={popupToOpen == "student" ? <ImportStudentPopup initialValues={initialValues} validationSchemaStudent={validationSchemaStudent} formations={formations} handleFileChange={handleFileChange} handleImport={handleImport} /> : <ImportProfPopup initialValues={initialValues} validationSchemaStudent={validationSchemaStudent} formations={formations} handleFileChange={handleFileChange} handleImport={handleImport} />} isActive={isActive} format={"square"} setIsActive={setIsActive} overflow={"auto"} /> */}
    </>
  )
}

export default PageIndexSecr
