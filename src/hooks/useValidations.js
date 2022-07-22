import { useCallback, useMemo } from 'react'

function useValidations() {
        // returns true or false, and sets error object for validation 
    
    // custom pattern built just for the Query Form.
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


    const useCreateValidation = () => {
        let simpleEmailRegex = useMemo(()=>/.+@.+..+/, []);
        let studentIdRegex = useMemo(()=>/^(RO|AL)-(CNA|HHA|SG|ESOL|BLS|HSFA)-\d{1,3}-\d{4}-[A-Z]{2}$/, []);
        let phoneRegex = useMemo(()=>/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, []);
        let moneyRegex = useMemo(()=>/^[0-9]+\.?[0-9]?[0-9]?$/, []);
        
        // NOTE: DRY violated here because useCallback cant be called in for loop or a forEach callback
        return {
            studentId                       : useCallback((value) => (studentIdRegex.test(value)) ? {} : { error: true, helperText: 'Please enter the correct format. ie: RO-CNA-10-1005-KR' }, [studentIdRegex]),
            firstName                       : useCallback((value) => value !== '' ? {} : { error: true, helperText: 'This field is required.' }, []),
            lastName                        : useCallback((value) => value !== '' ? {} : { error: true, helperText: 'This field is required.' }, []),
            mailingAddress                  : useCallback((value) => value !== '' ? {} : { error: true, helperText: 'This field is required.' }, []),
            email                           : useCallback((value) => (simpleEmailRegex.test(value)) ? {} : { error: true, helperText: 'Incorrect email format.' }, [simpleEmailRegex]),
            phoneNumber                     : useCallback((value) => (phoneRegex.test(value)) ? {} : { error: true, helperText: 'Please enter the correct format. ie: xxx-xxx-xxxx' }, [phoneRegex]),
            course                          : useCallback((value) => value !== '' ? {} : { error: true }, []),
            rotation                        : useCallback((value) => value !== '' ? {} : { error: true }, []),
            courseCost                      : useCallback((value) => (moneyRegex.test(value)) ? {} : { error: true, helperText: 'Please enter the correct format. ie: xxxx.xx' }, [moneyRegex]),
            chargesCharged                  : useCallback((value) => (moneyRegex.test(value)) ? {} : { error: true, helperText: 'Please enter the correct format. ie: xxxx.xx' }, [moneyRegex]),
            chargesPaid                     : useCallback((value) => (moneyRegex.test(value)) ? {} : { error: true, helperText: 'Please enter the correct format. ie: xxxx.xx' }, [moneyRegex]),
            startDate                       : useCallback((value) => value !== '' ? {} : { error: true, helperText: 'This field is required.' }, []),
            completionDate                  : useCallback((value) => value !== '' ? {} : { error: true, helperText: 'This field is required.' }, []),
            dateEnrollmentAgreementSigned   : useCallback((value) => value !== '' ? {} : { error: true, helperText: 'This field is required.' }, []),
        }

    }

    const useAddRotValidation = () => {
        let numberRegex = useMemo(()=>/^[1-9]{1,}$/, [])

        return {
            programName : useCallback((value)=> value !== '' ? {} : { error: true, helperText: 'This field is required.'} , []),
            rotation    : useCallback((value)=> { console.log('value: ', value); return (numberRegex.test(value)) ? {} : { error: true, helperText: 'Only numeric format is allowed.'}}, [numberRegex])
        }
    }

    // returns true or false, and sets error object for validation 
    const useLoginValidation = () => {
        return {
            email   : useCallback((value) => value !== '' ? {} : {error: true, helperText: 'This field is required.'}, []),
            password: useCallback((value) => value !== '' ? {} : {error: true, helperText: 'This field is required.'}, [])
        }
    }

    return {
        queryValidation,
        useCreateValidation,
        useAddRotValidation,
        useLoginValidation,
    }
}


export default useValidations