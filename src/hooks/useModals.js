import { useState } from "react";
import {useStudentForm} from "./useForms";
import * as studentRecordService from '../services/SMSRecordService';

export function useEditModal (studentValues, setRecordForEdit, setRecords, userFeedbackObj, recordForEdit) {

    const editModalTitle = 'Edit Student Data'
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)



    const {
        studentFormState,
        handleClearStudentFormErrorCallback,
        handleInputChange,
        handleSubmit,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,

        rotationFormValues,
        rotationFormErrors,
        isAddRotModalOpen,
        addRotModalTitle,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        handleAddRotSubmit,
        handleAddRotInputChange,
        handleAddRotClear

    } = useStudentForm(true, studentValues, userFeedbackObj, recordForEdit);


    const handleOpenEditModal = item =>{
        setRecordForEdit(item)
        setIsEditModalOpen(true)
    }

    const handleCloseEditModal = () => {
        handleClearStudentFormErrorCallback()
        setIsEditModalOpen(false)
    }

    const handleEditSubmit = e => {

        handleSubmit(e)
        setRecordForEdit(studentFormState.studentFormValues)
        
        // lets try to figure out how to wait until handleSUbmit to finish then excute code after, wait one second then close modal, then pop notification
        //closeModal()
        setRecords(studentRecordService.getAllRecords())
    }

    const handleEditCancel = ()=> {
        handleClearStudentFormErrorCallback()
        handleCloseEditModal()
    }

    return {
        studentFormState,

        handleInputChange,
        getCourseOptions,
        getRotationOptions,
        hoursWorkedRadioItems,
        convertToDefaultEventParam,

        rotationFormValues,
        rotationFormErrors,
        isAddRotModalOpen,
        addRotModalTitle,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        handleAddRotSubmit,
        handleAddRotInputChange,
        handleAddRotClear,

        handleEditSubmit,
        handleEditCancel,

        editModalTitle,
        isEditModalOpen, 
        handleOpenEditModal,
        handleCloseEditModal,

    }
}


export function useDetailedViewModal (setRecordForView){

    const detailedViewModalTitle = 'Detail View'
    const [isDetailedViewModalOpen, setIsDetailedViewModalOpen] = useState(false)

    const handleDetailedViewModalClose = ()=> {
        setIsDetailedViewModalOpen(false)
    }

    const handleDetailedViewModalOpen = item => {
        setRecordForView(item)
        setIsDetailedViewModalOpen(true)
    }

    return {

        detailedViewModalTitle,
        isDetailedViewModalOpen,
        handleDetailedViewModalClose,
        handleDetailedViewModalOpen,
    }
}


export function useAddRotationModal (){
    const [isAddRotModalOpen, setIsAddRotModalOpen] = useState(false)
    const addRotModalTitle = 'Add Rotation'

    const handleOpenAddRotModal = () => {
        setIsAddRotModalOpen(true)
    }

    const handleCloseAddRotModal = () => {
        setIsAddRotModalOpen(false)
    }
    return {
        isAddRotModalOpen,
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        addRotModalTitle
    }

} 