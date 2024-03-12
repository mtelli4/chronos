import React, { useState } from 'react';

// Import des sous composants
import StudentAbsList from '../StudentAbsList';


const FormationList = ({ Formation }) => {
    const [isVisible, setIsVisible] = useState(true); // État pour suivre la visibilité de la liste des élèves

    // Rend visible ou invisible la liste des élèves de la formation
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div onClick={handleClick}>
            <div></div>
            <h1>{Formation.libelle}</h1>
            {isVisible && <div>
                {Formation.map((group) => ( // Groupes de chaque formation
                    group.map((student) => ( // Elève du groupe de la formation
                        <StudentAbsList key={student.id} Student={student} />
                    ))
                ))}
            </div>}
        </div>
    );
};

export default FormationList;
