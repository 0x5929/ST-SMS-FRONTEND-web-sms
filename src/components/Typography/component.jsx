import React from 'react';
import Styles from './styles'

export default function BaseTypography(props) {

    const { variant, color, component, text, ...others} = props;

    var defaultVariant = 'h6'
    var defaultColor = 'text.primary'

    return (         
        <Styles.Typography
            variant={variant || defaultVariant}
            color={ color || defaultColor}
            component={component || variant || defaultVariant}
            gutterBottom
            
            { ...others }
        >
            { text }
        </Styles.Typography> 
    
    );
}
