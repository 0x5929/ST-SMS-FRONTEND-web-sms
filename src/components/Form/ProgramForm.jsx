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


function ProgramForm(props) {

    const { 
        getRotationOptions, 
        handleCourseChange, 
        handleClearCourse, 
        handleRotationChange,
        course, 
        rotation, 
        handleOpenAddRotModal,
        handleCloseAddRotModal,
        isAddRotModalOpen,
        handleAddRotInputChange,
        handleAddRotSubmit,
        getCourseOptions, 
        handleAddRotClear,
        rotationFormValues,
        rotationFormErrors,
        validations, 
        showError, 
        clearFields } = props;

    useEffect(()=>{
        handleClearCourse() 
    }, [handleClearCourse, clearFields])

    return (
        <>
            <Select2
                name="course"
                label="Course"
                value={course}
                errorHandler={validations.course}
                handleCourseChange={handleCourseChange}
                options={getCourseOptions()}
                defaultValue={getCourseOptions()[0].value}
                showError={showError}     
                clearFields={clearFields}                   
            />
            <Styles.Stack direction="row" spacing={1}>
            <Select2

                name="rotation"
                label="Rotation"
                options={getRotationOptions(course)}
                defaultValue={getRotationOptions()[0].rotation}
                errorHandler={validations.rotation}
                showError={showError}
                clearFields={clearFields}                        
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
                handleAddRotInputChange={handleAddRotInputChange}
                handleAddRotSubmit={handleAddRotSubmit}
                handleAddRotClear={handleAddRotClear}
                rotationFormValues={rotationFormValues}
                rotationFormErrors={rotationFormErrors}
                getCourseOptions={getCourseOptions}
            />
        </Styles.Modal>
    </>
  )
}

export default React.memo(ProgramForm)