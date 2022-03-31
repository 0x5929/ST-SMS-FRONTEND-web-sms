import { useState } from 'react'

// FORM STATE
export default function useForm(initialStudentValues, validateOnChange=false, validate) {


    
    // form state
    const [values, setValues] = useState(initialStudentValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target

        // set value of the changed input, and add the rest of values obj
        setValues({
            ...values,
            [name] : value
        })
        
        if (validateOnChange)
            validate({[name]: value}, setErrors, errors)
        

    }

    const handleSubmit = e =>{
        // DEV configuration so we dont refresh the page when testing submit button
        e.preventDefault()

        if (validate(values, setErrors, errors)){
            window.alert('Testing submit...')
        }

    }



    const handleCancel = e =>{
        setValues(initialStudentValues)
        setErrors({})
    }



    
    // return an obj that contains our state 
    return {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel
    }
}


