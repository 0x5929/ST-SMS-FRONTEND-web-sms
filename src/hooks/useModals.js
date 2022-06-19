import { useState, useCallback } from "react";
import { useStudentForm } from "./useForms";
import * as studentRecordService from '../services/SMSRecordService';

export function useEditModal (studentValues, setRecordForEdit, setRecords, userFeedbackObj, recordForEdit) {


    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [studentFormStates, studentFormHandlers] = useStudentForm(true, studentValues, userFeedbackObj, recordForEdit);


    const handleOpenEditModal = useCallback(item =>{
        setRecordForEdit(item)
        setIsEditModalOpen(true)
    }, [setRecordForEdit])

    const handleCloseEditModal = useCallback(() => {
        studentFormHandlers.handleClearStudentFormErrorCallback()
        setIsEditModalOpen(false)
    }, [studentFormHandlers])

    const handleEditSubmit = useCallback(e => {

        studentFormHandlers.handleSubmit(e)
        setRecordForEdit(studentFormStates.studentFormState.studentFormValues)
        
        // lets try to figure out how to wait until handleSUbmit to finish then excute code after, wait one second then close modal, then pop notification
        //closeModal()
        setRecords(studentRecordService.getAllRecords())
    }, [setRecordForEdit, setRecords, studentFormHandlers, studentFormStates.studentFormState.studentFormValues])


    const handleEditCancel = useCallback(()=> {
        studentFormHandlers.handleClearStudentFormErrorCallback()
        handleCloseEditModal()
    }, [handleCloseEditModal, studentFormHandlers])

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

    const handleDetailedViewModalClose = useCallback(()=> {
        setIsDetailedViewModalOpen(false)
    }, [])

    const handleDetailedViewModalOpen = useCallback(item => {
        setRecordForView(item)
        setIsDetailedViewModalOpen(true)
    }, [setRecordForView])

    const detailedViewModalStates = { isDetailedViewModalOpen  }
    const detailedViewModalHandlers = { handleDetailedViewModalOpen, handleDetailedViewModalClose}
    
    return [detailedViewModalStates, detailedViewModalHandlers] 
}


export function useAddRotationModal (){
    const [isAddRotModalOpen, setIsAddRotModalOpen] = useState(false)

    const handleOpenAddRotModal = useCallback(() => {
        setIsAddRotModalOpen(true)
    }, [])

    const handleCloseAddRotModal = useCallback(() => {
        setIsAddRotModalOpen(false)
    }, [])

    const addRotModalHandlers = { handleOpenAddRotModal,handleCloseAddRotModal }

    return [isAddRotModalOpen, addRotModalHandlers]

} 