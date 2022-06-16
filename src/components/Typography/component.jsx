import React from 'react';

import { Typography as MuiTypography } from '@mui/material'
import createTypographyStyles from './styles'

const Styles = createTypographyStyles({MuiTypography})

function BaseTypography(props) {

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

export default BaseTypography