import React from 'react'

import Styles from './styles'




export default function Card(props) {

    const { typographyVariant, title, model, stats, children, ...others } = props

    return (
        <Styles.Card
            { ...others }
        >
            <Styles.CardContent>
                <Styles.Typography 
                    text={title}
                    justify="center"
                />
                <Styles.Typography 
                    variant="p"
                    text={`There are total of ${stats} ${model}s.`}
                />

                { children }
            </Styles.CardContent>

        </Styles.Card>
    )
}
