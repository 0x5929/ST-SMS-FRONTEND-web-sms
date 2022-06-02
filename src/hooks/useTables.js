import { useState } from 'react'

import { useEditModal, useDetailedViewModal, usePagination, useSorting, useFilter } from  './index'

import * as SMSRecordService from '../services/SMSRecordService'



export default function useQueryResultTable(userFeedbackObj, results) {

    // consider to use useReducer to help manage more states set from the state var
    // if this increases by more than 5 sets of states total
    const [records, setRecords] = useState(results)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [recordForView, setRecordForView] = useState(null)

    // pagination
    const {
      pages,
      page,
      rowsPerPage,

      handleChangePage,
      handleChangeRowsPerPage,
      
      recordsAfterPaging
    } = usePagination(records)

    // sorting
    const {
      order,
      orderBy,
      handleSortRequest,
      recordsAfterSorting

    } = useSorting()


    // filtering
    const { 
      recordsAfterFiltering,
      handleFilter,
      textInput,
      handleClear,
      filterLabel,
    } = useFilter(setRecords)


    const { 

        studentFormState,
        handleInputChange,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,

        rotationFormValues,
        rotationFormErrors,
        isAddRotModalOpen,
        addRotModalTitle,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        handleAddRotSubmit,
        handleAddRotInputChange,
        handleAddRotClear,

        handleEditSubmit,
        handleEditCancel,

        editModalTitle,
        isEditModalOpen, 
        handleOpenEditModal,
        handleCloseEditModal,



    } = useEditModal(
        SMSRecordService.getInitialStudentValues(), 
        setRecordForEdit, 
        setRecords, 
        userFeedbackObj, 
        recordForEdit)



    const {
        detailedViewModalTitle,
        isDetailedViewModalOpen,
        handleDetailedViewModalClose,
        handleDetailedViewModalOpen,
        getDetailedRecord,
    } = useDetailedViewTable(recordForView, setRecordForView)


    const getFinalDisplayRecords = () =>{
      let filteredResults = recordsAfterFiltering(records)
      let sortedResults = recordsAfterSorting(filteredResults)

      return recordsAfterPaging(sortedResults)
    }

    const {

        notify,
        setNotify,
        confirmDialog,
        setConfirmDialog,

    } = userFeedbackObj

    const handleDelete = (record) => {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        SMSRecordService.deleteRecord(record.pk)
        setRecords(SMSRecordService.getAllRecords())

        setNotify({
            isOpen: true,
            message: 'Student record deleted!',
            type: 'error', 
            Transition: notify.Transition
        })
        
        console.log('Delete successful: ', record)
    }

    const handleDeletePress = (record) =>{
        
        setConfirmDialog({
            isOpen: true,
            title: 'Are you sure you want to delete this student record?',
            subTitle: 'This operation cannot be undone, so you must be sure.',
            onConfirm: ()=> (handleDelete(record))
    })}
    
    const tableData = SMSRecordService.getTableData()
  



    return {

        // table 
        records, 
        tableData,
        filterLabel,
        pages,
        page,
        order,
        orderBy,
        textInput,
        rowsPerPage,
        recordsAfterFiltering,
        recordsAfterPaging,
        recordsAfterSorting,
        handleClear,
        handleFilter,
        handleChangePage,
        handleSortRequest,
        handleChangeRowsPerPage,
        handleDeletePress,
        getFinalDisplayRecords,


        // modal handling for edit
        studentFormState,
        handleInputChange,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,

        rotationFormValues,
        rotationFormErrors,
        isAddRotModalOpen,
        addRotModalTitle,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        handleAddRotSubmit,
        handleAddRotInputChange,
        handleAddRotClear,

        handleEditSubmit,
        handleEditCancel,

        editModalTitle,
        isEditModalOpen, 
        handleOpenEditModal,
        handleCloseEditModal,


        // detailed view table
        detailedViewModalTitle,
        isDetailedViewModalOpen,
        handleDetailedViewModalClose,
        handleDetailedViewModalOpen,
        getDetailedRecord,
        
    }
}


function useDetailedViewTable (recordForView, setRecordForView) {

    
    const getDetailedRecord = () => {
        return recordForView
    }
    

    const {
        detailedViewModalTitle,
        isDetailedViewModalOpen,
        handleDetailedViewModalClose,
        handleDetailedViewModalOpen,
    } = useDetailedViewModal(setRecordForView)
    
    return {
        detailedViewModalTitle,
        isDetailedViewModalOpen,
        handleDetailedViewModalClose,
        handleDetailedViewModalOpen,
        getDetailedRecord,
    }
}
