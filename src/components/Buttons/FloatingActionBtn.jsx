import React from 'react';

import Styles from './styles'

export default function Fab(props) {

    const { children, ...others } = props

    return (

        <Styles.Fab
            {...others}
        >
            { children }
        </Styles.Fab>

    )
}