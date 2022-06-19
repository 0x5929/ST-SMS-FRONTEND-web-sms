import { useState, useCallback } from 'react'

export default function usePagination(records) {


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
