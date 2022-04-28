import React from 'react';
import Styles from './styles'

export default function RadioGroup (props) {

    const { name, label, value, onChange, items } = props;

    return (  
        <Styles.FormControl>
            <Styles.FormLabel>
                {label}
            </Styles.FormLabel>
            <Styles.RadioGroup row
            name={name}
            value={value}
            onChange={onChange}>
                {
                    items.map(
                        item=> (
                            <Styles.FormControlLabel 
                                key={item.value} 
                                value={item.value}
                                label={item.title} 
                                control={<Styles.Radio />} 
                            />
                        )
                    )
                }
            </Styles.RadioGroup>
        </Styles.FormControl>
    );
}
