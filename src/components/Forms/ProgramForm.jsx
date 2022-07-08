import React, { useEffect, useMemo } from 'react'
import { 
    Box as MuiBox, 
    Stack as MuiStack } from '@mui/material';
import { AddBox as AddBoxIcon } from '@mui/icons-material';


import RotationForm from './RotationForm'
import { createProgramFormStyles } from './styles'
import { Select2 } from '../../components/Inputs'
import { Modal as BaseModal } from '../../components/Modal'
import {  BaseIconButton  } from '../../components/Buttons'



const Styles = createProgramFormStyles({MuiStack, MuiBox, BaseIconButton, BaseModal})


function ProgramForm({ validations, studentFormStates, studentFormHandlers, ...others }) {

    const {
        recordForEdit,

        studentFormState : {
            rotation,
            course,
            showError,
            clearFields,
            
        },
        addRotStates : { isAddRotModalOpen }
    } = studentFormStates

    const {
        resolveValue,

        handleClearCourse,
        handleCourseChange,
        handleRotationChange,
        getCourseOptions, 
        getRotationOptions, 

        addRotHandlers : {


            addRotModalHandlers : {

                handleOpenAddRotModal,
                handleCloseAddRotModal
            }
        }
    } = studentFormHandlers



    useEffect(()=>{
        handleClearCourse() 
    }, [handleClearCourse, clearFields])


    const courseValue = useMemo(()=> { 
        if (recordForEdit) {
            if (!course){
                return recordForEdit.course
            }
            else {
                return course
            }
        }
        else {
            return course
        }
    
  }, [recordForEdit, course])


    const rotationValue = useMemo(()=>{
        if (recordForEdit) {
            if (!rotation) {
                return recordForEdit.rotation
            }
            else {
                return rotation
            }
        }
        else {
            return rotation
        }
    }, [recordForEdit, rotation])

    return (
        <div { ...others }>
            <Select2
                name="course"
                label="Course"
                options={getCourseOptions()}
                value={courseValue}
                defaultValue={getCourseOptions()[0].value} 
                errorHandler={validations.course}
                handleChange={handleCourseChange}
                showError={showError}                       
            />
            <Styles.Stack direction="row" spacing={1}>
                <Select2
                    name="rotation"
                    label="Rotation"
                    options={getRotationOptions(courseValue)}
                    value={rotationValue}
                    defaultValue={getRotationOptions()[0].rotation}
                    errorHandler={validations.rotation}
                    handleChange={handleRotationChange}
                    showError={showError}                     
                />
                <Styles.AddRotBtn size="medium" onClick={handleOpenAddRotModal}>
                    <AddBoxIcon />
                </Styles.AddRotBtn>
            </Styles.Stack>
            <Styles.Modal
                modalTitle="Add Rotation"
                isModalOpen={isAddRotModalOpen}
                handleCloseModal={handleCloseAddRotModal}
            >
                <RotationForm 
                    getCourseOptions={getCourseOptions}
                    addRotHandlers={studentFormHandlers.addRotHandlers}
                    addRotStates={studentFormStates.addRotStates}
                />
            </Styles.Modal>
        </div>
  )
}

export default React.memo(ProgramForm)