import { Table, TableCell, TableHead, TableRow, TableSortLabel, TableBody, TablePagination } from '@mui/material'
import React from 'react'


import { IconButton } from './Button'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { styled } from '@mui/material/styles';


const TableContainer = styled(Table)(( {theme } ) => ({
  
    marginTop: theme.spacing(3),
    '& thead th': {
        fontWeight: 600,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    },
    '& tbody td': {
        fontWeight: 300
    },
    '& tbody tr:hover': {
        backgroundColor: '#f7f7f7',
        cursor: 'pointer'
    }

}));

export function TblContainer(props) {

    const { children, ...others } = props

    return (
    <TableContainer
        { ...others }
    >
        { children }
    </TableContainer>
    )
}

export function TblHead(props) {

    const { tableData, order, orderBy, handleSortRequest } = props
    return (
    <TableHead>
        <TableRow>
            { 
                tableData.headCells.map( headCell => (

                    <TableCell 
                        key={ headCell.id }
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        { headCell.disableSorting? headCell.label : 
                            <TableSortLabel
                                active={ orderBy === headCell.id }
                                direction={ orderBy === headCell.id ? order: 'asc' }
                                onClick={ ()=>{handleSortRequest(headCell.id)} }
                            >
                                { headCell.label }
                            </TableSortLabel>
                        }
                    </TableCell>
                ))
            }
        </TableRow>
    </TableHead>
    )
}

const ActionButton = styled(IconButton)(( {theme} ) => ({
    minWidth: 0,
    minHeight: 0,
    margin: theme.spacing(0.5),
  
  }));




export function TblBody(props) {

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

export function TblPagination(props) {

    return (
    <TablePagination 
        component="div"
        { ...props}
    />
    )
}
