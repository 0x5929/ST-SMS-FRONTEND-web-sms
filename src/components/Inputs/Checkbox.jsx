import React from 'react';
import Styles from './styles'

export default function Checkbox(props) {

    const { 
        name, 
        label, 
        value, 
        onChange, 
        convertToDefaultEventParam,

        ...others
    } = props;

    return (  
        <Styles.FormControl {...others}>
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