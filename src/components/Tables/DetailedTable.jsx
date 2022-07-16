import React from 'react'

import { 
    Table as MuiTable, 
    TableCell,
    TableHead,
    TableRow, 
    TableBody } from '@mui/material'

import { createDetailedTableStyles } from './styles'

const Styles = createDetailedTableStyles({MuiTable})

const DetailedTblContainer = React.memo((props) => {
    console.log('DetailedTblContainer component rendered')
    const { children, ...others } = props

    return (
        <Styles.Table
            { ...others }
        >
            { children }
        </Styles.Table>
    )
})


const DetailedTblHead = React.memo(({ tableData, ...others}) => {

    console.log('DetailedTblHead component rendered')
    return (
        <TableHead {...others}>
            <TableRow>
                { 
                    tableData.detailedViewHeadCells.map( headCell => (

                        <TableCell 
                            key={ headCell.id }
                        >
                            { headCell.label }
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
})

const DetailedTblBody = React.memo((props) => {
    console.log('DetailedTblBody component rendered')
    const { 
        record, 
        tableData,

        ...others
     } = props

    return (
        <TableBody {...others}>
            {
                tableData.detailedViewColumnCells.map( col => (
                    <TableRow key={ col.id }>
                        <TableCell>{ col.label }</TableCell>
                        { record && <TableCell>{ record[col.id] }</TableCell> }
                    </TableRow>
                ))
            }
        </TableBody>
    )
})

export {
    DetailedTblContainer,
    DetailedTblHead,
    DetailedTblBody
}