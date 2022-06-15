import React from 'react';
import { Fab } from '@mui/material';

function BaseFab(props) {

    const { children, ...others } = props

    return (

        <Fab
            {...others}
        >
            { children }
        </Fab>

    )
}

export default BaseFab