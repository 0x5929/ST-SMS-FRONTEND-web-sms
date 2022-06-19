import { useCallback } from 'react'

function useValidations() {
        // returns true or false, and sets error object for validation 
    const queryValidation = useCallback((arrFieldValues, handleSetQueryFormErrorCallback, errors) => {
        let temp = {...errors}

        for (var index = 0; index < arrFieldValues.length; index++ ){
            for (let key in arrFieldValues[index]) {
                temp[key + arrFieldValues[index]['pk'].toString()] = (arrFieldValues[index][key] !== '')?'':'All fields required.'
            }
        }

        // returns false if any of the above if statements evaluates to false
        handleSetQueryFormErrorCallback(temp)
        return Object.values(temp).every(x => x === '')
    }, [])


    // returns true or false, and sets error object for validation 
    const loginValidation = useCallback((arrFieldValues, setErrors, errors) => {
        let temp = {...errors}

        if ('email' in arrFieldValues)
            temp.email = arrFieldValues.email !== '' ? '' : 'This field is required.'
        if ('password' in arrFieldValues)
                temp.password = arrFieldValues.password !== '' ? '' : 'This field is required.'


        // returns false if any of the above if statements evaluates to false
        setErrors({...temp})
        return Object.values(temp).every(x => x === '')
    }, [])

    // returns true or false, and sets error object for validation
    const addRotValidation = useCallback((arrFieldValues, setRotationFormErrors, errors) => {
        let temp = {...errors}

        let rotationRegex = /^[1-9]{1,}$/;

        if ('programName' in arrFieldValues)
            temp.programName = arrFieldValues.programName !== '' ? '' : 'This field is required.'
        if ('rotation' in arrFieldValues)
                temp.rotation = (rotationRegex.test(arrFieldValues.rotation))?'':'Only numeric format is allowed.'

        // returns false if any of the above if statements evaluates to false
        setRotationFormErrors({...temp})
        return Object.values(temp).every(x => x === '')
    }, [])
    
    // returns true or false, and sets error object for validation 
    const createValidation = useCallback((fieldValues, handleSetStudentFormErrorCallback, errors) => {
        let temp = {...errors}

        let simpleEmailRegex = /.+@.+..+/;
        let studentIdRegex = /^(RO|AL)-(CNA|HHA|SG|ESOL|BLS|HSFA)-\d{1,3}-\d{4}-[A-Z]{2}$/;
        let phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        let moneyRegex = /^[0-9]+\.?[0-9]?[0-9]?$/;
        
        // for individual/instant validation, check only the ones that are passed in
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName !== ''?'':'This field is required.'
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName !== ''?'':'This field is required.'
        if ('mailingAddress' in fieldValues)
            temp.mailingAddress = fieldValues.mailingAddress !== ''?'':'This field is required.'
        if ('email' in fieldValues)
            temp.email = (simpleEmailRegex.test(fieldValues.email))?'':'Incorrect email format.'
        if ('studentId' in fieldValues)
            temp.studentId = (studentIdRegex.test(fieldValues.studentId))?'':'Please enter the correct format. ie: RO-CNA-10-1005-KR'
        if ('phoneNumber' in fieldValues)
            temp.phoneNumber = (phoneRegex.test(fieldValues.phoneNumber))?'':'Please enter the correct format. ie: xxx-xxx-xxxx'
        if ('courseCost' in fieldValues)
            temp.courseCost = (moneyRegex.test(fieldValues.courseCost))?'':'Please enter the correct format. ie: xxxx.xx'
        if ('chargesCharged' in fieldValues)
            temp.chargesCharged = (moneyRegex.test(fieldValues.chargesCharged))?'':'Please enter the correct format. ie: xxxx.xx'
        if ('chargesPaid' in fieldValues)
            temp.chargesPaid = (moneyRegex.test(fieldValues.chargesPaid))?'':'Please enter the correct format. ie: xxxx.xx'
        if ('startDate' in fieldValues)
            temp.startDate = fieldValues.startDate?'':'This field is required.'
        if ('completionDate' in fieldValues)
            temp.completionDate = fieldValues.completionDate?'':'This field is required.'
        if ('dateEnrollmentAgreementSigned' in fieldValues)
            temp.dateEnrollmentAgreementSigned = fieldValues.dateEnrollmentAgreementSigned?'':'This field is required.'
        if ('course' in fieldValues)
                temp.course = fieldValues.course !== ''?'':'This field is required.'
        if ('rotation' in fieldValues)
                temp.rotation = fieldValues.rotation !== ''?'':'This field is required.'

        // returns false if any of the above if statements evaluates to false
        handleSetStudentFormErrorCallback(temp)
        
        return Object.values(temp).every( x => x === '') 

    }, [])


    
    return {
        createValidation,
        queryValidation,
        loginValidation,
        addRotValidation
    }
}


export default useValidations