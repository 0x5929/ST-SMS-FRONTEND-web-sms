import React from 'react';
import { 

    FormControl,
    InputLabel, 
    MenuItem, 
    Select as MuiSelect } from '@mui/material';



// NOTE that select does not use the useInputValue custom hook, because we cannot get the value from its useRef reference
const Select = (props) => {

    const { 
        name, 
        label, 
        value, 
        errorHandler,
        handleChange, 
        showError, 
        required, 
        options,  ...others } = props
    

    return (
        <FormControl
            variant="outlined"
            required={required}
        >
            <InputLabel> { label }</InputLabel>
            <MuiSelect
                data-testid="mui-select"
            
                label={label}
                name={name}
                value={(value ? value: '')}
                onChange={handleChange}
                { ...(showError && errorHandler(value)) }

                {...others}
            >
                {
                    options.map(
                        option=> (
                            <MenuItem 
                                component="div"
                                key={option.value} 
                                value={option.value}

                                data-testid="mui-selectitem"
                            >
                                { option.title }
                            </MenuItem>
                    ))
                }

            </MuiSelect>
        </FormControl>

      );
};

export default React.memo(Select)