import React from 'react';
import Styles from './styles'

export default function Image(props) {

    const { alt, loc, ...others } = props;


    return (  
        <Styles.Img
            component="img"
            alt={alt}
            src={loc}
            
            {...others}
        />
    );
}


