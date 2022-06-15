import React from 'react'
import { Card  , CardContent  } from '@mui/material';
import { BaseTypography } from '../Typography';

import createCardStyles from './styles'

const Styles = createCardStyles(Card, BaseTypography)


function BaseCard(props) {

    const { title, children, ...others } = props

    return (
        <Styles.Card
            raised
            { ...others }
        >
            <CardContent>
                <Styles.Typography 
                    text={title}
                    justify="center"
                />

                { children }
            </CardContent>

        </Styles.Card>
    )
}


export default BaseCard