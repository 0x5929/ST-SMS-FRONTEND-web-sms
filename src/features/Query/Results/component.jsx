import React from 'react'

import { useQueryResultTable, useNotification, useConfirmDialog } from '../../../hooks'

import { Box as MuiBox } from '@mui/material'

import Components from '../../../components'

import createResultsStyles from './styles'


const Styles = createResultsStyles({
    MuiBox,
    BaseSearchBar: Components.SearchBar,
    BaseQueryTblContainer: Components.QueryTblContainer,
    BaseDetailedTblContainer: Components.DetailedTblContainer
})

function QueryResults({ handleBacktoQuery, queryResults } ) {

    console.log('QueryResults feature rendered')
    const [notify, notificationHandlers]= useNotification(Components.NotificationSlide)
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
        filterStates: { textInput },

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
        filterHandlers: { handleClear, handleFilter },
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
                    textInput={textInput}
                    handleClear={handleClear}
                    onChange={handleFilter}
                />
                <Components.BaseButton
                    text="Back to query"
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={handleBacktoQuery}
                />
            </Styles.Box>
            <Styles.QueryTblContainer>
                <Components.QueryTblHead 
                    tableData={getTableData()} 
                    sortingStates={sortingStates}
                    sortingHandlers={sortingHandlers}
                />
                <Components.QueryTblBody 
                    handlers={{
                        getFinalDisplayRecords,
                        handleDeletePress,
                        detailedViewTableHandlers : useQueryResultTableHandlers.detailedViewTableHandlers,
                        editModalHandlers: useQueryResultTableHandlers.editModalHandlers}}
                />
            </Styles.QueryTblContainer>
            <Components.QueryTblPagination 
                count={records.length}
                paginationStates={paginationStates}
                paginationHandlers={paginationHandlers}
            />
            <Components.Modal
                modalTitle="Edit Student Data"
                isModalOpen={isEditModalOpen}
                handleCloseModal={handleCloseEditModal}
            >
                <Components.StudentForm
                    studentFormStates={studentFormStates}
                    studentFormHandlers={studentFormHandlers}
                    studentEditFormHandlers={{handleEditCancel,handleEditSubmit}}
                    // pass editModalHandlers here, 
                    // inside studentFormcom,ponent, check for isEdit state
                    // if it is, then change submit/cancel methods to edit ones, and have it call using it self as one of the arugments
                    // think of a goo dway to do it?
                />
            </Components.Modal>
            <Components.Modal
                modalTitle="Detail View"
                isModalOpen={isDetailedViewModalOpen}
                handleCloseModal={handleDetailedViewModalClose}
            >
                <Styles.DetailedTblContainer>
                    <Components.DetailedTblHead 
                        tableData={getTableData()} 
                    />
                    <Components.DetailedTblBody 
                        record={getDetailedRecord()}
                        tableData={getTableData()}
                    />
                </Styles.DetailedTblContainer>
            </Components.Modal>
            <Components.Notification 
                notify={notify}
                notificationHandlers={notificationHandlers}
            />
            <Components.ConfirmDialog 
                confirmDialog={confirmDialog}
                confirmDialogHandlers={confirmDialogHandlers}
            />
        </>
    )
}

export default React.memo(QueryResults)