import { 
    Paper as MuiPaper,
    Table as MuiTable, 
    TableContainer as MuiTableContainer,
    TableCell as MuiTableCell,
    TableHead as MuiTableHead,
    TableRow as MuiTableRow, 
    TableSortLabel as MuitableSortLabel, 
    TableBody as MuiTableBody, 
    TablePagination as MuiTablePagination } from '@mui/material';

import { BaseIconButton } from '../Buttons';
import { EditOutlined  } from '@mui/icons-material';
import { CloseOutlined } from '@mui/icons-material';
import { VisibilityRounded } from '@mui/icons-material';
import { styled } from '@mui/material/styles';


const Paper = styled(MuiPaper)(( {theme} ) => ({
    backgroundColor: 'inherit'
}));

const TableContainer = styled(MuiTableContainer)(( {theme} ) => ({
    // styling TableContainer if needed
}));

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
  
const TableCell = styled(MuiTableCell)(( {theme} ) => ({
    // styling TableCell if needed
}));

const TableHead = styled(MuiTableHead)(( {theme} ) => ({
    // styling TableHead if needed
}));

const TableRow = styled(MuiTableRow)(( {theme} ) => ({
    // styling TableRow if needed
}));

const TableSortLabel = styled(MuitableSortLabel)(( {theme} ) => ({
    // styling TableSortLabel if needed
}));

const TableBody = styled(MuiTableBody)(( {theme} ) => ({
    // styling TableBody if needed
}));

const TablePagination = styled(MuiTablePagination)(( {theme} ) => ({
    // styling TablePagination if needed
}));

const ActionButton = styled(BaseIconButton)(( {theme} ) => ({
    minWidth: 0,
    minHeight: 0,
    margin: theme.spacing(0.5),
  
}));

const EditOutlinedIcon = styled(EditOutlined)(( {theme} ) => ({
    // styling EditOutlined if needed
}));

const CloseOutlinedIcon = styled(CloseOutlined)(( {theme} ) => ({
    // styling CloseOutlined if needed
}));

const VisibilityRoundedIcon = styled(VisibilityRounded)(( {theme} ) => ({
    // styling VisibilityRounded if needed
}));
  


const Styles = {
    Paper,
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    TableBody,
    TablePagination,
    ActionButton,
    EditOutlinedIcon,
    CloseOutlinedIcon,
    VisibilityRoundedIcon
}

export default Styles