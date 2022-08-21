import React from 'react';
import Components from '../../../components';


function Copyright(props) {
    console.log('Copyright feature rendered')
    return (
        <Components.BaseTypography 
            data-testid="copy-right"

            variant="p" 
            color="text.secondary" 
            align="center"
            text={`Copyright © Elemental Software Solutions ${getCurrentYear()}.`}
            
            {...props}
        />
    );
  }



export const getCurrentYear = () => new Date().getFullYear()
export default React.memo(Copyright)


