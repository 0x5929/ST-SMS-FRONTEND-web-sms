import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import QueryResults from './Results'
import ViewStudent from './ViewStudent'
import EditStudent from './EditStudent'

import * as SMSRecordService from '../../../services/SMSRecordService'

describe('testing Query feautre Result component', () => {

    let testByMethods

    // consider mocking this
    let studentRecords = SMSRecordService.getAllRecords()

    beforeAll(() => {

    
        testByMethods = (screen) => {
            return {                
                getInput(labelText) {
                    return screen.getByLabelText(labelText)
                },
                getByTestId(testId) {
                    return screen.getByTestId(testId)
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
                        queryResults={studentRecords}
                        handleBacktoQuery={jest.fn()}
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

        it('should render QueryResults components, and subcomponents', () => {})
        it('should allow search with filter', () => {})
        it('should allow for results to be sorted',  () => {})
        it('should allow for results to paginate', () => {})
        
    })
    describe('testing ViewStudent component', () => {})
    describe('testing EditStudent component', () => {})
})