import React from 'react';
import Styles from './styles'
  
export default function Paper(props) {
    const { children, ...others } = props
    return (  
        <Styles.Paper
            { ...others }
        >
            { children }
        </Styles.Paper>
    );
}

