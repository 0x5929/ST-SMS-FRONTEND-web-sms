import { Table, TableCell, TableHead, TableRow, TableSortLabel, TableBody, TablePagination } from '@mui/material'
import React from 'react'


import { BaseIconButton } from './Button'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

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

export function QueryTblContainer(props) {

    const { children, ...others } = props

    return (
    <TableContainer
        { ...others }
    >
        { children }
    </TableContainer>
    )
}

export function QueryTblHead(props) {

    const { tableData, order, orderBy, handleSortRequest } = props
    return (
    <TableHead>
        <TableRow>
            { 
                tableData.mainQueryResultHeadCells.map( headCell => (

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

const ActionButton = styled(BaseIconButton)(( {theme} ) => ({
    minWidth: 0,
    minHeight: 0,
    margin: theme.spacing(0.5),
  
  }));




export function QueryTblBody(props) {

    const { 
        records, 
        openInModal,
        handleDeletePress,
        openInDetail,
     } = props

    return (
    <TableBody>
        {records.map(record => (
                <TableRow key={ record.pk }>
                    <TableCell>{ record.studentId }</TableCell>
                    <TableCell>{ record.firstName }</TableCell>
                    <TableCell>{ record.lastName }</TableCell>
                    <TableCell>{ record.phoneNumber }</TableCell>
                    <TableCell>{ record.email }</TableCell>
                    <TableCell>{ record.course }</TableCell>
                    <TableCell>
                        <ActionButton 
                            variant="text"
                            onClick={()=> openInDetail(record)}
                            size="small"
                            color="primary"
                        >
                            <VisibilityRoundedIcon 
                                fontSize="small"
                                color="primary"
                            />
                        </ActionButton>
                        <ActionButton 
                            variant="text"
                            onClick={() =>openInModal(record)}
                            size="small"
                            color="secondary"
                        >
                            <EditOutlinedIcon 
                                fontSize="small"
                                color="secondary"
                            />
                        </ActionButton>
                        <ActionButton 
                            variant="text"
                            onClick={()=> handleDeletePress(record)}
                            size="small"
                            color="error"
                        >
                            <CloseOutlinedIcon 
                                fontSize="small"
                                color="error"
                            />
                        </ActionButton>
                    </TableCell>
                </TableRow>
        ))}
    </TableBody>
    )
}

export function QueryTblPagination(props) {

    return (
    <TablePagination 
        component="div"
        { ...props}
    />
    )
}




export function DetailedTblContainer(props) {

    const { children, ...others } = props

    return (
    <TableContainer
        { ...others }
    >
        { children }
    </TableContainer>
    )
}


export function DetailedTblHead(props) {

    const { tableData} = props
    return (
    <TableHead>
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
}

export function DetailedTblBody(props) {

    const { 
        record, 
        tableData
     } = props

    return (
    <TableBody>
        {
            tableData.detailedViewColumnCells.map( col => (
                <TableRow key={ col.id }>
                    <TableCell>{ col.label }</TableCell>
                    <TableCell>{ record[col.id] }</TableCell>
                </TableRow>
            ))
        }
    </TableBody>
    )
}

