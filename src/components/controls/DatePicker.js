import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns  from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/lab';

export default function DatePicker (props) {
    
    const { name, label, value, onChange, ...others } = props;

    const convertToDefaultEventParam = (name, value) => ({
        target: {
            name,
            value
        }
    })
    
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

