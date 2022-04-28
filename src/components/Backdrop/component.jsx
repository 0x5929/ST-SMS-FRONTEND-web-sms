import React from 'react'

import Styles from './styles'

export default function SimpleBackDrop(props) {

    const { openBackdrop } = props

    return (
        <Styles.Backdrop
            sx={{color: '#fff'}}
            open={openBackdrop}
        >
            <Styles.CircularProgress color="inherit" />
        </Styles.Backdrop>
    )
}
