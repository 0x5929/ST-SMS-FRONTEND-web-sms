import { useState, useCallback, useRef, useEffect } from 'react'
import * as AxioService from '../services/api/djREST'
import * as tableData from '../services/data/tableData'
import { useAuthedAxios, useCircularProgress } from '../hooks'

export default function useQueryResultTable(userFeedbackObj, results) {

    const authedAxio = useAuthedAxios()
    const [records, setRecords] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [recordForView, setRecordForView] = useState(null)
    const [paginationStates, paginationHandlers] = usePagination(records)
    const [sortingStates, sortingHandlers]= useSorting()
    const [filterStates, filterHandlers] = useFilter(records, setRecords)
    const [ progressOn, handleSetProgressStatus ] = useCircularProgress()
    const { notificationHandlers, confirmDialogHandlers } = userFeedbackObj

    const getFinalDisplayRecords = useCallback(() =>{
      let filteredResults = filterHandlers.recordsAfterFiltering(records)
      let sortedResults = sortingHandlers.recordsAfterSorting(filteredResults)

      return paginationHandlers.recordsAfterPaging(sortedResults)
    }, [filterHandlers, paginationHandlers, records, sortingHandlers])


    const handleViewPress = useCallback( async (record) => {
    // convert rotation uuid string to rotation number upon viewing record        
        try {
                                        
            const rotNumber = await AxioService.rotationNumberByUUIDGET(authedAxio, record['rotation'])

            setRecordForView({...record, rotation: rotNumber})
        }
        catch(err) {
            console.error(err)
            setRecordForView(null)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const deleteAction = async (record) => {
        const responseData = await AxioService.studentRemoveDELETE(authedAxio, record['pk'])
        setRecords((prevRecords) => {
            let currentRecords = []

            for (let i = 0; i < prevRecords.length; i++) {
                if (prevRecords[i]['studentId'] === record['studentId']) {
                    continue
                }
                else {
                    currentRecords.push(prevRecords[i])
                }
            }
            return currentRecords
        })

        return responseData
    }


    const _handleDelete = async (record) => {
        confirmDialogHandlers.handleUnconfirmed()

        try {
            const progressResponse = await handleSetProgressStatus({progressState: true})

            if (progressResponse) {
                await handleSetProgressStatus({callback: deleteAction, callbackArgs: [record], progressState: false})
            }
            else {
                throw new Error('error in setting progress')
            }

            notificationHandlers.handleOpenNotification('Student record deleted!', 'error')
            
        }
        catch (err) {
            console.error('error: ', err, record)
            notificationHandlers.handleOpenNotification('Something went wrong, student record NOT deleted!', 'error')
        }
    }

    const handleDeletePress = useCallback((record) =>{

        confirmDialogHandlers.handleConfirmed(
            'Are you sure you want to delete this student record?', 
            'This operation cannot be undone, so you must be sure.',
            ()=> (_handleDelete(record)))
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
  
    useEffect(() => setRecords(results), [results])

    const useQueryResultTableStates = { 
        records, 
        recordForEdit, 
        recordForView, 
        paginationStates, 
        sortingStates,
        filterStates,
        progressOn,
        tableData
    }

    const useQueryResultTableHandlers = {
        setRecords,
        setRecordForEdit,
        setRecordForView,
        handleViewPress,
        getFinalDisplayRecords,
        handleDeletePress,
        paginationHandlers,
        sortingHandlers,
        filterHandlers,
    }

    return [useQueryResultTableStates, useQueryResultTableHandlers]

}


function useFilter(results, setRecords) {

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

    const recordsAfterFiltering = useCallback((records) =>  filterFn.fn(records), [filterFn])

    const handleClear = useCallback((records) => {
        textInput.current.value = ''
        setRecords([...records])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filterStates = { textInput }
    const filterHandlers = { handleFilter, handleClear, recordsAfterFiltering } 

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
      
      const recordsAfterSorting = useCallback((records) => {

        function getComparator (order, orderBy) {
            return order === 'desc'
                ? (a, b) => descendingComparator(a, b, orderBy)
                : (a, b) => -descendingComparator(a, b, orderBy);
        }
    
    
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
    
          return stableSort(records, getComparator(order, orderBy))

      }, [order, orderBy])
  
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
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages, rowsPerPage])

    const paginationStates = { pages, page, rowsPerPage }
    const paginationHandlers = { handleChangePage, handleChangeRowsPerPage, recordsAfterPaging}
    
    return [paginationStates, paginationHandlers]
    
}
