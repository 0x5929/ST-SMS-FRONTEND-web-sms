import { useState } from 'react'

import * as studentRecordService from '../../services/SMSRecordService'

import * as tableData from '../../data/tableData'
import Controls from '../../components'





export default function useTable() {

    const [records, setRecords] = useState(studentRecordService.getAllRecords())
  



  
    return {
        records, 
        setRecords,
        Controls,
        tableData
    }
}
