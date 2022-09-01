import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import Query from './Query'
import Statistics from './Statistics'
import SearchStudent from './SearchStudents'

//import { Query, Statistics, SearchStudent } from './index'

describe('testing Query Feature components', () => {

    let testByMethods

    beforeAll(() => {

    
        testByMethods = (screen) => {
            return {
                getByTestId(testId) {
                    return screen.getByTestId(testId)
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
            jest.clearAllMocks()
            cleanup()
        
        })

        it('should render SearchStudent component when showResults is set to false', () => {})
        it('should render Statistics component when showResults is set to false', () => {})
        it('should render SimpleBackDrop component when showResults is set to false', () => {})

        
        it('should not render SearchStudent component when showResults is set to true', () => {})
        it('should not render Statistics component when showResults is set to true', () => {})
        it('should not render SimpleBackDrop component when showResults is set to true', () => {})
        
        it('should render QueryResults component when showResults is set to true', () => {})

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