import React from 'react';

import { TextField } from '@mui/material';

function Input(props) {
    console.log('Input component rendered')
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


export default React.memo(Input)