import { useCallback, useState } from "react";
import useForm from "../create/createFormController";

export default function useModal (studentValues, setRecordForEdit) {

    const modalTitle = 'Edit Student Data'
    const [openModal, setOpenModal] = useState(false)

    const populateFormFieldsForEdit = useCallback((recordForEdit, setValues) => {
        if (recordForEdit != null){
            setValues({
                ...recordForEdit
            })
        }
    }, [])

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
        hoursWorkedRadioItems
    } = useForm(false, studentValues);


    return {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleSubmit,
        handleCancel,
        getCourseOptions,
        hoursWorkedRadioItems,
        modalTitle,
        openModal, 
        openInModal,
        setOpenModal ,
        closeModal,
        populateFormFieldsForEdit
    }
}