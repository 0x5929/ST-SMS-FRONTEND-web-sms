import React from 'react';

import AdapterDateFns  from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/lab';

import { TextField } from '@mui/material';

function DatePicker (props) {
    
    const { name, label, value, onChange, convertToDefaultEventParam, ...others } = props;

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

export default DatePicker