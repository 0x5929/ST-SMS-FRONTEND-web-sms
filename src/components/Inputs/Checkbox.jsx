import React, { forwardRef } from 'react';

import { 

    FormControl,
    FormControlLabel,
    Checkbox as MuiCheckbox } from '@mui/material'

import { useToggle } from '../../hooks'

const Checkbox = forwardRef((props, parentRef) => {

    console.log('Checkbox component rendered')
    
    const { 
        name, 
        label, 
        initialValue=false, 
        convertToDefaultEventParam,
        clearFields,

        ...others
    } = props


    const [ isChecked, handleToggle ] = useToggle(initialValue)

    return (  
        <FormControl {...others}>
            <FormControlLabel
                label={label}
                control={<MuiCheckbox
                    inputRef={parentRef}
                    color="primary" 
                    name={name}
                    checked={isChecked}
                    onChange={e => handleToggle(convertToDefaultEventParam(name, e.target.checked))}
                />}
            />
        </FormControl>
    );
});

export default React.memo(Checkbox)