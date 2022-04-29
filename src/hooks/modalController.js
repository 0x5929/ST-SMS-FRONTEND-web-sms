import { useState } from "react";
import useForm from "./useForm";
import validate from './validationController';
import * as studentRecordService from '../services/SMSRecordService';

export function useEditModal (studentValues, setRecordForEdit, setRecords, userFeedbackObj) {

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
        convertToDefaultEventParam,
    } = useForm(false, studentValues, userFeedbackObj);


    const handleEditSubmit = e => {
        if (validate.validateCreateForm(values, setErrors, errors)){
            handleSubmit(e)
            setRecordForEdit(null)
            closeModal()
            setRecords(studentRecordService.getAllRecords())
        }
        else {
            e.preventDefault()
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
        populateFormFieldsForEdit,
        convertToDefaultEventParam
    }
}


export function useDetailedViewModal (setRecordForView){

    const detailedViewModalTitle = 'Detail View'
    const [detailedViewOpen, setDetailedViewOpen] = useState(false)

    const detailedViewClose = ()=> {
        setDetailedViewOpen(false)
    }

    const openInDetail = item => {
        setRecordForView(item)
        setDetailedViewOpen(true)
    }

    return {

        detailedViewModalTitle,
        detailedViewOpen,
        detailedViewClose,
        setDetailedViewOpen,
        openInDetail,
    }
}