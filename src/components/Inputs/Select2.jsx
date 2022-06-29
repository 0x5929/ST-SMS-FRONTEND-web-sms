import React from 'react';
import { 

    FormControl,
    InputLabel, 
    MenuItem, 
    Select as MuiSelect } from '@mui/material';



const Select2 = (props) => {

    console.log('Select2 component rendered')

    const { 
        name, 
        label, 
        value, 
        errorHandler,
        handleCourseChange, 
        showError, 
        clearFields,
        required, 
        options,  ...others } = props
    

    return (
        <FormControl
            variant="outlined"
            required={required}
        >
            <InputLabel> { label }</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={handleCourseChange}
                { ...(showError && errorHandler(value)) }

                {...others}
            >
                {
                    options.map(
                        option=> (
                            <MenuItem 
                                key={option.value} 
                                value={option.value}
                            >
                                { option.title }
                            </MenuItem>
                    ))
                }

            </MuiSelect>
        </FormControl>

      );
};

export default React.memo(Select2)