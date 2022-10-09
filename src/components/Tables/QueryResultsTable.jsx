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

const QueryResultsTblContainer= React.memo((props) => {
    
    const { children, ...others } = props

    return (
        <TableContainer component={Styles.Paper}>
            <Styles.Table
                data-testid="query-results-table"
                { ...others }
            >
                { children }
            </Styles.Table>
        </TableContainer>
    )
})

const QueryResultsTblHead = React.memo((props) => {
    
    const { tableData, sortingStates, sortingHandlers, ...others } = props

    const { orderBy, order } = sortingStates
    const { handleSortRequest } = sortingHandlers

    return (
        <TableHead {...others}>
            <TableRow data-testid="query-results-table-header">
                { 
                    tableData.mainQueryResultHeadCells.map( headCell => (

                        <TableCell 
                            key={ headCell.id }
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            { headCell.disableSorting ? 
                                <span data-testid="query-result-header-cell">{ headCell.label }</span> : 
                                
                                <TableSortLabel
                                    active={ orderBy === headCell.id }
                                    direction={ orderBy === headCell.id ? order: 'asc' }
                                    onClick={ ()=>{handleSortRequest(headCell.id)} }

                                    data-testid="query-result-header-cell"
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

const QueryResultsTblBody = React.memo((props) => {
    
     const {
        getFinalDisplayRecords,
        handleDeletePress,
        setRecordForEdit,
        setRecordForView,

        ...others
     } = props

    return (
        <TableBody data-testid="query-results-table-body" { ...others }>
            {getFinalDisplayRecords().map(record => (
                    <TableRow key={ record.pk }>
                        <TableCell>{ record.studentId }</TableCell>
                        <TableCell>{ record.firstName }</TableCell>
                        <TableCell>{ record.lastName }</TableCell>
                        <TableCell>{ record.phoneNumber }</TableCell>
                        <TableCell>{ record.email }</TableCell>
                        <TableCell>{ record.course }</TableCell>
                        <TableCell>
                            <Styles.ActionButton
                                data-testid="view-record-btn"
                                
                                variant="text"
                                aria-label="view-record-btn"
                                onClick={() => setRecordForView(record)}
                                size="small"
                                color="primary"
                            >
                                <VisibilityRoundedIcon 
                                    fontSize="small"
                                    color="primary"
                                />
                            </Styles.ActionButton>
                            <Styles.ActionButton 
                                data-testid="edit-record-btn"
                                
                                variant="text"
                                onClick={() => setRecordForEdit(record)}
                                size="small"
                                color="secondary"
                            >
                                <EditOutlinedIcon 
                                    fontSize="small"
                                    color="secondary"
                                />
                            </Styles.ActionButton>
                            <Styles.ActionButton 
                                data-testid="del-record-btn"
                                
                                variant="text"
                                onClick={() => handleDeletePress(record)}
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

const QueryResultsTblPagination = React.memo((props) => {
    
    const { count, paginationStates, paginationHandlers, ...others } = props

    const { pages, page, rowsPerPage } = paginationStates
    const { handleChangePage, handleChangeRowsPerPage } = paginationHandlers

    return (
        <TablePagination 
            data-testid="query-results-table-pagination"
            
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
    QueryResultsTblContainer,
    QueryResultsTblHead,
    QueryResultsTblBody,
    QueryResultsTblPagination
}