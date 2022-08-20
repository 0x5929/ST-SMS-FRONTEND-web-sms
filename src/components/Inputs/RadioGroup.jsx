import React, { forwardRef } from 'react';

import { 
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup as MuiRadioGroup } from '@mui/material';


import { useInputValue } from '../../hooks'

const RadioGroup = forwardRef((props, parentRef) => {

    console.log('RadioGroup component rendered')

    const { 
        name, 
        label,  
        initialValue='', 
        clearFields,
        items, ...others } = props;

    const [ { value }, { inputOnChange } ] = useInputValue({initialValue, clearFields})


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

                data-testid="mui-radiogroup" 
            >
                {
                    items.map(
                        item=> (
                            <FormControlLabel 
                                key={item.value} 
                                value={item.value}
                                label={item.title} 
                                control={<Radio data-testid="mui-radio" inputRef={parentRef}/>} 
                            />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    );
});

export default React.memo(RadioGroup)