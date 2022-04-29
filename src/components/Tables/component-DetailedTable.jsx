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


export function DetailedTblHead(props) {

    const { tableData} = props
    return (
        <Styles.TableHead>
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
        tableData
     } = props

    return (
        <Styles.TableBody>
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

