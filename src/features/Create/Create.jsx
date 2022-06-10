import React from "react";

import Styles from './styles'
import { useStudentForm, useNotification } from '../../hooks'
import * as SMSRecordService from '../../services/SMSRecordService'


export default function Create() {

    const [notify, notificationHandlers] = useNotification(Styles.NotificationSlide)


    const [studentFormStates, studentFormHandlers] = useStudentForm(true, SMSRecordService.getInitialStudentValues(), 
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
            <Styles.StudentForm
                studentFormStates={studentFormStates}
                studentFormHandlers={studentFormHandlers}
            />
            <Styles.Notification 
                notify={notify}
                notificationHandlers={notificationHandlers}
            />
        </Styles.Paper>
    )
}
