import { useState, useRef } from "react";
import * as SMSRecordService from '../services/SMSRecordService'

export default function useFilter(setRecords) {

    const filterLabel = 'Search Results'
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
                        if (x.studentId.toLowerCase().includes(target.value.toLowerCase()) ||
                            x.firstName.toLowerCase().includes(target.value.toLowerCase()) ||
                            x.lastName.toLowerCase().includes(target.value.toLowerCase()) ||
                            x.email.toLowerCase().includes(target.value.toLowerCase()) ||
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

    const handleClear = (textInput, index) => {
        // index is ignored here, since we only have one search/filterbar
        // index is used for queryController, where we can have more than one search bar
        textInput.current.value = "";
        setRecords(SMSRecordService.getAllRecords())
    }

    return {
        filterFn,
        setFilterFn,
        handleFilter,
        recordsAfterFiltering,
        textInput,
        handleClear,
        filterLabel
    }
}