import '@testing-library/jest-dom'
import { render, screen, cleanup, act, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' 
import userEvent from "@testing-library/user-event"
import { renderHook } from '@testing-library/react-hooks/dom' 
import Components from '../../components' // needed or else, there is an input error inside StudentForm > ProgramForm > RotationForm > Input/Select, aka rendering issue?
import { useNotification } from '../../hooks'
import StudentForm from './StudentForm'
import ProgramForm from './ProgramForm'
import RotationForm from './RotationForm'
import CreateStudent from '../../features/Create/CreateStudent'
import EditStudent from '../../features/Query/Results/EditStudent'
import QueryForm from './QueryForm'
import { AuthContextProvider, useAuthContext } from '../../contexts'
import * as SMSRecordService from '../../services/SMSRecordService'
import { useRef } from 'react'

import { sampleCourseOptions, sampleRotationOptions, sampleStudentData } from '../../services/data/studentData'
import * as AxioService from '../../services/api/djREST'

import preview from 'jest-preview'
import PersistLogin from '../../features/Auth/PersistLogin/component'


jest.mock('../../hooks/useAuthedAxios', () => ({
    __esModule: true,
    default: jest.fn(()=>({}))
}))



describe('testing form components', () => {



    let testByMethods    
    let notificationResults
    let studentFormStates
    let studentFormHandlers





    function getNotificationResults() {
        const { result } = renderHook(() => useNotification(Components.NotificationSlide))
        return result.current
    }
    

    const insertRequiredStudentFields = async ({
        getByText, getInput, getAllByRole
    }) => {
        await userEvent.type(getInput(/student id/i), '__TEST__') 
        expect(getInput(/student id/i)).toHaveValue('__TEST__')
        expect(getByText('Please enter the correct format. ie: RO-CNA-10-1005-KR')).toBeInTheDocument()
        await userEvent.clear(getInput(/student id/i))
        await userEvent.type(getInput(/student id/i), 'RO-CNA-100-1005-XX') 
        expect(getInput(/student id/i)).toHaveValue('RO-CNA-100-1005-XX')


        await userEvent.type(getInput(/first name/i), '__TEST__') 
        expect(getInput(/first name/i)).toHaveValue('__TEST__')

        await userEvent.clear(getInput(/first name/i))
        expect(getByText('This field is required.')).toBeInTheDocument()
        await userEvent.type(getInput(/first name/i), '__TEST__') 
        expect(getInput(/first name/i)).toHaveValue('__TEST__')


        await userEvent.type(getInput(/last name/i), '__TEST__') 
        expect(getInput(/last name/i)).toHaveValue('__TEST__')    

        await userEvent.clear(getInput(/last name/i))
        expect(getByText('This field is required.')).toBeInTheDocument()
        await userEvent.type(getInput(/last name/i), '__TEST__') 
        expect(getInput(/last name/i)).toHaveValue('__TEST__')

        await userEvent.type(getInput(/phone number/i), '__TEST__') 
        expect(getInput(/phone number/i)).toHaveValue('__TEST__')
        expect(getByText('Please enter the correct format. ie: xxx-xxx-xxxx')).toBeInTheDocument()
        await userEvent.clear(getInput(/phone number/i))
        await userEvent.type(getInput(/phone number/i), '000-000-0000') 
        expect(getInput(/phone number/i)).toHaveValue('000-000-0000')

        await userEvent.type(getInput(/email/i), '__TEST__') 
        expect(getInput(/email/i)).toHaveValue('__TEST__')
        expect(getByText('Incorrect email format.')).toBeInTheDocument()
        await userEvent.clear(getInput(/email/i))
        await userEvent.type(getInput(/email/i), 'test@email.com') 
        expect(getInput(/email/i)).toHaveValue('test@email.com')

        await userEvent.type(getInput(/mailing address/i), '__TEST__') 
        expect(getInput(/mailing address/i)).toHaveValue('__TEST__')

        await userEvent.clear(getInput(/mailing address/i))
        expect(getByText('This field is required.')).toBeInTheDocument()
        await userEvent.type(getInput(/mailing address/i), '__TEST__') 
        expect(getInput(/mailing address/i)).toHaveValue('__TEST__')



        await userEvent.click(getAllByRole('button', {expanded: false})[0])
        //preview.debug()
        await userEvent.click(getByText(/certified nurse assistant/i))
        expect(getAllByRole('button', {expanded: false})[0]).toHaveTextContent(/certified nurse assistant/i)

        
        await userEvent.click(getAllByRole('button', {expanded: false})[1])
        await userEvent.click(getByText(/cna rotation 9/i))
        expect(getAllByRole('button', {expanded: false})[1]).toHaveTextContent(/cna rotation 9/i)

        // // clicking add rot button will launch the modal, assert render then close ADD ROTATION FORM TESTS
        // await userEvent.click(getByRole('button', {name: ''}))
        // expect(getByText('Add Rotation')).toBeInTheDocument()
        // expect(getByTestId('rotation-form')).toBeInTheDocument()
        // await userEvent.click(getByRole('button', {expanded: false}))
        // await userEvent.click(getByText(/security guard/i))
        // expect(getByRole('button', {expanded: false})).toHaveTextContent(/security guard/i)
        // await userEvent.type(getInput(/rotation number/i), '__TEST__')
        // expect(getByText('Only numeric format is allowed.')).toBeInTheDocument()
        // await userEvent.click(getByTestId('rotation-form-cancel-btn'))
        // expect(queryByText(/security guard/i)).not.toBeInTheDocument()
        // expect(getInput(/rotation number/i)).toHaveValue('')
        // await userEvent.click(getByTestId('CloseOutlinedIcon'))

        await userEvent.clear(getInput(/program start date/i))
        expect(getByText('This field is required.')).toBeInTheDocument()
        await userEvent.type(getInput(/program start date/i), '20220101')
        expect(getInput(/program start date/i)).toHaveValue('2022-01-01')

        await userEvent.clear(getInput(/program completion date/i))
        expect(getByText('This field is required.')).toBeInTheDocument()
        await userEvent.type(getInput(/program completion date/i), '20220101')
        expect(getInput(/program completion date/i)).toHaveValue('2022-01-01')

        await userEvent.clear(getInput(/date enrollment agreement signed/i))
        expect(getByText('This field is required.')).toBeInTheDocument()
        await userEvent.type(getInput(/date enrollment agreement signed/i), '20220101')
        expect(getInput(/date enrollment agreement signed/i)).toHaveValue('2022-01-01')

        await userEvent.type(getInput(/course cost/i), '__TEST__') 
        expect(getInput(/course cost/i)).toHaveValue('__TEST__')
        expect(getByText('Please enter the correct format. ie: xxxx.xx')).toBeInTheDocument()
        await userEvent.clear(getInput(/course cost/i))
        await userEvent.type(getInput(/course cost/i), '5.50') 
        expect(getInput(/course cost/i)).toHaveValue('5.50')


        await userEvent.type(getInput(/charges charged/i), '__TEST__') 
        expect(getInput(/charges charged/i)).toHaveValue('__TEST__')
        expect(getByText('Please enter the correct format. ie: xxxx.xx')).toBeInTheDocument()
        await userEvent.clear(getInput(/charges charged/i))
        await userEvent.type(getInput(/charges charged/i), '5.50') 
        expect(getInput(/charges charged/i)).toHaveValue('5.50')

        await userEvent.type(getInput(/charges paid/i), '__TEST__') 
        expect(getInput(/charges paid/i)).toHaveValue('__TEST__')
        expect(getByText('Please enter the correct format. ie: xxxx.xx')).toBeInTheDocument()
        await userEvent.clear(getInput(/charges paid/i))
        await userEvent.type(getInput(/charges paid/i), '5.50') 
        expect(getInput(/charges paid/i)).toHaveValue('5.50')


    }

    // trying the hook method again, if not the tests are going to be done right

    //const { refResult } = renderHook(() => useRef(null))
    //const inputRef = refResult.current
    // const resolveValue = jest.fn()
    // const handleClearError = jest.fn()
    // const handleClearCourse = jest.fn()
    // const handleRotationChange = jest.fn()
    // const handleSubmit = jest.fn()
    // const handleCancel = jest.fn()
    // const handleCourseChange = jest.fn()
    // const convertToDefaultEventParam = jest.fn()
    // const getHoursWorkedRadioItems = SMSRecordService.getHoursWorkedRadioItems

    // const addRotModalHandlers = {
    //     handleOpenAddRotModal : jest.fn(),
    //     handleCloseAddRotModal: jest.fn()
    // }

    // const addRotHandlers = {
    //     handleAddRotSubmit : jest.fn(),
    //     handleAddRotClear : jest.fn(),
    //     handleProgramNameChange : jest.fn(),
    //     addRotModalHandlers: addRotModalHandlers
    // }



    // const studentFormHandlers = { 
    //     resolveValue,
    //     handleClearError,
    //     handleClearCourse,
    //     handleCourseChange,
    //     handleRotationChange,
    //     handleSubmit,
    //     handleCancel,
    //     convertToDefaultEventParam,
    //     getHoursWorkedRadioItems,

    //     addRotHandlers: {...addRotHandlers}

    // }

    // const studentFormValidations = {}
    // const studentFormState = {
    //     courseOptions: sampleCourseOptions,
    //     rotationOptions: sampleRotationOptions(sampleCourseOptions[0]['value']),
    //     course: '',
    //     rotation: '',
    //     showError: false,
    //     clearFields: false,
    //     submitLoading: false,
    //     submitSuccess: false
    // }
    // const inputRefs = {}


    // const addRotStates = {
    //     rotFormValidations: {},
    //     isAddRotModalOpen: false,
    //     programName : '',
    //     showError: false,
    //     clearFields: false,
    //     rotationRef : inputRef
    // }

    // const studentFormStates = { 
    //     studentFormValidations,
    //     studentFormState, 
    //     inputRefs,
    //     addRotStates: {...addRotStates}
    // }

    
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
                queryByText(text) {
                    return screen.queryByText(text)
                },
                queryByTestId(testId) {
                    return screen.queryByTestId(testId)
                },
                getAllByTestId(testId) {
                    return screen.getAllByTestId(testId)
                },
                getAllByRole(role) {
                    return screen.getAllByRole(role)
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


    describe('testing StudentForm component', () => {

        let setup


        // here beforeEach will outline this test coverage.
        beforeEach( async () => {
            setup = async ({isEdit=false} = {}) => {

                // var studentEditFormHandlers = {
                //     handleEditSubmit: () => {},
                //     handleEditCancel: () => {}
                // }


                // if (!isEdit) {
                //     studentEditFormHandlers = undefined
                // }


                // setup Form hooks
                notificationResults = getNotificationResults()
    
                let handleOpenNotificationMk = jest.fn()
                let setRecordForEditMk = jest.fn()
                let setRecordMk = jest.fn()
                let userFeedbackObj = { notify: notificationResults[1], notificationHandlers: {handleOpenNotification: handleOpenNotificationMk}}
                let recordForEdit = {course: 'CNA'}

                //function EditStudent({setRecordForEdit, setRecords, userFeedbackObj, recordForEdit})

                if (!isEdit) {

                    await act( async () => {

                        render(
    
                            <CreateStudent 
                                notify={notificationResults[1]}
                                notificationHandlers={{handleOpenNotification: handleOpenNotificationMk}}
                            />
    
                        )
                 })
                
                }
                else {
                    await act( async () => {

                        render(
                                <EditStudent 
                                setRecordForEdit={setRecordForEditMk}
                                setRecords={setRecordMk}
                                userFeedbackObj={userFeedbackObj}
                                recordForEdit={recordForEdit}
                            />
                        )
                    })

                }


            //    var handleEditSubmitMk, handleEditCancelMk

            //    const submitMk = jest.spyOn(studentFormHandlers, 'handleSubmit')
            //    const cancelMk = jest.spyOn(studentFormHandlers, 'handleCancel')

            //    if (isEdit) {

            //        handleEditSubmitMk = jest.spyOn(studentEditFormHandlers, 'handleEditSubmit')
            //        handleEditCancelMk = jest.spyOn(studentEditFormHandlers, 'handleEditCancel')
            //        studentFormStates.recordForEdit = sampleStudentData[0]
   
            //    }

                
                return {

                    ...(testByMethods(screen)),
                    handleOpenNotificationMk,
                    // studentFormStates,
                    // studentFormHandlers,
                    // submitMk,
                    // cancelMk,
                    // handleEditSubmitMk,
                    // handleEditCancelMk,
                    // studentEditFormHandlers,
                }
            }
        })
        afterEach(() => {
            setup = undefined
            jest.restoreAllMocks()
            cleanup()
        
        })

        it('should render program form component', async () => {

            const { getByTestId } = await setup()

            expect(getByTestId('program-form')).toBeInTheDocument()
            //preview.debug()
        })


        test('text inputs', async () => {
            const { getInput } = await setup()
            const inputLabels = [
                'Student ID',
                'First Name',
                'Last Name',
                'Phone Number',
                'Email',
                'Mailing Address',
                'Third Party Payer Info',
                'Course Cost',
                'Charges Charged',
                'Charges Paid',
                'Employment Position',
                'Place of Employment',
                'Employment Address',
                'Starting Wage',
                'Comments',
            ]

            for (let i = 0; i < inputLabels.length; i ++) {
                expect(getInput(inputLabels[i])).toBeInTheDocument()
            }

        })


        it('should render form with radio input with options', async () => {
            const { getByText } = await setup()

            expect(await getByText(/School/i)).toBeInTheDocument()
            expect(await getByText(/ABC/i)).toBeInTheDocument()
            expect(await getByText(/Full-time/i)).toBeInTheDocument()
            expect(await getByText(/Part-time/i)).toBeInTheDocument()
        })

        it('should render form with checkbox input components', async () => {
            const { getByText } = await setup()

            expect(getByText(/Employed/i)).toBeInTheDocument()
            expect(getByText(/Graduated/i)).toBeInTheDocument()
            expect(getByText(/Passed First Exam/i)).toBeInTheDocument()
            expect(getByText(/Passed Second or Third Exam/i)).toBeInTheDocument()

        })

        it('should render form with its button components', async () => {
            const { getByText, getByTestId } = await setup()

            expect(getByText(/Submit/i)).toBeInTheDocument()
            expect(getByText(/Cancel/i)).toBeInTheDocument()
            expect(getByTestId('save-icon')).toBeInTheDocument()

        })

        // when submitting if no inputs are filled then error will show
        // remember to also test for handleOpoennotification in another test where we can mock the useValidations
        it('should invoke submit when Submit is pressed', async () => {
            const { getByText } = await setup()

     
            const submitBtn = getByText(/Submit/i)
            await userEvent.click(submitBtn)
            expect(getByText('Please enter the correct format. ie: RO-CNA-10-1005-KR')).toBeInTheDocument()
        })

        it('should invoke handleEditSubmit when Submit is pressed in Edit', async () => {
            const { getByText, handleOpenNotificationMk } = await setup({isEdit: true})

            const submitBtn = getByText(/Submit/i)
            await userEvent.click(submitBtn)

            // assert error checking in place 
            expect(getByText('Please enter the correct format. ie: RO-CNA-10-1005-KR')).toBeInTheDocument()


        })





        it('should invoke success notification if no errors are found when submitting for create', async () => {
            
            const { getByText, getInput, getAllByRole, handleOpenNotificationMk } = await setup()
            

            // fill in required fields
            await insertRequiredStudentFields({ getByText, getInput, getAllByRole })
            const submitBtn = getByText(/Submit/i)
            await userEvent.click(submitBtn)

            expect(handleOpenNotificationMk.mock.calls).toHaveLength(1)
            expect(handleOpenNotificationMk).toHaveBeenLastCalledWith('Create successful')
        },50000)

        it('should invoke success notification if no errors are found when submitting for update', async () => {
            
            const { getByText, getInput, getAllByRole, handleOpenNotificationMk } = await setup({isEdit: true})
            

            // fill in required fields
            await insertRequiredStudentFields({ getByText, getInput, getAllByRole })
            const submitBtn = getByText(/Submit/i)
            await userEvent.click(submitBtn)

            expect(handleOpenNotificationMk.mock.calls).toHaveLength(1)
            expect(handleOpenNotificationMk).toHaveBeenLastCalledWith('Update successful')
        }, 50000)

        test('that when in edit mode, course cannot be changed', async () => {
            const { getByText, queryByTestId } = await setup({isEdit: true})

            // first the course will reflect the recordForEdit's current course
            expect(getByText('Certified Nurse Assistant')).toBeInTheDocument()

            // assert that clicking the button will not trigger select menu open to display select items
            await userEvent.click(getByText('Certified Nurse Assistant'))
            expect(queryByTestId('mui-selectitem')).not.toBeInTheDocument()

        })

        // these are extensively tested in Create feature, whereas each input is tested
        // here we are only testing the form functionality and therefore only testing one input (minimally)
        it('should invoke handleCancel and clear all input fields when Cancel is pressed', async () => {
            const { getByText, getInput } = await setup()

            // type in inputs, then click cancel to test if fields are cleared
            await userEvent.type(getInput('First Name'), '__TEST__')
            expect(getInput('First Name')).toHaveValue('__TEST__')
            const cancelBtn = getByText(/Cancel/i)

            await userEvent.click(cancelBtn)
            expect(getInput('First Name')).toHaveValue('')
        })

        // edit cancel should close the modal as well, lets test for that
        it('should invoke handleEditCancel when Cancel is pressed in Edit', async () => {
            const { getByText } = await setup({isEdit: true})
            expect(getByText('Edit Student Data')).toBeInTheDocument()

            const cancelBtn = getByText(/Cancel/i)

            await userEvent.click(cancelBtn)
            expect(getByText('Edit Student Data')).not.toBeVisible()
        })
    
        it('should render select components', async () => {
        const { getByTestId } = await setup()

        expect(getByTestId('course-select')).toBeInTheDocument()
        expect(getByTestId('rotation-select')).toBeInTheDocument()

        })

        it('should render add rot button when Program is selected', async () => {
            const { getByTestId, queryByTestId, getAllByRole, getByText } = await setup()
            
            expect(queryByTestId('addrot-btn')).not.toBeInTheDocument()

            await userEvent.click(getAllByRole('button', {Name: ''})[0])
            expect(getByText('Certified Nurse Assistant')).toBeInTheDocument()
            await userEvent.click(getByText('Certified Nurse Assistant'))

            expect(getByTestId('addrot-btn')).toBeInTheDocument()           
        })

        it('should open up addRotModal when add rot button is clicked', async () => {
            const { queryByTestId, getByTestId, queryByText, getByText, getAllByRole } = await setup()


            await userEvent.click(getAllByRole('button', {Name: ''})[0])
            expect(getByText('Certified Nurse Assistant')).toBeInTheDocument()
            await userEvent.click(getByText('Certified Nurse Assistant'))
            expect(queryByText('Add Rotation')).not.toBeInTheDocument()
            expect(queryByTestId('rotation-form')).not.toBeInTheDocument()
            const addRotBtn = getByTestId('addrot-btn')

            await userEvent.click(addRotBtn)
            expect(getByText('Add Rotation')).toBeInTheDocument()
            expect(getByTestId('rotation-form')).toBeInTheDocument()
        })
    

        it('add rot form should render select and text input and buttons', async () => {
            const { getByTestId, getAllByText, getAllByRole, getByText, getInput } = await setup()

            await userEvent.click(getAllByRole('button', {Name: ''})[0])
            expect(getByText('Certified Nurse Assistant')).toBeInTheDocument()
            await userEvent.click(getByText('Certified Nurse Assistant'))
            const addRotBtn = getByTestId('addrot-btn')

            await userEvent.click(addRotBtn)


            expect(getByTestId('program-select')).toBeInTheDocument()
            expect(getInput('Rotation Number')).toBeInTheDocument()
            expect(getByTestId('rotation-form-submit-btn')).toBeInTheDocument()
            expect(getByTestId('rotation-form-cancel-btn')).toBeInTheDocument()

        })
        
        test('add rot form submit and cancel button should work accordingly', async () => {
            const { getByTestId, queryByText, getInput, getAllByRole, getByText, getAllByText, handleOpenNotificationMk } = await setup()

            // open up addRotationFormModal
            await userEvent.click(getAllByRole('button', {Name: ''})[0])
            expect(getByText('Certified Nurse Assistant')).toBeInTheDocument()
            await userEvent.click(getByText('Certified Nurse Assistant'))
            const addRotBtn = getByTestId('addrot-btn')
            await userEvent.click(addRotBtn)

            // assert submit with error
            await userEvent.click(getByTestId('rotation-form-submit-btn'))
            expect(getByText('Only numeric format is allowed.')).toBeInTheDocument()


            // assert cancel
            await userEvent.type(getInput('Rotation Number'), '__TEST__')
            expect(getInput('Rotation Number')).toHaveValue('__TEST__')
            await userEvent.click(getByTestId('rotation-form-cancel-btn'))
            expect(getInput('Rotation Number')).toHaveValue('')
            
            
            // assert submit without error
            await userEvent.type(getInput('Rotation Number'), '1')

            await userEvent.click(getAllByRole('button', {expanded: false})[0])
            await userEvent.click(getAllByText(/certified nurse assistant/i)[1])
            preview.debug()
            expect(getAllByRole('button', {expanded: false})[0]).toHaveTextContent(/certified nurse assistant/i)
            expect(queryByText('Only numeric format is allowed.')).not.toBeInTheDocument()
            
            await userEvent.click(getByTestId('rotation-form-submit-btn'))
            expect(handleOpenNotificationMk.mock.calls).toHaveLength(1)
            expect(handleOpenNotificationMk).toHaveBeenLastCalledWith('Rotation added successfully')


        })

    })


    // describe('testing QueryForm component', () => {
    //     let setup
    //     let queryFormStates
    //     let queryFormHandlers


    //     beforeEach(() => {

    //         setup = ({moreThanOneOpt = false} = {}) => {

    //             const handleAddNewQuery = jest.fn()
    //             const handleDelQuery = jest.fn()
    //             const handleSubmit = jest.fn()

    //             const queryFormHandlers = {
    //                 handleAddNewQuery,
    //                 handleDelQuery,
    //                 handleSubmit,
    //                 getQueryOptions : SMSRecordService.getQueryOptions
    //             }

    //             let queryFormStates = {
    //                 queryOptions: null,
    //                 textInput : null,
    //                 queryFormErrors: {}
    //             }

                
    //             if (moreThanOneOpt) {
    //                 queryFormStates.queryOptions = [
    //                     {query: 'clast_name', value: '', pk: 1001},
    //                     {query: 'clast_name', value: '', pk: 1002}
    //                 ]
    //             }
    //             else {
    //                 queryFormStates.queryOptions = [
    //                     {query: 'clast_name', value: '', pk: 1001}
    //                 ]
    //             }
                

    //             render(
    //                 <AuthContextProvider>
    //                     <QueryForm 
    //                         queryFormStates={queryFormStates}
    //                         queryFormHandlers={queryFormHandlers}
    //                     />
    //                 </AuthContextProvider>
    //             )


               
    
    //             return {
                    
    //                 ...(testByMethods(screen)),
    //                 handleAddNewQuery,
    //                 handleDelQuery,
    //                 handleSubmit
    //             }
    //         }
    //     })

    //     afterEach(() => {
    //         setup = undefined
    //         queryFormStates = undefined
    //         queryFormHandlers = undefined
    //         jest.clearAllMocks()
    //         cleanup()
    //     })

    //     it('should render QuerySearchBar component', () => {
    //         const { getInput } = setup()

    //         expect(getInput('Search Student Database')).toBeInTheDocument()
    //     })

    //     it('should render QuerySelect component', () => {
    //         const { getByTestId } = setup()

    //         expect(getByTestId('queryby-select')).toBeInTheDocument()
    //     })

    //     it('should render QuerySelect with 19 options', async () => {
    //         const { getAllByTestId, getByRole } = setup()
    //         await userEvent.click(getByRole('button', {expanded: false}))
    //         //preview.debug()

    //         expect(getAllByTestId('mui-selectitem')).toHaveLength(19)
    //     })

    //     it('should render add new button', () => {
    //         const { getByText } = setup()
    //         expect(getByText(/add new/i)).toBeInTheDocument()

    //     })

    //     it('should call addNewHandler when add new button is clicked', () => {
    //         const { handleAddNewQuery, getByText } = setup()
    //         const addNewBtn = getByText(/add new/i)

    //         addNewBtn.click()
    //         expect(handleAddNewQuery.mock.calls).toHaveLength(1)
    //     })

    //     it('should not render delete button with only one query', () => {
    //         const { queryByTestId } = setup()
            
    //         // default there is only one query initialized
    //         expect(queryByTestId('delete-query-btn')).not.toBeInTheDocument()
    //     })

    //     it('should render delete button upon two or more query options', () => {

    //         // try changing the actual queries fed into the component, 2 queries should render, and delete should trigger deleteHandler
    //         const { getAllByTestId } = setup({moreThanOneOpt: true})

    //         expect(getAllByTestId('delete-query-btn')).toHaveLength(2)
    //     })

    //     it('should trigger handleDelQuery when delete query button is clicked', () => {
    //         const { handleDelQuery, getAllByTestId } = setup({moreThanOneOpt: true})
    //         const deleteBtn = getAllByTestId('delete-query-btn')[0]

    //         deleteBtn.click()
    //         expect(handleDelQuery.mock.calls).toHaveLength(1)
    //     })

    //     it('should render submit button', () => {
    //         const { getByTestId } = setup()
            
    //         expect(getByTestId('query-submit-btn')).toBeInTheDocument()

    //     })

    //     it('should trigger handleSubmit when query submit button is clicked', () => {
    //         const { getByTestId, handleSubmit } = setup()
    //         const submitBtn = getByTestId('query-submit-btn')

    //         submitBtn.click()
    //         expect(handleSubmit.mock.calls).toHaveLength(1)

    //     })
    // })
})