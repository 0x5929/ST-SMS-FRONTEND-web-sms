import React from 'react';
import Styles from './styles'

export default function Select(props) {

    const {name, label, error=null, value, required, options, ...others} = props;
    return (
        <Styles.FormControl
            variant="outlined"
            required={required}
        >
            <Styles.InputLabel>
                {label}
            </Styles.InputLabel>
            <Styles.Select
                label={label}
                name={name}
                value={value}

                {...(error && { error:true})}
                {...others}
            >
                {
                    options.map(
                        option=> (
                            <Styles.MenuItem 
                                key={option.value} 
                                value={option.value}
                            >
                                {option.title}
                            </Styles.MenuItem>
                    ))
                }

            </Styles.Select>
        </Styles.FormControl>

      );
}

