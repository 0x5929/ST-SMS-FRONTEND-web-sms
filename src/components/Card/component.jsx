import React from 'react'
import { Card as MuiCard ,CardContent  } from '@mui/material';
import { BaseTypography } from '../Typography';

import createCardStyles from './styles'

const Styles = createCardStyles({MuiCard, BaseTypography})

function BaseCard({ title, children, ...others }) {
    console.log('BaseCard component rendered')

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


export default React.memo(BaseCard)