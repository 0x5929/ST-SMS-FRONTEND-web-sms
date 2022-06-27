import React from 'react';
import { IconButton as MuiIconButton} from '@mui/material';

import { createIconBtnStyles } from './styles';


const Styles = createIconBtnStyles({MuiIconButton})

function BaseIconButton(props) {
    console.log('BaseIconButton component rendered')
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

export default React.memo(BaseIconButton)