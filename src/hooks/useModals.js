import { useState, useCallback, useEffect } from 'react'

import { useStudentForm } from './useForms'
import * as studentRecordService from '../services/SMSRecordService'

export function useEditModal ({setRecordForEdit, setRecords, userFeedbackObj, recordForEdit}) {


    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [studentFormStates, studentFormHandlers] = useStudentForm(userFeedbackObj, recordForEdit);

    const handleCloseEditModal = useCallback(() => {
        studentFormHandlers.handleClearError()
        setRecordForEdit(null)
        setIsEditModalOpen(false)

    }, [setRecordForEdit, studentFormHandlers])


    const handleEditSubmit = useCallback(e => {

        let submittedData = studentFormHandlers.handleSubmit(e, studentFormStates.inputRefs)

        setRecordForEdit(submittedData)
        setRecords(studentRecordService.getAllRecords())
    }, [setRecordForEdit, setRecords, studentFormHandlers, studentFormStates.inputRefs])


    const handleEditCancel = useCallback(()=> {
        studentFormHandlers.handleClearError()
        handleCloseEditModal()
    }, [handleCloseEditModal, studentFormHandlers])


    useEffect(() => {
        if (recordForEdit) {
            setIsEditModalOpen(true)
        }
    }, [recordForEdit])

    const editModalStates = { isEditModalOpen, studentFormStates }
    
    const editModalHandlers = {
        handleCloseEditModal,
        handleEditSubmit,
        handleEditCancel,
        studentFormHandlers
    }


    return [editModalStates, editModalHandlers]
}


export function useDetailedViewModal ({ setRecordForView, recordForView }){
    const [isDetailedViewModalOpen, setIsDetailedViewModalOpen] = useState(false)

    const getDetailedRecord = useCallback(() => {
        return recordForView
    }, [recordForView])

    const handleDetailedViewModalClose = useCallback(()=> {
        setRecordForView(null)
        setIsDetailedViewModalOpen(false)
    }, [setRecordForView])

    const handleDetailedViewModalOpen = useCallback(item => {
        setRecordForView(item)
        setIsDetailedViewModalOpen(true)
    }, [setRecordForView])

    const detailedViewModalStates = { isDetailedViewModalOpen  }
    const detailedViewModalHandlers = { handleDetailedViewModalOpen, handleDetailedViewModalClose, getDetailedRecord }

    useEffect(() => {
        if (recordForView)
            handleDetailedViewModalOpen(recordForView)
    }, [recordForView, handleDetailedViewModalOpen])
    
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