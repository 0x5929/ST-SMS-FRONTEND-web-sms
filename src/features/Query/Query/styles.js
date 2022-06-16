import { Grid as MuiGrid, Box as MuiBox, Paper as MuiPaper } from '@mui/material'; 
import { styled } from '@mui/material/styles';

import {Statistics as BaseStatistics } from '../Statistics';
import Components from '../../../components';




const Grid = styled(MuiGrid)(( {theme} ) => ({
    // styling Grid if needed
}));


const Box = styled(MuiBox)(( {theme} ) => ({

    marginRight: theme.spacing(5),
    [theme.breakpoints.down('tablet')] : {
        display: 'none'
    }
}));

// styling paper and card to override the custom theme based on light or dark mode
const Paper = styled(MuiPaper)(( {theme} ) => ({
    'margin' : theme.spacing(5),
    'padding': theme.spacing(3),
    
    backgroundColor: theme.palette.mode === 'dark' ? '#1e202a' : '#ffffff',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto'
}));


const Statistics = styled(BaseStatistics)(( {theme} ) => ({
    // styling Statistics if needed
}));


const SimpleBackDrop = styled(Components.SimpleBackDrop)(( {theme} ) => ({
    // styling SimpleBackDrop if needed
}));


const QueryForm = styled(Components.QueryForm)(( {theme} ) => ({
    // styling NotificationSlide if needed
}));


const Styles = {
    Grid,
    Box,
    Paper,
    Statistics,
    SimpleBackDrop,
    QueryForm
}

export default Styles 