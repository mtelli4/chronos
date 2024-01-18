import React from 'react'
import "../css/styleClassDetails.css"

// Cntent de la popup calendar
const ClassDetails = () => {
  return (
    <>
        <div style={{background : "#000ff0"}} className='leftBorder'></div>

        <div className='classDetailsCont'>
            <div className='classDetailsTitle'>
                <h2>Optimisation de mes couilles</h2>
                <p>13h30 - 15h45</p>
            </div>

            <div className='classDetailsInfo'>
                <ul>
                    <li>information 1</li>
                    <li>information 2</li>
                    <li>information 3</li>
                </ul>

                <div className='classDetailsChatCont'></div>
            </div>
        </div>
    </>
  )
}

export default ClassDetails
