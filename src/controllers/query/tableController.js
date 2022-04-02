import { useState } from 'react'

import * as studentRecordService from '../../services/SMSRecordService'

import * as tableData from '../../data/tableData'





export default function useTable() {

    const [records, setRecords] = useState(studentRecordService.getAllRecords())

  
    return {
        records, 
        setRecords,
        tableData,
    }
}
