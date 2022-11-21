import '@testing-library/jest-dom'
import { render, screen, cleanup, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import QueryResults from '../../features/Query/Results/Results'
import * as SMSRecordService from '../../services/SMSRecordService'
import { sampleStudentData } from '../../services/data/studentData'


// mock authedAxios
jest.mock('../../hooks/useAuthedAxios', () => ({
    __esModule: true,
    default: jest.fn(()=>({}))
}))

describe('testing table components', () => {
    
    let testByMethods

    beforeAll(() => {
    
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
    })

    
    describe('testing QueryResultsTable AND DetailedViewTable components', () => {

        let setup

        beforeEach(async () => {
            
            setup = async () => {
                
                await act(async () =>{render(
                    <QueryResults 
                        queryResults={sampleStudentData}
                        handleBacktoQuery={jest.fn()}
                    />)})
    
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
    


        it('should render QueryResultsTable components', async () => {
            const { getByTestId } = await setup()
            
            expect(getByTestId('query-results-table')).toBeInTheDocument()
            expect(getByTestId('query-results-table-header')).toBeInTheDocument()
            expect(getByTestId('query-results-table-body')).toBeInTheDocument()
            expect(getByTestId('query-results-table-pagination')).toBeInTheDocument()

        })

        test('that there are as many header cells as what we pass in as tableData', async () => {
            const { getAllByTestId } = await setup()
            const headerCells = getAllByTestId('query-result-header-cell')

            // NOTE we minus one from the HeaderCells because the last cell has disabled sorting, so will not show up 
            expect(headerCells).toHaveLength(SMSRecordService.getTableData().mainQueryResultHeadCells.length)
        })



        test('table body should render viewBtn, editBtn, and delBtn', async () => {
            const { getAllByTestId } = await setup()

            expect(getAllByTestId('view-record-btn').length).toBeGreaterThanOrEqual(1)
            expect(getAllByTestId('edit-record-btn').length).toBeGreaterThanOrEqual(1)
            expect(getAllByTestId('del-record-btn').length).toBeGreaterThanOrEqual(1)
        })

        // NOTE alot of testing were done inside Results/tests
        // ie sorting, pagination, edit, view


        it('should render DeatiledTable components', async () => {
            const { getByTestId, getAllByTestId } = await setup()

            
            await userEvent.click(getAllByTestId('view-record-btn')[0])
            expect(getByTestId('detailed-table')).toBeInTheDocument()
            expect(getByTestId('detailed-table-header')).toBeInTheDocument()
            expect(getByTestId('detailed-table-body')).toBeInTheDocument()

        })

        test('that there are as many header cells as what we pass in as tableData', async () => {
            const { getAllByTestId } = await setup()

            await userEvent.click(getAllByTestId('view-record-btn')[0])
            const headerCells = getAllByTestId('detailed-table-header-cell')

            expect(headerCells).toHaveLength(SMSRecordService.getTableData().detailedViewHeadCells.length)

        })

    })


})