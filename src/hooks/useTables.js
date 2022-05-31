import { useState } from 'react'

import { useEditModal, useDetailedViewModal, usePagination, useSorting, useFilter } from  './index'

import * as SMSRecordService from '../services/SMSRecordService'



export function useQueryResultTable(userFeedbackObj, results) {

    // consider to use useReducer to help manage more states set from the state var
    // if this increases by more than 5 sets of states total
    const [records, setRecords] = useState(results)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [recordForView, setRecordForView] = useState(null)

    // pagination
    const {
      pages,
      page,
      // setPage,
      rowsPerPage,
      // setRowsPerPage
      handleChangePage,
      handleChangeRowsPerPage,
      recordsAfterPaging
    } = usePagination(records)

    // sorting
    const {
      order,
      setOrder,
      orderBy,
      setOrderBy,
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

      // returned by useForm() for editing student record
    //   values, 
    //   setValues,
    //   errors,
    //   setErrors,
      studentFormState,
      handleInputChange,
      handleEditSubmit,
      handleEditCancel,
      getCourseOptions,
      getRotationOptions,
      hoursWorkedRadioItems,
      convertToDefaultEventParam,
      
      // used for modal config
      modalTitle, 
      openModal, 
      openInModal,
      setOpenModal,
      closeModal,
    //   success,
    //   loading,

      addRotModalOpen,
      addRotModalTitle,

      handleAddRot,
      handleCloseAddRot,
      handleAddRotInputChange,
      handleAddRotSubmit,
      handleAddRotClear,
    //   rotationValues,
    //   rotationErrors,

    } = useEditModal(
        SMSRecordService.getInitialStudentValues, 
        setRecordForEdit, 
        setRecords, 
        userFeedbackObj, 
        recordForEdit)


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
        setRecords,
        tableData,

        //paging 
        pages,
        page,
        // setPage,
        rowsPerPage,
        // setRowsPerPage
        handleChangePage,
        handleChangeRowsPerPage,
        recordsAfterPaging,


        // sorting
        order,
        setOrder,
        orderBy,
        setOrderBy,
        handleSortRequest,
        recordsAfterSorting,

        // filtering
        recordsAfterFiltering,
        handleFilter,
        textInput,
        handleClear,
        filterLabel,

        
        // final display records
        getFinalDisplayRecords,


        // modal handling for edit
        modalTitle, 
        openModal, 
        openInModal,
        setOpenModal,
        closeModal,
        recordForEdit,

        // modal handling for view
        recordForView,
        setRecordForView,

        // delete operations
        handleDeletePress,

        // used for edit forms
        studentFormState,
        // values, 
        // setValues,
        // errors,
        // setErrors,
        handleInputChange,
        handleEditSubmit,
        handleEditCancel,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,
        // success,
        // loading,

        addRotModalOpen,
        addRotModalTitle,
        handleAddRot,
        handleCloseAddRot,
        handleAddRotInputChange,
        handleAddRotSubmit,
        handleAddRotClear,
        // rotationValues,
        // rotationErrors,
        
    }
}


export function useDetailedViewTable (recordForView, setRecordForView) {

    
    const getDetailedRecord = () => {
        return recordForView
    }
    

    const {
        detailedViewModalTitle,
        detailedViewOpen,
        detailedViewClose,
        openInDetail,
    } = useDetailedViewModal(setRecordForView)
    
    return {
        detailedViewModalTitle,
        detailedViewOpen,
        detailedViewClose,
        openInDetail,
        getDetailedRecord,
    }
}
