import React from 'react'
import { Box } from '@mui/material'
import { useStudentForm } from '../../hooks'
import Components from '../../components'

function CreateStudent({ notificationHandlers, notify }) {
    const [studentFormStates, studentFormHandlers] = useStudentForm({notificationHandlers, notify})

    return (
        <Box data-testid="create-student-component">
            <Components.StudentForm 
                studentFormStates={studentFormStates}
                studentFormHandlers={studentFormHandlers}
            />
        </Box>
    )
}


export default React.memo(CreateStudent)