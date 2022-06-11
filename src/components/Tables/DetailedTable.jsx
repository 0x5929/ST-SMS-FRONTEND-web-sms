import React from 'react'
import Styles from './styles'

export function DetailedTblContainer(props) {

    const { children, ...others } = props

    return (
        <Styles.Table
            { ...others }
        >
            { children }
        </Styles.Table>
    )
}


export function DetailedTblHead({ tableData, ...others}) {


    return (
        <Styles.TableHead {...others}>
            <Styles.TableRow>
                { 
                    tableData.detailedViewHeadCells.map( headCell => (

                        <Styles.TableCell 
                            key={ headCell.id }
                        >
                            { headCell.label }
                        </Styles.TableCell>
                    ))
                }
            </Styles.TableRow>
        </Styles.TableHead>
    )
}

export function DetailedTblBody(props) {

    const { 
        record, 
        tableData,

        ...others
     } = props

    return (
        <Styles.TableBody {...others}>
            {
                tableData.detailedViewColumnCells.map( col => (
                    <Styles.TableRow key={ col.id }>
                        <Styles.TableCell>{ col.label }</Styles.TableCell>
                        <Styles.TableCell>{ record[col.id] }</Styles.TableCell>
                    </Styles.TableRow>
                ))
            }
        </Styles.TableBody>
    )
}

