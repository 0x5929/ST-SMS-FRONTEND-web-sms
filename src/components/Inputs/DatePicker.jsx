import React, { forwardRef } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useInputValue } from '../../hooks'


// import { format } from 'date-fns';
// import { convertToLocalTime } from 'date-fns-timezone';

const DatePicker = forwardRef((props, parentRef) => {

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

    // const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'
    // const formatDate = (date) => {
    //     if (!date) return new Date().toISOString().split('T')[0];
      
    //     // Get the timezone from browser using native methods
    //     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //     const dateTmp = Date.parse(date.toLocaleString());
    //     const localDate = convertToLocalTime(dateTmp, {
    //       timeZone: timezone,
    //     });

    //     return format(localDate, DEFAULT_DATE_FORMAT);
    //   };

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
                renderInput={
                    (params) => 
                        <TextField 
                            data-testid="mui-date-picker" 
                            { ...params } 
                            
                            { ...((showError && errorHandler(value)) || error)  }
                        />
                }
            
                
                
                { ...others }
            />
        </LocalizationProvider>


    );
});

export default React.memo(DatePicker)



