import React from "react"
import { Paper as MuiPaper } from '@mui/material'

import createCreateFeatureStyles from './styles'
import Components from '../../components'
import { useStudentForm, useNotification } from '../../hooks'
import * as SMSRecordService from '../../services/SMSRecordService'


const Styles = createCreateFeatureStyles({
    MuiPaper,
    BaseTypography: Components.BaseTypography
})

function Create() {

    const [notify, notificationHandlers] = useNotification(Styles.NotificationSlide)


    const [studentFormStates, studentFormHandlers] = useStudentForm(
        true, 
        SMSRecordService.getInitialStudentValues(), 
        {
            notificationHandlers,
            notify
        }
    );


    return (
        <Styles.Paper>        
            <Styles.Typography
            text="CREATE NEW STUDENT RECORD"
            align='center'
        />
            <Components.StudentForm
                studentFormStates={studentFormStates}
                studentFormHandlers={studentFormHandlers}
            />
            <Components.Notification 
                notify={notify}
                notificationHandlers={notificationHandlers}
            />
        </Styles.Paper>
    )
}

export default Create