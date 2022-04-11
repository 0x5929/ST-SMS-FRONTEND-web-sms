import { useState } from 'react'

import usePagination from './pagingController'
import useSorting from './sortingController'
import useFilter from './filterController'
import { useEditModal, useDetailedViewModal } from  './modalController'

import * as studentRecordService from '../services/SMSRecordService'

import * as tableData from '../data/tableData'

import * as studentData from '../data/studentData'


export function useQueryResultTable(userFeedbackObj, results) {

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

      // returned by useForm() of ../create/createFormController.js for editting student record
      values, 
      setValues,
      errors,
      setErrors,
      handleInputChange,
      handleEditSubmit,
      handleEditCancel,
      getCourseOptions,
      hoursWorkedRadioItems,
      populateFormFieldsForEdit,
      
      // used for modal config
      modalTitle, 
      openModal, 
      openInModal,
      setOpenModal,
      closeModal,
    } = useEditModal(studentData.initialStudentValues, setRecordForEdit, setRecords, userFeedbackObj)


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

        studentRecordService.deleteRecord(record.pk)
        setRecords(studentRecordService.getAllRecords())

        setNotify({
            isOpen: true,
            message: 'Student record deleted!',
            type: 'error', 
            Transition: notify.Transition
        })        
    }

    const handleDeletePress = (record) =>{
        
        setConfirmDialog({
            isOpen: true,
            title: 'Are you sure you want to delete this student record?',
            subTitle: 'This operation cannot be undone, so you must be sure.',
            onConfirm: ()=> (handleDelete(record))
    })}
    
  
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
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleEditSubmit,
        handleEditCancel,
        getCourseOptions,
        hoursWorkedRadioItems,
        populateFormFieldsForEdit,
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
