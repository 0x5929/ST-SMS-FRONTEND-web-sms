import { useState } from "react";
import useForm from "../create/createFormController";
import validate from '../../controllers/create/createFormValidation';
import * as studentRecordService from '../../services/SMSRecordService';

export default function useModal (studentValues, setRecordForEdit, setRecords, userFeedbackObj) {

    const modalTitle = 'Edit Student Data'
    const [openModal, setOpenModal] = useState(false)

    const openInModal = item =>{
        setRecordForEdit(item)
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }



    const {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        hoursWorkedRadioItems,
        populateFormFieldsForEdit,
    } = useForm(false, studentValues, userFeedbackObj);


    const handleEditSubmit = e => {
        if (validate(values, setErrors, errors)){
            handleSubmit(e)
            setRecordForEdit(null)
            closeModal()
            setRecords(studentRecordService.getAllRecords())
        }
    }

    const handleEditCancel = ()=> {
        handleCancel()
        closeModal()
    }

    return {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleEditSubmit,
        handleEditCancel,
        getCourseOptions,
        hoursWorkedRadioItems,
        modalTitle,
        openModal, 
        openInModal,
        setOpenModal ,
        closeModal,
        populateFormFieldsForEdit
    }
}