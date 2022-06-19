import { useState, useRef, useCallback } from "react";
import * as SMSRecordService from '../services/SMSRecordService'

export default function useFilter(setRecords) {

    const textInput = useRef(null);
    const [filterFn, setFilterFn] = useState({ fn: items => {return items}})

    const handleFilter = useCallback(e => {
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
    }, [])

    const recordsAfterFiltering = useCallback((records) => {
        return filterFn.fn(records)

    }, [filterFn])
  

    const handleClear = useCallback((textInput, index) => {
        // index is ignored here, since we only have one search/filterbar
        // index is used for queryController, where we can have more than one search bar
        textInput.current.value = "";
        setRecords(SMSRecordService.getAllRecords())
    }, [setRecords])

    const filterStates = { textInput, filterFn }
    const filterHandlers = {handleFilter, handleClear, recordsAfterFiltering} 

    return [ filterStates, filterHandlers ]
}