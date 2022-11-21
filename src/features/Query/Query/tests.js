import '@testing-library/jest-dom'
import { render, screen, cleanup, act } from '@testing-library/react' 
import userEvent from '@testing-library/user-event'

import Query from './Query'
import preview from 'jest-preview'

// mock authedAxios
jest.mock('../../../hooks/useAuthedAxios', () => ({
    __esModule: true,
    default: jest.fn(()=>({}))
}))

global.ResizeObserver = jest.requireActual('resize-observer-polyfill') // this is for testing only


describe('testing Query Feature components', () => {

    let testByMethods

    beforeAll(() => {
        

        testByMethods = (screen) => {
            return {
                getInput(labelText) {
                    return screen.getByLabelText(labelText)
                },
                queryAllByLabelText(labelText) {
                    return screen.queryAllByLabelText(labelText)
                },
                getByTestId(testId) {
                    return screen.getByTestId(testId)
                },
                getAllByTestId(testId) {
                    return screen.getAllByTestId(testId)
                },
                queryByTestId(testId) {
                    return screen.queryByTestId(testId)
                },
                queryAllByTestId(testId) {
                    return screen.queryAllByTestId(testId)
                },
                getByText(text) {
                    return screen.getByText(text)
                },
                getAllByText(text) {
                    return screen.getAllByText(text)
                },
                getByRole(role, options) {
                    return screen.getByRole(role, options)
                },
                getByDisplayValue(text) {
                    return screen.getByDisplayValue(text)
                },
                queryByDisplayValue(text) {
                    return screen.queryByDisplayValue(text)
                },
                queryAllByRole(role, options) {
                    return screen.queryAllByRole(role, options)
                },
                findByTestId(testId) {
                    return screen.findByTestId(testId)
                }
            }
        }
    })
    
    
    afterAll(() => {
        testByMethods= undefined
    })

    describe('testing Query component', () => {
        let setup

        beforeEach(async () => {      

            
            setup = async () => {              
                await act( async () => {render(<Query />)})
                    
                return {
                    ...(testByMethods(screen)),
                }
            }
        })
        afterEach(() => {
            setup = undefined
            jest.restoreAllMocks()
            cleanup()
        
        })

        it('should render SearchStudent, Statistics, Simple component when showResults is set to false', async () => {
            const { getByTestId, getAllByTestId } = await setup()
            expect(getByTestId('search-student-component')).toBeInTheDocument()
            expect(getByTestId('statistics-component')).toBeInTheDocument()
            expect(getAllByTestId('circularProgress')).toHaveLength(2)
        })

        
        // when queried for results, display results instead of search
        it('should not render SearchStudent, Stats, Progress component after query, show Results', async () => {

            const { getInput, getByTestId, queryByTestId } = await setup()
            const submitBtn = getByTestId('query-submit-btn')

            expect(queryByTestId('query-results-component')).not.toBeInTheDocument()

            await userEvent.type(getInput('Search Student Database'), '__TEST__')
            expect(getInput('Search Student Database')).toHaveValue('__TEST__')
            await userEvent.click(submitBtn)

            expect(queryByTestId('search-student-component')).not.toBeInTheDocument()
            expect(queryByTestId('statistics-component')).not.toBeInTheDocument()

            // circularProgress is within Results too, thats why the following won't work
            // tests by snapshots?
            //expect(queryByTestId('circularProgress')).not.toBeInTheDocument() 

            expect(getByTestId('query-results-component')).toBeInTheDocument()    
            
        })

        

        test('add query button works until 5 rows of query but all 5 will be rendered', async () => {

            const { 
                getByText, 
                getInput, 
                queryAllByLabelText, 
                getByTestId, 
                queryByTestId, 
                queryAllByTestId } = await setup()

            // max query obj is 5, but we will set the counter to 10, just to demonstrate max is 5.
   
            const counter = 10

            expect(getInput('Search Student Database')).toBeInTheDocument()
            expect(getByTestId('queryby-select')).toBeInTheDocument()
            expect(queryByTestId('delete-query-btn')).not.toBeInTheDocument()


            for (let i = 0; i <= counter; i++) {
                await userEvent.click(getByText(/add new/i), {delay: 1})
            }
            
            
            expect(queryAllByLabelText('Search Student Database')).toHaveLength(5)
            expect(queryAllByTestId('queryby-select')).toHaveLength(5)
            expect(queryAllByTestId('delete-query-btn')).toHaveLength(5)

        })

        test('del query button works, and will delete specific query objects', async () => {

            const { getByText, queryAllByLabelText, queryAllByTestId } = await setup()

            const counter = 10

            for (let i = 0; i <= counter; i++) {
                await userEvent.click(getByText(/add new/i))
            }

            // lets write something in each of the input fields
            const queryFields = queryAllByLabelText('Search Student Database')

            for (let i = 0; i < queryFields.length; i++) {

                await userEvent.type(queryFields[i], i.toString())
            }
            
            const queryDelBtns = queryAllByTestId('delete-query-btn')
            
            // deleting the second and fourth query, should leave queries: 0,2,4 intact.
            await userEvent.click(queryDelBtns[1])
            await userEvent.click(queryDelBtns[3])
            
            expect(queryFields[0]).toHaveValue('0')
            expect(queryFields[2]).toHaveValue('2')
            expect(queryFields[4]).toHaveValue('4')
        }, 50_000)


        it('should clear its own text and query when clear button is pressed on the query', async () => {
            const { getByText, queryAllByLabelText, queryAllByTestId } = await setup()

            const counter = 10

            for (let i = 0; i <= counter; i++) {
                await userEvent.click(getByText(/add new/i))
            }

            // lets write something in each of the input fields
            const queryFields = queryAllByLabelText('Search Student Database')

            for (let i = 0; i < queryFields.length; i++) {

                await userEvent.type(queryFields[i], i.toString())

            }

            // to make sure we have all clear icon button
            const clearIcons = queryAllByTestId('mui-clearIcon')
            expect(clearIcons).toHaveLength(5)

            // clearning the second and fourth query, should leave queries: 0,2,4 intact.
            await userEvent.click(clearIcons[1])
            await userEvent.click(clearIcons[3])

            expect(queryFields[0]).toHaveValue('0')
            expect(queryFields[1]).toHaveValue('')
            expect(queryFields[2]).toHaveValue('2')
            expect(queryFields[3]).toHaveValue('')
            expect(queryFields[4]).toHaveValue('4')

            

        }, 50_000)


        it('should render Card components', async () => {
            const { getByText, queryAllByTestId } = await setup()

            expect(queryAllByTestId('card')).toHaveLength(4)
            expect(getByText(/statistics/i)).toBeInTheDocument()
            expect(getByText(/student enrollments/i)).toBeInTheDocument()
            expect(getByText(/student employments/i)).toBeInTheDocument()
            expect(getByText(/student graduates/i)).toBeInTheDocument()
            expect(getByText(/student exams/i)).toBeInTheDocument()

        })
    })


})