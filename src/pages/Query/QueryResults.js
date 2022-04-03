import React from 'react'
import useTable from '../../controllers/query/tableController'
import usePagination from '../../controllers/query/pagingController'
import Controls from '../../components'


  

export default function QueryResults() {


    
    const {
        records,
        //setRecords,
        tableData,
        orderBy,
        order,
        handleSortRequest,
        recordsAfterSorting


    } = useTable()

    
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

      
    
    return (
        <>
            <Controls.TblContainer>
                <Controls.TblHead 
                    tableData={tableData} 
                    handleSortRequest={handleSortRequest}
                    orderBy={orderBy}
                    order={order}
                />
                <Controls.TblBody records={recordsAfterSorting(recordsAfterPaging())} />
            </Controls.TblContainer>
            <Controls.TblPagination 
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={pages}
                count={records.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}
