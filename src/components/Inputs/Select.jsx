import React from 'react';

import { 

    FormControl,
    InputLabel, 
    MenuItem, 
    Select as MuiSelect 

} from '@mui/material';

function Select(props) {

    const {
        name, 
        label, 
        error=null, 
        value, 
        required, 
        options, 
        
        ...others
    } = props;
    
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

                {...(error && { error:true})}

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
}

export default Select