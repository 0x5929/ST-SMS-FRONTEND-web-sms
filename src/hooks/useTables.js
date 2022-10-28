import { useState, useCallback, useRef, useEffect } from 'react'
import * as SMSRecordService from '../services/SMSRecordService'

export default function useQueryResultTable(userFeedbackObj, results) {

    const [records, setRecords] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [recordForView, setRecordForView] = useState(null)
    const [paginationStates, paginationHandlers] = usePagination(records)
    const [sortingStates, sortingHandlers]= useSorting()
    const [filterStates, filterHandlers] = useFilter(setRecords)

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
    
  
    useEffect(() => setRecords(results), [results])

    const useQueryResultTableStates = { 
        records, 
        recordForEdit, 
        recordForView, 
        paginationStates, 
        sortingStates,
        filterStates,
    }

    const useQueryResultTableHandlers = {
        setRecords,
        setRecordForEdit,
        setRecordForView,
        getTableData,
        getFinalDisplayRecords,
        handleDeletePress,
        paginationHandlers,
        sortingHandlers,
        filterHandlers,
    }

    return [useQueryResultTableStates, useQueryResultTableHandlers]

}


function useFilter(setRecords) {

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


function useSorting () {

    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()
  
  
    const handleSortRequest = useCallback((cellId) =>{
        // first, check current state (if the column has been clicked before and if the order is ascending)
        const isAscending = orderBy === cellId && order === 'asc';
        
        // set the order to either asc for ascending or desc for descending
        setOrder(isAscending?'desc':'asc')
  
        // lastly  set the order by of the current selected column
        setOrderBy(cellId)
  
      }, [order, orderBy])
  
      // below three functions are copied directly from mui, and is for sorting purpose
      function descendingComparator(a, b, orderBy) {
          if (b[orderBy] < a[orderBy]) {
          return -1;
          }
          if (b[orderBy] > a[orderBy]) {
          return 1;
          }
          return 0;
      }
      
      const getComparator = useCallback((order, orderBy) =>{
          return order === 'desc'
              ? (a, b) => descendingComparator(a, b, orderBy)
              : (a, b) => -descendingComparator(a, b, orderBy);
      }, [])
  
  
      // This method is created for cross-browser compatibility, if you don't
      // need to support IE11, you can use Array.prototype.sort() directly
      function stableSort(array, comparator) {
          const stabilizedThis = array.map((el, index) => [el, index]);
          stabilizedThis.sort((a, b) => {
              const order = comparator(a[0], b[0]);
              if (order !== 0) {
              return order;
              }
              return a[1] - b[1];
          });
          return stabilizedThis.map((el) => el[0]);
      }
  
  
      const recordsAfterSorting = useCallback((recordsAfterPaging) => {
          return stableSort(recordsAfterPaging, getComparator(order, orderBy))
      }, [getComparator, order, orderBy])
  
      const sortingStates = { order, orderBy }
      const sortingHandlers = { handleSortRequest, recordsAfterSorting }
  
      return [sortingStates, sortingHandlers]
}



function usePagination(records) {


    // paging
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    const handleChangePage = useCallback((event, newPage) =>{
        setPage(newPage)
    }, [])

    const handleChangeRowsPerPage = useCallback(event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        
        // after configuring how many rows per page, we set ui to the first page
        setPage(0);
    }, [])

    const recordsAfterPaging = useCallback((recordsTobePaged) =>{
        // slice start is inclusive, and end is exclusive
        // we only want the records that 
        // (lets say starts from page 0 and 5 rows per page, so formula equals to 0, and end index to be 1 * 5, so 5, so only so records[0] to records[4])
        return recordsTobePaged.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }, [page, rowsPerPage])

    const paginationStates = { pages, page, rowsPerPage }
    const paginationHandlers = { handleChangePage, handleChangeRowsPerPage, recordsAfterPaging}
    
    return [paginationStates, paginationHandlers]
    
}
