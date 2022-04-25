import React from 'react';
import { IconButton as MuiIconButton, Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';


const NonCapButton = styled(MuiButton)(( {theme} ) => ({
    textTransform: 'none',
    margin: theme.spacing(0.5)

}));


export function Button(props) {

    const { text, size, color, variant, onClick, ...others } = props;

    var variantDefault = "contained"
    var sizeDefault = "large"
    var colorDefault = "primary"

    return (  
        <NonCapButton
            variant={variant || variantDefault}
            size={size || sizeDefault}
            color={color || colorDefault}
            onClick={onClick}
            
            {...others}
        >
            {text}
        </NonCapButton>
    );
}



export function IconButton(props) {

    const { children, size, color, variant, ...others } = props;

    var variantDefault = "text"
    var sizeDefault = "small"
    var colorDefault = "secondary"
    return (
        <MuiIconButton
            variant={variant || variantDefault}
            size={size || sizeDefault}
            color={color || colorDefault}

            {...others}
        >
            { children }

        </MuiIconButton>
    )
}