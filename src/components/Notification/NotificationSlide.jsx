import React from 'react';

import { Slide } from '@mui/material';

function NotificationSlide (props) {
    console.log('NotificationSlide component rendered')
    return (
        <Slide 
            { ...props}
            direction="up" 
            timeout={500}
        />
    );
}

export default React.memo(NotificationSlide)