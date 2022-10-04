import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
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
    
                    ...(testByMethods(screen)),
                    debug: screen.debug
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
            const { getAllByTestId, getAllByRole, debug } = setup()
            expect(getAllByTestId('view-record-btn')).toHaveLength(5)

            await userEvent.click(getAllByTestId('view-record-btn')[0])
            //debug()
            //await userEvent.click(getAllByRole('button', { name: 'view-record-btn'})[0])
            preview.debug()
        })

        test('each student should have working edit student button',  () => {
            const { getAllByTestId } = setup()

            expect(getAllByTestId('edit-record-btn')).toHaveLength(5)
            
            // //  userEvent.click(getAllByTestId('edit-record-btn')[0])
            // fireEvent.click(getAllByTestId('view-record-btn')[0])
            //preview.debug()
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