import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import React from 'react'

export default function TblHead(props) {

    const { tableData, order, orderBy, handleSortRequest } = props
    return (
    <TableHead>
        <TableRow>
            { 
                tableData.headCells.map( headCell => (

                    <TableCell key={ headCell.id }>
                        <TableSortLabel
                            active={ orderBy === headCell.id }
                            direction={ orderBy === headCell.id ? order: 'asc' }
                            onClick={ ()=>{handleSortRequest(headCell.id)} }
                        >
                            { headCell.label }
                        </TableSortLabel>
                    </TableCell>
                ))
            }
        </TableRow>
    </TableHead>
    )
}
