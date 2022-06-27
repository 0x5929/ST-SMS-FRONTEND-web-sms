import React, { forwardRef } from 'react';

import { 
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup as MuiRadioGroup } from '@mui/material';


import { useInputValue } from '../../hooks'

const RadioGroup2 = forwardRef((props, parentRef) => {

    console.log('RadioGroup component rendered')

    const { 
        name, 
        label,  
        initialValue='', 
        items, ...others } = props;

    const [ inputStates, inputHandlers ] = useInputValue(initialValue)
    const { value } = inputStates
    const { inputOnChange } = inputHandlers

    return (  

        <FormControl {...others}>
            <FormLabel>
                { label }
            </FormLabel>
            <MuiRadioGroup 
                row
                name={name}
                value={value}
                onChange={inputOnChange}
            >
                {
                    items.map(
                        item=> (
                            <FormControlLabel 
                                key={item.value} 
                                value={item.value}
                                label={item.title} 
                                control={<Radio inputRef={parentRef}/>} 
                            />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    );
});

export default React.memo(RadioGroup2)