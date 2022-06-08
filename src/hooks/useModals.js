import { useState } from "react";
import {useStudentForm} from "./useForms";
import * as studentRecordService from '../services/SMSRecordService';

export function useEditModal (studentValues, setRecordForEdit, setRecords, userFeedbackObj, recordForEdit) {


    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [studentFormStates, studentFormHandlers] = useStudentForm(true, studentValues, userFeedbackObj, recordForEdit);


    const handleOpenEditModal = item =>{
        setRecordForEdit(item)
        setIsEditModalOpen(true)
    }

    const handleCloseEditModal = () => {
        studentFormHandlers.handleClearStudentFormErrorCallback()
        setIsEditModalOpen(false)
    }

    const handleEditSubmit = e => {

        studentFormHandlers.handleSubmit(e)
        setRecordForEdit(studentFormStates.studentFormState.studentFormValues)
        
        // lets try to figure out how to wait until handleSUbmit to finish then excute code after, wait one second then close modal, then pop notification
        //closeModal()
        setRecords(studentRecordService.getAllRecords())
    }

    const handleEditCancel = ()=> {
        studentFormHandlers.handleClearStudentFormErrorCallback()
        handleCloseEditModal()
    }

    const editModalStates = { isEditModalOpen, studentFormStates }
    
    const editModalHandlers = {
        handleOpenEditModal,
        handleCloseEditModal,
        handleEditSubmit,
        handleEditCancel,
        studentFormHandlers
    }


    return [editModalStates, editModalHandlers]
}


export function useDetailedViewModal (setRecordForView){


    const [isDetailedViewModalOpen, setIsDetailedViewModalOpen] = useState(false)

    const handleDetailedViewModalClose = ()=> {
        setIsDetailedViewModalOpen(false)
    }

    const handleDetailedViewModalOpen = item => {
        setRecordForView(item)
        setIsDetailedViewModalOpen(true)
    }

    const detailedViewModalStates = { isDetailedViewModalOpen  }
    const detailedViewModalHandlers = { handleDetailedViewModalOpen, handleDetailedViewModalClose}
    
    return [detailedViewModalStates, detailedViewModalHandlers] 
}


export function useAddRotationModal (){
    const [isAddRotModalOpen, setIsAddRotModalOpen] = useState(false)

    const handleOpenAddRotModal = () => {
        setIsAddRotModalOpen(true)
    }

    const handleCloseAddRotModal = () => {
        setIsAddRotModalOpen(false)
    }

    const addRotModalHandlers = { handleOpenAddRotModal,handleCloseAddRotModal }

    return [isAddRotModalOpen, addRotModalHandlers]

} 