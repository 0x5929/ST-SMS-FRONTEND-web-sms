import React from 'react'
import { Button as MuiButton } from '@mui/material';

import { createButtonStyles } from './styles';

const Styles = createButtonStyles({MuiButton})

function BaseButton(props) {

    const { 
        text, 
        size, 
        color, 
        variant, 
        onClick, ...others } = props;

    let variantDefault = "contained"
    let sizeDefault = "large"
    let colorDefault = "primary"
    
    return (  
        <Styles.Button
            variant={variant || variantDefault}
            size={size || sizeDefault}
            color={color || colorDefault}
            onClick={onClick}
            
            {...others}
        >
            {text}
        </Styles.Button>
    );
}

export default React.memo(BaseButton)

