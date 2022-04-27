import React from 'react';
import Styles from './styles'

export default function Checkbox(props) {

    const { 
        name, 
        label, 
        value, 
        onChange, 
        convertToDefaultEventParam 
    } = props;

    return (  
        <Styles.FormControl>
            <Styles.FormControlLabel
                label={label}
                control={<Styles.Checkbox
                    color="primary" 
                    name={name}
                    checked={value}
                    onChange={e => onChange(convertToDefaultEventParam(name, e.target.checked))}
                />}
            />
        </Styles.FormControl>
    );
}