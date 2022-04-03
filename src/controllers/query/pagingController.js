import { useState } from 'react'

export default function usePagination(records) {


    // paging
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    const handleChangePage = (event, newPage) =>{
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        
        // after configuring how many rows per page, we set ui to the first page
        setPage(0);
    }

    const recordsAfterPaging = () =>{
        // slice start is inclusive, and end is exclusive
        // we only want the records that 
        // (lets say starts from page 0 and 5 rows per page, so formula equals to 0, and end index to be 1 * 5, so 5, so only so records[0] to records[4])
        return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return {
        pages,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        recordsAfterPaging
    }
}
