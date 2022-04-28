import React from 'react';
import Styles from './styles'
import AdapterDateFns  from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function DatePicker (props) {
    
    const { name, label, value, onChange, convertToDefaultEventParam, ...others } = props;

    return (  
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Styles.DatePicker
                label={label}
                openTo="year"
                views={['year', 'month', 'day']}
                value={value}
                onChange={date => onChange(convertToDefaultEventParam(name, date))}
                renderInput={(params) => <Styles.TextField {...params} />}

                {...others}
            />
        </LocalizationProvider>


    );
}
