import { useState, useRef } from "react";
import * as SMSRecordService from '../services/SMSRecordService'

export default function useFilter(setRecords) {

    const [filterFn, setFilterFn] = useState({ fn: items => {return items}})

    const handleFilter = e => {
        let target = e.target;

        setFilterFn({
            fn: items => {
                if (target === ''){
                    return items;
                }
                else {
                    return items.filter( x => {
                        if (x.studentId.toLowerCase().includes(target.value) ||
                            x.firstName.toLowerCase().includes(target.value) ||
                            x.lastName.toLowerCase().includes(target.value) ||
                            x.email.toLowerCase().includes(target.value) ||
                            x.phoneNumber.includes(target.value) ){
                                return true
                            }
                        else{
                            return false
                        }
                    
                    })
                }
            }
        })
    }

    const recordsAfterFiltering = (records) => {
        return filterFn.fn(records)
    }
  
    const textInput = useRef(null);

    const handleClear = (textInput) => {
        textInput.current.value = "";
        setRecords(SMSRecordService.getAllRecords())
    }

    return {
        filterFn,
        setFilterFn,
        handleFilter,
        recordsAfterFiltering,
        textInput,
        handleClear
    }
}