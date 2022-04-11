import React from 'react'
import { useQueryResultTable, useDetailedViewTable } from '../../controllers/tableController'
import { useNotification, useConfirmDialog } from '../../controllers/userFeedbackController'
import Controls from '../../components'


export default function QueryResults() {


    const {

        notify,
        setNotify,
        closeNotification,

    } = useNotification(Controls.NotificationSlide)
    

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


        //filtering
        textInput,
        handleClear,

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

        // modal handling for view
        recordForView,
        setRecordForView,

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

    } = useQueryResultTable({
        setNotify,
        notify,
        confirmDialog,
        setConfirmDialog
    })

    const {
        detailedViewModalTitle,
        detailedViewOpen,
        detailedViewClose,
        openInDetail,
        getDetailedRecord,
    } = useDetailedViewTable(recordForView, setRecordForView)
    
    return (
        <>
            <Controls.FilterBar 
                handleFilter={handleFilter}
                textInput={textInput}
                handleClear={handleClear}

            />
            <Controls.QueryTblContainer>
                <Controls.QueryTblHead 
                    tableData={tableData} 
                    handleSortRequest={handleSortRequest}
                    orderBy={orderBy}
                    order={order}
                />
                <Controls.QueryTblBody 
                    records={getFinalDisplayRecords()}
                    openInModal={openInModal}
                    openInDetail={openInDetail}
                    handleDeletePress={handleDeletePress}
                />
            </Controls.QueryTblContainer>
            <Controls.QueryTblPagination 
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
            <Controls.Modal
                modalTitle={detailedViewModalTitle}
                openModal={detailedViewOpen}
                closeModal={detailedViewClose}
                onBackdropClick={detailedViewClose}
            >
                <Controls.DetailedTblContainer>
                    <Controls.DetailedTblHead 
                        tableData={tableData} 
                    />
                    <Controls.DetailedTblBody 
                        record={getDetailedRecord()}
                        tableData={tableData}
                    />
                </Controls.DetailedTblContainer>
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
