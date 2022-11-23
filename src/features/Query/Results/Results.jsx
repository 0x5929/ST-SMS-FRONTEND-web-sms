import React from 'react'
import { Box as MuiBox } from '@mui/material'

import EditStudent from './EditStudent'
import ViewStudent from './ViewStudent'
import { createResultsStyles } from './styles'
import Components from '../../../components'
import { useQueryResultTable, useNotification, useConfirmDialog } from '../../../hooks'


const Styles = createResultsStyles({
    MuiBox,
    BaseSearchBar: Components.SearchBar,
    BaseQueryTblContainer: Components.QueryResultsTblContainer,
})


function QueryResults({ queryResults, handleSetProgressStatus, setShowResults } ) {
    const [ notify, notificationHandlers ] = useNotification(Components.NotificationSlide)
    const [ confirmDialog, confirmDialogHandlers ] = useConfirmDialog()
    const [ useQueryResultTableStates, useQueryResultTableHandlers ] = useQueryResultTable(
        {
            notificationHandlers,
            confirmDialogHandlers
        }, 
        queryResults
    )

    const {
        progressOn,
        records, 
        recordForEdit,
        recordForView,
        paginationStates, 
        sortingStates,
        filterStates: { textInput },
        
    } = useQueryResultTableStates

    const {

        getTableData,
        getFinalDisplayRecords,
        handleViewPress,
        handleDeletePress,
        setRecordForEdit, 
        setRecordForView,
        setRecords,
        paginationHandlers,
        sortingHandlers,
        filterHandlers: { handleClear, handleFilter },
        
    } = useQueryResultTableHandlers
    


    return (
        <>
            <Styles.Box data-testid="query-results-component">
                <Styles.SearchBar 
                    label="Search Results"
                    textInput={textInput}
                    handleClear={() => handleClear(records)}
                    onChange={handleFilter}
                />
                <Components.BaseButton data-testid="back-to-query-btn"
                    text="Back to query"
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => handleSetProgressStatus({
                        callback: setShowResults, 
                        callbackArgs: [false], 
                        progressState: false
                    })}
                />
            </Styles.Box>
            <Styles.QueryResultsTblContainer>
                <Components.QueryResultsTblHead 
                    tableData={getTableData()} 
                    sortingStates={sortingStates}
                    sortingHandlers={sortingHandlers}
                />
                <Components.QueryResultsTblBody 
                    getFinalDisplayRecords={getFinalDisplayRecords}
                    handleDeletePress={handleDeletePress}
                    handleViewPress={handleViewPress}
                    setRecordForEdit={setRecordForEdit}
                />
            </Styles.QueryResultsTblContainer>
            <Components.QueryResultsTblPagination 
                count={records.length}
                paginationStates={paginationStates}
                paginationHandlers={paginationHandlers}
            />
            <EditStudent 
                setRecordForEdit={setRecordForEdit}
                setRecords={setRecords}
                userFeedbackObj={{notify, notificationHandlers}}
                recordForEdit={recordForEdit}
            />
            <ViewStudent 
                getTableData={getTableData}
                recordForView={recordForView}
                setRecordForView={setRecordForView}
            />
            <Components.Notification 
                notify={notify}
                notificationHandlers={notificationHandlers}
            />
            <Components.ConfirmDialog 
                confirmDialog={confirmDialog}
                confirmDialogHandlers={confirmDialogHandlers}
            />
            <Components.SimpleBackDrop 
                openBackdrop={progressOn}
            />
        </>
    )
}

export default React.memo(QueryResults)