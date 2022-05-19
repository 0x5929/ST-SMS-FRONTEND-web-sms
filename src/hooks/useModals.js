import { useState } from "react";
import useForm from "./useForm";
import validate from './useValidation';
import * as studentRecordService from '../services/SMSRecordService';

export function useEditModal (studentValues, setRecordForEdit, setRecords, userFeedbackObj, recordForEdit) {

    const modalTitle = 'Edit Student Data'
    const [openModal, setOpenModal] = useState(false)

    const {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleSubmit,
        getCourseOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,
        success,
        loading,
    } = useForm(false, studentValues, userFeedbackObj, recordForEdit);


    const openInModal = item =>{
        setRecordForEdit(item)
        setOpenModal(true)
    }

    const closeModal = () => {
        setErrors({})
        setOpenModal(false)
    }

    const handleEditSubmit = e => {
        if (validate.useCreateValidation(values, setErrors, errors)){
            handleSubmit(e)
            setRecordForEdit(null)
            
            // lets try to figure out how to wait until handleSUbmit to finish then excute code after, wait one second then close modal, then pop notification
            //closeModal()
            setRecords(studentRecordService.getAllRecords())
        }
        else {
            e.preventDefault()
        }
    }

    const handleEditCancel = ()=> {
        setErrors({})
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
        convertToDefaultEventParam,
        success,
        loading,
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