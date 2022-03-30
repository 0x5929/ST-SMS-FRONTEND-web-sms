import React from 'react';
import { Typography as MuiTypography } from '@mui/material'

function Typography(props) {

    const { variant, color, component, text, ...others} = props;

    var defaultVariant = 'h6'
    var defaultColor = 'primary'

    return (         
    <MuiTypography
        variant={variant || defaultVariant}
        color={ color || defaultColor}
        component={component || variant || defaultVariant}
        gutterBottom
        sx={{ margin: 1}}
        
        {...others}
    >
        {text}
    </MuiTypography> 
    
    );
}

export default Typography;