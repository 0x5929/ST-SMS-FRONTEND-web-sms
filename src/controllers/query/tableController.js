import { useState } from 'react'

import usePagination from './pagingController'
import useSorting from './sortingController'
import useFilter from './filterController'
import useModal from  './modalController'

import * as studentRecordService from '../../services/SMSRecordService'

import * as tableData from '../../data/tableData'

import * as studentData from '../../data/studentData'


export default function useTable(userFeedbackObj) {

    const [records, setRecords] = useState(studentRecordService.getAllRecords())
    const [recordForEdit, setRecordForEdit] = useState(null)

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
      handleFilter
    } = useFilter()


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
    } = useModal(studentData.initialStudentValues, setRecordForEdit, setRecords, userFeedbackObj)


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

        
        // final display records
        getFinalDisplayRecords,


        // modal handling for edit
        modalTitle, 
        openModal, 
        openInModal,
        setOpenModal,
        closeModal,
        recordForEdit,


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
