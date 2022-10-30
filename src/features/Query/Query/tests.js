import '@testing-library/jest-dom'
import { render, screen, cleanup, act, fireEvent, waitFor } from '@testing-library/react' 
import userEvent from "@testing-library/user-event"
import preview from 'jest-preview'

import axios from 'axios'
import Query from './Query'
import { AuthContextProvider } from '../../../contexts'
import * as useToggle from '../../../hooks/useToggle'
import * as SMSStatisticsService from '../../../services/SMSStatisticsService'
import * as axioService from '../../../services/api/djREST'
import { sampleStudentData, SMSStats } from '../../../services/data/studentData'

import { renderHook } from '@testing-library/react-hooks/dom' 
import * as useAuthedAxios from '../../../hooks/useAuthedAxios'

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
        // let mockSMSStatisticsService

        beforeEach(() => {      

            // mockSMSStatisticsService = jest.spyOn(SMSStatisticsService, 'getStats')

            // mockSMSStatisticsService.mockResolvedValueOnce(SMSStats[0])

            
            setup = () => {

               // global.setTimeout = jest.fn(cb => cb());
                render(
                    <AuthContextProvider>
                        <Query />
                    </AuthContextProvider>
                )
    
                return {
                    ...(testByMethods(screen)),
                }
            }
        })
        afterEach(() => {
            setup = undefined
            jest.restoreAllMocks()
            //mockSMSStatisticsService.mockReset()
            cleanup()
        
        })

        it('should render SearchStudent component when showResults is set to false', async () => {
            const { getByTestId } = setup()

            await waitFor(() => {
                expect(getByTestId('search-student-component')).toBeInTheDocument()
           })

        })
        it('should render Statistics component when showResults is set to false', async () => {
            const { getByTestId } = setup()

            await waitFor(() => {
                expect(getByTestId('statistics-component')).toBeInTheDocument()
            })
        })

        it('should render SimpleBackDrop component when showResults is set to false', () => {
            const { getByTestId } = setup()
            expect(getByTestId('circularProgress')).toBeInTheDocument()
        })

        
        it('should not render SearchStudent component when showResults is set to true', () => {

            const mockUseToggle = jest.spyOn(useToggle, 'default')
            mockUseToggle.mockImplementation(() => [true, jest.fn()])
            const { queryByTestId } = setup()
            expect(queryByTestId('search-student-component')).not.toBeInTheDocument()
            
        })

        it('should not render Statistics component when showResults is set to true', () => {
            const mockUseToggle = jest.spyOn(useToggle, 'default')
            mockUseToggle.mockImplementation(() => [true, jest.fn()])
            const { queryByTestId } = setup()
            expect(queryByTestId('statistics-component')).not.toBeInTheDocument()
        })

        it('should not render SimpleBackDrop component when showResults is set to true', () => {
            const mockUseToggle = jest.spyOn(useToggle, 'default')
            mockUseToggle.mockImplementation(() => [true, jest.fn()])
            const { queryByTestId } = setup()
            expect(queryByTestId('circularProgress')).not.toBeInTheDocument()           
        })
        
        it('should render QueryResults component when showResults is set to true', () => {
            const mockUseToggle = jest.spyOn(useToggle, 'default')
            mockUseToggle.mockImplementation(() => [true, jest.fn()])
            const { getByTestId } = setup()
            expect(getByTestId('query-results-component')).toBeInTheDocument()                  
        })

        test('without implementation details, initially no query results are rendered', () => {
            const { queryByTestId } = setup()
            expect(queryByTestId('query-results-component')).not.toBeInTheDocument()
        })

        test('without implementation details, initially searchStudent, backdrop, statistics are rendered', () => {

            const { getByTestId } = setup()
            expect(getByTestId('search-student-component')).toBeInTheDocument()
            expect(getByTestId('statistics-component')).toBeInTheDocument()
            expect(getByTestId('circularProgress')).toBeInTheDocument()
        })

        
        test('once searched for students, searchStudent, backdrop, and statistics are not rendered', async () => {
            // search for any student, or anything for that matter
            // https://marek-rozmus.medium.com/mocking-settimeout-with-jest-3fd6b8fa6307

            const user = userEvent.setup({ delay: null })
            jest.useFakeTimers()

            // const mockDjRESTService = jest.spyOn(axioService, 'studentQueryGET')

            // mockDjRESTService.mockResolvedValueOnce(sampleStudentData)


            const { getInput, getByTestId, queryByTestId } = setup()
            const searchInput = getInput('Search Student Database')
            const searchBtn = getByTestId('query-submit-btn')

            await user.type(searchInput, '__TESTS__')
            await user.click(searchBtn)


            act(() => {
                jest.runAllTicks()
                jest.runAllTimers()
              })


            await waitFor(() => {

    
                expect(queryByTestId('search-student-component')).not.toBeInTheDocument()           
                expect(queryByTestId('statistics-component')).not.toBeInTheDocument()
                expect(queryByTestId('circularProgress')).not.toBeInTheDocument()
                expect(getByTestId('query-results-component')).toBeInTheDocument()
                
                jest.useRealTimers()
              })

            // mockDjRESTService.mockReset()
            jest.useRealTimers()

        })

        test('add query button works until 5 rows of query but all 5 will be rendered', async () => {

            const { 
                getByText, 
                getInput, 
                queryAllByLabelText, 
                getByTestId, 
                queryByTestId, 
                queryAllByTestId } = setup()

            // max query obj is 5, but we will set the counter to 10, just to demonstrate max is 5.
   
            const counter = 10

            expect(getInput('Search Student Database')).toBeInTheDocument()
            expect(getByTestId('queryby-select')).toBeInTheDocument()
            expect(queryByTestId('delete-query-btn')).not.toBeInTheDocument()


            for (let i = 0; i <= counter; i++) {
                await userEvent.click(getByText(/add new/i), {delay: 1})
            }
            //preview.debug()
            
            expect(queryAllByLabelText('Search Student Database')).toHaveLength(5)
            expect(queryAllByTestId('queryby-select')).toHaveLength(5)
            expect(queryAllByTestId('delete-query-btn')).toHaveLength(5)

            

        })

        test('del query button works, and will delete specific query objects', async () => {

            const { getByText, queryAllByLabelText, queryAllByTestId } = setup()

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
        }, 500000)


        it('should clear its own text and query when clear button is pressed on the query', async () => {
            //throw new Error('need to implement this test')


            
            const { getByText, queryAllByLabelText, queryAllByTestId } = setup()

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

            // preview.debug()

            expect(queryFields[0]).toHaveValue('0')
            expect(queryFields[1]).toHaveValue('')
            expect(queryFields[2]).toHaveValue('2')
            expect(queryFields[3]).toHaveValue('')
            expect(queryFields[4]).toHaveValue('4')

            

        }, 500000)


        it('should render Card components', async () => {



            const { getByText, queryAllByTestId } = setup()

            await waitFor(() => {

                //preview.debug()

                expect(queryAllByTestId('card')).toHaveLength(4)

                expect(getByText(/statistics/i)).toBeInTheDocument()
                expect(getByText(/student enrollments/i)).toBeInTheDocument()
                expect(getByText(/student employments/i)).toBeInTheDocument()
                expect(getByText(/student graduates/i)).toBeInTheDocument()
                expect(getByText(/student exams/i)).toBeInTheDocument()

            })

            

        })
    })


})