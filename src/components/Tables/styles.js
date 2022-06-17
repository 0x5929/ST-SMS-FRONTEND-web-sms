import { styled } from '@mui/material/styles';


function getCommonStyles({MuiTable}) {
    const Table = styled(MuiTable)(( {theme} ) => ({
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
            backgroundColor:theme.palette.mode === 'light'? '#f7f7f7': 'inherit' ,
            cursor: 'pointer'
        }
    }));

    return {
        Table
    }
}

function createQueryTableStyles({MuiPaper, MuiTable, BaseIconButton}){

    const {
        Table
    } = getCommonStyles({MuiTable})

    const Paper = styled(MuiPaper)(( {theme} ) => ({
        backgroundColor: 'inherit'
    }));

    const ActionButton = styled(BaseIconButton)(( {theme} ) => ({
        minWidth: 0,
        minHeight: 0,
        margin: theme.spacing(0.5),
      
    }));

    return {
        Paper,
        Table,
        ActionButton
    }
}

function createDetailedTableStyles({MuiTable}){

    const {
        Table
    } = getCommonStyles({MuiTable})

    return {
        Table
    }
}

export { createQueryTableStyles, createDetailedTableStyles }