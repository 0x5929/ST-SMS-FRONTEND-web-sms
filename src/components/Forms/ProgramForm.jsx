import React, { useEffect, useMemo } from 'react'
import { 
    Box as MuiBox, 
    Stack as MuiStack } from '@mui/material';
import { AddBox as AddBoxIcon } from '@mui/icons-material';


import RotationForm from './RotationForm'
import { createProgramFormStyles } from './styles'
import { Select } from '../../components/Inputs'
import { Modal as BaseModal } from '../../components/Modal'
import {  BaseIconButton  } from '../../components/Buttons'


const Styles = createProgramFormStyles({MuiStack, MuiBox, BaseIconButton, BaseModal})

function ProgramForm({ validations, studentFormStates, studentFormHandlers, ...others }) {

    const {
        authedAxios,
        recordForEdit,

        studentFormState : {
            rotation,
            course,
            courseOptions,
            rotationOptions,
            showError,
            clearFields,
            
        },
        addRotStates : { isAddRotModalOpen }
    } = studentFormStates

    const {
        handleClearCourse,
        handleCourseChange,
        handleRotationChange,
        getRotationOptions, 
        studentFormDispatch,
        addRotHandlers : {


            addRotModalHandlers : {

                handleOpenAddRotModal,
                handleCloseAddRotModal
            }
        }
    } = studentFormHandlers


    // NOTE this is an ecapulated level, no designated useForm hook yet, logic is quite simple
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


    useEffect(() => {
        const rotationOptions = async () => {
            const rotations = await getRotationOptions(authedAxios, courseValue)

            studentFormDispatch({type: 'set-rotationOptions', payload: rotations})
        }

        rotationOptions()
    }, [courseValue])

    return (
        <MuiBox data-testid="program-form" { ...others }>
            <Select
                name="course"
                label="Course"
                options={courseOptions}
                value={courseValue}
                errorHandler={validations.course}
                handleChange={handleCourseChange}
                showError={showError}            
                
                data-testid="course-select"
            />
            <Styles.Stack direction="row" spacing={1}>
                <Select
                    name="rotation"
                    label="Rotation"
                    options={rotationOptions}
                    value={rotationValue}
                    errorHandler={validations.rotation}
                    handleChange={handleRotationChange}
                    showError={showError}    

                    data-testid="rotation-select"                
                />
                <Styles.AddRotBtn 
                    size="medium" 
                    onClick={handleOpenAddRotModal}
                
                    data-testid="addrot-btn"
                >
                    <AddBoxIcon />
                </Styles.AddRotBtn>
            </Styles.Stack>
            <Styles.Modal
                modalTitle="Add Rotation"
                isModalOpen={isAddRotModalOpen}
                handleCloseModal={handleCloseAddRotModal}
            >
                <RotationForm 
                    courseOptions={courseOptions}
                    addRotHandlers={studentFormHandlers.addRotHandlers}
                    addRotStates={studentFormStates.addRotStates}
                
                    data-testid="rotation-form"
                />
            </Styles.Modal>
        </MuiBox>
  )
}

export default React.memo(ProgramForm)