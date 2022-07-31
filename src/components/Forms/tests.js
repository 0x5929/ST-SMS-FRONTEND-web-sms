import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks/dom' 
import userEvent from '@testing-library/user-event'
import { useNotification, useStudentForm } from '../../hooks'
import Components from '../../components'

import StudentForm from './StudentForm'

describe('testing form components', () => {
    describe('testing StudentForm component', () => {
        it('should render form with text input components', () => {
            // call useForm, and pass in necessary values to studentForm.
            // use react-hooks-testing-library

            function getNotificationResults() {
                const { result } = renderHook(() => useNotification(Components.NotificationSlide))
                return result.current
            }
            const notificationResults = getNotificationResults()
            const { result } = renderHook( () => useStudentForm({notificationHandlers: notificationResults.notificationHandlers, notify: notificationResults.notify}))

            
            render(
                <StudentForm 
                    studentFormStates={result.current.studentFormStates}
                    studentFormHandlers={result.current.studentFormHandlers}
                />)

            expect(screen.getByLabelText('Student ID'))
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