import React from 'react';
import Styles from './styles';




export default function BaseButton(props) {

    const { text, size, color, variant, onClick, ...others } = props;

    var variantDefault = "contained"
    var sizeDefault = "large"
    var colorDefault = "primary"

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



