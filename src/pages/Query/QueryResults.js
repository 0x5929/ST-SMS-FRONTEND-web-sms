import React from 'react'
import useTable from '../../controllers/query/tableController'
import Controls from '../../components'


export default function QueryResults() {


    
    const {
        records,
        tableData,


        pages,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,


        orderBy,
        order,
        handleSortRequest,
        handleFilter,

        getFinalDisplayRecords

    } = useTable()



      
    
    return (
        <>
            <Controls.FilterBar 
                handleFilter={handleFilter}
            />
            <Controls.TblContainer>
                <Controls.TblHead 
                    tableData={tableData} 
                    handleSortRequest={handleSortRequest}
                    orderBy={orderBy}
                    order={order}
                />
                <Controls.TblBody records={getFinalDisplayRecords()} />
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
