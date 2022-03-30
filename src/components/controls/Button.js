import React from 'react';
import { Button as MuiButton} from '@mui/material';
import { styled } from '@mui/material/styles';


const NonCapButton = styled(MuiButton)(( {theme} ) => ({
    textTransform: 'none',
    margin: theme.spacing(0.5)

}));


export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props;

    var variantDefault = "contained"
    var sizeDefault = "large"
    var colorDefault = "primary"

    return (  
        <NonCapButton
            variant={variant || variantDefault}
            size={size || sizeDefault}
            color={color || colorDefault}
            onClick={onClick}
            
            {...other}
        >
            {text}
        </NonCapButton>
    );
}

