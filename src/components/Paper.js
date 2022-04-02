import React from 'react';
import {Paper as MuiPaper} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormPaper = styled(MuiPaper)(( {theme} ) => ({
    'margin' : theme.spacing(5),
    'padding': theme.spacing(3)
  }));
  
  
  
export default function Paper(props) {

    return (  
        <FormPaper>
            {props.children}
        </FormPaper>
    );
}

