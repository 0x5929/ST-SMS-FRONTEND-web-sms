import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { renderHook } from '@testing-library/react-hooks/dom' 
import Components from '../../components' // needed or else, there is an input error inside StudentForm > ProgramForm > RotationForm > Input/Select, aka rendering issue?

import StudentForm from './StudentForm'
import ProgramForm from './ProgramForm'
import RotationForm from './RotationForm'
import QueryForm from './QueryForm'
import { AuthContextProvider } from '../../contexts'
import * as axioService from '../../services/api/djREST'
import * as SMSRecordService from '../../services/SMSRecordService'
import { sampleStudentData, sampleCourseOptions } from '../../services/data/studentData'
import { useRef } from 'react'


//import preview from 'jest-preview'



describe('testing form components', () => {


    let testByMethods
    let getCourseOptionsMk
    
    const { result } = renderHook(() => useRef(null))
    const inputRef = result.current
    const resolveValue = jest.fn()
    const handleClearError = jest.fn()
    const handleClearCourse = jest.fn()
    const handleRotationChange = jest.fn()
    const handleSubmit = jest.fn()
    const handleCancel = jest.fn()
    const handleCourseChange = jest.fn()
    const convertToDefaultEventParam = jest.fn()
    const getRotationOptions = SMSRecordService.getRotationOptions
    const getHoursWorkedRadioItems = SMSRecordService.getHoursWorkedRadioItems

    const addRotModalHandlers = {
        handleOpenAddRotModal : jest.fn(),
        handleCloseAddRotModal: jest.fn()
    }

    const addRotHandlers = {
        handleAddRotSubmit : jest.fn(),
        handleAddRotClear : jest.fn(),
        handleProgramNameChange : jest.fn(),
        addRotModalHandlers: addRotModalHandlers
    }

    const studentFormHandlers = { 
        resolveValue,
        handleClearError,
        handleClearCourse,
        handleCourseChange,
        handleRotationChange,
        handleSubmit,
        handleCancel,
        convertToDefaultEventParam,
        getRotationOptions, 
        getHoursWorkedRadioItems,

        addRotHandlers: {...addRotHandlers}

    }
getCourseOptionsMk
    const studentFormValidations = {}
    const studentFormState = {
        studentFormValues: [],
        studentFormErrors: {},
        courseOptions: [],
        rotationOptions: [],
        course: '',
        rotation: '',
        showError: false,
        clearFields: false,
        submitLoading: false,
        submitSuccess: false
    }
    const inputRefs = {}
    const recordForEdit = {}
    const addRotStates = {
        rotFormValidations: {},
        isAddRotModalOpen: false,
        programName : '',
        showError: false,
        clearFields: false,
        rotationRef : inputRef
    }

    const studentFormStates = { 
        studentFormValidations,
        studentFormState, 
        recordForEdit,
        inputRefs,
        addRotStates: {...addRotStates}
    }

    
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
        beforeEach(() => {
            setup = ({isEdit=false} = {}) => {

                var studentEditFormHandlers = {
                    handleEditSubmit: () => {},
                    handleEditCancel: () => {}
                }


                const submitMk = jest.spyOn(studentFormHandlers, 'handleSubmit')
                const cancelMk = jest.spyOn(studentFormHandlers, 'handleCancel')
                const handleEditSubmitMk = jest.spyOn(studentEditFormHandlers, 'handleEditSubmit')
                const handleEditCancelMk = jest.spyOn(studentEditFormHandlers, 'handleEditCancel')


                if (!isEdit) {
                    studentEditFormHandlers = undefined
                }

                render(
                    <AuthContextProvider>
                        <StudentForm 
                            studentFormStates={studentFormStates}
                            studentFormHandlers={studentFormHandlers}
                            studentEditFormHandlers={studentEditFormHandlers}
                        />
                    </AuthContextProvider>
                )

                return {

                    ...(testByMethods(screen)),
                    studentFormStates,
                    studentFormHandlers,
                    submitMk,
                    cancelMk,
                    handleEditSubmitMk,
                    handleEditCancelMk
                }
            }
        })
        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        
        })


        test('text inputs', () => {
            const { getInput } = setup()
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

            inputLabels.forEach(label => {
                expect(getInput(label)).toBeInTheDocument()
            })

        })


        it('should render program form component', () => {
            const { getByTestId } = setup()
            expect(getByTestId('program-form')).toBeInTheDocument()
        })

        it('should render form with radio input with options', () => {
            const { getByText } = setup()

            expect(getByText(/Full-time/i)).toBeInTheDocument()
            expect(getByText(/Part-time/i)).toBeInTheDocument()
        })

        it('should render form with checkbox input components', () => {
            const { getByText } = setup()

            expect(getByText(/Employed/i)).toBeInTheDocument()
            expect(getByText(/Graduated/i)).toBeInTheDocument()
            expect(getByText(/Passed First Exam/i)).toBeInTheDocument()
            expect(getByText(/Passed Second or Third Exam/i)).toBeInTheDocument()

        })

        it('should render form with its button components', () => {
            const { getByText, getByTestId } = setup()

            expect(getByText(/Submit/i)).toBeInTheDocument()
            expect(getByText(/Cancel/i)).toBeInTheDocument()
            expect(getByTestId('save-icon')).toBeInTheDocument()

        })

        it('should invoke submit when Submit is pressed', () => {
            const { getByText, submitMk } = setup()
            const submitBtn = getByText(/Submit/i)

            submitBtn.click()
            expect(submitMk.mock.calls).toHaveLength(1)
        })

        it('should invoke handleEditSubmit when Submit is pressed in Edit', () => {
            const { getByText, handleEditSubmitMk } = setup({isEdit: true})

            const submitBtn = getByText(/Submit/i)
            submitBtn.click()

            expect(handleEditSubmitMk.mock.calls).toHaveLength(1)
        })

        it('should invoke handleCancel when Cancel is pressed', () => {
            const { getByText, cancelMk } = setup()
            const cancelBtn = getByText(/Cancel/i)

            cancelBtn.click()
            expect(cancelMk.mock.calls).toHaveLength(1)
        })

        it('should invoke handleEditCancel when Cancel is pressed in Edit', () => {
            const { getByText, handleEditCancelMk } = setup({isEdit: true})

            const cancelBtn = getByText(/Cancel/i)
            cancelBtn.click()

            expect(handleEditCancelMk.mock.calls).toHaveLength(1)
        })
    })


    describe('testing ProgramForm component', () => {

        let setup


        beforeEach(() => {
            setup = ({ addRot = false } = {}) => {

                const validations = studentFormStates.studentFormValidations

                const openAddRotModalMk = jest.spyOn(
                        studentFormHandlers.addRotHandlers.addRotModalHandlers, 
                        'handleOpenAddRotModal')

                if (addRot){
                    studentFormStates.addRotStates.isAddRotModalOpen = true
                }
                render(
                    <AuthContextProvider>
                        <ProgramForm 
                            validations={validations}
                            studentFormStates={studentFormStates}
                            studentFormHandlers={studentFormHandlers}
                        />
                    </AuthContextProvider>
                )

                return {
                    ...(testByMethods(screen)),
                    openAddRotModalMk
                }
            }
        })

        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        })

        it('should render select components', () => {
            const { getByTestId } = setup()

            expect(getByTestId('course-select')).toBeInTheDocument()
            expect(getByTestId('rotation-select')).toBeInTheDocument()
        })

        it('should render add rot button', () => {
            const { getByTestId } = setup()

            expect(getByTestId('addrot-btn')).toBeInTheDocument()
        })

        it('should invoke hanldeOpenAddRotModal when add rot button is clicked', () => {
            const { getByTestId, openAddRotModalMk } = setup()
            const addRotBtn = getByTestId('addrot-btn')

            addRotBtn.click()
            expect(openAddRotModalMk.mock.calls).toHaveLength(1)
        })


        // NOTE: instead of testing after clicking the button will trigger modal will trigger rotation form
        // we will test if the state is set as open/true, then rotation-form will render, it not, rotation form will not render
        // THEN we will test that button will trigger function and we will test that function will change the state to true.
        // this should be able to cover our test cases.
        it('should not render rotation form if modal is not set as open', () => {
            const { queryByTestId } = setup({addRot: false})
            expect(queryByTestId('rotation-form')).not.toBeInTheDocument()
        })

        it('should render rotation form if modal is set as open', () => {
            const { getByTestId } = setup({addRot: true})
            expect(getByTestId('rotation-form')).toBeInTheDocument()
        })
        
    })

    describe('testing RotationForm component', () => {

        let setup

        beforeEach(() => {
            setup = () => {
                
                const handleAddRotSubmitMk = jest.spyOn(studentFormHandlers.addRotHandlers, 'handleAddRotSubmit')
                const handleAddRotClearMk = jest.spyOn(studentFormHandlers.addRotHandlers, 'handleAddRotClear')
                
                render(
                    <AuthContextProvider>
                        <RotationForm 
                            courseOptions={studentFormStates.studentFormState.courseOptions}
                            addRotHandlers={studentFormHandlers.addRotHandlers}
                            addRotStates={studentFormStates.addRotStates}
                        />
                    </AuthContextProvider>
                )

                return {
                    ...(testByMethods(screen)),
                    handleAddRotSubmitMk,
                    handleAddRotClearMk

                }
            }
        })

        afterEach(() => {
            setup = undefined
            jest.clearAllMocks()
            cleanup()
        })


        it('should render select components', () => {
            const { getByTestId } = setup()

            expect(getByTestId('program-select')).toBeInTheDocument()

        })

        it('should render text field input component', () => {
            const { getByTestId } = setup()
            
            expect(getByTestId('rotation-number')).toBeInTheDocument()
        })

        it('should render button components', () => {
            const { getByText } = setup()

            expect(getByText(/submit/i)).toBeInTheDocument()
            expect(getByText(/cancel/i)).toBeInTheDocument()
        })
    
        it('should invoke handleAddRotSubmit when submit button is clicked', () => {
            const { getByText, handleAddRotSubmitMk } = setup()
            const submitBtn = getByText(/submit/i)

            submitBtn.click()

            expect(handleAddRotSubmitMk.mock.calls).toHaveLength(1)

        })

        it('should invoke handleAddRotClear when cancel button is clicked', () => {
            const { getByText, handleAddRotClearMk } = setup()
            const cancelBtn = getByText(/cancel/i)

            cancelBtn.click()

            expect(handleAddRotClearMk.mock.calls).toHaveLength(1)

        })
    })

    describe('testing QueryForm component', () => {
        let setup
        let queryFormStates
        let queryFormHandlers


        beforeEach(() => {

            setup = ({moreThanOneOpt = false} = {}) => {

                const handleAddNewQuery = jest.fn()
                const handleDelQuery = jest.fn()
                const handleSubmit = jest.fn()

                const queryFormHandlers = {
                    handleAddNewQuery,
                    handleDelQuery,
                    handleSubmit,
                    getQueryOptions : SMSRecordService.getQueryOptions
                }

                let queryFormStates = {
                    queryOptions: null,
                    textInput : inputRef,
                    queryFormErrors: {}
                }

                
                if (moreThanOneOpt) {
                    queryFormStates.queryOptions = [
                        {query: 'clast_name', value: '', pk: 1001},
                        {query: 'clast_name', value: '', pk: 1002}
                    ]
                }
                else {
                    queryFormStates.queryOptions = [
                        {query: 'clast_name', value: '', pk: 1001}
                    ]
                }
                

                render(
                    <AuthContextProvider>
                        <QueryForm 
                            queryFormStates={queryFormStates}
                            queryFormHandlers={queryFormHandlers}
                        />
                    </AuthContextProvider>
                )


               
    
                return {
                    
                    ...(testByMethods(screen)),
                    handleAddNewQuery,
                    handleDelQuery,
                    handleSubmit
                }
            }
        })

        afterEach(() => {
            setup = undefined
            queryFormStates = undefined
            queryFormHandlers = undefined
            jest.clearAllMocks()
            cleanup()
        })

        it('should render QuerySearchBar component', () => {
            const { getInput } = setup()

            expect(getInput('Search Student Database')).toBeInTheDocument()
        })

        it('should render QuerySelect component', () => {
            const { getByTestId } = setup()

            expect(getByTestId('queryby-select')).toBeInTheDocument()
        })

        it('should render QuerySelect with 19 options', async () => {
            const { getAllByTestId, getByRole } = setup()

            await userEvent.click(getByRole('button', {expanded: false}))

            expect(getAllByTestId('mui-selectitem')).toHaveLength(19)
        })

        it('should render add new button', () => {
            const { getByText } = setup()
            expect(getByText(/add new/i)).toBeInTheDocument()

        })

        it('should call addNewHandler when add new button is clicked', () => {
            const { handleAddNewQuery, getByText } = setup()
            const addNewBtn = getByText(/add new/i)

            addNewBtn.click()
            expect(handleAddNewQuery.mock.calls).toHaveLength(1)
        })

        it('should not render delete button with only one query', () => {
            const { queryByTestId } = setup()
            
            // default there is only one query initialized
            expect(queryByTestId('delete-query-btn')).not.toBeInTheDocument()
        })

        it('should render delete button upon two or more query options', () => {

            // try changing the actual queries fed into the component, 2 queries should render, and delete should trigger deleteHandler
            const { getAllByTestId } = setup({moreThanOneOpt: true})

            expect(getAllByTestId('delete-query-btn')).toHaveLength(2)
        })

        it('should trigger handleDelQuery when delete query button is clicked', () => {
            const { handleDelQuery, getAllByTestId } = setup({moreThanOneOpt: true})
            const deleteBtn = getAllByTestId('delete-query-btn')[0]

            deleteBtn.click()
            expect(handleDelQuery.mock.calls).toHaveLength(1)
        })

        it('should render submit button', () => {
            const { getByTestId } = setup()
            
            expect(getByTestId('query-submit-btn')).toBeInTheDocument()

        })

        it('should trigger handleSubmit when query submit button is clicked', () => {
            const { getByTestId, handleSubmit } = setup()
            const submitBtn = getByTestId('query-submit-btn')

            submitBtn.click()
            expect(handleSubmit.mock.calls).toHaveLength(1)

        })
    })
})