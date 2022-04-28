import { Grid as MuiGrid } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Controls from '../../../components';


const Grid = styled(MuiGrid)(( {theme} ) => ({
    // styling Grid if needed
}));

const BottomGrid = styled(MuiGrid)(( {theme} ) => ({

    marginRight: theme.spacing(5),
}));

const Paper = styled(Controls.Paper)(( {theme} ) => ({
    // styling paper if needed
}));

const Card = styled(Controls.Card)(( {theme} ) => ({
    // styling Card if needed
}));

const Image = styled(Controls.Image)(( {theme} ) => ({
    // styling Image if needed
}));

const SimpleBackDrop = styled(Controls.SimpleBackDrop)(( {theme} ) => ({
    // styling SimpleBackDrop if needed
}));


const QueryForm = styled(Controls.QueryForm)(( {theme} ) => ({
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