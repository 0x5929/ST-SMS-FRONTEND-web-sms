import { useState } from 'react'

import usePagination from './pagingController'
import useSorting from './sortingController'
import useFilter from './filterController'
import useModal from  './modalController'

import * as studentRecordService from '../../services/SMSRecordService'

import * as tableData from '../../data/tableData'

import * as studentData from '../../data/studentData'


export default function useTable() {

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
      values, 
      setValues,
      errors,
      setErrors,
      handleInputChange,
      handleSubmit,
      handleCancel,
      getCourseOptions,
      hoursWorkedRadioItems,
  
      modalTitle, 
      openPopup, 
      openInPopup,
      setOpenPopup 
    } = useModal(studentData.initialStudentValues, setRecordForEdit)


    const getFinalDisplayRecords = () =>{
      let filteredResults = recordsAfterFiltering(records)
      let sortedResults = recordsAfterSorting(filteredResults)

      return recordsAfterPaging(sortedResults)
    }


    return {
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

        // modal handling
        recordForEdit,
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        hoursWorkedRadioItems,
        modalTitle, 
        openPopup, 
        openInPopup,
        setOpenPopup,

        getFinalDisplayRecords
    }
}
