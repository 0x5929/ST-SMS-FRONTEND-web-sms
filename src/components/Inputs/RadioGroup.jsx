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
        studentFormDispatch=null,
        clearFields,
        showError,
        items, ...others } = props;

    const [ { value, error }, { inputOnChange } ] = useInputValue({initialValue, errorHandler, clearFields})

    // for school radio only, bc the only other radio component, no schoolChanged nor studentFormDispatch was passed in
    // if school value changes, it will change form state, which will trigger another its useeffect to refetch program and rotation data
    
    useEffect(() => {
        // to align our forwardRef to the value's state
        if (parentRef.current) {
            parentRef.current.value = value
        }

        // to set the school value state from parent component (studentForm)
        // note this will trigger an useEffect in the useStudentFOrm hook
        if (studentFormDispatch) {
            studentFormDispatch({type: 'set-school', payload: value})
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                checked={value}
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