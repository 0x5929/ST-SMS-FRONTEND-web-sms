import React from "react";

import Styles from './styles'
import useForm from '../../hooks/useForm'
import { useNotification } from '../../hooks/userFeedbackController'
import * as studentData from '../../data/studentData'


export default function Create() {

    const {
        notify,
        setNotify,
        closeNotification,

    } = useNotification(Styles.NotificationSlide)

    const {
        values, 
        // setValues,
        errors,
        // setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam
    } = useForm(true, studentData.initialStudentValues, 
            {
                setNotify,
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
                values={values}
                errors={errors}
                handleInputChange={handleInputChange}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                getCourseOptions={getCourseOptions}
                hoursWorkedRadioItems={hoursWorkedRadioItems}
                convertToDefaultEventParam={convertToDefaultEventParam}
            />

            <Styles.Notification 
                notify={notify}
                setNotify={setNotify}
                closeNotification={closeNotification}
            />
        </Styles.Paper>
    )
}
