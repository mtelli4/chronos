import React from 'react';
import { ChronosTableHeader, ChronosTableBody, ChronosTableCell, ChronosTableCont, ChronosTableH, ChronosTableHead, ChronosTableRow, ChronosTableWrapper } from './chronosTableElements';

const ChronosTable = ({ width, columns, rows, correspondance, modifiable }) => { // width : en %, correspondance : {rowID : {columnID : val, columnID: val, ...}, rowID : {...}}
// Content = liste de string. Chaque string est une clé de ce que je dois afficher

    console.log(correspondance);

  return (
    <ChronosTableWrapper width={width}>

        <ChronosTableCont>

            {/* Première row différente */}
            <ChronosTableHead> 
                <ChronosTableHeader>
                    <ChronosTableH rowCell={true} leftCorner={true}>
                    </ChronosTableH>

                    {
                        columns.map((column, index) => {
                            return (
                                <ChronosTableH rowCell={false} centered={true} key={index} rightCorner={index == columns.length - 1}>
                                    { column.libelle } 
                                    {/* à remplacer par column.val */}
                                </ChronosTableH>
                            )
                        })
                    }
                    
                </ChronosTableHeader>
            </ChronosTableHead>


            {/* Le reste des rows */}
            <ChronosTableBody>
                    {rows.map((row, index) => {
                    return (
                        <ChronosTableRow >
                            <ChronosTableH sticky={true} rowCell={true} centered={false} key={-index}>
                                { row.Utilisateur.nom + " " + row.Utilisateur.prenom }
                                {/* à remplacer par row.val */}
                            </ChronosTableH>
                            {columns.map((column, jndex) => {
                                let val = ""
                                if (correspondance.hasOwnProperty(row.id)) {
                                    if (correspondance[row.id].hasOwnProperty(column.id)) {
                                        val = correspondance[row.id][column.id].note
                                    }
                                }
                                return (
                                    <ChronosTableCell leftCorner={index == 0 && jndex == 0} num={index}>
                                        { 
                                            
                                        }
                                    </ChronosTableCell>
                                )
                            })}
                        </ChronosTableRow>
                    )
                })}
            </ChronosTableBody>

        </ChronosTableCont>

    </ChronosTableWrapper>
  )
}

export default ChronosTable
