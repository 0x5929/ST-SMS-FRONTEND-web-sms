import React from 'react';
import Styles from './styles';


export default function BaseIconButton(props) {

    const { children, size, color, variant, ...others } = props;

    var variantDefault = "text"
    var sizeDefault = "small"
    var colorDefault = "secondary"
    return (
        <Styles.IconButton
            variant={variant || variantDefault}
            size={size || sizeDefault}
            color={color || colorDefault}

            {...others}
        >
            { children }

        </Styles.IconButton>
    )
}