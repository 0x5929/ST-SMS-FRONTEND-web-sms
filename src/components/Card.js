import React from 'react'

import { Card as MuiCard } from '@mui/material';
import CardContent from '@mui/material/CardContent';

import Typography from './Typography';
import { styled } from '@mui/material'


const CardWrapper = styled(MuiCard)(( {theme} ) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: theme.spacing(10),
    borderRadius: 2,
  
  }));
  
export default function Card(props) {

    const { typographyVariant, title, model, stats, children, ...others } = props

    return (
        <CardWrapper
            { ...others }
        >
            <CardContent>
                <Typography 
                    text={title}
                    justify="center"
                />
                <Typography 
                    variant="p"
                    text={`There are total of ${stats} ${model}s.`}
                />

                { children }
            </CardContent>

        </CardWrapper>
    )
}
