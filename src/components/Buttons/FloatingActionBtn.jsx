import React from 'react';
import { Fab } from '@mui/material';

function BaseFab({ children, ...others }) {
    console.log('BaseFab component rendered')

    return (

        <Fab
            { ...others }
        >
            { children }
        </Fab>

    )
}

export default React.memo(BaseFab)