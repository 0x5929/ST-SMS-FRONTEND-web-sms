import { useCallback, useEffect } from 'react'

import { useStudentForm } from './useForms'
import useToggle from './useToggle'

export function useEditModal ({setRecordForEdit, setRecords, userFeedbackObj, recordForEdit}) {


    const [isEditModalOpen, setIsEditModalOpen] = useToggle(false)
    const [studentFormStates, studentFormHandlers] = useStudentForm(userFeedbackObj, recordForEdit);

    const handleCloseEditModal = useCallback(() => {
        studentFormHandlers.handleClearError()
        setRecordForEdit(null)
        setIsEditModalOpen(false)

    }, [setIsEditModalOpen, setRecordForEdit, studentFormHandlers])


    const handleEditSubmit = useCallback(async e => {

        let submittedData = await studentFormHandlers.handleSubmit(e, studentFormStates.inputRefs)

        setRecordForEdit(submittedData)
        
        // filter through the records and replace the record Editted with this submitted data thats successful
        setRecords((prevRecords) => {
            let currentRecords = []
            for (let i = 0; i < prevRecords.length; i++) {
                if (prevRecords[i]['studentId'] === submittedData['studentId']) {
                    currentRecords.push(submittedData)
                }
                else {
                    currentRecords.push(prevRecords[i])
                }
            }

            return currentRecords
        })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setRecordForEdit, studentFormHandlers, studentFormStates.inputRefs])


    const handleEditCancel = useCallback(()=> {
        studentFormHandlers.handleClearError()
        handleCloseEditModal()
    }, [handleCloseEditModal, studentFormHandlers])


    useEffect(() => {
        if (recordForEdit) {
            setIsEditModalOpen(true)
        }
    }, [recordForEdit, setIsEditModalOpen])

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
    const [isDetailedViewModalOpen, setIsDetailedViewModalOpen] = useToggle(false)

    const getDetailedRecord = useCallback(() => {
        return recordForView
    }, [recordForView])

    const handleDetailedViewModalClose = useCallback(()=> {
        setRecordForView(null)
        setIsDetailedViewModalOpen(false)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setRecordForView])


    const detailedViewModalStates = { isDetailedViewModalOpen  }
    const detailedViewModalHandlers = { handleDetailedViewModalClose, getDetailedRecord }

    useEffect(() => {
        if (recordForView) setIsDetailedViewModalOpen(true)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordForView])
    
    return [detailedViewModalStates, detailedViewModalHandlers] 
}


export function useAddRotationModal (){
    const [isAddRotModalOpen, setIsAddRotModalOpen] = useToggle(false)

    // techinically these are just setters, and we didnt need another level of encapsulation
    // however, to keep consistent with rest of project this hook, and its callback handlers are placed here
    const handleOpenAddRotModal = useCallback(() => {
        setIsAddRotModalOpen(true)
    }, [setIsAddRotModalOpen])

    const handleCloseAddRotModal = useCallback(() => {
        setIsAddRotModalOpen(false)
    }, [setIsAddRotModalOpen])

    const addRotModalHandlers = { handleOpenAddRotModal,handleCloseAddRotModal }

    return [isAddRotModalOpen, addRotModalHandlers]

} 