import React from 'react';
import { Fab } from '@mui/material';

function BaseFab({ children, ...others }) {

    return (

        <Fab
            data-testid="fab"

            { ...others }
        >
            { children }
        </Fab>

    )
}

export default React.memo(BaseFab)