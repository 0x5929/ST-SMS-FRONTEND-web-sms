import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderHook } from '@testing-library/react-hooks/dom'


import { useNotification, useConfirmDialog, useQueryResultTable } from '../../hooks'
import * as SMSRecordService from '../../services/SMSRecordService'

import { NotificationSlide } from '../Notification'
import { 
    QueryResultsTblContainer, 
    QueryResultsTblHead, 
    QueryResultsTblBody, 
    QueryResultsTblPagination,
    DetailedTblContainer, 
    DetailedTblHead, 
    DetailedTblBody } from '.'



describe('testing table components', () => {
    
    let queryResults, notify, notificationHandlers, confirmDialog, confirmDialogHandlers, useQueryResultTableStates, useQueryResultTableHandlers;
    let records, paginationStates, sortingStates;
    let getTableData, getFinalDisplayRecords, handleDeletePress, setRecordForEdit, setRecordForView, paginationHandlers, sortingHandlers;
    
    let testByMethods

    function getNotificationResults() {
        const { result } = renderHook(() => useNotification(NotificationSlide))
        const [ notify, notificationHandlers ] = result.current

        return [ notify, notificationHandlers ]
    }

    function getConfirmDialogResults() {
        const { result } = renderHook(() => useConfirmDialog())
        const [ confirmDialog, confirmDialogHandlers ] = result.current

        return [ confirmDialog, confirmDialogHandlers ] 
    }
    

    function getQueryResults() {
        SMSRecordService.insertSampleRecords()
        return SMSRecordService.getAllRecords()
    }

    function getQueryResultTableResults(notificationHandlers, confirmDialogHandlers, queryResults) {

        const { result } = renderHook(() => useQueryResultTable(
            {
                notificationHandlers,
                confirmDialogHandlers
            }, 
            queryResults
        ))


        const [ useQueryResultTableStates, useQueryResultTableHandlers ] = result.current
        

        return [ useQueryResultTableStates, useQueryResultTableHandlers ] 
    }

    beforeAll(() => {
    
        
        ([ notify, notificationHandlers ] = getNotificationResults());
        ([ confirmDialog, confirmDialogHandlers ] = getConfirmDialogResults());

        ([ useQueryResultTableStates, useQueryResultTableHandlers ] = getQueryResultTableResults(notificationHandlers, confirmDialogHandlers, getQueryResults()));


        ({

            records, 
            paginationStates, 
            sortingStates,
            
        } = useQueryResultTableStates);
    
         ({
    
            getTableData,
            getFinalDisplayRecords,
            handleDeletePress,
            setRecordForEdit, 
            setRecordForView,
            paginationHandlers,
            sortingHandlers,
            
        } = useQueryResultTableHandlers);

        testByMethods = (screen) => {
            return {
    
                getInput(labelText) {
                    return screen.getByLabelText(labelText)
                },
                getByTestId(testId) {
                    return screen.getByTestId(testId)
                },
                getByText(text){
                    return screen.getByText(text)
                },
                getAllByText(text) {
                    return screen.getAllByText(text)
                },
                queryByTestId(testId) {
                    return screen.queryByTestId(testId)
                },
                getAllByTestId(testId) {
                    return screen.getAllByTestId(testId)
                },
                getByRole(role, options) {
                    return screen.getByRole(role, options)
                }
            }
        }
    })
    
    
    afterAll(() => {
        testByMethods= undefined
        queryResults = undefined
        notify = undefined
        notificationHandlers = undefined
        confirmDialog = undefined
        confirmDialogHandlers = undefined
        useQueryResultTableStates = undefined
        useQueryResultTableHandlers = undefined


        records = undefined
        paginationStates = undefined
        sortingStates = undefined
        getTableData = undefined
        getFinalDisplayRecords = undefined 
        handleDeletePress = undefined 
        setRecordForEdit = undefined
        setRecordForView = undefined
        paginationHandlers = undefined 
        sortingHandlers = undefined

    })

    
    describe('testing QueryResultsTable components', () => {

        let setup

        beforeEach(() => {
            
            setup = () => {

                const handleSortMk = jest.spyOn(sortingHandlers, 'handleSortRequest')
                const handleChangePageMk = jest.spyOn(paginationHandlers, 'handleChangePage')
                const handleChangeRowsPerPageMk = jest.spyOn(paginationHandlers, 'handleChangeRowsPerPage')
                
                setRecordForView = jest.fn()
                setRecordForEdit = jest.fn()
                handleDeletePress = jest.fn()
    
                const { rerender } = render(
                    <>
                        <QueryResultsTblContainer>
                            <QueryResultsTblHead 
                                tableData={getTableData()} 
                                sortingStates={sortingStates}
                                sortingHandlers={sortingHandlers}
                            />
                            <QueryResultsTblBody 
                                getFinalDisplayRecords={getFinalDisplayRecords}
                                handleDeletePress={handleDeletePress}
                                setRecordForEdit={setRecordForEdit}
                                setRecordForView={setRecordForView}
                            />
                        </QueryResultsTblContainer>
                        <QueryResultsTblPagination 
                            count={records.length}
                            paginationStates={paginationStates}
                            paginationHandlers={paginationHandlers}
                        />
                    </>
                )
    
                return {
                    ...(testByMethods(screen)),
                    rerender,
                    handleChangePageMk,
                    handleChangeRowsPerPageMk,
                    handleSortMk,
                    setRecordForView,
                    setRecordForEdit,
                    handleDeletePress,
                }
            }
        })
    
        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        })
    


        it('should render QueryResultsTable components', () => {
            const { getByTestId } = setup()
            
            expect(getByTestId('query-results-table')).toBeInTheDocument()
            expect(getByTestId('query-results-table-header')).toBeInTheDocument()
            expect(getByTestId('query-results-table-body')).toBeInTheDocument()
            expect(getByTestId('query-results-table-pagination')).toBeInTheDocument()

        })

        test('that there are as many header cells as what we pass in as tableData', () => {
            const { getAllByTestId } = setup()
            const headerCells = getAllByTestId('query-result-header-cell')

            // NOTE we minus one from the HeaderCells because the last cell has disabled sorting, so will not show up as 
            expect(headerCells).toHaveLength(getTableData().mainQueryResultHeadCells.length)
        })

        it('should trigger handleSortRequest if we click on the header', () => {
            const { getAllByTestId, handleSortMk } = setup()
            const firstHeaderCell = getAllByTestId('query-result-header-cell')[0]
            firstHeaderCell.click()

            expect(handleSortMk.mock.calls).toHaveLength(1)

        })

        test('table body should render viewBtn, editBtn, and delBtn', () => {
            const { getAllByTestId } = setup()

            expect(getAllByTestId('view-record-btn').length).toBeGreaterThanOrEqual(1)
            expect(getAllByTestId('edit-record-btn').length).toBeGreaterThanOrEqual(1)
            expect(getAllByTestId('del-record-btn').length).toBeGreaterThanOrEqual(1)
        })

        it('should trigger setRecordForView if we click on viewBtn', () => {
            const { getAllByTestId, setRecordForView } = setup()
            const firstViewRecordBtn = getAllByTestId('view-record-btn')[0]

            firstViewRecordBtn.click()
            expect(setRecordForView.mock.calls).toHaveLength(1)

        })
        it('should trigger setRecordForEdit if we click on editBtn', () => {
            const { getAllByTestId, setRecordForEdit } = setup()
            const firstEditRecordBtn = getAllByTestId('edit-record-btn')[0]

            firstEditRecordBtn.click()
            expect(setRecordForEdit.mock.calls).toHaveLength(1)
        })
        it('should trigger handleDeletePress if we click on delBtn', () => {
            const { getAllByTestId, handleDeletePress } = setup()
            const firsDelRecordBtn = getAllByTestId('del-record-btn')[0]

            firsDelRecordBtn.click()
            expect(handleDeletePress.mock.calls).toHaveLength(1)
        })
        
        test('TablePagination will trigger handleChangePage when page changes', () => {
            const { getByRole, handleChangePageMk } = setup()
            const changePageBtn = getByRole('button', {name: 'Go to next page'})

            changePageBtn.click()
            expect(handleChangePageMk.mock.calls).toHaveLength(1)

        })

        test('TablePagination will trigger handleChangeRowsPerPage when rowsPerPage changes', async () => {
            // first we need to grab the button that we can click to have the drop down, then click on one of the options to change and monitor mocks
            
            const { getByText, getByRole, handleChangeRowsPerPageMk, rerender, getByTestId } = setup()
            
            await userEvent.click(getByRole('button', {name: 'Rows per page: 5'}))
            await userEvent.click(getByText('10'))
            
            expect(handleChangeRowsPerPageMk.mock.calls).toHaveLength(1)

        })
    })
    describe('testing DeatiledTable components', () => {


        let setup

        beforeEach(() => {
            
            setup = () => {
    
                render(
                    <DetailedTblContainer>
                    <DetailedTblHead 
                        tableData={getTableData()} 
                    />
                    <DetailedTblBody 
                        record={getQueryResults()[0]}
                        tableData={getTableData()}
                    />
                </DetailedTblContainer>
                )
    
                return {
                    ...(testByMethods(screen))
                }
            }
        })
    
        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        })
    

        it('should render DeatiledTable components', () => {
            const { getByTestId } = setup()

            expect(getByTestId('detailed-table')).toBeInTheDocument()
            expect(getByTestId('detailed-table-header')).toBeInTheDocument()
            expect(getByTestId('detailed-table-body')).toBeInTheDocument()

        })

        test('that there are as many header cells as what we pass in as tableData', () => {
            const { getAllByTestId } = setup()

            const headerCells = getAllByTestId('detailed-table-header-cell')

            expect(headerCells).toHaveLength(getTableData().detailedViewHeadCells.length)

        })

    })

})