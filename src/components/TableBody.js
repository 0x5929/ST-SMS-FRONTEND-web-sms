import { TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'

export default function TblBody(props) {

    const { records } = props

    return (
    <TableBody>
        {records.map(record => (
            <TableRow key={ record.pk }>
                <TableCell>{ record.studentId }</TableCell>
                <TableCell>{ record.firstName }</TableCell>
                <TableCell>{ record.lastName }</TableCell>
                <TableCell>{ record.email }</TableCell>
                <TableCell>{ record.course }</TableCell>
            </TableRow>
        ))}
    </TableBody>
    )
}
