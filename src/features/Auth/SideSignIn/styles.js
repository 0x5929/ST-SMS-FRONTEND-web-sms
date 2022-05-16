import { 
    Grid as MuiGrid, 
    CssBaseline as MuiCssBaseLine,
    Box as MuiBox,
    Avatar as MuiAvatar,
    FormControlLabel as MuiFormControlLabel,
    Checkbox as MuiCheckbox,
    Paper as MuiPaper,
    InputAdornment as MuiInputAdornment, 

} from '@mui/material';

import { 
    LockOutlined as MuiLockOutlined, 
    Clear as MuiClearIcon, } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Copyright as BaseCopyright } from '../Copyright'

import Components from '../../../components';



const Checkbox = styled(MuiCheckbox)(( {theme} ) => ({
}));

const Avatar = styled(MuiAvatar)(( {theme} ) => ({
    margin: theme.spacing(1),
    backgroundColor: 'secondary.main'
}));

const CssBaseline = styled(MuiCssBaseLine)(( {theme} ) => ({
    // styling CssBaseline if needed
}));

const Box = styled(MuiBox)(( {theme} ) => ({
}));


const SignInBox = styled(MuiBox)(( {theme} ) => ({
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));


const FormBox = styled(MuiBox)(( {theme} ) => ({
    marginTop: theme.spacing(1)
}));

const FormControlLabel = styled(MuiFormControlLabel)(( {theme} ) => ({
    // styling FormControlLabel if needed
}));

const LockOutlined = styled(MuiLockOutlined)(( {theme} ) => ({
    // styling LockOutlined if needed
}));

const ClearIcon = styled(MuiClearIcon)(( {theme} ) => ({
    ':hover' : {
        cursor: 'pointer'
    }
}));

const InputAdornment = styled(MuiInputAdornment)(( {theme} ) => ({
    // styling InputAdornment if needed
}));

const Typography = styled(Components.BaseTypography)(( {theme} ) => ({
    // styling Typography if needed
}));


const Paper = styled(MuiPaper)(( {theme} ) => ({
    // styling Typography if needed
}));


const Grid = styled(MuiGrid)(( {theme} ) => ({
}));

const MainGrid = styled(MuiGrid)(( {theme} ) => ({
    height: '100vh' 
}));

const ImageGrid = styled(MuiGrid)(( {theme} ) => ({
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const Button = styled(Components.BaseButton)(( {theme} ) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
}));


const TextField = styled(Components.Input)(( {theme} ) => ({
    // styling TextField if needed
}));

const Copyright = styled(BaseCopyright)(( {theme} ) => ({
    marginTop: theme.spacing(5)
}));


const Styles = {
    Checkbox,
    Avatar,
    CssBaseline,
    Box,
    SignInBox,
    FormBox,
    FormControlLabel,
    LockOutlined,
    ClearIcon,
    InputAdornment,
    Grid,
    MainGrid,
    ImageGrid,
    Button,
    TextField,
    Copyright,
    Typography,
    Paper
}

export default Styles 