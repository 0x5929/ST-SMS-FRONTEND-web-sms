import React from 'react';
import Styles from './styles'

export default function NotificationSlide (props) {

    return (
        <Styles.Slide 
            { ...props}
            direction="up" 
        />
    );
}