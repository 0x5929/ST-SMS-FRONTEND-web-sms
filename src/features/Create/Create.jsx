import React from "react";

import Styles from './styles'
import { useForm, useNotification } from '../../hooks'
import * as SMSRecordService from '../../services/SMSRecordService'


export default function Create() {

    const {
        notify,
        setNotify,
        closeNotification,

    } = useNotification(Styles.NotificationSlide)

    const {
        values, 
        errors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,
        success,
        loading,
        
    } = useForm(true, SMSRecordService.getInitialStudentValues(), 
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
                getRotationOptions={getRotationOptions}
                hoursWorkedRadioItems={hoursWorkedRadioItems}
                convertToDefaultEventParam={convertToDefaultEventParam}
                success={success}
                loading={loading}
            />

            <Styles.Notification 
                notify={notify}
                setNotify={setNotify}
                closeNotification={closeNotification}
            />
        </Styles.Paper>
    )
}
