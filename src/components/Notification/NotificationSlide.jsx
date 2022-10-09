import React from 'react';

import { Slide } from '@mui/material';

function NotificationSlide (props) {
    
    return (
        <Slide 
            { ...props}
            
            direction="up" 
            timeout={500}
        />
    );
}

export default React.memo(NotificationSlide)