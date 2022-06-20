import React from 'react'

import { 
    Paper as MuiPaper,
    Table as MuiTable, 
    TableContainer,
    TableCell,
    TableHead,
    TableRow, 
    TableSortLabel, 
    TableBody, 
    TablePagination } from '@mui/material';

import { 
    EditOutlined as EditOutlinedIcon,  
    CloseOutlined as CloseOutlinedIcon, 
    VisibilityRounded as VisibilityRoundedIcon } from '@mui/icons-material';

import { BaseIconButton } from '../Buttons';

import { createQueryTableStyles } from './styles'


const Styles = createQueryTableStyles({MuiPaper, MuiTable, BaseIconButton})

const QueryTblContainer= React.memo((props) => {
    console.log('QueryTblContainer component rendered')
    const { children, ...others } = props

    return (
        <TableContainer component={Styles.Paper}>
            <Styles.Table
                { ...others }
            >
                { children }
            </Styles.Table>
        </TableContainer>
    )
})

const QueryTblHead = React.memo((props) => {
    console.log('QueryTblHead component rendered')
    const { tableData, sortingStates, sortingHandlers, ...others } = props

    const { orderBy, order } = sortingStates
    const { handleSortRequest } = sortingHandlers

    return (
        <TableHead {...others}>
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
})

const QueryTblBody = React.memo(({ handlers, ...others }) => {
    console.log('QueryTblBody component rendered')
     const {
        getFinalDisplayRecords,
        handleDeletePress,

        detailedViewTableHandlers,
        editModalHandlers
     } = handlers

    const records = getFinalDisplayRecords()
    const { handleOpenEditModal } = editModalHandlers

    const { detailedViewModalHandlers } = detailedViewTableHandlers
    const { handleDetailedViewModalOpen } = detailedViewModalHandlers

    return (
            <TableBody { ...others }>
                {records.map(record => (
                        <TableRow key={ record.pk }>
                            <TableCell>{ record.studentId }</TableCell>
                            <TableCell>{ record.firstName }</TableCell>
                            <TableCell>{ record.lastName }</TableCell>
                            <TableCell>{ record.phoneNumber }</TableCell>
                            <TableCell>{ record.email }</TableCell>
                            <TableCell>{ record.course }</TableCell>
                            <TableCell>
                                <Styles.ActionButton 
                                    variant="text"
                                    onClick={()=> handleDetailedViewModalOpen(record)}
                                    size="small"
                                    color="primary"
                                >
                                    <VisibilityRoundedIcon 
                                        fontSize="small"
                                        color="primary"
                                    />
                                </Styles.ActionButton>
                                <Styles.ActionButton 
                                    variant="text"
                                    onClick={() =>handleOpenEditModal(record)}
                                    size="small"
                                    color="secondary"
                                >
                                    <EditOutlinedIcon 
                                        fontSize="small"
                                        color="secondary"
                                    />
                                </Styles.ActionButton>
                                <Styles.ActionButton 
                                    variant="text"
                                    onClick={()=> handleDeletePress(record)}
                                    size="small"
                                    color="error"
                                >
                                    <CloseOutlinedIcon 
                                        fontSize="small"
                                        color="error"
                                    />
                                </Styles.ActionButton>
                            </TableCell>
                        </TableRow>
                ))}
            </TableBody>
    )
})

const QueryTblPagination = React.memo((props) => {
    console.log('QueryTblPagination component rendered')
    const { count, paginationStates, paginationHandlers, ...others } = props

    const { pages, page, rowsPerPage } = paginationStates
    const { handleChangePage, handleChangeRowsPerPage } = paginationHandlers

    return (
        <TablePagination 
            component="div"
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={pages}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}

            { ...others }
        />
    )
})

export {
    QueryTblContainer,
    QueryTblHead,
    QueryTblBody,
    QueryTblPagination
}