import React from "react";

import Styles from './styles'
import { useForm, useNotification, useAddRotationModal } from '../../hooks'
import * as SMSRecordService from '../../services/SMSRecordService'


export default function Create() {

    const {
        notify,
        setNotify,
        closeNotification,

    } = useNotification(Styles.NotificationSlide)

    const {
        addRotModalOpen,
        openAddRotModal,
        closeAddRotModal,
        addRotModalTitle
    }  = useAddRotationModal()

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


        handleAddRot,
        handleCloseAddRot,
        handleAddRotInputChange,
        handleAddRotSubmit,
        handleAddRotClear,
        rotationValues,
        rotationErrors,
        
    } = useForm(true, SMSRecordService.getInitialStudentValues(), 
            {
                setNotify,
                notify
            },
            {
                openAddRotModal,
                closeAddRotModal,
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

                handleAddRot={handleAddRot}
                handleCloseAddRot={handleCloseAddRot}
                addRotModalOpen={addRotModalOpen}
                addRotModalTitle={addRotModalTitle}
                handleAddRotInputChange={handleAddRotInputChange}
                handleAddRotSubmit={handleAddRotSubmit}
                handleAddRotClear={handleAddRotClear}
                rotationValues={rotationValues}
                rotationErrors={rotationErrors}
            />

            <Styles.Notification 
                notify={notify}
                setNotify={setNotify}
                closeNotification={closeNotification}
            />
        </Styles.Paper>
    )
}
