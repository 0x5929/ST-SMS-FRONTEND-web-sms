import { useState, useCallback } from 'react'

import { useEditModal, useDetailedViewModal, usePagination, useSorting, useFilter } from  './index'

import * as SMSRecordService from '../services/SMSRecordService'



export default function useQueryResultTable(userFeedbackObj, results) {

    const [records, setRecords] = useState(results)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [recordForView, setRecordForView] = useState(null)
    const [paginationStates, paginationHandlers] = usePagination(records)
    const [sortingStates, sortingHandlers]= useSorting()
    const [filterStates, filterHandlers] = useFilter(setRecords)
    const [detailedViewTableStates, detailedViewTableHandlers] = useDetailedViewTable(recordForView, setRecordForView)
    const [editModalStates, editModalHandlers] = useEditModal(

        SMSRecordService.getInitialStudentValues(), 
        setRecordForEdit, 
        setRecords, 
        userFeedbackObj, 
        recordForEdit
    )

    const { getTableData } = SMSRecordService
    const { notificationHandlers, confirmDialogHandlers } = userFeedbackObj

    const getFinalDisplayRecords = useCallback(() =>{
      let filteredResults = filterHandlers.recordsAfterFiltering(records)
      let sortedResults = sortingHandlers.recordsAfterSorting(filteredResults)

      return paginationHandlers.recordsAfterPaging(sortedResults)
    }, [filterHandlers, paginationHandlers, records, sortingHandlers])


    const _handleDelete = useCallback((record) => {

        confirmDialogHandlers.handleUnconfirmed()

        SMSRecordService.deleteRecord(record.pk)
        setRecords(SMSRecordService.getAllRecords())

        notificationHandlers.handleOpenNotification('Student record deleted!', 'error')

        console.log('Delete successful: ', record)
    }, [confirmDialogHandlers, notificationHandlers])

    const handleDeletePress = useCallback((record) =>{

        confirmDialogHandlers.handleConfirmed(
            'Are you sure you want to delete this student record?', 
            'This operation cannot be undone, so you must be sure.',
            ()=> (_handleDelete(record)))
        
    },[_handleDelete, confirmDialogHandlers])
    
  
    const useQueryResultTableStates = { 
        records, 
        recordForEdit, 
        recordForView, 

        paginationStates, 
        sortingStates,
        filterStates,
        detailedViewTableStates,
        editModalStates
    }

    const useQueryResultTableHandlers = {
        getTableData,
        getFinalDisplayRecords,
        handleDeletePress,

        paginationHandlers,
        sortingHandlers,
        filterHandlers,
        detailedViewTableHandlers,
        editModalHandlers,
    }

    return [useQueryResultTableStates, useQueryResultTableHandlers]

}


function useDetailedViewTable (recordForView, setRecordForView) {

    const getDetailedRecord = useCallback(() => {
        return recordForView
    }, [recordForView])

    const [detailedViewModalStates, detailedViewModalHandlers]  = useDetailedViewModal(setRecordForView)
    const detailedViewTableStates = { detailedViewModalStates }
    const detailedViewTableHandlers = { getDetailedRecord, detailedViewModalHandlers}

    return [detailedViewTableStates, detailedViewTableHandlers]
}
