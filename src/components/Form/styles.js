import { Grid as MuiGrid, Box as MuiBox, CircularProgress as MuiCircularProgress } from '@mui/material';
import { DoubleArrow as MuiDoubleArrow, Check as MuiCheckIcon, Save as MuiSaveIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { SearchBar } from '../Searchbar'
import { Fab as BaseFab } from '../Buttons'



import {
    Input as BaseInput,
    Select as BaseSelect,
    DatePicker as BaseDatePicker,
    Checkbox as BaseCheckbox,
    RadioGroup as BaseRadioGroup
} from '../Inputs'

import {
    BaseButton,
    BaseIconButton,
} from '../Buttons'


const StudentForm = styled('form')(( {theme} ) => ({
    // FORM ELEMENT
    '& .MuiFormControl-root':{    
        width: '80%',
        margin: theme.spacing(1)
    }
}));

const Box = styled(MuiBox)(( {theme} ) => ({
    // to style the grid if needed
}));



const Grid = styled(MuiGrid)(( {theme} ) => ({
    // to style the grid if needed
}));

const Input = styled(BaseInput)(( {theme} ) => ({
    // to style the Input if needed
}));

const Select = styled(BaseSelect)(( {theme} ) => ({
    // to style the Select if needed
}));

const QuerySelect = styled(BaseSelect)(( {theme} ) => ({
    fontSize: 15,

    [theme.breakpoints.up('mobile')] : {
        marginLeft: theme.spacing(2)
    },

    [theme.breakpoints.down('tablet')] : {
        marginBottom: theme.spacing(2)
    }
}));


const DatePicker = styled(BaseDatePicker)(( {theme} ) => ({
    // to style the DatePicker if needed
}));

const Checkbox = styled(BaseCheckbox)(( {theme} ) => ({
    // to style the Checkbox if needed
}));

const RadioGroup = styled(BaseRadioGroup)(( {theme} ) => ({
    // to style the RadioGroup if needed
}));

const Button = styled(BaseButton)(( {theme} ) => ({
    // to style the Button if needed
}));

const SuccessButton = styled(BaseButton)(( {theme} ) => ({
    backgroundColor: theme.palette.success.main,

    '&:hover': {
        backgroundColor: theme.palette.success.dark,
    },
}));

const Fab = styled(BaseFab)(( {theme} ) => ({

}));

const SuccessFab = styled(BaseFab)(( {theme} ) => ({
    backgroundColor: theme.palette.success.main,

    '&:hover': {
        backgroundColor: theme.palette.success.dark,
    },
}));

const AddButton = styled(BaseButton)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(3),
    fontSize: theme.spacing(2),

}));

const DelButton = styled(BaseButton)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(0),

}));

const QueryButton = styled(BaseIconButton)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(3),
    fontSize: theme.spacing(2),

}));


const CircularProgress = styled(MuiCircularProgress)(( {theme} ) => ({
    color: theme.palette.success.main,
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
}));

const ButtonCircularProgress = styled(MuiCircularProgress)(( {theme} ) => ({
    color: theme.palette.success.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
}));

const CheckIcon = styled(MuiCheckIcon)(( {theme} ) => ({
    // to style the CheckIcon if needed
}));


const SaveIcon = styled(MuiSaveIcon)(( {theme} ) => ({
    // to style the SaveIcon if needed
}));



const QueryForm = styled('form')(( {theme} ) => ({
    // FORM ELEMENT
    '& .MuiFormControl-root':{    
        width: '80%',
        margin: theme.spacing(1)
    }
}));


const DoubleArrowIcon = styled(MuiDoubleArrow)(( {theme} ) => ({
    // to style QueryForm if needed
}));


const QuerySearchBar = styled(SearchBar)(( {theme} ) => ({
    flexGrow: 1,
    width: 100,
    fullWidth: true,
    marginLeft: theme.spacing(0)
}));



const Styles = {
    StudentForm,
    QueryForm,
    Grid,
    Box,
    Input,
    Select,
    CircularProgress,
    ButtonCircularProgress,
    SaveIcon,
    CheckIcon,
    QuerySelect,
    DatePicker,
    Checkbox,
    RadioGroup,
    Button,
    Fab,
    SuccessFab,
    SuccessButton,
    AddButton,
    QueryButton,
    DelButton,
    DoubleArrowIcon,
    QuerySearchBar
}

export default Styles 