import React from "react";
import CreateForm from "./CreateForm"
import Controls from '../../components/index';


export default function Create() {
  return (
    <Controls.Paper>        
      <Controls.BaseTypography
        text="CREATE NEW STUDENT RECORD"
        align='center'
        sx={{ marginBottom:  3}}
    />
      <CreateForm />
    </Controls.Paper>
  )
}
