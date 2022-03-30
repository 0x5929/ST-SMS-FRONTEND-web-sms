import React from 'react';
import TextField from '@mui/material/TextField';


export default function Input(props) {

    const { name, label, value, onChange } = props

    return (  
        <TextField 
        variant="outlined"
        color="primary"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
    />
    );
}

