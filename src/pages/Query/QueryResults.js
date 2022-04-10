import React from 'react'
import useTable from '../../controllers/query/tableController'
import Controls from '../../components'
import {useNotification, useConfirmDialog} from '../../controllers/query/userFeedbackController'


export default function QueryResults() {


    const {

        notify,
        setNotify,
        closeNotification,

    } = useNotification(Controls.TransitionSlide)
    

    const {
        confirmDialog,
        setConfirmDialog,
        handleUnconfirmed
    } = useConfirmDialog()


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
        recordForEdit,

        // delete operations
        handleDeletePress,

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
        setNotify,
        notify,
        confirmDialog,
        setConfirmDialog
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
                    handleDeletePress={handleDeletePress}
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
                closeNotification={closeNotification}
            />
            <Controls.ConfirmDialog 
                confirmDialog={confirmDialog}
                handleUnconfirmed={handleUnconfirmed}
            />
        </>
    )
}
