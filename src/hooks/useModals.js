import { useState, useCallback } from "react";
import * as studentRecordService from '../services/SMSRecordService';

export function useEditModal (studentValues, setRecordForEdit, setRecords, userFeedbackObj, recordForEdit) {


    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    //const [studentFormStates, studentFormHandlers] = useStudentForm(studentValues, userFeedbackObj, recordForEdit);


    const handleOpenEditModal = useCallback(item =>{
        setRecordForEdit(item)
        setIsEditModalOpen(true)
    }, [setRecordForEdit])

    const handleCloseEditModal = useCallback((studentFormClearError) => {
        // studentFormHandlers.handleClearError()
        studentFormClearError()
        setIsEditModalOpen(false)
    }, [])




    const handleEditSubmit = useCallback((e, toggleEdit, formSubmit, inputRefs, course, rotation) => {
        // console.log('handleEditSubmit')

        // studentFormHandlers.toggleIsEdit(true)
        // studentFormHandlers.handleSubmit(e, studentFormStates.inputRefs)
        toggleEdit(true)
        formSubmit(e, inputRefs)


        let recordAfterEdit = {}
        Object.keys(inputRefs).forEach(function(key){

            // let inputRefs = studentFormStates.inputRefs
            
            switch(key) {

                case 'course': 
                    recordAfterEdit[key] = course
                    break;
                case 'rotation': 
                    recordAfterEdit[key] = rotation
                    break;
                case 'graduated':
                    recordAfterEdit[key] = inputRefs[key].current.checked
                    break;
                case 'employed':
                    recordAfterEdit[key] = inputRefs[key].current.checked
                    break;
                case 'passedFirstExam':
                    recordAfterEdit[key] = inputRefs[key].current.checked
                    break;
                case 'passedSecondOrThird':
                    recordAfterEdit[key] = inputRefs[key].current.checked
                    break;

                default: 
                    recordAfterEdit[key] = inputRefs[key].current.value
            }
        });

        setRecordForEdit(recordAfterEdit)
        
        // lets try to figure out how to wait until handleSUbmit to finish then excute code after, wait one second then close modal, then pop notification
        //closeModal()
        setRecords(studentRecordService.getAllRecords())
    }, 
    [setRecordForEdit, setRecords])


    const handleEditCancel = useCallback((toggleEdit, studentFormClearError)=> {
        console.log('handleEditCancel')
        toggleEdit(true)
        studentFormClearError()
        handleCloseEditModal()
    }, [handleCloseEditModal])

    const editModalStates = { isEditModalOpen }
    
    const editModalHandlers = {
        handleOpenEditModal,
        handleCloseEditModal,
        handleEditSubmit,
        handleEditCancel
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