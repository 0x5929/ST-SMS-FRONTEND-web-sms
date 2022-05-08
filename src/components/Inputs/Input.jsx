import React from 'react';
import Styles from './styles'

export default function Input(props) {

    const { name, label, value, error=null, onChange, ...others } = props

    return (  
        <Styles.TextField 
            variant="outlined"
            color="primary"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && { error:true, helperText: error })}
            {...others}
        />
    );
}

