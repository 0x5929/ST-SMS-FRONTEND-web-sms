import React from 'react'
import Styles from './styles'

export default function Form (props) {

    const { children, ...others } = props;

    return (
        <Styles.Form autoComplete="off"
            {...others}
        >
            {children}
        </Styles.Form>
    )

}