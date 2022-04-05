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

        modalTitle, 
        openPopup, 
        openInPopup,
        setOpenPopup,
        recordForEdit,
        getFinalDisplayRecords,

        
        values, 
        setValues,
        errors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        hoursWorkedRadioItems,

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
                <Controls.TblBody 
                    records={getFinalDisplayRecords()}
                    setOpenPopup={setOpenPopup}
                    openInPopup={openInPopup}
                />
            </Controls.TblContainer>
            <Controls.TblPagination 
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={pages}
                count={records.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Controls.Modal
                modalTitle={modalTitle}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                
                <Controls.Form onSubmit={handleSubmit}>
                    <Controls.StudentFormGrid
                        recordForEdit={recordForEdit}
                        setValues={setValues}
                        values={values}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        handleCancel={handleCancel}
                        getCourseOptions={getCourseOptions}
                        hoursWorkedRadioItems={hoursWorkedRadioItems}
                    />
                </Controls.Form>
            </Controls.Modal>
            
        </>
    )
}
