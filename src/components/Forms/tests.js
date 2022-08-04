import { render, screen, cleanup } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks/dom' 
import userEvent from '@testing-library/user-event'
import { useNotification, useStudentForm } from '../../hooks'
import Components from '../../components'

import StudentForm from './StudentForm'


describe('testing form components', () => {


    describe('testing StudentForm component', () => {


        function getNotificationResults() {
            const { result } = renderHook(() => useNotification(Components.NotificationSlide))
            return result.current
        }

        let setup;

        beforeEach(() => {
            setup = () => {
                const props = {
                    inputOnChange: jest.fn() 
                }


                const notificationResults = getNotificationResults()
                const { result } = renderHook( () => useStudentForm({notificationHandlers: notificationResults[0], notify: notificationResults[1]}))
    
                
                render(
                    <StudentForm 
                        studentFormStates={result.current[0]}
                        studentFormHandlers={result.current[1]}
                    />)

                return {

                    getInput(labelText) {
                        return screen.getByLabelText(labelText)
                    },
                    inputOnChange: props.inputOnChange
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
                'First Name'
            ]

            let textInput
            for( var label in inputLabels ) {
                textInput = getInput(label)
                expect(textInput).toBeInTheDocument()
            }

        })

        it('should render form with text input components', () => {
            // call useForm, and pass in necessary values to studentForm.
            // use react-hooks-testing-library

            function getNotificationResults() {
                const { result } = renderHook(() => useNotification(Components.NotificationSlide))
                return result.current
            }
            const notificationResults = getNotificationResults()
            const { result } = renderHook( () => useStudentForm({notificationHandlers: notificationResults[0], notify: notificationResults[1]}))

            
            render(
                <StudentForm 
                    studentFormStates={result.current[0]}
                    studentFormHandlers={result.current[1]}
                />)

            expect(screen.getByLabelText('Student ID'))
            expect(screen.getByLabelText('First Name'))
            expect(screen.getByLabelText('Last Name'))
            expect(screen.getByLabelText('Phone Number'))
            expect(screen.getByLabelText('Email'))
            expect(screen.getByLabelText('Mailing Address'))
            expect(screen.getByLabelText('Third Party Payer Info'))
            expect(screen.getByLabelText('Course Cost'))
            expect(screen.getByLabelText('Charges Charged'))
            expect(screen.getByLabelText('Charges Paid'))
            expect(screen.getByLabelText('Employment Position'))
            expect(screen.getByLabelText('Place of Employment'))
            expect(screen.getByLabelText('Employment Address'))
            expect(screen.getByLabelText('Starting Wage'))
            expect(screen.getByLabelText('Comments'))
        })

        it('should render form with select input components', () => {

        })

        it('should render form with radio input components', () => {

        })

        it('should render form with checkbox input components', () => {

        })

        it('should render form with its button components', () => {

        })

        it('should invoke submit when Submit is pressed', () => {

        })

        it('should invoke EditSubmit when Submit is pressed in Edit', () => {

        })

        it('should clear all fields and errors when Cancel is pressed', () => {
            
        })
    })
})