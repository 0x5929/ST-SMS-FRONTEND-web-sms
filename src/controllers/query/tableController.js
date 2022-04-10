import { useState } from 'react'

import usePagination from './pagingController'
import useSorting from './sortingController'
import useFilter from './filterController'
import useModal from  './modalController'

import * as studentRecordService from '../../services/SMSRecordService'

import * as tableData from '../../data/tableData'

import * as studentData from '../../data/studentData'


export default function useTable(useNotificationObj) {

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
    } = useModal(studentData.initialStudentValues, setRecordForEdit, setRecords, useNotificationObj)


    const getFinalDisplayRecords = () =>{
      let filteredResults = recordsAfterFiltering(records)
      let sortedResults = recordsAfterSorting(filteredResults)

      return recordsAfterPaging(sortedResults)
    }

    const handleDelete = (record) => {
      // we can also had a dialog asking, are you sure?
      // absolutely sure?
      console.log('THIS SHOULD BE A DELETE REQUEST: ', record)
  }
  
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


        // modal handling
        modalTitle, 
        openModal, 
        openInModal,
        setOpenModal,
        closeModal,
        handleDelete,
        recordForEdit,

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
