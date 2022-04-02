import React from 'react'
import useTable from '../../controllers/query/tableController'
import usePagination from '../../controllers/query/pagingController'
import Controls from '../../components'


  

export default function QueryResults() {


    
    const {
        records,
        //setRecords,
        tableData,



    } = useTable()

    
    const {
        pages,
        page,
        // setPage,
        rowsPerPage,
        // setRowsPerPage
    } = usePagination()

      
    
    return (
        <>
        <Controls.TblContainer>
            <Controls.TblHead tableData={tableData} />
            <Controls.TblBody records={records} />
        </Controls.TblContainer>
        <Controls.TblPagination 
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={pages}
            count={records.length}
        />
        </>
    )
}
