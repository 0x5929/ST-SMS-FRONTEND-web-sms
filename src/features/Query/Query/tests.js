import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react' 
import userEvent from "@testing-library/user-event"
import preview from 'jest-preview'

import Query from './Query'
import Statistics from './Statistics'
import SearchStudent from './SearchStudents'
import * as useToggle from '../../../hooks/useToggle'

global.ResizeObserver = jest.requireActual('resize-observer-polyfill') // this is for testing only



describe('testing Query Feature components', () => {

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
                }
            }
        }
    })
    
    
    afterAll(() => {
        testByMethods= undefined
    })

    describe('testing Query component', () => {
        let setup

        beforeEach(() => {            

            setup = () => {

                
                render(
                    <Query />
                )
    
                return {
                    ...(testByMethods(screen)),
                }
            }
        })
        afterEach(() => {
            setup = undefined
            jest.restoreAllMocks()
            // jest.useRealTimers()
            cleanup()
        
        })

        it('should render SearchStudent component when showResults is set to false', () => {
            const { getByTestId } = setup()
            expect(getByTestId('search-student-component')).toBeInTheDocument()

        })
        it('should render Statistics component when showResults is set to false', () => {
            const { getByTestId } = setup()
            expect(getByTestId('statistics-component')).toBeInTheDocument()
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
            jest.useFakeTimers('legacy')
            const { getInput, getByTestId, queryByTestId } = setup()
            const searchInput = getInput('Search Student Database')
            const searchBtn = getByTestId('query-submit-btn')

            await userEvent.type(searchInput, '__TEST__', {delay: 1})
            await userEvent.click(searchBtn)
            jest.runAllTimers()
            preview.debug()
            expect(queryByTestId('search-student-component')).not.toBeInTheDocument()           
            expect(queryByTestId('statistics-component')).not.toBeInTheDocument()
            expect(queryByTestId('circularProgress')).not.toBeInTheDocument()




        })
        test('once searched for students, query results are rendered', () => {})
    })

    describe('testing SearchStudent component', () => {
        let setup
        let setQueryResults = jest.fn()
        let handleBackdrop = jest.fn()

        beforeEach(() => {
            setup = () => {
    
                render(
                    <SearchStudent 
                        handleBackdrop={handleBackdrop}
                        setQueryResults={setQueryResults}
                    />
                )
    
                return {
                    ...(testByMethods(screen)),
                }
            }
        })
        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        
        })

        it('should render QueryForm component', () => {})
    })

    describe('testing Statistics component', () => {
        let setup
        beforeEach(() => {
            setup = () => {
    
                render(
                    <Statistics />
                )
    
                return {
                    ...(testByMethods(screen)),
                }
            }
        })
        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        
        })

        it('should render Card components', () => {})
        it('should render Barchart  component', () => {})
        it('should render X axis component', () => {})
        it('should render Y axis component', () => {})
        it('should render tooltip component', () => {})
        it('should render Bar component', () => {})
    })

})