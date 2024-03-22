import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/styleImportStudent.css";
import prof from "../images/liste.png";
import user from "../images/utilisateur_2.png";
import student from "../images/student-icon.png";

const PageIndexDir = () => {
    const navigate = useNavigate()
  return (
    <>
        <img className='importPurpleTriangle' />

        <div className='importCont'>
            <h2 className='ImportTitle'>Bonjour ! Où allons nous ?</h2>

            <div className='typeLstGrid'>
                <div className='gridElem' onClick={() => { navigate("/directeur/notes") }}>
                    <img src={prof} className='gridImg' />
                    <div className='gridElemTitle'>Notes</div>
                </div>
                <div className='gridElem' onClick={() => { navigate("/users") }}>
                    <img src={user} className='gridImg' />
                    <div className='gridElemTitle'>Liste des utilisateurs</div>
                </div>

                <div className='gridElem' onClick={() => { navigate("/importStudents") }}>
                    <img src={student} className='gridImg' />
                    <div className='gridElemTitle'>Import d'élèves</div>
                </div>
            </div>
        </div>

        {/* <Popup html={popupToOpen == "student" ? <ImportStudentPopup initialValues={initialValues} validationSchemaStudent={validationSchemaStudent} formations={formations} handleFileChange={handleFileChange} handleImport={handleImport} /> : <ImportProfPopup initialValues={initialValues} validationSchemaStudent={validationSchemaStudent} formations={formations} handleFileChange={handleFileChange} handleImport={handleImport} />} isActive={isActive} format={"square"} setIsActive={setIsActive} overflow={"auto"} /> */}
    </>
  )
}

export default PageIndexDir
