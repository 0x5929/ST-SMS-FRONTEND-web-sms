import { TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import Button from './Button'
 

export default function TblBody(props) {

    const { 
        records, 
        openInPopup,
     } = props

    return (
    <TableBody>
        {records.map(record => (
            <TableRow key={ record.pk }>
                <TableCell>{ record.studentId }</TableCell>
                <TableCell>{ record.firstName }</TableCell>
                <TableCell>{ record.lastName }</TableCell>
                <TableCell>{ record.email }</TableCell>
                <TableCell>{ record.course }</TableCell>
                <TableCell>
                    <Button 
                        text="Testing"
                        variant="outlined"
                        onClick={() =>{openInPopup(record)}}
                    />
                </TableCell>
            </TableRow>
            
        ))}
    </TableBody>
    )
}
