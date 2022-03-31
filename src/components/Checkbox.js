import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import React from 'react';


export default function Checkbox(props) {

    const { name, label, value, onChange } = props;

    const convertToDefaultEventParam = (name, value) => ({
        target: {
            name,
            value
        }
    })

    return (  
        <FormControl>
            <FormControlLabel
                label={label}
                control={<MuiCheckbox
                    color="primary" 
                    name={name}
                    checked={value}
                    onChange={e => onChange(convertToDefaultEventParam(name, e.target.checked))}
                />}
            />
        </FormControl>
    );
}
