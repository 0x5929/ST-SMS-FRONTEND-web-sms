import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import QueryResults from './Results'
import { sampleStudentData } from '../../../services/data/studentData'

//import preview from 'jest-preview'


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

        it('should render QueryResults components', () => {
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
            const { queryByText, getAllByTestId, getByText, getInput, getByTestId, debug } = setup()

            expect(getAllByTestId('edit-record-btn')).toHaveLength(5)
            
            await userEvent.click(getAllByTestId('edit-record-btn')[0])

            //assert necessary elements are there
            expect(getByText(/edit student data/i)).toBeInTheDocument()
            expect(getInput('Student ID')).toBeInTheDocument()
            expect(getByText('RO-CNA-100-0001-AB')).toBeInTheDocument()

            // test edit function
            await userEvent.type(getInput('First Name'), '22')
            expect(getInput('First Name')).toBeInTheDocument()
            await userEvent.click(getByText('Submit'))
            await userEvent.type(getInput('First Name'), '22')

            // close edit modal
            await userEvent.click(getByTestId('modal-close-btn'))
            expect(queryByText('Edit Student Data')).not.toBeVisible()
            

        })
        test('each student should have working delete student button', async () => {
            const { getAllByTestId, getByText, queryByText } = setup()

            expect(getAllByTestId('del-record-btn')).toHaveLength(5)

            // test delete function
            await userEvent.click(getAllByTestId('del-record-btn')[0])
            expect(getByText('Are you sure you want to delete this student record?')).toBeInTheDocument()
            await userEvent.click(getByText('No'))
            //preview.debug()
            expect(queryByText('Student record deleted!')).not.toBeInTheDocument()
            await userEvent.click(getAllByTestId('del-record-btn')[0])

            expect(getByText('Are you sure you want to delete this student record?')).toBeInTheDocument()
            await userEvent.click(getByText('Yes'))
            expect(getByText('Student record deleted!')).toBeInTheDocument()
            expect(queryByText('Are you sure you want to delete this student record?')).not.toBeVisible()


        })


        it('should allow search with filter', async () => {
            const { getInput, getByText, getByTestId, queryByText } = setup()

            await userEvent.type(getInput('Search Results'), 'RO-CNA-100-0001-AB')
            expect(getByText('RO-CNA-100-0001-AB')).toBeInTheDocument()

            await userEvent.click(getByTestId('mui-clearIcon'))
            await userEvent.type(getInput('Search Results'), '__TEST__')
            // expect(queryByText('__TEST__')).not.toBeInTheDocument()
            // preview.debug()
        })

        it('should allow for results to be sorted', async () => {
            const { getAllByTestId, getByText, queryByText, getAllByText } = setup()

            // asssert that there are total 6 sortable columns
            expect(getAllByTestId('ArrowDownwardIcon')).toHaveLength(6)

            // test sort the first column
            expect(queryByText('RO-CNA-100-0015-AB')).not.toBeInTheDocument()
            await userEvent.click(getAllByTestId('ArrowDownwardIcon')[0])
            await userEvent.click(getAllByTestId('ArrowDownwardIcon')[0])
            expect(getByText('RO-CNA-100-0015-AB')).toBeInTheDocument()

            // test sort the second column
            await userEvent.click(getAllByTestId('ArrowDownwardIcon')[1])
            expect(queryByText('student15')).not.toBeInTheDocument()
            expect(getAllByText('student1')).toHaveLength(2)    // we have student1 as first and last name

            // test sort the third column
            await userEvent.click(getAllByTestId('ArrowDownwardIcon')[2])
            expect(getAllByText('student13')).toHaveLength(2)
            expect(getAllByText('student12')).toHaveLength(2)
            expect(getAllByText('student11')).toHaveLength(2)
            expect(getAllByText('student10')).toHaveLength(2)
            expect(getAllByText('student1')).toHaveLength(2)

        })
        it('should allow for results to paginate', async () => {
            const { getByTestId, getByText, queryByText, getByRole } = setup()
            
            expect(getByTestId('KeyboardArrowRightIcon')).toBeInTheDocument()
            
            // testing paginate from first page to second page (total 15 elements returned from results, so 5 per, but changable)
            expect(getByText('RO-CNA-100-0001-AB')).toBeInTheDocument()
            await userEvent.click(getByTestId('KeyboardArrowRightIcon'))
            expect(queryByText('RO-CNA-100-0001-AB')).not.toBeInTheDocument()
            expect(getByText('RO-CNA-100-0006-AB')).toBeInTheDocument()

            // testing to paingate to the last page, displaying results #11 to #15
            await userEvent.click(getByTestId('KeyboardArrowRightIcon'))
            expect(queryByText('RO-CNA-100-0001-AB')).not.toBeInTheDocument()
            expect(queryByText('RO-CNA-100-0006-AB')).not.toBeInTheDocument()
            expect(getByText('RO-CNA-100-0011-AB')).toBeInTheDocument()

            // now paginate back to first page
            await userEvent.click(getByTestId('KeyboardArrowLeftIcon'))
            await userEvent.click(getByTestId('KeyboardArrowLeftIcon'))
            expect(getByText('RO-CNA-100-0001-AB')).toBeInTheDocument()
            expect(queryByText('RO-CNA-100-0006-AB')).not.toBeInTheDocument()
            expect(queryByText('RO-CNA-100-0011-AB')).not.toBeInTheDocument()

            // testing changing amount of rows per page, options are 5, 10, 25
            expect(queryByText('RO-CNA-100-0006-AB')).not.toBeInTheDocument()
            await userEvent.click(getByRole('button', {name: 'Rows per page: 5'}))
            expect(getByText('10')).toBeInTheDocument()
            expect(getByText('25')).toBeInTheDocument()
    
            await userEvent.click(getByText('10'))
            expect(getByText('RO-CNA-100-0006-AB')).toBeInTheDocument()
            //preview.debug()
        })
        
    })

})