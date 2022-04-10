import React from 'react'
import useTable from '../../controllers/query/tableController'
import Controls from '../../components'
import useNotification from '../../controllers/query/userFeedbackController'


export default function QueryResults() {


    const {

        notify,
        setNotify

    } = useNotification(Controls.TransitionSlide)
    
    const {

        // table
        records,
        tableData,
        getFinalDisplayRecords,


        // paging
        pages,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,


        // sorting
        orderBy,
        order,
        handleSortRequest,
        handleFilter,

        // modals
        modalTitle, 
        openModal, 
        openInModal,
        closeModal,
        handleDelete,
        recordForEdit,

        // edit forms
        values, 
        errors,
        handleInputChange,
        handleEditSubmit,
        handleEditCancel,
        getCourseOptions,
        hoursWorkedRadioItems,
        populateFormFieldsForEdit,

    } = useTable({
        setNotify: setNotify,
        notify: notify
    })

    
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
                    openInModal={openInModal}
                    handleDelete={handleDelete}
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
                openModal={openModal}
                closeModal={closeModal}
            >
                <Controls.Form onSubmit={handleEditSubmit}>
                    <Controls.StudentFormGrid
                        recordForEdit={recordForEdit}
                        values={values}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        handleCancel={handleEditCancel}
                        getCourseOptions={getCourseOptions}
                        hoursWorkedRadioItems={hoursWorkedRadioItems}
                        populateFormFieldsForEdit={populateFormFieldsForEdit}
                    />
                </Controls.Form>
            </Controls.Modal>
            <Controls.Notification 
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}
