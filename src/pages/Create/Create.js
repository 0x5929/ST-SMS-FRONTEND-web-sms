import React from "react";
import CreateForm from "./CreateForm"
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const FormPaper = styled(Paper)(( {theme} ) => ({
  'margin' : theme.spacing(5),
  'padding': theme.spacing(3)
}));



export default function Create() {
  return (
    <FormPaper>
      <CreateForm />
    </FormPaper>
  )
}
