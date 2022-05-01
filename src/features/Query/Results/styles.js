import { styled } from '@mui/material/styles';
import { Box as MuiBox, Grid as MuiGrid } from '@mui/material'

import Controls from '../../../components'


const Grid = styled(MuiGrid)(( {theme} ) => ({
    // styling Grid if needed
}));

const Box = styled(MuiBox)(( {theme} ) => ({
    display: 'flex',
    justifyContent: 'flex-end'
}));

const SearchBar = styled(Controls.SearchBar)(( {theme} ) => ({
    // styling SearchBar if needed
}));

const BaseButton = styled(Controls.BaseButton)(( {theme} ) => ({
    // styling BaseButton if needed
}));

const QueryTblContainer = styled(Controls.QueryTblContainer)(( {theme} ) => ({
    // styling QueryTblContainer if needed
}));

const QueryTblHead = styled(Controls.QueryTblHead)(( {theme} ) => ({
    // styling QueryTblHead if needed
}));

const QueryTblBody = styled(Controls.QueryTblBody)(( {theme} ) => ({
    // styling QueryTblBody if needed
}));

const QueryTblPagination = styled(Controls.QueryTblPagination)(( {theme} ) => ({
    // styling QueryTblPagination if needed
}));

const Modal = styled(Controls.Modal)(( {theme} ) => ({
    // styling Modal if needed
}));

const StudentForm = styled(Controls.StudentForm)(( {theme} ) => ({
    // styling StudentForm if needed
}));

const DetailedTblContainer = styled(Controls.DetailedTblContainer)(( {theme} ) => ({
    // styling DetailedTblContainer if needed
}));

const DetailedTblHead = styled(Controls.DetailedTblHead)(( {theme} ) => ({
    // styling DetailedTblHead if needed
}));

const DetailedTblBody = styled(Controls.DetailedTblBody)(( {theme} ) => ({
    // styling DetailedTblBody if needed
}));

const Notification = styled(Controls.Notification)(( {theme} ) => ({
    // styling Notification if needed
}));

const ConfirmDialog = styled(Controls.ConfirmDialog)(( {theme} ) => ({
    // styling ConfirmDialog if needed
}));


const Styles = {
    Grid,
    Box,
    SearchBar,
    BaseButton,
    QueryTblContainer,
    QueryTblHead,
    QueryTblBody,
    QueryTblPagination,
    Modal,
    StudentForm,
    DetailedTblContainer,
    DetailedTblHead,
    DetailedTblBody,
    Notification,
    ConfirmDialog
}

export default Styles 