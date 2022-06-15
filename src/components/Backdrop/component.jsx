import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

import createBackdropStyles from './styles'

const Styles = createBackdropStyles(Backdrop)


function SimpleBackDrop({ openBackdrop, ...others }) {

    return (
        <Styles.Backdrop open={openBackdrop} {...others}>
            <CircularProgress color="inherit" />
        </Styles.Backdrop>
    )
}


export default SimpleBackDrop