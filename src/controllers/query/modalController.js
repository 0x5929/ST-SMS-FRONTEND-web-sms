import { useState } from "react";
import useForm from "../create/createFormController";

export default function useModal (studentValues, setRecordForEdit) {

    const modalTitle = 'Modal Title Here.'
    const [openPopup, setOpenPopup] = useState(false)

    const openInPopup = item =>{
        setRecordForEdit(item)
        setOpenPopup(true)
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
        openPopup, 
        openInPopup,
        setOpenPopup 
    }
}