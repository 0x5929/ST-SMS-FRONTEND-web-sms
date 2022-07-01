import React, { useEffect } from 'react'

import { 
    Box as MuiBox, 
    Stack as MuiStack } from '@mui/material';

import { AddBox as AddBoxIcon } from '@mui/icons-material';


import { Modal as BaseModal } from '../Modal';
import { Select2 } from '../Inputs'

import {  BaseIconButton  } from '../Buttons'

import RotationForm from './RotationForm'


import { createProgramFormStyles } from './styles'

const Styles = createProgramFormStyles({MuiStack, MuiBox, BaseIconButton, BaseModal})


function ProgramForm({ validations, studentFormStates, studentFormHandlers, ...others }) {

    const {
    
        studentFormState : {
            rotation,
            course,
            showError,
            clearFields,
        },
        addRotStates : { isAddRotModalOpen }
    } = studentFormStates

    const {

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

    return (
        <div { ...others }>
            <Select2
                name="course"
                label="Course"
                options={getCourseOptions()}
                value={course}
                defaultValue={getCourseOptions()[0].value}
                errorHandler={validations.course}
                handleChange={handleCourseChange}
                showError={showError}                       
            />
            <Styles.Stack direction="row" spacing={1}>
                <Select2
                    name="rotation"
                    label="Rotation"
                    options={getRotationOptions(course)}
                    value={rotation}
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