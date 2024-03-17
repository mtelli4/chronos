import React from 'react';
import { ChronosTableHeader, ChronosTableBody, ChronosTableCell, ChronosTableCont, ChronosTableH, ChronosTableHead, ChronosTableRow, ChronosTableWrapper } from './chronosTableElements';
import ChronosButton from "../ChronosButton/index.js"

const ChronosTable = ({ actionOnModify, width, columns, rows, correspondance, modifiable, actionOnModifyColumn }) => { // width : en %, correspondance : {rowID : {columnID : val, columnID: val, ...}, rowID : {...}}
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
                                        {column.libelle}
                                        {modifiable && <ChronosButton width="100%" height="25px" action={() => actionOnModifyColumn(column)} text={"Modifier"} type="" />}
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
                                    {row.Utilisateur.nom + " " + row.Utilisateur.prenom + " (" + row.moyenne + ")"}
                                    {/* à remplacer par row.val */}
                                </ChronosTableH>
                                {columns.map((column, jndex) => {
                                    let val = ""
                                    if (correspondance.hasOwnProperty(row.id)) {
                                        if (correspondance[row.id].hasOwnProperty(column.id)) {
                                            val = correspondance[row.id][column.id].displayValue
                                        }
                                    }

                                    if (modifiable) {
                                        return (
                                            <ChronosTableCell leftCorner={index == 0 && jndex == 0} num={index}>
                                                {
                                                    <ChronosButton width="100%" height="25px" action={() => actionOnModify(row.Utilisateur.nom + " " + row.Utilisateur.prenom, column.libelle, row.id, column.id, column.noteMaximale)} id={jndex} text={val} type="" />
                                                }
                                            </ChronosTableCell>
                                        )
                                    } else {
                                        return (
                                            <ChronosTableCell leftCorner={index == 0 && jndex == 0} num={index}>
                                                {
                                                    val
                                                }
                                            </ChronosTableCell>
                                        )
                                    }
                                })}
                            </ChronosTableRow>
                        )
                    })}
                    <ChronosTableH sticky={true} rowCell={true} centered={false}>
                        Moyenne par éval:
                    </ChronosTableH>
                    {
                        columns.map((column, index) => {
                            return (
                                <ChronosTableCell leftCorner={false} num={rows.length}>
                                    {column.moyenne}
                                </ChronosTableCell>
                            )
                        })
                    }
                </ChronosTableBody>

            </ChronosTableCont>

        </ChronosTableWrapper>
    )
}

export default ChronosTable
