import React from 'react';
import Styles from './styles'


export default function Copyright(props) {
    return (
        <Styles.Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" 
            text={`Copyright © Company name ${new Date().getFullYear()}.`}
            
            {...props}
        />
    );
  }