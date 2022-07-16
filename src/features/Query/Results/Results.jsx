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


function QueryResults({ handleBacktoQuery, queryResults } ) {

    console.log('QueryResults feature rendered')
    
    const [notify, notificationHandlers] = useNotification(Components.NotificationSlide)
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
        recordForEdit,
        recordForView,
        paginationStates, 
        sortingStates,
        filterStates: { textInput },
        
    } = useQueryResultTableStates

    const {

        getTableData,
        getFinalDisplayRecords,
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
            <Styles.QueryResultsTblContainer>
                <Components.QueryResultsTblHead 
                    tableData={getTableData()} 
                    sortingStates={sortingStates}
                    sortingHandlers={sortingHandlers}
                />
                <Components.QueryResultsTblBody 
                    getFinalDisplayRecords={getFinalDisplayRecords}
                    handleDeletePress={handleDeletePress}
                    setRecordForEdit={setRecordForEdit}
                    setRecordForView={setRecordForView}
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
        </>
    )
}

export default React.memo(QueryResults)