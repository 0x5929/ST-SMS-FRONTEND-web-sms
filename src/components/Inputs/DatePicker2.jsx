import React, { forwardRef } from 'react';
import AdapterDateFns  from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/lab';
import { TextField } from '@mui/material';

import { useInputValue } from '../../hooks'

const DatePicker2 = forwardRef((props, parentRef) => {

    console.log('DatePicker component rendered')
    
    const { 
        name, 
        label, 
        initialValue='', 
        errorHandler, 
        showError, 
        convertToDefaultEventParam, ...others } = props

    const [ inputStates, inputHandlers ] = useInputValue(initialValue, errorHandler)
    const { value, error } = inputStates
    const { inputOnChange } = inputHandlers

    return (  
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                inputRef={parentRef}
                name={name}
                label={label}
                openTo="year"
                views={['year', 'month', 'day']}
                value={value}
                onChange={date => inputOnChange(convertToDefaultEventParam(name, date))}
                renderInput={(params) => <TextField {...params} />}
                { ...((showError && errorHandler(value)) || error)  }

                {...others}
            />
        </LocalizationProvider>


    );
});

export default React.memo(DatePicker2)