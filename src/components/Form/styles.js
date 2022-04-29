import { Grid as MuiGrid } from '@mui/material';
import { DoubleArrow as MuiDoubleArrow } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { SearchBar } from '../Searchbar'

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
    [theme.breakpoints.up('sm')] : {
        marginLeft: theme.spacing(0)
    },

    [theme.breakpoints.down('sm')] : {
        marginLeft: theme.spacing(2)
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

const AddButton = styled(BaseButton)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(4),
    fontSize: theme.spacing(2)
}));

const DelButton = styled(BaseButton)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(0)
}));

const QueryButton = styled(BaseIconButton)(( {theme} ) => ({
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(4),
    fontSize: theme.spacing(2)
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
    Input,
    Select,
    QuerySelect,
    DatePicker,
    Checkbox,
    RadioGroup,
    Button,
    AddButton,
    QueryButton,
    DelButton,
    DoubleArrowIcon,
    QuerySearchBar
}

export default Styles 