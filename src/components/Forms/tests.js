import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks/dom' 

import { useNotification, useStudentForm } from '../../hooks'
import Components from '../../components'

import StudentForm from './StudentForm'
import ProgramForm from './ProgramForm'


describe('testing form components', () => {

    let notificationResults
    let studentFormStates
    let studentFormHandlers
    let testByMethods

    function getNotificationResults() {
        const { result } = renderHook(() => useNotification(Components.NotificationSlide))
        return result.current
    }


    beforeAll(() => {
        notificationResults = getNotificationResults()

        const { result } = renderHook( () => useStudentForm({notificationHandlers: notificationResults[0], notify: notificationResults[1]}))
        studentFormStates = result.current[0]
        studentFormHandlers = result.current[1]


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
                }
            }
        }
    })


    afterAll(() => {
        notificationResults = undefined
        studentFormStates = undefined
        studentFormHandlers = undefined
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
                    <StudentForm 
                        studentFormStates={studentFormStates}
                        studentFormHandlers={studentFormHandlers}
                        studentEditFormHandlers={studentEditFormHandlers}
                    />)

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
            setup = undefined;
            cleanup();
        
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
                    <ProgramForm 
                        validations={validations}
                        studentFormStates={studentFormStates}
                        studentFormHandlers={studentFormHandlers}
                    />)

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

    })

    describe('testing QueryForm component', () => {
        
    })
})