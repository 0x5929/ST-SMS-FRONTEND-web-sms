import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import QueryResults from './Results'
import ViewStudent from './ViewStudent'
import EditStudent from './EditStudent'

import { sampleStudentData } from '../../../services/data/studentData'

import preview from 'jest-preview'


describe('testing Query feautre Result component', () => {

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
                queryByTestId(testId) {
                    return screen.queryByTestId(testId)
                },
                getAllByTestId(testId) {
                    return screen.getAllByTestId(testId)
                },
                getByText(text) {
                    return screen.getByText(text)
                },
                getAllByText(text) {
                    return screen.getAllByText(text)
                },
                queryByText(text) {
                    return screen.queryByText(text)
                },
                getByRole(role, options) {
                    return screen.getByRole(role, options)
                },  
                getAllByRole(role, options) {
                    return screen.getAllByRole(role, options)
                }
            }
        }
    })
    
    
    afterAll(() => {
        testByMethods= undefined
    })

    describe('testing Results component', () => {

        let setup
        

        beforeEach(() => {

            setup = () => {
                render(
                    <QueryResults 
                        queryResults={sampleStudentData}
                        handleBacktoQuery={jest.fn()}
                    />
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

        it('should render QueryResults components, and subcomponents', () => {
            const { getByTestId, getInput } = setup()

            expect(getByTestId('query-results-component')).toBeInTheDocument()
            expect(getByTestId('back-to-query-btn')).toBeInTheDocument()
            expect(getInput('Search Results')).toBeInTheDocument()
            
            expect(getByTestId('query-results-table')).toBeInTheDocument()
            expect(getByTestId('query-results-table-header')).toBeInTheDocument()
            expect(getByTestId('query-results-table-body')).toBeInTheDocument()
            expect(getByTestId('query-results-table-pagination')).toBeInTheDocument()

        })

        test('each student should have working view student button',  async () => {
            const { getAllByTestId, getByText, getByTestId, queryByTestId, queryByText } = setup()
            let testingIndx = 0

            expect(getAllByTestId('view-record-btn')).toHaveLength(5)

            // this should be the first button
            await userEvent.click(getAllByTestId('view-record-btn')[testingIndx])

            expect(getByText(/detail view/i)).toBeInTheDocument()
            expect(getByText(/category/i)).toBeInTheDocument()
            expect(getByText(/data/i)).toBeInTheDocument()

            // assert basic data will be rendered
            const withinCatMod = within(getAllByTestId('detail-view-tbl-category-col')[testingIndx])
            expect(withinCatMod.getByText('Student ID')).toBeInTheDocument()
            
            const withinDatmod = within(getAllByTestId('detailview-tbl-data-col')[testingIndx])
            expect(withinDatmod.getByText('RO-CNA-100-0001-AB')).toBeInTheDocument()

            // test able to close modal
            await userEvent.click(getByTestId('modal-close-btn'))
            expect(queryByText(/detail view/i)).not.toBeVisible()
            expect(queryByText(/category/i)).not.toBeVisible()
            expect(queryByText(/data/i)).not.toBeVisible()
            expect(queryByTestId('modal-close-btn')).not.toBeVisible()

        })

        test('each student should have working edit student button',  async () => {
            const { getAllByTestId } = setup()

            expect(getAllByTestId('edit-record-btn')).toHaveLength(5)
            
            await userEvent.click(getAllByTestId('edit-record-btn')[0])
            preview.debug()

        })
        test('each student should have working delete student button', () => {
            const { getAllByTestId } = setup()

            expect(getAllByTestId('del-record-btn')).toHaveLength(5)
        })


        it('should allow search with filter', () => {})
        it('should allow for results to be sorted',  () => {})
        it('should allow for results to paginate', () => {})
        
    })
    describe('testing ViewStudent component', () => {})
    describe('testing EditStudent component', () => {})
})