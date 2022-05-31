import { useState } from "react";
import useForm from "./useForm";
import validate from './useValidation';
import * as studentRecordService from '../services/SMSRecordService';

export function useEditModal (studentValues, setRecordForEdit, setRecords, userFeedbackObj, recordForEdit) {

    const modalTitle = 'Edit Student Data'
    const [openModal, setOpenModal] = useState(false)

    const {
        addRotModalOpen,
        openAddRotModal,
        closeAddRotModal,
        addRotModalTitle
    }  = useAddRotationModal()

    const {
        studentFormState,
        studentFormDispatch,
        // values, 
        // errors,

        handleInputChange,
        handleSubmit,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,
        // success,
        // loading,

        handleAddRot,
        handleCloseAddRot,
        handleAddRotInputChange,
        handleAddRotSubmit,
        handleAddRotClear,
        // rotationValues,
        // rotationErrors,
    } = useForm(true, studentValues, userFeedbackObj, {
            openAddRotModal,
            closeAddRotModal,
        }, recordForEdit);


    const openInModal = item =>{
        setRecordForEdit(item)
        setOpenModal(true)
    }

    const closeModal = () => {
        studentFormDispatch({type: 'studentFormErrors', payload: {}})
        //setErrors({})
        setOpenModal(false)
    }

    const handleEditSubmit = e => {
        if (validate.useCreateValidation(studentFormState.studentFormValues, studentFormDispatch, studentFormState.studentFormErrors)){
            handleSubmit(e)
            setRecordForEdit(studentFormState.studentFormValues)
            
            // lets try to figure out how to wait until handleSUbmit to finish then excute code after, wait one second then close modal, then pop notification
            //closeModal()
            setRecords(studentRecordService.getAllRecords())
        }
        else {
            e.preventDefault()
        }
    }

    const handleEditCancel = ()=> {
        //setErrors({})
        studentFormDispatch({type: 'studentFormErrors', payload: {}})
        closeModal()
    }

    return {
        studentFormState,
        // values, 
        // errors,
        handleInputChange,
        handleEditSubmit,
        handleEditCancel,
        handleAddRot,
        handleCloseAddRot,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        modalTitle,
        openModal, 
        openInModal,
        setOpenModal ,
        closeModal,
        convertToDefaultEventParam,
        // success,
        // loading,

        addRotModalOpen,
        addRotModalTitle,

        handleAddRotInputChange,
        handleAddRotSubmit,
        handleAddRotClear,
        // rotationValues,
        // rotationErrors,
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


export function useAddRotationModal (){
    const [addRotModalOpen, setAddRotModalOpen] = useState(false)
    const addRotModalTitle = 'Add Rotation'

    const openAddRotModal = () => {
        setAddRotModalOpen(true)
    }

    const closeAddRotModal = () => {
        setAddRotModalOpen(false)
    }
    return {
        addRotModalOpen,
        openAddRotModal,
        closeAddRotModal,
        addRotModalTitle
    }

} 