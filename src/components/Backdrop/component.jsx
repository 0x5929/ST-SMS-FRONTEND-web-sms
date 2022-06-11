import React from 'react'
import Styles from './styles'

export default function SimpleBackDrop(props) {

    const { openBackdrop, ...others } = props

    return (
        <Styles.Backdrop open={openBackdrop} {...others}>
            <Styles.CircularProgress color="inherit" />
        </Styles.Backdrop>
    )
}
