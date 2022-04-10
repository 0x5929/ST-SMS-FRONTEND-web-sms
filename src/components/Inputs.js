import React from 'react';
import AdapterDateFns  from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/lab';
import { 
    TextField, 
    FormControl, 
    FormControlLabel, 
    Checkbox as MuiCheckbox, 
    FormLabel, 
    Radio, 
    RadioGroup as MuiRadioGroup, 
    InputLabel, 
    MenuItem, 
    Select as MuiSelect } from '@mui/material';


const convertToDefaultEventParam = (name, value) => ({
    target: {
        name,
        value
    }
})

export function Input(props) {

    const { name, label, value, error=null, onChange, ...others } = props

    return (  
        <TextField 
            variant="outlined"
            color="primary"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && { error:true, helperText: error })}
            {...others}
        />
    );
}


export function Checkbox(props) {

    const { name, label, value, onChange } = props;

    const convertToDefaultEventParam = (name, value) => ({
        target: {
            name,
            value
        }
    })

    return (  
        <FormControl>
            <FormControlLabel
                label={label}
                control={<MuiCheckbox
                    color="primary" 
                    name={name}
                    checked={value}
                    onChange={e => onChange(convertToDefaultEventParam(name, e.target.checked))}
                />}
            />
        </FormControl>
    );
}

export function DatePicker (props) {
    
    const { name, label, value, onChange, ...others } = props;


    
    return (  
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                label={label}
                openTo="year"
                views={['year', 'month', 'day']}
                value={value}
                onChange={date => onChange(convertToDefaultEventParam(name, date))}
                renderInput={(params) => <TextField {...params} />}

                {...others}
            />
        </LocalizationProvider>


    );
}


export function RadioGroup (props) {

    const { name, label, value, onChange, items } = props;

    return (  
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
            name={name}
            value={value}
            onChange={onChange}>
                {
                    items.map(
                        item=> (
                            
                            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.title} />
                        )
                    )
                }

            </MuiRadioGroup>
        </FormControl>
    );
}


export function Select(props) {

    const {name, label, value, onChange, required, options, ...others} = props;
    return (
        <FormControl
            variant="outlined"
            required={required}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}

                {...others}
            >
                {
                    options.map(
                        option=> (
                        <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                    ))
                }
            </MuiSelect>
        </FormControl>

      );
}

