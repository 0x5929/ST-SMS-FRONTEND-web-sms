import { Table } from '@mui/material'
import React from 'react'


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
export default function TblContainer(props) {
  return (
    <TableContainer>
        {props.children}
    </TableContainer>
  )
}
