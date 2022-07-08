import { useState, useCallback, useEffect } from "react";
import { useStudentForm } from "./useForms";
import * as studentRecordService from '../services/SMSRecordService';

export function useEditModal ({setRecordForEdit, setRecords, userFeedbackObj, recordForEdit}) {


    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [studentFormStates, studentFormHandlers] = useStudentForm(userFeedbackObj, recordForEdit);

    useEffect(() => {
        if (recordForEdit) {
            setIsEditModalOpen(true)
        }
    }, [recordForEdit])

    const handleCloseEditModal = useCallback(() => {
        studentFormHandlers.handleClearError()
        setRecordForEdit(null)
        setIsEditModalOpen(false)

    }, [setRecordForEdit, studentFormHandlers])

    



    const handleEditSubmit = useCallback(e => {

        let submittedData = studentFormHandlers.handleSubmit(e, studentFormStates.inputRefs)

        // let recordAfterEdit = {}
        // Object.keys(studentFormStates.inputRefs).forEach(function(key){

        //     let inputRefs = studentFormStates.inputRefs

        //     switch(key) {

        //         case 'course': 
        //             recordAfterEdit[key] = studentFormStates.studentFormState[key]
        //             break;
        //         case 'rotation': 
        //             recordAfterEdit[key] = studentFormStates.studentFormState[key]
        //             break;
        //         case 'graduated':
        //             recordAfterEdit[key] = inputRefs[key].current.checked
        //             break;
        //         case 'employed':
        //             recordAfterEdit[key] = inputRefs[key].current.checked
        //             break;
        //         case 'passedFirstExam':
        //             recordAfterEdit[key] = inputRefs[key].current.checked
        //             break;
        //         case 'passedSecondOrThird':
        //             recordAfterEdit[key] = inputRefs[key].current.checked
        //             break;

        //         default: 
        //             recordAfterEdit[key] = inputRefs[key].current.value
        //     }
        // });

        // setRecordForEdit(null)
        setRecordForEdit(submittedData)
        
        // lets try to figure out how to wait until handleSUbmit to finish then excute code after, wait one second then close modal, then pop notification
        //closeModal()

        setRecords(studentRecordService.getAllRecords())
    }, 
    [setRecordForEdit, setRecords, studentFormHandlers, studentFormStates.inputRefs])


    const handleEditCancel = useCallback(()=> {
        studentFormHandlers.handleClearError()
        handleCloseEditModal()
    }, [handleCloseEditModal, studentFormHandlers])

    const editModalStates = { isEditModalOpen, studentFormStates }
    
    const editModalHandlers = {
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