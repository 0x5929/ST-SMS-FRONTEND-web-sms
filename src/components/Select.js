import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';
import React from 'react';

export default function Select(props) {

    const {name, label, value, onChange, required, options, ...others} = props;
    return (
        <FormControl
            variant="outlined"
            required={required}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}

                {...others}
            >
                {
                    options.map(
                        option=> (
                        <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                    ))
                }
            </MuiSelect>
        </FormControl>

      );
}

