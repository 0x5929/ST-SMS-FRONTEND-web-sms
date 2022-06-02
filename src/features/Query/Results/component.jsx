import React from 'react'

import { useQueryResultTable, useNotification, useConfirmDialog } from '../../../hooks'
import Styles from './styles'

export default function QueryResults(props) {

    const { handleBacktoQuery, queryResults } = props;

    const {

        notify,
        setNotify,
        closeNotification,

    } = useNotification(Styles.NotificationSlide)
    

    const {
        confirmDialog,
        setConfirmDialog,
        handleUnconfirmed
    } = useConfirmDialog()


    const {
        
        // table 
        records, 
        tableData,
        filterLabel,
        pages,
        page,
        order,
        orderBy,
        textInput,
        rowsPerPage,

        handleClear,
        handleFilter,
        handleChangePage,
        handleSortRequest,
        handleChangeRowsPerPage,
        handleDeletePress,
        getFinalDisplayRecords,


        // modal handling for edit
        studentFormState,
        handleInputChange,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,

        rotationFormValues,
        rotationFormErrors,
        isAddRotModalOpen,
        addRotModalTitle,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        handleAddRotSubmit,
        handleAddRotInputChange,
        handleAddRotClear,

        handleEditSubmit,
        handleEditCancel,

        editModalTitle,
        isEditModalOpen, 
        handleOpenEditModal,
        handleCloseEditModal,


        // detailed view table
        detailedViewModalTitle,
        isDetailedViewModalOpen,
        handleDetailedViewModalClose,
        handleDetailedViewModalOpen,
        getDetailedRecord,
        

    } = useQueryResultTable({
        setNotify,
        notify,
        confirmDialog,
        setConfirmDialog
    }, queryResults)


    
    return (
        <>
            <Styles.Box>
                <Styles.SearchBar 
                    onChange={handleFilter}
                    textInput={textInput}
                    handleClear={handleClear}
                    label={filterLabel}
                    style={{flexGrow: 0}}

                />
                <Styles.BaseButton
                    text="Back to query"
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={handleBacktoQuery}
                />
            </Styles.Box>
            <Styles.QueryTblContainer>
                <Styles.QueryTblHead 
                    tableData={tableData} 
                    handleSortRequest={handleSortRequest}
                    orderBy={orderBy}
                    order={order}
                />
                <Styles.QueryTblBody 
                    records={getFinalDisplayRecords()}
                    handleOpenEditModal={handleOpenEditModal}
                    handleDetailedViewModalOpen={handleDetailedViewModalOpen}
                    handleDeletePress={handleDeletePress}
                />
            </Styles.QueryTblContainer>
            <Styles.QueryTblPagination 
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={pages}
                count={records.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Styles.Modal
                modalTitle={editModalTitle}
                openModal={isEditModalOpen}
                closeModal={handleCloseEditModal}
            >
                <Styles.StudentForm
                    studentFormState={studentFormState}
                    handleInputChange={handleInputChange}
                    handleCancel={handleEditCancel}
                    handleSubmit={handleEditSubmit}
                    getCourseOptions={getCourseOptions}
                    getRotationOptions={getRotationOptions}
                    hoursWorkedRadioItems={hoursWorkedRadioItems}
                    convertToDefaultEventParam={convertToDefaultEventParam}

                    handleOpenAddRotModal={handleOpenAddRotModal}
                    handleCloseAddRotModal={handleCloseAddRotModal}
                    isAddRotModalOpen={isAddRotModalOpen}
                    addRotModalTitle={addRotModalTitle}
                    handleAddRotInputChange={handleAddRotInputChange}
                    handleAddRotSubmit={handleAddRotSubmit}
                    handleAddRotClear={handleAddRotClear}
                    rotationValues={rotationFormValues}
                    rotationErrors={rotationFormErrors}

                />
            </Styles.Modal>
            <Styles.Modal
                modalTitle={detailedViewModalTitle}
                openModal={isDetailedViewModalOpen}
                closeModal={handleDetailedViewModalClose}
                onBackdropClick={handleDetailedViewModalClose}
            >
                <Styles.DetailedTblContainer>
                    <Styles.DetailedTblHead 
                        tableData={tableData} 
                    />
                    <Styles.DetailedTblBody 
                        record={getDetailedRecord()}
                        tableData={tableData}
                    />
                </Styles.DetailedTblContainer>
            </Styles.Modal>
            <Styles.Notification 
                notify={notify}
                closeNotification={closeNotification}
            />
            <Styles.ConfirmDialog 
                confirmDialog={confirmDialog}
                handleUnconfirmed={handleUnconfirmed}
            />
        </>
    )
}
