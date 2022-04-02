import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function TblHead(props) {

    const { tableData } = props
    return (
    <TableHead>
    <TableRow>
        { tableData.headCells.map( headCell => {

            return <TableCell key={ headCell.id }>{headCell.label}</TableCell>
        })
        }
    </TableRow>
    </TableHead>
    )
}
