import { useCallback, useState } from "react";
import useForm from "../create/createFormController";
import validate from '../../controllers/create/createFormValidation';

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

    const handleDelete = (record) => {
        // we can also had a dialog asking, are you sure?
        // absolutely sure?
        console.log('THIS SHOULD BE A DELETE REQUEST: ', record)
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


    const handleEditSubmit = e => {
        if (validate(values, setErrors, errors)){
            handleSubmit(e)
            closeModal()
        }
    }

    const handleEditCancel = ()=> {
        handleCancel()
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
        handleDelete,
        populateFormFieldsForEdit
    }
}