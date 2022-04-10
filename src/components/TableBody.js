import { TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import {IconButton} from './Button'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
 
import { styled } from '@mui/material'

const ActionButton = styled(IconButton)(( {theme} ) => ({
    minWidth: 0,
    minHeight: 0,
    margin: theme.spacing(0.5),
  
  }));


export default function TblBody(props) {

    const { 
        records, 
        openInModal,
        handleDeletePress,
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
                    <ActionButton 
                        variant="text"
                        onClick={() =>openInModal(record)}
                        size="small"
                        color="primary"
                    >
                        <EditOutlinedIcon 
                            fontSize="small"
                            color="primary"
                        />
                    </ActionButton>
                    <ActionButton 
                        variant="text"
                        onClick={()=> handleDeletePress(record)}
                        size="small"
                        color="secondary"
                    >
                        <CloseOutlinedIcon 
                            fontSize="small"
                            color="secondary"
                        />
                    </ActionButton>
                </TableCell>
            </TableRow>
            
        ))}
    </TableBody>
    )
}
