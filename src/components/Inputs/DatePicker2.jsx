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
        errorHandler, 
        showError, 
        clearFields,
        initialValue,
        convertToDefaultEventParam, ...others } = props


    const [ { value, error }, { inputOnChange } ] = useInputValue({initialValue, errorHandler, clearFields})

    
    return (  
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                inputRef={parentRef}
                name={name}
                label={label}
                openTo="year"
                inputFormat="yyyy-MM-dd"
                mask="____-__-__"
                views={['year', 'month', 'day']}
                value={value}
                onChange={date => inputOnChange(convertToDefaultEventParam(name, date))}
                renderInput={(params) => <TextField {...params} />}
                { ...((showError && errorHandler(value)) || error)  }

                { ...others }
            />
        </LocalizationProvider>


    );
});

export default React.memo(DatePicker2)