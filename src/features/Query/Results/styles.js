import { styled } from '@mui/material/styles';
import { Box as MuiBox, Grid as MuiGrid } from '@mui/material'

import Components from '../../../components'


const Grid = styled(MuiGrid)(( {theme} ) => ({
    // styling Grid if needed
}));

const Box = styled(MuiBox)(( {theme} ) => ({
    display: 'flex',
    justifyContent: 'flex-end'
}));

const SearchBar = styled(Components.SearchBar)(( {theme} ) => ({
    flexGrow: 0
}));

const BaseButton = styled(Components.BaseButton)(( {theme} ) => ({
    // styling BaseButton if needed
}));

const QueryTblContainer = styled(Components.QueryTblContainer)(( {theme} ) => ({
    "::selection, *::selection": {
        backgroundColor: theme.palette.mode === 'light' ? "#ffe20b" : 'undefined'
      },

}));

const QueryTblHead = styled(Components.QueryTblHead)(( {theme} ) => ({
    // styling QueryTblHead if needed
}));

const QueryTblBody = styled(Components.QueryTblBody)(( {theme} ) => ({
    // styling QueryTblBody if needed
}));

const QueryTblPagination = styled(Components.QueryTblPagination)(( {theme} ) => ({
    // styling QueryTblPagination if needed
}));

const Modal = styled(Components.Modal)(( {theme} ) => ({
    // styling Modal if needed
}));

const StudentForm = styled(Components.StudentForm)(( {theme} ) => ({
    // styling StudentForm if needed
}));

const DetailedTblContainer = styled(Components.DetailedTblContainer)(( {theme} ) => ({
    "::selection, *::selection": {
        backgroundColor: theme.palette.mode === 'light' ? "#ffe20b" : 'undefined'
      },

}));

const DetailedTblHead = styled(Components.DetailedTblHead)(( {theme} ) => ({
    // styling DetailedTblHead if needed
}));

const DetailedTblBody = styled(Components.DetailedTblBody)(( {theme} ) => ({
    // styling DetailedTblBody if needed
}));

const Notification = styled(Components.Notification)(( {theme} ) => ({
    // styling Notification if needed
}));

const ConfirmDialog = styled(Components.ConfirmDialog)(( {theme} ) => ({
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