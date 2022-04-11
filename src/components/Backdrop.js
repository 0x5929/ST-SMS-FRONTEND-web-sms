import React from 'react'

import { Backdrop, CircularProgress } from '@mui/material'

export default function SimpleBackDrop(props) {

    const { openBackdrop } = props

    return (
        <Backdrop
            sx={{color: '#fff'}}
            open={openBackdrop}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
