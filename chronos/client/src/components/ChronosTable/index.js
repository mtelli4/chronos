import React from 'react';
import { ChronosTableButtonCont, ChronosTableHeader, ChronosTableBody, ChronosTableCell, ChronosTableCont, ChronosTableH, ChronosTableHead, ChronosTableRow, ChronosTableWrapper } from './chronosTableElements';
import ChronosButton from "../ChronosButton/index.js"
import ToggleButton from '../ToggleButton/index.js';
import pen from "../../images/crayon.png";
import dot from "../../images/trois-petits-points.png";


const ChronosTable = ({ actionOnModify, width, columns, rows, correspondance, modifiable, actionOnModifyColumn, actionOpenDetails, showColumnAdditionalInfo }) => { // width : en %, correspondance : {rowID : {columnID : val, columnID: val, ...}, rowID : {...}}
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
                                        <p>{column.libelle}</p>
                                        {column.hasOwnProperty("codeApogee") && <p>{column.codeApogee}</p>}
                                        {column.hasOwnProperty("coefficient") && <p> Coefficient : {column.coefficient}</p>}
                                        {column.hasOwnProperty("noteMaximale") && <p> Notée sur : {column.noteMaximale}</p>}
                                        {column.hasOwnProperty("nombreNote") && <p> Notes saisies : {column.nombreNote}/{rows.length}</p>}

                                        <ChronosTableButtonCont>
                                            {modifiable && actionOnModifyColumn!=undefined && <ToggleButton color={"#000"} src={pen} action={() => actionOnModifyColumn(column)} text={"Modifier"} />}
                                            {actionOpenDetails!=undefined && <ToggleButton color={"#000"} src={dot} action={() => actionOpenDetails(column.id)} text={"Accéder aux détails"} />}
                                        </ChronosTableButtonCont>
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
                                    {row.numeroEtudiant + " - " + row.Utilisateur.nom + " " + row.Utilisateur.prenom + " (" + row.additionalValue + ")"}
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
                    {showColumnAdditionalInfo &&
                        <ChronosTableRow >

                            <ChronosTableH sticky={true} rowCell={true} centered={false}>
                                Moyennes:
                            </ChronosTableH>
                            {
                                columns.map((column, index) => {
                                    return (
                                        <ChronosTableCell leftCorner={false} num={rows.length}>
                                            {column.additionalValue}
                                        </ChronosTableCell>
                                    )
                                })
                            }
                        </ChronosTableRow>}
                </ChronosTableBody>

            </ChronosTableCont>

        </ChronosTableWrapper>
    )
}

export default ChronosTable
