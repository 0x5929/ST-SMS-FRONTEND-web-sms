import React from 'react';
import Components from '../../../components';


function Copyright(props) {
    return (
        <Components.BaseTypography 
            variant="p" 
            color="text.secondary" 
            align="center"
            text={`Copyright © Elemental Software Solutions ${new Date().getFullYear()}.`}
            
            {...props}
        />
    );
  }


export default Copyright