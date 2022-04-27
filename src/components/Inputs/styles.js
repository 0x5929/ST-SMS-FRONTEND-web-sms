import { 

    TextField as MuiTextField, 
    FormControl as MuiFormControl,
    FormControlLabel as MuiFormControlLabel,
    Checkbox as MuiCheckbox,
    FormLabel as MuiFormLabel, 
    Radio as MuiRadio, 
    RadioGroup as MuiRadioGroup,
    InputLabel as MuiInputLabel, 
    MenuItem as MuiMenuItem, 
    Select as MuiSelect 

} from '@mui/material';

import { DatePicker as MuiDatePicker } from '@mui/lab';

import { styled } from '@mui/material/styles';


const TextField = styled(MuiTextField)(( {theme} ) => ({
    // style TextField if needed
}));

const FormControl = styled(MuiFormControl)(( {theme} ) => ({
    // style TextFFormControlield if needed
}));

const FormControlLabel = styled(MuiFormControlLabel)(( {theme} ) => ({
    // style TeFormControlLabeltField if needed
}));

const Checkbox = styled(MuiCheckbox)(( {theme} ) => ({
    // style Checkbox if needed
}));

const DatePicker = styled(MuiDatePicker)(( {theme} ) => ({
    // style DatePicker if needed
}));

const FormLabel = styled(MuiFormLabel)(( {theme} ) => ({
    // style FormLabel if needed
}));

const Radio = styled(MuiRadio)(( {theme} ) => ({
    // style Radio if needed
}));

const RadioGroup = styled(MuiRadioGroup)(( {theme} ) => ({
    // style RadioGroup if needed
}));

const InputLabel = styled(MuiInputLabel)(( {theme} ) => ({
    // style RadioGroup if needed
}));

const MenuItem = styled(MuiMenuItem)(( {theme} ) => ({
    // style RadioGroup if needed
}));

const Select = styled(MuiSelect)(( {theme} ) => ({
    // style RadioGroup if needed
}));

const Styles = {
    TextField,
    FormControl,
    FormControlLabel,
    Checkbox,
    DatePicker,
    FormLabel,
    Radio,
    RadioGroup,
    InputLabel,
    MenuItem,
    Select
}

export default Styles 