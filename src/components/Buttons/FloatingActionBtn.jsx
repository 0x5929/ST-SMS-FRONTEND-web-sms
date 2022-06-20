import React from 'react';
import { Fab } from '@mui/material';

function BaseFab(props) {
    console.log('BaseFab component rendered')
    const { children, ...others } = props

    return (

        <Fab
            {...others}
        >
            { children }
        </Fab>

    )
}

export default React.memo(BaseFab)