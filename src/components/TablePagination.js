import { TablePagination } from '@mui/material'
import React from 'react'

export default function TblPagination(props) {

    return (
    <TablePagination 
        component="div"
        { ...props}
    />
    )
}
