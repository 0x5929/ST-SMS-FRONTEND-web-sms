import React, { useState } from 'react'
import { styled } from '@mui/material/styles';

// FORM STATE
export function useForm(initialStudentValues) {

    
    const [values, setValues] = useState(initialStudentValues);

    const handleInputChange = e => {
        const { name, value } = e.target

        // set value of the changed input, and add the rest of values obj
        setValues({
            ...values,
            [name] : value
        })
    }


    // return an obj that contains our state 
    return {
        values, 
        setValues,
        handleInputChange

    }
}


// FORM ELEMENT
const InputForm = styled('form')(( {theme} ) => ({

    '& .MuiFormControl-root':{    
        width: '80%',
        margin: theme.spacing(1)
    }
}));



export function Form (props) {

    return (
        <InputForm autoComplete='off'>
            {props.children}
        </InputForm>
    )

}