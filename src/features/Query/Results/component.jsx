import React from 'react'

import { useQueryResultTable, useNotification, useConfirmDialog } from '../../../hooks'
import Styles from './styles'

export default function QueryResults({ handleBacktoQuery, queryResults } ) {

    const [notify, notificationHandlers]= useNotification(Styles.NotificationSlide)
    const [confirmDialog, confirmDialogHandlers] = useConfirmDialog()
    const [useQueryResultTableStates, useQueryResultTableHandlers] = useQueryResultTable(
        {
            notificationHandlers,
            confirmDialogHandlers
        }, 
        queryResults
    )

    const {

        records, 
        paginationStates, 
        sortingStates,
        filterStates,

        detailedViewTableStates :  {

            detailedViewModalStates : {

                isDetailedViewModalOpen
            }
        },

        editModalStates : {

            isEditModalOpen, 
            studentFormStates,

        }
    } = useQueryResultTableStates

    const {

        getTableData,
        getFinalDisplayRecords,
        handleDeletePress,

        paginationHandlers,
        sortingHandlers,
        filterHandlers,
        detailedViewTableHandlers : {

            getDetailedRecord, 
            detailedViewModalHandlers : {

                handleDetailedViewModalClose
            }
        },

        editModalHandlers: {

            handleCloseEditModal, 
            studentFormHandlers ,
            handleEditCancel, 
            handleEditSubmit
        },
        
    } = useQueryResultTableHandlers
    


    return (
        <>
            <Styles.Box>
                <Styles.SearchBar 
                    label="Search Results"
                    textInput={filterStates.textInput}
                    handleClear={filterHandlers.handleClear}
                    onChange={filterHandlers.handleFilter}
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
                    tableData={getTableData()} 
                    sortingStates={sortingStates}
                    sortingHandlers={sortingHandlers}
                />
                <Styles.QueryTblBody 
                    handlers={{
                        getFinalDisplayRecords,
                        handleDeletePress,
                        detailedViewTableHandlers : useQueryResultTableHandlers.detailedViewTableHandlers,
                        editModalHandlers: useQueryResultTableHandlers.editModalHandlers}}
                />
            </Styles.QueryTblContainer>
            <Styles.QueryTblPagination 
                count={records.length}
                paginationStates={paginationStates}
                paginationHandlers={paginationHandlers}
            />
            <Styles.Modal
                modalTitle="Edit Student Data"
                isModalOpen={isEditModalOpen}
                handleCloseModal={handleCloseEditModal}
            >
                <Styles.StudentForm
                    studentFormStates={studentFormStates}
                    studentFormHandlers={studentFormHandlers}
                    studentEditFormHandlers={{handleEditCancel,handleEditSubmit}}
                />
            </Styles.Modal>
            <Styles.Modal
                modalTitle="Detail View"
                isModalOpen={isDetailedViewModalOpen}
                handleCloseModal={handleDetailedViewModalClose}
            >
                <Styles.DetailedTblContainer>
                    <Styles.DetailedTblHead 
                        tableData={getTableData()} 
                    />
                    <Styles.DetailedTblBody 
                        record={getDetailedRecord()}
                        tableData={getTableData()}
                    />
                </Styles.DetailedTblContainer>
            </Styles.Modal>
            <Styles.Notification 
                notify={notify}
                notificationHandlers={notificationHandlers}
            />
            <Styles.ConfirmDialog 
                confirmDialog={confirmDialog}
                confirmDialogHandlers={confirmDialogHandlers}
            />
        </>
    )
}
