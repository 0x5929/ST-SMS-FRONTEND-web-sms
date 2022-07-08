import React from 'react'
import { useStudentForm } from '../../hooks'
import Components from '../../components'

function CreateStudent({ notificationHandlers, notify }) {
    console.log('CreateStudent feature rendered')

    const [studentFormStates, studentFormHandlers] = useStudentForm({notificationHandlers, notify})

    return (
        <Components.StudentForm 
            studentFormStates={studentFormStates}
            studentFormHandlers={studentFormHandlers}
        />
    )
}


export default React.memo(CreateStudent)