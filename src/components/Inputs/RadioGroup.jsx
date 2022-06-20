import React from 'react';

import { 
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup as MuiRadioGroup } from '@mui/material';

function RadioGroup (props) {
    console.log('RadioGroup component rendered')
    const { name, label, value, onChange, items, ...others } = props;

    return (  

        <FormControl {...others}>
            <FormLabel>
                { label }
            </FormLabel>
            <MuiRadioGroup 
                row
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    items.map(
                        item=> (
                            <FormControlLabel 
                                key={item.value} 
                                value={item.value}
                                label={item.title} 
                                control={<Radio />} 
                            />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    );
}

export default React.memo(RadioGroup)