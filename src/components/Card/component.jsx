import React from 'react'

import Styles from './styles'




export default function Card(props) {

    const { title, children, ...others } = props

    return (
        <Styles.Card
            { ...others }
        >
            <Styles.CardContent>
                <Styles.Typography 
                    text={title}
                    justify="center"
                />

                { children }
            </Styles.CardContent>

        </Styles.Card>
    )
}
