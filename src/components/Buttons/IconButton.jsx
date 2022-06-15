import React from 'react';
import { IconButton } from '@mui/material';

import { createIconBtnStyles } from './styles';


const Styles = createIconBtnStyles(IconButton)

function BaseIconButton(props) {

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

export default BaseIconButton