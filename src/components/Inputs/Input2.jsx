import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';
import { useInputValue } from '../../hooks'

const Input2 = forwardRef((props, parentRef) => {

    console.log('Input2 component rendered')

    const { name, label, initialValue, errorHandler, showError, ...others } = props

    
    const [ inputStates, inputHandlers ] = useInputValue(initialValue, errorHandler)
    const { value, error } = inputStates
    const { inputOnChange } = inputHandlers

    console.log('error inside Input2: ', error)

    return (  
        <TextField 
            inputRef={parentRef}
            variant="outlined"
            color="primary"
            label={label}
            name={name}
            value={value}
            onChange={inputOnChange}
            {...((showError && errorHandler(value)) || error)  }

            
            {...others}
        />
    );
});


export default React.memo(Input2)