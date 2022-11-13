import React, { forwardRef, useEffect } from 'react';

import { 
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup as MuiRadioGroup } from '@mui/material';


import { useInputValue } from '../../hooks'

const RadioGroup = forwardRef((props, parentRef) => {

    const { 
        name, 
        label,  
        initialValue='', 
        errorHandler=null,
        school=null,
        studentFormDispatch=null,
        clearFields,
        showError,
        items, ...others } = props;

    const [ { value, error }, { inputOnChange } ] = useInputValue({initialValue, errorHandler, clearFields})

    // for school radio only, bc the only other radio component, no schoolChanged nor studentFormDispatch was passed in
    // if school value changes, it will change form state, which will trigger another its useeffect to refetch program and rotation data
    useEffect(() => {
        if (studentFormDispatch) {
            studentFormDispatch({type: 'set-school', payload: value})
        }
    }, [value])


    return (  

        <FormControl {...others}
                                                                            
            { ...((showError && errorHandler(value)) || error)  }
            { ...others }
        
        >
            <FormLabel>
                { label }
            </FormLabel>
            <MuiRadioGroup 
                row
                name={name}
                value={value}
                defaultValue={initialValue}
                checked={initialValue | value}
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
                                control={<Radio data-testid="mui-radio" inputRef={parentRef} />} 

                            />
                        )
                    )
                }

            </MuiRadioGroup>
        </FormControl>
    );
});

export default React.memo(RadioGroup)