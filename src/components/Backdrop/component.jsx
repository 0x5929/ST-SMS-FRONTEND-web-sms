import React from 'react'
import { Backdrop as MuiBackdrop, CircularProgress } from '@mui/material'

import createBackdropStyles from './styles'

const Styles = createBackdropStyles({MuiBackdrop})


function SimpleBackDrop({ openBackdrop, ...others }) {

    console.log('SimpleBackDrop component rendered')
    return (
        <Styles.Backdrop open={openBackdrop} {...others}>
            <CircularProgress color="inherit" />
        </Styles.Backdrop>
    )
}


export default React.memo(SimpleBackDrop)