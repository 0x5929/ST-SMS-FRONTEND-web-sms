import React from 'react';
import TextField from '@mui/material/TextField';


export default function Input(props) {

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

