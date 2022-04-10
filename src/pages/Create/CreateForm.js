import React from 'react'
import useForm from '../../controllers/createFormController'
import { useNotification } from '../../controllers/userFeedbackController'
import Controls from '../../components'
import * as studentData from '../../data/studentData'



export default function CreateForm() {

    const {
        notify,
        setNotify,
        closeNotification,

    } = useNotification(Controls.NotificationSlide)

    const {
        values, 
        // setValues,
        errors,
        // setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        hoursWorkedRadioItems
    } = useForm(true, studentData.initialStudentValues, {
        setNotify: setNotify,
        notify: notify
    });



    return (
        <>
            <Controls.Form onSubmit={handleSubmit}>

                <Controls.StudentFormGrid
                    values={values}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleCancel={handleCancel}
                    getCourseOptions={getCourseOptions}
                    hoursWorkedRadioItems={hoursWorkedRadioItems}
                />
            </Controls.Form>
            <Controls.Notification 
                notify={notify}
                setNotify={setNotify}
                closeNotification={closeNotification}
            />
        </>
    
  )
}
