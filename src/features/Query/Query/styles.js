import { Grid as MuiGrid } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Components from '../../../components';


const Grid = styled(MuiGrid)(( {theme} ) => ({
    // styling Grid if needed
}));

const BottomGrid = styled(MuiGrid)(( {theme} ) => ({

    marginRight: theme.spacing(5),
}));

// styling paper and card to override the custom theme based on light or dark mode
const Paper = styled(Components.Paper)(( {theme} ) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1e202a' : '#ffffff',
}));

const Card = styled(Components.Card)(( {theme} ) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1e202a' : '#ffffff',
}));

const Image = styled(Components.Image)(( {theme} ) => ({
    // styling Image if needed
}));

const SimpleBackDrop = styled(Components.SimpleBackDrop)(( {theme} ) => ({
    // styling SimpleBackDrop if needed
}));


const QueryForm = styled(Components.QueryForm)(( {theme} ) => ({
    // styling NotificationSlide if needed
}));


const Styles = {
    Grid,
    BottomGrid,
    Paper,
    Card,
    Image,
    SimpleBackDrop,
    QueryForm
}

export default Styles 